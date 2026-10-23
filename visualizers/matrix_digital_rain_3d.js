// visualizers/matrix_digital_rain_3d.js
// 3D Volumetric Matrix Digital Rain
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.matrix_digital_rain_3d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "matrix_digital_rain_3d",
    title: "3D Volumetric Matrix Digital Rain",
    fileName: "matrix_rain.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udfe2 Volumetric 3D cascading Matrix phosphor code streams in cyberspace! 8,000 falling data packets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcbb\n\n#threejs #webgl #matrix #cyberpunk #codeart #javascript #creativecoding #terminal #reels",
    
    displayCode: "// Volumetric Phosphor Matrix Data Streams\nfunction updateMatrixRain(streams, speed = 4.2) {\n  const pos = streams.geometry.attributes.position;\n  const count = pos.count;\n  for (let i = 0; i < count; i++) {\n    let y = pos.getY(i) - speed * 0.1;\n    if (y < -12.0) y = 12.0; // Reset to top\n    pos.setY(i, y);\n  }\n  pos.needsUpdate = true;\n}",

    defaultParams: {
    "streamParticles": 8500,
    "fallSpeed": 5.2,
    "primaryColor": [
        0.15,
        0.98,
        0.35
    ],
    "secondaryColor": [
        0.85,
        1.0,
        0.5
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

      const count = params.streamParticles;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

        col[i * 3 + 0] = params.primaryColor[0];
        col[i * 3 + 1] = params.primaryColor[1];
        col[i * 3 + 2] = params.primaryColor[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending });
      const streamMesh = new THREE.Points(geo, mat);
      group.add(streamMesh);

      scene.userData = { group, streamMesh, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.streamMesh.geometry.attributes.position;
      const count = data.count;
      for (let i = 0; i < count; i++) {
        let y = pos.getY(i) - data.params.fallSpeed * 0.05;
        if (y < -12) y = 12;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
