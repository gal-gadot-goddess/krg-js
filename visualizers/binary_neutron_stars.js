// visualizers/binary_neutron_stars.js
// Binary Neutron Star Merger
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.binary_neutron_stars = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "binary_neutron_stars",
    title: "Binary Neutron Star Merger",
    fileName: "neutron_merger.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udcab Inspiraling binary neutron stars emitting gravitational wave chirps! Ultra-dense stellar collision in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd2d\n\n#threejs #webgl #gravitationalwaves #neutronstar #merger #physics #creativecoding #javascript #reels",
    
    displayCode: "// Gravitational Quadrupole Radiation & Binary Chirp\nfunction calculateBinaryOrbit(time, orbitalRadius = 4.0, chirpRate = 1.8) {\n  const r = Math.max(0.6, orbitalRadius - (time * 0.15) % orbitalRadius);\n  const omega = Math.pow(r, -1.5) * chirpRate;\n  const angle = time * omega;\n  const starA = new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r);\n  const starB = new THREE.Vector3(-Math.cos(angle) * r, 0, -Math.sin(angle) * r);\n  return { starA, starB, r };\n}",

    defaultParams: {
    "orbitRadius": 4.5,
    "waveRipples": 10,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.2,
        0.6
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

      camera.position.set(0, 8, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Star A & Star B
      const sGeo = new THREE.SphereGeometry(1.1, 32, 32);
      const matA = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const matB = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const starA = new THREE.Mesh(sGeo, matA);
      const starB = new THREE.Mesh(sGeo, matB);
      group.add(starA);
      group.add(starB);

      // Gravitational wave spiral ripples (Rings)
      const rings = [];
      for (let r = 0; r < params.waveRipples; r++) {
        const ringGeo = new THREE.TorusGeometry(3.0 + r * 1.4, 0.04, 16, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xa855f7, transparent: true, opacity: 0.6, wireframe: true
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, starA, starB, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const rBase = data.params.orbitRadius;
      const theta = t * 3.5;
      data.starA.position.set(Math.cos(theta) * rBase, 0, Math.sin(theta) * rBase);
      data.starB.position.set(-Math.cos(theta) * rBase, 0, -Math.sin(theta) * rBase);

      data.rings.forEach((ring, idx) => {
        const pulse = 1.0 + Math.sin(t * 4.0 - idx * 0.6) * 0.15;
        ring.scale.set(pulse, pulse, pulse);
      });

      camera.position.x = Math.sin(t * 0.3) * 18;
      camera.position.z = Math.cos(t * 0.3) * 18;
      camera.position.y = 8 + Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
