// visualizers/quark_gluon_plasma.js
// Quark-Gluon Plasma Fireball
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quark_gluon_plasma = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quark_gluon_plasma",
    title: "Quark-Gluon Plasma Fireball",
    fileName: "quark_gluon.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\ud83d\udd25 Ultra-relativistic heavy ion collision creating primordial Quark-Gluon Plasma at 4 trillion Kelvin in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udca5\n\n#threejs #webgl #particlephysics #quarkgluon #cern #quantum #creativecoding #javascript #reels",
    
    displayCode: "// Chromodynamic Color Flux Tubes & Deconfined Quarks\nfunction createQuarkFireball(quarks = 5000, tempMeV = 250) {\n  const pos = new Float32Array(quarks * 3);\n  for (let q = 0; q < quarks; q++) {\n    // Relativistic fireball expansion\n    const th = Math.random() * Math.PI * 2;\n    const ph = Math.acos(2 * Math.random() - 1);\n    const r = Math.pow(Math.random(), 0.6) * 6.5;\n    pos[q * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;\n    pos[q * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;\n    pos[q * 3 + 2] = Math.cos(ph) * r;\n  }\n  return pos;\n}",

    defaultParams: {
    "quarkCount": 7500,
    "fireballRadius": 6.0,
    "primaryColor": [
        1.0,
        0.25,
        0.1
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

      const count = params.quarkCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = Math.pow(Math.random(), 0.7) * params.fireballRadius;
        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        pos[i * 3 + 2] = Math.cos(ph) * r;

        // RGB QCD color charge
        const c = i % 3;
        col[i * 3 + 0] = c === 0 ? 1 : 0.2;
        col[i * 3 + 1] = c === 1 ? 1 : 0.2;
        col[i * 3 + 2] = c === 2 ? 1 : 0.2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const fireball = new THREE.Points(geo, mat);
      group.add(fireball);

      scene.userData = { group, fireball, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.9;
      data.group.rotation.x = t * 0.7;

      const sc = 1.0 + Math.sin(t * 6.0) * 0.15;
      data.fireball.scale.set(sc, sc, sc);

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
