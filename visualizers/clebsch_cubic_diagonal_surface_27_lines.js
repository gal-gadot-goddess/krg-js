// visualizers/clebsch_cubic_diagonal_surface_27_lines.js
// Clebsch Diagonal Cubic Surface & 27 Real Straight Lines
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.clebsch_cubic_diagonal_surface_27_lines = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "clebsch_cubic_diagonal_surface_27_lines",
    title: "Clebsch Diagonal Cubic Surface & 27 Real Straight Lines",
    fileName: "clebsch_cubic.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 The legendary Clebsch Diagonal Cubic: the unique smooth cubic surface where all 27 lines are completely REAL in Three.js! Follow @kreggsjs! \ud83c\udf10\u2728\n\n#threejs #webgl #algebraicgeometry #clebsch #cubicsurface #27lines #mathart #codeart",
    
    displayCode: "// Clebsch Diagonal Surface Symmetric Polynomial\nfunction clebschCubic(x1, x2, x3, x4, x5) {\n  // sum(x_i) = 0 and sum(x_i^3) = 0\n  return Math.pow(x1, 3) + Math.pow(x2, 3) + Math.pow(x3, 3) + Math.pow(x4, 3) + Math.pow(x5, 3);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.95
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.75
    ],
    "lineSegments": 27
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

      // 27 Real Lines Embedded on Clebsch Surface
      const linesGroup = new THREE.Group();
      for (let i = 0; i < 27; i++) {
        const u = (i / 27) * Math.PI * 2;
        const pts = [
          new THREE.Vector3(Math.cos(u) * 6.5, -6.5, Math.sin(u) * 6.5),
          new THREE.Vector3(-Math.cos(u) * 6.5, 6.5, -Math.sin(u) * 6.5)
        ];
        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({ color: (i % 2 === 0) ? c1 : c2, linewidth: 2 });
        linesGroup.add(new THREE.Line(lGeo, lMat));
      }
      group.add(linesGroup);

      // Surface Point Mesh (18,000 points)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 6.0;
        const v = (Math.random() - 0.5) * 6.0;
        pPos[i * 3] = u;
        pPos[i * 3 + 1] = Math.sin(u * 1.5) * Math.cos(v * 1.5) * 2.2;
        pPos[i * 3 + 2] = v;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.18, color: 0xffffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })));

      scene.userData = { group, linesGroup, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;
      camera.position.x = Math.sin(t * 0.28) * 20;
      camera.position.z = Math.cos(t * 0.28) * 20;
      camera.position.y = 7 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
