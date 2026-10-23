// visualizers/rossler_chaotic_spiral.js
// Rössler Chaotic Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.rossler_chaotic_spiral = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "rossler_chaotic_spiral",
    title: "Rössler Chaotic Attractor",
    fileName: "rossler_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Otto R\u00f6ssler continuous chaotic flow with a folded spiral band in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #rossler #chaos #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// R\u00f6ssler System Ordinary Differential Equations\nfunction stepRossler(x, y, z, dt = 0.012, a = 0.2, b = 0.2, c = 5.7) {\n  const dx = (-y - z) * dt;\n  const dy = (x + a * y) * dt;\n  const dz = (b + z * (x - c)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7000,
    "dt": 0.014,
    "primaryColor": [
        0.95,
        0.4,
        0.7
    ],
    "secondaryColor": [
        0.2,
        0.9,
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
      let x = 0.1, y = 0.1, z = 0.1;
      const a = 0.2, b = 0.2, c = 5.7;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (-y - z) * dt;
        const dy = (x + a * y) * dt;
        const dz = (b + z * (x - c)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.7, y * 0.7, (z - 10) * 0.7));
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
