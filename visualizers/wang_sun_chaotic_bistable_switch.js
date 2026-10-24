// visualizers/wang_sun_chaotic_bistable_switch.js
// Wang-Sun Bistable Chaotic Gyroscopic System
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.wang_sun_chaotic_bistable_switch = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "wang_sun_chaotic_bistable_switch",
    title: "Wang-Sun Bistable Chaotic Gyroscopic System",
    fileName: "wang_sun_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf00 Wang-Sun bistable chaotic gyroscope alternating between two symmetric toroidal attractors in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #wangsun #bistable #chaostheory #gyroscope #mathart #codeart",
    
    displayCode: "// Wang-Sun Chaotic Gyroscopic Equations\nfunction wangSun(x, y, z, a, b, c, d) {\n  return {\n    dx: a * x - y * z,\n    dy: b * x + c * y + x * z,\n    dz: d * z + x * y\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.7
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.3
    ],
    "a": 0.2,
    "b": -0.01,
    "c": -0.4,
    "d": -1.0
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
      const dt = 0.012;

      for (let i = 0; i < pCount; i++) {
        const dx = (params.a * x - y * z) * dt;
        const dy = (params.b * x + params.c * y + x * z) * dt;
        const dz = (params.d * z + x * y) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 1.8;
        pPos[i * 3 + 1] = y * 1.8;
        pPos[i * 3 + 2] = z * 1.8;

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
