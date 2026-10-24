// visualizers/duffing_chaotic_oscillator.js
// Driven Non-Linear Duffing Oscillator Strange Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.duffing_chaotic_oscillator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "duffing_chaotic_oscillator",
    title: "Driven Non-Linear Duffing Oscillator Strange Attractor",
    fileName: "duffing_oscillator.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Driven non-linear Duffing double-well potential chaotic phase space trajectories in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcab\n\n#threejs #webgl #duffing #chaostheory #strangeattractor #nonlinear #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Driven Duffing Differential Equations\nfunction stepDuffing(x, v, t, delta = 0.3, alpha = -1, beta = 1, gamma = 0.5, omega = 1.2) {\n  const dx = v;\n  const dv = -delta * v - alpha * x - beta * Math.pow(x, 3) + gamma * Math.cos(omega * t);\n  return { dx, dv };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "points": 8000
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
      const count = params.points;
      const pts = [];

      let x = 0.1, v = 0.0;
      const dt = 0.02;
      const delta = 0.25, alpha = -1.0, beta = 1.0, gamma = 0.45, omega = 1.2;

      for (let i = 0; i < count; i++) {
        const time = i * dt;
        const dx = v * dt;
        const dv = (-delta * v - alpha * x - beta * Math.pow(x, 3) + gamma * Math.cos(omega * time)) * dt;
        x += dx; v += dv;
        pts.push(new THREE.Vector3(x * 3.5, v * 3.5, Math.sin(omega * time) * 3.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const duffingLine = new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: c1, transparent: true, opacity: 0.85, linewidth: 1.5
      }));
      group.add(duffingLine);

      scene.userData = { group, duffingLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
