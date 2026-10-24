// visualizers/hindmarsh_rose_bursting_neuron.js
// Hindmarsh-Rose Chaotic Bursting Neuron Phase Space
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hindmarsh_rose_bursting_neuron = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hindmarsh_rose_bursting_neuron",
    title: "Hindmarsh-Rose Chaotic Bursting Neuron Phase Space",
    fileName: "hindmarsh_rose.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\u26a1 Chaotic bursting spike trains in the Hindmarsh-Rose 3D biological membrane potential model in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83e\udde0\n\n#threejs #webgl #hindmarshrose #neuroscience #actionpotential #chaostheory #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Hindmarsh-Rose Bursting Membrane Equations\nfunction stepHindmarshRose(x, y, z, I = 3.2, dt = 0.01) {\n  const dx = (y - x*x*x + 3.0*x*x - z + I) * dt;\n  const dy = (1.0 - 5.0*x*x - y) * dt;\n  const dz = (0.006 * (4.0 * (x + 1.6) - z)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.75,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "steps": 8500
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

      let x = -1.3, y = -1.0, z = 1.0;
      const dt = 0.015;
      const I = 3.25;

      for (let i = 0; i < count; i++) {
        const dx = (y - x*x*x + 3.0*x*x - z + I) * dt;
        const dy = (1.0 - 5.0*x*x - y) * dt;
        const dz = (0.006 * (4.0 * (x + 1.6) - z)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.5, y * 0.8, (z - 2.5) * 3.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const hrLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(hrLine);

      scene.userData = { group, hrLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
