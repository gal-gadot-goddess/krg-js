// visualizers/quantum_tunneling_barrier.js
// Quantum Wavepacket Tunneling
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_tunneling_barrier = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_tunneling_barrier",
    title: "Quantum Wavepacket Tunneling",
    fileName: "quantum_tunneling.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u269b\ufe0f Quantum wave packet incident on an energy potential barrier! Particle transmission and reflection tunneling in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #quantum #tunneling #quantumphysics #creativecoding #javascript #mathart #reels",
    
    displayCode: "// 1D Schr\u00f6dinger Wavepacket Tunneling Simulation\nfunction simulateTunnelingWavepacket(x, time, barrierX = 0, barrierWidth = 1.2) {\n  // Incident Gaussian wavepacket psi(x, t)\n  const k = 4.0; // Wavenumber\n  const sigma = 1.2;\n  const x0 = -5.0 + time * 2.0;\n  const envelope = Math.exp(-Math.pow(x - x0, 2) / (2 * sigma * sigma));\n  // Probability decay inside barrier: exp(-kappa * x)\n  if (x > barrierX && x < barrierX + barrierWidth) {\n    return envelope * Math.exp(-(x - barrierX) * 2.5);\n  }\n  return envelope * Math.cos(k * x - time * 6.0);\n}",

    defaultParams: {
    "wavePoints": 180,
    "barrierWidth": 1.4,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.2,
        0.5
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

      camera.position.set(0, 2, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Potential Barrier (Semi-transparent slab)
      const bGeo = new THREE.BoxGeometry(params.barrierWidth, 8, 4);
      const bMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true, transparent: true, opacity: 0.6 });
      const barrier = new THREE.Mesh(bGeo, bMat);
      group.add(barrier);

      // Wavepacket lines
      const pts = [];
      for (let x = -8; x <= 8; x += 0.1) {
        pts.push(new THREE.Vector3(x, 0, 0));
      }
      const wGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const wMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 });
      const wave = new THREE.Line(wGeo, wMat);
      group.add(wave);

      scene.userData = { group, barrier, wave, pts, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.wave.geometry.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const cycle = ((t * 2.5) % 16.0) - 8.0;
        const env = Math.exp(-Math.pow(x - cycle, 2) / 3.0);
        let amp = env * Math.sin(x * 6.0 - t * 8.0) * 2.5;
        if (x > -0.7 && x < 0.7) amp *= 0.3; // Decay inside barrier
        pos.setY(i, amp);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
