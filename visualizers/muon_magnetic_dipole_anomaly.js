// visualizers/muon_magnetic_dipole_anomaly.js
// Muon g-2 Relativistic Anomalous Magnetic Precession
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.muon_magnetic_dipole_anomaly = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "muon_magnetic_dipole_anomaly",
    title: "Muon g-2 Relativistic Anomalous Magnetic Precession",
    fileName: "muon_g2.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udd2c Subatomic muon particles orbiting in a uniform magnetic storage ring precessing with anomalous magnetic moment g-2 in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u269b\ufe0f\n\n#threejs #webgl #muong2 #particlephysics #fermilab #standardmodel #creativecoding #javascript #reels",
    
    displayCode: "// Muon Anomalous Magnetic Moment g-2 Precession\nfunction muonPrecessionFrequency(B, a_mu = 0.00116592) {\n  const q = 1.602e-19, m_mu = 1.883e-28;\n  const omega_a = a_mu * (q * B / m_mu); // anomalous precession\n  return omega_a;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.4,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "ringRadius": 6.0
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

      // Storage Ring Torus
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(params.ringRadius, 0.45, 24, 80),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true })
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Orbiting Muon Particle Cluster
      const mCount = 1500;
      const mPos = new Float32Array(mCount * 3);
      for (let i = 0; i < mCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = params.ringRadius + (Math.random() - 0.5) * 0.6;
        mPos[i * 3] = Math.cos(theta) * rad;
        mPos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        mPos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      const mGeo = new THREE.BufferGeometry();
      mGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
      const muons = new THREE.Points(mGeo, new THREE.PointsMaterial({ color: c1, size: 0.16, blending: THREE.AdditiveBlending }));
      group.add(muons);

      scene.userData = { group, ring, muons, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.muons.rotation.y = t * 3.0;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
