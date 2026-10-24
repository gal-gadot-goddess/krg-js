// visualizers/bubble_sonoluminescence_implosion.js
// Single-Bubble Sonoluminescence (SBSL) Plasma Flash
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bubble_sonoluminescence_implosion = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bubble_sonoluminescence_implosion",
    title: "Single-Bubble Sonoluminescence (SBSL) Plasma Flash",
    fileName: "sonoluminescence.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83d\udca5 Acoustic sound waves imploding a microscopic gas bubble to 20,000 Kelvin creating picosecond light flashes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #sonoluminescence #plasma #starinajar #acoustics #creativecoding #javascript #reels",
    
    displayCode: "// Rayleigh-Plesset Cavitation Bubble Dynamics\nfunction rayleighPlesset(R, R_dot, P_acoustic) {\n  const R_ddot = (-1.5 * R_dot * R_dot + P_acoustic / 1000) / R;\n  return R_ddot; // violent adiabatic collapse\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.8,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.95,
        0.9
    ],
    "flashCycles": 4
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

      // Collapsing Cavitation Bubble
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(3.5, 32, 32),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.6 })
      );
      group.add(bubble);

      // Core Incandescent Light Flash
      const flash = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      group.add(flash);

      scene.userData = { group, bubble, flash, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      // Violent Rayleigh-Plesset collapse cycle
      const cycle = Math.sin(t * 8.0);
      const r = cycle > 0.8 ? 0.2 : (1.0 + cycle * 0.6);
      data.bubble.scale.set(r, r, r);
      data.flash.scale.set(1.0 / (r * 2), 1.0 / (r * 2), 1.0 / (r * 2));

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
