// visualizers/mycelium_spore_fungal_network.js
// Mycelium Underground Hyphae Network
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.mycelium_spore_fungal_network = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "mycelium_spore_fungal_network",
    title: "Mycelium Underground Hyphae Network",
    fileName: "mycelium_network.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83c\udf44 Underground fungal mycelium hyphae network transporting biological nutrients & electrical impulses in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf3f\u2728\n\n#threejs #webgl #mycelium #fungi #nature #generative #creativecoding #javascript #reels",
    
    displayCode: "// Space Colonization Algorithm for Mycelium Hyphae Branching\nfunction growHyphaeFilament(growthNodes, attractorPoints) {\n  growthNodes.forEach(node => {\n    // Find nearest nutrient attractors & branch towards centroid\n    const dir = calculateAttractorCentroid(node, attractorPoints);\n    node.position.add(dir.multiplyScalar(0.2));\n  });\n}",

    defaultParams: {
    "spores": 4500,
    "primaryColor": [
        0.3,
        0.95,
        0.8
    ],
    "secondaryColor": [
        0.95,
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

      const count = params.spores;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x4ade80, blending: THREE.AdditiveBlending });
      const pts = new THREE.Points(geo, mat);
      group.add(pts);

      scene.userData = { group, pts, params };
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
