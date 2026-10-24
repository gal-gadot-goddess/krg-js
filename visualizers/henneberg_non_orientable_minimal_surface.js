// visualizers/henneberg_non_orientable_minimal_surface.js
// Henneberg Non-Orientable Minimal Ruled Möbius Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.henneberg_non_orientable_minimal_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "henneberg_non_orientable_minimal_surface",
    title: "Henneberg Non-Orientable Minimal Ruled Möbius Surface",
    fileName: "henneberg_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 The Henneberg minimal surface: a non-orientable ruled minimal surface containing a M\u00f6bius strip boundary in Three.js! Follow @kreggsjs! \ud83c\udf10\u2728\n\n#threejs #webgl #henneberg #minimalmanifold #geometry #mathart #codeart",
    
    displayCode: "// Henneberg Minimal Surface Parametrization\nfunction henneberg(u, v) {\n  const x = 2*Math.sinh(u)*Math.cos(v) - (2/3)*Math.sinh(3*u)*Math.cos(3*v);\n  const y = 2*Math.sinh(u)*Math.sin(v) + (2/3)*Math.sinh(3*u)*Math.sin(3*v);\n  const z = 2*Math.cosh(2*u)*Math.cos(2*v);\n  return new THREE.Vector3(x, z, y);\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.7
    ],
    "secondaryColor": [
        0.95,
        0.45,
        0.25
    ],
    "uMax": 1.15
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
        const u = -params.uMax + (i / uRes) * 2.0 * params.uMax;
        for (let j = 0; j <= vRes; j++) {
          const v = (j / vRes) * Math.PI;
          const x = (2 * Math.sinh(u) * Math.cos(v) - (2/3) * Math.sinh(3*u) * Math.cos(3*v)) * 1.6;
          const y = (2 * Math.cosh(2*u) * Math.cos(2*v)) * 1.6;
          const z = (2 * Math.sinh(u) * Math.sin(v) + (2/3) * Math.sinh(3*u) * Math.sin(3*v)) * 1.6;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (u + params.uMax) / (2 * params.uMax));
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
      data.mesh.rotation.z = Math.sin(t * 0.25) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
