// visualizers/mhd_blast_wave_magnetic_shock_front.js
// Magnetohydrodynamic (MHD) Blast Wave Shock Front
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.mhd_blast_wave_magnetic_shock_front = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "mhd_blast_wave_magnetic_shock_front",
    title: "Magnetohydrodynamic (MHD) Blast Wave Shock Front",
    fileName: "mhd_blast_wave.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83d\udca5 Super-Alfv\u00e9nic explosion expanding into a magnetized plasma medium: non-spherical MHD blast wave shock in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udd25\n\n#threejs #webgl #plasma #mhd #shockwave #astrophysics #physics #codeart",
    
    displayCode: "// Fast Magnetosonic Shock Speed: v_fast^2 = 1/2 * (c_s^2 + v_A^2 + sqrt(...))\nfunction fastMagnetosonic(c_s, v_A, theta) {\n  const sum = c_s*c_s + v_A*v_A;\n  return Math.sqrt(0.5 * (sum + Math.sqrt(sum*sum - 4*c_s*c_s*v_A*v_A*Math.pow(Math.cos(theta), 2))));\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.15
    ],
    "secondaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "blastRadius": 7.5
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

      // 24,000 Anisotropic MHD Blast Particles (Prolate along B-field)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = (5.5 + Math.cos(phi) * 2.5) * (0.8 + Math.random() * 0.4);

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.cos(phi) * 1.35; // stretched along B (y-axis)
        pPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

        const col = c1.clone().lerp(c2, Math.abs(Math.cos(phi)));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const blast = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(blast);

      scene.userData = { group, blast, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.blast.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
