// visualizers/golden_ratio_phyllotaxis.js
// Golden Ratio Phyllotaxis Vortex
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.golden_ratio_phyllotaxis = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "golden_ratio_phyllotaxis",
    title: "Golden Ratio Phyllotaxis Vortex",
    fileName: "golden_phyllotaxis.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf3b Fibonacci golden angle (137.507\u00b0) Vogel spiral stardust vortex in 3D! Divine botanical mathematics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #fibonacci #goldenratio #phyllotaxis #sacredgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Vogel's Golden Angle Phyllotaxis Algorithm\nfunction generateGoldenSpiral(particleCount = 5000, c = 0.16) {\n  const phiAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees\n  const pos = new Float32Array(particleCount * 3);\n\n  for (let n = 0; n < particleCount; n++) {\n    const r = c * Math.sqrt(n);\n    const theta = n * phiAngle;\n    const z = Math.sin(n * 0.05) * (r * 0.35);\n    pos[n * 3 + 0] = Math.cos(theta) * r;\n    pos[n * 3 + 1] = Math.sin(theta) * r;\n    pos[n * 3 + 2] = z;\n  }\n  return pos;\n}",

    defaultParams: {
    "particleCount": 8500,
    "cScale": 0.14,
    "primaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.7
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

      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let n = 0; n < count; n++) {
        const r = params.cScale * Math.sqrt(n);
        const th = n * phi;
        pos[n * 3 + 0] = Math.cos(th) * r;
        pos[n * 3 + 1] = Math.sin(th) * r;
        pos[n * 3 + 2] = (Math.random() - 0.5) * 1.5;

        const u = n / count;
        col[n * 3 + 0] = params.primaryColor[0] * (1 - u) + params.secondaryColor[0] * u;
        col[n * 3 + 1] = params.primaryColor[1] * (1 - u) + params.secondaryColor[1] * u;
        col[n * 3 + 2] = params.primaryColor[2] * (1 - u) + params.secondaryColor[2] * u;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.5;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.45;
      data.group.rotation.y = Math.cos(t * 0.3) * 0.45;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
