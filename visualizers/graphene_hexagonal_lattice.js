// visualizers/graphene_hexagonal_lattice.js
// Graphene Honeycomb & Dirac Cones
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.graphene_hexagonal_lattice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "graphene_hexagonal_lattice",
    title: "Graphene Honeycomb & Dirac Cones",
    fileName: "graphene_lattice.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u26a1 2D hexagonal carbon honeycomb graphene sheet with relativistic Dirac cone electron dispersion in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udcd0\n\n#threejs #webgl #graphene #nanotech #physics #creativecoding #javascript #mathart #reels",
    
    displayCode: "// 2D Graphene Hexagonal Honeycomb Crystal Sheet\nfunction buildGrapheneSheet(rows = 14, cols = 14, a = 0.9) {\n  const carbonAtoms = [];\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      const x = c * a * 1.5;\n      const y = (r + (c % 2) * 0.5) * a * Math.sqrt(3);\n      carbonAtoms.push(new THREE.Vector3(x - 8, y - 8, 0));\n    }\n  }\n  return carbonAtoms;\n}",

    defaultParams: {
    "rows": 16,
    "cols": 16,
    "primaryColor": [
        0.15,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.9
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

      const atoms = [];
      const a = 1.0;
      for (let r = 0; r < params.rows; r++) {
        for (let c = 0; c < params.cols; c++) {
          const x = c * a * 1.5 - 10;
          const y = (r + (c % 2) * 0.5) * a * 1.732 - 10;
          atoms.push(new THREE.Vector3(x, y, 0));
        }
      }

      // Honeycomb bonds (LineSegments)
      const linePos = [];
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const d = atoms[i].distanceTo(atoms[j]);
          if (d > 0.8 && d < 1.2) {
            linePos.push(atoms[i].x, atoms[i].y, atoms[i].z);
            linePos.push(atoms[j].x, atoms[j].y, atoms[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.85
      });
      const bonds = new THREE.LineSegments(lGeo, lMat);
      group.add(bonds);

      // Atom spheres
      const sGeo = new THREE.BufferGeometry().setFromPoints(atoms);
      const sMat = new THREE.PointsMaterial({ size: 0.22, color: 0xffffff });
      const points = new THREE.Points(sGeo, sMat);
      group.add(points);

      scene.userData = { group, bonds, points, atoms, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const bPos = data.bonds.geometry.attributes.position;
      const count = bPos.count;
      for (let i = 0; i < count; i++) {
        const x = bPos.getX(i);
        const y = bPos.getY(i);
        const wave = Math.sin(x * 0.5 + t * 4.0) * Math.cos(y * 0.5 + t * 3.0) * 1.2;
        bPos.setZ(i, wave);
      }
      bPos.needsUpdate = true;

      data.group.rotation.x = 0.6 + Math.sin(t * 0.4) * 0.2;
      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
