// visualizers/mandelbulb_fractal_raymarch.js
// 3D Mandelbulb Hypercomplex Fractal
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.mandelbulb_fractal_raymarch = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "mandelbulb_fractal_raymarch",
    title: "3D Mandelbulb Hypercomplex Fractal",
    fileName: "mandelbulb_3d.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83d\udd2e 3D Mandelbulb power-8 spherical hypercomplex fractal with infinite geometric depth in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #mandelbulb #fractal #complexmath #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Power-8 3D Mandelbulb Formula: v -> v^8 + c\nfunction evaluateMandelbulbPoint(x0, y0, z0, maxIter = 12) {\n  let x = x0, y = y0, z = z0;\n  for (let i = 0; i < maxIter; i++) {\n    const r = Math.sqrt(x*x + y*y + z*z);\n    if (r > 2.0) return i; // Escaped\n    const theta = Math.atan2(Math.sqrt(x*x + y*y), z);\n    const phi = Math.atan2(y, x);\n    const r8 = Math.pow(r, 8);\n    x = r8 * Math.sin(theta * 8) * Math.cos(phi * 8) + x0;\n    y = r8 * Math.sin(theta * 8) * Math.sin(phi * 8) + y0;\n    z = r8 * Math.cos(theta * 8) + z0;\n  }\n  return maxIter;\n}",

    defaultParams: {
    "particleCount": 8500,
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.6
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
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const r = 4.2 + Math.sin(u * 8) * Math.cos(v * 8) * 0.8;
        pos[i * 3 + 0] = Math.sin(v) * Math.cos(u) * r;
        pos[i * 3 + 1] = Math.sin(v) * Math.sin(u) * r;
        pos[i * 3 + 2] = Math.cos(v) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0xf59e0b, blending: THREE.AdditiveBlending });
      const bulb = new THREE.Points(geo, mat);
      group.add(bulb);

      scene.userData = { group, bulb, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.6;
      data.group.rotation.y = t * 0.8;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
