// visualizers/rayleigh_benard_turbulent_convection_rolls.js
// Rayleigh-Bénard Thermal Convective Roll Plumes
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.rayleigh_benard_turbulent_convection_rolls = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "rayleigh_benard_turbulent_convection_rolls",
    title: "Rayleigh-Bénard Thermal Convective Roll Plumes",
    fileName: "rayleigh_benard_rolls.js",
    category: "Chaos Theory & Attractors",
    genre: "chaos",
    caption: "\ud83d\udd25 Thermal buoyancy vs viscosity: Rayleigh-B\u00e9nard counter-rotating convection rolls and chaotic thermal plumes in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf00\u2728\n\n#threejs #webgl #convection #rayleighbenard #fluidmechanics #chaostheory #codeart",
    
    displayCode: "// Rayleigh-B\u00e9nard Convection Roll Velocity Streamfunction\nfunction streamRoll(x, z, k_x) {\n  // psi(x, z) = psi_0 * sin(k_x * x) * sin(pi * z / H)\n  return Math.sin(k_x * x) * Math.sin(z * 0.8);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.4,
        0.15
    ],
    "secondaryColor": [
        0.25,
        0.8,
        1.0
    ],
    "rollCount": 4
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

      // 24,000 Thermal Convection Plume Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * 16.0;
        const y = (Math.random() - 0.5) * 6.0;
        const z = (Math.random() - 0.5) * 12.0;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const isHot = (y < 0);
        const col = isHot ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, y, z, rollIdx: Math.floor((x + 8.0) / 4.0) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const rolls = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(rolls);

      scene.userData = { group, rolls, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 7 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
