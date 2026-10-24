// visualizers/dadras_momeni_five_term_chaotic_attractor.js
// Dadras-Momeni Five-Term Autonomous Chaotic Dynamo
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dadras_momeni_five_term_chaotic_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dadras_momeni_five_term_chaotic_attractor",
    title: "Dadras-Momeni Five-Term Autonomous Chaotic Dynamo",
    fileName: "dadras_momeni.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf00 Dadras-Momeni autonomous chaotic dynamo system: multi-scroll orbits winding through interconnected phase-space funnels in Three.js! Follow @kreggsjs! \u26a1\u2728\n\n#threejs #webgl #dadras #chaostheory #multiscroll #mathart #codeart",
    
    displayCode: "// Dadras-Momeni Chaotic System: dx/dt = y - a*x + b*y*z ...\nfunction dadras(x, y, z, a, b, c, d, e) {\n  return {\n    dx: y - a*x + b*y*z,\n    dy: c*y - x*z + z,\n    dz: d*x*y - e*z\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.75
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.2
    ],
    "a": 3.0,
    "b": 2.7,
    "c": 1.7,
    "d": 2.0,
    "e": 9.0
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

      let x = 1.0, y = 1.0, z = 0.0;
      const dt = 0.0035;

      for (let i = 0; i < pCount; i++) {
        const dx = (y - params.a*x + params.b*y*z) * dt;
        const dy = (params.c*y - x*z + z) * dt;
        const dz = (params.d*x*y - params.e*z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.9;
        pPos[i * 3 + 1] = y * 0.9;
        pPos[i * 3 + 2] = z * 0.9;

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
      data.group.rotation.x = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
