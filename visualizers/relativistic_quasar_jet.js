// visualizers/relativistic_quasar_jet.js
// Quasar & Relativistic Jets
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.relativistic_quasar_jet = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "relativistic_quasar_jet",
    title: "Quasar & Relativistic Jets",
    fileName: "quasar_jets.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udd25 Active Galactic Nucleus Quasar outshining entire galaxies! Relativistic plasma jets accelerated by supermassive black hole magnetic fields in Three.js WebGL! Follow @kreggsjs for daily code reels! \ud83d\udd2d\ud83d\udcab\n\n#threejs #webgl #astronomy #quasar #physics #creativecoding #javascript #space #reels",
    
    displayCode: "// Collimated Relativistic Plasma Jet Shock Nodes\nfunction buildQuasarJet(length = 30, nodeCount = 8) {\n  const nodes = [];\n  for (let n = 0; n < nodeCount; n++) {\n    const y = (n / nodeCount) * length;\n    const r = 0.5 + Math.pow(n / nodeCount, 1.4) * 3.5;\n    const ring = new THREE.RingGeometry(r * 0.7, r, 24);\n    ring.rotateX(Math.PI / 2);\n    ring.translate(0, y, 0);\n    nodes.push(ring);\n  }\n  return nodes;\n}",

    defaultParams: {
    "jetParticles": 9000,
    "diskParticles": 7000,
    "jetLength": 32.0,
    "primaryColor": [
        1.0,
        0.9,
        0.3
    ],
    "secondaryColor": [
        0.95,
        0.2,
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

      camera.position.set(0, 6, 22);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Dense accretion disk
      const dCount = params.diskParticles;
      const dPos = new Float32Array(dCount * 3);
      const dCol = new Float32Array(dCount * 3);
      for (let i = 0; i < dCount; i++) {
        const r = 2.0 + Math.pow(Math.random(), 2.0) * 9.0;
        const th = Math.random() * Math.PI * 2;
        dPos[i * 3 + 0] = Math.cos(th) * r;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        dPos[i * 3 + 2] = Math.sin(th) * r;
        dCol[i * 3 + 0] = params.primaryColor[0];
        dCol[i * 3 + 1] = params.primaryColor[1];
        dCol[i * 3 + 2] = params.primaryColor[2];
      }
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
      dGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
      const dMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
      const disk = new THREE.Points(dGeo, dMat);
      group.add(disk);

      // Jet particles (dual polar)
      const jCount = params.jetParticles;
      const jPos = new Float32Array(jCount * 3);
      const jCol = new Float32Array(jCount * 3);
      const jSpeeds = new Float32Array(jCount);
      const jDirs = new Float32Array(jCount);

      for (let j = 0; j < jCount; j++) {
        const sign = j % 2 === 0 ? 1 : -1;
        jDirs[j] = sign;
        const spd = 2.0 + Math.random() * 4.0;
        jSpeeds[j] = spd;
        jPos[j * 3 + 0] = (Math.random() - 0.5) * 0.8;
        jPos[j * 3 + 1] = sign * (Math.random() * params.jetLength);
        jPos[j * 3 + 2] = (Math.random() - 0.5) * 0.8;

        jCol[j * 3 + 0] = 0.4 + Math.random() * 0.6;
        jCol[j * 3 + 1] = 0.8 + Math.random() * 0.2;
        jCol[j * 3 + 2] = 1.0;
      }
      const jGeo = new THREE.BufferGeometry();
      jGeo.setAttribute('position', new THREE.BufferAttribute(jPos, 3));
      jGeo.setAttribute('color', new THREE.BufferAttribute(jCol, 3));
      const jMat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending });
      const jet = new THREE.Points(jGeo, jMat);
      group.add(jet);

      scene.userData = { group, disk, jet, jSpeeds, jDirs, jCount, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.8;
      data.disk.rotation.y = t * 1.5;

      const jPos = data.jet.geometry.attributes.position;
      const len = data.params.jetLength;
      for (let j = 0; j < data.jCount; j++) {
        let y = jPos.getY(j);
        const sign = data.jDirs[j];
        y += sign * data.jSpeeds[j] * 0.25;
        if (Math.abs(y) > len) {
          y = sign * 1.0;
        }
        const spread = (Math.abs(y) / len) * 2.2;
        const ang = t * 4.0 + j;
        jPos.setXYZ(j, Math.cos(ang) * spread * 0.8, y, Math.sin(ang) * spread * 0.8);
      }
      jPos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 23;
      camera.position.z = Math.cos(t * 0.2) * 23;
      camera.position.y = 5.0 + Math.sin(t * 0.3) * 5.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
