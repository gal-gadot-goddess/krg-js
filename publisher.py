import os
import sys
import time
import uuid
import subprocess
import requests
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Target Credentials
FB_PAGE_NAME = os.environ.get("FACEBOOK_PAGE_NAME", "Kreggsjs")
FB_PAGE_ID = os.environ.get("FACEBOOK_PAGE_ID", "835956572945563")
IG_USER_ID = os.environ.get("INSTAGRAM_ACCOUNT_ID", "17841461793148389")
GH_REPO_NAME = os.environ.get("GITHUB_REPOSITORY", "gal-gadot-goddess/krg-js")

def get_page_access_token():
    token = os.environ.get('FACEBOOK_ACCESS_TOKEN')
    if token:
        return token
    user_token = os.environ.get('META_LONG_LIVED_ACCESS_TOKEN')
    if user_token:
        url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}?fields=access_token&access_token={user_token}"
        resp = requests.get(url, timeout=20)
        if resp.status_code == 200:
            p_token = resp.json().get('access_token')
            if p_token:
                return p_token
        return user_token
    raise ValueError("Neither FACEBOOK_ACCESS_TOKEN nor META_LONG_LIVED_ACCESS_TOKEN is set in environment secrets.")

def verify_token(token):
    try:
        resp = requests.get(f"https://graph.facebook.com/v21.0/me?access_token={token}", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            print(f"[Publisher] Meta Token Verified: Name='{data.get('name')}', ID={data.get('id')}")
            return True
        else:
            err = resp.json().get('error', {})
            print(f"[Publisher] ⚠️ Meta Token Validation Failed: {err.get('message', resp.text)}")
            return False
    except Exception as e:
        print(f"[Publisher] Token verification connection error: {e}")
        return False

def upload_to_github_raw(local_video_path, repo_dir=None):
    if not repo_dir:
        repo_dir = str(Path(__file__).parent.resolve())
    print(f"\n[Publisher] Step 1: Committing video to GitHub for CDN hosting (repo_dir={repo_dir})...")
    vid_stem = f"reel_{uuid.uuid4().hex[:8]}.mp4"
    dest_dir = Path(repo_dir) / "videos"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_file = dest_dir / vid_stem

    import shutil
    shutil.copyfile(local_video_path, dest_file)

    # Git commit and push
    subprocess.run(["git", "config", "user.name", "kreggsjs-bot"], cwd=repo_dir, check=False)
    subprocess.run(["git", "config", "user.email", "bot@kreggsjs.com"], cwd=repo_dir, check=False)
    subprocess.run(["git", "add", f"videos/{vid_stem}"], cwd=repo_dir, check=False)
    subprocess.run(["git", "commit", "-m", f"Add reel {vid_stem} [skip ci]"], cwd=repo_dir, check=False)

    gh_token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_PAT")
    push_target = f"https://x-access-token:{gh_token}@github.com/{GH_REPO_NAME}.git" if gh_token else "origin"

    subprocess.run(["git", "pull", "--rebase", push_target, "main"], cwd=repo_dir, check=False)

    for attempt in range(3):
        ret = subprocess.run(["git", "push", push_target, "HEAD:main"], cwd=repo_dir)
        if ret.returncode == 0:
            break
        time.sleep(4)

    raw_url = f"https://raw.githubusercontent.com/{GH_REPO_NAME}/main/videos/{vid_stem}"
    print(f"[Publisher] Public GitHub Raw Video URL: {raw_url}")

    # CRITICAL: Verify CDN Edge propagation before handing URL to Instagram!
    print(f"[Publisher] Verifying GitHub raw CDN propagation...")
    cdn_ok = False
    for cdn_attempt in range(25):
        try:
            head_resp = requests.head(raw_url, timeout=10, allow_redirects=True)
            if head_resp.status_code == 200:
                print(f"[Publisher] CDN Verified: HTTP 200 OK (Attempt {cdn_attempt + 1})")
                cdn_ok = True
                break
        except Exception:
            pass
        print(f"[Publisher] Waiting for CDN edge availability (attempt {cdn_attempt + 1}/25)...")
        time.sleep(4)

    if not cdn_ok:
        print("[Publisher] Warning: CDN edge check timed out. Proceeding with caution.")

    return raw_url

def publish_to_instagram_reels(video_url, caption, access_token):
    print("\n[Publisher] Step 2: Publishing to Instagram Reels (@kreggsjs)...")
    print("[Publisher] Setting share_to_feed='false' (Reels tab only, NOT grid)")

    container_url = f"https://graph.facebook.com/v21.0/{IG_USER_ID}/media"
    params = {
        'media_type': 'REELS',
        'video_url': video_url,
        'access_token': access_token,
        'caption': caption,
        'share_to_feed': 'false', # REELS TAB ONLY!
        'thumb_offset': '3500'
    }

    resp = requests.post(container_url, params=params, timeout=60)
    if resp.status_code != 200:
        print("[Publisher] IG Container Creation Error:", resp.text)
        return {"platform": "instagram", "status": "failed", "error": resp.text}

    container_id = resp.json().get('id')
    print(f"[Publisher] Instagram Container Created: {container_id}")

    # Poll Instagram media container status
    print("[Publisher] Polling Instagram video processing status...")
    status_url = f"https://graph.facebook.com/v21.0/{container_id}?fields=status_code,status&access_token={access_token}"
    ready = False
    for attempt in range(30):
        time.sleep(5)
        s_resp = requests.get(status_url, timeout=20)
        if s_resp.status_code == 200:
            s_data = s_resp.json()
            status_code = s_data.get('status_code')
            print(f"[Publisher] Container Status: {status_code} ({s_data.get('status', '')}) [Check {attempt+1}/30]")
            if status_code == 'FINISHED':
                ready = True
                break
            elif status_code == 'ERROR':
                print("[Publisher] ❌ Instagram Video Processing Error:", s_data)
                return {"platform": "instagram", "status": "failed", "error": s_data}
        else:
            print(f"[Publisher] Status check response: {s_resp.text}")

    if not ready:
        print("[Publisher] Warning: Container status polling reached maximum checks, attempting publish...")

    # Publish Container
    pub_url = f"https://graph.facebook.com/v21.0/{IG_USER_ID}/media_publish"
    pub_params = {
        'creation_id': container_id,
        'access_token': access_token
    }

    for attempt in range(6):
        pub_resp = requests.post(pub_url, params=pub_params, timeout=60)
        if pub_resp.status_code == 200:
            media_id = pub_resp.json().get('id')
            print(f"🎉 [Instagram] SUCCESS! Published Reel Media ID: {media_id}")
            return {"platform": "instagram", "status": "success", "id": media_id}
        else:
            print(f"[Publisher] Instagram publish in progress (attempt {attempt+1}), waiting 8s... {pub_resp.text}")
            time.sleep(8)

    return {"platform": "instagram", "status": "failed", "error": pub_resp.text}

def publish_to_facebook_reels(video_path, caption, title, access_token):
    print(f"\n[Publisher] Step 3: Publishing to Facebook Reels ({FB_PAGE_NAME} - ID: {FB_PAGE_ID})...")
    url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}/videos"

    data = {
        'access_token': access_token,
        'description': caption,
        'title': title,
        'is_explicit_share': True,
        'is_reel': True
    }

    with open(video_path, 'rb') as f:
        files = {'file': f}
        resp = requests.post(url, data=data, files=files, timeout=300)

    if resp.status_code == 200:
        res = resp.json()
        vid_id = res.get('id')
        print(f"🎉 [Facebook] SUCCESS! Published Facebook Reel ID: {vid_id}")
        return {"platform": "facebook", "status": "success", "id": vid_id}
    else:
        print("[Publisher] ❌ Facebook upload error:", resp.text)
        return {"platform": "facebook", "status": "failed", "error": resp.text}

