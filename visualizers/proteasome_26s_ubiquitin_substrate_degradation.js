// visualizers/proteasome_26s_ubiquitin_substrate_degradation.js
// 26S Proteasome AAA+ Motor & Polyubiquitin Degradation
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.proteasome_26s_ubiquitin_substrate_degradation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "proteasome_26s_ubiquitin_substrate_degradation",
    title: "26S Proteasome AAA+ Motor & Polyubiquitin Degradation",
    fileName: "proteasome_26s.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\uddec Cellular recycling machine: 26S Proteasome AAA+ unfoldase threading ubiquitinated substrates into the 20S catalytic barrel in Three.js! Follow @kreggsjs! \ud83d\udd2c\u26a1\n\n#threejs #webgl #proteasome #ubiquitin #molecularbiology #biophysics #codeart",
    
    displayCode: "// Proteasomal ATP-Dependent Translocation Rate\nfunction translocationVelocity(k_cat, step_size) {\n  // v = k_cat * 2 amino acids / ATP\n  return k_cat * step_size;\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.5
    ],
    "barrelHeight": 8.5
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

      // 20S Proteolytic Barrel (4 stacked rings)
      for (let i = -1.5; i <= 1.5; i += 1.0) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(3.2, 0.45, 16, 48),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5 })
        );
        ring.position.y = i * 2.2;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }

      // Threaded Substrate Peptide (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const y = -6.0 + (i / pCount) * 12.0;
        const angle = y * 6.0;
        const rad = 0.5;
        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
