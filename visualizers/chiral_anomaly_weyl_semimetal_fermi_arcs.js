// visualizers/chiral_anomaly_weyl_semimetal_fermi_arcs.js
// Weyl Semimetal Chiral Nodes & Fermi Arc Surface States
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chiral_anomaly_weyl_semimetal_fermi_arcs = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chiral_anomaly_weyl_semimetal_fermi_arcs",
    title: "Weyl Semimetal Chiral Nodes & Fermi Arc Surface States",
    fileName: "weyl_fermi_arcs.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Topological Weyl semimetal with monopoles of Berry curvature and open Fermi arc surface states in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #weylsemimetal #fermiarc #quantum #topological #physics #codeart",
    
    displayCode: "// Weyl Monopole Berry Curvature Field: Omega(k) = pm k / (2 * |k|^3)\nfunction berryCurvature(k, chirality) {\n  return k.clone().multiplyScalar(chirality / (2.0 * Math.pow(k.length(), 3)));\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "nodeSep": 5.5
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

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Weyl Monopole Nodes (+1 chirality cyan, -1 chirality orange)
      const w1 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: c1 }));
      w1.position.x = -params.nodeSep * 0.5;
      const w2 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: c2 }));
      w2.position.x = params.nodeSep * 0.5;
      group.add(w1); group.add(w2);

      // Open Fermi Arc Connecting Nodes (22,000 particles)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = -params.nodeSep * 0.5 + Math.random() * params.nodeSep;
        const normU = (u + params.nodeSep * 0.5) / params.nodeSep;
        const archY = Math.sin(normU * Math.PI) * 3.5;
        const spread = (Math.random() - 0.5) * 1.4;

        pPos[i * 3] = u;
        pPos[i * 3 + 1] = archY + spread;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;

        const col = c1.clone().lerp(c2, normU);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const arcs = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(arcs);

      scene.userData = { group, arcs, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
