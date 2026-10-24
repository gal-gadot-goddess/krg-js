// visualizers/sombrero_galaxy_dust_ring.js
// Sombrero Galaxy (M104) Relativistic Dust Lane & Stellar Bulge
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.sombrero_galaxy_dust_ring = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "sombrero_galaxy_dust_ring",
    title: "Sombrero Galaxy (M104) Relativistic Dust Lane & Stellar Bulge",
    fileName: "sombrero_galaxy.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c The majestic Sombrero Galaxy (Messier 104) glowing stellar bulge & razor-sharp interstellar dust ring in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\u2728\n\n#threejs #webgl #sombrero #messier104 #galaxy #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// M104 Elliptical Bulge & Dust Lane Absorption\nfunction sombreroLuminosity(r, z) {\n  const R_e = 4.2; // effective bulge radius\n  const bulge = Math.exp(-7.67 * (Math.pow(r / R_e, 0.25) - 1.0));\n  const dustAbsorption = (r > 5.5 && r < 7.5) ? Math.exp(-Math.abs(z) * 3.0) : 0;\n  return { bulge, dustAbsorption };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.88,
        0.6
    ],
    "secondaryColor": [
        0.8,
        0.2,
        0.1
    ],
    "starCount": 9500
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
      camera.position.set(0, 5, 23);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Massive Elliptical Stellar Bulge
      const bCount = 5500;
      const bPos = new Float32Array(bCount * 3);
      for (let i = 0; i < bCount; i++) {
        const u = Math.random();
        const r = Math.pow(u, 2.0) * 4.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0);
        bPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        bPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
        bPos[i * 3 + 2] = r * Math.cos(phi);
      }
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
      const bulge = new THREE.Points(bGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(bulge);

      // Dark Interstellar PAH Dust Ring
      const dCount = 4000;
      const dPos = new Float32Array(dCount * 3);
      for (let i = 0; i < dCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 6.0 + Math.random() * 2.2;
        dPos[i * 3] = Math.cos(theta) * rad;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
        dPos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
      const dustRing = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: c2, size: 0.13, blending: THREE.AdditiveBlending }));
      group.add(dustRing);

      group.rotation.x = 0.35;

      scene.userData = { group, bulge, dustRing, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.2) * 23;
      camera.position.z = Math.cos(t * 0.2) * 23;
      camera.position.y = 4 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
