import os
import sys
import time
import uuid
import subprocess
import requests
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Target Credentials
FB_PAGE_NAME = "Kreggsjs"
FB_PAGE_ID = "835956572945563"
IG_USER_ID = "17841461793148389"
GH_REPO_NAME = "gal-gadot-goddess/krg-js"

def get_page_access_token():
    user_token = os.environ.get('META_LONG_LIVED_ACCESS_TOKEN')
    if not user_token:
        raise ValueError("META_LONG_LIVED_ACCESS_TOKEN not set in environment variables")
    
    url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}?fields=access_token&access_token={user_token}"
    resp = requests.get(url, timeout=20)
    if resp.status_code == 200:
        token = resp.json().get('access_token')
        if token:
            return token
    
    print("[Publisher] Warning: Specific page token not found, falling back to user token")
    return user_token

def upload_to_github_raw(local_video_path, repo_dir=None):
    if not repo_dir:
        repo_dir = str(Path(__file__).parent.resolve())
    print(f"\n[Publisher] Step 1: Committing video to GitHub for ultra-fast CDN hosting (repo_dir={repo_dir})...")
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

    gh_pat = os.environ.get("GH_PAT")
    push_target = f"https://x-access-token:{gh_pat}@github.com/{GH_REPO_NAME}.git" if gh_pat else "origin"

    subprocess.run(["git", "pull", "--rebase", push_target, "main"], cwd=repo_dir, check=False)

    for attempt in range(3):
        ret = subprocess.run(["git", "push", push_target, "HEAD:main"], cwd=repo_dir)
        if ret.returncode == 0:
            break
        time.sleep(4)

    raw_url = f"https://raw.githubusercontent.com/{GH_REPO_NAME}/main/videos/{vid_stem}"
    print(f"[Publisher] Public GitHub Raw Video URL: {raw_url}")
    return raw_url

def publish_to_instagram_reels(video_url, caption, access_token):
    print("\n[Publisher] Step 2: Publishing to Instagram Reels (@kreggsjs)...")
    print("[Publisher] CRITICAL: Setting share_to_feed='false' (Reels tab only, NOT grid)")

    container_url = f"https://graph.facebook.com/v21.0/{IG_USER_ID}/media"
    params = {
        'media_type': 'REELS',
        'video_url': video_url,
        'access_token': access_token,
        'caption': caption,
        'share_to_feed': 'false', # REELS TAB ONLY!
        'thumb_offset': '4000'
    }

    resp = requests.post(container_url, params=params, timeout=60)
    if resp.status_code != 200:
        print("[Publisher] IG Container Error:", resp.text)
        return {"platform": "instagram", "status": "failed", "error": resp.text}

    container_id = resp.json().get('id')
    print(f"[Publisher] Instagram Container Created: {container_id}")

    # Actively poll Instagram media container status
    print("[Publisher] Polling Instagram processing status...")
    status_url = f"https://graph.facebook.com/v21.0/{container_id}?fields=status_code,status&access_token={access_token}"
    ready = False
    for attempt in range(25):
        time.sleep(6)
        s_resp = requests.get(status_url, timeout=20)
        if s_resp.status_code == 200:
            s_data = s_resp.json()
            status_code = s_data.get('status_code')
            print(f"[Publisher] Container Status: {status_code} ({s_data.get('status', '')}) [Check {attempt+1}/25]")
            if status_code == 'FINISHED':
                ready = True
                break
            elif status_code == 'ERROR':
                print("[Publisher] Processing error:", s_data)
                return {"platform": "instagram", "status": "failed", "error": s_data}
        else:
            print(f"[Publisher] Status check response: {s_resp.text}")

    if not ready:
        print("[Publisher] Proceeding to publish attempt after timeout...")

    # Publish Container
    pub_url = f"https://graph.facebook.com/v21.0/{IG_USER_ID}/media_publish"
    pub_params = {
        'creation_id': container_id,
        'access_token': access_token
    }

    for attempt in range(5):
        pub_resp = requests.post(pub_url, params=pub_params, timeout=60)
        if pub_resp.status_code == 200:
            media_id = pub_resp.json().get('id')
            print(f"🎉 [Instagram] SUCCESS! Published Reel Media ID: {media_id}")
            return {"platform": "instagram", "status": "success", "id": media_id}
        else:
            print(f"[Publisher] Instagram publish in progress (attempt {attempt+1}), waiting 10s...")
            time.sleep(10)

    return {"platform": "instagram", "status": "failed", "error": pub_resp.text}

def publish_to_facebook_reels(video_path, caption, title, access_token):
    print(f"\n[Publisher] Step 3: Publishing to Facebook Reels ({FB_PAGE_NAME} - ID: {FB_PAGE_ID})...")
    url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}/videos"

    data = {
        'access_token': access_token,
        'description': caption,
        'title': title,
        'is_explicit_share': True,
        'is_reel': True # Facebook Reels
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
        print("[Publisher] Facebook upload error:", resp.text)
        return {"platform": "facebook", "status": "failed", "error": resp.text}

def publish_reel(local_video_path, caption, title):
    page_token = get_page_access_token()
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

    return results

if __name__ == '__main__':
    if len(sys.argv) > 1:
        v_path = sys.argv[1]
        cap = sys.argv[2] if len(sys.argv) > 2 else "Creative JavaScript Animation #coding #javascript"
        tit = sys.argv[3] if len(sys.argv) > 3 else "JS Visual Art"
        publish_reel(v_path, cap, tit)
    else:
        print("Usage: python publisher.py <video_path> [caption] [title]")
