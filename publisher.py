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
    """
    Retrieves the authentic Page Access Token for FB_PAGE_ID.
    If the provided token is a User token, resolves it via /{FB_PAGE_ID}?fields=access_token or /me/accounts.
    """
    token = os.environ.get('FACEBOOK_ACCESS_TOKEN') or os.environ.get('META_LONG_LIVED_ACCESS_TOKEN')
    if not token:
        raise ValueError("Neither FACEBOOK_ACCESS_TOKEN nor META_LONG_LIVED_ACCESS_TOKEN is set in environment secrets.")

    # 1. Check if token already belongs directly to FB_PAGE_ID
    try:
        me_resp = requests.get(f"https://graph.facebook.com/v21.0/me?access_token={token}", timeout=10)
        if me_resp.status_code == 200:
            me_data = me_resp.json()
            if str(me_data.get('id')) == str(FB_PAGE_ID):
                print(f"[Publisher] Token is verified Page Access Token for '{me_data.get('name')}' (ID: {FB_PAGE_ID})")
                return token
            else:
                print(f"[Publisher] User Token identified: '{me_data.get('name')}' (ID: {me_data.get('id')}). Resolving Page Access Token...")
    except Exception as e:
        print(f"[Publisher] Warning verifying token entity: {e}")

    # 2. Directly query the Page endpoint with the user token to retrieve Page Access Token
    try:
        url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}?fields=access_token,name&access_token={token}"
        resp = requests.get(url, timeout=15)
        if resp.status_code == 200:
            p_data = resp.json()
            p_token = p_data.get('access_token')
            if p_token:
                print(f"[Publisher] Successfully resolved Page Access Token for '{p_data.get('name')}' (ID: {FB_PAGE_ID})")
                return p_token
    except Exception as e:
        print(f"[Publisher] Direct Page token query error: {e}")

    # 3. Fallback: Search /me/accounts with pagination
    try:
        acc_url = f"https://graph.facebook.com/v21.0/me/accounts?limit=100&access_token={token}"
        while acc_url:
            acc_resp = requests.get(acc_url, timeout=15)
            if acc_resp.status_code != 200:
                break
            acc_data = acc_resp.json()
            for page in acc_data.get('data', []):
                if str(page.get('id')) == str(FB_PAGE_ID):
                    print(f"[Publisher] Resolved Page Access Token from /me/accounts for '{page.get('name')}'")
                    return page.get('access_token')
            acc_url = acc_data.get('paging', {}).get('next')
    except Exception as e:
        print(f"[Publisher] Accounts search fallback error: {e}")

    print("[Publisher] Warning: Could not resolve specific Page Access Token, using provided token as fallback.")
    return token

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

    subprocess.run(["git", "pull", "--rebase", "--autostash", push_target, "main"], cwd=repo_dir, check=False)

    for attempt in range(3):
        ret = subprocess.run(["git", "push", push_target, "HEAD:main"], cwd=repo_dir)
        if ret.returncode == 0:
            break
        time.sleep(4)

    raw_url = f"https://raw.githubusercontent.com/{GH_REPO_NAME}/main/videos/{vid_stem}"
    print(f"[Publisher] Public GitHub Raw Video URL: {raw_url}")

    # Verify CDN Edge propagation before handing URL to Instagram
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
        print("[Publisher] ❌ Failed to create Instagram Reel container:", resp.text)
        return {"platform": "instagram", "status": "failed", "error": resp.text}

    container_id = resp.json().get('id')
    print(f"[Publisher] Instagram Container Created: {container_id}")

    # Poll Container Status
    status_url = f"https://graph.facebook.com/v21.0/{container_id}"
    status_params = {
        'fields': 'status_code,status',
        'access_token': access_token
    }

    print("[Publisher] Polling Instagram video processing status...")
    ready = False
    for i in range(30):
        time.sleep(6)
        s_resp = requests.get(status_url, params=status_params, timeout=20)
        if s_resp.status_code == 200:
            s_data = s_resp.json()
            status_code = s_data.get('status_code')
            desc = s_data.get('status', '')
            print(f"[Publisher] Container Status: {status_code} ({desc}) [Check {i+1}/30]")
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

