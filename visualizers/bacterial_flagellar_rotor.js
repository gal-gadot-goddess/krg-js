// visualizers/bacterial_flagellar_rotor.js
// Bacterial Flagellar Motor Stator Ring Nanomachine
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bacterial_flagellar_rotor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bacterial_flagellar_rotor",
    title: "Bacterial Flagellar Motor Stator Ring Nanomachine",
    fileName: "flagellar_rotor.js",
    category: "Organic Physics & Bioluminescence",
    genre: "cyber",
    caption: "\ud83c\udf00 Ultra-efficient rotary bacterial flagellar nanomachine spinning at 100,000 RPM powered by proton flux in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #flagella #nanomachine #biomotor #bacteria #microbiology #creativecoding #javascript #reels",
    
    displayCode: "// Bacterial Flagellar Motor Torque Production\nfunction flagellarTorque(protonMotiveForce, nStators = 11) {\n  const torquePerStator = 200; // pN*nm\n  const totalTorque = nStators * torquePerStator * (protonMotiveForce / 150);\n  return totalTorque;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.8,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.95,
        0.8
    ],
    "statorCount": 11
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

      // MS Ring Rotor
      const rotor = new THREE.Mesh(
        new THREE.CylinderGeometry(2.4, 2.4, 1.2, 32),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(rotor);

      // Helical Flagellar Filament Tail
      const pts = [];
      for (let y = 0; y >= -10; y -= 0.15) {
        pts.push(new THREE.Vector3(Math.cos(y * 1.5) * 1.2, y, Math.sin(y * 1.5) * 1.2));
      }
      const flagGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const flagellum = new THREE.Line(flagGeo, new THREE.LineBasicMaterial({ color: c2, linewidth: 2.5 }));
      group.add(flagellum);

      scene.userData = { group, rotor, flagellum, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      data.rotor.rotation.y = t * 6.0;
      data.flagellum.rotation.y = t * 6.0;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
