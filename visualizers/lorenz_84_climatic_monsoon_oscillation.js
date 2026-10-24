// visualizers/lorenz_84_climatic_monsoon_oscillation.js
// Lorenz 84 Global Climate & Monsoon Shift Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.lorenz_84_climatic_monsoon_oscillation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "lorenz_84_climatic_monsoon_oscillation",
    title: "Lorenz 84 Global Climate & Monsoon Shift Attractor",
    fileName: "lorenz_84_climate.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf0d Edward Lorenz's 1984 simplified climate model demonstrating abrupt monsoon shifts and planetary wave resonance in Three.js! Follow @kreggsjs! \ud83c\udf00\u2728\n\n#threejs #webgl #lorenz #climatechaos #meteorology #attractor #codeart",
    
    displayCode: "// Lorenz-84 Climate Model: dx/dt = -y^2 - z^2 - a*x + a*F ...\nfunction lorenz84(x, y, z, a, b, F, G) {\n  return {\n    dx: -y*y - z*z - a*x + a*F,\n    dy: x*y - b*x*z - y + G,\n    dz: b*x*y + x*z - z\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.65
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.95
    ],
    "paramF": 6.84,
    "paramG": 1.28
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

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 1.0, y = 1.0, z = 1.0;
      const dt = 0.012;
      const a = 0.25, b = 4.0;

      for (let i = 0; i < pCount; i++) {
        const dx = (-y*y - z*z - a*x + a*params.paramF) * dt;
        const dy = (x*y - b*x*z - y + params.paramG) * dt;
        const dz = (b*x*y + x*z - z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 2.2;
        pPos[i * 3 + 1] = y * 2.2;
        pPos[i * 3 + 2] = z * 2.2;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.attractor.rotation.y = t * 0.4;
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
