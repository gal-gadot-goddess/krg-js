// visualizers/tessellated_octree_sparse_voxel_octree_svo.js
// Sparse Voxel Octree (SVO) Hierarchical Ray-Traced Voxels
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tessellated_octree_sparse_voxel_octree_svo = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tessellated_octree_sparse_voxel_octree_svo",
    title: "Sparse Voxel Octree (SVO) Hierarchical Ray-Traced Voxels",
    fileName: "svo_voxel_hive.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83e\uddca Next-gen real-time ray tracing: Sparse Voxel Octree (SVO) 3D spatial partitioning and hierarchical leaf voxel rendering in Three.js! Follow @kreggsjs! \u26a1\ud83d\udcbb\n\n#threejs #webgl #voxels #octree #raytracing #graphics #gamedev #codeart",
    
    displayCode: "// SVO Node Subdivision Index: child = (x > cx) | ((y > cy) << 1) | ((z > cz) << 2)\nfunction svoTraverse(ray_pos, ray_dir, depth) {\n  return Math.pow(2, -depth);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.65
    ],
    "treeDepth": 4
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

      // Hierarchical Voxel Cubes
      const voxelGroup = new THREE.Group();
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          for (let z = -2; z <= 2; z++) {
            if (Math.random() < 0.35) {
              const sz = 1.0 + Math.random() * 0.8;
              const box = new THREE.Mesh(
                new THREE.BoxGeometry(sz, sz, sz),
                new THREE.MeshStandardMaterial({ color: (Math.random() < 0.5) ? c1 : c2, emissive: c1, emissiveIntensity: 0.45, wireframe: true })
              );
              box.position.set(x * 2.8, y * 2.8, z * 2.8);
              voxelGroup.add(box);
            }
          }
        }
      }
      group.add(voxelGroup);

      scene.userData = { group, voxelGroup, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
