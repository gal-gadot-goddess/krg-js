// visualizers/casimir_effect_vacuum_plates.js
// Casimir Effect Vacuum Force
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.casimir_effect_vacuum_plates = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "casimir_effect_vacuum_plates",
    title: "Casimir Effect Vacuum Force",
    fileName: "casimir_effect.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u269b\ufe0f Attractive quantum vacuum fluctuation forces between uncharged metallic boundary plates in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #casimireffect #quantum #vacuum #physics #creativecoding #javascript #reels",
    
    displayCode: "// Quantum Vacuum Zero-Point Fluctuations Mode Truncation\nfunction calculateCasimirModes(plateSeparation = 2.4, modes = 60) {\n  // Modes excluded between plates produce net attractive pressure\n  const excludedModes = [];\n  for (let m = 1; m <= modes; m++) {\n    const lambda = (2 * plateSeparation) / m;\n    excludedModes.push(lambda);\n  }\n  return excludedModes;\n}",

    defaultParams: {
    "separation": 3.0,
    "vacuumPhotons": 6000,
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.8
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

      camera.position.set(0, 3, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Dual parallel conducting plates
      const pGeo = new THREE.BoxGeometry(0.3, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const plateA = new THREE.Mesh(pGeo, pMat);
      const plateB = new THREE.Mesh(pGeo, pMat);
      group.add(plateA);
      group.add(plateB);

      // Vacuum photon particles
      const count = params.vacuumPhotons;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.12, color: 0xf43f5e, blending: THREE.AdditiveBlending });
      const photons = new THREE.Points(geo, mat);
      group.add(photons);

      scene.userData = { group, plateA, plateB, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const sep = 2.0 + Math.sin(t * 2.0) * 1.2;
      data.plateA.position.x = -sep / 2;
      data.plateB.position.x = sep / 2;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 3 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
