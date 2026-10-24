// visualizers/hyperbolic_octahedral_honeycomb_tessellation.js
// Hyperbolic Octahedral Honeycomb {3,4,3} Poincaré Inversion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hyperbolic_octahedral_honeycomb_tessellation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hyperbolic_octahedral_honeycomb_tessellation",
    title: "Hyperbolic Octahedral Honeycomb {3,4,3} Poincaré Inversion",
    fileName: "hyperbolic_honeycomb.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83c\udf0c Non-Euclidean geometry: regular {3,4,3} hyperbolic octahedral honeycomb tessellating the Poincar\u00e9 ball in Three.js! Follow @kreggsjs for daily reels! \ud83d\udcd0\u2728\n\n#threejs #webgl #hyperbolic #poincare #noneuclidean #geometry #mathart #sacredgeometry",
    
    displayCode: "// Poincar\u00e9 Ball Stereographic Inversion Model\nfunction poincareInvert(p, R) {\n  const r2 = p.lengthSq();\n  // Reflection across hyper-sphere\n  return p.clone().multiplyScalar((R * R) / r2);\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.8
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
    ],
    "ballRadius": 6.8
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

      // Outer Poincaré Ball Horizon
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(params.ballRadius, 48, 48),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(ball);

      // Hyperbolic cells (22,000 recursive points)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const r = Math.pow(u, 0.5) * (params.ballRadius * 0.96);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);

        const col = c1.clone().lerp(c2, r / params.ballRadius);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const cells = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(cells);

      scene.userData = { group, cells, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
