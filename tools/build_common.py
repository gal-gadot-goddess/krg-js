import json
from pathlib import Path

def generate_visualizer_js(viz):
    """
    Generates standard UMD JavaScript module for a 3D Three.js visualizer.
    """
    viz_id = viz["id"]
    title = viz["title"]
    file_name = viz["fileName"]
    category = viz["category"]
    genre = viz.get("genre", "cosmic")
    caption = viz["caption"]
    display_code = viz["displayCode"]
    default_params = json.dumps(viz["defaultParams"], indent=4)
    init_body = viz["initBody"]
    render_body = viz["renderBody"]

    js_code = f"""// visualizers/{viz_id}.js
// {title}
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {{
  if (typeof module === 'object' && module.exports) {{
    module.exports = factory();
  }} else {{
    root.VISUALIZERS = root.VISUALIZERS || {{}};
    root.VISUALIZERS.{viz_id} = factory();
  }}
}})(typeof self !== 'undefined' ? self : this, function() {{

  return {{
    id: "{viz_id}",
    title: "{title}",
    fileName: "{file_name}",
    category: "{category}",
    genre: "{genre}",
    caption: {json.dumps(caption)},
    
    displayCode: {json.dumps(display_code)},

    defaultParams: {default_params},

    init: function(THREE, scene, camera, renderer, params) {{
      params = Object.assign({{}}, this.defaultParams, params || {{}});

      // Clear existing objects
      while (scene.children.length > 0) {{
        const obj = scene.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {{
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }}
        scene.remove(obj);
      }}

      // Camera base config
      camera.fov = 50;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

{init_body}
    }},

    render: function(THREE, scene, camera, renderer, t, params) {{
      const data = scene.userData;
      if (!data) return;

{render_body}

      renderer.render(scene, camera);
    }}
  }};
}});
"""
    return js_code
