// visualizers/magnetic_skyrmion_vortex.js
// Magnetic Skyrmion Vortex
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.magnetic_skyrmion_vortex = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "magnetic_skyrmion_vortex",
    title: "Magnetic Skyrmion Vortex",
    fileName: "magnetic_skyrmion.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\ud83c\udf00 Nanoscale topologically protected chiral magnetic spin whirl! Magnetic skyrmion vortex memory in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #skyrmion #spintronics #nanotech #physics #creativecoding #javascript #reels",
    
    displayCode: "// Chiral Hedgehog Magnetic Spin Field Texture\nfunction calculateSkyrmionVector(x, y, radius = 4.0) {\n  const r = Math.sqrt(x*x + y*y);\n  const theta = (r / radius) * Math.PI; // Core pointing down, rim pointing up\n  const phi = Math.atan2(y, x) + Math.PI / 2; // Chiral twist\n  const mx = Math.sin(theta) * Math.cos(phi);\n  const my = Math.sin(theta) * Math.sin(phi);\n  const mz = Math.cos(theta);\n  return new THREE.Vector3(mx, my, mz);\n}",

    defaultParams: {
    "gridRes": 32,
    "vortexRadius": 4.5,
    "primaryColor": [
        0.1,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.5
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

      const res = params.gridRes;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      let idx = 0;
      for (let i = 0; i < res; i++) {
        const x = ((i / res) - 0.5) * 10;
        for (let j = 0; j < res; j++) {
          const y = ((j / res) - 0.5) * 10;
          const r = Math.sqrt(x*x + y*y);
          const th = (r / params.vortexRadius) * Math.PI;

          pos[idx * 3 + 0] = x;
          pos[idx * 3 + 1] = y;
          pos[idx * 3 + 2] = Math.cos(th) * 2.0;

          const u = (Math.cos(th) + 1.0) / 2.0;
          col[idx * 3 + 0] = params.primaryColor[0] * u + params.secondaryColor[0] * (1 - u);
          col[idx * 3 + 1] = params.primaryColor[1] * u + params.secondaryColor[1] * (1 - u);
          col[idx * 3 + 2] = params.primaryColor[2] * u + params.secondaryColor[2] * (1 - u);
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.2, vertexColors: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 1.5;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
