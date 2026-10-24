// visualizers/atp_synthase_molecular_motor.js
// Rotary F1-Fo ATP Synthase Molecular Turbine
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.atp_synthase_molecular_motor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "atp_synthase_molecular_motor",
    title: "Rotary F1-Fo ATP Synthase Molecular Turbine",
    fileName: "atp_synthase.js",
    category: "Organic Physics & Bioluminescence",
    genre: "cyber",
    caption: "\u26a1 Nature's nano-turbine spinning at 9,000 RPM! F1-Fo ATP Synthase generating cellular chemical energy (ATP) in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udd0b\n\n#threejs #webgl #atpsynthase #molecularmotor #biochemistry #nanotechnology #creativecoding #javascript #reels",
    
    displayCode: "// ATP Synthase Proton-Motive Force & Rotary Torque\nfunction atpRotaryTorque(delta_pH, delta_psi) {\n  const pmf = delta_psi - 2.3 * (8.314 * 310 / 96485) * delta_pH;\n  const torque = pmf * 3.0 * (100 / 12); // pN*nm per step\n  return { pmf, torque };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.75,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "subunits": 12
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
      camera.position.set(0, 3, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Fo Membrane Rotor Ring (c-ring)
      const cRing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 1.8, params.subunits, 1, true),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      cRing.position.y = 3.5;
      group.add(cRing);

      // Central Asymmetric Stalk (gamma subunit)
      const stalk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 4.0, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      stalk.position.y = 1.0;
      group.add(stalk);

      // F1 Catalytic Hexamer (alpha-3 beta-3)
      const f1Head = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.2, 2.2, 6),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.4, wireframe: true })
      );
      f1Head.position.y = -1.8;
      group.add(f1Head);

      scene.userData = { group, cRing, stalk, f1Head, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      // High-speed rotary stepped motion of central rotor
      data.cRing.rotation.y = t * 5.0;
      data.stalk.rotation.y = t * 5.0;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 3 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
