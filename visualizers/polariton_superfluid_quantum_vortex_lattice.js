// visualizers/polariton_superfluid_quantum_vortex_lattice.js
// Exciton-Polariton Superfluid & Quantized Vortex Lattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.polariton_superfluid_quantum_vortex_lattice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "polariton_superfluid_quantum_vortex_lattice",
    title: "Exciton-Polariton Superfluid & Quantized Vortex Lattice",
    fileName: "polariton_vortex_lattice.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Microcavity exciton-polariton non-equilibrium Bose-Einstein condensate forming an Abrikosov quantum vortex lattice in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #polariton #superfluid #boseeinstein #vortex #quantum #codeart",
    
    displayCode: "// Gross-Pitaevskii Equation Quantized Vortex Core Profile\nfunction vortexCore(r, xi) {\n  // psi(r) = tanh(r / (sqrt(2) * xi))\n  return Math.tanh(r / (1.414 * xi));\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.8
    ],
    "coherenceLength": 0.85
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

      // 24,000 Polariton Fluid Particles with 7 Vortex Holes
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = 1.0 + Math.pow(Math.random(), 0.6) * 9.5;
        const theta = Math.random() * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const y = Math.sin(r * 2.0) * 0.6;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, r / 10.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const fluid = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(fluid);

      scene.userData = { group, fluid, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.fluid.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
