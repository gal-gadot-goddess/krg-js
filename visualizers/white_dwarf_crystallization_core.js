// visualizers/white_dwarf_crystallization_core.js
// Crystallized White Dwarf Carbon-Oxygen Diamond Lattice
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.white_dwarf_crystallization_core = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "white_dwarf_crystallization_core",
    title: "Crystallized White Dwarf Carbon-Oxygen Diamond Lattice",
    fileName: "white_dwarf_core.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udc8e Billion-carat crystalline carbon-oxygen diamond core of a cooling white dwarf star pulsing in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2744\ufe0f\n\n#threejs #webgl #whitedwarf #diamondstar #crystallization #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Coulomb Liquid-to-Solid Crystallization Gamma Parameter\nfunction coulombParameter(Z, T, a) {\n  const k_B = 1.38e-16; // erg/K\n  const gamma = (Z * Z * 4.8e-10 * 4.8e-10) / (a * k_B * T);\n  return { gamma, isSolid: gamma >= 178 }; // freezing transition\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.98,
        1.0
    ],
    "gridResolution": 14
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
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // FCC Diamond Crystal Lattice Points
      const n = params.gridResolution;
      const pts = [];
      const step = 0.75;
      const offset = (n * step) / 2;

      for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
          for (let z = 0; z < n; z++) {
            const px = x * step - offset;
            const py = y * step - offset;
            const pz = z * step - offset;
            if (px*px + py*py + pz*pz < 28) {
              pts.push(px, py, pz);
            }
          }
        }
      }

      const crystalGeo = new THREE.BufferGeometry();
      crystalGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const crystal = new THREE.Points(crystalGeo, new THREE.PointsMaterial({
        color: c1, size: 0.18, blending: THREE.AdditiveBlending
      }));
      group.add(crystal);

      // Surrounding Degenerate Electron Gas Shell
      const shellGeo = new THREE.IcosahedronGeometry(6.2, 3);
      const shellMat = new THREE.MeshStandardMaterial({
        color: c2, emissive: c2, emissiveIntensity: 0.4, wireframe: true, transparent: true, opacity: 0.6
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      group.add(shell);

      scene.userData = { group, crystal, shell, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;
      data.shell.rotation.z = -t * 0.2;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
