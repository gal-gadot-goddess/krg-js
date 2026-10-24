// visualizers/cherenkov_radiation_cone.js
// Relativistic Cherenkov Luminescence Shock Cone
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cherenkov_radiation_cone = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cherenkov_radiation_cone",
    title: "Relativistic Cherenkov Luminescence Shock Cone",
    fileName: "cherenkov_radiation.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udc99 Charged relativistic particles traveling faster than the phase velocity of light in water radiating eerie Cherenkov blue photons in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf0a\n\n#threejs #webgl #cherenkov #nuclearphysics #relativity #quantum #creativecoding #javascript #reels",
    
    displayCode: "// Cherenkov Emission Angle Equation\nfunction cherenkovAngle(beta, n = 1.33) {\n  // cos(theta_c) = 1 / (n * beta)\n  const threshold = 1.0 / (n * beta);\n  if (threshold > 1.0) return 0; // sub-threshold, no emission\n  return Math.acos(threshold);\n}",

    defaultParams: {
    "primaryColor": [
        0.1,
        0.6,
        1.0
    ],
    "secondaryColor": [
        0.8,
        0.95,
        1.0
    ],
    "particleCount": 7500
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

      // Mach-Cherenkov Photonic Shock Cone
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(5.2, 12, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.6 })
      );
      cone.rotation.z = Math.PI / 2;
      group.add(cone);

      // Fast Relativistic Blue Photons
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const x = -6.0 + Math.random() * 12.0;
        const rad = (x + 6.0) * 0.42 * Math.sqrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = x;
        pos[i * 3 + 1] = Math.cos(theta) * rad;
        pos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const photons = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c2, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(photons);

      scene.userData = { group, cone, photons, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      const p = data.photons.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.25;
        if (p[i] > 6.0) p[i] = -6.0;
      }
      data.photons.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
