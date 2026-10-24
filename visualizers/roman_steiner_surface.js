// visualizers/roman_steiner_surface.js
// Steiner's Roman Surface & Tetrahedral Cross-Caps
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.roman_steiner_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "roman_steiner_surface",
    title: "Steiner's Roman Surface & Tetrahedral Cross-Caps",
    fileName: "steiner_roman.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 Jakob Steiner's legendary Roman Surface with 4 tetrahedral cross-caps and triple self-intersections in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #romansurface #steiner #projectivegeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Steiner Roman Surface Parametrization\nfunction steinerRoman(u, v, r = 5.2) {\n  const x = r * Math.sin(2 * u) * Math.cos(v) * Math.cos(v);\n  const y = r * Math.sin(u) * Math.sin(2 * v);\n  const z = r * Math.cos(u) * Math.sin(2 * v);\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.25,
        0.55
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "gridResolution": 44
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

      const n = params.gridResolution;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI;
          const r = 5.0;
          const x = r * Math.sin(2 * u) * Math.cos(v) * Math.cos(v);
          const y = r * Math.sin(u) * Math.sin(2 * v);
          const z = r * Math.cos(u) * Math.sin(2 * v);
          pts.push(x, y, z);
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
        color: c1, emissive: c1, emissiveIntensity: 0.4, wireframe: true, side: THREE.DoubleSide
      });
      const romanMesh = new THREE.Mesh(geo, mat);
      group.add(romanMesh);

      scene.userData = { group, romanMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.4;
      data.group.rotation.z = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
