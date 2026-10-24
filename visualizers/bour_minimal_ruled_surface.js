// visualizers/bour_minimal_ruled_surface.js
// Bour's Minimal Surface with 8-Fold Petal Symmetries
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bour_minimal_ruled_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bour_minimal_ruled_surface",
    title: "Bour's Minimal Surface with 8-Fold Petal Symmetries",
    fileName: "bour_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf38 Edmond Bour's classical minimal surface exhibiting twisting eight-fold petal harmonics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #boursurface #minimalsurface #geometry #sacredgeometry #creativecoding #javascript #reels",
    
    displayCode: "// Bour's Minimal Surface Parametrization\nfunction bourSurface(u, v, m = 4) {\n  const r = Math.pow(u, m - 1);\n  const x = u * Math.cos(v) - (r / (2*m - 1)) * Math.cos((2*m - 1) * v);\n  const y = u * Math.sin(v) + (r / (2*m - 1)) * Math.sin((2*m - 1) * v);\n  const z = (2 * Math.pow(u, m) / m) * Math.cos(m * v);\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "primaryColor": [
        0.85,
        0.25,
        1.0
    ],
    "secondaryColor": [
        0.15,
        0.9,
        0.95
    ],
    "radSteps": 42
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
      const n = params.radSteps;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = 0.1 + (i / n) * 1.5;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI * 2;
          const m = 3;
          const r = Math.pow(u, m - 1);
          const x = (u * Math.cos(v) - (r / (2*m - 1)) * Math.cos((2*m - 1) * v)) * 3.5;
          const y = (u * Math.sin(v) + (r / (2*m - 1)) * Math.sin((2*m - 1) * v)) * 3.5;
          const z = ((2 * Math.pow(u, m) / m) * Math.cos(m * v)) * 3.0;
          pts.push(x, z, y);
        }
      }

      for (let i = 0; i < n; i++) {
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
      const bourMesh = new THREE.Mesh(geo, mat);
      group.add(bourMesh);

      scene.userData = { group, bourMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
