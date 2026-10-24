// visualizers/photonic_topological_laser_array.js
// Topological Insulator Micro-Laser Array Edge Soliton
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.photonic_topological_laser_array = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "photonic_topological_laser_array",
    title: "Topological Insulator Micro-Laser Array Edge Soliton",
    fileName: "topological_laser.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udca1 Robust single-mode topological laser array immune to scattering and fabrication defects in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #topologicallaser #laserarray #optics #photonics #quantum #creativecoding #javascript #reels",
    
    displayCode: "// Non-Hermitian Topological Laser Resonance\nfunction topologicalLaserMode(gamma_gain, kappa_coupling) {\n  const thresholdLasing = gamma_gain > kappa_coupling;\n  return { thresholdLasing };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.2,
        0.4
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "arraySize": 6
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
      const n = params.arraySize;
      const lasers = new THREE.Group();
      group.add(lasers);

      for (let x = -n; x <= n; x += 2) {
        for (let y = -n; y <= n; y += 2) {
          const isEdge = Math.abs(x) === n || Math.abs(y) === n;
          const lMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 4.0, 16),
            new THREE.MeshStandardMaterial({
              color: isEdge ? c1 : 0x1e293b,
              emissive: isEdge ? c1 : 0x000000,
              emissiveIntensity: isEdge ? 0.9 : 0.0,
              wireframe: true
            })
          );
          lMesh.position.set(x * 1.2, y * 1.2, 0);
          lasers.add(lMesh);
        }
      }

      scene.userData = { group, lasers, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
