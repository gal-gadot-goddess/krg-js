// visualizers/ferrofluid_rosensweig_normal_field_spikes.js
// Ferrofluid Rosensweig Normal-Field Instability Spikes
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.ferrofluid_rosensweig_normal_field_spikes = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "ferrofluid_rosensweig_normal_field_spikes",
    title: "Ferrofluid Rosensweig Normal-Field Instability Spikes",
    fileName: "ferrofluid_rosensweig.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83e\uddf2 Superparamagnetic liquid forming self-organizing Rosensweig conical spike arrays in magnetic fields in Three.js! Follow @kreggsjs for daily reels! \u26a1\u2728\n\n#threejs #webgl #ferrofluid #magnetism #rosensweig #physics #fluiddynamics #codeart",
    
    displayCode: "// Rosensweig Critical Magnetic Field Threshold\nfunction rosensweigCriticalField(rho, g, gamma, mu) {\n  // H_crit^2 = 2 * (1 + 1/mu_r) * sqrt(rho * g * gamma)\n  return Math.sqrt(2.0 * Math.sqrt(rho * g * gamma));\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
    ],
    "spikeCount": 19
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

      // Hexagonal Spikes
      const cones = [];
      for (let i = 0; i < params.spikeCount; i++) {
        const u = (i / params.spikeCount) * Math.PI * 2;
        const r = (i === 0) ? 0 : 2.5 + (i % 2) * 2.2;
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(0.8, 4.2, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true })
        );
        cone.position.set(Math.cos(u) * r, 0, Math.sin(u) * r);
        group.add(cone);
        cones.push(cone);
      }

      scene.userData = { group, cones, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.cones.forEach((c, idx) => {
        const s = 1.0 + Math.sin(t * 3.0 + idx * 0.4) * 0.25;
        c.scale.set(1.0, s, 1.0);
      });
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 1.0, 0);

      renderer.render(scene, camera);
    }
  };
});
