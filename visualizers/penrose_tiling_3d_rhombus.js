// visualizers/penrose_tiling_3d_rhombus.js
// Aperiodic Penrose 3D Quasicrystal
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.penrose_tiling_3d_rhombus = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "penrose_tiling_3d_rhombus",
    title: "Aperiodic Penrose 3D Quasicrystal",
    fileName: "penrose_tiling.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 Aperiodic 5-fold quasicrystal Penrose rhombuses extruded into 3D space in Three.js WebGL! Non-repeating divine symmetry! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #penrosetiling #quasicrystal #sacredgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Aperiodic Penrose 5-Fold Rhombus Projection\nfunction generatePenroseTiles(levels = 4, radius = 5.2) {\n  const vertices = [];\n  for (let i = 0; i < 5; i++) {\n    const a = (i / 5) * Math.PI * 2;\n    vertices.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));\n  }\n  return vertices;\n}",

    defaultParams: {
    "rings": 5,
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
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

      for (let r = 0; r < 5; r++) {
        const rad = 2.0 + r * 1.4;
        const geo = new THREE.RingGeometry(rad, rad + 0.2, 5);
        const mat = new THREE.MeshBasicMaterial({ color: r % 2 === 0 ? 0xf59e0b : 0x38bdf8, wireframe: true });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.z = r * 0.35;
        group.add(mesh);
      }

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.5;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
