// visualizers/crispr_cas9_rloop_unwinding.js
// CRISPR-Cas9 Endonuclease DNA Unwinding & Cleavage
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.crispr_cas9_rloop_unwinding = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "crispr_cas9_rloop_unwinding",
    title: "CRISPR-Cas9 Endonuclease DNA Unwinding & Cleavage",
    fileName: "crispr_cas9.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\u2702\ufe0f The molecular gene-editing scissors! CRISPR-Cas9 enzyme unwinding double-stranded DNA target sequences in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83e\uddec\u2728\n\n#threejs #webgl #crispr #cas9 #geneediting #genetics #biotechnology #creativecoding #javascript #reels",
    
    displayCode: "// CRISPR Target PAM Site DNA Cleavage\nfunction cas9Cleavage(targetMatchScore, PAM = 'NGG') {\n  const isMatched = targetMatchScore > 0.95;\n  const doubleStrandBreak = isMatched && PAM.endsWith('GG');\n  return { doubleStrandBreak };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.2
    ],
    "helixLength": 40
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

      // Cas9 Enzyme Protein Lobes (REC + NUC)
      const cas9Lobe1 = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true })
      );
      cas9Lobe1.position.x = -1.5;
      group.add(cas9Lobe1);

      const cas9Lobe2 = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
      );
      cas9Lobe2.position.x = 1.5;
      group.add(cas9Lobe2);

      // Target DNA Strands Passing Through Catalytic Center
      const pts1 = [], pts2 = [];
      for (let z = -7; z <= 7; z += 0.2) {
        // Unwinding bubble near z = 0
        const bubble = Math.exp(-z * z * 0.5) * 1.5;
        pts1.push(new THREE.Vector3(Math.cos(z * 1.2) * (1.0 + bubble), Math.sin(z * 1.2) * (1.0 + bubble), z));
        pts2.push(new THREE.Vector3(Math.cos(z * 1.2 + Math.PI) * (1.0 + bubble), Math.sin(z * 1.2 + Math.PI) * (1.0 + bubble), z));
      }
      const s1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), new THREE.LineBasicMaterial({ color: c1, linewidth: 2 }));
      const s2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), new THREE.LineBasicMaterial({ color: c2, linewidth: 2 }));
      group.add(s1);
      group.add(s2);

      scene.userData = { group, cas9Lobe1, cas9Lobe2, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
