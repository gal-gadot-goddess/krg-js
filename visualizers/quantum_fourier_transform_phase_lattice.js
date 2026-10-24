// visualizers/quantum_fourier_transform_phase_lattice.js
// Quantum Fourier Transform Unitary Phase Rotation Lattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_fourier_transform_phase_lattice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_fourier_transform_phase_lattice",
    title: "Quantum Fourier Transform Unitary Phase Rotation Lattice",
    fileName: "qft_phase_lattice.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udcbb Quantum algorithm core: Quantum Fourier Transform unitary controlled-phase rotation cascade in Three.js! Follow @kreggsjs for daily reels! \u26a1\u269b\ufe0f\n\n#threejs #webgl #qft #quantumcomputing #shorsalgorithm #cyberpunk #codeart",
    
    displayCode: "// Quantum Fourier Transform Unitary: |j> -> 1/sqrt(N) * sum_k exp(2*pi*i*j*k/N) |k>\nfunction qftPhase(j, k, N) {\n  const theta = (2.0 * Math.PI * j * k) / N;\n  return new THREE.Vector2(Math.cos(theta), Math.sin(theta));\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
    ],
    "qubitStages": 8
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

      // 8 Qubit Register Lines with Controlled Phase Rotation Gates
      for (let q = 0; q < params.qubitStages; q++) {
        const y = -7.0 + q * 2.0;
        const line = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 16.0, 16),
          new THREE.MeshBasicMaterial({ color: 0x475569 })
        );
        line.rotation.z = Math.PI / 2;
        line.position.y = y;
        group.add(line);
      }

      // 20,000 Unitary Phase Wave Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const q = Math.floor(Math.random() * params.qubitStages);
        const y = -7.0 + q * 2.0;
        const x = (Math.random() - 0.5) * 15.0;
        const phase = (x * (q + 1) * 0.8);
        const z = Math.sin(phase) * 1.5;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y + Math.cos(phase) * 0.6; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, q / params.qubitStages);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const qft = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(qft);

      scene.userData = { group, qft, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
