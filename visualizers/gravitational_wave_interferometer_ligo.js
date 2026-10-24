// visualizers/gravitational_wave_interferometer_ligo.js
// LIGO Michelson Interferometer Spacetime Strain Ripple
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.gravitational_wave_interferometer_ligo = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "gravitational_wave_interferometer_ligo",
    title: "LIGO Michelson Interferometer Spacetime Strain Ripple",
    fileName: "ligo_interferometer.js",
    category: "Cyberpunk & Digital Systems",
    genre: "quantum",
    caption: "\ud83c\udf0c Quadrupole gravitational spacetime ripples stretching and squeezing 4-kilometer laser interferometer arms in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2d\n\n#threejs #webgl #ligo #gravitationalwaves #einstein #relativity #optics #creativecoding #javascript #reels",
    
    displayCode: "// Gravitational Wave Metric Strain Perturbation\nfunction spacetimeStrain(h_plus, h_cross, theta) {\n  const deltaL_x = 0.5 * h_plus * 4000; // meters\n  const deltaL_y = -0.5 * h_plus * 4000;\n  return { deltaL_x, deltaL_y };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.3,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "armLength": 10.0
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
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Orthogonal 4km Laser Arms
      const armX = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 14, 16),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.8 })
      );
      armX.rotation.z = Math.PI / 2;
      armX.position.x = 7.0;
      group.add(armX);

      const armY = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 14, 16),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.8 })
      );
      armY.position.z = 7.0;
      armY.rotation.x = Math.PI / 2;
      group.add(armY);

      // Central Beamsplitter
      const bs = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 0.2),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
      );
      bs.rotation.y = Math.PI / 4;
      group.add(bs);

      group.rotation.x = 0.6;

      scene.userData = { group, armX, armY, bs, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      // Gravitational wave quadrupole strain stretch and squeeze
      const strain = Math.sin(t * 8.0) * 0.2;
      data.armX.scale.set(1.0, 1.0 + strain, 1.0);
      data.armY.scale.set(1.0, 1.0 - strain, 1.0);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
