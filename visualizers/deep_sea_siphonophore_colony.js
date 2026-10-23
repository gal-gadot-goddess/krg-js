// visualizers/deep_sea_siphonophore_colony.js
// Deep-Sea Siphonophore Chain
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.deep_sea_siphonophore_colony = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "deep_sea_siphonophore_colony",
    title: "Deep-Sea Siphonophore Chain",
    fileName: "siphonophore.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83c\udf0a Deep-sea colonial bathypelagic siphonophore chain undulating through the midnight ocean in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83e\udebc\u2728\n\n#threejs #webgl #siphonophore #ocean #deepsea #bioluminescence #nature #creativecoding #javascript #reels",
    
    displayCode: "// Colonial Nectophore Undulation Chain\nfunction calculateSiphonophoreChain(joints = 40, time = 0) {\n  const chainPositions = [];\n  for (let j = 0; j < joints; j++) {\n    const y = (j / joints) * 16 - 8;\n    const waveX = Math.sin(y * 0.4 - time * 3.0) * 1.5;\n    const waveZ = Math.cos(y * 0.4 - time * 3.0) * 1.5;\n    chainPositions.push(new THREE.Vector3(waveX, y, waveZ));\n  }\n  return chainPositions;\n}",

    defaultParams: {
    "chainJoints": 50,
    "primaryColor": [
        0.15,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.95,
        0.35,
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

      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.chainJoints;
      const bells = [];
      for (let i = 0; i < count; i++) {
        const geo = new THREE.SphereGeometry(0.35, 12, 12);
        const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x2dd4bf : 0xf43f5e, wireframe: true });
        const m = new THREE.Mesh(geo, mat);
        group.add(m);
        bells.push(m);
      }

      scene.userData = { group, bells, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.bells.forEach((b, idx) => {
        const y = (idx / data.count) * 16 - 8;
        b.position.y = y;
        b.position.x = Math.sin(y * 0.5 - t * 3.0) * 2.2;
        b.position.z = Math.cos(y * 0.5 - t * 3.0) * 2.2;
      });

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
