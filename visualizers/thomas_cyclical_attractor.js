// visualizers/thomas_cyclical_attractor.js
// Thomas Cyclical Sinuous Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.thomas_cyclical_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "thomas_cyclical_attractor",
    title: "Thomas Cyclical Sinuous Attractor",
    fileName: "thomas_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Ren\u00e9 Thomas cyclically symmetric sine-driven chaotic attractor winding in 3D space in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #thomasattractor #chaos #mathart #topology #creativecoding #javascript #reels",
    
    displayCode: "// Ren\u00e9 Thomas Cyclically Symmetric Chaotic System\nfunction stepThomas(x, y, z, dt = 0.03, b = 0.208186) {\n  const dx = (Math.sin(y) - b * x) * dt;\n  const dy = (Math.sin(z) - b * y) * dt;\n  const dz = (Math.sin(x) - b * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 8000,
    "dt": 0.035,
    "primaryColor": [
        0.35,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.85,
        0.2,
        0.95
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
      let x = 0.1, y = 0, z = 0;
      const b = 0.208186;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (Math.sin(y) - b * x) * dt;
        const dy = (Math.sin(z) - b * y) * dt;
        const dz = (Math.sin(x) - b * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2));
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

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