def publish_reel(local_video_path, caption, title):
    print("\n==================================================")
    print("  🚀 STARTING META GRAPH API REELS PUBLISHER")
    print(f"  Target File : {Path(local_video_path).name}")
    print(f"  Title       : {title}")
    print("==================================================")

    try:
        page_token = get_page_access_token()
    except Exception as e:
        print(f"[Publisher] ❌ Authentication Error: {e}")
        return {"status": "auth_error", "message": str(e)}

    verify_token(page_token)

    raw_video_url = upload_to_github_raw(local_video_path)

    results = {}
    try:
        results['instagram'] = publish_to_instagram_reels(raw_video_url, caption, page_token)
    except Exception as e:
        print(f"[Publisher] Instagram Exception: {e}")
        results['instagram'] = {"platform": "instagram", "status": "error", "message": str(e)}

    try:
        results['facebook'] = publish_to_facebook_reels(local_video_path, caption, title, page_token)
    except Exception as e:
        print(f"[Publisher] Facebook Exception: {e}")
        results['facebook'] = {"platform": "facebook", "status": "error", "message": str(e)}

    print(f"\n[Publisher] Publishing Results Summary: {results}")
    return results

if __name__ == '__main__':
    if len(sys.argv) > 1:
        v_path = sys.argv[1]
        cap = sys.argv[2] if len(sys.argv) > 2 else "3D Three.js Creative Coding #coding #threejs #reels"
        tit = sys.argv[3] if len(sys.argv) > 3 else "3D Visual Art"
        publish_reel(v_path, cap, tit)
    else:
        print("Usage: python publisher.py <video_path> [caption] [title]")
