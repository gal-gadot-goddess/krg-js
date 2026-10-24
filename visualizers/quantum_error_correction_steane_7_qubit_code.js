// visualizers/quantum_error_correction_steane_7_qubit_code.js
// Steane [[7,1,3]] Quantum Error Correction Stabilizer Polytope
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_error_correction_steane_7_qubit_code = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_error_correction_steane_7_qubit_code",
    title: "Steane [[7,1,3]] Quantum Error Correction Stabilizer Polytope",
    fileName: "steane_qec.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udd10 Fault-tolerant quantum computing: Steane [[7,1,3]] code measuring X & Z stabilizer syndromic parity operators in Three.js! Follow @kreggsjs for daily reels! \u269b\ufe0f\ud83d\udcbb\n\n#threejs #webgl #quantumcomputing #qec #steanecode #quantumerrorcorrection #codeart",
    
    displayCode: "// Steane [[7, 1, 3]] CSS Code Generator Matrix: G = [I_3 | P_3x4]\nfunction stabilizerCheck(x_syndrome, z_syndrome) {\n  return (x_syndrome === 0 && z_syndrome === 0) ? 'No Error' : 'Correction Applied';\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.75
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
    ],
    "octaRadius": 5.5
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

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 7 Physical Qubit Spheres
      for (let i = 0; i < 7; i++) {
        const u = (i / 7) * Math.PI * 2;
        const q = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), new THREE.MeshBasicMaterial({ color: (i < 3) ? c1 : c2 }));
        q.position.set(Math.cos(u) * params.octaRadius, (i % 2 === 0 ? 1 : -1) * 2.0, Math.sin(u) * params.octaRadius);
        group.add(q);
      }

      // Parity Syndrome Flow (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[i * 3] = params.octaRadius * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = params.octaRadius * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = params.octaRadius * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: 0xffffff, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
