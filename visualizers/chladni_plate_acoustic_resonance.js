// visualizers/chladni_plate_acoustic_resonance.js
// Chladni Plate Acoustic Resonance
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chladni_plate_acoustic_resonance = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chladni_plate_acoustic_resonance",
    title: "Chladni Plate Acoustic Resonance",
    fileName: "chladni_resonance.js",
    category: "Organic Physics & Bioluminescence",
    genre: "sacred",
    caption: "\ud83d\udd0a Ernst Chladni acoustic sound vibration nodal geometries! Resonant standing waves organizing sand in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #chladni #cymatics #acoustics #resonance #sacredgeometry #javascript #reels",
    
    displayCode: "// 2D Chladni Resonance Nodal Equations: w = a*sin(nx)*sin(my) - b*sin(mx)*sin(ny)\nfunction evaluateChladniNodalPattern(x, y, n = 3, m = 5) {\n  const term1 = Math.sin(n * x) * Math.sin(m * y);\n  const term2 = Math.sin(m * x) * Math.sin(n * y);\n  return Math.abs(term1 - term2); // Nodal lines occur where w ~ 0\n}",

    defaultParams: {
    "sandParticles": 7500,
    "plateRadius": 5.2,
    "primaryColor": [
        1.0,
        0.85,
        0.3
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

      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.sandParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * params.plateRadius;
        pos[i * 3 + 0] = Math.cos(u) * r;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = Math.sin(u) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0xf59e0b });
      const sand = new THREE.Points(geo, mat);
      group.add(sand);

      scene.userData = { group, sand, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.sand.geometry.attributes.position;
      for (let i = 0; i < data.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const w = Math.sin(3 * x + t) * Math.sin(5 * z) - Math.sin(5 * x) * Math.sin(3 * z + t);
        pos.setY(i, Math.abs(w) * 0.4);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 8 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
