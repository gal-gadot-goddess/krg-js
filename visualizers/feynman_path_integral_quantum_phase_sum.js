// visualizers/feynman_path_integral_quantum_phase_sum.js
// Feynman Path Integral All-Histories Phase Amplitude Sum
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.feynman_path_integral_quantum_phase_sum = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "feynman_path_integral_quantum_phase_sum",
    title: "Feynman Path Integral All-Histories Phase Amplitude Sum",
    fileName: "feynman_path_integral.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Quantum particle exploring every possible path through spacetime simultaneously with Feynman path integral phase interference in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #feynman #pathintegral #quantumphysics #wavefunction #codeart",
    
    displayCode: "// Feynman Quantum Propagator: K(b, a) = int D[x(t)] * exp(i * S[x] / hbar)\nfunction actionPhase(S_path, hbar) {\n  return new THREE.Vector2(Math.cos(S_path / hbar), Math.sin(S_path / hbar));\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.45,
        0.2
    ],
    "secondaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "pathCount": 65
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

      // Quantum source A and detector B
      const ptA = new THREE.Vector3(-8.0, 0, 0);
      const ptB = new THREE.Vector3(8.0, 0, 0);
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.8, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffffff })));

      // 65 Classical and Virtual Feynman Paths
      const pathGroup = new THREE.Group();
      for (let i = 0; i < params.pathCount; i++) {
        const pts = [];
        const segs = 32;
        const amp = (i === 0) ? 0 : Math.pow((i / params.pathCount), 1.2) * 5.5;
        const phase = i * 0.45;

        for (let s = 0; s <= segs; s++) {
          const u = s / segs;
          const x = THREE.MathUtils.lerp(ptA.x, ptB.x, u);
          const y = Math.sin(u * Math.PI) * Math.sin(u * Math.PI * 3.0 + phase) * amp;
          const z = Math.sin(u * Math.PI) * Math.cos(u * Math.PI * 2.0 + phase) * amp;
          pts.push(new THREE.Vector3(x, y, z));
        }

        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({
          color: (i === 0) ? new THREE.Color(1, 1, 1) : c1.clone().lerp(c2, i / params.pathCount),
          transparent: true,
          opacity: (i === 0) ? 1.0 : 0.45
        });
        pathGroup.add(new THREE.Line(lGeo, lMat));
      }
      group.add(pathGroup);

      scene.userData = { group, pathGroup, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
