// visualizers/chiral_photonic_metamaterial.js
// Chiral Photonic Metamaterial Negative Index Light Bending
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chiral_photonic_metamaterial = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chiral_photonic_metamaterial",
    title: "Chiral Photonic Metamaterial Negative Index Light Bending",
    fileName: "chiral_metamaterial.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udd2e Artificial electromagnetic chiral metamaterial helices reversing Snell's law with negative refractive index in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #metamaterials #optics #physics #negativeindex #quantum #creativecoding #javascript #reels",
    
    displayCode: "// Negative Refractive Index Dispersion Relation\nfunction negativeIndexDrude(omega, omega_p) {\n  const epsilon = 1.0 - (omega_p * omega_p) / (omega * omega);\n  const mu = 1.0 - (omega_p * omega_p) / (omega * omega);\n  const n = (epsilon < 0 && mu < 0) ? -Math.sqrt(epsilon * mu) : Math.sqrt(epsilon * mu);\n  return { epsilon, mu, n };\n}",

    defaultParams: {
    "primaryColor": [
        0.1,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.65
    ],
    "helixCount": 16
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

      const count = params.helixCount;
      const helices = [];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const rad = 4.5;
        const pts = [];
        for (let t = -6; t <= 6; t += 0.15) {
          const hx = Math.cos(t * 2.5) * 0.9;
          const hy = t * 1.0;
          const hz = Math.sin(t * 2.5) * 0.9;
          pts.push(new THREE.Vector3(hx, hy, hz));
        }
        const hGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const col = (i % 2 === 0 ? c1 : c2);
        const hMat = new THREE.LineBasicMaterial({ color: col, linewidth: 2 });
        const helix = new THREE.Line(hGeo, hMat);
        helix.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
        group.add(helix);
        helices.push(helix);
      }

      scene.userData = { group, helices, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.helices.forEach((h, idx) => {
        h.rotation.y = t * 1.2 + idx * 0.2;
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
