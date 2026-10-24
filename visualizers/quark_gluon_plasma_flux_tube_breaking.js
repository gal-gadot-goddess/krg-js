// visualizers/quark_gluon_plasma_flux_tube_breaking.js
// Chromo-Electric QCD Flux Tube Snapping & Hadronization
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quark_gluon_plasma_flux_tube_breaking = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quark_gluon_plasma_flux_tube_breaking",
    title: "Chromo-Electric QCD Flux Tube Snapping & Hadronization",
    fileName: "qcd_flux_tube.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Quantum Chromodynamics (QCD) chromo-electric flux tube stretching and string-breaking into quark-antiquark pairs in Three.js! Follow @kreggsjs! \ud83d\udd2c\u269b\ufe0f\n\n#threejs #webgl #quantum #particlephysics #qcd #quarks #physics #codeart",
    
    displayCode: "// Linear Confinement Potential V(r) = -4/3 * alpha_s / r + sigma * r\nfunction qcdPotential(r, alpha_s, sigma) {\n  return -(4.0 / 3.0) * (alpha_s / r) + sigma * r;\n}\nconst string_tension = 1.0; // GeV/fm",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.75
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.55
    ],
    "stringLength": 14.0
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

      // Quark & Antiquark End Caps
      const qGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const q1 = new THREE.Mesh(qGeo, new THREE.MeshBasicMaterial({ color: c1 }));
      const q2 = new THREE.Mesh(qGeo, new THREE.MeshBasicMaterial({ color: c2 }));
      group.add(q1); group.add(q2);

      // 22,000 Chromo-electric Gluon Flux Tube Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * params.stringLength;
        const angle = Math.random() * Math.PI * 2;
        const tubeRad = 0.6 + (1.0 - Math.abs(x) / (params.stringLength * 0.5)) * 1.4;
        const r = Math.sqrt(Math.random()) * tubeRad;

        pPos[i * 3] = x;
        pPos[i * 3 + 1] = Math.cos(angle) * r;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = c1.clone().lerp(c2, (x + params.stringLength * 0.5) / params.stringLength);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, angle, r, speed: 2.5 + Math.random() * 2.0 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const tube = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(tube);

      scene.userData = { group, q1, q2, tube, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const halfL = (params.stringLength * 0.5) + Math.sin(t * 3.0) * 1.5;
      data.q1.position.set(-halfL, 0, 0);
      data.q2.position.set(halfL, 0, 0);

      data.tube.rotation.x = t * 1.5;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
