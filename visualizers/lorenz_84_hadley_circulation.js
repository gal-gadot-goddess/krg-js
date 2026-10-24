// visualizers/lorenz_84_hadley_circulation.js
// Lorenz-84 Atmospheric Hadley Cell Climate Chaos
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.lorenz_84_hadley_circulation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "lorenz_84_hadley_circulation",
    title: "Lorenz-84 Atmospheric Hadley Cell Climate Chaos",
    fileName: "lorenz_84.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf2a\ufe0f Edward Lorenz's 1984 low-order general atmospheric circulation model with baroclinic planetary jet stream chaos in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf0d\n\n#threejs #webgl #lorenz84 #meteorology #hadleycell #chaostheory #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Lorenz 1984 Atmospheric Differential Equations\nfunction stepLorenz84(x, y, z, a = 0.25, b = 4.0, F = 8.0, G = 1.0, dt = 0.005) {\n  const dx = (-y*y - z*z - a*x + a*F) * dt;\n  const dy = (x*y - b*x*z - y + G) * dt;\n  const dz = (b*x*y + x*z - z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.7,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.5,
        0.15
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

      let x = 1.0, y = 1.0, z = 1.0;
      const dt = 0.004;
      const a = 0.25, b = 4.0, F = 8.0, G = 1.0;

      for (let i = 0; i < count; i++) {
        const dx = (-y*y - z*z - a*x + a*F) * dt;
        const dy = (x*y - b*x*z - y + G) * dt;
        const dz = (b*x*y + x*z - z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 2.5, y * 2.5, z * 2.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const l84Line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(l84Line);

      scene.userData = { group, l84Line, params };
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
