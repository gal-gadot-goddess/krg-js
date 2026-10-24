// visualizers/genesio_tesi_chaotic_oscillator.js
// Genesio-Tesi Polynomial Chaotic Attractor Ribbon
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.genesio_tesi_chaotic_oscillator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "genesio_tesi_chaotic_oscillator",
    title: "Genesio-Tesi Polynomial Chaotic Attractor Ribbon",
    fileName: "genesio_tesi.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Third-order autonomous polynomial Genesio-Tesi chaotic attractor folding into continuous ribbon loops in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #genesiosi #strangeattractor #chaostheory #polynomial #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Genesio-Tesi Chaotic Differential Equations\nfunction stepGenesioTesi(x, y, z, a = 0.44, b = 1.1, c = 1.0, dt = 0.015) {\n  const dx = y * dt;\n  const dy = z * dt;\n  const dz = (-c * x - b * y - a * z + x * x) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",

    defaultParams: {
    "primaryColor": [
        0.85,
        0.3,
        1.0
    ],
    "secondaryColor": [
        0.2,
        0.95,
        0.85
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

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.015;
      const a = 0.44, b = 1.1, c = 1.0;

      for (let i = 0; i < count; i++) {
        const dx = y * dt;
        const dy = z * dt;
        const dz = (-c * x - b * y - a * z + x * x) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 4.5, y * 4.5, z * 4.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const gtLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(gtLine);

      scene.userData = { group, gtLine, params };
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
