// visualizers/hyperbolic_poincare_embedding_knowledge_graph.js
// Poincaré Disk Hyperbolic Embedding & Knowledge Graph Hierarchy
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hyperbolic_poincare_embedding_knowledge_graph = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hyperbolic_poincare_embedding_knowledge_graph",
    title: "Poincaré Disk Hyperbolic Embedding & Knowledge Graph Hierarchy",
    fileName: "poincare_knowledge_graph.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83c\udf10 Machine learning representation: hierarchical knowledge graph embedded into continuous negative-curvature Poincar\u00e9 disk in Three.js! Follow @kreggsjs for daily reels! \u26a1\u2728\n\n#threejs #webgl #machinelearning #hyperbolic #poincare #graphneuralnetwork #ai #codeart",
    
    displayCode: "// Poincar\u00e9 Distance Metric: d_H(u, v) = arcosh(1 + 2 * ||u-v||^2 / ((1-||u||^2)*(1-||v||^2)))\nfunction poincareDistance(u, v) {\n  const num = 2.0 * u.clone().sub(v).lengthSq();\n  const den = (1.0 - u.lengthSq()) * (1.0 - v.lengthSq());\n  return Math.acosh(1.0 + num / den);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "diskRadius": 7.5
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

      // Outer Boundary Horizon Circle
      const boundary = new THREE.Mesh(
        new THREE.RingGeometry(params.diskRadius - 0.1, params.diskRadius, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
      );
      group.add(boundary);

      // 22,000 Tree Leaves in Hyperbolic Space
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const r = Math.pow(u, 0.4) * (params.diskRadius * 0.98);
        const th = Math.random() * Math.PI * 2;

        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
        pPos[i * 3 + 2] = Math.sin(th) * r;

        const col = c1.clone().lerp(c2, r / params.diskRadius);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const tree = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(tree);

      scene.userData = { group, tree, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.tree.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
