// visualizers/tron_lightcycle_data_grid.js
// TRON Lightcycle Neon Trails
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tron_lightcycle_data_grid = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tron_lightcycle_data_grid",
    title: "TRON Lightcycle Neon Trails",
    fileName: "tron_grid.js",
    category: "Cyberpunk & Digital Systems",
    genre: "synthwave",
    caption: "\ud83d\udd79\ufe0f High-speed TRON lightcycle neon ribbon trails carving 90-degree vector cuts across cyber grid in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udfc1\n\n#threejs #webgl #tron #lightcycle #cyberpunk #outrun #creativecoding #javascript #reels",
    
    displayCode: "// Vector Trail History & Ribbon Generation\nfunction buildLightTrail(trailHistory, ribbonHeight = 1.6) {\n  const quadPositions = [];\n  for (let i = 0; i < trailHistory.length - 1; i++) {\n    const p1 = trailHistory[i];\n    const p2 = trailHistory[i + 1];\n    quadPositions.push(p1.x, p1.y, p1.z);\n    quadPositions.push(p1.x, p1.y + ribbonHeight, p1.z);\n    quadPositions.push(p2.x, p2.y, p2.z);\n  }\n  return quadPositions;\n}",

    defaultParams: {
    "gridWidth": 30.0,
    "ribbonHeight": 1.6,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.1
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

      camera.position.set(0, 6, 16);
      camera.lookAt(0, 1, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Floor grid
      const grid = new THREE.GridHelper(30, 30, 0x38bdf8, 0x1e293b);
      group.add(grid);

      // Cycle trails (Ribbon meshes)
      const tGeo = new THREE.PlaneGeometry(16, 1.6, 32, 1);
      const tMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, wireframe: true });
      const trail1 = new THREE.Mesh(tGeo, tMat);
      trail1.position.set(0, 0.8, -3);
      group.add(trail1);

      const trail2 = new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, wireframe: true }));
      trail2.position.set(0, 0.8, 3);
      group.add(trail2);

      scene.userData = { group, trail1, trail2, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.trail1.position.x = Math.sin(t * 1.5) * 4.0;
      data.trail2.position.x = -Math.sin(t * 1.5) * 4.0;

      camera.position.x = Math.sin(t * 0.3) * 16;
      camera.position.z = Math.cos(t * 0.3) * 16;
      camera.position.y = 6 + Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 1, 0);

      renderer.render(scene, camera);
    }
  };
});
