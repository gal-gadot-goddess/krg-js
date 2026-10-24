// visualizers/ribosome_mrna_translation_polypeptide_chain.js
// Ribosome 70S Translation & Polypeptide Chain Synthesis
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.ribosome_mrna_translation_polypeptide_chain = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "ribosome_mrna_translation_polypeptide_chain",
    title: "Ribosome 70S Translation & Polypeptide Chain Synthesis",
    fileName: "ribosome_translation.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\uddec Molecular factory of life: Ribosome translating messenger RNA strand into a folding polypeptide protein helix in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #ribosome #translation #molecularbiology #dna #biophysics #codeart",
    
    displayCode: "// Ribosomal Peptidyl Transferase Peptide Bond Synthesis\nfunction translateCodon(codon_idx) {\n  const aa_phi = codon_idx * 0.45;\n  const aa_r = 1.2;\n  return new THREE.Vector3(Math.cos(aa_phi) * aa_r, codon_idx * 0.38, Math.sin(aa_phi) * aa_r);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.65
    ],
    "chainLength": 85
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

      // 50S Large Subunit and 30S Small Subunit Mesh Domes
      const s50 = new THREE.Mesh(new THREE.SphereGeometry(3.6, 32, 32), new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true }));
      s50.position.y = 2.4;
      const s30 = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 32), new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.45, wireframe: true }));
      s30.position.y = -2.6;
      group.add(s50); group.add(s30);

      // Growing Polypeptide Alpha Helix (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * 14.0;
        const angle = u * 4.5;
        const rad = 0.9 + Math.sin(u * 1.5) * 0.3;

        pPos[i * 3] = Math.cos(angle) * rad + (Math.random() - 0.5) * 0.3;
        pPos[i * 3 + 1] = 4.5 + u;
        pPos[i * 3 + 2] = Math.sin(angle) * rad + (Math.random() - 0.5) * 0.3;

        const col = c1.clone().lerp(c2, u / 14.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const peptide = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(peptide);

      scene.userData = { group, peptide, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.peptide.rotation.y = t * 0.6;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 3, 0);

      renderer.render(scene, camera);
    }
  };
});
