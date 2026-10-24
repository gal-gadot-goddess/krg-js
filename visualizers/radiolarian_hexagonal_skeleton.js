// visualizers/radiolarian_hexagonal_skeleton.js
// Deep-Sea Radiolarian Symmetrical Opaline Silica Skeleton
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.radiolarian_hexagonal_skeleton = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "radiolarian_hexagonal_skeleton",
    title: "Deep-Sea Radiolarian Symmetrical Opaline Silica Skeleton",
    fileName: "radiolarian_skeleton.js",
    category: "Organic Physics & Bioluminescence",
    genre: "ambient",
    caption: "\ud83c\udf0a Ernst Haeckel's oceanic deep-sea Radiolarian opaline silica mineral skeleton with icosahedral perforations in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udc8e\u2728\n\n#threejs #webgl #radiolaria #haeckel #microscopy #biomineralization #ocean #creativecoding #javascript #reels",
    
    displayCode: "// Haeckel Radiolarian Geodesic Perforations\nfunction radiolarianShell(theta, phi, spikes = 12) {\n  const r = 4.2 + 1.2 * Math.sin(theta * spikes) * Math.cos(phi * spikes);\n  return r;\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.98,
        1.0
    ],
    "spikes": 12
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
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Perforated Icosahedral Shell
      const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(4.5, 3),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(shell);

      // Radial Silica Spines / Needles
      const spineCount = 42;
      const spines = new THREE.Group();
      group.add(spines);

      for (let i = 0; i < spineCount; i++) {
        const phi = Math.acos(2.0 * Math.random() - 1.0);
        const theta = Math.random() * Math.PI * 2;
        const pts = [
          new THREE.Vector3(4.2 * Math.sin(phi) * Math.cos(theta), 4.2 * Math.cos(phi), 4.2 * Math.sin(phi) * Math.sin(theta)),
          new THREE.Vector3(7.2 * Math.sin(phi) * Math.cos(theta), 7.2 * Math.cos(phi), 7.2 * Math.sin(phi) * Math.sin(theta))
        ];
        const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const spine = new THREE.Line(sGeo, new THREE.LineBasicMaterial({ color: c2, linewidth: 2 }));
        spines.add(spine);
      }

      scene.userData = { group, shell, spines, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
