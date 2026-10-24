// visualizers/boy_surface_projective_plane.js
// Boy's Surface 3D Real Projective Plane Embedding
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.boy_surface_projective_plane = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "boy_surface_projective_plane",
    title: "Boy's Surface 3D Real Projective Plane Embedding",
    fileName: "boy_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Werner Boy's non-orientable immersion of the Real Projective Plane with 3-fold tetrahedral symmetry in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #boysurface #topology #projectivegeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Boy's Surface Apery Complex Parametrization\nfunction boySurface(u, v) {\n  const z = new THREE.Vector2(Math.sin(u) * Math.cos(v), Math.cos(u));\n  const d = Math.sqrt(2) * Math.pow(z.y, 3) * Math.sin(3 * v);\n  return { x: d * Math.cos(u), y: d * Math.sin(u), z: z.y * 4.5 };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.7
    ],
    "uDivs": 48
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

      const n = params.uDivs;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI;
          // Apery polynomial immersion approximation
          const d = Math.sqrt(2) * Math.pow(Math.cos(u), 3) * Math.sin(3 * v);
          const x = 4.2 * Math.cos(u) * Math.cos(v) + d * 0.4;
          const y = 4.2 * Math.cos(u) * Math.sin(v) + d * 0.4;
          const z = 4.2 * Math.sin(u) * Math.cos(2 * v);
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
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const boyMesh = new THREE.Mesh(geo, mat);
      group.add(boyMesh);

      scene.userData = { group, boyMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
