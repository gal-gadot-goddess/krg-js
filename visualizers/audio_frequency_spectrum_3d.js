// visualizers/audio_frequency_spectrum_3d.js
// 3D Circular Audio Spectrogram
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.audio_frequency_spectrum_3d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "audio_frequency_spectrum_3d",
    title: "3D Circular Audio Spectrogram",
    fileName: "audio_spectrum.js",
    category: "Cyberpunk & Digital Systems",
    genre: "techno",
    caption: "\ud83c\udfb5 3D Radial audio frequency FFT equalizer spectrum bars pulsating with bass waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd0a\u2728\n\n#threejs #webgl #audiovisualizer #equalizer #creativecoding #javascript #vfx #reels",
    
    displayCode: "// Circular 3D FFT Frequency Bar Extrusion\nfunction renderCircularSpectrogram(bars = 64, radius = 4.5, time = 0) {\n  const barMeshes = [];\n  for (let i = 0; i < bars; i++) {\n    const angle = (i / bars) * Math.PI * 2;\n    // Simulated bass/mid FFT frequency response\n    const freqHeight = 0.5 + Math.pow(Math.sin(i * 0.2 + time * 6.0), 2) * 3.5;\n    const mesh = new THREE.Mesh(boxGeo, neonMat);\n    mesh.position.set(Math.cos(angle)*radius, freqHeight/2, Math.sin(angle)*radius);\n    mesh.scale.set(0.2, freqHeight, 0.2);\n    barMeshes.push(mesh);\n  }\n  return barMeshes;\n}",

    defaultParams: {
    "barCount": 64,
    "radius": 4.8,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.65
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

      camera.position.set(0, 8, 16);
      camera.lookAt(0, 1, 0);

      const group = new THREE.Group();
      scene.add(group);

      const bars = [];
      const count = params.barCount;
      const bGeo = new THREE.BoxGeometry(0.25, 1, 0.25);

      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const col = new THREE.Color();
        col.setHSL(i / count, 0.9, 0.6);
        const bMat = new THREE.MeshBasicMaterial({ color: col });
        const m = new THREE.Mesh(bGeo, bMat);
        m.position.set(Math.cos(a) * params.radius, 0, Math.sin(a) * params.radius);
        group.add(m);
        bars.push(m);
      }

      scene.userData = { group, bars, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.5;

      data.bars.forEach((b, idx) => {
        const wave = 0.5 + Math.pow(Math.sin(idx * 0.25 + t * 6.0), 2) * 4.2;
        b.scale.y = wave;
        b.position.y = wave / 2;
      });

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 7 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 1, 0);

      renderer.render(scene, camera);
    }
  };
});
