// visualizers/rydberg_atom_quantum_simulator_blockade.js
// Rydberg Atom Quantum Simulator & Dipole Blockade Spheres
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.rydberg_atom_quantum_simulator_blockade = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "rydberg_atom_quantum_simulator_blockade",
    title: "Rydberg Atom Quantum Simulator & Dipole Blockade Spheres",
    fileName: "rydberg_blockade.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Neutral atom quantum simulator: Rydberg blockade spheres preventing simultaneous double excitation via van der Waals interactions in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #rydberg #quantumcomputing #atoms #quantumsimulator #physics #codeart",
    
    displayCode: "// Rydberg Blockade Radius: R_b = (C_6 / hbar * Omega)^(1/6)\nfunction rydbergBlockade(C_6, omega) {\n  return Math.pow(C_6 / omega, 1.0 / 6.0);\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.55
    ],
    "blockadeRadius": 3.8
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

      // 3D Optical Tweezer Atom Array Grid (3x3x3)
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const atom = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            atom.position.set(x * 4.5, y * 4.5, z * 4.5);
            group.add(atom);
          }
        }
      }

      // Rydberg Blockade Sphere Shell
      const bGeo = new THREE.SphereGeometry(params.blockadeRadius, 32, 32);
      const bMat = new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.75, wireframe: true, transparent: true, opacity: 0.6 });
      const bSphere = new THREE.Mesh(bGeo, bMat);
      group.add(bSphere);

      scene.userData = { group, bSphere, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const s = 1.0 + Math.sin(t * 2.5) * 0.25;
      data.bSphere.scale.set(s, s, s);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
