// visualizers/tokamak_fusion_plasma_torus.js
// Tokamak Helical Fusion Plasma
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tokamak_fusion_plasma_torus = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tokamak_fusion_plasma_torus",
    title: "Tokamak Helical Fusion Plasma",
    fileName: "tokamak_plasma.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\ud83d\udd25 D-T Deuterium-Tritium nuclear fusion plasma stream twisting through a magnetic Tokamak torus in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\ude80\n\n#threejs #webgl #fusion #tokamak #plasma #nuclear #scifi #creativecoding #javascript #reels",
    
    displayCode: "// Helical Magnetic Safety Factor q(r) Plasma Stream\nfunction buildTokamakStream(majorR = 5.5, minorR = 2.0, turns = 8) {\n  const streamPoints = [];\n  for (let u = 0; u <= Math.PI * 2 * turns; u += 0.1) {\n    const phi = u / turns;\n    const theta = u;\n    const x = (majorR + minorR * Math.cos(theta)) * Math.cos(phi);\n    const y = minorR * Math.sin(theta);\n    const z = (majorR + minorR * Math.cos(theta)) * Math.sin(phi);\n    streamPoints.push(new THREE.Vector3(x, y, z));\n  }\n  return streamPoints;\n}",

    defaultParams: {
    "plasmaParticles": 7500,
    "majorR": 5.5,
    "minorR": 2.0,
    "primaryColor": [
        1.0,
        0.45,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
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

      camera.position.set(0, 6, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.plasmaParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = (params.majorR + params.minorR * Math.cos(v)) * Math.cos(u);
        pos[i * 3 + 1] = params.minorR * Math.sin(v);
        pos[i * 3 + 2] = (params.majorR + params.minorR * Math.cos(v)) * Math.sin(u);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, color: 0xf97316, blending: THREE.AdditiveBlending });
      const torus = new THREE.Points(geo, mat);
      group.add(torus);

      scene.userData = { group, torus, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.8;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 6 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
