// visualizers/hyperbolic_paraboloid_saddle.js
// Doubly Ruled Hyperbolic Paraboloid Saddle Lattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hyperbolic_paraboloid_saddle = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hyperbolic_paraboloid_saddle",
    title: "Doubly Ruled Hyperbolic Paraboloid Saddle Lattice",
    fileName: "hyperbolic_paraboloid.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 The architectural doubly ruled hyperbolic paraboloid saddle surface weaving straight lines into curves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udfdb\ufe0f\n\n#threejs #webgl #hyperbolicparaboloid #ruledsurface #geometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Doubly Ruled Hyperbolic Paraboloid\nfunction hyperbolicSaddle(x, y, a = 3.5, b = 3.5) {\n  // z = (x^2 / a^2) - (y^2 / b^2)\n  const z = (x * x) / (a * a) - (y * y) / (b * b);\n  return new THREE.Vector3(x, z * 2.5, y);\n}",

    defaultParams: {
    "primaryColor": [
        0.1,
        0.95,
        0.75
    ],
    "secondaryColor": [
        1.0,
        0.2,
        0.5
    ],
    "lineDensity": 36
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

      const n = params.lineDensity;
      const lines = new THREE.Group();
      group.add(lines);

      for (let i = 0; i <= n; i++) {
        const u = -4.5 + (i / n) * 9.0;
        // Family 1 straight ruling lines
        const pts1 = [
          new THREE.Vector3(u, (u*u - 20) * 0.2, -4.5),
          new THREE.Vector3(u, (u*u - 20) * 0.2, 4.5)
        ];
        const g1 = new THREE.BufferGeometry().setFromPoints(pts1);
        lines.add(new THREE.Line(g1, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.6 })));

        // Family 2 straight ruling lines
        const pts2 = [
          new THREE.Vector3(-4.5, (20 - u*u) * 0.2, u),
          new THREE.Vector3(4.5, (20 - u*u) * 0.2, u)
        ];
        const g2 = new THREE.BufferGeometry().setFromPoints(pts2);
        lines.add(new THREE.Line(g2, new THREE.LineBasicMaterial({ color: c2, transparent: true, opacity: 0.6 })));
      }

      scene.userData = { group, lines, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.35;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
