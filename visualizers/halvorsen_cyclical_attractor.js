// visualizers/halvorsen_cyclical_attractor.js
// Halvorsen Cyclic Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.halvorsen_cyclical_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "halvorsen_cyclical_attractor",
    title: "Halvorsen Cyclic Attractor",
    fileName: "halvorsen_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Tri-symmetric coiling Halvorsen cyclic chaotic attractor spinning with high velocity in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #halvorsen #chaos #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Halvorsen Cyclic Attractor ODEs\nfunction stepHalvorsen(x, y, z, dt = 0.012, a = 1.89) {\n  const dx = (-a * x - 4 * y - 4 * z - y * y) * dt;\n  const dy = (-a * y - 4 * z - 4 * x - z * z) * dt;\n  const dz = (-a * z - 4 * x - 4 * y - x * x) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7500,
    "dt": 0.012,
    "primaryColor": [
        0.15,
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

      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = -1.48, y = -1.51, z = 2.04;
      const a = 1.89;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (-a * x - 4 * y - 4 * z - y * y) * dt;
        const dy = (-a * y - 4 * z - 4 * x - z * z) * dt;
        const dz = (-a * z - 4 * x - 4 * y - x * x) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.9, y * 0.9, z * 0.9));
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

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
