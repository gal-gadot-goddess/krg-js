// visualizers/photon_polarization_beam.js
// Laser Photon Polarization Wave
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.photon_polarization_beam = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "photon_polarization_beam",
    title: "Laser Photon Polarization Wave",
    fileName: "photon_polarization.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u26a1 Coherent laser beam with orthogonal oscillating electric and magnetic field vectors in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83c\udf08\n\n#threejs #webgl #optics #electromagnetism #laser #physics #creativecoding #javascript #reels",
    
    displayCode: "// Circular Polarization Orthogonal Field Wavevectors\nfunction calculatePolarizationWave(z, time, k = 1.8, omega = 6.0) {\n  const E_x = Math.cos(k * z - omega * time) * 3.0; // Electric vector\n  const B_y = Math.sin(k * z - omega * time) * 3.0; // Magnetic vector\n  return { E_x, B_y, z };\n}",

    defaultParams: {
    "waveLength": 18.0,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.6
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

      const ptsE = [], ptsB = [];
      for (let z = -9; z <= 9; z += 0.2) {
        ptsE.push(new THREE.Vector3(Math.cos(z * 1.5) * 2.8, Math.sin(z * 1.5) * 2.8, z));
        ptsB.push(new THREE.Vector3(-Math.sin(z * 1.5) * 2.8, Math.cos(z * 1.5) * 2.8, z));
      }
      const geoE = new THREE.BufferGeometry().setFromPoints(ptsE);
      const geoB = new THREE.BufferGeometry().setFromPoints(ptsB);
      const lineE = new THREE.Line(geoE, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 }));
      const lineB = new THREE.Line(geoB, new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 2 }));
      group.add(lineE);
      group.add(lineB);

      scene.userData = { group, lineE, lineB, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 2.0;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
