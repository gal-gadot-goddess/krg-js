// visualizers/holographic_black_hole_ads_cft.js
// AdS/CFT Holographic Duality Bulk Spacetime Boundary
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.holographic_black_hole_ads_cft = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "holographic_black_hole_ads_cft",
    title: "AdS/CFT Holographic Duality Bulk Spacetime Boundary",
    fileName: "ads_cft_duality.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cosmic",
    caption: "\ud83c\udf0c Quantum entanglement on the conformal boundary encoding bulk anti-de Sitter gravity & black hole thermodynamics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #adscft #holography #stringtheory #blackhole #quantumgravity #creativecoding #javascript #reels",
    
    displayCode: "// Ryu-Takayanagi Holographic Entanglement Entropy\nfunction ryuTakayanagiEntropy(minimalArea_gamma, G_N = 1) {\n  // S_A = Area(gamma_A) / (4 * G_N)\n  const entropy = minimalArea_gamma / (4.0 * G_N);\n  return entropy;\n}",

    defaultParams: {
    "primaryColor": [
        0.65,
        0.2,
        0.95
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "bulkLayers": 10
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

      // Concentric AdS Radial Hyperbolic Shells
      const layers = params.bulkLayers;
      const shells = [];

      for (let i = 1; i <= layers; i++) {
        const rad = i * 0.65;
        const sMesh = new THREE.Mesh(
          new THREE.SphereGeometry(rad, 24, 24),
          new THREE.MeshStandardMaterial({
            color: (i === layers ? c2 : c1), wireframe: true, transparent: true, opacity: (i === layers ? 0.9 : 0.3)
          })
        );
        group.add(sMesh);
        shells.push(sMesh);
      }

      // Minimal Ryu-Takayanagi Geodesic Ribbon
      const rpts = [];
      for (let th = -Math.PI/2; th <= Math.PI/2; th += 0.1) {
        const rad = 6.5 * Math.cos(th);
        rpts.push(new THREE.Vector3(rad * Math.sin(th), 0, rad * Math.cos(th)));
      }
      const rGeo = new THREE.BufferGeometry().setFromPoints(rpts);
      const rtRibbon = new THREE.Line(rGeo, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
      group.add(rtRibbon);

      scene.userData = { group, shells, rtRibbon, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
