// visualizers/solitary_rossby_planetary_wave.js
// Coriolis Non-Linear Planetary Rossby Solitary Wave
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.solitary_rossby_planetary_wave = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "solitary_rossby_planetary_wave",
    title: "Coriolis Non-Linear Planetary Rossby Solitary Wave",
    fileName: "rossby_wave.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83c\udf0d Giant planetary Rossby meanders & solitary modon vortex pairs driven by the Coriolis beta-effect in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #rossbywave #geophysicalfluid #coriolis #meteorology #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Planetary Rossby Wave Dispersion Relation\nfunction rossbyDispersion(k, l, beta = 2.28e-11) {\n  const omega = -(beta * k) / (k * k + l * l);\n  const phaseVelocity = omega / k; // westward propagation\n  return { omega, phaseVelocity };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.6
    ],
    "gridU": 48
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
      camera.aspect = 1080 / 1920;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 6, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridU;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const x = -7.0 + (i / n) * 14.0;
        for (let j = 0; j <= n; j++) {
          const z = -4.0 + (j / n) * 8.0;
          pts.push(x, 0, z);
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);
      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const waveMesh = new THREE.Mesh(geo, mat);
      group.add(waveMesh);

      scene.userData = { group, waveMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const pos = data.waveMesh.geometry.attributes.position;
      const n = data.params.gridU;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -7.0 + (i / n) * 14.0;
        for (let j = 0; j <= n; j++) {
          const z = -4.0 + (j / n) * 8.0;
          const y = Math.sin(x * 1.2 - t * 2.5) * Math.cos(z * 0.8) * 1.8;
          pos.setY(idx++, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 6 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
