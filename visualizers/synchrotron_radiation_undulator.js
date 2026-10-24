// visualizers/synchrotron_radiation_undulator.js
// Relativistic Electron Undulator Synchrotron X-Ray Beam
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.synchrotron_radiation_undulator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "synchrotron_radiation_undulator",
    title: "Relativistic Electron Undulator Synchrotron X-Ray Beam",
    fileName: "synchrotron_undulator.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Relativistic electrons wiggling through periodic magnetic arrays emitting coherent synchrotron X-rays in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udcab\n\n#threejs #webgl #synchrotron #undulator #xray #acceleratorphysics #creativecoding #javascript #reels",
    
    displayCode: "// Undulator Fundamental Wavelength Emission\nfunction undulatorWavelength(lambda_u, gamma, K, theta = 0) {\n  // lambda = (lambda_u / (2 * gamma^2)) * (1 + K^2 / 2 + gamma^2 * theta^2)\n  const harmonic = (lambda_u / (2 * gamma * gamma)) * (1 + (K * K) / 2);\n  return harmonic;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "poleCount": 24
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
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Alternating Magnetic Poles Array
      const poles = new THREE.Group();
      group.add(poles);
      const count = params.poleCount;

      for (let i = 0; i < count; i++) {
        const x = -8.0 + (i / count) * 16.0;
        const pTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 1.5), new THREE.MeshBasicMaterial({ color: (i%2===0?0xef4444:0x3b82f6) }));
        pTop.position.set(x, 2.0, 0);
        poles.add(pTop);

        const pBot = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 1.5), new THREE.MeshBasicMaterial({ color: (i%2===0?0x3b82f6:0xef4444) }));
        pBot.position.set(x, -2.0, 0);
        poles.add(pBot);
      }

      // Wiggling Sinusoidal Electron Trajectory
      const pts = [];
      for (let x = -8.0; x <= 8.0; x += 0.1) {
        pts.push(new THREE.Vector3(x, Math.sin(x * 3.5) * 0.6, 0));
      }
      const ePath = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: c2, linewidth: 2.5 })
      );
      group.add(ePath);

      // Emitted X-Ray Photons Cone
      const xCount = 2000;
      const xPos = new Float32Array(xCount * 3);
      for (let i = 0; i < xCount; i++) {
        const x = 2.0 + Math.random() * 8.0;
        const rad = (x * 0.1) * Math.sqrt(Math.random());
        const th = Math.random() * Math.PI * 2;
        xPos[i * 3] = x;
        xPos[i * 3 + 1] = Math.cos(th) * rad;
        xPos[i * 3 + 2] = Math.sin(th) * rad;
      }
      const xGeo = new THREE.BufferGeometry();
      xGeo.setAttribute('position', new THREE.BufferAttribute(xPos, 3));
      const xRays = new THREE.Points(xGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(xRays);

      scene.userData = { group, ePath, xRays, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;

      const p = data.xRays.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.35;
        if (p[i] > 11.0) p[i] = 1.0;
      }
      data.xRays.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
