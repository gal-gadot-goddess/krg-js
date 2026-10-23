// visualizers/dandelion_pappus_wind_dispersal.js
// Dandelion Pappus Vortex Ring Drift
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dandelion_pappus_wind_dispersal = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dandelion_pappus_wind_dispersal",
    title: "Dandelion Pappus Vortex Ring Drift",
    fileName: "dandelion_pappus.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83c\udf3e Aerodynamic separated vortex ring keeping dandelion parachute seeds aloft in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf43\u2728\n\n#threejs #webgl #dandelion #aerodynamics #nature #botany #creativecoding #javascript #reels",
    
    displayCode: "// Separated Vortex Ring Aerodynamic Recirculation\nfunction generateDandelionFluff(spokes = 64, radius = 4.2) {\n  const fluffLines = [];\n  for (let s = 0; s < spokes; s++) {\n    const a = (s / spokes) * Math.PI * 2;\n    fluffLines.push(0, 0, 0);\n    fluffLines.push(Math.cos(a) * radius, 1.8, Math.sin(a) * radius);\n  }\n  return fluffLines;\n}",

    defaultParams: {
    "spokesCount": 72,
    "primaryColor": [
        0.95,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ]
},

    init: function(THREE, scene, camera, renderer, params) {
      params = Object.assign({}, this.defaultParams, params || {});

      // Clear existing objects
      while (scene.children.length > 0) {
        const obj = scene.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        scene.remove(obj);
      }

      // Camera base config
      camera.fov = 50;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 2, 16);
      camera.lookAt(0, 1, 0);

      const group = new THREE.Group();
      scene.add(group);

      const lines = [];
      const count = params.spokesCount;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        lines.push(0, -1, 0);
        lines.push(Math.cos(a) * 4.5, 2.5, Math.sin(a) * 4.5);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });
      const fluff = new THREE.LineSegments(geo, mat);
      group.add(fluff);

      scene.userData = { group, fluff, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 1, 0);

      renderer.render(scene, camera);
    }
  };
});
