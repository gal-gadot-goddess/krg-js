// visualizers/kuiper_asteroid_swarm.js
// Kuiper Belt Asteroid Swarm
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kuiper_asteroid_swarm = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "kuiper_asteroid_swarm",
    title: "Kuiper Belt Asteroid Swarm",
    fileName: "kuiper_belt.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83e\udea8 Swarm of thousands of primordial tumbling icy planetesimals in the outer Solar System! Dynamic N-body Keplerian disk in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #asteroid #kuiperbelt #astronomy #space #creativecoding #javascript #reels",
    
    displayCode: "// Resonant Kuiper Belt Asteroid Orbits\nfunction buildAsteroidBelt(asteroidCount = 600, rMin = 6.0, rMax = 14.0) {\n  const meshGroup = new THREE.Group();\n  const baseGeos = [new THREE.DodecahedronGeometry(0.3, 0), new THREE.IcosahedronGeometry(0.25, 0)];\n  for (let a = 0; a < asteroidCount; a++) {\n    const geo = baseGeos[a % 2];\n    const mesh = new THREE.Mesh(geo, rockMat);\n    const r = rMin + Math.random() * (rMax - rMin);\n    const th = Math.random() * Math.PI * 2;\n    mesh.position.set(Math.cos(th)*r, (Math.random()-0.5)*1.2, Math.sin(th)*r);\n    meshGroup.add(mesh);\n  }\n  return meshGroup;\n}",

    defaultParams: {
    "asteroidCount": 8500,
    "rMin": 5.0,
    "rMax": 15.0,
    "primaryColor": [
        0.85,
        0.85,
        0.95
    ],
    "secondaryColor": [
        0.35,
        0.55,
        0.85
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

      camera.position.set(0, 9, 21);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.asteroidCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = params.rMin + Math.pow(Math.random(), 0.9) * (params.rMax - params.rMin);
        const th = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = Math.cos(th) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1.4;
        pos[i * 3 + 2] = Math.sin(th) * r;

        const shade = 0.5 + Math.random() * 0.5;
        col[i * 3 + 0] = params.primaryColor[0] * shade;
        col[i * 3 + 1] = params.primaryColor[1] * shade;
        col[i * 3 + 2] = params.primaryColor[2] * shade;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const swarm = new THREE.Points(geo, mat);
      group.add(swarm);

      scene.userData = { group, swarm, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.25) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
