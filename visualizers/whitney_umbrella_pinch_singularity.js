// visualizers/whitney_umbrella_pinch_singularity.js
// Whitney Umbrella Pinch-Point Ruled Algebraic Singularity
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.whitney_umbrella_pinch_singularity = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "whitney_umbrella_pinch_singularity",
    title: "Whitney Umbrella Pinch-Point Ruled Algebraic Singularity",
    fileName: "whitney_umbrella.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 The Whitney Umbrella ruled surface: the prototypical pinch point singularity in differential topology in Three.js! Follow @kreggsjs for daily code reels! \ud83c\udf10\u2728\n\n#threejs #webgl #whitneyumbrella #singularity #topology #algebraicgeometry #codeart",
    
    displayCode: "// Whitney Umbrella Ruled Surface: x^2 = y * z^2\nfunction whitneyUmbrella(u, v) {\n  // x = u * v, y = v, z = u\n  return new THREE.Vector3(u * v, v * v, u);\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.3,
        0.4
    ],
    "secondaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "uRange": 2.5
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
        const u = -params.uRange + (i / uRes) * 2.0 * params.uRange;
        for (let j = 0; j <= vRes; j++) {
          const v = -params.uRange + (j / vRes) * 2.0 * params.uRange;
          const x = (u * v) * 1.5;
          const y = (u) * 2.2;
          const z = (v * v) * 1.2 - 3.5;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (u + params.uRange) / (2 * params.uRange));
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
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
