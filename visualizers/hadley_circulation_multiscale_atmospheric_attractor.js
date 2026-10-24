// visualizers/hadley_circulation_multiscale_atmospheric_attractor.js
// Hadley Atmospheric Circulation & Coriolis Strange Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hadley_circulation_multiscale_atmospheric_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hadley_circulation_multiscale_atmospheric_attractor",
    title: "Hadley Atmospheric Circulation & Coriolis Strange Attractor",
    fileName: "hadley_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf2a\ufe0f Hadley cell tropical atmospheric circulation chaotic flow with Coriolis trade winds in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf00\u26a1\n\n#threejs #webgl #chaostheory #strangeattractor #meteorology #hadleycell #codeart",
    
    displayCode: "// Hadley 3D Atmospheric System: dx/dt = -y^2 - z^2 - a*x + a*F ...\nfunction hadleyDeriv(x, y, z, a, b, F, G) {\n  return {\n    dx: -y*y - z*z - a*x + a*F,\n    dy: x*y - b*x*z - y + G,\n    dz: b*x*y + x*z - z\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.25
    ],
    "paramA": 0.25,
    "paramB": 4.0
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

      // Numerical RK4 trajectory integration (24,000 points)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.015;
      const a = params.paramA, b = params.paramB, F = 8.0, G = 1.0;

      for (let i = 0; i < pCount; i++) {
        const dx = (-y*y - z*z - a*x + a*F) * dt;
        const dy = (x*y - b*x*z - y + G) * dt;
        const dz = (b*x*y + x*z - z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 1.5;
        pPos[i * 3 + 1] = y * 1.5;
        pPos[i * 3 + 2] = z * 1.5;

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
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
