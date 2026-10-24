// visualizers/quantum_annealing_spin_glass.js
// Quantum Annealing Ising Spin Glass Flux Lattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_annealing_spin_glass = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_annealing_spin_glass",
    title: "Quantum Annealing Ising Spin Glass Flux Lattice",
    fileName: "quantum_annealing.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\u26a1 D-Wave quantum annealing superconducting flux qubits tunneling through energetic barriers into global ground state in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u269b\ufe0f\n\n#threejs #webgl #quantumannealing #isingmodel #qubits #spinglass #cyberpunk #creativecoding #javascript #reels",
    
    displayCode: "// Transverse Ising Model Quantum Hamiltonian\nfunction isingHamiltonian(spins, J_couplings, Gamma_t) {\n  let energy = 0;\n  for (let i = 0; i < spins.length; i++) {\n    energy += -Gamma_t * Math.cos(spins[i]);\n  }\n  return energy; // adiabatic quantum annealing path\n}",

    defaultParams: {
    "primaryColor": [
        0.1,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.55
    ],
    "gridSize": 12
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

      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.gridSize;
      const spins = [];

      for (let x = -n/2; x < n/2; x++) {
        for (let y = -n/2; y < n/2; y++) {
          const sMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8),
            new THREE.MeshBasicMaterial({ color: (Math.random() > 0.5 ? c1 : c2) })
          );
          sMesh.position.set(x * 1.1, y * 1.1, 0);
          group.add(sMesh);
          spins.push(sMesh);
        }
      }

      scene.userData = { group, spins, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;
      // Quantum tunneling stochastic spin flips
      data.spins.forEach((s, idx) => {
        if (Math.sin(t * 12.0 + idx) > 0.85) {
          s.rotation.x = Math.PI;
        } else {
          s.rotation.x = 0;
        }
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
