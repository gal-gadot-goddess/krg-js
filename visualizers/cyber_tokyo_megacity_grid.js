// visualizers/cyber_tokyo_megacity_grid.js
// Cyber Tokyo Skyscraper Matrix
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cyber_tokyo_megacity_grid = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cyber_tokyo_megacity_grid",
    title: "Cyber Tokyo Skyscraper Matrix",
    fileName: "tokyo_skyscrapers.js",
    category: "Cyberpunk & Digital Systems",
    genre: "synthwave",
    caption: "\ud83c\udf06 Futuristic Tokyo Neo-Megacity wireframe skyscrapers & neon flight corridors in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udfd9\ufe0f\n\n#threejs #webgl #cyberpunk #synthwave #tokyo #city #creativecoding #javascript #reels",
    
    displayCode: "// Procedural Neon Megacity Skyscraper Blocks\nfunction generateSkyscraperGrid(cols = 10, rows = 10, spacing = 2.2) {\n  const buildings = new THREE.Group();\n  for (let c = 0; c < cols; c++) {\n    for (let r = 0; r < rows; r++) {\n      const height = 2.0 + Math.random() * 8.0;\n      const bGeo = new THREE.BoxGeometry(1.4, height, 1.4);\n      bGeo.translate((c - cols/2)*spacing, height/2, (r - rows/2)*spacing);\n      buildings.add(new THREE.Mesh(bGeo, buildingMat));\n    }\n  }\n  return buildings;\n}",

    defaultParams: {
    "cityCols": 12,
    "cityRows": 12,
    "primaryColor": [
        0.15,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.15,
        0.6
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

      camera.position.set(0, 10, 18);
      camera.lookAt(0, 2, 0);

      const group = new THREE.Group();
      scene.add(group);

      const cols = params.cityCols, rows = params.cityRows;
      const bGeoMerged = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const h = 2.0 + Math.pow(Math.random(), 1.5) * 8.0;
          const bg = new THREE.BoxGeometry(1.2, h, 1.2);
          const mat = new THREE.MeshBasicMaterial({
            color: (c + r) % 2 === 0 ? 0x38bdf8 : 0xf43f5e,
            wireframe: true
          });
          const bMesh = new THREE.Mesh(bg, mat);
          bMesh.position.set((c - cols / 2) * 1.8, h / 2, (r - rows / 2) * 1.8);
          group.add(bMesh);
        }
      }

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.position.y = 9 + Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 3, 0);

      renderer.render(scene, camera);
    }
  };
});
