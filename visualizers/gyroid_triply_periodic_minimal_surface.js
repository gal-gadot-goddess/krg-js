// visualizers/gyroid_triply_periodic_minimal_surface.js
// Schoen Gyroid TPMS Triply Periodic Minimal Labyrinth
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.gyroid_triply_periodic_minimal_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "gyroid_triply_periodic_minimal_surface",
    title: "Schoen Gyroid TPMS Triply Periodic Minimal Labyrinth",
    fileName: "gyroid_tpms.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83c\udf00 Schoen's Gyroid Triply Periodic Minimal Surface (TPMS) weaving an infinitely interconnected labyrinth in Three.js! Follow @kreggsjs for daily reels! \ud83d\udcd0\u2728\n\n#threejs #webgl #gyroid #tpms #minimalsurface #sacredgeometry #mathart #codeart",
    
    displayCode: "// Schoen Gyroid Implicit Nodal Equation\nfunction gyroidImplicit(x, y, z) {\n  // sin(x)*cos(y) + sin(y)*cos(z) + sin(z)*cos(x) = 0\n  return Math.sin(x)*Math.cos(y) + Math.sin(y)*Math.cos(z) + Math.sin(z)*Math.cos(x);\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "secondaryColor": [
        0.25,
        0.95,
        0.85
    ],
    "scale": 1.4
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

      // Gyroid Iso-surface Point Cloud Lattice (24,000 points)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      let idx = 0;

      while (idx < pCount) {
        const x = (Math.random() - 0.5) * 10.0;
        const y = (Math.random() - 0.5) * 10.0;
        const z = (Math.random() - 0.5) * 10.0;
        const val = Math.sin(x) * Math.cos(y) + Math.sin(y) * Math.cos(z) + Math.sin(z) * Math.cos(x);

        if (Math.abs(val) < 0.22) {
          pPos[idx * 3] = x; pPos[idx * 3 + 1] = y; pPos[idx * 3 + 2] = z;
          const col = c1.clone().lerp(c2, (x + 5.0) / 10.0);
          pCol[idx * 3] = col.r; pCol[idx * 3 + 1] = col.g; pCol[idx * 3 + 2] = col.b;
          idx++;
        }
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const gyroid = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(gyroid);

      scene.userData = { group, gyroid, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.gyroid.rotation.x = t * 0.35;
      data.gyroid.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
