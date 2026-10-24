// visualizers/intergalactic_warm_hot_medium_whim_sheet.js
// Intergalactic Warm-Hot Medium (WHIM) Cosmic Sheets
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.intergalactic_warm_hot_medium_whim_sheet = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "intergalactic_warm_hot_medium_whim_sheet",
    title: "Intergalactic Warm-Hot Medium (WHIM) Cosmic Sheets",
    fileName: "whim_cosmic_sheets.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c The missing baryonic matter of the Universe: million-Kelvin WHIM plasma sheets permeating intergalactic voids in Three.js! Follow @kreggsjs! \ud83d\udd2d\u2728\n\n#threejs #webgl #astronomy #plasma #cosmology #creativecoding #codeart",
    
    displayCode: "// WHIM Thermal Collisional Ionization Equilibrium\nfunction whimCooling(Lambda_T, n_e, n_H) {\n  // L = Lambda(T) * n_e * n_H\n  return Lambda_T * n_e * n_H;\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.8
    ],
    "sheetExtent": 16.0
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

      // 22,000 WHIM sheet particles with sinuous thermal undulation
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * 26.0;
        const z = (Math.random() - 0.5) * 26.0;
        const y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 3.5 + (Math.random() - 0.5) * 1.5;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + 4.0) / 8.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ x, z, basePhase: Math.random() * Math.PI * 2 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const sheet = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(sheet);

      scene.userData = { group, sheet, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.sheet.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        pos[i * 3 + 1] = Math.sin(it.x * 0.3 + t * 1.2) * Math.cos(it.z * 0.3 + t * 0.9) * 3.5;
      }
      data.sheet.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
