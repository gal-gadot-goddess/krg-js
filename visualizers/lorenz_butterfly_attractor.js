// visualizers/lorenz_butterfly_attractor.js
// Lorenz Strange Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.lorenz_butterfly_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "lorenz_butterfly_attractor",
    title: "Lorenz Strange Attractor",
    fileName: "lorenz_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83e\udd8b The legendary Lorenz strange attractor butterfly effect! Deterministic non-periodic flow in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #lorenz #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Edward Lorenz Non-Linear Weather Differential Equations\nfunction stepLorenz(x, y, z, dt = 0.008, sigma = 10, rho = 28, beta = 8/3) {\n  const dx = sigma * (y - x) * dt;\n  const dy = (x * (rho - z) - y) * dt;\n  const dz = (x * y - beta * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7500,
    "dt": 0.008,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.65
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

      camera.position.set(0, 0, 24);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0, z = 0;
      const sigma = 10, rho = 28, beta = 8 / 3;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.45, (z - 25) * 0.45, y * 0.45));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5, transparent: true, opacity: 0.85
      });
      const lorenzLine = new THREE.Line(geo, mat);
      group.add(lorenzLine);

      scene.userData = { group, lorenzLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.5;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
