// visualizers/morphogenetic_turing_skin.js
// Morphogenetic Turing Reaction-Diffusion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.morphogenetic_turing_skin = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "morphogenetic_turing_skin",
    title: "Morphogenetic Turing Reaction-Diffusion",
    fileName: "turing_patterns.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83d\udc06 Alan Turing's chemical reaction-diffusion morphogenesis producing self-organizing organic spots & stripes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83e\uddec\u2728\n\n#threejs #webgl #turing #morphogenesis #reactiondiffusion #nature #creativecoding #javascript #reels",
    
    displayCode: "// Gray-Scott Reaction-Diffusion Model\nfunction evaluateTuringPattern(u, v, feed = 0.054, kill = 0.062) {\n  // du/dt = Du * laplace(u) - u*v^2 + feed*(1 - u)\n  // dv/dt = Dv * laplace(v) + u*v^2 - (feed + kill)*v\n  const uv2 = u * v * v;\n  const dU = -uv2 + feed * (1.0 - u);\n  const dV = uv2 - (feed + kill) * v;\n  return { dU, dV };\n}",

    defaultParams: {
    "sphereRadius": 5.0,
    "particleCount": 6500,
    "primaryColor": [
        0.2,
        0.95,
        0.8
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.6
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * params.sphereRadius;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * params.sphereRadius;
        pos[i * 3 + 2] = Math.cos(ph) * params.sphereRadius;

        const spot = Math.sin(th * 8.0) * Math.cos(ph * 8.0) > 0.1;
        col[i * 3 + 0] = spot ? params.primaryColor[0] : params.secondaryColor[0];
        col[i * 3 + 1] = spot ? params.primaryColor[1] : params.secondaryColor[1];
        col[i * 3 + 2] = spot ? params.primaryColor[2] : params.secondaryColor[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const sphere = new THREE.Points(geo, mat);
      group.add(sphere);

      scene.userData = { group, sphere, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
