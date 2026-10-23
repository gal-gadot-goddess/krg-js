// visualizers/dragonfly_wing_aerodynamics.js
// Dragonfly Wing Aerodynamics
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dragonfly_wing_aerodynamics = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dragonfly_wing_aerodynamics",
    title: "Dragonfly Wing Aerodynamics",
    fileName: "dragonfly_wing.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83e\udeb0 Micro-venation structural patterns and leading-edge vortex aerodynamics of a dragonfly wing in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf3f\ud83d\udd2c\n\n#threejs #webgl #dragonfly #biomimicry #aerodynamics #nature #creativecoding #javascript #reels",
    
    displayCode: "// Voronoi Wing Micro-Vein Structural Cell Tiling\nfunction generateWingVenation(cells = 120, wingLength = 12) {\n  const veins = [];\n  for (let c = 0; c < cells; c++) {\n    const x = (Math.random() - 0.5) * wingLength;\n    const y = (Math.random() - 0.5) * 3.5;\n    veins.push(new THREE.Vector3(x, y, 0));\n  }\n  return veins;\n}",

    defaultParams: {
    "wingLength": 12.0,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.8,
        0.95,
        0.3
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Wing outline & veins
      const pts = [];
      for (let i = 0; i <= 60; i++) {
        const u = (i / 60) * Math.PI;
        pts.push(new THREE.Vector3((i / 60) * 12 - 6, Math.sin(u) * 2.8, 0));
      }
      for (let i = 60; i >= 0; i--) {
        const u = (i / 60) * Math.PI;
        pts.push(new THREE.Vector3((i / 60) * 12 - 6, -Math.sin(u) * 1.4, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
      const wing = new THREE.Line(geo, mat);
      group.add(wing);

      scene.userData = { group, wing, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = Math.sin(t * 12.0) * 0.45; // High speed flutter
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
