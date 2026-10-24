// visualizers/primordial_black_hole_cluster.js
// Swarm of Primordial Micro-Black Holes & Hawking Flash
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.primordial_black_hole_cluster = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "primordial_black_hole_cluster",
    title: "Swarm of Primordial Micro-Black Holes & Hawking Flash",
    fileName: "primordial_black_holes.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udd73\ufe0f Swarm of primordial asteroid-mass micro-singularities formed in the Big Bang undergoing gravitational capture in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u26a1\n\n#threejs #webgl #blackhole #primordial #hawking #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Primordial Black Hole Hawking Evaporation Flash\nfunction hawkingEvaporationLuminosity(M) {\n  const hbar = 1.054e-27, c = 3e10, G = 6.67e-8;\n  const L_H = (hbar * Math.pow(c, 6)) / (15360 * Math.PI * G * G * M * M);\n  return L_H; // explosive terminal burst\n}",

    defaultParams: {
    "primaryColor": [
        0.9,
        0.3,
        1.0
    ],
    "secondaryColor": [
        0.1,
        0.95,
        0.8
    ],
    "holeCount": 60
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

      const count = params.holeCount;
      const holes = [];

      for (let i = 0; i < count; i++) {
        const rad = 2.0 + Math.random() * 8.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0);

        const hGroup = new THREE.Group();
        hGroup.position.set(
          rad * Math.sin(phi) * Math.cos(theta),
          rad * Math.sin(phi) * Math.sin(theta),
          rad * Math.cos(phi)
        );

        // Micro horizon
        const mMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        hGroup.add(mMesh);

        // Luminous micro accretion ring
        const rMesh = new THREE.Mesh(
          new THREE.RingGeometry(0.4, 0.85, 24),
          new THREE.MeshBasicMaterial({ color: (i % 2 === 0 ? c1 : c2), side: THREE.DoubleSide })
        );
        rMesh.rotation.x = Math.PI / 2;
        hGroup.add(rMesh);

        group.add(hGroup);
        holes.push({ group: hGroup, rad, theta, speed: 0.2 + Math.random() * 0.4 });
      }

      scene.userData = { group, holes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.15;
      data.holes.forEach(h => {
        h.theta += h.speed * 0.03;
        h.group.position.x = Math.cos(h.theta) * h.rad;
        h.group.position.z = Math.sin(h.theta) * h.rad;
      });

      camera.position.x = Math.sin(t * 0.25) * 24;
      camera.position.z = Math.cos(t * 0.25) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
