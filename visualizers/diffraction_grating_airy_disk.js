// visualizers/diffraction_grating_airy_disk.js
// Fraunhofer Wave Optics Circular Aperture Airy Disk Pattern
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.diffraction_grating_airy_disk = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "diffraction_grating_airy_disk",
    title: "Fraunhofer Wave Optics Circular Aperture Airy Disk Pattern",
    fileName: "airy_disk.js",
    category: "Cyberpunk & Digital Systems",
    genre: "ambient",
    caption: "\ud83c\udf08 Concentric Bessel optical wave diffraction rings and central central Airy disk diffraction limit in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #airydisk #diffraction #waveoptics #fourier #physics #creativecoding #javascript #reels",
    
    displayCode: "// Fraunhofer Circular Aperture Airy Pattern\nfunction airyIntensity(theta, k = 1.0, a = 2.0) {\n  const x = k * a * Math.sin(theta);\n  if (Math.abs(x) < 1e-4) return 1.0;\n  // J1(x) first order Bessel function approximation\n  const J1 = (Math.sin(x) / (x * x)) - (Math.cos(x) / x);\n  const I = Math.pow((2 * J1) / x, 2);\n  return I;\n}",

    defaultParams: {
    "primaryColor": [
        0.15,
        0.95,
        0.75
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.8
    ],
    "rings": 10
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

      const rings = new THREE.Group();
      group.add(rings);

      for (let r = 1; r <= params.rings; r++) {
        const rad = r * 0.75;
        const rGeo = new THREE.RingGeometry(rad - 0.06, rad + 0.06, 64);
        const col = (r % 2 === 0 ? c1 : c2);
        const rMesh = new THREE.Mesh(rGeo, new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide }));
        rings.add(rMesh);
      }

      scene.userData = { group, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.4;
      data.group.rotation.y = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
