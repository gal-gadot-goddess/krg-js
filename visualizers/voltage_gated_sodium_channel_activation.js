// visualizers/voltage_gated_sodium_channel_activation.js
// Voltage-Gated Sodium Channel S4 Helix Screw Gate
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.voltage_gated_sodium_channel_activation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "voltage_gated_sodium_channel_activation",
    title: "Voltage-Gated Sodium Channel S4 Helix Screw Gate",
    fileName: "sodium_channel_nav.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\u26a1 Action potential initiation: Nav1.7 sodium channel four-domain voltage sensor sliding outward in helical screw motion in Three.js! Follow @kreggsjs! \ud83e\udde0\ud83d\udd2c\n\n#threejs #webgl #ionchannels #neuroscience #biophysics #electrophysiology #codeart",
    
    displayCode: "// Hodgkin-Huxley Sodium Activation Gate m-particle Dynamics\nfunction sodiumActivation(V) {\n  // alpha_m = 0.1 * (V + 40) / (1 - exp(-(V + 40) / 10))\n  return 0.1 * (V + 40.0) / (1.0 - Math.exp(-(V + 40.0) / 10.0));\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.75
    ],
    "secondaryColor": [
        1.0,
        0.8,
        0.2
    ],
    "voltage": -20.0
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

      // Central Ion Conduction Pore Barrel (Cylinder)
      const pore = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 7.5, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.45 })
      );
      group.add(pore);

      // 4 S4 Positively Charged Helices (Arginine / Lysine repeats)
      const s4Group = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const theta = (i / 4) * Math.PI * 2;
        const s4 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 6.0, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6 })
        );
        s4.position.set(Math.cos(theta) * 3.8, 0, Math.sin(theta) * 3.8);
        s4Group.add(s4);
      }
      group.add(s4Group);

      // Translocating Sodium Ions (Na+) (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = Math.random() * 1.2;
        const th = Math.random() * Math.PI * 2;
        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
        pPos[i * 3 + 2] = Math.sin(th) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, s4Group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const sScrew = Math.sin(t * 3.0) * 0.8;
      data.s4Group.children.forEach(s => s.position.y = sScrew);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
