// visualizers/bioluminescent_phytoplankton.js
// Bioluminescent Phytoplankton Waves
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bioluminescent_phytoplankton = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bioluminescent_phytoplankton",
    title: "Bioluminescent Phytoplankton Waves",
    fileName: "phytoplankton.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83c\udf0a Deep ocean wave swells glowing electric cyan with shear-stress activated dinoflagellate plankton in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0a\u2728\n\n#threejs #webgl #bioluminescence #ocean #phytoplankton #nature #creativecoding #javascript #reels",
    
    displayCode: "// Ocean Wave Shear Stress Luminescence\nfunction updateOceanSwells(grid, time) {\n  const pos = grid.geometry.attributes.position;\n  for (let i = 0; i < pos.count; i++) {\n    const x = pos.getX(i);\n    const z = pos.getZ(i);\n    // Trochoidal Gerstner wave displacement\n    const y = Math.sin(x * 0.4 + time * 3.0) * Math.cos(z * 0.4 + time * 2.5) * 2.2;\n    pos.setY(i, y);\n  }\n  pos.needsUpdate = true;\n}",

    defaultParams: {
    "waveGrid": 48,
    "primaryColor": [
        0.05,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.1,
        0.6,
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

      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.waveGrid;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          pos[idx * 3 + 0] = (i - res / 2) * 0.5;
          pos[idx * 3 + 1] = 0;
          pos[idx * 3 + 2] = (j - res / 2) * 0.5;
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x2dd4bf, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Points(geo, mat);
      group.add(mesh);

      scene.userData = { group, mesh, res, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.mesh.geometry.attributes.position;
      const res = data.res;
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          const x = pos.getX(idx);
          const z = pos.getZ(idx);
          const y = Math.sin(x * 0.5 + t * 4.0) * Math.cos(z * 0.5 + t * 3.0) * 1.8;
          pos.setY(idx, y);
          idx++;
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 8 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
