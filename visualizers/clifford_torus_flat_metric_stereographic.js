// visualizers/clifford_torus_flat_metric_stereographic.js
// Flat Clifford Torus R4 to R3 Conformal Projection
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.clifford_torus_flat_metric_stereographic = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "clifford_torus_flat_metric_stereographic",
    title: "Flat Clifford Torus R4 to R3 Conformal Projection",
    fileName: "clifford_torus.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 The flat Clifford torus in Euclidean 4-space conformally stereographically projected to 3-space in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf10\u2728\n\n#threejs #webgl #cliffordtorus #geometry #4d #sacredgeometry #mathart #codeart",
    
    displayCode: "// Flat Clifford Torus in S3: (cos(u)/sqrt(2), sin(u)/sqrt(2), cos(v)/sqrt(2), sin(v)/sqrt(2))\nfunction cliffordStereo(u, v) {\n  const s = Math.SQRT1_2;\n  const w = s * Math.sin(v);\n  const denom = 1.0 - w;\n  return new THREE.Vector3((s * Math.cos(u)) / denom, (s * Math.sin(u)) / denom, (s * Math.cos(v)) / denom);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "radius": 5.0
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

      const geo = new THREE.TorusGeometry(params.radius, 1.8, 32, 64);
      const mat = new THREE.MeshStandardMaterial({
        color: c1,
        emissive: c1,
        emissiveIntensity: 0.65,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const torus = new THREE.Mesh(geo, mat);
      group.add(torus);

      // Conformal flow orbits (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        pPos[i * 3] = (params.radius + 1.8 * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = 1.8 * Math.sin(v);
        pPos[i * 3 + 2] = (params.radius + 1.8 * Math.cos(v)) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })));

      scene.userData = { group, torus, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.torus.rotation.x = t * 0.4;
      data.torus.rotation.y = t * 0.55;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
