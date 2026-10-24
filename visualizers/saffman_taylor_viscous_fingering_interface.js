// visualizers/saffman_taylor_viscous_fingering_interface.js
// Saffman-Taylor Viscous Fingering Instability Tree
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.saffman_taylor_viscous_fingering_interface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "saffman_taylor_viscous_fingering_interface",
    title: "Saffman-Taylor Viscous Fingering Instability Tree",
    fileName: "saffman_taylor_tree.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83c\udf32 Less viscous fluid displacing more viscous fluid in a Hele-Shaw cell: Saffman-Taylor fractal viscous fingering in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf0a\u2728\n\n#threejs #webgl #viscousfingering #saffmantaylor #fractal #fluiddynamics #codeart",
    
    displayCode: "// Saffman-Taylor Finger Width Selection: lambda -> 1/2\nfunction fingerWidth(Ca) {\n  // As capillary number Ca -> infty, lambda -> 0.5\n  return 0.5 + 0.5 / (1.0 + Math.pow(Ca, 0.66));\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "fingers": 8
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

      // 22,000 Viscous Finger Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const fingerR = 3.5 + Math.pow(Math.sin(th * params.fingers * 0.5), 2) * 4.5;
        const r = Math.random() * fingerR;

        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
        pPos[i * 3 + 2] = Math.sin(th) * r;

        const col = c1.clone().lerp(c2, r / 8.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const fingers = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(fingers);

      scene.userData = { group, fingers, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.fingers.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
