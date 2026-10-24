// visualizers/four_wing_hyperchaotic_memristor_attractor.js
// Four-Wing Memristive Hyperchaotic Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.four_wing_hyperchaotic_memristor_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "four_wing_hyperchaotic_memristor_attractor",
    title: "Four-Wing Memristive Hyperchaotic Attractor",
    fileName: "four_wing_memristor.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83e\udd8b Memristive hyperchaos: a 4D nonlinear dynamical system producing four distinct phase-space butterfly wings in Three.js! Follow @kreggsjs for daily reels! \u26a1\u2728\n\n#threejs #webgl #hyperchaos #memristor #fourwing #chaostheory #codeart",
    
    displayCode: "// Four-Wing Chaotic Circuit with Memristive Feedback\nfunction fourWing(x, y, z, a, b, c) {\n  return {\n    dx: a * (y - x),\n    dy: b * x - x * z + y,\n    dz: x * y - c * z\n  };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.35,
        0.55
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "a": 10.0,
    "b": 40.0,
    "c": 2.5
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

      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.0025;

      for (let i = 0; i < pCount; i++) {
        const dx = (params.a * (y - x)) * dt;
        const dy = (params.b * x - x * z + y) * dt;
        const dz = (x * y - params.c * z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.35;
        pPos[i * 3 + 1] = (z - 25.0) * 0.35;
        pPos[i * 3 + 2] = y * 0.35;

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
