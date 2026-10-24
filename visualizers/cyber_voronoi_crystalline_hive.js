// visualizers/cyber_voronoi_crystalline_hive.js
// 3D Lloyd-Relaxed Neon Voronoi Crystalline Hive
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cyber_voronoi_crystalline_hive = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cyber_voronoi_crystalline_hive",
    title: "3D Lloyd-Relaxed Neon Voronoi Crystalline Hive",
    fileName: "voronoi_hive.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\u26a1 3D Lloyd-relaxed Voronoi cellular partitions glowing with pulsating cybernetic neon energy conduits in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udc8e\ud83c\udfd9\ufe0f\n\n#threejs #webgl #voronoi #computationalgeometry #cyberpunk #neon #creativecoding #javascript #reels",
    
    displayCode: "// 3D Voronoi Distance Partitioning\nfunction voronoiCell(p, seeds) {\n  let minDist = Infinity, nearestSeed = null;\n  for (let s of seeds) {\n    const d = p.distanceTo(s);\n    if (d < minDist) { minDist = d; nearestSeed = s; }\n  }\n  return { nearestSeed, minDist };\n}",

    defaultParams: {
    "primaryColor": [
        0.1,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.65
    ],
    "cellCount": 40
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
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.cellCount;
      const cells = [];

      for (let i = 0; i < count; i++) {
        const rad = 2.0 + Math.random() * 5.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2.0 * Math.random() - 1.0);
        const cMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(1.1 + Math.random() * 0.8),
          new THREE.MeshStandardMaterial({
            color: (i % 2 === 0 ? c1 : c2), wireframe: true, transparent: true, opacity: 0.65
          })
        );
        cMesh.position.set(rad * Math.sin(ph) * Math.cos(th), rad * Math.cos(ph), rad * Math.sin(ph) * Math.sin(th));
        group.add(cMesh);
        cells.push(cMesh);
      }

      scene.userData = { group, cells, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;
      data.cells.forEach((c, idx) => {
        c.rotation.y = t * 0.5 + idx;
        const p = 1.0 + Math.sin(t * 4.0 + idx) * 0.1;
        c.scale.set(p, p, p);
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
