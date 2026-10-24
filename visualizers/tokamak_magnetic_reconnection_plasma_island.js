// visualizers/tokamak_magnetic_reconnection_plasma_island.js
// Tokamak Magnetic Reconnection & Tearing Mode Island
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tokamak_magnetic_reconnection_plasma_island = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tokamak_magnetic_reconnection_plasma_island",
    title: "Tokamak Magnetic Reconnection & Tearing Mode Island",
    fileName: "tokamak_reconnection.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\u26a1 Fusion reactor plasma physics: Magnetic flux reconnection forming tearing mode magnetic islands in a tokamak torus in Three.js! Follow @kreggsjs! \ud83d\udd2c\ud83d\udd25\n\n#threejs #webgl #tokamak #fusion #plasma #magneticreconnection #physics #codeart",
    
    displayCode: "// Sweet-Parker Magnetic Reconnection Rate\nfunction reconnectionRate(S_lundquist) {\n  // v_rec / v_A ~ S^(-1/2)\n  return 1.0 / Math.sqrt(S_lundquist);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.25
    ],
    "torusRadius": 6.8
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

      // Tokamak Vacuum Vessel Shell
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(params.torusRadius, 2.5, 32, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(torus);

      // 24,000 Reconnecting Plasma Island Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = params.torusRadius;
        const rTube = 2.0;

        pPos[i * 3] = (R + rTube * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = rTube * Math.sin(v);
        pPos[i * 3 + 2] = (R + rTube * Math.cos(v)) * Math.sin(u);

        const col = c1.clone().lerp(c2, (Math.sin(u * 4.0) + 1.0) * 0.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ u, v, speed: 2.2 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const plasma = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(plasma);

      scene.userData = { group, plasma, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.plasma.rotation.z = t * 0.55;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
