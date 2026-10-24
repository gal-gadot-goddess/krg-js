// visualizers/quantum_cryptography_bb84_bloch_polarization.js
// Quantum Key Distribution BB84 Polarization States
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_cryptography_bb84_bloch_polarization = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_cryptography_bb84_bloch_polarization",
    title: "Quantum Key Distribution BB84 Polarization States",
    fileName: "bb84_polarization.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udd10 BB84 Quantum Key Distribution photon polarization conjugate basis states (|0>, |1>, |+>, |->) in Three.js! Follow @kreggsjs for daily reels! \u269b\ufe0f\ud83d\udcbb\n\n#threejs #webgl #quantumcomputing #cryptography #bb84 #qkd #cybersecurity #codeart",
    
    displayCode: "// BB84 Conjugate Measurement Bases: Z = {|0>, |1>}, X = {|+>, |->}\nfunction bb84Overlap(basisAlice, basisBob) {\n  return (basisAlice === basisBob) ? 1.0 : 0.5;\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.65
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "sphereRadius": 5.0
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

      // Wireframe Poincaré / Bloch Sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(params.sphereRadius, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(sphere);

      // 4 Basis Poles: |H>, |V>, |D>, |A>
      const poles = [
        new THREE.Vector3(0, params.sphereRadius, 0),
        new THREE.Vector3(0, -params.sphereRadius, 0),
        new THREE.Vector3(params.sphereRadius, 0, 0),
        new THREE.Vector3(-params.sphereRadius, 0, 0)
      ];
      poles.forEach((p, idx) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: (idx < 2) ? c1 : c2 }));
        m.position.copy(p);
        group.add(m);
      });

      // 18,000 Polarized Photon State Particles
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[i * 3] = params.sphereRadius * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = params.sphereRadius * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = params.sphereRadius * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c1, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })));

      scene.userData = { group, sphere, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
