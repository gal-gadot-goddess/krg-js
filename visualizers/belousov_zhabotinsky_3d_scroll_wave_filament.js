// visualizers/belousov_zhabotinsky_3d_scroll_wave_filament.js
// Belousov-Zhabotinsky 3D Chemical Scroll Wave Filament
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.belousov_zhabotinsky_3d_scroll_wave_filament = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "belousov_zhabotinsky_3d_scroll_wave_filament",
    title: "Belousov-Zhabotinsky 3D Chemical Scroll Wave Filament",
    fileName: "bz_scroll_wave.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83c\udf00 Chemical wave turbulence: Belousov-Zhabotinsky reaction-diffusion scroll rings twisting in 3D solution in Three.js! Follow @kreggsjs for daily reels! \ud83e\uddea\u2728\n\n#threejs #webgl #belousovzhabotinsky #chemicalreaction #scrollwave #chaos #codeart",
    
    displayCode: "// Oregonator Model for Belousov-Zhabotinsky Scroll Ring Dynamics\nfunction bzPhase(r, theta, z, t) {\n  // phi = theta - k * r + omega * t\n  return theta - 0.6 * r + 2.5 * t;\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "torusRadius": 6.0
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

      // 24,000 Scroll Wave Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const rTube = 2.4;
        const R = params.torusRadius;

        pPos[i * 3] = (R + rTube * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = rTube * Math.sin(v);
        pPos[i * 3 + 2] = (R + rTube * Math.cos(v)) * Math.sin(u);

        const col = c1.clone().lerp(c2, (Math.sin(u * 3.0 + v * 2.0) + 1.0) * 0.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const scroll = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(scroll);

      scene.userData = { group, scroll, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.scroll.rotation.x = t * 0.35;
      data.scroll.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
