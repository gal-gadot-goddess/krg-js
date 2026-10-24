// visualizers/gamma_ray_burst_hypernova.js
// Ultra-Relativistic Gamma-Ray Burst (GRB) Collapsar
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.gamma_ray_burst_hypernova = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "gamma_ray_burst_hypernova",
    title: "Ultra-Relativistic Gamma-Ray Burst (GRB) Collapsar",
    fileName: "hypernova_grb.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udca5 The most luminous explosion in the universe! Wolf-Rayet star core collapsar emitting ultra-relativistic Lorentz factor gamma jets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u26a1\n\n#threejs #webgl #gammarayburst #hypernova #lorentz #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Relativistic Beaming & Lorentz Factor Boost\nfunction lorentzBeaming(gamma = 300, theta = 0.02) {\n  const dopplerFactor = 1.0 / (gamma * (1.0 - Math.cos(theta)));\n  const fluxBoost = Math.pow(dopplerFactor, 4.0);\n  return { dopplerFactor, fluxBoost };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.85
    ],
    "jetResolution": 6000
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
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Hypernova Exploding Shell
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(2.0, 32, 32),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 1.2, wireframe: true })
      );
      group.add(core);

      // Collimated Relativistic Shock Cones
      const count = params.jetResolution;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const z = 1.0 + Math.random() * 14.0;
        const radius = (z * 0.12) * Math.sqrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(theta) * radius;
        pos[i * 3 + 1] = sign * z;
        pos[i * 3 + 2] = Math.sin(theta) * radius;

        const mix = z / 15.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const jetGeo = new THREE.BufferGeometry();
      jetGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      jetGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const gammaJets = new THREE.Points(jetGeo, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(gammaJets);

      scene.userData = { group, core, gammaJets, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.core.rotation.x = t * 1.0;

      const p = data.gammaJets.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        if (p[i+1] > 0) {
          p[i+1] += 0.3;
          if (p[i+1] > 15.0) p[i+1] = 1.0;
        } else {
          p[i+1] -= 0.3;
          if (p[i+1] < -15.0) p[i+1] = -1.0;
        }
      }
      data.gammaJets.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.3) * 24;
      camera.position.z = Math.cos(t * 0.3) * 24;
      camera.position.y = Math.sin(t * 0.2) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
