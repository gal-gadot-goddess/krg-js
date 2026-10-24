import os
import sys
import json
from pathlib import Path

# Fix Windows console UTF-8 encoding for emojis
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

project_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))

from build_common import generate_visualizer_js
from defs_new_cosmos import DEFS_COSMOS
from defs_new_geometry import DEFS_GEOMETRY
from defs_new_quantum import DEFS_QUANTUM
from defs_new_bio import DEFS_BIO
from defs_new_chaos import DEFS_CHAOS
from defs_new_waves import DEFS_WAVES
from defs_new_cyber import DEFS_CYBER

ALL_NEW = (
    DEFS_COSMOS +
    DEFS_GEOMETRY +
    DEFS_QUANTUM +
    DEFS_BIO +
    DEFS_CHAOS +
    DEFS_WAVES +
    DEFS_CYBER
)

print(f"Total new visualizers to generate: {len(ALL_NEW)}")
assert len(ALL_NEW) == 100, f"Expected 100, got {len(ALL_NEW)}"

# Check for duplicates within new set
new_ids = [v["id"] for v in ALL_NEW]
assert len(set(new_ids)) == 100, "Duplicate ID within new 100!"

# Load existing catalog
catalog_path = project_dir / "visualizers_catalog.json"
with open(catalog_path, "r", encoding="utf-8") as f:
    existing_catalog = json.load(f)

print(f"Existing catalog count: {len(existing_catalog)}")
existing_ids = set(item["id"] for item in existing_catalog)

# Check overlap with existing catalog
overlap = set(new_ids).intersection(existing_ids)
assert len(overlap) == 0, f"Overlap with existing visualizers: {overlap}"

# Write all new visualizer JS files
viz_dir = project_dir / "visualizers"
viz_dir.mkdir(parents=True, exist_ok=True)

new_catalog_entries = []

for idx, viz in enumerate(ALL_NEW, 1):
    file_path = viz_dir / f"{viz['id']}.js"
    code = generate_visualizer_js(viz)
    with open(file_path, "w", encoding="utf-8") as vf:
        vf.write(code)

    new_catalog_entries.append({
        "id": viz["id"],
        "title": viz["title"],
        "fileName": viz["fileName"],
        "category": viz["category"],
        "genre": viz.get("genre", "cosmic"),
        "caption": viz["caption"]
    })
    print(f"[{idx:03d}/100] Wrote {file_path.name} ({viz['title']})")

# Merge into master catalog (total 200 items)
updated_catalog = existing_catalog + new_catalog_entries
with open(catalog_path, "w", encoding="utf-8") as cf:
    json.dump(updated_catalog, cf, indent=2)

print("\n==================================================")
print(f"🎉 Successfully built 100 brand new visualizers!")
print(f"   Total in catalog now: {len(updated_catalog)} visualizers")
print("==================================================\n")