def publish_to_facebook_reels(video_path, caption, title, page_access_token):
    print(f"\n[Publisher] Step 3: Publishing to Facebook Reels ({FB_PAGE_NAME} - ID: {FB_PAGE_ID})...")

    # Method 1: Official Facebook Video Reels API (3-phase Reels API)
    try:
        init_url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}/video_reels"
        init_res = requests.post(init_url, params={'upload_phase': 'start', 'access_token': page_access_token}, timeout=30)
        if init_res.status_code == 200:
            init_data = init_res.json()
            fb_video_id = init_data.get('video_id')
            upload_url = init_data.get('upload_url')
            print(f"[Publisher] Facebook Reel Session Initialized: Video ID {fb_video_id}")

            file_size = os.path.getsize(video_path)
            with open(video_path, 'rb') as vf:
                video_bytes = vf.read()

            headers = {
                'Authorization': f'OAuth {page_access_token}',
                'offset': '0',
                'file_size': str(file_size)
            }
            up_res = requests.post(upload_url, headers=headers, data=video_bytes, timeout=300)
            if up_res.status_code == 200:
                print("[Publisher] Facebook Reel Binary Uploaded successfully.")

                finish_params = {
                    'upload_phase': 'finish',
                    'video_id': fb_video_id,
                    'video_state': 'PUBLISHED',
                    'description': caption,
                    'title': title,
                    'access_token': page_access_token
                }
                finish_res = requests.post(init_url, params=finish_params, timeout=60)
                if finish_res.status_code == 200:
                    res_data = finish_res.json()
                    post_id = res_data.get('post_id', fb_video_id)
                    print(f"🎉 [Facebook] SUCCESS! Published Facebook Reel ID: {fb_video_id} (Post ID: {post_id})")
                    return {"platform": "facebook", "status": "success", "id": fb_video_id, "post_id": post_id}
                else:
                    print(f"[Publisher] Facebook Reels finish status {finish_res.status_code}: {finish_res.text}")
            else:
                print(f"[Publisher] Facebook Reels binary upload status {up_res.status_code}: {up_res.text}")
        else:
            print(f"[Publisher] Facebook Reels init status {init_res.status_code}: {init_res.text}")
    except Exception as e:
        print(f"[Publisher] Facebook video_reels API exception: {e}")

    # Fallback Method 2: Direct Page Videos endpoint with is_reel=True
    print("[Publisher] Attempting Facebook standard video endpoint fallback...")
    url = f"https://graph.facebook.com/v21.0/{FB_PAGE_ID}/videos"
    data = {
        'access_token': page_access_token,
        'description': caption,
        'title': title,
        'is_explicit_share': True,
        'is_reel': True
    }

    try:
        with open(video_path, 'rb') as f:
            files = {'file': f}
            resp = requests.post(url, data=data, files=files, timeout=300)

        if resp.status_code == 200:
            res = resp.json()
            vid_id = res.get('id')
            print(f"🎉 [Facebook] SUCCESS! Published Facebook Reel ID: {vid_id}")
            return {"platform": "facebook", "status": "success", "id": vid_id}
        else:
            print("[Publisher] ❌ Facebook upload fallback error:", resp.text)
            return {"platform": "facebook", "status": "failed", "error": resp.text}
    except Exception as e:
        print(f"[Publisher] Facebook upload fallback exception: {e}")
        return {"platform": "facebook", "status": "failed", "error": str(e)}

def publish_reel(local_video_path, caption, title):
    print("\n==================================================")
    print("  🚀 STARTING META GRAPH API REELS PUBLISHER")
    print(f"  Target File : {Path(local_video_path).name}")
    print(f"  Title       : {title}")
    print("==================================================")

    # 1. Resolve authentic Page Access Token
    try:
        page_token = get_page_access_token()
    except Exception as e:
        print(f"[Publisher] ❌ Authentication Error: {e}")
        return {"status": "auth_error", "message": str(e)}

    verify_token(page_token)

    # 2. Host video on GitHub CDN
    raw_video_url = upload_to_github_raw(local_video_path)

    # 3. Publish to Instagram & Facebook
    # If META_LONG_LIVED_ACCESS_TOKEN is available, Instagram can use either; pass user token or page token
    user_token = os.environ.get('META_LONG_LIVED_ACCESS_TOKEN') or page_token
    results = {}
    try:
        results['instagram'] = publish_to_instagram_reels(raw_video_url, caption, user_token)
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
