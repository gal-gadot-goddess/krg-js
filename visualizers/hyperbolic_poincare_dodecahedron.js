// visualizers/hyperbolic_poincare_dodecahedron.js
// Hyperbolic Poincaré Tessellation
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hyperbolic_poincare_dodecahedron = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hyperbolic_poincare_dodecahedron",
    title: "Hyperbolic Poincaré Tessellation",
    fileName: "hyperbolic_poincare.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Non-Euclidean Hyperbolic geometry: Poincar\u00e9 dodecahedral space tessellation in Three.js WebGL! Curvature of spacetime in 3D! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #hyperbolic #poincare #noneuclidean #geometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Poincar\u00e9 Ball Model Geodesic Curvature\nfunction poincareInversion(p, radius = 5.5) {\n  const normSq = p.x*p.x + p.y*p.y + p.z*p.z;\n  const factor = (radius * radius) / Math.max(0.1, normSq);\n  return new THREE.Vector3(p.x * factor, p.y * factor, p.z * factor);\n}",

    defaultParams: {
    "particleCount": 7500,
    "ballRadius": 5.5,
    "primaryColor": [
        0.3,
        0.95,
        0.7
    ],
    "secondaryColor": [
        0.65,
        0.2,
        0.95
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Outer boundary sphere
      const bGeo = new THREE.SphereGeometry(params.ballRadius, 32, 32);
      const bMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35 });
      const boundary = new THREE.Mesh(bGeo, bMat);
      group.add(boundary);

      // Hyperbolic geodesics (particles)
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = Math.pow(Math.random(), 2.0) * (params.ballRadius * 0.95);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * u;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * u;
        pos[i * 3 + 2] = Math.cos(ph) * u;

        const density = u / params.ballRadius;
        col[i * 3 + 0] = params.primaryColor[0] * (1 - density) + params.secondaryColor[0] * density;
        col[i * 3 + 1] = params.primaryColor[1] * (1 - density) + params.secondaryColor[1] * density;
        col[i * 3 + 2] = params.primaryColor[2] * (1 - density) + params.secondaryColor[2] * density;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, boundary, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
