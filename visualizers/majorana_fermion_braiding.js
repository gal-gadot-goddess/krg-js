// visualizers/majorana_fermion_braiding.js
// Topological Majorana Zero-Mode Quantum Braiding
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.majorana_fermion_braiding = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "majorana_fermion_braiding",
    title: "Topological Majorana Zero-Mode Quantum Braiding",
    fileName: "majorana_braiding.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Non-Abelian anyons & Majorana zero-mode topological quantum gate braiding along semiconductor nanowires in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u269b\ufe0f\n\n#threejs #webgl #majorana #quantumcomputing #anyons #braiding #topologicalquantum #creativecoding #javascript #reels",
    
    displayCode: "// Non-Abelian Majorana Braid Matrix Exchange\nfunction majoranaBraidOperator(gamma_1, gamma_2) {\n  // U = exp((PI / 4) * gamma_1 * gamma_2) = (1 + gamma_1 * gamma_2) / sqrt(2)\n  const phaseShift = Math.PI / 4;\n  return { phaseShift, isNonAbelian: true };\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.8,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "wireCount": 4
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

      // T-junction Nanowire Grid
      const wGroup = new THREE.Group();
      group.add(wGroup);

      const wGeo1 = new THREE.CylinderGeometry(0.2, 0.2, 12, 16);
      const wMat = new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true });
      const w1 = new THREE.Mesh(wGeo1, wMat);
      w1.rotation.z = Math.PI / 2;
      wGroup.add(w1);

      const w2 = new THREE.Mesh(wGeo1, wMat);
      wGroup.add(w2);

      // Majorana Zero Modes (Glowing Bound States)
      const modes = [];
      for (let i = 0; i < 4; i++) {
        const mMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshStandardMaterial({ color: (i % 2 === 0 ? c1 : c2), emissive: (i % 2 === 0 ? c1 : c2), emissiveIntensity: 0.9 })
        );
        group.add(mMesh);
        modes.push(mMesh);
      }

      scene.userData = { group, modes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      // Braiding exchange trajectory
      const theta = t * 1.5;
      data.modes[0].position.set(Math.cos(theta) * 4.5, Math.sin(theta) * 4.5, 0);
      data.modes[1].position.set(-Math.cos(theta) * 4.5, -Math.sin(theta) * 4.5, 0);
      data.modes[2].position.set(0, 0, Math.sin(t * 1.2) * 4.5);
      data.modes[3].position.set(0, 0, -Math.sin(t * 1.2) * 4.5);

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
