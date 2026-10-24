// visualizers/rikitake_geomagnetic_dynamo.js
// Rikitake Two-Disk Dynamo Earth Magnetic Field Reversal
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.rikitake_geomagnetic_dynamo = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "rikitake_geomagnetic_dynamo",
    title: "Rikitake Two-Disk Dynamo Earth Magnetic Field Reversal",
    fileName: "rikitake_dynamo.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf0d Chaotic geomagnetic dipole pole reversals simulated by the Rikitake coupled two-disk dynamo in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\uddf2\n\n#threejs #webgl #rikitake #geodynamo #magneticreversal #chaostheory #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Rikitake Two-Disk Dynamo System\nfunction stepRikitake(x, y, z, mu = 1.0, a = 5.0, dt = 0.008) {\n  const dx = (-mu * x + y * z) * dt;\n  const dy = (-mu * y + x * (z - a)) * dt;\n  const dz = (1.0 - x * y) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.4,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.7,
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

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.008;
      const mu = 1.0, a = 5.0;

      for (let i = 0; i < count; i++) {
        const dx = (-mu * x + y * z) * dt;
        const dy = (-mu * y + x * (z - a)) * dt;
        const dz = (1.0 - x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 1.5, (z - 5) * 1.5, y * 1.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const rLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(rLine);

      scene.userData = { group, rLine, params };
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
