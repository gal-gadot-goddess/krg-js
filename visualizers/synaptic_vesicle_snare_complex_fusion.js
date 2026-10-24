// visualizers/synaptic_vesicle_snare_complex_fusion.js
// SNARE Complex Four-Helix Zippering & Vesicle Fusion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.synaptic_vesicle_snare_complex_fusion = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "synaptic_vesicle_snare_complex_fusion",
    title: "SNARE Complex Four-Helix Zippering & Vesicle Fusion",
    fileName: "snare_fusion.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\u26a1 Synaptic vesicle neurotransmitter release: SNARE four-helix bundle mechanical zippering and membrane fusion pore opening in Three.js! Follow @kreggsjs! \ud83e\udde0\ud83d\udd2c\n\n#threejs #webgl #neuroscience #snare #synapse #biophysics #molecularbiology #codeart",
    
    displayCode: "// SNARE Complex 4-Helix Bundle Zippering Free Energy\nfunction snareZipperingEnergy(z_progress) {\n  // Delta G ~ 35 k_B * T zippering from N to C terminal\n  return 35.0 * Math.pow(z_progress, 1.5);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.55
    ],
    "helixLength": 8.5
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

      // Synaptic Vesicle Sphere
      const vGeo = new THREE.SphereGeometry(3.5, 32, 32);
      const vMat = new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true });
      const vesicle = new THREE.Mesh(vGeo, vMat);
      vesicle.position.y = 5.5;
      group.add(vesicle);

      // Presynaptic Membrane Plane
      const mGeo = new THREE.PlaneGeometry(16.0, 16.0, 24, 24);
      const mMat = new THREE.MeshBasicMaterial({ color: c2, wireframe: true, transparent: true, opacity: 0.45 });
      const membrane = new THREE.Mesh(mGeo, mMat);
      membrane.rotation.x = -Math.PI / 2;
      membrane.position.y = -2.5;
      group.add(membrane);

      // 4 SNARE Coiled-Coil Helices (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * params.helixLength;
        const coil = (i % 4) * (Math.PI / 2);
        const rad = 0.6 + (1.0 - u / params.helixLength) * 0.9;
        const angle = u * 5.0 + coil;

        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = 5.0 - u;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;

        const col = (i % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const bundle = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(bundle);

      scene.userData = { group, vesicle, bundle, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const zip = Math.sin(t * 2.0) * 0.8;
      data.vesicle.position.y = 5.5 - Math.max(0, zip);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 1.5, 0);

      renderer.render(scene, camera);
    }
  };
});
