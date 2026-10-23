// visualizers/chen_chaotic_system.js
// Chen Dual-Scroll Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chen_chaotic_system = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chen_chaotic_system",
    title: "Chen Dual-Scroll Attractor",
    fileName: "chen_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Dual-scroll Chen chaotic attractor bridging Lorenz and Chua non-linear dynamical systems in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #chenattractor #chaostheory #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Chen Compound Structure Chaotic Attractor\nfunction stepChen(x, y, z, dt = 0.006, a = 35, b = 3, c = 28) {\n  const dx = (a * (y - x)) * dt;\n  const dy = ((c - a) * x - x * z + c * y) * dt;\n  const dz = (x * y - b * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7500,
    "dt": 0.006,
    "primaryColor": [
        1.0,
        0.4,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
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

      camera.position.set(0, 0, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = -0.1, y = 0.5, z = -0.6;
      const a = 35, b = 3, c = 28;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (a * (y - x)) * dt;
        const dy = ((c - a) * x - x * z + c * y) * dt;
        const dz = (x * y - b * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.35, y * 0.35, (z - 25) * 0.35));
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

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 20;
      camera.position.z = Math.cos(t * 0.2) * 20;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
