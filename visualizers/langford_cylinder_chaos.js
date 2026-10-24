// visualizers/langford_cylinder_chaos.js
// Langford Toroidal Invariant Cylindrical Knot Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.langford_cylinder_chaos = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "langford_cylinder_chaos",
    title: "Langford Toroidal Invariant Cylindrical Knot Attractor",
    fileName: "langford_chaos.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 William Langford's toroidal cylinder chaos system winding invariant particle streamlines in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #langford #chaostheory #torus #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Langford Toroidal Chaos Differential Equations\nfunction stepLangford(x, y, z, a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1, dt = 0.008) {\n  const dx = ((z - b) * x - d * y) * dt;\n  const dy = (d * x + (z - b) * y) * dt;\n  const dz = (c + a * z - (z*z*z) / 3 - (x*x + y*y) * (1 + e * z) + f * z * Math.pow(x, 3)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.15,
        0.95,
        0.65
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
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

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.006;
      const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;

      for (let i = 0; i < count; i++) {
        const dx = ((z - b) * x - d * y) * dt;
        const dy = (d * x + (z - b) * y) * dt;
        const dz = (c + a * z - (z*z*z)/3.0 - (x*x + y*y) * (1 + e * z) + f * z * Math.pow(x, 3)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 5.0, y * 5.0, (z - 1.2) * 5.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const lLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(lLine);

      scene.userData = { group, lLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
