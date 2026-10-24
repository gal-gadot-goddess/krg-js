// visualizers/extracellular_matrix_integrin_talin_focal_adhesion.js
// Integrin Mechanotransduction & Talin Focal Adhesion Complex
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.extracellular_matrix_integrin_talin_focal_adhesion = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "extracellular_matrix_integrin_talin_focal_adhesion",
    title: "Integrin Mechanotransduction & Talin Focal Adhesion Complex",
    fileName: "focal_adhesion.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\u26a1 Cellular mechanobiology: Integrin-talin-actin focal adhesion complex transmitting piconewton extracellular tension in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #mechanobiology #integrin #focaladhesion #biophysics #codeart",
    
    displayCode: "// Talin Mechanosensitive Rod Unfolding under Force\nfunction talinUnfoldingRate(force_pN) {\n  // Bell model: k(F) = k_0 * exp(F * x_dagger / k_B T)\n  return 0.05 * Math.exp(force_pN * 0.18);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.6
    ],
    "force_pN": 12.0
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

      // Extracellular Fibronectin Matrix Mesh Plane
      const eGeo = new THREE.PlaneGeometry(16.0, 16.0, 24, 24);
      const eMat = new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.45 });
      const ecm = new THREE.Mesh(eGeo, eMat);
      ecm.rotation.x = -Math.PI / 2;
      ecm.position.y = -3.5;
      group.add(ecm);

      // Integrin Heterodimer Clustered Heads (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 10.0;
        pPos[i * 3 + 1] = -3.0 + Math.random() * 6.0;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 10.0;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
