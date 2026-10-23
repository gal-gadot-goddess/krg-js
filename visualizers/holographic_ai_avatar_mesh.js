// visualizers/holographic_ai_avatar_mesh.js
// Holographic AI Neural Avatar
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.holographic_ai_avatar_mesh = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "holographic_ai_avatar_mesh",
    title: "Holographic AI Neural Avatar",
    fileName: "holographic_ai.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83e\udd16 3D polygonal holographic AI core wireframe with scanlines and neural thought pulse bursts in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\udde0\n\n#threejs #webgl #ai #hologram #cyberpunk #future #creativecoding #javascript #reels",
    
    displayCode: "// Holographic Scanline Shader Distortion\nfunction animateHoloScanlines(mesh, time, frequency = 8.0) {\n  const pos = mesh.geometry.attributes.position;\n  for (let i = 0; i < pos.count; i++) {\n    const y = pos.getY(i);\n    const glitch = Math.sin(y * frequency + time * 12.0) * 0.08;\n    pos.setZ(i, pos.getZ(i) + glitch);\n  }\n  pos.needsUpdate = true;\n}",

    defaultParams: {
    "headRadius": 4.2,
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.85,
        0.2,
        0.95
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

      // Polygonal head structure
      const hGeo = new THREE.IcosahedronGeometry(params.headRadius, 2);
      const hMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.8
      });
      const head = new THREE.Mesh(hGeo, hMat);
      group.add(head);

      // Scanning rings
      for (let r = 0; r < 3; r++) {
        const rg = new THREE.TorusGeometry(params.headRadius * 1.3 + r * 0.5, 0.04, 16, 64);
        const rm = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = r * 0.6;
        group.add(ring);
      }

      scene.userData = { group, head, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.7;
      data.head.rotation.x = Math.sin(t * 0.5) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
