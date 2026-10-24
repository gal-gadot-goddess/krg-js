// visualizers/mach_diamond_shock_diamonds.js
// Supersonic Rocket Exhaust Plume Mach Shock Diamonds
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.mach_diamond_shock_diamonds = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "mach_diamond_shock_diamonds",
    title: "Supersonic Rocket Exhaust Plume Mach Shock Diamonds",
    fileName: "mach_diamonds.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83d\ude80 Over-expanded supersonic rocket exhaust creating periodic oblique shock wave reflections & Mach diamonds in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd25\n\n#threejs #webgl #machdiamonds #rocketscience #shockwaves #supersonic #propulsion #creativecoding #javascript #reels",
    
    displayCode: "// Prandtl-Meyer Expansion & Shock Diamond Spacing\nfunction machDiamondSpacing(d_nozzle, M, gamma = 1.4) {\n  // Periodic cell wavelength: L = d * sqrt(M^2 - 1)\n  const cellLength = d_nozzle * Math.sqrt(Math.max(0, M * M - 1.0));\n  return cellLength;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "diamondCount": 6
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

      // Rocket Nozzle Bell
      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 0.8, 2.5, 24, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
      );
      nozzle.position.x = -7.0;
      nozzle.rotation.z = Math.PI / 2;
      group.add(nozzle);

      // Periodic Diamond Shock Cones
      const diamonds = new THREE.Group();
      group.add(diamonds);
      const count = params.diamondCount;

      for (let i = 0; i < count; i++) {
        const x = -5.0 + i * 2.2;
        const dMesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.2 - i * 0.12),
          new THREE.MeshStandardMaterial({ color: (i%2===0?c1:c2), emissive: (i%2===0?c1:c2), emissiveIntensity: 0.8, wireframe: true })
        );
        dMesh.position.x = x;
        diamonds.add(dMesh);
      }

      scene.userData = { group, nozzle, diamonds, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.25;
      data.diamonds.children.forEach((d, idx) => {
        d.rotation.x = t * 2.0 + idx;
        const s = 1.0 + Math.sin(t * 8.0 + idx) * 0.12;
        d.scale.set(s, s, s);
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
