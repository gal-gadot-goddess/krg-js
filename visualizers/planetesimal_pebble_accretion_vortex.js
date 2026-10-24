// visualizers/planetesimal_pebble_accretion_vortex.js
// Protoplanetary Disk Gas Drag & Pebble Accretion Vortices
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.planetesimal_pebble_accretion_vortex = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "planetesimal_pebble_accretion_vortex",
    title: "Protoplanetary Disk Gas Drag & Pebble Accretion Vortices",
    fileName: "pebble_accretion.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83e\ude90 Millimeter chondrule pebbles spiraling into anticyclonic pressure vortices to birth protoplanets in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #protoplanet #planets #astronomy #physics #codeart",
    
    displayCode: "// Stokes Drag Stopping Time & Pebble Drift\nfunction stokesStoppingTime(rho_s, s, rho_g, c_s) {\n  // t_stop = (rho_s * s) / (rho_g * c_s)\n  return (rho_s * s) / (rho_g * c_s);\n}\nconst v_drift = -2.0 * eta * v_k * (tau_s / (1.0 + tau_s * tau_s));",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.5,
        0.15
    ],
    "vortexCount": 3
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

      // Protoplanetary pebbles (24,000 particles)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 2.5 + Math.pow(Math.random(), 1.5) * 12.0;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.8;

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = c1.clone().lerp(c2, r / 14.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 2.0 / Math.pow(r, 0.6) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const disk = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(disk);

      scene.userData = { group, disk, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.disk.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].angle += pData[i].speed * 0.03;
        pos[i * 3] = Math.cos(pData[i].angle) * pData[i].r;
        pos[i * 3 + 2] = Math.sin(pData[i].angle) * pData[i].r;
      }
      data.disk.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
