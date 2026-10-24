// visualizers/atmospheric_gravity_wave_kelvin_wake.js
// Atmospheric Internal Gravity Waves & Mountain Kelvin Wake
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.atmospheric_gravity_wave_kelvin_wake = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "atmospheric_gravity_wave_kelvin_wake",
    title: "Atmospheric Internal Gravity Waves & Mountain Kelvin Wake",
    fileName: "gravity_wave_wake.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83c\udfd4\ufe0f Buoyancy-driven internal gravity waves rippling through stratified atmosphere behind a mountain peak in Three.js! Follow @kreggsjs for daily reels! \u2601\ufe0f\u2728\n\n#threejs #webgl #gravitywaves #meteorology #fluidmechanics #atmospheric #codeart",
    
    displayCode: "// Brunt-V\u00e4is\u00e4l\u00e4 Buoyancy Frequency: N^2 = (g / theta) * (d_theta / dz)\nfunction gravityWavePhase(kx, kz, N) {\n  // omega = N * kx / sqrt(kx^2 + kz^2)\n  return (N * kx) / Math.sqrt(kx*kx + kz*kz);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
    ],
    "wavenumber": 1.4
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

      // Mountain Obstacle Cone
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(2.0, 4.0, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
      mtn.position.set(-7.0, -2.0, 0);
      group.add(mtn);

      // 22,000 V-Shaped Kelvin Wake Wave Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const x = -5.0 + Math.random() * 16.0;
        const z = (Math.random() - 0.5) * (x + 6.0) * 0.9;
        const y = Math.sin((x + 5.0) * 1.5) * Math.cos(z * 0.8) * 1.8;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + 1.8) / 3.6);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const wake = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(wake);

      scene.userData = { group, wake, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
