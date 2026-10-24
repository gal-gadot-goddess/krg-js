// visualizers/burke_shaw_chaotic_system.js
// Burke-Shaw Symmetrical Inverted Twin Spiral Attractor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.burke_shaw_chaotic_system = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "burke_shaw_chaotic_system",
    title: "Burke-Shaw Symmetrical Inverted Twin Spiral Attractor",
    fileName: "burke_shaw.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Burke-Shaw chaotic attractor with symmetrical twin spiral wings executing rapid topological transitions in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcab\n\n#threejs #webgl #burkeshaw #strangeattractor #chaostheory #nonlinear #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Burke-Shaw Chaotic System Equations\nfunction stepBurkeShaw(x, y, z, s = 10, v = 4.272, dt = 0.005) {\n  const dx = -s * (x + y) * dt;\n  const dy = (-y - s * x * z) * dt;\n  const dz = (s * x * y + v) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.3,
        0.45
    ],
    "secondaryColor": [
        0.2,
        0.9,
        0.85
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

      let x = 0.6, y = 0.6, z = 0.6;
      const dt = 0.003;
      const s = 10.0, v = 4.272;

      for (let i = 0; i < count; i++) {
        const dx = -s * (x + y) * dt;
        const dy = (-y - s * x * z) * dt;
        const dz = (s * x * y + v) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.8, (z - 2.5) * 3.8, y * 3.8));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const bsLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(bsLine);

      scene.userData = { group, bsLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
