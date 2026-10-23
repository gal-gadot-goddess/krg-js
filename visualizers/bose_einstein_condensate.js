// visualizers/bose_einstein_condensate.js
// Bose-Einstein Condensate
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bose_einstein_condensate = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bose_einstein_condensate",
    title: "Bose-Einstein Condensate",
    fileName: "bose_einstein.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u2744\ufe0f Macroscopic quantum state of matter at 1 nanokelvin! Thousands of bosonic atoms collapsing into a single quantum wave packet in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #quantum #boseeinstein #physics #superfluid #creativecoding #javascript #reels",
    
    displayCode: "// Gross-Pitaevskii Ground State Wavepacket Condensation\nfunction condensateDensity(r, time, width = 2.2) {\n  // Gaussian macroscopic wave packet |psi(r)|^2\n  const breathing = width * (1.0 + 0.25 * Math.sin(time * 5.0));\n  return Math.exp(-(r * r) / (2 * breathing * breathing));\n}",

    defaultParams: {
    "bosonCount": 8500,
    "trapRadius": 6.0,
    "primaryColor": [
        0.1,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.85,
        0.35,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.bosonCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // High density at center (condensate peak)
        const r = Math.pow(Math.random(), 3.5) * params.trapRadius;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        pos[i * 3 + 2] = Math.cos(ph) * r;

        const u = r / params.trapRadius;
        col[i * 3 + 0] = params.primaryColor[0] * (1 - u) + params.secondaryColor[0] * u;
        col[i * 3 + 1] = params.primaryColor[1] * (1 - u) + params.secondaryColor[1] * u;
        col[i * 3 + 2] = params.primaryColor[2] * (1 - u) + params.secondaryColor[2] * u;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const cloud = new THREE.Points(geo, mat);
      group.add(cloud);

      scene.userData = { group, cloud, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.2;

      // Collective breathing mode oscillation
      const s = 1.0 + Math.sin(t * 4.5) * 0.2;
      data.cloud.scale.set(s, s, s);

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
