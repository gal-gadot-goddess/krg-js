// visualizers/dequan_li_hyperchaos.js
// Dequan Li 4D Hyperchaotic Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dequan_li_hyperchaos = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dequan_li_hyperchaos",
    title: "Dequan Li 4D Hyperchaotic Attractor",
    fileName: "dequan_hyperchaos.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 4-Dimensional Dequan Li hyperchaotic system with multiple positive Lyapunov exponents in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #hyperchaos #dequanli #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// 4D Dequan Li Hyperchaotic Differential System\nfunction stepDequanLi(x, y, z, w, dt = 0.005) {\n  const a = 40, c = 1.833, d = 0.16, e = 0.65, k = 55, f = 20;\n  const dx = (a * (y - x) + d * x * z) * dt;\n  const dy = (k * x + f * y - x * z) * dt;\n  const dz = (c * z + x * y - e * x * x) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7500,
    "dt": 0.004,
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
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

      camera.position.set(0, 0, 22);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0.1, z = 0.1;
      const a = 40, c = 1.833, d = 0.16, e = 0.65, k = 55, f = 20;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (a * (y - x) + d * x * z) * dt;
        const dy = (k * x + f * y - x * z) * dt;
        const dz = (c * z + x * y - e * x * x) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.28, y * 0.28, z * 0.28));
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

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
