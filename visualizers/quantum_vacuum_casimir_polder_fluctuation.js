// visualizers/quantum_vacuum_casimir_polder_fluctuation.js
// Quantum Vacuum Energy & Casimir-Polder Boundary Stress
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_vacuum_casimir_polder_fluctuation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_vacuum_casimir_polder_fluctuation",
    title: "Quantum Vacuum Energy & Casimir-Polder Boundary Stress",
    fileName: "casimir_fluctuation.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Quantum vacuum zero-point fluctuations excluded between parallel conducting plates generating attractive Casimir force in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #quantumvacuum #casimireffect #zeropointenergy #physics #codeart",
    
    displayCode: "// Casimir Energy Density between Conducting Plates\nfunction casimirEnergy(a) {\n  // E / A = - (pi^2 * hbar * c) / (720 * a^3)\n  return - (Math.PI * Math.PI) / (720.0 * Math.pow(a, 3.0));\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.85
    ],
    "plateSep": 4.5
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

      // Dual Casimir Conducting Plates
      const pGeo = new THREE.BoxGeometry(1.0, 14.0, 14.0);
      const pMat = new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true });
      const plate1 = new THREE.Mesh(pGeo, pMat);
      const plate2 = new THREE.Mesh(pGeo, pMat);
      group.add(plate1); group.add(plate2);

      // Vacuum Fluctuations (22,000 virtual particles)
      const fCount = 22000;
      const fPos = new Float32Array(fCount * 3);
      const fCol = new Float32Array(fCount * 3);
      const fData = [];

      for (let i = 0; i < fCount; i++) {
        const x = (Math.random() - 0.5) * 16.0;
        const y = (Math.random() - 0.5) * 14.0;
        const z = (Math.random() - 0.5) * 14.0;

        fPos[i * 3] = x; fPos[i * 3 + 1] = y; fPos[i * 3 + 2] = z;

        const isInside = (Math.abs(x) < params.plateSep * 0.5);
        const col = isInside ? c1 : c2;
        fCol[i * 3] = col.r; fCol[i * 3 + 1] = col.g; fCol[i * 3 + 2] = col.b;

        fData.push({ x, y, z, freq: 4.0 + Math.random() * 8.0 });
      }

      const fGeo = new THREE.BufferGeometry();
      fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
      fGeo.setAttribute('color', new THREE.BufferAttribute(fCol, 3));
      const vacuum = new THREE.Points(fGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(vacuum);

      scene.userData = { group, plate1, plate2, vacuum, fData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const curSep = params.plateSep * 0.5 + Math.sin(t * 1.8) * 0.6;
      data.plate1.position.x = -curSep;
      data.plate2.position.x = curSep;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
