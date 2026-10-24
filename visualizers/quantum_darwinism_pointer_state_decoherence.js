// visualizers/quantum_darwinism_pointer_state_decoherence.js
// Quantum Darwinism Redundant Pointer State Decoherence
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_darwinism_pointer_state_decoherence = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_darwinism_pointer_state_decoherence",
    title: "Quantum Darwinism Redundant Pointer State Decoherence",
    fileName: "quantum_darwinism.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Quantum Darwinism: how classical reality emerges from quantum superpositions through redundant environment recording in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #quantumdarwinism #decoherence #quantum #physics #codeart",
    
    displayCode: "// Quantum Darwinism Mutual Information Plateau\nfunction mutualInformation(S_S, S_E, S_SE) {\n  // I(S : E) = S(S) + S(E) - S(S, E) = H_classical\n  return S_S + S_E - S_SE;\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.25
    ],
    "redundancy": 48
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

      // Central Quantum System S
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })));

      // Environment Observer Fragments (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = 2.5 + Math.random() * 8.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);

        const col = c1.clone().lerp(c2, (r - 2.5) / 8.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const env = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(env);

      scene.userData = { group, env, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.env.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
