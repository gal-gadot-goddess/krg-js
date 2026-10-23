// visualizers/topological_insulator_edge.js
// Topological Insulator Edge States
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.topological_insulator_edge = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "topological_insulator_edge",
    title: "Topological Insulator Edge States",
    fileName: "topological_insulator.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u26a1 Quantum spin Hall effect! Insulating bulk with dissipationless helical chiral edge conduction in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udcd0\n\n#threejs #webgl #topologicalinsulator #condensedmatter #physics #creativecoding #javascript #reels",
    
    displayCode: "// Helical Chiral Edge State Conduction\nfunction renderTopologicalEdgeCurrent(perimeter = 400) {\n  const edgeParticles = new Float32Array(perimeter * 3);\n  for (let i = 0; i < perimeter; i++) {\n    const u = i / perimeter;\n    const ang = u * Math.PI * 2;\n    // Edge channel confined to boundary perimeter\n    edgeParticles[i * 3 + 0] = Math.cos(ang) * 5.0;\n    edgeParticles[i * 3 + 1] = Math.sin(ang) * 5.0;\n    edgeParticles[i * 3 + 2] = Math.sin(u * 12.0) * 0.4;\n  }\n  return edgeParticles;\n}",

    defaultParams: {
    "bulkWidth": 8.0,
    "edgeCount": 4500,
    "primaryColor": [
        0.15,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.8,
        0.2
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

      // Insulating bulk crystal slab
      const bGeo = new THREE.BoxGeometry(8, 8, 1.2);
      const bMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true });
      const bulk = new THREE.Mesh(bGeo, bMat);
      group.add(bulk);

      // Chiral edge particles (racing along boundary)
      const count = params.edgeCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = Math.cos(u) * 4.2;
        pos[i * 3 + 1] = Math.sin(u) * 4.2;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const edge = new THREE.Points(geo, mat);
      group.add(edge);

      scene.userData = { group, edge, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      data.edge.rotation.z = t * 2.0;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
