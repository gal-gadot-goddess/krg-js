// visualizers/circadian_clock_per_cry_transcriptional_loop.js
// Circadian Molecular Clockwork & PER-CRY Oscillations
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.circadian_clock_per_cry_transcriptional_loop = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "circadian_clock_per_cry_transcriptional_loop",
    title: "Circadian Molecular Clockwork & PER-CRY Oscillations",
    fileName: "circadian_clock.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\u23f0 The 24-hour master clock in every cell: CLOCK-BMAL1 activator & PER-CRY negative feedback transcriptional wave in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #circadian #biology #biophysics #chronobiology #codeart",
    
    displayCode: "// Goodwin Circadian Oscillator Model: dX/dt = v1 / (1 + (Z/K)^n) - k2*X\nfunction circadianFeedback(Z, K, n) {\n  return 1.0 / (1.0 + Math.pow(Z / K, n));\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.75,
        0.2
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "period": 24.0
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

      // Circadian Phase Limit Cycle Torus
      const clockTorus = new THREE.Mesh(
        new THREE.TorusGeometry(5.5, 0.8, 24, 64),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(clockTorus);

      // Oscillating Transcriptional Wave Particles (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const rad = 5.5 + Math.sin(u * 2.0) * 1.2;
        pPos[i * 3] = Math.cos(u) * rad;
        pPos[i * 3 + 1] = Math.sin(u * 3.0) * 1.5;
        pPos[i * 3 + 2] = Math.sin(u) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, clockTorus, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.clockTorus.rotation.z = t * 0.55;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
