// visualizers/cosmic_inflation_quantum_fluctuations.js
// Primordial Cosmic Inflation & CMB Quantum Fluctuations
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cosmic_inflation_quantum_fluctuations = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cosmic_inflation_quantum_fluctuations",
    title: "Primordial Cosmic Inflation & CMB Quantum Fluctuations",
    fileName: "cosmic_inflation.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Exponential expansion of primordial spacetime stretching subatomic quantum fluctuations into the Cosmic Microwave Background in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2d\n\n#threejs #webgl #cosmology #cosmicinflation #cmb #physics #creativecoding #javascript #reels",
    
    displayCode: "// Primordial Inflaton Field Scalar Potential\nfunction inflatonExpansion(phi, H0, t) {\n  const scaleFactor = Math.exp(H0 * t);\n  const fluctuation = Math.sin(phi * 4.0) * Math.cos(phi * 3.0) / scaleFactor;\n  return { scaleFactor, fluctuation };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.6,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.6
    ],
    "gridDivs": 45
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
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Primordial CMB Waveform Sphere
      const sphereGeo = new THREE.SphereGeometry(6.5, params.gridDivs, params.gridDivs);
      const pos = sphereGeo.attributes.position;
      const basePos = pos.clone();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, wireframe: true, transparent: true, opacity: 0.85
      });
      const cmbSphere = new THREE.Mesh(sphereGeo, mat);
      group.add(cmbSphere);

      // Embedded inflaton energy field particles
      const pCount = 5000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 6.5 + (Math.random() - 0.5) * 1.2;
        pPos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pPos[i * 3 + 1] = r * Math.cos(v);
        pPos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);

        const mix = Math.sin(u * 3) * 0.5 + 0.5;
        const col = c1.clone().lerp(c2, mix);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const inflatons = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(inflatons);

      scene.userData = { group, cmbSphere, basePos, inflatons, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      const pos = data.cmbSphere.geometry.attributes.position;
      const base = data.basePos;
      for (let i = 0; i < pos.count; i++) {
        const bx = base.getX(i), by = base.getY(i), bz = base.getZ(i);
        const wave = Math.sin(bx * 0.8 + t * 2.5) * Math.cos(by * 0.8 + t * 2.0) * 0.5;
        pos.setXYZ(i, bx * (1 + wave * 0.12), by * (1 + wave * 0.12), bz * (1 + wave * 0.12));
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
