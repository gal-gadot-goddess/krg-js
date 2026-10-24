// visualizers/quantum_computing_surface_code.js
// Surface Code Quantum Error Correction Stabilizer Plaquettes
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_computing_surface_code = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_computing_surface_code",
    title: "Surface Code Quantum Error Correction Stabilizer Plaquettes",
    fileName: "surface_code.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udc8e Fault-tolerant 2D surface code quantum error correction stabilizer lattice measuring Pauli X and Z syndrome plaquettes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcbb\n\n#threejs #webgl #surfacecode #quantumcomputing #errorcorrection #qubits #cyberpunk #creativecoding #javascript #reels",
    
    displayCode: "// Surface Code Stabilizer Syndrome Check\nfunction measureStabilizers(plaquetteType, qubits) {\n  // X-plaquette measures product of Pauli X, Z-plaquette measures Pauli Z\n  const syndrome = qubits.reduce((acc, q) => acc * q, 1);\n  return { syndrome, hasError: syndrome < 0 };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        0.45
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.7
    ],
    "gridSize": 8
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
      const plaquettes = new THREE.Group();
      group.add(plaquettes);

      for (let x = -n/2; x < n/2; x++) {
        for (let y = -n/2; y < n/2; y++) {
          const isXType = (x + y) % 2 === 0;
          const pMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1.2, 1.2),
            new THREE.MeshStandardMaterial({
              color: isXType ? c1 : c2, emissive: isXType ? c1 : c2, emissiveIntensity: 0.4, wireframe: true, side: THREE.DoubleSide
            })
          );
          pMesh.position.set(x * 1.4, y * 1.4, 0);
          plaquettes.add(pMesh);
        }
      }

      scene.userData = { group, plaquettes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
