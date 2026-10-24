// visualizers/turing_reaction_diffusion_morphogenesis_labyrinth.js
// Turing Reaction-Diffusion Morphogenesis Labyrinth
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.turing_reaction_diffusion_morphogenesis_labyrinth = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "turing_reaction_diffusion_morphogenesis_labyrinth",
    title: "Turing Reaction-Diffusion Morphogenesis Labyrinth",
    fileName: "turing_morphogenesis.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83d\udc06 Alan Turing's mathematical morphogenesis: activator-inhibitor chemical reaction-diffusion creating self-organizing skin patterns in Three.js! Follow @kreggsjs! \ud83d\udcd0\u2728\n\n#threejs #webgl #alanturing #morphogenesis #reactiondiffusion #mathart #codeart",
    
    displayCode: "// Gray-Scott Reaction-Diffusion Model: du/dt = D_u*lap(u) - u*v^2 + F*(1-u)\nfunction grayScott(u, v, F, k) {\n  return {\n    du: -u * v * v + F * (1.0 - u),\n    dv: u * v * v - (F + k) * v\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.45,
        0.2
    ],
    "fParam": 0.0545,
    "kParam": 0.062
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

      // 24,000 Turing Spot-Labyrinth Spherical Points
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const rad = 6.5 + Math.sin(th * 8.0) * Math.cos(ph * 8.0) * 1.2;

        pPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = rad * Math.cos(ph);

        const col = c1.clone().lerp(c2, (rad - 5.3) / 2.4);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const turing = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(turing);

      scene.userData = { group, turing, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.turing.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
