// visualizers/microquasar_ss433_precessing_jet_corkscrew.js
// Microquasar SS 433 Precessing Relativistic Jet Corkscrew
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.microquasar_ss433_precessing_jet_corkscrew = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "microquasar_ss433_precessing_jet_corkscrew",
    title: "Microquasar SS 433 Precessing Relativistic Jet Corkscrew",
    fileName: "ss433_corkscrew.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf00 Stellar-mass microquasar SS 433 precessing its 0.26c relativistic relativistic jet corkscrew in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udd73\ufe0f\n\n#threejs #webgl #ss433 #microquasar #relativity #astrophysics #creativecoding #codeart",
    
    displayCode: "// Kinematic Precessing Jet Corkscrew Model\nfunction jetCorkscrew(v_jet, theta_prec, omega_prec, t) {\n  // z = v_jet * t, r = z * tan(theta_prec), phi = omega_prec * t\n  return {\n    x: (v_jet * t) * Math.tan(theta_prec) * Math.cos(omega_prec * t),\n    y: (v_jet * t) * Math.tan(theta_prec) * Math.sin(omega_prec * t),\n    z: v_jet * t\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.65
    ],
    "precessionPeriod": 5.0
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

      // Microquasar central compact object
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })));

      // 24,000 Corkscrew Precessing Jet Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const sign = (i % 2 === 0) ? 1 : -1;
        const progress = Math.random();
        const dist = 1.2 + progress * 22.0;
        const precAngle = progress * Math.PI * 6.0;
        const coneRadius = dist * 0.35;

        pPos[i * 3] = Math.cos(precAngle) * coneRadius;
        pPos[i * 3 + 1] = sign * dist;
        pPos[i * 3 + 2] = Math.sin(precAngle) * coneRadius;

        const col = c1.clone().lerp(c2, progress);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ sign, progress, speed: 2.2 + Math.random() * 1.5, precAngle, coneRadius });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const corkscrew = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(corkscrew);

      scene.userData = { group, corkscrew, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.corkscrew.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const p = (it.progress + t * 0.35) % 1.0;
        const dist = 1.2 + p * 22.0;
        const angle = it.precAngle + t * 3.5;
        const rad = dist * 0.35;
        pos[i * 3] = Math.cos(angle) * rad;
        pos[i * 3 + 1] = it.sign * dist;
        pos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      data.corkscrew.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.28) * 22;
      camera.position.z = Math.cos(t * 0.28) * 22;
      camera.position.y = 5 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
