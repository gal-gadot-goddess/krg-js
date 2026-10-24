// visualizers/chloroplast_thylakoid_grana.js
// Chloroplast Helical Thylakoid Grana Membrane Stacks
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.chloroplast_thylakoid_grana = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "chloroplast_thylakoid_grana",
    title: "Chloroplast Helical Thylakoid Grana Membrane Stacks",
    fileName: "chloroplast_grana.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\ud83c\udf43 Helical interconnecting thylakoid grana membrane stacks quantum energy funneling in plant chloroplasts in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u2600\ufe0f\n\n#threejs #webgl #chloroplast #photosynthesis #thylakoid #biology #biophysics #creativecoding #javascript #reels",
    
    displayCode: "// Exciton Energy Transfer Resonance\nfunction forsterEnergyTransfer(R, R0 = 5.0) {\n  const efficiency = 1.0 / (1.0 + Math.pow(R / R0, 6.0));\n  return efficiency; // quantum photosynthetic antenna\n}",

    defaultParams: {
    "primaryColor": [
        0.15,
        0.95,
        0.35
    ],
    "secondaryColor": [
        0.85,
        1.0,
        0.2
    ],
    "stackDiscs": 9
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
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.stackDiscs;
      const discs = [];

      for (let i = 0; i < count; i++) {
        const y = -4.0 + (i / count) * 8.0;
        const dGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.45, 32);
        const mix = i / count;
        const col = c1.clone().lerp(c2, mix);
        const dMat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.4, wireframe: true
        });
        const disc = new THREE.Mesh(dGeo, dMat);
        disc.position.y = y;
        group.add(disc);
        discs.push(disc);
      }

      scene.userData = { group, discs, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
