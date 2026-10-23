// visualizers/digital_synapse_supercluster.js
// Supercomputer Neural Cluster
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.digital_synapse_supercluster = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "digital_synapse_supercluster",
    title: "Supercomputer Neural Cluster",
    fileName: "supercluster.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83e\udde0 Massive distributed quantum hypercube server node supercluster routing petabytes of neural data in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf10\n\n#threejs #webgl #supercomputer #datamining #network #cyberpunk #creativecoding #javascript #reels",
    
    displayCode: "// Hypercube Distributed Node Data Routing\nfunction routeHypercubePackets(nodes, packetCount = 200) {\n  const packetPos = [];\n  for (let p = 0; p < packetCount; p++) {\n    const src = nodes[Math.floor(Math.random() * nodes.length)];\n    const dst = nodes[Math.floor(Math.random() * nodes.length)];\n    packetPos.push(src.x, src.y, src.z);\n    packetPos.push(dst.x, dst.y, dst.z);\n  }\n  return packetPos;\n}",

    defaultParams: {
    "clusterNodes": 120,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.8
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

      const count = params.clusterNodes;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        ));
      }

      // Node mesh
      const sGeo = new THREE.BufferGeometry().setFromPoints(nodes);
      const sMat = new THREE.PointsMaterial({ size: 0.25, color: 0x38bdf8 });
      const pts = new THREE.Points(sGeo, sMat);
      group.add(pts);

      // Links
      const lines = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 3.2) {
            lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
            lines.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
      const lMat = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 });
      const links = new THREE.LineSegments(lGeo, lMat);
      group.add(links);

      scene.userData = { group, pts, links, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
