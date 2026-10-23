// visualizers/dyson_swarm_sphere.js
// Dyson Swarm Megastructure
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dyson_swarm_sphere = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dyson_swarm_sphere",
    title: "Dyson Swarm Megastructure",
    fileName: "dyson_swarm.js",
    category: "Astrophysics & Relativity",
    genre: "cyber",
    caption: "\u2600\ufe0f Type-II Civilization Dyson Swarm harvesting 100% of star energy output! Concentric rings of solar collectors in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #dysonsphere #megastructure #scifi #creativecoding #javascript #space #reels",
    
    displayCode: "// Multi-Orbital Concentric Dyson Rings\nfunction buildDysonSwarm(rings = 5, collectorsPerRing = 120) {\n  const swarmGroup = new THREE.Group();\n  for (let r = 0; r < rings; r++) {\n    const radius = 4.0 + r * 1.8;\n    const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);\n    const ringMesh = new THREE.Mesh(ringGeo, ringMat);\n    ringMesh.rotation.x = (r * Math.PI) / rings;\n    ringMesh.rotation.y = r * 0.4;\n    swarmGroup.add(ringMesh);\n  }\n  return swarmGroup;\n}",

    defaultParams: {
    "ringsCount": 6,
    "collectorUnits": 5000,
    "primaryColor": [
        1.0,
        0.8,
        0.2
    ],
    "secondaryColor": [
        0.1,
        0.95,
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

      camera.position.set(0, 4, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Central glowing Star
      const starGeo = new THREE.SphereGeometry(2.2, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xfff0aa });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Dyson Rings
      const ringGroup = new THREE.Group();
      group.add(ringGroup);
      const rings = [];
      for (let r = 0; r < params.ringsCount; r++) {
        const rad = 4.2 + r * 1.6;
        const rGeo = new THREE.TorusGeometry(rad, 0.05, 16, 120);
        const rMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
          wireframe: true, transparent: true, opacity: 0.75
        });
        const rm = new THREE.Mesh(rGeo, rMat);
        rm.rotation.x = (r * Math.PI) / params.ringsCount + 0.3;
        rm.rotation.y = r * 0.5;
        ringGroup.add(rm);
        rings.push(rm);
      }

      // Swarm Solar Collectors (Points)
      const cCount = params.collectorUnits;
      const cPos = new Float32Array(cCount * 3);
      for (let c = 0; c < cCount; c++) {
        const r = 4.0 + Math.random() * 8.0;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        cPos[c * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        cPos[c * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        cPos[c * 3 + 2] = Math.cos(ph) * r;
      }
      const cGeo = new THREE.BufferGeometry();
      cGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
      const cMat = new THREE.PointsMaterial({
        size: 0.12, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const collectors = new THREE.Points(cGeo, cMat);
      group.add(collectors);

      scene.userData = { group, rings, collectors, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      data.rings.forEach((ring, idx) => {
        ring.rotation.z = t * (0.4 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1);
      });
      data.collectors.rotation.y = -t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = Math.cos(t * 0.3) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
