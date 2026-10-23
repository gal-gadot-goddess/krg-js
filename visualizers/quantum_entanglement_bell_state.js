// visualizers/quantum_entanglement_bell_state.js
// Quantum Entanglement Bell State
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_entanglement_bell_state = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_entanglement_bell_state",
    title: "Quantum Entanglement Bell State",
    fileName: "quantum_entanglement.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\u269b\ufe0f Spooky action at a distance! Paired entangled photons in a maximally entangled Bell state in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #quantumentanglement #bellstate #quantumphysics #creativecoding #javascript #reels",
    
    displayCode: "// Maximally Entangled EPR Bell State: |Psi+> = (|01> + |10>) / sqrt(2)\nfunction emitEntangledPair(time, separation = 8.0) {\n  const pA = new THREE.Vector3(Math.cos(time * 3) * separation, 0, Math.sin(time * 3) * separation);\n  const pB = new THREE.Vector3(-pA.x, 0, -pA.z); // Anti-correlated\n  // Quantum state correlation bridge\n  const bridge = [pA, pB];\n  return { pA, pB, bridge };\n}",

    defaultParams: {
    "particleSpeed": 2.5,
    "entanglementStreams": 4500,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.75
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

      camera.position.set(0, 4, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Photon A and Photon B
      const sGeo = new THREE.SphereGeometry(1.0, 24, 24);
      const matA = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const matB = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const photonA = new THREE.Mesh(sGeo, matA);
      const photonB = new THREE.Mesh(sGeo, matB);
      group.add(photonA);
      group.add(photonB);

      // Entanglement bridge lines
      const bPts = [new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)];
      const bGeo = new THREE.BufferGeometry().setFromPoints(bPts);
      const bMat = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.8 });
      const bridge = new THREE.Line(bGeo, bMat);
      group.add(bridge);

      // Entangled wave trails
      const count = params.entanglementStreams;
      const tPos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        tPos[i * 3 + 0] = (Math.random() - 0.5) * 16;
        tPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
        tPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      const tMat = new THREE.PointsMaterial({ size: 0.12, color: 0x22d3ee, blending: THREE.AdditiveBlending });
      const trails = new THREE.Points(tGeo, tMat);
      group.add(trails);

      scene.userData = { group, photonA, photonB, bridge, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const dist = 5.5 + Math.sin(t * 1.5) * 1.5;
      const theta = t * 2.2;
      data.photonA.position.set(Math.cos(theta) * dist, Math.sin(t * 3) * 1.2, Math.sin(theta) * dist);
      data.photonB.position.set(-Math.cos(theta) * dist, -Math.sin(t * 3) * 1.2, -Math.sin(theta) * dist);

      const bPos = data.bridge.geometry.attributes.position;
      bPos.setXYZ(0, data.photonA.position.x, data.photonA.position.y, data.photonA.position.z);
      bPos.setXYZ(1, data.photonB.position.x, data.photonB.position.y, data.photonB.position.z);
      bPos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 4 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
