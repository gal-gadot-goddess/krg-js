// visualizers/schwinger_pair_production_extreme_laser.js
// Schwinger Non-Perturbative Vacuum Pair Production
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.schwinger_pair_production_extreme_laser = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "schwinger_pair_production_extreme_laser",
    title: "Schwinger Non-Perturbative Vacuum Pair Production",
    fileName: "schwinger_pairs.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Critical Schwinger electric field (10^18 V/m) tearing electron-positron pairs directly out of the quantum vacuum in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\ud83d\udca5\n\n#threejs #webgl #schwinger #lasers #quantumvacuum #electrodynamics #physics #codeart",
    
    displayCode: "// Schwinger Critical Field: E_crit = m_e^2 * c^3 / (e * hbar)\nfunction schwingerRate(E, E_crit) {\n  // Gamma ~ exp(-pi * E_crit / E)\n  return Math.exp(-Math.PI * E_crit / E);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.2,
        0.45
    ],
    "eField": 1.2
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

      // 24,000 Electron-Positron Vacuum Sparks
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const sign = (i % 2 === 0) ? 1 : -1;
        const dist = 0.5 + Math.random() * 11.0;
        const angle = Math.random() * Math.PI * 2;

        pPos[i * 3] = Math.cos(angle) * dist;
        pPos[i * 3 + 1] = sign * dist * 0.5;
        pPos[i * 3 + 2] = Math.sin(angle) * dist;

        const col = (sign > 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ dist, angle, sign, speed: 2.2 + Math.random() * 2.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const sparks = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(sparks);

      scene.userData = { group, sparks, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.sparks.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].dist = (pData[i].dist + pData[i].speed * 0.05) % 11.0;
        pos[i * 3] = Math.cos(pData[i].angle) * pData[i].dist;
        pos[i * 3 + 1] = pData[i].sign * pData[i].dist * 0.5;
        pos[i * 3 + 2] = Math.sin(pData[i].angle) * pData[i].dist;
      }
      data.sparks.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
