// visualizers/wolf_rayet_colliding_wind_spiral_pinwheel.js
// Wolf-Rayet Colliding Winds & Archimedean Dust Pinwheel
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.wolf_rayet_colliding_wind_spiral_pinwheel = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "wolf_rayet_colliding_wind_spiral_pinwheel",
    title: "Wolf-Rayet Colliding Winds & Archimedean Dust Pinwheel",
    fileName: "wolf_rayet_pinwheel.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf00 Colliding supersonic stellar winds around binary Wolf-Rayet WR 104 carving an Archimedean dust pinwheel in Three.js! Follow @kreggsjs for daily reels! \u26a1\u2728\n\n#threejs #webgl #wolfrayet #pinwheel #nebula #astronomy #spaceart #codeart",
    
    displayCode: "// Archimedean Spiral Pinwheel Wind Equation\nfunction archimedeanPinwheel(v_wind, omega_orb, theta) {\n  // r(theta) = v_wind * (theta / omega_orb)\n  return v_wind * (theta / omega_orb);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.4,
        0.2
    ],
    "secondaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "windSpeed": 3.8
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

      // Binary Central Stars
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), new THREE.MeshBasicMaterial({ color: 0x66ccff }));
      group.add(s1); group.add(s2);

      // 24,000 Archimedean Pinwheel Dust Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const theta = (i / pCount) * Math.PI * 16.0;
        const r = 1.8 + theta * 0.28;
        const spread = (r / 16.0) * 0.7;

        pPos[i * 3] = Math.cos(theta) * r + (Math.random() - 0.5) * spread;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        pPos[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * spread;

        const col = c1.clone().lerp(c2, r / 16.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ theta, r, speed: 1.8 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const pinwheel = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(pinwheel);

      scene.userData = { group, s1, s2, pinwheel, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const orbAngle = t * 3.5;
      data.s1.position.set(Math.cos(orbAngle) * 1.4, 0, Math.sin(orbAngle) * 1.4);
      data.s2.position.set(-Math.cos(orbAngle) * 1.4, 0, -Math.sin(orbAngle) * 1.4);

      data.pinwheel.rotation.y = t * 0.8;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 8 + Math.cos(t * 0.25) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
