// visualizers/nuclear_pore_complex_fg_nucleoporin_sieve.js
// Nuclear Pore Eight-Fold Complex & FG-Repeat Hydrophobic Sieve
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.nuclear_pore_complex_fg_nucleoporin_sieve = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "nuclear_pore_complex_fg_nucleoporin_sieve",
    title: "Nuclear Pore Eight-Fold Complex & FG-Repeat Hydrophobic Sieve",
    fileName: "nuclear_pore_sieve.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\uddec Gatekeeper of the cell nucleus: 8-fold symmetric Nuclear Pore Complex with entropic FG-repeat nucleoporin hydrogel sieve in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #nuclearcell #biophysics #nanomachines #cellbiology #codeart",
    
    displayCode: "// Nuclear Pore Hydrophobic FG-Repeat Transport Free Energy\nfunction fgTranslocationRate(cargo_size, kap_affinity) {\n  // NuP98/NuP62 mesh barrier: P_pass ~ exp(-Delta F / k_B T)\n  return kap_affinity * Math.exp(-Math.pow(cargo_size / 5.2, 2.0));\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.45,
        0.2
    ],
    "ringRadius": 6.5
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

      // 8-Fold Symmetric Cytoplasmic Ring Spokes
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        const spoke = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 4.2, 16),
          new THREE.MeshBasicMaterial({ color: c1, wireframe: true })
        );
        spoke.position.set(Math.cos(theta) * params.ringRadius, 0, Math.sin(theta) * params.ringRadius);
        spoke.rotation.z = Math.PI / 2;
        spoke.rotation.y = theta;
        group.add(spoke);
      }

      // 22,000 Entropic FG-Repeat Sieve Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = Math.sqrt(Math.random()) * (params.ringRadius * 0.85);
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 3.5;

        pPos[i * 3] = Math.cos(theta) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(theta) * r;

        const col = c1.clone().lerp(c2, r / (params.ringRadius * 0.85));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const sieve = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(sieve);

      scene.userData = { group, sieve, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.sieve.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
