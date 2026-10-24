// visualizers/quantum_hall_skyrmion_spin_texture.js
// Quantum Hall Ferromagnetic Skyrmion Spin Textures
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_hall_skyrmion_spin_texture = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_hall_skyrmion_spin_texture",
    title: "Quantum Hall Ferromagnetic Skyrmion Spin Textures",
    fileName: "hall_skyrmion.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Topological Skyrmion spin texture with non-trivial winding number in quantum Hall 2D electron gas in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #skyrmion #quantumhall #spintronics #topology #physics #codeart",
    
    displayCode: "// Skyrmion Hedgehog Spin Field: m(r) = (sin(theta)*cos(phi), sin(theta)*sin(phi), cos(theta))\nfunction skyrmionWinding(r, lambda) {\n  // theta(r) = 2 * atan(lambda / r)\n  return 2.0 * Math.atan(lambda / r);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.25
    ],
    "coreRadius": 2.2
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
      camera.aspect = 1080 / 1920;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 Skyrmion 3D Vector Spin Arrows / Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 0.5 + Math.sqrt(Math.random()) * 8.5;
        const phi = Math.random() * Math.PI * 2;
        const theta = 2.0 * Math.atan(params.coreRadius / r);

        const x = Math.cos(phi) * r;
        const z = Math.sin(phi) * r;
        const y = Math.cos(theta) * 2.4;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (Math.cos(theta) + 1.0) * 0.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, phi, theta });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const skyrmion = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(skyrmion);

      scene.userData = { group, skyrmion, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.skyrmion.rotation.y = t * 0.55;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
