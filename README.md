# ⚡ 3D Three.js Cinematic Reels & Shorts Generator Suite
### Autonomous 1080×1920 60 FPS Vertical Video Engine for YouTube Shorts, Instagram Reels & TikTok

A production-grade, zero-failure generative video engine that pairs an ultra-sleek dark glassmorphic HUD and live code typing with breathtaking, full-bleed 60 FPS 3D WebGL visualizations in Three.js, accompanied by procedural genre-matched audio and bot-ready metadata.

---

## 🌟 Architecture & Engine Highlights

| Feature | Description |
|---|---|
| **300 Unique Masterpiece Engines** | 300 completely distinct, mathematically and scientifically grounded 3D visualizer modules across 7 categories with **zero name or theme repetition**. |
| **HDR UnrealBloom & ACES Filmic** | Integrated `EffectComposer` and `UnrealBloomPass` with recursion guards, delivering radiant, glowing neon optical halos on 3D particles and geometries. |
| **Full-Bleed 1080×1920 Canvas** | The 3D scene fills the entire 9:16 vertical screen with deep cosmic voids, glowing particles, relativistic geodesics, and fluid simulations. |
| **Sleek Cyber Telemetry HUD** | Translucent frosted glass card displaying live audio spectrum EQ frequency bars, rotating holographic sci-fi reticle, and token-safe syntax highlighted code typing. |
| **Zero Failure Rate / 100% Deterministic** | All 300 visualizer modules are fully validated with Node.js and require zero external cloud LLM dependencies at render time. |
| **Fast Hardware-Accelerated Capture** | Native Chromium WebGL hardware acceleration renders a full 60 FPS 1080x1920 video in **~15-20 seconds**. |
| **Infinite Procedural Variations** | Dynamic multi-palette mapping, seed permutations, camera choreographies, and speed multipliers yielding thousands of daily unique variations. |

---

## 🎨 Master Library of 300 Distinct 3D Visualizer Engines

The suite includes **300 self-contained Three.js engines** located in [`visualizers/`](visualizers/) across 7 categories:

1. **Astrophysics & Relativity (45 Engines)**
   * Relativistic pulsar light cylinders, quasar accretion torrents, binary neutron star kilonovas, Kerr black hole ergospheres with Doppler-beamed accretion disks, cosmic reionization Strömgren spheres, solar coronal mass ejections, Blazar beaming, and WHIM sheets.
2. **Higher Dimensions & Sacred Geometry (45 Engines)**
   * Enneper minimal surfaces, 4D Klein bottle slicing, Seifert genus-1 trefoil boundaries, Henneberg Möbius ruled surfaces, Kummer 16-nodal surfaces, Clebsch 27-line cubics, Poincaré octahedral honeycombs, and Schoen Gyroid TPMS labyrinths.
3. **Quantum Mechanics & High-Energy Physics (45 Engines)**
   * Quark-gluon plasma flux tube snapping, Casimir vacuum fluctuations, PMNS neutrino three-flavor oscillations, topological insulator Dirac cones, Feynman all-histories path integrals, composite fermion anyons, and Andreev reflections.
4. **Biophysics & Molecular Nanomachines (45 Engines)**
   * 70S Ribosome translation, SNARE vesicle fusion, Nuclear Pore FG hydrogel sieves, Myosin power strokes, Nav1.7 sodium channel activation, microtubule catastrophe, bacterial chemotaxis bundles, and LHCII chlorophyll FRET exciton networks.
5. **Chaos Theory & Non-Linear Dynamics (45 Engines)**
   * Hadley atmospheric circulation, Chen-Lee symmetric scrolls, Halvorsen ternary cyclic chaos, four-wing memristive hyperchaos, Arnéodo cascades, Thomas labyrinths, Burke-Shaw spherical chaos, and Belousov-Zhabotinsky 3D scroll rings.
6. **Fluid Dynamics & Plasma Shockwaves (40 Engines)**
   * Tokamak tearing mode magnetic islands, Richtmyer-Meshkov shock instabilities, Von Kármán vortex streets, Taylor-Green turbulence cascades, MHD blast waves, critical opalescence, ultrasonic cavitation microjets, and Prandtl-Meyer expansion fans.
7. **Cybernetics, Quantum Computing & Digital Topology (35 Engines)**
   * Quantum Fourier Transform cascades, STDP Hebbian neuromorphic networks, hyperbolic Poincaré knowledge graphs, Steane [[7,1,3]] quantum error correction polytopes, Sparse Voxel Octrees (SVO), and non-Abelian Majorana anyon braiding.

---

## 🚀 Quickstart Commands

### 1. Run Autonomous Daily Reel (Auto-rotates across all 300 visualizers)
```bash
python generate_daily_reel.py
```
This inspects `history.json`, picks the least-recently used visualizer among all 300, applies a new procedural variation seed, generates matching procedural audio, renders 1080x1920 60 FPS MP4, extracts a preview thumbnail, and writes metadata JSON.

### 2. Render a Specific Visualizer & Variation
```bash
python render_reel.py --visualizer pulsar_magnetosphere_polar_cap --var 1 --duration 8 --fps 60
python render_reel.py --visualizer kerr_black_hole_ergosphere --var 3 --duration 8
python render_reel.py --visualizer enneper_minimal_surface_weierstrass --duration 8
```
