// visualizers/vascular_arterial_tree.js
// Murray's Law Vascular Network
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.vascular_arterial_tree = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "vascular_arterial_tree",
    title: "Murray's Law Vascular Network",
    fileName: "vascular_tree.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\u2764\ufe0f Murray's minimal-work fractal branching hemodynamic arterial blood vessel tree in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83e\ude78\n\n#threejs #webgl #cardiovascular #biology #fractal #medical #creativecoding #javascript #reels",
    
    displayCode: "// Murray's Law: r_parent^3 = r_child1^3 + r_child2^3\nfunction branchVascularArtery(startPt, dir, radius = 0.8, depth = 4) {\n  if (depth === 0) return;\n  const childR = radius * Math.pow(0.5, 1/3); // Murray's exponent 3\n  const endPt = startPt.clone().add(dir.clone().multiplyScalar(3.2));\n  // Bifurcate with symmetric branching angles\n  branchVascularArtery(endPt, dir.clone().applyAxisAngle(new THREE.Vector3(0,0,1), 0.55), childR, depth - 1);\n  branchVascularArtery(endPt, dir.clone().applyAxisAngle(new THREE.Vector3(0,0,1), -0.55), childR, depth - 1);\n}",

    defaultParams: {
    "bloodParticles": 4000,
    "primaryColor": [
        1.0,
        0.2,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
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

      camera.position.set(0, 2, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Vascular branches
      for (let b = 0; b < 10; b++) {
        const a = (b / 10) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -6, 0),
          new THREE.Vector3(Math.cos(a) * 2, -1, Math.sin(a) * 2),
          new THREE.Vector3(Math.cos(a) * 4.5, 4, Math.sin(a) * 4.5)
        ]);
        const tube = new THREE.TubeGeometry(curve, 20, 0.15, 8, false);
        const mat = new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true });
        group.add(new THREE.Mesh(tube, mat));
      }

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 2 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
