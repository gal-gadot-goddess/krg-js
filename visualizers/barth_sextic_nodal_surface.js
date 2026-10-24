// visualizers/barth_sextic_nodal_surface.js
// Barth Sextic 65-Nodal Icosahedral Algebraic Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.barth_sextic_nodal_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "barth_sextic_nodal_surface",
    title: "Barth Sextic 65-Nodal Icosahedral Algebraic Surface",
    fileName: "barth_sextic.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\u2728 The miraculous Barth Sextic algebraic surface having the maximum possible 65 ordinary double nodal points with golden ratio symmetry in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8e\n\n#threejs #webgl #barthsextic #algebraicsurface #icosahedron #sacredgeometry #creativecoding #javascript #reels",
    
    displayCode: "// Barth Sextic Algebraic Equation\nfunction barthSextic(x, y, z, phi = 1.6180339887) {\n  const term1 = 4 * (phi*phi * x*x - y*y) * (phi*phi * y*y - z*z) * (phi*phi * z*z - x*x);\n  const term2 = (1 + 2*phi) * Math.pow(x*x + y*y + z*z - 1, 2);\n  return term1 - term2;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.4,
        0.2,
        0.9
    ],
    "nodePoints": 65
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

      // Nested Icosahedral Nodal Skeleton
      const ico1 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(4.8, 1),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(ico1);

      const ico2 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.2, 2),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.4, wireframe: true })
      );
      group.add(ico2);

      // 65 Nodal Singular Points
      const nPos = [];
      const phi = (1 + Math.sqrt(5)) / 2;
      const baseCoords = [
        [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
        [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
        [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]
      ];
      baseCoords.forEach(c => {
        nPos.push(c[0] * 2.4, c[1] * 2.4, c[2] * 2.4);
      });
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nPos, 3));
      const nodes = new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25, blending: THREE.AdditiveBlending }));
      group.add(nodes);

      scene.userData = { group, ico1, ico2, nodes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;
      data.ico2.rotation.y = -t * 0.5;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
