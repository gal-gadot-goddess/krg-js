// visualizers/coral_reef_cellular_automata.js
// Bioluminescent Coral Reef Growth
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.coral_reef_cellular_automata = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "coral_reef_cellular_automata",
    title: "Bioluminescent Coral Reef Growth",
    fileName: "coral_growth.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83e\udeb8 Organic differential growth & calcified branching coral polyps glowing in the deep ocean abyss in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0a\u2728\n\n#threejs #webgl #coral #ocean #bioluminescence #nature #creativecoding #javascript #reels",
    
    displayCode: "// Differential Laplacian Coral Branching\nfunction growCoralPolypBranch(depth = 4, length = 3.5) {\n  const branchGeo = new THREE.CylinderGeometry(0.12, 0.25, length, 8);\n  // Recursive bifurcation\n  if (depth > 0) {\n    const leftBranch = growCoralPolypBranch(depth - 1, length * 0.75);\n    leftBranch.rotation.z = 0.45;\n  }\n}",

    defaultParams: {
    "branchLevels": 5,
    "primaryColor": [
        0.95,
        0.4,
        0.6
    ],
    "secondaryColor": [
        0.2,
        0.9,
        0.85
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

      // Branching coral tree
      for (let b = 0; b < 12; b++) {
        const a = (b / 12) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -6, 0),
          new THREE.Vector3(Math.cos(a) * 2, -2, Math.sin(a) * 2),
          new THREE.Vector3(Math.cos(a) * 5, 4, Math.sin(a) * 5)
        ]);
        const tube = new THREE.TubeGeometry(curve, 24, 0.18, 8, false);
        const mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
        group.add(new THREE.Mesh(tube, mat));
      }

      // Spores
      const sCount = 3000;
      const sPos = new Float32Array(sCount * 3);
      for (let s = 0; s < sCount; s++) {
        sPos[s * 3 + 0] = (Math.random() - 0.5) * 14;
        sPos[s * 3 + 1] = (Math.random() - 0.5) * 14;
        sPos[s * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({ size: 0.12, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const spores = new THREE.Points(sGeo, sMat);
      group.add(spores);

      scene.userData = { group, spores, params };
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
