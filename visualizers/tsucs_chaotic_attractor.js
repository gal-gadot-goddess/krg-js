// visualizers/tsucs_chaotic_attractor.js
// Three-Scroll Unified Chaotic System (TSUCS) Tri-Wing
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tsucs_chaotic_attractor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tsucs_chaotic_attractor",
    title: "Three-Scroll Unified Chaotic System (TSUCS) Tri-Wing",
    fileName: "tsucs_attractor.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Three-scroll unified chaotic system (TSUCS) generating tri-fold interlocking chaotic wings in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #tsucs #threescroll #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Three-Scroll Unified Chaotic System\nfunction stepTSUCS(x, y, z, a = 40, b = 0.833, c = 20, d = 0.5, e = 0.65, dt = 0.005) {\n  const dx = (a * (y - x) + d * x * z) * dt;\n  const dy = (c * x - x * z + e * y) * dt;\n  const dz = (x * y - b * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.25,
        0.75,
        1.0
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

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.003;
      const a = 40.0, b = 0.833, c = 20.0, d = 0.5, e = 0.65;

      for (let i = 0; i < count; i++) {
        const dx = (a * (y - x) + d * x * z) * dt;
        const dy = (c * x - x * z + e * y) * dt;
        const dz = (x * y - b * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.55, (z - 25) * 0.55, y * 0.55));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const tsucsLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(tsucsLine);

      scene.userData = { group, tsucsLine, params };
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
