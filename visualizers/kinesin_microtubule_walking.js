// visualizers/kinesin_microtubule_walking.js
// Dimeric Kinesin Motor Protein Walking on Microtubule
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kinesin_microtubule_walking = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "kinesin_microtubule_walking",
    title: "Dimeric Kinesin Motor Protein Walking on Microtubule",
    fileName: "kinesin_walking.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\ud83d\udc63 Hand-over-hand 8-nanometer steps! Molecular kinesin motor protein carrying synaptic cargo vesicles along a microtubule protofilament in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83e\udde0\n\n#threejs #webgl #kinesin #microtubule #molecularmotor #cellbiology #creativecoding #javascript #reels",
    
    displayCode: "// Kinesin Hand-Over-Hand Stepping Velocity\nfunction kinesinVelocity(ATP_conc, loadForce = 2.0) {\n  const V_max = 800; // nm/s\n  const K_m = 20; // microMolar\n  const v = (V_max * ATP_conc) / (K_m + ATP_conc) * Math.exp(-loadForce / 7.0);\n  return v; // 8 nm step per ATP hydrolyzed\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        0.4
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "trackLength": 16
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

      // Microtubule Hollow Cylinder (13 Protofilaments)
      const mtGeo = new THREE.CylinderGeometry(1.5, 1.5, 16, 24, 16, true);
      mtGeo.rotateZ(Math.PI / 2);
      const mtMat = new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true });
      const mt = new THREE.Mesh(mtGeo, mtMat);
      mt.position.y = -2.0;
      group.add(mt);

      // Kinesin Two Motor Heads
      const head1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6 }));
      const head2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.6 }));
      group.add(head1);
      group.add(head2);

      // Cargo Vesicle
      const cargo = new THREE.Mesh(
        new THREE.SphereGeometry(2.0, 24, 24),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true })
      );
      cargo.position.y = 2.5;
      group.add(cargo);

      scene.userData = { group, head1, head2, cargo, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      // Hand-over-hand step oscillation
      const stepPhase = t * 4.0;
      const h1x = Math.sin(stepPhase) * 1.2;
      const h1y = -0.5 + Math.max(0, Math.cos(stepPhase)) * 0.8;
      const h2x = -Math.sin(stepPhase) * 1.2;
      const h2y = -0.5 + Math.max(0, -Math.cos(stepPhase)) * 0.8;

      data.head1.position.set(h1x, h1y, 0);
      data.head2.position.set(h2x, h2y, 0);
      data.cargo.position.x = Math.sin(t * 0.5) * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
