// visualizers/oort_cloud_comet_tail.js
// Hyperbolic Comet & Ion Tail
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.oort_cloud_comet_tail = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "oort_cloud_comet_tail",
    title: "Hyperbolic Comet & Ion Tail",
    fileName: "comet_tail.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u2604\ufe0f Long-period comet diving around the Sun with dynamic ion and dust tails! Solar radiation pressure streaming in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #comet #astronomy #space #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Solar Wind Radiation Pressure Deflecting Comet Ion Tail\nfunction renderCometTail(nucleusPos, solarDir, particles = 6000) {\n  const tailPos = new Float32Array(particles * 3);\n  for (let i = 0; i < particles; i++) {\n    const age = Math.random();\n    const drift = Math.pow(age, 1.8) * 16.0;\n    tailPos[i * 3 + 0] = nucleusPos.x + solarDir.x * drift + (Math.random() - 0.5) * age * 2.2;\n    tailPos[i * 3 + 1] = nucleusPos.y + solarDir.y * drift + (Math.random() - 0.5) * age * 2.2;\n    tailPos[i * 3 + 2] = nucleusPos.z + solarDir.z * drift + (Math.random() - 0.5) * age * 2.2;\n  }\n  return tailPos;\n}",

    defaultParams: {
    "tailParticles": 7500,
    "tailLength": 16.0,
    "primaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.9,
        0.4
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

      camera.position.set(0, 3, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Comet Nucleus
      const nucGeo = new THREE.DodecahedronGeometry(0.8, 1);
      const nucMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nucleus = new THREE.Mesh(nucGeo, nucMat);
      group.add(nucleus);

      // Ion Tail (Cyan)
      const count = params.tailParticles;
      const tPos = new Float32Array(count * 3);
      const tCol = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const dist = Math.pow(u, 1.5) * params.tailLength;
        const spread = u * 2.2;
        tPos[i * 3 + 0] = -dist;
        tPos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        tPos[i * 3 + 2] = (Math.random() - 0.5) * spread;

        tCol[i * 3 + 0] = params.primaryColor[0];
        tCol[i * 3 + 1] = params.primaryColor[1];
        tCol[i * 3 + 2] = params.primaryColor[2];
      }
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      tGeo.setAttribute('color', new THREE.BufferAttribute(tCol, 3));
      const tMat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const tail = new THREE.Points(tGeo, tMat);
      group.add(tail);

      scene.userData = { group, nucleus, tail, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.nucleus.rotation.y = t * 1.5;
      data.nucleus.rotation.x = t * 1.0;

      // Comet orbital path
      const orbA = t * 0.6;
      data.group.position.x = Math.cos(orbA) * 6.0;
      data.group.position.y = Math.sin(orbA * 2) * 2.0;
      data.group.position.z = Math.sin(orbA) * 4.0;
      data.group.rotation.z = orbA;

      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = Math.sin(t * 0.3) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
