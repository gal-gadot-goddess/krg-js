// visualizers/planetary_nebula_hourglass.js
// Bipolar Planetary Nebula
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.planetary_nebula_hourglass = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "planetary_nebula_hourglass",
    title: "Bipolar Planetary Nebula",
    fileName: "planetary_nebula.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Luminous bipolar Hourglass Planetary Nebula formed by dying asymptotic giant branch star! Relativistic gas expansion in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\u2728\n\n#threejs #webgl #nebula #astronomy #space #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Bipolar Hourglass Gas Expansion Coordinates\nfunction calculateHourglassLobes(count = 9000, waistR = 1.2, lobeLength = 9.0) {\n  const pos = new Float32Array(count * 3);\n  for (let i = 0; i < count; i++) {\n    const sign = i % 2 === 0 ? 1 : -1;\n    const y = sign * Math.pow(Math.random(), 0.8) * lobeLength;\n    const r = waistR + Math.pow(Math.abs(y) / lobeLength, 1.4) * 5.2;\n    const th = Math.random() * Math.PI * 2;\n    pos[i * 3 + 0] = Math.cos(th) * r;\n    pos[i * 3 + 1] = y;\n    pos[i * 3 + 2] = Math.sin(th) * r;\n  }\n  return pos;\n}",

    defaultParams: {
    "gasParticles": 9500,
    "lobeLength": 8.5,
    "primaryColor": [
        0.95,
        0.25,
        0.65
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 2, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Central white dwarf
      const starGeo = new THREE.SphereGeometry(0.8, 24, 24);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Hourglass particles
      const count = params.gasParticles;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const u = Math.pow(Math.random(), 0.9);
        const y = sign * u * params.lobeLength;
        const r = 1.2 + Math.pow(u, 1.5) * 5.5 + (Math.random() - 0.5) * 0.4;
        const th = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = Math.cos(th) * r;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(th) * r;

        col[i * 3 + 0] = params.primaryColor[0] * u + params.secondaryColor[0] * (1 - u);
        col[i * 3 + 1] = params.primaryColor[1] * u + params.secondaryColor[1] * (1 - u);
        col[i * 3 + 2] = params.primaryColor[2] * u + params.secondaryColor[2] * (1 - u);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
      const nebula = new THREE.Points(geo, mat);
      group.add(nebula);

      scene.userData = { group, star, nebula, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.25;

      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = Math.sin(t * 0.35) * 6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
