// visualizers/slime_mold_physarum_network.js
// Physarum Slime Mold Bio-Network
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.slime_mold_physarum_network = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "slime_mold_physarum_network",
    title: "Physarum Slime Mold Bio-Network",
    fileName: "slime_mold.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83e\udda0 Self-optimizing biological transport network! Physarum polycephalum slime mold foraging in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf3f\ud83d\udd2c\n\n#threejs #webgl #physarum #slimemold #nature #generative #creativecoding #javascript #reels",
    
    displayCode: "// Physarum Polycephalum Agent Chemoattractant Trail Advection\nfunction simulatePhysarumAgents(agents, chemoMap, sensorAngle = 0.45) {\n  agents.forEach(a => {\n    // Sense chemoattractant gradient left, center, right\n    const angle = a.heading;\n    a.x += Math.cos(angle) * a.speed;\n    a.y += Math.sin(angle) * a.speed;\n  });\n}",

    defaultParams: {
    "nodeCount": 350,
    "primaryColor": [
        0.85,
        0.95,
        0.2
    ],
    "secondaryColor": [
        0.15,
        0.85,
        0.95
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

      const count = params.nodeCount;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 4));
      }

      const lines = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 2.5) {
            lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
            lines.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
      const lMat = new THREE.LineBasicMaterial({ color: 0x84cc16, transparent: true, opacity: 0.75 });
      const mesh = new THREE.LineSegments(lGeo, lMat);
      group.add(mesh);

      scene.userData = { group, mesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
