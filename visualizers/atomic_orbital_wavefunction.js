// visualizers/atomic_orbital_wavefunction.js
// Hydrogen Atomic Orbitals
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.atomic_orbital_wavefunction = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "atomic_orbital_wavefunction",
    title: "Hydrogen Atomic Orbitals",
    fileName: "atomic_orbitals.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u269b\ufe0f Quantum mechanical probability density |psi(n,l,m)|^2 of atomic electron wavefunctions! 3d orbital nodal lobes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u26a1\n\n#threejs #webgl #quantum #atom #physics #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Quantum Spherical Harmonics Y_l^m and Radial Probability\nfunction evaluateAtomicOrbital(r, theta, phi, l = 2, m = 1) {\n  // Associated Legendre Polynomial P_2^1(cos theta) ~ 3 * sin(theta) * cos(theta)\n  const Ylm = Math.sin(theta) * Math.cos(theta) * Math.cos(m * phi);\n  // Hydrogenic radial decay\n  const Rnl = Math.exp(-r / 3.0) * (r * r);\n  return Rnl * Ylm;\n}",

    defaultParams: {
    "particleCount": 9500,
    "orbitalScale": 3.2,
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.65
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

      // Nucleus
      const nucGeo = new THREE.SphereGeometry(0.7, 24, 24);
      const nucMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nucleus = new THREE.Mesh(nucGeo, nucMat);
      group.add(nucleus);

      // Electron Cloud (3d orbital)
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI;
        const ph = Math.random() * Math.PI * 2;
        // 3d orbital lobe probability distribution: ~ sin(2*th)
        const prob = Math.abs(Math.sin(2 * th));
        const r = (1.5 + Math.pow(Math.random(), 0.5) * 5.0) * (0.3 + 0.7 * prob);

        pos[i * 3 + 0] = r * Math.sin(th) * Math.cos(ph);
        pos[i * 3 + 1] = r * Math.cos(th);
        pos[i * 3 + 2] = r * Math.sin(th) * Math.sin(ph);

        const phase = Math.sin(2 * th) > 0 ? 1 : 0;
        col[i * 3 + 0] = phase ? params.primaryColor[0] : params.secondaryColor[0];
        col[i * 3 + 1] = phase ? params.primaryColor[1] : params.secondaryColor[1];
        col[i * 3 + 2] = phase ? params.primaryColor[2] : params.secondaryColor[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const cloud = new THREE.Points(geo, mat);
      group.add(cloud);

      scene.userData = { group, cloud, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
