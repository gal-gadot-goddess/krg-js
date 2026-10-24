// visualizers/quantum_teleportation_epr_entanglement_swapping.js
// Quantum Teleportation & EPR Entanglement Swapping
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_teleportation_epr_entanglement_swapping = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_teleportation_epr_entanglement_swapping",
    title: "Quantum Teleportation & EPR Entanglement Swapping",
    fileName: "teleportation_epr.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Quantum state teleportation via Bell State Measurement & non-local EPR pair entanglement swapping in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #quantumteleportation #entanglement #epr #bellstates #physics #codeart",
    
    displayCode: "// Quantum Teleportation State Decomposition\nfunction bellMeasurement(psi, phi_plus) {\n  // |psi>_1 ( |00> + |11> )_23 = 1/2 * sum_k |Bell_k>_12 (sigma_k |psi>_3)\n  return 0.5;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.8
    ],
    "beamCount": 3
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

      // Three Quantum Nodes: Alice, Source, Bob
      const nGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const nAlice = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({ color: c1 }));
      nAlice.position.x = -7.5;
      const nSource = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const nBob = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({ color: c2 }));
      nBob.position.x = 7.5;
      group.add(nAlice); group.add(nSource); group.add(nBob);

      // Entanglement Helices (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 16.0;
        const angle = u * 4.0;
        const rad = 1.0 + Math.sin(u * 2.0) * 0.5;

        pPos[i * 3] = u;
        pPos[i * 3 + 1] = Math.cos(angle) * rad;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;

        const col = c1.clone().lerp(c2, (u + 8.0) / 16.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const entangle = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(entangle);

      scene.userData = { group, nAlice, nBob, entangle, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.entangle.rotation.x = t * 1.5;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
