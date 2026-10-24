// visualizers/kuen_pseudospherical_surface.js
// Kuen Surface of Constant Negative Gaussian Curvature
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kuen_pseudospherical_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "kuen_pseudospherical_surface",
    title: "Kuen Surface of Constant Negative Gaussian Curvature",
    fileName: "kuen_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Alfred Kuen's pseudospherical surface with constant negative Gaussian curvature twisting into elegant horns in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #kuensurface #hyperbolic #differentialgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Kuen Surface Soliton Equation Parameterization\nfunction kuenSurface(u, v) {\n  const denom = 1 + u * u * Math.sin(v) * Math.sin(v);\n  const x = 2 * (Math.cos(v) + v * Math.sin(v)) * Math.sin(u) / denom;\n  const y = 2 * (Math.sin(v) - v * Math.cos(v)) * Math.sin(u) / denom;\n  const z = Math.log(Math.tan(u / 2)) + (2 * Math.cos(u)) / denom;\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.75
    ],
    "resolution": 45
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
      const n = params.resolution;
      const pts = [];
      const indices = [];

      for (let i = 1; i < n; i++) {
        const u = 0.1 + (i / n) * (Math.PI - 0.2);
        for (let j = 0; j <= n; j++) {
          const v = -3.5 + (j / n) * 7.0;
          const denom = 1 + u * u * Math.sin(v) * Math.sin(v);
          const x = 2 * (Math.cos(v) + v * Math.sin(v)) * Math.sin(u) / denom;
          const y = 2 * (Math.sin(v) - v * Math.cos(v)) * Math.sin(u) / denom;
          const z = Math.log(Math.tan(u / 2)) + (2 * Math.cos(u)) / denom;
          pts.push(x * 2.2, z * 2.0, y * 2.2);
        }
      }

      for (let i = 0; i < n - 2; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const kuenMesh = new THREE.Mesh(geo, mat);
      group.add(kuenMesh);

      scene.userData = { group, kuenMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
