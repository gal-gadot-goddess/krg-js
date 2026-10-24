// visualizers/blazar_superluminal_relativistic_beaming.js
// Blazar Relativistic Jet & Superluminal Doppler Motion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.blazar_superluminal_relativistic_beaming = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "blazar_superluminal_relativistic_beaming",
    title: "Blazar Relativistic Jet & Superluminal Doppler Motion",
    fileName: "blazar_beaming.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Supermassive active galactic nucleus Blazar firing its relativistic particle beam directly down our line of sight in Three.js! Follow @kreggsjs! \u26a1\ud83d\udd2d\n\n#threejs #webgl #blazar #relativity #astrophysics #cosmos #creativecoding #codeart",
    
    displayCode: "// Relativistic Doppler Boosting Factor delta\nfunction dopplerFactor(gamma, beta, theta) {\n  // delta = 1 / (gamma * (1 - beta * cos(theta)))\n  return 1.0 / (gamma * (1.0 - beta * Math.cos(theta)));\n}\nconst apparent_velocity = (beta * Math.sin(theta)) / (1.0 - beta * Math.cos(theta));",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.7,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        1.0
    ],
    "lorentzGamma": 15.0
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

      // Line-of-sight cone jet (26,000 particles)
      const pCount = 26000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const z = -2.0 + Math.random() * 26.0;
        const spread = (z + 2.0) * 0.24;
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * spread;

        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = Math.sin(angle) * rad;
        pPos[i * 3 + 2] = z;

        const mix = z / 24.0;
        const col = (mix < 0.2) ? new THREE.Color(1, 1, 1) : c1.clone().lerp(c2, mix);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ z, rad, angle, speed: 2.5 + Math.random() * 2.0 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const jet = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(jet);

      scene.userData = { group, jet, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.jet.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].z -= pData[i].speed * 0.15;
        if (pData[i].z < -2.0) pData[i].z = 24.0;
        pos[i * 3 + 2] = pData[i].z;
      }
      data.jet.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.z = t * 0.4;
      camera.position.set(Math.sin(t * 0.2) * 4, Math.cos(t * 0.2) * 4, -14);
      camera.lookAt(0, 0, 10);

      renderer.render(scene, camera);
    }
  };
});
