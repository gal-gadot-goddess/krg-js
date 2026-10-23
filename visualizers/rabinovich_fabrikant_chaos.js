// visualizers/rabinovich_fabrikant_chaos.js
// Rabinovich-Fabrikant Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.rabinovich_fabrikant_chaos = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "rabinovich_fabrikant_chaos",
    title: "Rabinovich-Fabrikant Attractor",
    fileName: "rabinovich_chaos.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Modulated wave interaction chaos in dissipative non-equilibrium media in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #rabinovich #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Rabinovich-Fabrikant Dissipative Wave Chaos\nfunction stepRabinovich(x, y, z, dt = 0.005, alpha = 0.14, gamma = 0.1) {\n  const dx = (y * (z - 1 + x * x) + gamma * x) * dt;\n  const dy = (x * (3 * z + 1 - x * x) + gamma * y) * dt;\n  const dz = (-2 * z * (alpha + x * y)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7500,
    "dt": 0.005,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.8
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

      const count = params.trajectoryPoints;
      const pts = [];
      let x = -1.0, y = 0, z = 0.5;
      const alpha = 0.14, gamma = 0.1;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (y * (z - 1 + x * x) + gamma * x) * dt;
        const dy = (x * (3 * z + 1 - x * x) + gamma * y) * dt;
        const dz = (-2 * z * (alpha + x * y)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.5, y * 3.5, z * 3.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.45;
      data.group.rotation.y = t * 0.65;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
