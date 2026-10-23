// visualizers/fern_barnsley_fractal_3d.js
// 3D Barnsley Botanical Fractal
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.fern_barnsley_fractal_3d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "fern_barnsley_fractal_3d",
    title: "3D Barnsley Botanical Fractal",
    fileName: "barnsley_fern.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83c\udf3f Michael Barnsley iterated function system (IFS) botanical fern fractal growing in 3D in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf43\ud83d\udcd0\n\n#threejs #webgl #fractal #barnsley #nature #botany #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Barnsley Fern Affine Transformations IFS\nfunction iterateBarnsleyIFS(x, y, z) {\n  const r = Math.random();\n  if (r < 0.01) return { x: 0, y: 0.16 * y, z: 0 }; // Stem\n  if (r < 0.86) return { x: 0.85*x + 0.04*y, y: -0.04*x + 0.85*y + 1.6, z: 0.85*z }; // Successive leaflets\n  if (r < 0.93) return { x: 0.2*x - 0.26*y, y: 0.23*x + 0.22*y + 1.6, z: 0.2*z }; // Left leaflet\n  return { x: -0.15*x + 0.28*y, y: 0.26*x + 0.24*y + 0.44, z: -0.15*z }; // Right leaflet\n}",

    defaultParams: {
    "fernPoints": 9000,
    "primaryColor": [
        0.15,
        0.95,
        0.4
    ],
    "secondaryColor": [
        0.8,
        1.0,
        0.2
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

      camera.position.set(0, 4, 16);
      camera.lookAt(0, 4, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.fernPoints;
      const pos = new Float32Array(count * 3);
      let x = 0, y = 0, z = 0;
      for (let i = 0; i < count; i++) {
        const r = Math.random();
        if (r < 0.01) { x = 0; y = 0.16 * y; z = 0; }
        else if (r < 0.86) { const nx = 0.85*x + 0.04*y; y = -0.04*x + 0.85*y + 1.6; x = nx; z = 0.85*z; }
        else if (r < 0.93) { const nx = 0.2*x - 0.26*y; y = 0.23*x + 0.22*y + 1.6; x = nx; z = 0.2*z; }
        else { const nx = -0.15*x + 0.28*y; y = 0.26*x + 0.24*y + 0.44; x = nx; z = -0.15*z; }

        pos[i * 3 + 0] = x * 1.5;
        pos[i * 3 + 1] = y * 0.9 - 2.0;
        pos[i * 3 + 2] = z * 1.5;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x22c55e, blending: THREE.AdditiveBlending });
      const fern = new THREE.Points(geo, mat);
      group.add(fern);

      scene.userData = { group, fern, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 4 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 3, 0);

      renderer.render(scene, camera);
    }
  };
});
