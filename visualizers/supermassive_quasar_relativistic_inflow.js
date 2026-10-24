// visualizers/supermassive_quasar_relativistic_inflow.js
// Supermassive Quasar Accretion Inflow & High-Z Radiative Torrent
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.supermassive_quasar_relativistic_inflow = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "supermassive_quasar_relativistic_inflow",
    title: "Supermassive Quasar Accretion Inflow & High-Z Radiative Torrent",
    fileName: "quasar_inflow.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udd25 Supermassive Quasar with billion-solar-mass gravitational accretion inflow & radiative feedback in Three.js! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u26a1\n\n#threejs #webgl #quasar #blackhole #astrophysics #cosmos #creativecoding #javascript",
    
    displayCode: "// Quasar Eddington Luminosity Limit\nfunction eddingtonLuminosity(M) {\n  // L_Edd = 4 * pi * G * M * m_p * c / sigma_T\n  return 1.26e38 * (M / 1.989e30);\n}\nconst r_isco = 6.0 * G * M / (c * c);",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "eddingtonRatio": 1.4
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

      // Central supermassive singularity
      const smbh = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 48), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      group.add(smbh);

      // Quasar inward spiral accretion torrent (25,000 particles)
      const pCount = 25000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const r = 2.4 + Math.pow(u, 2.0) * 14.0;
        const angle = Math.random() * Math.PI * 2;
        const z = (Math.random() - 0.5) * (r * 0.3);

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = z;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const normR = (r - 2.4) / 14.0;
        const col = (normR < 0.3) ? new THREE.Color(1.0, 1.0, 1.0).lerp(c1, normR * 3) : c1.clone().lerp(c2, (normR - 0.3) / 0.7);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 2.2 / Math.pow(r, 0.75), z });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const torrent = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(torrent);

      scene.userData = { group, torrent, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.torrent.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        it.angle += it.speed * 0.04;
        it.r -= 0.025;
        if (it.r < 2.4) it.r = 16.0;
        pos[i * 3] = Math.cos(it.angle) * it.r;
        pos[i * 3 + 2] = Math.sin(it.angle) * it.r;
      }
      data.torrent.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 7 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
