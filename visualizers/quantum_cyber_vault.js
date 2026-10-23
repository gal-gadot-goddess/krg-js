// visualizers/quantum_cyber_vault.js
// Quantum Cryptographic Vault
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_cyber_vault = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_cyber_vault",
    title: "Quantum Cryptographic Vault",
    fileName: "cyber_vault.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udd10 Quantum cryptographic security vault with rotating decagonal encryption tumblers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd11\n\n#threejs #webgl #cryptography #cybersecurity #security #creativecoding #javascript #reels",
    
    displayCode: "// Multi-Tumbler Decryption Wheel Alignment\nfunction rotateSecurityTumblers(tumblers, time) {\n  tumblers.forEach((t, idx) => {\n    // Stepped mechanical rotation locks\n    const speed = (idx + 1) * 0.7;\n    t.rotation.z = Math.floor(time * speed) * (Math.PI / 5);\n  });\n}",

    defaultParams: {
    "tumblers": 5,
    "primaryColor": [
        1.0,
        0.8,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.9,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const tumblers = [];
      for (let i = 0; i < params.tumblers; i++) {
        const rad = 2.0 + i * 1.2;
        const geo = new THREE.CylinderGeometry(rad, rad, 0.6, 12, 1, true);
        const mat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xf59e0b : 0x38bdf8,
          wireframe: true
        });
        const tum = new THREE.Mesh(geo, mat);
        tum.rotation.x = Math.PI / 2;
        group.add(tum);
        tumblers.push(tum);
      }

      scene.userData = { group, tumblers, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.tumblers.forEach((tum, idx) => {
        tum.rotation.z = t * (0.6 + idx * 0.3) * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
