// visualizers/collagen_triple_helix_fibril.js
// Tensile Collagen Triple-Helix Nanoscale Fibril
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.collagen_triple_helix_fibril = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "collagen_triple_helix_fibril",
    title: "Tensile Collagen Triple-Helix Nanoscale Fibril",
    fileName: "collagen_helix.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\ud83e\uddec Structural biology of connective tissue! Staggered Gly-Pro-Hyp collagen triple-helix fibril assembly in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcaa\n\n#threejs #webgl #collagen #triplehelix #structuralbiology #protein #creativecoding #javascript #reels",
    
    displayCode: "// Collagen Tropocollagen Staggered D-Periodicity\nfunction collagenFibrilDPeriod(z, D_band = 67.0) {\n  const overlapZone = (z % D_band) < 0.46 * D_band;\n  return { overlapZone }; // 67 nm banding pattern\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.4,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.9,
        0.85
    ],
    "length": 14
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
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 3 Intertwined Polypeptide Chains
      for (let s = 0; s < 3; s++) {
        const offset = (s / 3) * Math.PI * 2;
        const pts = [];
        for (let y = -7; y <= 7; y += 0.2) {
          const r = 1.2;
          pts.push(new THREE.Vector3(Math.cos(y * 1.8 + offset) * r, y, Math.sin(y * 1.8 + offset) * r));
        }
        const cGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const col = (s === 0 ? c1 : (s === 1 ? c2 : new THREE.Color(0xffffff)));
        const chain = new THREE.Line(cGeo, new THREE.LineBasicMaterial({ color: col, linewidth: 2.5 }));
        group.add(chain);
      }

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
