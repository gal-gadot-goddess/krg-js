// visualizers/telomerase_ribonucleoprotein_telomere_capping.js
// Telomerase Reverse Transcriptase & TTAGGG Telomere Capping
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.telomerase_ribonucleoprotein_telomere_capping = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "telomerase_ribonucleoprotein_telomere_capping",
    title: "Telomerase Reverse Transcriptase & TTAGGG Telomere Capping",
    fileName: "telomerase_capping.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\uddec Cellular immortality engine: Telomerase ribonucleoprotein complex elongating G-rich TTAGGG telomeric chromosome caps in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #telomeres #telomerase #genetics #biophysics #aging #codeart",
    
    displayCode: "// Telomeric Repeat Extension Kinetics\nfunction telomericRepeat(t_cycles) {\n  const seq = ['T', 'T', 'A', 'G', 'G', 'G'];\n  return seq[t_cycles % 6];\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.45,
        0.85
    ],
    "secondaryColor": [
        0.35,
        0.95,
        0.75
    ],
    "repeats": 24
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

      // TERT Catalytic Ring (Enzyme)
      const tert = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 1.2, 24, 64),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.55, wireframe: true })
      );
      group.add(tert);

      // Telomere Double-Stranded DNA Core (18,000 points)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = -6.0 + (i / pCount) * 12.0;
        const angle = u * 4.5;
        pPos[i * 3] = Math.cos(angle) * 0.8;
        pPos[i * 3 + 1] = u;
        pPos[i * 3 + 2] = Math.sin(angle) * 0.8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, tert, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.tert.rotation.x = t * 0.45;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
