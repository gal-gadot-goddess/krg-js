// visualizers/faraday_wave_cymatic_patterns.js
// Subharmonic Faraday Liquid Wave Cymatic Lattices
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.faraday_wave_cymatic_patterns = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "faraday_wave_cymatic_patterns",
    title: "Subharmonic Faraday Liquid Wave Cymatic Lattices",
    fileName: "faraday_waves.js",
    category: "Fluid Dynamics & Plasma",
    genre: "ambient",
    caption: "\ud83c\udf0a Vertically oscillated liquid fluid forming subharmonic standing Faraday waves & hexagonal cymatic lattices in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #faradaywaves #cymatics #fluiddynamics #wavemechanics #creativecoding #javascript #reels",
    
    displayCode: "// Subharmonic Faraday Resonance Instability\nfunction faradaySubharmonic(f_drive, h, sigma, rho) {\n  const f_wave = f_drive / 2.0; // exact half-frequency response\n  const k = (2 * Math.PI * f_wave) / Math.sqrt(9.81 * h);\n  return { f_wave, k };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.75
    ],
    "gridResolution": 50
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

      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridResolution;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          pts.push(x, 0, z);
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const cymaticMesh = new THREE.Mesh(geo, mat);
      group.add(cymaticMesh);

      scene.userData = { group, cymaticMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      const pos = data.cymaticMesh.geometry.attributes.position;
      const n = data.params.gridResolution;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          // Hexagonal standing Faraday wave mode
          const y = (Math.cos(x * 1.5) + Math.cos(0.5*x*1.5 + Math.sqrt(3)/2*z*1.5) + Math.cos(0.5*x*1.5 - Math.sqrt(3)/2*z*1.5)) * Math.sin(t * 6.0) * 0.6;
          pos.setY(idx++, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
