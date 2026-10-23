// visualizers/feynman_diagram_field.js
// QED Feynman Diagram Lattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.feynman_diagram_field = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "feynman_diagram_field",
    title: "QED Feynman Diagram Lattice",
    fileName: "feynman_field.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u26a1 Quantum Electrodynamics interaction vertices! Electron-positron virtual photon annihilation in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udcd0\n\n#threejs #webgl #feynman #qed #particlephysics #quantum #creativecoding #javascript #reels",
    
    displayCode: "// QED Vertex Propagator Waves: e- + e+ -> gamma -> mu- + mu+\nfunction createFeynmanVertices(nodeCount = 20) {\n  const lines = [];\n  for (let n = 0; n < nodeCount; n++) {\n    const vCenter = new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*10, 0);\n    // Propagator wavy lines\n    for (let w = 0; w < 4; w++) {\n      const ang = (w / 4) * Math.PI * 2;\n      lines.push(vCenter.x, vCenter.y, 0);\n      lines.push(vCenter.x + Math.cos(ang)*3.5, vCenter.y + Math.sin(ang)*3.5, 0);\n    }\n  }\n  return lines;\n}",

    defaultParams: {
    "vertexCount": 24,
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
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

      const linePos = [];
      const count = params.vertexCount;
      for (let i = 0; i < count; i++) {
        const cx = (Math.random() - 0.5) * 12;
        const cy = (Math.random() - 0.5) * 12;
        const cz = (Math.random() - 0.5) * 4;
        for (let j = 0; j < 4; j++) {
          const a = (j / 4) * Math.PI * 2;
          linePos.push(cx, cy, cz);
          linePos.push(cx + Math.cos(a) * 2.8, cy + Math.sin(a) * 2.8, cz + (Math.random() - 0.5));
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.85
      });
      const lines = new THREE.LineSegments(geo, mat);
      group.add(lines);

      scene.userData = { group, lines, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
