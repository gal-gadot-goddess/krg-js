// visualizers/cyber_core_reactor.js
// Tokamak Cyber Core Reactor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cyber_core_reactor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cyber_core_reactor",
    title: "Tokamak Cyber Core Reactor",
    fileName: "core_reactor.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\u26a1 Sci-fi magnetic confinement fusion cyber core reactor spinning with plasma arcs in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\ude80\ud83e\udd16\n\n#threejs #webgl #cyberpunk #reactor #fusion #scifi #creativecoding #javascript #reels",
    
    displayCode: "// Magnetic Toroidal Fusion Plasma Core\nfunction createCoreRings(ringCount = 5, radius = 4.5) {\n  const core = new THREE.Group();\n  for (let r = 0; r < ringCount; r++) {\n    const geo = new THREE.TorusGeometry(radius + r * 0.6, 0.12, 16, 64);\n    const ring = new THREE.Mesh(geo, neonMat);\n    ring.rotation.x = (r * Math.PI) / ringCount;\n    core.add(ring);\n  }\n  return core;\n}",

    defaultParams: {
    "ringsCount": 5,
    "coreRadius": 4.0,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Core plasma sphere
      const pGeo = new THREE.SphereGeometry(2.0, 32, 32);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const core = new THREE.Mesh(pGeo, pMat);
      group.add(core);

      // Magnetic gimbal rings
      const rings = [];
      for (let r = 0; r < params.ringsCount; r++) {
        const rGeo = new THREE.TorusGeometry(params.coreRadius + r * 0.6, 0.08, 16, 64);
        const rMat = new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x22d3ee : 0xf59e0b,
          wireframe: true, transparent: true, opacity: 0.8
        });
        const rm = new THREE.Mesh(rGeo, rMat);
        group.add(rm);
        rings.push(rm);
      }

      scene.userData = { group, core, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.core.rotation.y = t * 2.0;
      data.core.scale.setScalar(1.0 + Math.sin(t * 5.0) * 0.15);

      data.rings.forEach((ring, idx) => {
        ring.rotation.x = t * (0.8 + idx * 0.3) * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.y = t * (0.6 + idx * 0.2);
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
