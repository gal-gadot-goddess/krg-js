// visualizers/anokhin_neural_attractor.js
// Biological Neural Synchronization Multi-Stable Chaos Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.anokhin_neural_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "anokhin_neural_attractor",
    title: "Biological Neural Synchronization Multi-Stable Chaos Attractor",
    fileName: "anokhin_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83e\udde0 Multi-stable cortical neural synchrony attractor switching between cognitive perception basins in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #neuralattractor #neuroscience #chaostheory #cognitive #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Neural Functional System Functional Attractor\nfunction stepNeuralChaos(x, y, z, dt = 0.008) {\n  const dx = (y - Math.sin(z) * x) * dt;\n  const dy = (z - Math.cos(x) * y) * dt;\n  const dz = (0.2 * x * y - 0.7 * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.65,
        0.25,
        1.0
    ],
    "secondaryColor": [
        0.2,
        0.9,
        0.95
    ],
    "steps": 8000
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

      let x = 0.2, y = 0.1, z = 0.1;
      const dt = 0.008;

      for (let i = 0; i < count; i++) {
        const dx = (y - Math.sin(z) * x) * dt;
        const dy = (z - Math.cos(x) * y) * dt;
        const dz = (0.25 * x * y - 0.65 * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.8, y * 3.8, z * 3.8));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const neuralLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(neuralLine);

      scene.userData = { group, neuralLine, params };
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
