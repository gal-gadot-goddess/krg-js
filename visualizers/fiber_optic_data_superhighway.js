// visualizers/fiber_optic_data_superhighway.js
// Fiber Optic Data Superhighway
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.fiber_optic_data_superhighway = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "fiber_optic_data_superhighway",
    title: "Fiber Optic Data Superhighway",
    fileName: "fiber_optic.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udca1 Bundled terabit fiber optic glass cables with high-frequency photon laser packet bursts in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf10\n\n#threejs #webgl #fiberoptic #telecom #datacom #network #creativecoding #javascript #reels",
    
    displayCode: "// Terabit Fiber Optic Pulse Propagation\nfunction createFiberOpticStrands(strands = 16, length = 20) {\n  const fiberGroup = new THREE.Group();\n  for (let s = 0; s < strands; s++) {\n    const ang = (s / strands) * Math.PI * 2;\n    const curve = new THREE.CatmullRomCurve3([\n      new THREE.Vector3(Math.cos(ang)*2.0, -length/2, Math.sin(ang)*2.0),\n      new THREE.Vector3(Math.sin(ang)*3.5, 0, Math.cos(ang)*3.5),\n      new THREE.Vector3(Math.cos(ang)*2.0, length/2, Math.sin(ang)*2.0)\n    ]);\n    const tube = new THREE.TubeGeometry(curve, 40, 0.08, 8, false);\n    fiberGroup.add(new THREE.Mesh(tube, glassMat));\n  }\n  return fiberGroup;\n}",

    defaultParams: {
    "strandCount": 20,
    "packetCount": 3500,
    "primaryColor": [
        0.1,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.7
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      for (let s = 0; s < params.strandCount; s++) {
        const a = (s / params.strandCount) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(a) * 2.5, -9, Math.sin(a) * 2.5),
          new THREE.Vector3(Math.sin(a * 2) * 4.5, 0, Math.cos(a * 2) * 4.5),
          new THREE.Vector3(Math.cos(a) * 2.5, 9, Math.sin(a) * 2.5)
        ]);
        const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.06, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
        group.add(new THREE.Mesh(tubeGeo, tubeMat));
      }

      // Laser packets (Particles)
      const count = params.packetCount;
      const pPos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pPos[i * 3 + 0] = (Math.random() - 0.5) * 6;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.16, color: 0xffffff, blending: THREE.AdditiveBlending });
      const packets = new THREE.Points(pGeo, pMat);
      group.add(packets);

      scene.userData = { group, packets, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;

      const pos = data.packets.geometry.attributes.position;
      for (let i = 0; i < data.count; i++) {
        let y = pos.getY(i) + 0.35;
        if (y > 9) y = -9;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
