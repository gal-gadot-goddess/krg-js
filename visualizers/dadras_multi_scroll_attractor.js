// visualizers/dadras_multi_scroll_attractor.js
// Dadras Multi-Scroll Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dadras_multi_scroll_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dadras_multi_scroll_attractor",
    title: "Dadras Multi-Scroll Attractor",
    fileName: "dadras_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Complex 5-parameter Dadras multi-scroll chaotic attractor with dense coiling lobes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #dadras #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Dadras Multi-Scroll Chaotic System\nfunction stepDadras(x, y, z, dt = 0.008, p = 3, q = 2.7, r = 1.7, s = 2, e = 9) {\n  const dx = (y - p * x + q * y * z) * dt;\n  const dy = (r * y - x * z + z) * dt;\n  const dz = (s * x * y - e * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "trajectoryPoints": 7500,
    "dt": 0.008,
    "primaryColor": [
        1.0,
        0.4,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
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

      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 1.1, y = 1.2, z = 0.9;
      const p = 3, q = 2.7, r = 1.7, s = 2, e = 9;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (y - p * x + q * y * z) * dt;
        const dy = (r * y - x * z + z) * dt;
        const dz = (s * x * y - e * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.9, y * 0.9, z * 0.9));
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

      data.group.rotation.x = t * 0.45;
      data.group.rotation.y = t * 0.65;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
