// visualizers/newton_leipnik_two_scroll.js
// Newton-Leipnik Symmetrical Twin Ellipsoid Chaotic Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.newton_leipnik_two_scroll = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "newton_leipnik_two_scroll",
    title: "Newton-Leipnik Symmetrical Twin Ellipsoid Chaotic Attractor",
    fileName: "newton_leipnik.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Rigid body gyroscope instability producing the Newton-Leipnik twin ellipsoid chaotic attractor in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcab\n\n#threejs #webgl #newtonleipnik #strangeattractor #chaostheory #mechanics #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Newton-Leipnik Rigid Gyroscope System\nfunction stepNewtonLeipnik(x, y, z, a = 0.4, b = 0.175, dt = 0.008) {\n  const dx = (-a * x + y + 10 * y * z) * dt;\n  const dy = (-x - 0.4 * y + 5 * x * z) * dt;\n  const dz = (b * z - 5 * x * y) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.7
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

      let x = 0.349, y = 0.0, z = -0.16;
      const dt = 0.008;
      const a = 0.4, b = 0.175;

      for (let i = 0; i < count; i++) {
        const dx = (-a * x + y + 10.0 * y * z) * dt;
        const dy = (-x - 0.4 * y + 5.0 * x * z) * dt;
        const dz = (b * z - 5.0 * x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 12.0, y * 12.0, z * 12.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const nlLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(nlLine);

      scene.userData = { group, nlLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
