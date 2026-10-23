// visualizers/saturn_hexagonal_rings.js
// Saturn Rings & Polar Hexagon
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.saturn_hexagonal_rings = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "saturn_hexagonal_rings",
    title: "Saturn Rings & Polar Hexagon",
    fileName: "saturn_rings.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83e\ude90 Majestic Saturnian ring system & polar atmospheric hexagonal jet stream! 12,000 Keplerian particles orbiting in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\ud83e\ude90\n\n#threejs #webgl #saturn #astronomy #space #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Keplerian Orbital Dynamics in Saturnian Planetary Rings\nfunction generateRingParticles(count = 12000, rMin = 4.2, rMax = 11.5) {\n  const pos = new Float32Array(count * 3);\n  for (let i = 0; i < count; i++) {\n    // Cassini division gap at r ~ 7.2\n    let r = rMin + Math.random() * (rMax - rMin);\n    if (r > 6.9 && r < 7.4 && Math.random() < 0.85) r += 0.6; // Gap\n    const theta = Math.random() * Math.PI * 2;\n    pos[i * 3 + 0] = Math.cos(theta) * r;\n    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;\n    pos[i * 3 + 2] = Math.sin(theta) * r;\n  }\n  return pos;\n}",

    defaultParams: {
    "planetRadius": 2.8,
    "ringParticles": 12000,
    "primaryColor": [
        0.95,
        0.85,
        0.65
    ],
    "secondaryColor": [
        0.65,
        0.5,
        0.35
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
      group.rotation.x = 0.45; // Saturn axial tilt

      // Planet Sphere
      const pGeo = new THREE.SphereGeometry(params.planetRadius, 40, 40);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xe0c896, wireframe: true });
      const planet = new THREE.Mesh(pGeo, pMat);
      group.add(planet);

      // Polar Hexagon Ring
      const hexPoints = [];
      for (let h = 0; h <= 6; h++) {
        const ha = (h / 6) * Math.PI * 2;
        hexPoints.push(new THREE.Vector3(Math.cos(ha) * 1.4, params.planetRadius * 0.95, Math.sin(ha) * 1.4));
      }
      const hexGeo = new THREE.BufferGeometry().setFromPoints(hexPoints);
      const hexLine = new THREE.Line(hexGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 }));
      group.add(hexLine);

      // Rings (12,000 particles)
      const rCount = params.ringParticles;
      const rPos = new Float32Array(rCount * 3);
      const rCol = new Float32Array(rCount * 3);
      for (let i = 0; i < rCount; i++) {
        let r = 4.0 + Math.pow(Math.random(), 0.9) * 8.0;
        if (r > 7.1 && r < 7.6 && Math.random() < 0.9) r += 0.6; // Cassini Division
        const th = Math.random() * Math.PI * 2;
        rPos[i * 3 + 0] = Math.cos(th) * r;
        rPos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        rPos[i * 3 + 2] = Math.sin(th) * r;

        const shade = 0.6 + Math.random() * 0.4;
        rCol[i * 3 + 0] = params.primaryColor[0] * shade;
        rCol[i * 3 + 1] = params.primaryColor[1] * shade;
        rCol[i * 3 + 2] = params.primaryColor[2] * shade;
      }
      const rGeo = new THREE.BufferGeometry();
      rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
      rGeo.setAttribute('color', new THREE.BufferAttribute(rCol, 3));
      const rMat = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, blending: THREE.AdditiveBlending });
      const rings = new THREE.Points(rGeo, rMat);
      group.add(rings);

      scene.userData = { group, planet, rings, hexLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.planet.rotation.y = t * 0.6;
      data.rings.rotation.y = t * 0.35;
      data.hexLine.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
