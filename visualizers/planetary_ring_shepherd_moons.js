// visualizers/planetary_ring_shepherd_moons.js
// Saturnian Crystalline Rings & Shepherd Moon Resonances
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.planetary_ring_shepherd_moons = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "planetary_ring_shepherd_moons",
    title: "Saturnian Crystalline Rings & Shepherd Moon Resonances",
    fileName: "shepherd_moons.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83e\ude90 Shepherd moons Prometheus & Pandora carving wavy edge density waves in icy crystalline rings in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u2744\ufe0f\u2728\n\n#threejs #webgl #saturn #planetaryrings #shepherdmoons #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Resonant Lindblad Orbit Gap Confinement\nfunction shepherdResonance(r, moonRadius, massRatio) {\n  const deltaR = r - moonRadius;\n  const torque = -(massRatio * massRatio) / Math.pow(Math.abs(deltaR), 4);\n  return { deltaR, torque };\n}",

    defaultParams: {
    "primaryColor": [
        0.85,
        0.92,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.65,
        0.3
    ],
    "iceParticleCount": 9000
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
      camera.position.set(0, 10, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Gas Giant Planet
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(3.6, 32, 32),
        new THREE.MeshStandardMaterial({ color: c2, roughness: 0.6, metalness: 0.2 })
      );
      group.add(planet);

      // Crystalline Ice Particles Ring
      const count = params.iceParticleCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        let radius = 5.0 + Math.random() * 5.8;
        // Cassini/Encke Division gap
        if (radius > 7.4 && radius < 8.0) {
          radius += (Math.random() > 0.5 ? 0.7 : -0.7);
        }
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        const mix = (radius - 5.0) / 5.8;
        const col = c1.clone().lerp(c2, mix * 0.4);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      ringGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const rings = new THREE.Points(ringGeo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(rings);

      // Shepherd Moons
      const moonGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const moon1 = new THREE.Mesh(moonGeo, moonMat);
      const moon2 = new THREE.Mesh(moonGeo, moonMat);
      group.add(moon1);
      group.add(moon2);

      group.rotation.x = 0.5;

      scene.userData = { group, planet, rings, moon1, moon2, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const m1Ang = t * 0.7;
      data.moon1.position.set(Math.cos(m1Ang) * 7.2, 0, Math.sin(m1Ang) * 7.2);

      const m2Ang = t * 0.55 + Math.PI;
      data.moon2.position.set(Math.cos(m2Ang) * 8.2, 0, Math.sin(m2Ang) * 8.2);

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
