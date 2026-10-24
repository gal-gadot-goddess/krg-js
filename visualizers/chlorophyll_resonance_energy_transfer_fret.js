// visualizers/chlorophyll_resonance_energy_transfer_fret.js
// Photosystem II Chlorophyll Förster Resonance Energy Transfer
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chlorophyll_resonance_energy_transfer_fret = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chlorophyll_resonance_energy_transfer_fret",
    title: "Photosystem II Chlorophyll Förster Resonance Energy Transfer",
    fileName: "chlorophyll_fret.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83c\udf3f Quantum coherence in photosynthesis: solar exciton dipole-dipole FRET hopping across LHCII chlorophyll networks in Three.js! Follow @kreggsjs for daily reels! \u2600\ufe0f\u2728\n\n#threejs #webgl #photosynthesis #quantumbiology #fret #chlorophyll #biophysics #codeart",
    
    displayCode: "// F\u00f6rster Resonance Energy Transfer (FRET) 1/R^6 Efficiency\nfunction fretEfficiency(r, R0) {\n  // E_FRET = R0^6 / (R0^6 + r^6)\n  return Math.pow(R0, 6) / (Math.pow(R0, 6) + Math.pow(r, 6));\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.45
    ],
    "secondaryColor": [
        0.95,
        0.9,
        0.25
    ],
    "pigmentCount": 36
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

      // LHCII Trimeric Ring Chlorophyll Pigments
      for (let i = 0; i < params.pigmentCount; i++) {
        const theta = (i / params.pigmentCount) * Math.PI * 2;
        const r = 5.2 + Math.sin(theta * 3.0) * 1.5;
        const porphyrin = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.8, 0.1),
          new THREE.MeshStandardMaterial({ color: (i % 2 === 0) ? c1 : c2, emissive: c1, emissiveIntensity: 0.6 })
        );
        porphyrin.position.set(Math.cos(theta) * r, (Math.random() - 0.5) * 2.0, Math.sin(theta) * r);
        group.add(porphyrin);
      }

      // 18,000 Exciton Delocalization Energy Wave Particles
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const rad = 4.0 + Math.random() * 3.5;
        pPos[i * 3] = Math.cos(th) * rad;
        pPos[i * 3 + 1] = Math.sin(th * 6.0) * 0.8;
        pPos[i * 3 + 2] = Math.sin(th) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const exciton = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(exciton);

      scene.userData = { group, exciton, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.exciton.rotation.y = t * 1.2;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 7 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
