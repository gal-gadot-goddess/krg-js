// visualizers/neutrino_flavor_oscillation_wavepacket.js
// PMNS Three-Flavor Neutrino Interference Oscillations
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.neutrino_flavor_oscillation_wavepacket = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "neutrino_flavor_oscillation_wavepacket",
    title: "PMNS Three-Flavor Neutrino Interference Oscillations",
    fileName: "neutrino_oscillation.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Electron, Muon & Tau neutrino quantum flavor state probability oscillation via the PMNS matrix in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #neutrino #pmns #quantummechanics #particlephysics #codeart",
    
    displayCode: "// Three-Flavor Neutrino PMNS Transition Probability\nfunction pmnsTransition(L, E, dm2) {\n  // P(alpha -> beta) = sin^2(2*theta) * sin^2(1.27 * dm2 * L / E)\n  return Math.pow(Math.sin(2.0 * theta), 2) * Math.pow(Math.sin(1.27 * dm2 * L / E), 2);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.95
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.55
    ],
    "pathLength": 22.0
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
      const c3 = new THREE.Color(1.0, 0.85, 0.2); // Tau gold

      // 24,000 Neutrino Wavepacket Interference Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const z = -params.pathLength * 0.5 + Math.random() * params.pathLength;
        const normZ = (z + params.pathLength * 0.5) / params.pathLength;
        const angle = normZ * Math.PI * 12.0 + Math.random() * 0.5;
        const rad = 1.2 + Math.sin(normZ * Math.PI * 6.0) * 0.8;

        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = Math.sin(angle) * rad;
        pPos[i * 3 + 2] = z;

        // 3-state quantum superposition color
        const pE = Math.pow(Math.cos(normZ * Math.PI * 3.0), 2);
        const pMu = Math.pow(Math.sin(normZ * Math.PI * 3.0), 2) * 0.7;
        const pTau = 1.0 - pE - pMu;

        const col = c1.clone().multiplyScalar(pE).add(c2.clone().multiplyScalar(pMu)).add(c3.clone().multiplyScalar(pTau));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ z, angle, rad, speed: 2.8 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const beam = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(beam);

      scene.userData = { group, beam, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.beam.rotation.z = t * 1.2;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
