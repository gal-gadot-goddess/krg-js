// visualizers/chua_circuit_double_scroll.js
// Chua's Electronic Circuit Double-Scroll Strange Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chua_circuit_double_scroll = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chua_circuit_double_scroll",
    title: "Chua's Electronic Circuit Double-Scroll Strange Attractor",
    fileName: "chua_circuit.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\u26a1 Leon Chua's classic electronic chaotic circuit with piecewise-linear negative diode generating infinite double-scroll loops in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83c\udf00\n\n#threejs #webgl #chuacircuit #doublescroll #chaostheory #electronics #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Chua's Piecewise-Linear Circuit Equations\nfunction stepChua(x, y, z, alpha = 15.6, beta = 28, m0 = -1.143, m1 = -0.714) {\n  const f = m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1));\n  const dx = alpha * (y - x - f);\n  const dy = x - y + z;\n  const dz = -beta * y;\n  return { dx, dy, dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.15
    ],
    "points": 8500
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

      let x = 0.1, y = 0.0, z = 0.0;
      const dt = 0.006;
      const alpha = 15.6, beta = 28.0, m0 = -1.143, m1 = -0.714;

      for (let i = 0; i < count; i++) {
        const f = m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1));
        const dx = alpha * (y - x - f) * dt;
        const dy = (x - y + z) * dt;
        const dz = (-beta * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.5, y * 3.5, z * 3.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const chuaLine = new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: c1, transparent: true, opacity: 0.85, linewidth: 1.5
      }));
      group.add(chuaLine);

      scene.userData = { group, chuaLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
