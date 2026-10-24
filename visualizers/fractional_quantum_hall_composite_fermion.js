// visualizers/fractional_quantum_hall_composite_fermion.js
// Fractional Quantum Hall Effect & Composite Fermion Anyons
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.fractional_quantum_hall_composite_fermion = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "fractional_quantum_hall_composite_fermion",
    title: "Fractional Quantum Hall Effect & Composite Fermion Anyons",
    fileName: "composite_fermion.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Fractional Quantum Hall Effect: electrons binding magnetic flux vortices to form Composite Fermions with fractional anyonic charge in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #quantumhall #compositefermion #anyons #physics #condensedmatter #codeart",
    
    displayCode: "// Composite Fermion Flux Attachment: Phi* = Phi - 2 * p * Phi_0\nfunction effectiveMagneticField(B, n_e, p) {\n  const phi_0 = 4.135e-15;\n  return B - 2.0 * p * n_e * phi_0;\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.9
    ],
    "vortexFlux": 2
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

      // 24,000 Laughlin state composite vortex particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 1.2 + Math.pow(Math.random(), 0.7) * 9.5;
        const angle = Math.random() * Math.PI * 2;
        const z = (Math.random() - 0.5) * 1.5;

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = z;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = c1.clone().lerp(c2, r / 10.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 2.4 / Math.sqrt(r) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const anyons = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(anyons);

      scene.userData = { group, anyons, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.anyons.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].angle += pData[i].speed * 0.035;
        pos[i * 3] = Math.cos(pData[i].angle) * pData[i].r;
        pos[i * 3 + 2] = Math.sin(pData[i].angle) * pData[i].r;
      }
      data.anyons.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
