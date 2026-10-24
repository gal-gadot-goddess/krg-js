// visualizers/morin_sphere_eversion_halfway_corrugation.js
// Morin Halfway Sphere Eversion & Smale's Paradox
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.morin_sphere_eversion_halfway_corrugation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "morin_sphere_eversion_halfway_corrugation",
    title: "Morin Halfway Sphere Eversion & Smale's Paradox",
    fileName: "morin_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83c\udf10 Smale's Paradox: turning a sphere inside-out without tearing or creasing: the central Morin surface in Three.js! Follow @kreggsjs for daily reels! \ud83d\udcd0\u2728\n\n#threejs #webgl #topology #morinsurface #sphereeversion #mathart #geometry #codeart",
    
    displayCode: "// Morin Surface Central Model for Sphere Eversion\nfunction morinSurface(u, v, C) {\n  // Four-fold rotational symmetric immersion\n  const x = Math.cos(u) / (Math.sqrt(2) - C * Math.sin(2*u) * Math.sin(2*v));\n  return new THREE.Vector3(x, ...);\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.4,
        0.8
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "cParam": 0.85
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
        const u = (i / uRes) * Math.PI;
        for (let j = 0; j <= vRes; j++) {
          const v = (j / vRes) * Math.PI * 2;
          const denom = Math.sqrt(2) - params.cParam * Math.sin(2*u) * Math.sin(2*v);
          const x = (Math.cos(u) / denom) * 4.5;
          const y = (Math.sin(u) * Math.cos(v) / denom) * 4.5;
          const z = (Math.sin(u) * Math.sin(v) / denom) * 4.5;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, u / Math.PI);
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

      data.mesh.rotation.x = t * 0.4;
      data.mesh.rotation.y = t * 0.55;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
