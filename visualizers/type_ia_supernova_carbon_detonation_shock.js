// visualizers/type_ia_supernova_carbon_detonation_shock.js
// Type Ia Supernova Thermonuclear Flame Front & Shock Wave
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.type_ia_supernova_carbon_detonation_shock = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "type_ia_supernova_carbon_detonation_shock",
    title: "Type Ia Supernova Thermonuclear Flame Front & Shock Wave",
    fileName: "supernova_ia_shock.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udca5 White dwarf runaway carbon fusion deflagration-to-detonation Type Ia supernova shock wave in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf0c\ud83d\udd25\n\n#threejs #webgl #supernova #astronomy #physics #creativecoding #codeart",
    
    displayCode: "// Chandrasekhar Mass Limit Carbon Runaway\nfunction detonationVelocity(rho_c, q_nuc) {\n  // D = sqrt(2 * (gamma^2 - 1) * q_nuc)\n  return Math.sqrt(2.0 * (1.333 * 1.333 - 1.0) * q_nuc);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.9,
        0.4
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.35
    ],
    "shockRadius": 8.0
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

      // Expanding Turbulent Shock Shell (25,000 particles)
      const pCount = 25000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const baseR = 3.0 + Math.random() * 8.0;

        pPos[i * 3] = baseR * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = baseR * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = baseR * Math.cos(phi);

        const col = c1.clone().lerp(c2, (baseR - 3.0) / 8.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ theta, phi, baseR, speed: 1.5 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const shock = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(shock);

      scene.userData = { group, shock, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.shock.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const r = it.baseR + ((t * it.speed) % 8.0);
        pos[i * 3] = r * Math.sin(it.phi) * Math.cos(it.theta);
        pos[i * 3 + 1] = r * Math.sin(it.phi) * Math.sin(it.theta);
        pos[i * 3 + 2] = r * Math.cos(it.phi);
      }
      data.shock.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
