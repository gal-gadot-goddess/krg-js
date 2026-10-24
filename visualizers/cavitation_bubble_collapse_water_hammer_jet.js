// visualizers/cavitation_bubble_collapse_water_hammer_jet.js
// Ultrasonic Cavitation Collapse & Water-Hammer Microjet
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cavitation_bubble_collapse_water_hammer_jet = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cavitation_bubble_collapse_water_hammer_jet",
    title: "Ultrasonic Cavitation Collapse & Water-Hammer Microjet",
    fileName: "cavitation_microjet.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83d\udca5 Rayleigh-Plesset cavitation bubble collapse forming a high-speed supersonic water-hammer microjet in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf0a\u26a1\n\n#threejs #webgl #cavitation #fluidmechanics #acoustics #microjet #physics #codeart",
    
    displayCode: "// Rayleigh-Plesset Cavitation Collapse Equation\nfunction rayleighPlesset(R, R_dot, P_inf, P_v) {\n  // R * R_ddot + 3/2 * R_dot^2 = (P_v - P_inf) / rho\n  return ((P_v - P_inf) / 1000.0 - 1.5 * R_dot * R_dot) / R;\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.25
    ],
    "jetVelocity": 8.5
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

      // Collapsing Bubble Toroid Shell
      const bubble = new THREE.Mesh(
        new THREE.TorusGeometry(3.5, 1.2, 24, 64),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(bubble);

      // Central Supersonic Microjet (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const y = -7.0 + (i / pCount) * 14.0;
        const rad = 0.5 + Math.pow(Math.abs(y) / 7.0, 2) * 1.5;
        const th = Math.random() * Math.PI * 2;
        pPos[i * 3] = Math.cos(th) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(th) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, bubble, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const s = 1.0 + Math.sin(t * 3.5) * 0.3;
      data.bubble.scale.set(s, s, s);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
