// visualizers/tidal_disruption_flare_event.js
// Supermassive Black Hole Tidal Disruption Event (TDE)
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tidal_disruption_flare_event = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tidal_disruption_flare_event",
    title: "Supermassive Black Hole Tidal Disruption Event (TDE)",
    fileName: "tidal_disruption.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c A passing stellar star torn apart by gravitational tidal forces into relativistic accretion streams in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #blackhole #tidaldisruption #tde #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Tidal Disruption Radius & Relativistic Spaghettification\nfunction tidalDisruptionRadius(M_BH, M_star, R_star) {\n  // R_t = R_star * (M_BH / M_star)^(1/3)\n  const massRatio = Math.cbrt(M_BH / M_star);\n  return R_star * massRatio;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.3,
        0.1
    ],
    "secondaryColor": [
        0.3,
        0.9,
        1.0
    ],
    "streamParticles": 7000
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

      // Supermassive Singularity
      const smbh = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      group.add(smbh);

      // Debris accretion stream particles
      const count = params.streamParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 4.0;
        const r = 2.5 + Math.pow(u * 0.45, 1.8);
        const theta = u + (Math.random() - 0.5) * 0.25;
        pos[i * 3] = Math.cos(theta) * r;
        pos[i * 3 + 1] = (Math.sin(u * 2) * 1.5) * (1.0 / (r * 0.3 + 1.0));
        pos[i * 3 + 2] = Math.sin(theta) * r;

        const mix = r / 12.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const streamGeo = new THREE.BufferGeometry();
      streamGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      streamGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const debrisStream = new THREE.Points(streamGeo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(debrisStream);

      // Relativistic Accretion Ring
      const accRing = new THREE.Mesh(
        new THREE.RingGeometry(2.3, 4.2, 64),
        new THREE.MeshBasicMaterial({ color: c1, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
      );
      accRing.rotation.x = Math.PI / 2;
      group.add(accRing);

      scene.userData = { group, smbh, debrisStream, accRing, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.45;
      data.accRing.rotation.z = -t * 1.2;

      const p = data.debrisStream.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Spiral inflow towards singularity
        const rad = Math.sqrt(p[i]*p[i] + p[i+2]*p[i+2]);
        const ang = Math.atan2(p[i+2], p[i]) + 0.03 * (5.0 / (rad + 1.0));
        p[i] = Math.cos(ang) * rad;
        p[i+2] = Math.sin(ang) * rad;
      }
      data.debrisStream.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 6 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
