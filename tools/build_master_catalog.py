# tools/build_master_catalog.py
# Generates all 94 new visualizers and outputs visualizers_catalog.json (100 total)

import json
import sys
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from build_common import generate_visualizer_js

from defs_cosmos import COSMOS_VISUALIZERS
from defs_dimensions import DIMENSIONS_VISUALIZERS
from defs_quantum import QUANTUM_VISUALIZERS
from defs_cyberpunk import CYBERPUNK_VISUALIZERS
from defs_organic import ORGANIC_VISUALIZERS
from defs_chaos import CHAOS_VISUALIZERS
from defs_fluid import FLUID_VISUALIZERS

PROJECT_DIR = Path(__file__).parent.parent.resolve()
VIZ_DIR = PROJECT_DIR / "visualizers"
VIZ_DIR.mkdir(parents=True, exist_ok=True)

# 6 Pre-existing visualizers metadata
EXISTING_VISUALIZERS = [
    {
        "id": "black_hole_gargantua",
        "title": "Cosmic Singularity & Gargantua",
        "fileName": "black_hole.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Gargantua Black Hole & Relativistic Accretion Disk in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔭✨",
        "isExisting": True
    },
    {
        "id": "quantum_neural_matrix",
        "title": "Quantum Neural Synapse Matrix",
        "fileName": "neural_matrix.js",
        "category": "AI & Neuro-Computation",
        "genre": "cyber",
        "caption": "🧠 Quantum Neural Synapse Matrix with 160 active nodes & high-frequency action potentials in Three.js WebGL! Follow @kreggsjs for daily code reels! ⚡🤖",
        "isExisting": True
    },
    {
        "id": "sacred_merkaba_tesseract",
        "title": "4D Tesseract & Sacred Merkaba",
        "fileName": "tesseract_4d.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 4D Hypercube projected into 3D with Astral Merkaba gimbal rings in Three.js WebGL! Follow @kreggsjs for daily code reels! ⚡📐",
        "isExisting": True
    },
    {
        "id": "cyber_synthwave_highway",
        "title": "Synthwave Grid & Neon Sun",
        "fileName": "synthwave_highway.js",
        "category": "Retro-Futurism & Cyberpunk",
        "genre": "synthwave",
        "caption": "🌆 Infinite Cyberpunk Synthwave Grid & Neon Horizon Sun in Three.js WebGL! Follow @kreggsjs for daily code reels! ⚡🕹️",
        "isExisting": True
    },
    {
        "id": "bioluminescent_jellyfish",
        "title": "Bioluminescent Abyssal Jellyfish",
        "fileName": "abyssal_jellyfish.js",
        "category": "Organic Physics & Marine Bioluminescence",
        "genre": "lofi",
        "caption": "🪼 Mesmerizing Bioluminescent Deep-Sea Jellyfish undulating in Three.js WebGL! Follow @kreggsjs for daily creative code reels! 🌊✨",
        "isExisting": True
    },
    {
        "id": "quantum_dna_helix",
        "title": "Quantum DNA Double Helix",
        "fileName": "quantum_dna.js",
        "category": "Biotech & Quantum Genetics",
        "genre": "cyber",
        "caption": "🧬 Quantum DNA Double Helix & Nanotech Scanner in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬",
        "isExisting": True
    }
]

NEW_VISUALIZERS = (
    COSMOS_VISUALIZERS +
    DIMENSIONS_VISUALIZERS +
    QUANTUM_VISUALIZERS +
    CYBERPUNK_VISUALIZERS +
    ORGANIC_VISUALIZERS +
    CHAOS_VISUALIZERS +
    FLUID_VISUALIZERS
)

def main():
    print("=" * 60)
    print(f"⚡ GENERATING 100 3D THREE.JS CINEMATIC VISUALIZERS ⚡")
    print("=" * 60)

    # 1. Write the 94 new JavaScript visualizer files
    created_count = 0
    for viz in NEW_VISUALIZERS:
        js_code = generate_visualizer_js(viz)
        file_path = VIZ_DIR / f"{viz['id']}.js"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(js_code)
        created_count += 1
        print(f"  [+] Created visualizer ({created_count}/94): {viz['id']}.js")

    # 2. Build the master 100 visualizer catalog
    catalog = []
    
    # Add 6 existing
    for ev in EXISTING_VISUALIZERS:
        catalog.append({
            "id": ev["id"],
            "title": ev["title"],
            "fileName": ev["fileName"],
            "category": ev["category"],
            "genre": ev["genre"],
            "caption": ev["caption"]
        })

    # Add 94 new
    for nv in NEW_VISUALIZERS:
        catalog.append({
            "id": nv["id"],
            "title": nv["title"],
            "fileName": nv["fileName"],
            "category": nv["category"],
            "genre": nv["genre"],
            "caption": nv["caption"]
        })

    catalog_path = PROJECT_DIR / "visualizers_catalog.json"
    with open(catalog_path, "w", encoding="utf-8") as cf:
        json.dump(catalog, cf, indent=2)

    print("\n" + "=" * 60)
    print(f"🎉 Successfully built all {len(catalog)} visualizers!")
    print(f"   📂 Output Directory : {VIZ_DIR}")
    print(f"   📄 Catalog JSON    : {catalog_path}")
    print("=" * 60)

if __name__ == "__main__":
    main()
