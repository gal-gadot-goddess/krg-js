// visualizers/supercritical_fluid_opalescence_cluster.js
// Supercritical Fluid Critical Opalescence & Density Clusters
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.supercritical_fluid_opalescence_cluster = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "supercritical_fluid_opalescence_cluster",
    title: "Supercritical Fluid Critical Opalescence & Density Clusters",
    fileName: "critical_opalescence.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83e\uddea Critical point phase transition: liquid-gas distinction vanishes into giant optical opalescence density fluctuations in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #supercritical #thermodynamics #opalescence #physics #codeart",
    
    displayCode: "// Ornstein-Zernike Critical Density Correlation Function\nfunction criticalCorrelation(r, xi) {\n  // G(r) ~ (1 / r) * exp(-r / xi)\n  return (1.0 / r) * Math.exp(-r / xi);\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.8
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "correlationLength": 2.2
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

      // 24,000 Giant Density Fluctuation Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = Math.pow(Math.random(), 0.6) * 7.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);

        const col = c1.clone().lerp(c2, r / 7.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const opalescence = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(opalescence);

      scene.userData = { group, opalescence, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.opalescence.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
