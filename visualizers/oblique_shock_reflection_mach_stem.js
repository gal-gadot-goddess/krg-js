// visualizers/oblique_shock_reflection_mach_stem.js
// Supersonic Oblique Shock Reflection & Mach Stem Foot
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.oblique_shock_reflection_mach_stem = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "oblique_shock_reflection_mach_stem",
    title: "Supersonic Oblique Shock Reflection & Mach Stem Foot",
    fileName: "mach_stem_reflection.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\u2708\ufe0f Supersonic gas dynamics: transition from regular oblique shock reflection to irregular Mach reflection with triple point in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83c\udf2c\ufe0f\n\n#threejs #webgl #obliqueshock #machstem #aerodynamics #supersonic #codeart",
    
    displayCode: "// Rankine-Hugoniot Oblique Shock Theta-Beta-Mach Relation\nfunction thetaBetaMach(M, beta, gamma) {\n  const num = 2.0 * (1.0 / Math.tan(beta)) * (M*M * Math.pow(Math.sin(beta), 2) - 1.0);\n  const den = M*M * (gamma + Math.cos(2.0 * beta)) + 2.0;\n  return Math.atan(num / den);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.85,
        0.25
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "mach": 2.5
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

      // Reflecting Wall Solid Plane
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(16.0, 16.0, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 })
      );
      wall.rotation.x = -Math.PI / 2;
      wall.position.y = -3.5;
      group.add(wall);

      // 22,000 Mach Stem Shock Wave Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const x = -7.0 + Math.random() * 14.0;
        const z = (Math.random() - 0.5) * 8.0;
        const shockSlope = 0.55;
        const y = -3.5 + Math.abs(x) * shockSlope + (Math.random() - 0.5) * 0.8;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + 3.5) / 7.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const shock = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(shock);

      scene.userData = { group, shock, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
