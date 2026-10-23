// visualizers/hacker_terminal_hud_3d.js
// Volumetric Sci-Fi Terminal HUD
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hacker_terminal_hud_3d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hacker_terminal_hud_3d",
    title: "Volumetric Sci-Fi Terminal HUD",
    fileName: "terminal_hud.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udcbb Volumetric Iron Man sci-fi heads-up display with dynamic targeting telemetry rings in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\udd16\n\n#threejs #webgl #hud #scifi #ui #terminal #creativecoding #javascript #reels",
    
    displayCode: "// Circular HUD Reticle Gauges & Telemetry Rings\nfunction buildHUDReticle(ringRadius = 4.2) {\n  const reticle = new THREE.Group();\n  const ringGeo = new THREE.RingGeometry(ringRadius, ringRadius + 0.15, 64);\n  const ringMesh = new THREE.Mesh(ringGeo, hudCyanMat);\n  reticle.add(ringMesh);\n  // Crosshairs\n  const crossGeo = new THREE.BufferGeometry().setFromPoints([\n    new THREE.Vector3(-ringRadius*1.3, 0, 0), new THREE.Vector3(ringRadius*1.3, 0, 0),\n    new THREE.Vector3(0, -ringRadius*1.3, 0), new THREE.Vector3(0, ringRadius*1.3, 0)\n  ]);\n  reticle.add(new THREE.LineSegments(crossGeo, hudCyanMat));\n  return reticle;\n}",

    defaultParams: {
    "rings": 4,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
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

      const rings = [];
      for (let r = 0; r < 4; r++) {
        const rad = 2.5 + r * 1.5;
        const geo = new THREE.RingGeometry(rad, rad + 0.1, 48);
        const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(geo, mat);
        ring.position.z = (r - 2) * 1.5;
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.rings.forEach((r, idx) => {
        r.rotation.z = t * (0.8 + idx * 0.4) * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.x = Math.sin(t * 0.5) * 0.3;
      data.group.rotation.y = Math.cos(t * 0.5) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
