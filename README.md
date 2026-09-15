# krg-js ⚡ Autonomous Creative JavaScript Reel Generator

Autonomous 1080x1920 Instagram & Facebook Reels generator.
Every day, this system synthesizes a new algorithmic JavaScript visualization, animates a clean IDE window typing out the code with auto-scrolling, and publishes it automatically as a Reel to **Facebook Page (Kreggsjs)** and **Instagram Reels (@kreggsjs)** without publishing to the profile grid.

## 🎯 Architecture
1. **Dynamic Visual Algorithms Pool**:
   - `algorithms.js` contains a collection of diverse, hypnotic Canvas 2D / WebGL algorithms (Quantum Spiral Vortex, Cyber Flow Fields, Sacred Metatron Geometry, Chaotic Strange Attractors, etc.).
   - Rotates through algorithms and ensures no duplicates via `history.json`.
2. **Auto-Scrolling Code Window & Live Visualization**:
   - `template.html`: Standard 1080x1920 vertical format.
   - Section 1: Dark glassmorphism code editor typing the algorithm code with syntax highlighting. Automatically scrolls upwards smoothly so the active typing line is always visible and never cropped on left or right.
   - Section 2: Real-time Canvas 2D visualization rendering the algorithm at 60 FPS.
3. **Procedural Lo-Fi Sound Generator**:
   - `sound_synth.js`: Synthesizes warm chords, sub-bass, punchy lo-fi hip-hop drums, and synth arpeggios into synchronized audio.
4. **Headless 1080p Video Renderer**:
   - `render_reel.js`: Uses headless Chrome via Puppeteer to capture exact 30 FPS frames and pipes directly into FFmpeg H.264/AAC.
5. **Multi-Platform Publisher**:
   - `publisher.py`:
     - Commits video to GitHub CDN for fast global streaming.
     - Publishes to **Instagram Reels** with `share_to_feed='false'` (Reels tab ONLY).
     - Publishes to **Facebook Reels** for Page `Kreggsjs`.

## 🚀 Running the Generator
```bash
node daily_reel_runner.js
```
