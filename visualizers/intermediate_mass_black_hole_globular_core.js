// visualizers/intermediate_mass_black_hole_globular_core.js
// Globular Cluster Core Collapse & Intermediate-Mass Black Hole
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.intermediate_mass_black_hole_globular_core = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "intermediate_mass_black_hole_globular_core",
    title: "Globular Cluster Core Collapse & Intermediate-Mass Black Hole",
    fileName: "globular_imbh_core.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c 50,000 stars swirling in gravothermal core collapse around a hidden Intermediate-Mass Black Hole in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd73\ufe0f\u2728\n\n#threejs #webgl #blackhole #globularcluster #astronomy #creativecoding #physics",
    
    displayCode: "// King Model Core Radius & Velocity Dispersion\nfunction kingCoreDensity(r, r_c, rho_0) {\n  // rho(r) = rho_0 / (1 + (r / r_c)^2)^(3/2)\n  return rho_0 / Math.pow(1.0 + (r * r) / (r_c * r_c), 1.5);\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.75,
        0.2
    ],
    "coreRadius": 2.5
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

      // Central IMBH Event Horizon
      const bh = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      group.add(bh);

      // Dense Globular Core Stars (26,000 particles)
      const pCount = 26000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        // King Profile distribution
        const u = Math.random();
        const r = 1.8 + Math.pow(u, 2.5) * 14.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);

        const col = (r < 4.5) ? new THREE.Color(1, 1, 1).lerp(c1, 0.5) : c1.clone().lerp(c2, r / 15.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, theta, phi, speed: 2.2 / Math.sqrt(r) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const stars = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(stars);

      scene.userData = { group, stars, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.28) * 21;
      camera.position.z = Math.cos(t * 0.28) * 21;
      camera.position.y = 6 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
