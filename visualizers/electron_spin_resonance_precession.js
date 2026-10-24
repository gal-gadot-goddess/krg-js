// visualizers/electron_spin_resonance_precession.js
// Electron Spin Resonance (ESR) Zeeman Larmor Precession
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.electron_spin_resonance_precession = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "electron_spin_resonance_precession",
    title: "Electron Spin Resonance (ESR) Zeeman Larmor Precession",
    fileName: "electron_spin_resonance.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Electron magnetic dipole moment undergoing Zeeman splitting & GHz microwave resonance precession in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #esr #electronspin #quantum #zeeman #resonance #creativecoding #javascript #reels",
    
    displayCode: "// Electron Spin Zeeman Energy Splitting\nfunction zeemanSplitting(B0, g_e = 2.002319) {\n  const mu_B = 9.274e-24; // Bohr magneton\n  const deltaE = g_e * mu_B * B0;\n  const larmorFrequency = (g_e * mu_B * B0) / 6.626e-34;\n  return { deltaE, larmorFrequency };\n}",

    defaultParams: {
    "primaryColor": [
        0.1,
        0.95,
        0.5
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.4
    ],
    "spinPoints": 4000
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

      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Static Magnetic Field Vectors (Vertical Arrows)
      const bFields = new THREE.Group();
      group.add(bFields);
      for (let x = -4; x <= 4; x += 2) {
        for (let z = -4; z <= 4; z += 2) {
          const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, -3, z), 6, 0x334155, 0.6, 0.3);
          bFields.add(arrow);
        }
      }

      // Precessing Electron Wavecloud Points
      const count = params.spinPoints;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const rad = 2.5 * Math.pow(Math.random(), 0.5);
        pos[i * 3] = rad * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = rad * Math.cos(v);
        pos[i * 3 + 2] = rad * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const spinCloud = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(spinCloud);

      scene.userData = { group, spinCloud, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      // Precession around B field axis
      data.spinCloud.rotation.z = Math.sin(t * 3.0) * 0.45;
      data.spinCloud.rotation.y = t * 2.5;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
