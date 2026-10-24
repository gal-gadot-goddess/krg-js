// visualizers/photonic_crystal_bandgap_resonator.js
// 2D Honeycomb Photonic Crystal Complete Bandgap Cavity
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.photonic_crystal_bandgap_resonator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "photonic_crystal_bandgap_resonator",
    title: "2D Honeycomb Photonic Crystal Complete Bandgap Cavity",
    fileName: "photonic_bandgap.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udc8e Complete optical photonic bandgap microcavity trapping single-mode laser photons in a honeycomb dielectric slab in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #photoniccrystal #bandgap #optics #nanophotonics #creativecoding #javascript #reels",
    
    displayCode: "// Photonic Crystal Maxwell Eigenmode Helmholtz\nfunction helmholtzEigenmode(k, a) {\n  const braggReflect = Math.sin(k * a) / (k * a);\n  const inBandgap = Math.abs(braggReflect) > 1.0;\n  return { braggReflect, inBandgap };\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.25,
        0.6
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "hexGrid": 8
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

      const n = params.hexGrid;
      const pillars = new THREE.Group();
      group.add(pillars);

      for (let q = -n; q <= n; q++) {
        for (let r = -n; r <= n; r++) {
          if (Math.abs(q + r) <= n) {
            // Defect cavity at center
            if (q === 0 && r === 0) continue;
            const x = 1.1 * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
            const z = 1.1 * (3/2 * r);
            const pMesh = new THREE.Mesh(
              new THREE.CylinderGeometry(0.35, 0.35, 3.0, 16),
              new THREE.MeshStandardMaterial({ color: c1, wireframe: true })
            );
            pMesh.position.set(x, 0, z);
            pillars.add(pMesh);
          }
        }
      }

      // Trapped Cavity Light Mode
      const cavityLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 24, 24),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 1.2 })
      );
      group.add(cavityLight);

      scene.userData = { group, pillars, cavityLight, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.2;
      const pulse = 0.9 + Math.sin(t * 6.0) * 0.25;
      data.cavityLight.scale.set(pulse, pulse, pulse);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
