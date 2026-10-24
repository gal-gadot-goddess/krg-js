// visualizers/costa_minimal_surface.js
// Costa's Genus-One Minimal Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.costa_minimal_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "costa_minimal_surface",
    title: "Costa's Genus-One Minimal Surface",
    fileName: "costa_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd2e Costa's revolutionary Genus-1 Triply Periodic Minimal Surface with zero mean curvature in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #costasurface #minimalsurface #sacredgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Weierstrass-Enneper Parametrization of Costa Surface\nfunction costaWeierstrass(u, v) {\n  const x = Math.sinh(u) * Math.sin(v) / (1 + Math.cosh(u) * Math.cos(v));\n  const y = -Math.sinh(u) * Math.cos(v) / (1 + Math.cosh(u) * Math.cos(v));\n  const z = u - (Math.sinh(2*u) / (2 * (Math.cosh(2*u) + Math.cos(2*v))));\n  return new THREE.Vector3(x * 4.0, y * 4.0, z * 2.0);\n}",

    defaultParams: {
    "primaryColor": [
        0.65,
        0.2,
        0.95
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "gridU": 50,
    "gridV": 50
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
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const uSteps = params.gridU, vSteps = params.gridV;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= uSteps; i++) {
        const u = -1.8 + (i / uSteps) * 3.6;
        for (let j = 0; j <= vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          const denom = 1 + Math.cosh(u) * Math.cos(v);
          const safeDenom = Math.abs(denom) < 0.05 ? 0.05 : denom;
          const x = (Math.sinh(u) * Math.sin(v)) / safeDenom;
          const y = (-Math.sinh(u) * Math.cos(v)) / safeDenom;
          const z = u - (Math.sinh(2*u) / (2 * (Math.cosh(2*u) + Math.cos(2*v) + 0.1)));
          pts.push(x * 3.2, z * 2.5, y * 3.2);
        }
      }

      for (let i = 0; i < uSteps; i++) {
        for (let j = 0; j < vSteps; j++) {
          const a = i * (vSteps + 1) + j;
          const b = (i + 1) * (vSteps + 1) + j;
          const c = (i + 1) * (vSteps + 1) + (j + 1);
          const d = i * (vSteps + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.35, wireframe: true, side: THREE.DoubleSide
      });
      const costaMesh = new THREE.Mesh(geo, mat);
      group.add(costaMesh);

      // Orbital ambient particles
      const pCount = 3000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const rad = 5.0 + Math.random() * 6.0;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.random() * Math.PI;
        pPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = rad * Math.cos(ph);
        pPos[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const sparkles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c2, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(sparkles);

      scene.userData = { group, costaMesh, sparkles, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
