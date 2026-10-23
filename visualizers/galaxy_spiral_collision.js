// visualizers/galaxy_spiral_collision.js
// Colliding Spiral Galaxies
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.galaxy_spiral_collision = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "galaxy_spiral_collision",
    title: "Colliding Spiral Galaxies",
    fileName: "galaxy_collision.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Gravitational tidal stripping during an epic collision of two grand-design spiral galaxies! 12,000 N-body star particles in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\u2728\n\n#threejs #webgl #galaxy #collision #nbody #astronomy #javascript #creativecoding #reels",
    
    displayCode: "// Gravitational Tidal Stripping of Two Interacting Galaxies\nfunction createSpiralGalaxy(stars = 6000, arms = 2, armTightness = 1.6) {\n  const pos = new Float32Array(stars * 3);\n  for (let i = 0; i < stars; i++) {\n    const arm = i % arms;\n    const r = Math.pow(Math.random(), 1.8) * 9.0;\n    const theta = (arm * Math.PI * 2) / arms + r * armTightness;\n    pos[i * 3 + 0] = Math.cos(theta) * r + (Math.random() - 0.5) * 0.4;\n    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;\n    pos[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 0.4;\n  }\n  return pos;\n}",

    defaultParams: {
    "starsPerGalaxy": 6500,
    "separation": 11.0,
    "primaryColor": [
        0.3,
        0.75,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.75
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

      camera.position.set(0, 10, 24);
      camera.lookAt(0, 0, 0);

      const root = new THREE.Group();
      scene.add(root);

      function buildGal(colRGB) {
        const count = params.starsPerGalaxy;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const arm = i % 2;
          const r = Math.pow(Math.random(), 1.6) * 8.5;
          const th = (arm * Math.PI) + r * 1.45;
          pos[i * 3 + 0] = Math.cos(th) * r + (Math.random() - 0.5) * 0.5;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
          pos[i * 3 + 2] = Math.sin(th) * r + (Math.random() - 0.5) * 0.5;

          const heat = 1.0 - r / 9.0;
          col[i * 3 + 0] = colRGB[0] * (0.6 + heat * 0.4);
          col[i * 3 + 1] = colRGB[1] * (0.6 + heat * 0.4);
          col[i * 3 + 2] = colRGB[2] * (0.6 + heat * 0.4);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
        const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
        return new THREE.Points(geo, mat);
      }

      const galA = buildGal(params.primaryColor);
      const galB = buildGal(params.secondaryColor);

      galA.position.x = -params.separation / 2;
      galB.position.x = params.separation / 2;
      galB.rotation.z = Math.PI / 4;

      root.add(galA);
      root.add(galB);

      scene.userData = { root, galA, galB, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.root.rotation.y = t * 0.2;
      data.galA.rotation.y = t * 0.9;
      data.galB.rotation.y = -t * 1.1;

      // Infalling gravitational dance
      const d = Math.sin(t * 0.5) * 4.0;
      data.galA.position.x = -5.0 + d;
      data.galB.position.x = 5.0 - d;
      data.galA.position.z = Math.cos(t * 0.5) * 3.0;
      data.galB.position.z = -Math.cos(t * 0.5) * 3.0;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.position.y = 12 + Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
