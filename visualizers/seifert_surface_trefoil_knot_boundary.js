// visualizers/seifert_surface_trefoil_knot_boundary.js
// Orientable Genus-1 Seifert Surface & Trefoil Knot Boundary
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.seifert_surface_trefoil_knot_boundary = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "seifert_surface_trefoil_knot_boundary",
    title: "Orientable Genus-1 Seifert Surface & Trefoil Knot Boundary",
    fileName: "seifert_trefoil.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83e\udea2 Orientable genus-1 Seifert surface bounded by an intricate mathematical (2,3) trefoil knot in Three.js! Follow @kreggsjs for daily reels! \ud83d\udcd0\u2728\n\n#threejs #webgl #knottrajectory #topology #seifert #mathart #codeart #geometry",
    
    displayCode: "// Seifert Surface Algorithm for Trefoil Knot Boundary\nfunction trefoilBoundary(t) {\n  const x = Math.sin(t) + 2.0 * Math.sin(2.0 * t);\n  const y = Math.cos(t) - 2.0 * Math.cos(2.0 * t);\n  const z = -Math.sin(3.0 * t);\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.35,
        0.55
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "scale": 2.2
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

      // 1. Trefoil Knot Curve Tube
      class TrefoilCurve extends THREE.Curve {
        getPoint(t) {
          const theta = t * Math.PI * 2;
          const x = (Math.sin(theta) + 2.0 * Math.sin(2.0 * theta)) * 2.2;
          const y = (Math.cos(theta) - 2.0 * Math.cos(2.0 * theta)) * 2.2;
          const z = (-Math.sin(3.0 * theta)) * 2.2;
          return new THREE.Vector3(x, y, z);
        }
      }

      const tubeGeo = new THREE.TubeGeometry(new TrefoilCurve(), 180, 0.22, 16, true);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);

      // 2. Seifert Membrane Ribbon (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random();
        const kX = (Math.sin(u) + 2.0 * Math.sin(2.0 * u)) * 2.2;
        const kY = (Math.cos(u) - 2.0 * Math.cos(2.0 * u)) * 2.2;
        const kZ = (-Math.sin(3.0 * u)) * 2.2;

        pPos[i * 3] = kX * v;
        pPos[i * 3 + 1] = kY * v;
        pPos[i * 3 + 2] = kZ * v;

        const col = c1.clone().lerp(c2, v);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const membrane = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(membrane);

      scene.userData = { group, tube, membrane, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.55;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
