// visualizers/clifford_chaotic_attractor.js
// Clifford Discrete Chaotic Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.clifford_chaotic_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "clifford_chaotic_attractor",
    title: "Clifford Discrete Chaotic Attractor",
    fileName: "clifford_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Clifford discrete trigonometric strange attractor forming fractal interference waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #clifford #fractal #chaostheory #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Clifford Trigonometric Iterated Map\nfunction stepClifford(x, y, a = -1.4, b = 1.6, c = 1.0, d = 0.7) {\n  const xNext = Math.sin(a * y) + c * Math.cos(a * x);\n  const yNext = Math.sin(b * x) + d * Math.cos(b * y);\n  return { x: xNext, y: yNext };\n}",

    defaultParams: {
    "particleCount": 10000,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.7
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

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      let x = 0.1, y = 0.1;
      const a = -1.4, b = 1.6, c = 1.0, d = 0.7;

      for (let i = 0; i < count; i++) {
        const xN = Math.sin(a * y) + c * Math.cos(a * x);
        const yN = Math.sin(b * x) + d * Math.cos(b * y);
        x = xN; y = yN;

        pos[i * 3 + 0] = x * 3.5;
        pos[i * 3 + 1] = y * 3.5;
        pos[i * 3 + 2] = Math.sin(i * 0.05) * 2.0;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
