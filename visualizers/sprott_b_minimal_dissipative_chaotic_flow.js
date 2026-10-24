// visualizers/sprott_b_minimal_dissipative_chaotic_flow.js
// Sprott System B Pure Monomial Quadratic Chaotic Flow
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.sprott_b_minimal_dissipative_chaotic_flow = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "sprott_b_minimal_dissipative_chaotic_flow",
    title: "Sprott System B Pure Monomial Quadratic Chaotic Flow",
    fileName: "sprott_b_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf00 Sprott's simplest dissipative chaotic flow with minimal monomial algebraic terms in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #sprott #chaostheory #minimalchaos #mathart #codeart",
    
    displayCode: "// Sprott Minimal System B: dx/dt = y * z, dy/dt = x - y, dz/dt = 1 - x * y\nfunction sprottB(x, y, z) {\n  return { dx: y * z, dy: x - y, dz: 1.0 - x * y };\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.85
    ],
    "scale": 2.8
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

      let x = 0.5, y = 0.5, z = 0.5;
      const dt = 0.02;

      for (let i = 0; i < pCount; i++) {
        const dx = (y * z) * dt;
        const dy = (x - y) * dt;
        const dz = (1.0 - x * y) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 2.8;
        pPos[i * 3 + 1] = y * 2.8;
        pPos[i * 3 + 2] = z * 2.8;

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

      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
