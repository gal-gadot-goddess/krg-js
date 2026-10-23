// visualizers/nautilus_logarithmic_spiral.js
// Nautilus Logarithmic Shell
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.nautilus_logarithmic_spiral = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "nautilus_logarithmic_spiral",
    title: "Nautilus Logarithmic Shell",
    fileName: "nautilus_shell.js",
    category: "Organic Physics & Bioluminescence",
    genre: "sacred",
    caption: "\ud83d\udc1a Perfect mathematical logarithmic equiangular spiral shell of the ancient Nautilus in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0a\ud83d\udcd0\n\n#threejs #webgl #nautilus #fibonacci #nature #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Logarithmic Equiangular Spiral: r = a * exp(b * theta)\nfunction nautilusChamberPoint(theta, a = 0.35, b = 0.17) {\n  const r = a * Math.exp(b * theta);\n  const x = r * Math.cos(theta);\n  const y = r * Math.sin(theta);\n  const z = (theta / (Math.PI * 6)) * 2.5; // Axial shell width\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "chambers": 80,
    "turns": 4.5,
    "primaryColor": [
        1.0,
        0.85,
        0.65
    ],
    "secondaryColor": [
        0.3,
        0.8,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const pts = [];
      const steps = 300;
      for (let i = 0; i < steps; i++) {
        const th = (i / steps) * Math.PI * 2 * params.turns;
        const r = 0.3 * Math.exp(0.14 * th);
        pts.push(new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r, (i / steps) * 4.0 - 2.0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const spiral = new THREE.Line(geo, mat);
      group.add(spiral);

      scene.userData = { group, spiral, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.7;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.4;
      data.group.rotation.y = Math.cos(t * 0.4) * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
