// visualizers/enneper_minimal_surface_weierstrass.js
// Enneper Self-Intersecting Minimal Weierstrass Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.enneper_minimal_surface_weierstrass = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "enneper_minimal_surface_weierstrass",
    title: "Enneper Self-Intersecting Minimal Weierstrass Surface",
    fileName: "enneper_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 Enneper's classical self-intersecting minimal surface with zero mean curvature generated via Weierstrass representation in Three.js! Follow @kreggsjs! \ud83c\udf10\u2728\n\n#threejs #webgl #geometry #mathart #differentialgeometry #parametric #creativecoding",
    
    displayCode: "// Enneper Surface Weierstrass-Enneper Parametrization\nfunction enneper(u, v) {\n  const x = u - (u*u*u)/3.0 + u*v*v;\n  const y = v - (v*v*v)/3.0 + v*u*u;\n  const z = u*u - v*v;\n  return new THREE.Vector3(x, z, y);\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.8
    ],
    "uvRange": 1.7
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

      // Enneper Parametric Wireframe Mesh
      const uRes = 60, vRes = 60;
      const geo = new THREE.BufferGeometry();
      const pos = [];
      const col = [];

      for (let i = 0; i <= uRes; i++) {
        const u = -params.uvRange + (i / uRes) * 2.0 * params.uvRange;
        for (let j = 0; j <= vRes; j++) {
          const v = -params.uvRange + (j / vRes) * 2.0 * params.uvRange;
          const x = (u - (u*u*u)/3.0 + u*v*v) * 2.2;
          const y = (u*u - v*v) * 2.2;
          const z = (v - (v*v*v)/3.0 + v*u*u) * 2.2;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (u + params.uvRange) / (2 * params.uvRange));
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

      const mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        emissive: c1,
        emissiveIntensity: 0.65,
        transparent: true,
        opacity: 0.85
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Orbiting geometric halo particles (12,000)
      const pCount = 12000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = 9.0 + Math.random() * 4.0;
        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.18, color: c2, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending })));

      scene.userData = { group, mesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.mesh.rotation.x = t * 0.4;
      data.mesh.rotation.y = t * 0.6;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
