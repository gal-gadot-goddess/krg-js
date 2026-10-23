// visualizers/hawking_radiation_sphere.js
// Hawking Radiation & Horizon
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hawking_radiation_sphere = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hawking_radiation_sphere",
    title: "Hawking Radiation & Horizon",
    fileName: "hawking_radiation.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u269b\ufe0f Quantum field vacuum fluctuations at the black hole event horizon! Virtual particle separation emitting thermal Hawking radiation in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #hawkingradiation #quantumphysics #blackhole #creativecoding #javascript #space #reels",
    
    displayCode: "// Quantum Vacuum Pair Production at Event Horizon\nfunction emitHawkingPhotons(horizonRadius = 2.4, pairsPerFrame = 80) {\n  const escapes = [];\n  for (let i = 0; i < pairsPerFrame; i++) {\n    const theta = Math.random() * Math.PI * 2;\n    const phi = Math.acos(2 * Math.random() - 1);\n    // Real photon escapes with positive energy\n    const dir = new THREE.Vector3(\n      Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)\n    );\n    escapes.push(dir.multiplyScalar(horizonRadius + 0.1));\n  }\n  return escapes;\n}",

    defaultParams: {
    "horizonRadius": 2.2,
    "quantumParticles": 9000,
    "primaryColor": [
        1.0,
        0.95,
        0.4
    ],
    "secondaryColor": [
        0.4,
        0.7,
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

      camera.position.set(0, 0, 15);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Pitch black horizon
      const hGeo = new THREE.SphereGeometry(params.horizonRadius, 48, 48);
      const hMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const horizon = new THREE.Mesh(hGeo, hMat);
      group.add(horizon);

      // Photon sphere glow wireframe
      const gGeo = new THREE.SphereGeometry(params.horizonRadius * 1.1, 24, 24);
      const gMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 });
      const glow = new THREE.Mesh(gGeo, gMat);
      group.add(glow);

      // Evaporating Hawking Quanta (Particles)
      const count = params.quantumParticles;
      const qPos = new Float32Array(count * 3);
      const qCol = new Float32Array(count * 3);
      const qDirs = new Float32Array(count * 3);
      const qSpeeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const dx = Math.sin(ph) * Math.cos(th);
        const dy = Math.sin(ph) * Math.sin(th);
        const dz = Math.cos(ph);

        qDirs[i * 3 + 0] = dx;
        qDirs[i * 3 + 1] = dy;
        qDirs[i * 3 + 2] = dz;
        qSpeeds[i] = 1.0 + Math.random() * 2.5;

        qPos[i * 3 + 0] = dx * params.horizonRadius;
        qPos[i * 3 + 1] = dy * params.horizonRadius;
        qPos[i * 3 + 2] = dz * params.horizonRadius;

        qCol[i * 3 + 0] = params.primaryColor[0];
        qCol[i * 3 + 1] = params.primaryColor[1];
        qCol[i * 3 + 2] = params.primaryColor[2];
      }
      const qGeo = new THREE.BufferGeometry();
      qGeo.setAttribute('position', new THREE.BufferAttribute(qPos, 3));
      qGeo.setAttribute('color', new THREE.BufferAttribute(qCol, 3));
      const qMat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const quanta = new THREE.Points(qGeo, qMat);
      group.add(quanta);

      scene.userData = { group, glow, quanta, qDirs, qSpeeds, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.glow.rotation.x = t * 0.7;

      const pos = data.quanta.geometry.attributes.position;
      const count = data.count;
      const r0 = data.params.horizonRadius;
      for (let i = 0; i < count; i++) {
        const dist = r0 + ((t * data.qSpeeds[i] * 1.5 + i * 0.05) % 8.0);
        pos.setXYZ(
          i,
          data.qDirs[i * 3 + 0] * dist,
          data.qDirs[i * 3 + 1] * dist,
          data.qDirs[i * 3 + 2] * dist
        );
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.3) * 15;
      camera.position.z = Math.cos(t * 0.3) * 15;
      camera.position.y = Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
