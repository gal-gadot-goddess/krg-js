// visualizers/topological_insulator_dirac_cone_spin_helical.js
// Topological Insulator Dirac Cone & Spin-Momentum Locking
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.topological_insulator_dirac_cone_spin_helical = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "topological_insulator_dirac_cone_spin_helical",
    title: "Topological Insulator Dirac Cone & Spin-Momentum Locking",
    fileName: "dirac_cone_ti.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Relativistic massless Dirac fermions with spin-momentum locking on topological insulator surface states in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u26a1\n\n#threejs #webgl #topologicalinsulator #diraccone #quantum #spintronics #codeart",
    
    displayCode: "// Surface State Dirac Hamiltonian: H = v_F * (sigma x k)_z\nfunction diracEnergy(kx, ky, v_F) {\n  // E_pm = pm hbar * v_F * sqrt(kx^2 + ky^2)\n  return v_F * Math.sqrt(kx*kx + ky*ky);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.45
    ],
    "kMax": 5.5
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

      // Dual Upper and Lower Dirac Cones
      const coneGeo = new THREE.ConeGeometry(5.2, 7.5, 32, 1, true);
      const coneUpper = new THREE.Mesh(coneGeo, new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.55 }));
      coneUpper.position.y = 3.75;
      const coneLower = new THREE.Mesh(coneGeo, new THREE.MeshBasicMaterial({ color: c2, wireframe: true, transparent: true, opacity: 0.55 }));
      coneLower.position.y = -3.75;
      coneLower.rotation.x = Math.PI;

      group.add(coneUpper); group.add(coneLower);

      // Helical Spin-Momentum Locked Electrons (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const sign = (i % 2 === 0) ? 1 : -1;
        const k = Math.random() * params.kMax;
        const angle = Math.random() * Math.PI * 2;

        pPos[i * 3] = Math.cos(angle) * k;
        pPos[i * 3 + 1] = sign * (k * 1.36);
        pPos[i * 3 + 2] = Math.sin(angle) * k;

        const col = (sign > 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const electrons = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(electrons);

      scene.userData = { group, coneUpper, coneLower, electrons, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.electrons.rotation.y = t * 0.8;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
