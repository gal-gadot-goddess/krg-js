// visualizers/dna_origami_nanorobot_cube.js
// Autonomous DNA Origami Molecular Nanobox Hinge
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dna_origami_nanorobot_cube = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dna_origami_nanorobot_cube",
    title: "Autonomous DNA Origami Molecular Nanobox Hinge",
    fileName: "dna_origami.js",
    category: "Organic Physics & Bioluminescence",
    genre: "cyber",
    caption: "\ud83e\uddec Self-assembled 3D DNA origami hollow nanobox unfolding its molecular aptamer lid to release cancer drugs in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8a\n\n#threejs #webgl #dnaorigami #nanorobotics #biotechnology #nanomedicine #creativecoding #javascript #reels",
    
    displayCode: "// DNA Staple Strand Crossover Geometry\nfunction dnaStapleBinding(helixSpacing = 2.0, crossoverInterval = 10.5) {\n  const pitch = 3.4; // nm per helical turn\n  const rigidity = 50.0; // persistence length in nm\n  return { pitch, rigidity };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.6
    ],
    "boxSize": 4.5
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

      // Box Base Mesh
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 3.2, 4.5),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.6 })
      );
      group.add(base);

      // Hinged Lid Mesh
      const lidGeo = new THREE.BoxGeometry(4.5, 0.4, 4.5);
      lidGeo.translate(0, 0, 2.25);
      const lid = new THREE.Mesh(lidGeo, new THREE.MeshStandardMaterial({ color: c2, wireframe: true }));
      lid.position.set(0, 1.8, -2.25);
      group.add(lid);

      // Contained Molecular Drug Cargo
      const cargo = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: c2, emissiveIntensity: 0.8 })
      );
      group.add(cargo);

      scene.userData = { group, lid, cargo, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      // Lid opening/closing hinge oscillation
      const openAngle = Math.max(0, Math.sin(t * 1.5)) * (Math.PI * 0.65);
      data.lid.rotation.x = -openAngle;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
