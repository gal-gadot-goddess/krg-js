// visualizers/volterra_lotka_predator_prey_3d.js
// 3-Species Lotka-Volterra Competitive Ecosystem Limit Cycle
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.volterra_lotka_predator_prey_3d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "volterra_lotka_predator_prey_3d",
    title: "3-Species Lotka-Volterra Competitive Ecosystem Limit Cycle",
    fileName: "lotka_volterra_3d.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83d\udc3a 3-Species competitive predator-prey dynamics cycling through 3D ecological phase space limit cycles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf3f\n\n#threejs #webgl #lotkavolterra #predatorprey #ecology #dynamicalsystems #mathart #creativecoding #javascript #reels",
    
    displayCode: "// 3-Species Lotka-Volterra Ecosystem Matrix\nfunction stepLotkaVolterra(x, y, z, dt = 0.01) {\n  const dx = x * (1.0 - x - 0.5 * y - 0.5 * z) * dt;\n  const dy = y * (1.0 - 0.5 * x - y - 0.5 * z) * dt;\n  const dz = z * (1.0 - 0.5 * x - 0.5 * y - z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.5
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.2
    ],
    "steps": 7500
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
      camera.aspect = 1080 / 1920;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 0.3, y = 0.2, z = 0.5;
      const dt = 0.02;

      for (let i = 0; i < count; i++) {
        const dx = x * (1.0 - x - 1.2 * y - 0.2 * z) * dt;
        const dy = y * (1.0 - 0.2 * x - y - 1.2 * z) * dt;
        const dz = z * (1.0 - 1.2 * x - 0.2 * y - z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3((x - 0.3) * 12.0, (y - 0.3) * 12.0, (z - 0.3) * 12.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const lvLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(lvLine);

      scene.userData = { group, lvLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
