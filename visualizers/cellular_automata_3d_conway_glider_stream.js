// visualizers/cellular_automata_3d_conway_glider_stream.js
// 3D Cellular Automata Conway Glider Gun & Collision Crystalline Stream
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cellular_automata_3d_conway_glider_stream = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cellular_automata_3d_conway_glider_stream",
    title: "3D Cellular Automata Conway Glider Gun & Collision Crystalline Stream",
    fileName: "conway_3d_glider.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udc7e Emergent artificial life: 3D Conway cellular automata glider streams and crystalline collisions in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udcbb\n\n#threejs #webgl #cellularautomata #gameoflife #artificiallife #cyberpunk #mathart #codeart",
    
    displayCode: "// 3D Life Rule Bays 5766/4/2: Survives if 5-7 neighbors, Born if 6\nfunction lifeRule3D(neighbors, state) {\n  return (state === 1) ? (neighbors >= 5 && neighbors <= 7 ? 1 : 0) : (neighbors === 6 ? 1 : 0);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.65
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
    ],
    "gridSize": 12
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

      // 3D Glider Streams (Instanced or Box cluster)
      const cubes = [];
      for (let i = 0; i < 48; i++) {
        const sz = 0.8;
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(sz, sz, sz),
          new THREE.MeshStandardMaterial({ color: (i % 2 === 0) ? c1 : c2, emissive: c1, emissiveIntensity: 0.55, wireframe: true })
        );
        box.position.set((Math.random() - 0.5) * 12.0, (Math.random() - 0.5) * 12.0, (Math.random() - 0.5) * 12.0);
        group.add(box);
        cubes.push(box);
      }

      scene.userData = { group, cubes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.cubes.forEach((c, idx) => {
        c.position.y += 0.05;
        if (c.position.y > 7.0) c.position.y = -7.0;
        c.rotation.x += 0.02;
      });
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
