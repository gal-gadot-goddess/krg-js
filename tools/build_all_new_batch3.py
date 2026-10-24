import sys
import json
from pathlib import Path

project_dir = Path(__file__).parent.parent.resolve()
sys.path.insert(0, str(project_dir / "tools"))

from build_common import generate_visualizer_js
from defs_batch3_cosmos import DEFS_COSMOS_3
from defs_batch3_geometry import DEFS_GEOMETRY_3
from defs_batch3_quantum import DEFS_QUANTUM_3
from defs_batch3_bio import DEFS_BIO_3
from defs_batch3_chaos import DEFS_CHAOS_3
from defs_batch3_fluids import DEFS_FLUIDS_3
from defs_batch3_cyber import DEFS_CYBER_3

ALL_NEW = (
    DEFS_COSMOS_3 +
    DEFS_GEOMETRY_3 +
    DEFS_QUANTUM_3 +
    DEFS_BIO_3 +
    DEFS_CHAOS_3 +
    DEFS_FLUIDS_3 +
    DEFS_CYBER_3
)

print(f"Total new visualizers to generate: {len(ALL_NEW)}")
assert len(ALL_NEW) == 100, f"Expected 100, got {len(ALL_NEW)}"

# Check for duplicates within new set
new_ids = [v["id"] for v in ALL_NEW]
assert len(set(new_ids)) == 100, f"Duplicate ID within new 100! Count: {len(set(new_ids))}"

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

for v in ALL_NEW:
    js_code = generate_visualizer_js(v)
    file_path = viz_dir / f"{v['id']}.js"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(js_code)

    new_catalog_entries.append({
        "id": v["id"],
        "title": v["title"],
        "category": v["category"],
        "genre": v.get("genre", "cosmic"),
        "fileName": v["fileName"],
        "caption": v["caption"]
    })

print(f"Wrote {len(ALL_NEW)} new visualizer JS files in {viz_dir}")

# Append to catalog and save
updated_catalog = existing_catalog + new_catalog_entries
print(f"Total updated catalog count: {len(updated_catalog)}")

with open(catalog_path, "w", encoding="utf-8") as f:
    json.dump(updated_catalog, f, indent=2, ensure_ascii=False)

print("Saved updated visualizers_catalog.json successfully!")
