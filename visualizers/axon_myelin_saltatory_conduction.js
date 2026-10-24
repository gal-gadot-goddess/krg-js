// visualizers/axon_myelin_saltatory_conduction.js
// Neuronal Axon Myelin Sheath Saltatory Conduction
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.axon_myelin_saltatory_conduction = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "axon_myelin_saltatory_conduction",
    title: "Neuronal Axon Myelin Sheath Saltatory Conduction",
    fileName: "saltatory_conduction.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\u26a1 Electrical action potentials jumping at 100 m/s between Nodes of Ranvier across myelinated nerve axons in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83e\udde0\n\n#threejs #webgl #neuroscience #axon #myelin #saltatory #bioelectricity #creativecoding #javascript #reels",
    
    displayCode: "// Saltatory Conduction Voltage Node Jump\nfunction saltatoryVelocity(axonDiameter) {\n  // Conduction speed scales linearly with myelinated axon diameter\n  const velocity = 6.0 * axonDiameter; // meters per second\n  return velocity;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "nodeCount": 6
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
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Myelin Segments (Insulating Schwann Cells)
      const segments = [];
      const count = params.nodeCount;

      for (let i = 0; i < count; i++) {
        const x = -7.5 + (i / (count - 1)) * 15.0;
        const mMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.9, 0.9, 2.2, 24),
          new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
        );
        mMesh.rotation.z = Math.PI / 2;
        mMesh.position.x = x;
        group.add(mMesh);
        segments.push(mMesh);
      }

      // Action Potential Pulse Spark
      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 16, 16),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 1.2 })
      );
      group.add(spark);

      scene.userData = { group, segments, spark, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      // Saltatory jump trajectory across nodes
      const jumpTime = (t * 2.5) % data.params.nodeCount;
      const nodeIdx = Math.floor(jumpTime);
      const frac = jumpTime - nodeIdx;
      const x1 = -7.5 + (nodeIdx / (data.params.nodeCount - 1)) * 15.0;
      const x2 = -7.5 + ((nodeIdx + 1) / (data.params.nodeCount - 1)) * 15.0;
      data.spark.position.x = x1 + (x2 - x1) * frac;
      data.spark.position.y = Math.sin(frac * Math.PI) * 1.5;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
