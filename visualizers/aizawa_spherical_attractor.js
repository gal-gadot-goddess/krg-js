// visualizers/aizawa_spherical_attractor.js
// Aizawa Spherical Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.aizawa_spherical_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "aizawa_spherical_attractor",
    title: "Aizawa Spherical Attractor",
    fileName: "aizawa_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83d\udd2e Yoji Aizawa spherical core chaotic attractor with twisting funnel in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #aizawa #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Aizawa 3D Non-Linear Chaotic Attractor\nfunction stepAizawa(x, y, z, dt = 0.01) {\n  const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;\n  const dx = ((z - b) * x - d * y) * dt;\n  const dy = (d * x + (z - b) * y) * dt;\n  const dz = (c + a * z - (z*z*z)/3 - (x*x + y*y)*(1 + e*z) + f * z * Math.pow(x, 3)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 8000,
    "dt": 0.01,
    "primaryColor": [
        0.15,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.95,
        0.85,
        0.2
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
      const dt = params.dt;
      const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;

      for (let i = 0; i < count; i++) {
        const dx = ((z - b) * x - d * y) * dt;
        const dy = (d * x + (z - b) * y) * dt;
        const dz = (c + a * z - (z*z*z)/3 - (x*x + y*y)*(1 + e*z) + f * z * Math.pow(x, 3)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 4.2, y * 4.2, z * 4.2));
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
