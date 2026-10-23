// visualizers/superconducting_qubit_resonator.js
// Quantum Transmon Qubit
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.superconducting_qubit_resonator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "superconducting_qubit_resonator",
    title: "Quantum Transmon Qubit",
    fileName: "transmon_qubit.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\ud83d\udd2c Superconducting transmon quantum qubit coupled to coplanar waveguide microwave resonator in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\udde0\n\n#threejs #webgl #quantumcomputing #qubit #nanotech #physics #creativecoding #javascript #reels",
    
    displayCode: "// Josephson Junction Nonlinear Quantum Inductance\nfunction renderQubitResonator(scene, photons = 80) {\n  // Microwave Standing Wave Harmonics\n  const wavePoints = [];\n  for (let x = -8; x <= 8; x += 0.2) {\n    const standingWave = Math.sin(x * 0.8) * Math.cos(Date.now() * 0.005) * 1.5;\n    wavePoints.push(new THREE.Vector3(x, standingWave, 0));\n  }\n  return new THREE.BufferGeometry().setFromPoints(wavePoints);\n}",

    defaultParams: {
    "resonatorLength": 16.0,
    "photonCount": 4000,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
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

      // Qubit cross capacitor
      const crossGeo = new THREE.BoxGeometry(4.0, 0.4, 0.4);
      const crossMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const c1 = new THREE.Mesh(crossGeo, crossMat);
      const c2 = new THREE.Mesh(crossGeo, crossMat);
      c2.rotation.z = Math.PI / 2;
      group.add(c1);
      group.add(c2);

      // Resonator meandering waveguide
      const wPts = [];
      for (let x = -7; x <= 7; x += 0.2) {
        wPts.push(new THREE.Vector3(x, Math.sin(x * 1.5) * 2.2, 0));
      }
      const wGeo = new THREE.BufferGeometry().setFromPoints(wPts);
      const wMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const wave = new THREE.Line(wGeo, wMat);
      group.add(wave);

      // Quantized microwave photons
      const pCount = params.photonCount;
      const pPos = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        pPos[p * 3 + 0] = (Math.random() - 0.5) * 14;
        pPos[p * 3 + 1] = (Math.random() - 0.5) * 6;
        pPos[p * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.12, color: 0x10b981, blending: THREE.AdditiveBlending });
      const photons = new THREE.Points(pGeo, pMat);
      group.add(photons);

      scene.userData = { group, c1, c2, wave, photons, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.5;
      data.c1.rotation.z = t * 1.2;
      data.c2.rotation.z = t * 1.2 + Math.PI / 2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
