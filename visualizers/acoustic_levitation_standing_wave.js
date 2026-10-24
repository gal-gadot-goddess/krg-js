// visualizers/acoustic_levitation_standing_wave.js
// Ultrasonic Acoustic Levitation Standing Wave Nodal Array
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.acoustic_levitation_standing_wave = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "acoustic_levitation_standing_wave",
    title: "Ultrasonic Acoustic Levitation Standing Wave Nodal Array",
    fileName: "acoustic_levitator.js",
    category: "Fluid Dynamics & Plasma",
    genre: "ambient",
    caption: "\ud83d\udd0a 40 kHz ultrasonic standing wave acoustic radiation pressure suspending liquid droplets mid-air in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udca7\n\n#threejs #webgl #acousticlevitation #soundwaves #physics #standingwave #creativecoding #javascript #reels",
    
    displayCode: "// Gor'kov Acoustic Radiation Potential\nfunction gorkovPotential(p_rms, v_rms, V_particle) {\n  // U = V * [ (1/2)*f1*kappa*<p^2> - (3/4)*f2*rho*<v^2> ]\n  const acousticForce = -0.5 * V_particle * (p_rms * p_rms - v_rms * v_rms);\n  return acousticForce;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "nodeCount": 5
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

      // Top & Bottom Transducer Horns
      const topTrans = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 2.5, 1.5, 32), new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true }));
      topTrans.position.y = 6.0;
      group.add(topTrans);

      const botTrans = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 4.0, 1.5, 32), new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true }));
      botTrans.position.y = -6.0;
      group.add(botTrans);

      // Suspended Levitating Droplets at Nodal Planes
      const count = params.nodeCount;
      const droplets = [];
      for (let i = 0; i < count; i++) {
        const y = -3.5 + (i / (count - 1)) * 7.0;
        const drop = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.8, roughness: 0.1 })
        );
        drop.position.y = y;
        group.add(drop);
        droplets.push(drop);
      }

      scene.userData = { group, droplets, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.droplets.forEach((d, idx) => {
        // High frequency harmonic wobble
        d.position.x = Math.sin(t * 8.0 + idx) * 0.12;
        d.position.z = Math.cos(t * 7.0 + idx) * 0.12;
        const squish = 1.0 + Math.sin(t * 12.0 + idx) * 0.08;
        d.scale.set(squish, 1.0 / squish, squish);
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
