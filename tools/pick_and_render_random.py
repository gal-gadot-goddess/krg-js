import sys
import json
import random
from pathlib import Path

# Fix Windows console UTF-8 encoding for emojis
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

project_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(project_dir))

from render_reel import render_reel

catalog_file = project_dir / "visualizers_catalog.json"
with open(catalog_file, "r", encoding="utf-8") as f:
    catalog = json.load(f)

# Random selection from all 100 visualizers
chosen = random.choice(catalog)
variation_index = random.randint(0, 99)

print("\n🎲 ==================================================")
print("   RANDOMLY SELECTED THREE.JS 3D VISUALIZER REEL")
print(f"   ID        : {chosen['id']}")
print(f"   Title     : {chosen['title']}")
print(f"   Category  : {chosen['category']}")
print(f"   Audio     : {chosen['genre']}")
print(f"   Variation : #{variation_index + 1} (out of 100 variations)")
print("==================================================\n")

# Render locally: 1080x1920 60 FPS, 10 seconds duration
output_mp4 = render_reel(
    visualizer_id=chosen["id"],
    variation_index=variation_index,
    duration_sec=10,
    fps=60,
    output_dir=project_dir / "output_videos"
)

print(f"\n🎉 Successfully rendered local reel:")
print(f"   File: {output_mp4}")
