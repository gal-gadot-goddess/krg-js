// visualizers/platonic_solid_fractal_nested.js
// Nested Platonic Solids Orbit
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.platonic_solid_fractal_nested = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "platonic_solid_fractal_nested",
    title: "Nested Platonic Solids Orbit",
    fileName: "nested_platonic.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd2e Concentric nested Platonic Solids (Icosahedron, Dodecahedron, Octahedron, Cube) rotating on Keplerian golden axes! Sacred geometry in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #platonicsolids #sacredgeometry #kepler #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Kepler's Mysterium Cosmographicum Nested Polyhedra\nfunction buildNestedPlatonicSolids() {\n  const solids = new THREE.Group();\n  const geos = [\n    new THREE.IcosahedronGeometry(6.0, 1),\n    new THREE.DodecahedronGeometry(4.5, 0),\n    new THREE.OctahedronGeometry(3.2, 0),\n    new THREE.BoxGeometry(2.0, 2.0, 2.0),\n    new THREE.TetrahedronGeometry(1.2, 0)\n  ];\n  geos.forEach((geo, idx) => {\n    const mesh = new THREE.Mesh(geo, wireMaterials[idx]);\n    solids.add(mesh);\n  });\n  return solids;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.85,
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

      const meshes = [];
      const geos = [
        new THREE.IcosahedronGeometry(6.2, 1),
        new THREE.DodecahedronGeometry(4.6, 0),
        new THREE.OctahedronGeometry(3.2, 0),
        new THREE.BoxGeometry(2.2, 2.2, 2.2),
        new THREE.TetrahedronGeometry(1.3, 0)
      ];

      const colors = [0x38bdf8, 0xa855f7, 0xf59e0b, 0x10b981, 0xef4444];

      geos.forEach((g, idx) => {
        const mat = new THREE.MeshBasicMaterial({
          color: colors[idx], wireframe: true, transparent: true, opacity: 0.8
        });
        const m = new THREE.Mesh(g, mat);
        group.add(m);
        meshes.push(m);
      });

      scene.userData = { group, meshes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.meshes.forEach((m, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        m.rotation.x = t * (0.6 + idx * 0.15) * dir;
        m.rotation.y = t * (0.8 + idx * 0.2) * dir;
        m.rotation.z = Math.sin(t * 0.5) * 0.3;
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
