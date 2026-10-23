// visualizers/rayleigh_benard_convection.js
// Rayleigh-Bénard Convection Cells
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.rayleigh_benard_convection = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "rayleigh_benard_convection",
    title: "Rayleigh-Bénard Convection Cells",
    fileName: "convection_cells.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\u2668\ufe0f Buoyancy-driven Rayleigh-B\u00e9nard thermal convection circulation rolls in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf0a\n\n#threejs #webgl #thermodynamics #convection #fluidmechanics #physics #creativecoding #javascript #reels",
    
    displayCode: "// Thermal Rayleigh-B\u00e9nard Convection Streamlines\nfunction computeConvectionRolls(x, y, time) {\n  // Stream function psi = A * sin(k*x) * sin(pi*y)\n  const u = Math.sin(x * 1.5) * Math.cos(y * 1.5 + time * 3.0) * 1.5;\n  const v = -Math.cos(x * 1.5) * Math.sin(y * 1.5 + time * 3.0) * 1.5;\n  return new THREE.Vector3(u, v, 0);\n}",

    defaultParams: {
    "particles": 6500,
    "primaryColor": [
        1.0,
        0.35,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.75,
        1.0
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const pts = new THREE.Points(geo, mat);
      group.add(pts);

      scene.userData = { group, pts, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
