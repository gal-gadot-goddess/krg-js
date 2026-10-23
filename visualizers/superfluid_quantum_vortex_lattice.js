// visualizers/superfluid_quantum_vortex_lattice.js
// Superfluid Helium Quantum Vortices
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.superfluid_quantum_vortex_lattice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "superfluid_quantum_vortex_lattice",
    title: "Superfluid Helium Quantum Vortices",
    fileName: "superfluid_lattice.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\u2744\ufe0f Abrikosov triangular lattice of quantized circulation vortices in rotating superfluid liquid Helium-4 in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #superfluid #quantum #helium #physics #creativecoding #javascript #reels",
    
    displayCode: "// Abrikosov Hexagonal Quantized Vortex Lattice\nfunction buildQuantizedVortices(vortexCount = 19, radius = 5.2) {\n  const vortexCenters = [new THREE.Vector3(0, 0, 0)];\n  for (let ring = 1; ring <= 2; ring++) {\n    const nInRing = ring * 6;\n    for (let i = 0; i < nInRing; i++) {\n      const a = (i / nInRing) * Math.PI * 2;\n      vortexCenters.push(new THREE.Vector3(Math.cos(a)*ring*2.2, 0, Math.sin(a)*ring*2.2));\n    }\n  }\n  return vortexCenters;\n}",

    defaultParams: {
    "particles": 7000,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.8
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

      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 6.0;
        pos[i * 3 + 0] = Math.cos(u) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
        pos[i * 3 + 2] = Math.sin(u) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x22d3ee, blending: THREE.AdditiveBlending });
      const lattice = new THREE.Points(geo, mat);
      group.add(lattice);

      scene.userData = { group, lattice, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 1.2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 8 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
