// visualizers/quantum_bohmian_pilot_wave.js
// Bohmian Quantum Mechanics Pilot Wave Guidance Field
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_bohmian_pilot_wave = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_bohmian_pilot_wave",
    title: "Bohmian Quantum Mechanics Pilot Wave Guidance Field",
    fileName: "bohmian_pilot_wave.js",
    category: "Fluid Dynamics & Plasma",
    genre: "quantum",
    caption: "\ud83c\udf0a De Broglie-Bohm pilot wave hydrodynamics guiding quantum particle trajectories through double-slit interference in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #bohmianmechanics #pilotwave #quantumphysics #debroglie #creativecoding #javascript #reels",
    
    displayCode: "// Bohmian Quantum Potential & Guidance Velocity\nfunction bohmianVelocity(psi_r, psi_i, grad_phase) {\n  const hbar = 1.054e-34, m = 9.109e-31;\n  const v = (hbar / m) * grad_phase; // deterministic particle guidance\n  return v;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.7
    ],
    "trackCount": 50
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
      const count = params.trackCount;
      const tracks = [];

      for (let i = 0; i < count; i++) {
        const y0 = -4.0 + (i / count) * 8.0;
        const pts = [];
        for (let x = -7.0; x <= 7.0; x += 0.25) {
          // Double slit interference ripple
          const y = y0 + Math.sin(x * 1.5) * Math.sin(y0 * 1.2) * 0.8;
          pts.push(new THREE.Vector3(x, y, 0));
        }
        const tGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const track = new THREE.Line(tGeo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.6 }));
        group.add(track);
        tracks.push(track);
      }

      scene.userData = { group, tracks, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.tracks.forEach((tr, idx) => {
        const pos = tr.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const x = pos.getX(j);
          const y0 = -4.0 + (idx / data.params.trackCount) * 8.0;
          const y = y0 + Math.sin(x * 1.5 - t * 4.0) * Math.sin(y0 * 1.2) * 0.8;
          pos.setY(j, y);
        }
        pos.needsUpdate = true;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
