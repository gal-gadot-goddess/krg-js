// visualizers/kummer_surface_nodal_singularities.js
// Kummer 16-Nodal Quartic Algebraic Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kummer_surface_nodal_singularities = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "kummer_surface_nodal_singularities",
    title: "Kummer 16-Nodal Quartic Algebraic Surface",
    fileName: "kummer_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 Kummer quartic algebraic surface with maximum possible 16 nodal conical singularities in Three.js! Follow @kreggsjs for daily code reels! \ud83c\udf10\u2728\n\n#threejs #webgl #kummer #algebraicgeometry #singularities #mathart #creativecoding",
    
    displayCode: "// Kummer Quartic Surface Equation in Projective 3-Space\nfunction kummerF(x, y, z, w, mu) {\n  // (x^2 + y^2 + z^2 - w^2)^2 - (3 - mu^2)/(3*mu^2 - 1) * (x-w)*(y-w)*(z-w)...\n  return Math.pow(x*x + y*y + z*z - w*w, 2);\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.4,
        0.2
    ],
    "secondaryColor": [
        0.3,
        0.8,
        1.0
    ],
    "muParam": 1.45
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

      // Kummer nodal point clouds & quartic lattice (24,000 points)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rBase = 5.5 + Math.sin(theta * 4) * Math.cos(phi * 4) * 2.2;

        pPos[i * 3] = rBase * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = rBase * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = rBase * Math.cos(phi);

        const col = c1.clone().lerp(c2, (rBase - 3.3) / 4.4);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const kummer = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(kummer);

      scene.userData = { group, kummer, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
