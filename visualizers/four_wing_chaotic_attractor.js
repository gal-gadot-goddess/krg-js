// visualizers/four_wing_chaotic_attractor.js
// Four-Wing Quadruple Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.four_wing_chaotic_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "four_wing_chaotic_attractor",
    title: "Four-Wing Quadruple Attractor",
    fileName: "four_wing.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83e\udd8b Butterfly-like quadruple 4-wing coiling chaotic trajectory with high Lyapunov exponent in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #fourwing #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// 4-Wing Chaotic System\nfunction stepFourWing(x, y, z, dt = 0.008, a = 0.2, b = 0.01, c = -0.4) {\n  const dx = (a * x + y * z) * dt;\n  const dy = (b * x + c * y - x * z) * dt;\n  const dz = (-z - x * y) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 8000,
    "dt": 0.008,
    "primaryColor": [
        0.15,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.95,
        0.25,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0.2, z = 0.3;
      const a = 0.2, b = 0.01, c = -0.4;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (a * x + y * z) * dt;
        const dy = (b * x + c * y - x * z) * dt;
        const dz = (-z - x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 5.0, y * 5.0, z * 5.0));
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

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
