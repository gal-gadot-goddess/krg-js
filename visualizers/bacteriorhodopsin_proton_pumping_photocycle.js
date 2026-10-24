// visualizers/bacteriorhodopsin_proton_pumping_photocycle.js
// Bacteriorhodopsin Retinal Photoisomerization Proton Pump
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bacteriorhodopsin_proton_pumping_photocycle = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bacteriorhodopsin_proton_pumping_photocycle",
    title: "Bacteriorhodopsin Retinal Photoisomerization Proton Pump",
    fileName: "bacteriorhodopsin_pump.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\u2600\ufe0f Solar light-driven proton pumping: Bacteriorhodopsin all-trans to 13-cis retinal photoisomerization photocycle in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u26a1\n\n#threejs #webgl #bacteriorhodopsin #biophysics #retinal #protonpump #codeart",
    
    displayCode: "// Retinal 13-cis Photoisomerization Photocycle Lifetime (tau ~ 200 fs)\nfunction photocycleTransition(state) {\n  // BR -> K -> L -> M1 -> M2 -> N -> O -> BR\n  return ['K', 'L', 'M', 'N', 'O'][state % 5];\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.4,
        0.85
    ],
    "secondaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "helixCount": 7
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

      // 7 Transmembrane Alpha-Helices (7TM Barrel)
      for (let i = 0; i < 7; i++) {
        const theta = (i / 7) * Math.PI * 2;
        const h = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 7.5, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.55 })
        );
        h.position.set(Math.cos(theta) * 3.4, 0, Math.sin(theta) * 3.4);
        group.add(h);
      }

      // Translocating Protons (H+) (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const y = -5.0 + (i / pCount) * 10.0;
        pPos[i * 3] = (Math.random() - 0.5) * 1.2;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
