// visualizers/cyber_glitch_tesseract.js
// RGB Glitch Prism Matrix
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cyber_glitch_tesseract = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cyber_glitch_tesseract",
    title: "RGB Glitch Prism Matrix",
    fileName: "glitch_tesseract.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\u26a1 RGB chromatic aberration split cyber prisms vibrating with high-frequency digital glitch noise in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd79\ufe0f\n\n#threejs #webgl #glitchart #cyberpunk #chromaticaberration #creativecoding #javascript #reels",
    
    displayCode: "// RGB Channel Splitting Glitch Displacement\nfunction glitchDisplacement(time, amplitude = 0.45) {\n  const isGlitchFrame = Math.random() < 0.25;\n  if (!isGlitchFrame) return { rOffset: 0, gOffset: 0, bOffset: 0 };\n  const rOffset = (Math.random() - 0.5) * amplitude;\n  const bOffset = -rOffset;\n  return { rOffset, gOffset: 0, bOffset };\n}",

    defaultParams: {
    "prismCount": 4,
    "primaryColor": [
        1.0,
        0.15,
        0.45
    ],
    "secondaryColor": [
        0.15,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const cubes = [];
      const colors = [0xff0055, 0x00ffcc, 0xffcc00];
      for (let c = 0; c < 3; c++) {
        const geo = new THREE.BoxGeometry(5.0, 5.0, 5.0);
        const mat = new THREE.MeshBasicMaterial({ color: colors[c], wireframe: true, transparent: true, opacity: 0.75 });
        const cube = new THREE.Mesh(geo, mat);
        group.add(cube);
        cubes.push(cube);
      }

      scene.userData = { group, cubes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.8;
      data.group.rotation.y = t * 1.1;

      // RGB Glitch vibration
      const glitch = Math.random() < 0.2;
      data.cubes[0].position.x = glitch ? (Math.random() - 0.5) * 0.8 : 0;
      data.cubes[1].position.y = glitch ? (Math.random() - 0.5) * 0.8 : 0;
      data.cubes[2].position.z = glitch ? (Math.random() - 0.5) * 0.8 : 0;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
