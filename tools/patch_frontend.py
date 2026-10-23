# tools/patch_frontend.py
from pathlib import Path

PROJECT_DIR = Path(__file__).parent.parent.resolve()

# 1. Update variations_engine.js
var_engine_path = PROJECT_DIR / "variations_engine.js"
with open(var_engine_path, "r", encoding="utf-8") as f:
    v_content = f.read()

target_default = '''      default: {
        baseTitle = visualizerId;
        category = "Creative Coding";
        fileName = "algorithm.js";
        customCodeSnippet = "// 3D WebGL Algorithmic Visualizer";
        caption = "#threejs #webgl #creativecoding #reels";
      }'''

new_default = '''      default: {
        const vizDef = (typeof window !== 'undefined' && window.VISUALIZERS && window.VISUALIZERS[visualizerId]) ? window.VISUALIZERS[visualizerId] : null;
        if (vizDef) {
          baseTitle = vizDef.title || visualizerId;
          category = vizDef.category || "Creative Coding";
          fileName = vizDef.fileName || `${visualizerId}.js`;
          customCodeSnippet = vizDef.displayCode || "// 3D Three.js Visualizer";
          caption = vizDef.caption || "#threejs #webgl #creativecoding #reels";
          if (vizDef.defaultParams) {
            specificParams = Object.assign({}, vizDef.defaultParams);
          }
        } else {
          baseTitle = visualizerId;
          category = "Creative Coding";
          fileName = "algorithm.js";
          customCodeSnippet = "// 3D WebGL Algorithmic Visualizer";
          caption = "#threejs #webgl #creativecoding #reels";
        }
      }'''

if target_default in v_content:
    v_content = v_content.replace(target_default, new_default)
    with open(var_engine_path, "w", encoding="utf-8") as f:
        f.write(v_content)
    print("Updated variations_engine.js successfully")
else:
    print("Could not find target_default in variations_engine.js")

# 2. Update template_reel.html
template_path = PROJECT_DIR / "template_reel.html"
with open(template_path, "r", encoding="utf-8") as f:
    t_content = f.read()

old_set_viz = '''    // Set Active Visualization & Variation
    window.setVisualization = function(visualizerId, variationIndex = 0) {
      initThree();

      const viz = window.VISUALIZERS[visualizerId] || window.VISUALIZERS["black_hole_gargantua"];
      const variation = window.VariationsEngine.createVariation(viz.id, variationIndex);

      currentVisualizer = viz;
      currentVariation = variation;

      // Update DOM
      document.getElementById('mainTitle').innerText = variation.title;
      document.getElementById('categoryTag').innerText = variation.category;
      document.getElementById('tabFileName').innerText = variation.fileName;
      document.getElementById('previewSubtitle').innerText = `${viz.title} (${variation.paletteName})`;

      // Dynamic ambient glow
      document.getElementById('glowOrb1').style.background = `radial-gradient(circle, ${variation.bgGlow} 0%, transparent 70%)`;

      // Initialize 3D scene with variation parameters
      viz.init(THREE, threeScene, threeCamera, threeRenderer, variation.params);

      // Seek to t = 0
      window.setSeekTime(0.0);
    };'''

new_set_viz = '''    function loadVisualizerModule(vizId, callback) {
      if (window.VISUALIZERS && window.VISUALIZERS[vizId]) {
        callback(window.VISUALIZERS[vizId]);
        return;
      }
      const s = document.createElement('script');
      s.src = `visualizers/${vizId}.js`;
      s.onload = () => {
        if (window.VISUALIZERS && window.VISUALIZERS[vizId]) {
          callback(window.VISUALIZERS[vizId]);
        } else {
          console.warn("Visualizer not found in window.VISUALIZERS, falling back:", vizId);
          callback(window.VISUALIZERS["black_hole_gargantua"]);
        }
      };
      s.onerror = (e) => {
        console.error("Failed to load visualizer script:", vizId, e);
        callback(window.VISUALIZERS["black_hole_gargantua"]);
      };
      document.head.appendChild(s);
    }

    // Set Active Visualization & Variation
    window.setVisualization = function(visualizerId, variationIndex = 0, onReady) {
      initThree();

      loadVisualizerModule(visualizerId, (viz) => {
        const variation = window.VariationsEngine.createVariation(viz.id, variationIndex);

        currentVisualizer = viz;
        currentVariation = variation;

        // Update DOM
        document.getElementById('mainTitle').innerText = variation.title;
        document.getElementById('categoryTag').innerText = variation.category;
        document.getElementById('tabFileName').innerText = variation.fileName;
        document.getElementById('previewSubtitle').innerText = `${viz.title} (${variation.paletteName})`;

        // Dynamic ambient glow
        document.getElementById('glowOrb1').style.background = `radial-gradient(circle, ${variation.bgGlow} 0%, transparent 70%)`;

        // Initialize 3D scene with variation parameters
        viz.init(THREE, threeScene, threeCamera, threeRenderer, variation.params);

        // Seek to t = 0
        window.setSeekTime(0.0);

        if (typeof onReady === 'function') onReady();
      });
    };'''

old_dom_loaded = '''    // Auto-parse URL query parameters (e.g. ?visualizer=black_hole_gargantua&var=2)
    window.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const vizId = params.get('visualizer') || 'black_hole_gargantua';
      const varIdx = parseInt(params.get('var') || '0', 10);

      window.setVisualization(vizId, varIdx);
      window.startRealtimePlayback();
    });'''

new_dom_loaded = '''    // Auto-parse URL query parameters (e.g. ?visualizer=black_hole_gargantua&var=2)
    window.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const vizId = params.get('visualizer') || 'black_hole_gargantua';
      const varIdx = parseInt(params.get('var') || '0', 10);

      window.setVisualization(vizId, varIdx, () => {
        window.startRealtimePlayback();
      });
    });'''

if old_set_viz in t_content:
    t_content = t_content.replace(old_set_viz, new_set_viz)
    if old_dom_loaded in t_content:
        t_content = t_content.replace(old_dom_loaded, new_dom_loaded)
    with open(template_path, "w", encoding="utf-8") as f:
        f.write(t_content)
    print("Updated template_reel.html successfully")
else:
    print("Could not find old_set_viz in template_reel.html")
