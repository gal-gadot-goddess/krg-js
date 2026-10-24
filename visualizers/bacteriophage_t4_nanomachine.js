// visualizers/bacteriophage_t4_nanomachine.js
// Bacteriophage T4 Nanomachine DNA Injection Mechanism
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bacteriophage_t4_nanomachine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bacteriophage_t4_nanomachine",
    title: "Bacteriophage T4 Nanomachine DNA Injection Mechanism",
    fileName: "bacteriophage_t4.js",
    category: "Organic Physics & Bioluminescence",
    genre: "cyber",
    caption: "\ud83e\udda0 The biological lunar lander! Bacteriophage T4 viral nanomachine injecting genetic viral DNA into a bacterium in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #bacteriophage #virus #nanomachine #biology #molecular #creativecoding #javascript #reels",
    
    displayCode: "// Bacteriophage Tail Sheath Contraction Torque\nfunction tailSheathContraction(z, theta, contractionFactor = 0.6) {\n  const newHeight = z * contractionFactor;\n  const twistAngle = theta + (1.0 - contractionFactor) * Math.PI;\n  return { newHeight, twistAngle };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.4
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.7
    ],
    "legCount": 6
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
      camera.position.set(0, 2, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Icosahedral Head Capsid
      const head = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.4, 1),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true })
      );
      head.position.y = 4.5;
      group.add(head);

      // Contractile Tail Sheath Cylinder
      const tail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 4.0, 16, 8, true),
        new THREE.MeshStandardMaterial({ color: c2, wireframe: true })
      );
      tail.position.y = 1.8;
      group.add(tail);

      // Tail Fibers / Legs
      const legs = new THREE.Group();
      group.add(legs);
      const legCount = params.legCount;

      for (let i = 0; i < legCount; i++) {
        const phi = (i / legCount) * Math.PI * 2;
        const pts = [
          new THREE.Vector3(0, -0.2, 0),
          new THREE.Vector3(Math.cos(phi) * 1.8, -1.8, Math.sin(phi) * 1.8),
          new THREE.Vector3(Math.cos(phi) * 3.2, -3.8, Math.sin(phi) * 3.2)
        ];
        const leg = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: c1, linewidth: 2 })
        );
        legs.add(leg);
      }

      scene.userData = { group, head, tail, legs, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.head.rotation.y = t * 0.8;
      // Tail pulsing injection motion
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.08;
      data.tail.scale.set(1.0 / Math.sqrt(pulse), pulse, 1.0 / Math.sqrt(pulse));

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 2 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
