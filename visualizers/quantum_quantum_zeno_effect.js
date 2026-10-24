// visualizers/quantum_quantum_zeno_effect.js
// Quantum Zeno Effect Frequent Measurement State Freezing
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_quantum_zeno_effect = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_quantum_zeno_effect",
    title: "Quantum Zeno Effect Frequent Measurement State Freezing",
    fileName: "quantum_zeno.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udc41\ufe0f A quantum state frozen in mid-transition by rapid continuous projective measurements (A watched pot never boils!) in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #zenoeffect #quantummeasurement #superposition #physics #creativecoding #javascript #reels",
    
    displayCode: "// Quantum Zeno Survival Probability\nfunction zenoSurvival(N, t, tau_Z = 1.0) {\n  // P_N(t) = (1 - (t / N*tau_Z)^2)^N -> 1 as N -> infinity\n  const deltaT = t / N;\n  const survivalProb = Math.pow(1 - (deltaT / tau_Z) * (deltaT / tau_Z), N);\n  return survivalProb;\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.6
    ],
    "cloudCount": 5000
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

      // Collapsing & Freezing Quantum Wavepacket
      const count = params.cloudCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 3.5 * Math.pow(Math.random(), 0.5);
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.cos(v);
        pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const wavepacket = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(wavepacket);

      // Measurement Detector Grid Cage
      const cage = new THREE.Mesh(
        new THREE.BoxGeometry(7, 7, 7),
        new THREE.MeshStandardMaterial({ color: c2, wireframe: true, transparent: true, opacity: 0.5 })
      );
      group.add(cage);

      scene.userData = { group, wavepacket, cage, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.cage.rotation.z = Math.sin(t * 0.25) * 0.3;
      // High frequency measurement snap
      const snap = (Math.sin(t * 18.0) > 0.8) ? 0.85 : 1.0;
      data.wavepacket.scale.set(snap, snap, snap);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
