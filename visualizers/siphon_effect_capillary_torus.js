// visualizers/siphon_effect_capillary_torus.js
// Zero-Gravity Marangoni Capillary Flow Liquid Torus
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.siphon_effect_capillary_torus = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "siphon_effect_capillary_torus",
    title: "Zero-Gravity Marangoni Capillary Flow Liquid Torus",
    fileName: "capillary_torus.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83d\udca7 Surface tension gradients driving zero-gravity thermocapillary Marangoni flow along a liquid bridge in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf0a\n\n#threejs #webgl #marangoni #zerogravity #fluiddynamics #capillary #surfacetension #creativecoding #javascript #reels",
    
    displayCode: "// Marangoni Surface Tension Stress Boundary\nfunction marangoniStress(dSigma_dT, gradT) {\n  const tau_surface = dSigma_dT * gradT;\n  return tau_surface; // shear stress driving surface flow\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        0.95
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.65
    ],
    "streamlines": 24
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

      // Torus Liquid Bridge Body
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(4.8, 1.6, 32, 64),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.5 })
      );
      group.add(torus);

      scene.userData = { group, torus, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.3;
      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
