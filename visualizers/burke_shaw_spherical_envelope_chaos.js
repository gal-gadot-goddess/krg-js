// visualizers/burke_shaw_spherical_envelope_chaos.js
// Burke-Shaw Bounded Spherical Chaotic Ribbon
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.burke_shaw_spherical_envelope_chaos = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "burke_shaw_spherical_envelope_chaos",
    title: "Burke-Shaw Bounded Spherical Chaotic Ribbon",
    fileName: "burke_shaw_envelope.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf00 Burke-Shaw chaotic attractor: a single continuous trajectory tightly enveloped on an invariant sphere in Three.js! Follow @kreggsjs for daily reels! \u26a1\u2728\n\n#threejs #webgl #burkeshaw #chaostheory #dynamicalsystems #mathart #codeart",
    
    displayCode: "// Burke-Shaw System: dx/dt = -s*(x + y), dy/dt = -y - s*x*z, dz/dt = s*x*y + V\nfunction burkeShaw(x, y, z, s, V) {\n  return {\n    dx: -s * (x + y),\n    dy: -y - s * x * z,\n    dz: s * x * y + V\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "secondaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "s": 10.0,
    "V": 4.272
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

      let x = 0.6, y = 0.6, z = 0.6;
      const dt = 0.003;

      for (let i = 0; i < pCount; i++) {
        const dx = (-params.s * (x + y)) * dt;
        const dy = (-y - params.s * x * z) * dt;
        const dz = (params.s * x * y + params.V) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 3.2;
        pPos[i * 3 + 1] = y * 3.2;
        pPos[i * 3 + 2] = z * 3.2;

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
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
