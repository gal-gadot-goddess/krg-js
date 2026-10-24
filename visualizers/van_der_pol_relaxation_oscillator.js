// visualizers/van_der_pol_relaxation_oscillator.js
// Van der Pol Stiff Non-Linear Limit Cycle Oscillator
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.van_der_pol_relaxation_oscillator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "van_der_pol_relaxation_oscillator",
    title: "Van der Pol Stiff Non-Linear Limit Cycle Oscillator",
    fileName: "vanderpol_oscillator.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Balthasar van der Pol non-conservative limit cycle relaxation oscillations in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #vanderpol #limitcycle #chaostheory #dynamics #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Van der Pol Non-Linear Oscillator\nfunction stepVanDerPol(x, y, dt = 0.015, mu = 2.5) {\n  const dx = y * dt;\n  const dy = (mu * (1 - x * x) * y - x) * dt;\n  return { x: x + dx, y: y + dy };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        0.4
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.8
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

      let x = 0.1, y = 0.1;
      const dt = 0.01;
      const mu = 2.5;

      for (let i = 0; i < count; i++) {
        const dx = y * dt;
        const dy = (mu * (1 - x*x) * y - x) * dt;
        x += dx; y += dy;
        const z = (i / count - 0.5) * 8.0;
        pts.push(new THREE.Vector3(x * 2.5, y * 1.5, z));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const vdpLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(vdpLine);

      scene.userData = { group, vdpLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
