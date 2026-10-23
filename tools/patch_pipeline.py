# tools/patch_pipeline.py
import json
from pathlib import Path

PROJECT_DIR = Path(__file__).parent.parent.resolve()

# 1. Patch render_reel.py
render_reel_path = PROJECT_DIR / "render_reel.py"
with open(render_reel_path, "r", encoding="utf-8") as f:
    r_content = f.read()

idx_start = r_content.find("GENRE_MAP = {")
idx_end = r_content.find("def render_reel")

if idx_start != -1 and idx_end != -1:
    catalog_loader = '''PROJECT_DIR = Path(__file__).parent.resolve()
CATALOG_FILE = PROJECT_DIR / "visualizers_catalog.json"
CATALOG = []
if CATALOG_FILE.exists():
    try:
        with open(CATALOG_FILE, "r", encoding="utf-8") as _cf:
            CATALOG = json.load(_cf)
    except Exception:
        CATALOG = []

GENRE_MAP = {item["id"]: item.get("genre", "cosmic") for item in CATALOG}
TITLE_MAP = {item["id"]: item.get("title", item["id"]) for item in CATALOG}
'''
    new_r = r_content[:idx_start] + catalog_loader + "\n" + r_content[idx_end:]
    with open(render_reel_path, "w", encoding="utf-8") as f:
        f.write(new_r)
    print("Updated render_reel.py successfully")
else:
    print("Indices not found in render_reel.py")

# 2. Patch generate_daily_reel.py
gen_daily_path = PROJECT_DIR / "generate_daily_reel.py"
with open(gen_daily_path, "r", encoding="utf-8") as f:
    g_content = f.read()

idx_g_start = g_content.find("AVAILABLE_VISUALIZERS = [")
idx_g_end = g_content.find("def load_history")

if idx_g_start != -1 and idx_g_end != -1:
    g_loader = '''def load_catalog_visualizers(p_dir):
    c_path = p_dir / "visualizers_catalog.json"
    if c_path.exists():
        try:
            with open(c_path, "r", encoding="utf-8") as _f:
                return [x["id"] for x in json.load(_f)]
        except Exception:
            pass
    return ["black_hole_gargantua", "quantum_neural_matrix", "sacred_merkaba_tesseract"]

AVAILABLE_VISUALIZERS = load_catalog_visualizers(Path(__file__).parent.resolve())
'''
    new_g = g_content[:idx_g_start] + g_loader + "\n" + g_content[idx_g_end:]
    with open(gen_daily_path, "w", encoding="utf-8") as f:
        f.write(new_g)
    print("Updated generate_daily_reel.py successfully")
else:
    print("Indices not found in generate_daily_reel.py")
