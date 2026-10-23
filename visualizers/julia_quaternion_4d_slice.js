// visualizers/julia_quaternion_4d_slice.js
// 4D Quaternion Julia Fractal
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.julia_quaternion_4d_slice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "julia_quaternion_4d_slice",
    title: "4D Quaternion Julia Fractal",
    fileName: "quaternion_julia.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83d\udd2e 4-Dimensional Quaternion Julia Set cross-section rotating dynamically through 3D hyperplane in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #quaternion #juliaset #4d #fractal #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Hypercomplex Quaternion Iteration: q -> q^2 + C\nfunction quaternionSquare(q, C) {\n  // q = (r, i, j, k)\n  const [r, i, j, k] = q;\n  const rNext = r*r - i*i - j*j - k*k + C[0];\n  const iNext = 2*r*i + C[1];\n  const jNext = 2*r*j + C[2];\n  const kNext = 2*r*k + C[3];\n  return [rNext, iNext, jNext, kNext];\n}",

    defaultParams: {
    "particleCount": 8500,
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.85,
        0.2,
        0.95
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
        const v = Math.random() * Math.PI;
        const r = 4.5 + Math.sin(u * 4) * Math.cos(v * 4) * 0.9;
        pos[i * 3 + 0] = Math.sin(v) * Math.cos(u) * r;
        pos[i * 3 + 1] = Math.sin(v) * Math.sin(u) * r;
        pos[i * 3 + 2] = Math.cos(v) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0xa855f7, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
