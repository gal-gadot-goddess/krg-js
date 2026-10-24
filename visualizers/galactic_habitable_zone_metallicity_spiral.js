// visualizers/galactic_habitable_zone_metallicity_spiral.js
// Milky Way Galactic Habitable Zone & Stellar Metallicity Drift
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.galactic_habitable_zone_metallicity_spiral = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "galactic_habitable_zone_metallicity_spiral",
    title: "Milky Way Galactic Habitable Zone & Stellar Metallicity Drift",
    fileName: "habitable_zone_spiral.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Galactic Habitable Zone ring spanning 7 to 9 kiloparsecs with life-harboring star systems in Three.js! Follow @kreggsjs for daily 3D code reels! \ud83e\ude90\u2728\n\n#threejs #webgl #galaxy #milkyway #habitablezone #astronomy #science #codeart",
    
    displayCode: "// Galactic Habitable Zone Radial Annulus (7 kpc to 9 kpc)\nfunction inGHZ(r_gal) {\n  const r_min = 7.0, r_max = 9.0;\n  return (r_gal >= r_min && r_gal <= r_max);\n}\nconst metallicity = [Fe/H]_0 * Math.exp(-r_gal / 3.5);",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.55
    ],
    "secondaryColor": [
        0.35,
        0.65,
        1.0
    ],
    "spiralArms": 4
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

      // Spiral galaxy stars (24,000 particles)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const arm = i % params.spiralArms;
        const armOffset = (arm * Math.PI * 2) / params.spiralArms;
        const r = 1.5 + Math.pow(Math.random(), 1.4) * 13.5;
        const angle = armOffset + r * 0.45 + (Math.random() - 0.5) * 0.6;
        const z = (Math.random() - 0.5) * (0.8 + (14.0 - r) * 0.1);

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = z;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        // Highlight Habitable Zone (r between 6.5 and 9.5)
        const isGHZ = (r >= 6.5 && r <= 9.5);
        const col = isGHZ ? c1 : c2.clone().multiplyScalar(0.6);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 1.2 / Math.sqrt(r) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const galaxy = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(galaxy);

      scene.userData = { group, galaxy, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.22;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 11 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
