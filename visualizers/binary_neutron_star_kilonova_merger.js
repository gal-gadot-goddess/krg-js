// visualizers/binary_neutron_star_kilonova_merger.js
// Binary Neutron Star Chirp Merger & R-Process Kilonova
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.binary_neutron_star_kilonova_merger = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "binary_neutron_star_kilonova_merger",
    title: "Binary Neutron Star Chirp Merger & R-Process Kilonova",
    fileName: "kilonova_merger.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udca5 Binary neutron star gravitational-wave chirp spiral & radioactive gold-forging Kilonova explosion in Three.js! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd25\n\n#threejs #webgl #kilonova #neutronstar #gravitationalwaves #ligo #creativecoding #physics",
    
    displayCode: "// Gravitational Wave Chirp Mass Equation\nfunction chirpMass(m1, m2) {\n  // M_chirp = (m1 * m2)^(3/5) / (m1 + m2)^(1/5)\n  return Math.pow(m1 * m2, 0.6) / Math.pow(m1 + m2, 0.2);\n}\nconst gw_omega = Math.pow(c, 3.0) / (8.0 * Math.PI * G * M_chirp);",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.95,
        0.9
    ],
    "chirpRate": 2.5
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

      // Dual Neutron Stars
      const nsGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const ns1 = new THREE.Mesh(nsGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const ns2 = new THREE.Mesh(nsGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      group.add(ns1); group.add(ns2);

      // Tidal Debris & Kilonova Ejecta Cloud (24,000 particles)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 2.0 + Math.random() * 12.0;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * (r * 0.4);

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = (i % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ r, angle, speed: 2.5 / Math.sqrt(r), y });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const ejecta = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(ejecta);

      scene.userData = { group, ns1, ns2, ejecta, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const sep = 3.2 + Math.sin(t * 1.5) * 1.2;
      const theta = t * 4.8;
      data.ns1.position.set(Math.cos(theta) * sep, 0, Math.sin(theta) * sep);
      data.ns2.position.set(-Math.cos(theta) * sep, 0, -Math.sin(theta) * sep);

      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 7 + Math.cos(t * 0.25) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
