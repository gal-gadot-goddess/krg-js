// ai_generator.js - Autonomous Daily Generative JS Algorithm Synthesizer
const fs = require('fs');
const path = require('path');

const THEMES = [
  "neon cybernetic neural network with pulsing synapse nodes and data packets",
  "chaotic lorenz strange attractor in high-dimensional hyperspace with glowing trails",
  "sacred geometry metatron cube with rotating interlocking harmonic mandala rings",
  "quantum particle wave-function interference with chromatic aberration dispersion",
  "phyllotaxis golden ratio spiral galaxy with expanding luminous stardust",
  "magnetic vector flow field driven by turbulent perlin-like curl noise",
  "hyperdimensional 4D tesseract rotating stereographic projection wireframe",
  "hypnotic reaction-diffusion organic cellular mitosis pattern",
  "laser spirograph epitrochoid laser harmonograph with neon gradient trails",
  "black hole gravitational lensing photon sphere with swirling relativistic jets"
];

async function generateNewAlgorithmWithPollinations(history = []) {
  const apiKey = process.env.POLLINATIONS_API_KEY;
  const usedTitles = history.map(h => h.title || h.id || '');
  
  const availableThemes = THEMES.filter(t => !usedTitles.some(u => u.toLowerCase().includes(t.slice(0, 10))));
  const selectedTheme = availableThemes.length > 0 
    ? availableThemes[Math.floor(Math.random() * availableThemes.length)]
    : THEMES[Math.floor(Math.random() * THEMES.length)];

  console.log(`[AI Generator] Querying Pollinations AI for theme: "${selectedTheme}"...`);

  if (!apiKey) {
    console.log('[AI Generator] No POLLINATIONS_API_KEY provided, falling back to algorithmic rotation.');
    return null;
  }

  const prompt = `You are a master creative technologist and generative artist in JavaScript.
Create an original, mesmerizing HTML5 Canvas 2D animation on the theme: "${selectedTheme}".

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

    if (algo.id && algo.title && algo.renderString && algo.code) {
      eval(algo.renderString);
      console.log(`[AI Generator] Successfully synthesized: "${algo.title}"!`);
      return algo;
    }
  } catch (err) {
    console.warn('[AI Generator] Synthesis attempt encountered error:', err.message);
  }

  return null;
}

module.exports = { generateNewAlgorithmWithPollinations, THEMES };
