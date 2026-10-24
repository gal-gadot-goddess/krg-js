// visualizers/richmond_minimal_family_surface.js
// Richmond Algebraic Minimal Surface & Planar Ends
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.richmond_minimal_family_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "richmond_minimal_family_surface",
    title: "Richmond Algebraic Minimal Surface & Planar Ends",
    fileName: "richmond_minimal.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 Richmond's complete algebraic minimal surface with two planar ends and finite total curvature in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf10\u2728\n\n#threejs #webgl #richmond #minimalsurface #differentialgeometry #mathart #codeart",
    
    displayCode: "// Richmond Minimal Surface Weierstrass Data: f(z) = 1/z^2, g(z) = z^m\nfunction richmond(u, v, m) {\n  // x = Re( -1/z - z^(2m+1)/(2m+1) ), y = Im( ... )\n  return new THREE.Vector3(...);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.95
    ],
    "mOrder": 2
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

      const uRes = 50, vRes = 50;
      const geo = new THREE.BufferGeometry();
      const pos = [];
      const col = [];

      for (let i = 0; i <= uRes; i++) {
        const r = 0.4 + (i / uRes) * 2.2;
        for (let j = 0; j <= vRes; j++) {
          const theta = (j / vRes) * Math.PI * 2;
          const x = (-Math.cos(theta)/r - Math.cos(3*theta) * Math.pow(r, 3)/3.0) * 1.8;
          const y = (2.0 * Math.cos(theta) * r) * 1.8;
          const z = (Math.sin(theta)/r - Math.sin(3*theta) * Math.pow(r, 3)/3.0) * 1.8;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, i / uRes);
          col.push(c.r, c.g, c.b);
        }
      }

      const indices = [];
      for (let i = 0; i < uRes; i++) {
        for (let j = 0; j < vRes; j++) {
          const a = i * (vRes + 1) + j;
          const b = (i + 1) * (vRes + 1) + j;
          const c = (i + 1) * (vRes + 1) + (j + 1);
          const d = i * (vRes + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        emissive: c1,
        emissiveIntensity: 0.65,
        transparent: true,
        opacity: 0.85
      }));
      group.add(mesh);

      scene.userData = { group, mesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.mesh.rotation.y = t * 0.45;
      data.mesh.rotation.x = t * 0.35;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
