// ai_generator.js - Autonomous Daily Generative JS Algorithm Synthesizer
const fs = require('fs');
const path = require('path');

const THEMES = [
  { mode: 'three', theme: '3D Hyperdimensional Torus Knot and rotating particle nebulae' },
  { mode: 'three', theme: '3D Cybernetic Polyhedral Geodesic Sphere with vertex energy pulses' },
  { mode: 'three', theme: '3D Cosmic DNA Double Helix spiral with iridescent connecting rungs' },
  { mode: 'three', theme: '3D Rotating Klein Bottle topology wireframe with chromatic aberration' },
  { mode: 'three', theme: '3D Kinetic Gyroscopic Gimbal rings with glowing plasma center' },
  { mode: 'canvas', theme: 'Sacred geometry Metatron cube with concentric rotating mandala nodes' },
  { mode: 'canvas', theme: 'Chaotic Lorenz strange attractor in hyperspace with neon light trails' },
  { mode: 'canvas', theme: 'Magnetic vector flow field driven by turbulent curl noise vectors' },
  { mode: 'canvas', theme: 'Quantum particle wave-function interference with chromatic dispersion' },
  { mode: 'canvas', theme: 'Black hole gravitational lensing photon sphere with swirling relativistic jets' }
];

async function generateNewAlgorithmWithPollinations(history = []) {
  const apiKey = process.env.POLLINATIONS_API_KEY;
  const usedTitles = history.map(h => h.title || h.id || '');
  
  const availableThemes = THEMES.filter(t => !usedTitles.some(u => u.toLowerCase().includes(t.theme.slice(0, 10))));
  const chosenItem = availableThemes.length > 0 
    ? availableThemes[Math.floor(Math.random() * availableThemes.length)]
    : THEMES[Math.floor(Math.random() * THEMES.length)];

  const selectedTheme = chosenItem.theme;
  const isThree = chosenItem.mode === 'three';

  console.log(`[AI Generator] Querying Pollinations AI for [${isThree ? '3D Three.js' : 'Canvas 2D'}] theme: "${selectedTheme}"...`);

  if (!apiKey) {
    console.log('[AI Generator] No POLLINATIONS_API_KEY provided, falling back to algorithmic rotation.');
    return null;
  }

  const prompt = isThree ? `You are a master creative technologist and 3D WebGL artist in Three.js and JavaScript.
Create an impressive, jaw-dropping 3D WebGL animation in Three.js on the theme: "${selectedTheme}".

Requirements:
1. Return ONLY a valid JSON object (no markdown wrapper, no backticks, no commentary).
2. The JSON must have these exact fields:
   - "id": a unique snake_case string (e.g. "three_cyber_helix_82")
   - "title": a dramatic hook title under 40 characters (e.g. "3D Cybernetic Helix")
   - "fileName": filename ending in .js (e.g. "cyber_helix_3d.js")
   - "caption": viral Instagram/Facebook caption with 5-8 hashtags and call to follow @kreggsjs
   - "isThreeJS": true
   - "code": a clean, beautifully formatted JavaScript function string representing the code (15-22 lines maximum, lines under 55 characters so they fit the IDE without horizontal wrapping)
   - "initThreeString": "(function(THREE, scene, camera, renderer) { while(scene.children.length>0) scene.remove(scene.children[0]); camera.position.set(0,0,5); /* add glowing meshes, wireframes, or points */ })"
   - "renderThreeString": "(function(THREE, scene, camera, renderer, t) { /* animate rotations, scales, colors based on t */ renderer.render(scene, camera); })"`
  : `You are a master creative technologist and generative artist in JavaScript.
Create an impressive, high-visual-quality HTML5 Canvas 2D animation on the theme: "${selectedTheme}".

Requirements:
1. Return ONLY a valid JSON object (no markdown wrapper, no backticks, no commentary).
2. The JSON must have these exact fields:
   - "id": a unique snake_case string (e.g. "hypnotic_tesseract_102")
   - "title": a dramatic hook title under 40 characters (e.g. "Hyperdimensional Tesseract")
   - "fileName": filename ending in .js (e.g. "tesseract.js")
   - "caption": viral Instagram/Facebook caption with 5-8 hashtags and call to follow @kreggsjs
   - "code": a clean, beautifully formatted JavaScript function string representing the code (15-22 lines maximum, lines under 55 characters so they fit the IDE without horizontal wrapping)
   - "renderString": a self-contained JavaScript function of the form:
     "(function(ctx, width, height, t) { ... })"
     - "ctx" is the Canvas 2D rendering context
     - "width" is canvas width (984)
     - "height" is canvas height (784)
     - "t" is elapsed time in seconds (running smoothly at 60 FPS)
     - Must clear canvas with a dark neon aesthetic background (e.g. '#070614' or 'rgba(7, 6, 20, 0.2)' for motion blur trails)
     - Must draw glowing neon strokes, particles, geometry, or vectors
     - Must look fluid, intricate, and jaw-dropping.`;

  try {
    const response = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai",
        messages: [
          { role: "system", content: "You generate production-ready generative art algorithms for HTML5 Canvas. Always return raw JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.85,
        seed: Math.floor(Math.random() * 1000000)
      })
    });

    if (!response.ok) {
      console.warn(`[AI Generator] Pollinations API responded with HTTP ${response.status}`);
      return null;
    }

    const json = await response.json();
    let text = json.choices[0].message.content.trim();
    text = text.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
    const algo = JSON.parse(text);

    if (algo.id && algo.title && algo.code) {
      if (algo.isThreeJS && algo.renderThreeString) {
        eval(algo.renderThreeString);
        console.log(`[AI Generator] Successfully synthesized 3D Three.js algorithm: "${algo.title}"!`);
        return algo;
      } else if (algo.renderString) {
        eval(algo.renderString);
        console.log(`[AI Generator] Successfully synthesized Canvas 2D algorithm: "${algo.title}"!`);
        return algo;
      }
    }
  } catch (err) {
    console.warn('[AI Generator] Synthesis attempt encountered error:', err.message);
  }

  return null;
}

module.exports = { generateNewAlgorithmWithPollinations, THEMES };
