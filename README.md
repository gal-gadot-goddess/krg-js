# ⚡ 3D Three.js Cinematic Reels & Shorts Generator Suite
### Autonomous 1080×1920 60 FPS Vertical Video Engine for YouTube Shorts, Instagram Reels & TikTok

A production-grade, zero-failure generative video engine that pairs an ultra-sleek dark glassmorphic HUD and live code typing with breathtaking, full-bleed 60 FPS 3D WebGL visualizations in Three.js, accompanied by procedural genre-matched audio and bot-ready metadata.

---

## 🌟 Architecture & Engine Highlights

| Feature | Description |
|---|---|
| **200 Unique Masterpiece Engines** | 200 completely distinct, mathematically and scientifically grounded 3D visualizer modules across 7 categories with **zero name or theme repetition**. |
| **Full-Bleed 1080×1920 Canvas** | The 3D scene fills the entire 9:16 vertical screen with deep cosmic voids, glowing particles, relativistic geodesics, and fluid simulations. |
| **Floating Glassmorphic HUD** | Translucent frosted glass card displaying live 60 FPS compute metrics and auto-scrolling, token-safe syntax highlighted code typing. |
| **Zero Failure Rate / 100% Deterministic** | All 200 visualizer modules are fully validated with Node.js and require zero external cloud LLM dependencies at render time. |
| **Fast Hardware-Accelerated Capture** | Native Chromium WebGL hardware acceleration renders a full 60 FPS 1080x1920 video in **~15-20 seconds**. |
| **Infinite Procedural Variations** | Dynamic multi-palette mapping, seed permutations, camera choreographies, and speed multipliers yielding thousands of daily unique variations. |

---

## 🎨 Master Library of 200 Distinct 3D Visualizer Engines

The suite includes **200 self-contained Three.js engines** located in [`visualizers/`](visualizers/) across 7 categories:

1. **Astrophysics & Relativity (30 Engines)**
   * Singularities, Kerr ergospheres, gravitational lensing, magnetar starquakes, Herbig-Haro bipolar jets, accretion disks, neutron star nuclear pasta, supernovas, Sombrero galaxy dust lanes, and primordial black hole clusters.
2. **Higher Dimensions & Sacred Geometry (30 Engines)**
   * 4D tesseract projections, Calabi-Yau 6D manifolds, Klein bottles, Costa minimal surfaces, Steiner's Roman surfaces, Boy's projective planes, Barth sextics, Kuen surfaces, and Hopf link torus chains.
3. **Quantum Mechanics & Photonic Optics (30 Engines)**
   * Quantum Hall chiral edge states, Josephson fluxon solitons, optical tweezers, Majorana fermion braiding, Higgs symmetry breaking, Cherenkov shock cones, Bloch sphere precession, and polariton condensates.
4. **Organic Physics & Bioluminescence (30 Engines)**
   * Glass diatom frustules, Bacteriophage T4 nanomachines, ATP synthase rotary turbines, kinesin microtubule walkers, chloroplast grana stacks, radiolarian silica skeletons, and CRISPR-Cas9 unwinding.
5. **Chaos Theory, Attractors & Non-Linear Dynamics (30 Engines)**
   * Lorenz strange attractors, Arnold tongues, Duffing double-wells, Van der Pol relaxation cycles, Ikeda laser chaos, Chua double-scrolls, Hindmarsh-Rose bursting neurons, and Newton-Leipnik twins.
6. **Fluid Dynamics, Acoustic Waves & Plasmas (25 Engines)**
   * Kelvin-Helmholtz shear billows, Von Kármán vortex streets, supersonic Mach diamonds, acoustic levitation nodes, Faraday cymatics, MHD Alfvén coronal waves, and Z-pinch plasma compression.
7. **Cyberpunk, Holographic Optics & Digital Systems (25 Engines)**
   * Quantum annealing spin glasses, 5D NeRF volumetric voxels, surface code quantum error correction, magic-angle twisted bilayer graphene moiré lattices, and topological laser arrays.

---

## 🚀 Quickstart Commands

### 1. Run Autonomous Daily Reel (Auto-rotates across all 200 visualizers)
```bash
python generate_daily_reel.py
```
This inspects `history.json`, picks the least-recently used visualizer among all 200, applies a new procedural variation seed, generates matching procedural audio, renders 1080x1920 60 FPS MP4, extracts a preview thumbnail, and writes metadata JSON.

### 2. Render a Random Reel Locally
```bash
python tools/pick_and_render_random.py
```

### 3. Render a Specific Visualizer & Variation
```bash
python render_reel.py --visualizer black_hole_gargantua --variation 0 --duration 10 --fps 60
python render_reel.py --visualizer kerr_black_hole_ergosphere --variation 5 --duration 12
python render_reel.py --visualizer diatom_silica_frustule_lattice --duration 10
```

### 4. Interactive Browser Preview
Open `template_reel.html` directly in any modern browser:
* `template_reel.html?visualizer=kerr_black_hole_ergosphere&var=0`
* `template_reel.html?visualizer=costa_minimal_surface&var=1`
* `template_reel.html?visualizer=diatom_silica_frustule_lattice&var=2`

---

## 🤖 Output Artifacts Schema

For every rendered reel, 3 standardized files are generated in `output_videos/`:
```text
├── reel_{visualizer}_var_{N}.mp4           # 1080x1920 60 FPS H.264 / AAC High-Bitrate Video
├── reel_{visualizer}_var_{N}_preview.png   # 1080x1920 High-Res Thumbnail / Cover
└── reel_{visualizer}_var_{N}_meta.json     # YouTube Shorts / Instagram Reels Bot Metadata
```
