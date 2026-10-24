// visualizers/moire_quantum_superlattice.js
// Magic-Angle Twisted Bilayer Graphene Moiré Superlattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.moire_quantum_superlattice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "moire_quantum_superlattice",
    title: "Magic-Angle Twisted Bilayer Graphene Moiré Superlattice",
    fileName: "moire_superlattice.js",
    category: "Cyberpunk & Digital Systems",
    genre: "quantum",
    caption: "\ud83c\udf00 Magic-angle 1.1 degree twist between bilayer graphene sheets generating flat electronic bands & unconventional superconductivity in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8e\n\n#threejs #webgl #moiresuperlattice #graphene #magicangle #quantum #physics #creativecoding #javascript #reels",
    
    displayCode: "// Moir\u00e9 Interference Superlattice Periodicity\nfunction moireWavelength(a0 = 0.246, theta_rad = 0.0192) {\n  // L_M = a0 / (2 * sin(theta / 2))\n  const lambda_M = a0 / (2.0 * Math.sin(theta_rad / 2.0)); // ~13.4 nm\n  return lambda_M;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "gridDensity": 28
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

      // Sheet 1 Grid
      const g1 = new THREE.GridHelper(12, params.gridDensity, c1, c1);
      g1.rotation.x = Math.PI / 2;
      g1.position.z = 0.3;
      group.add(g1);

      // Sheet 2 Twisted Grid
      const g2 = new THREE.GridHelper(12, params.gridDensity, c2, c2);
      g2.rotation.x = Math.PI / 2;
      g2.position.z = -0.3;
      group.add(g2);

      scene.userData = { group, g1, g2, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.15;
      // Slight angular twist oscillation creating breathing moire patterns
      data.g2.rotation.z = Math.sin(t * 0.4) * 0.12;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
