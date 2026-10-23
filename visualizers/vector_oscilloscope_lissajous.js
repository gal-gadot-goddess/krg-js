// visualizers/vector_oscilloscope_lissajous.js
// 3D Oscilloscope Lissajous Harmonic
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.vector_oscilloscope_lissajous = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "vector_oscilloscope_lissajous",
    title: "3D Oscilloscope Lissajous Harmonic",
    fileName: "oscilloscope_3d.js",
    category: "Cyberpunk & Digital Systems",
    genre: "techno",
    caption: "\ud83d\udcdf Vintage CRT oscilloscope electron beam tracing intricate 3D Lissajous harmonic resonant knots in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf0a\n\n#threejs #webgl #oscilloscope #lissajous #harmonics #creativecoding #javascript #mathart #reels",
    
    displayCode: "// 3D Harmonic Lissajous Knot Coordinates\nfunction lissajous3DPoint(t, a = 3, b = 4, c = 5, delta = 0.5) {\n  const x = Math.sin(a * t + delta) * 5.2;\n  const y = Math.sin(b * t) * 5.2;\n  const z = Math.sin(c * t) * 5.2;\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "curvePoints": 800,
    "primaryColor": [
        0.15,
        0.98,
        0.45
    ],
    "secondaryColor": [
        0.2,
        0.9,
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

      const count = params.curvePoints;
      const pts = [];
      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.sin(3 * u) * 5, Math.sin(4 * u) * 5, Math.sin(5 * u) * 5));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 2
      });
      const curve = new THREE.Line(geo, mat);
      group.add(curve);

      scene.userData = { group, curve, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.7;
      data.group.rotation.y = t * 0.9;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
