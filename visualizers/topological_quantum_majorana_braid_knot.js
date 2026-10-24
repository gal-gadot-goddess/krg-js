// visualizers/topological_quantum_majorana_braid_knot.js
// Non-Abelian Anyon Worldline Majorana Quantum Braiding
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.topological_quantum_majorana_braid_knot = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "topological_quantum_majorana_braid_knot",
    title: "Non-Abelian Anyon Worldline Majorana Quantum Braiding",
    fileName: "majorana_braid.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\u269b\ufe0f Fault-tolerant topological quantum computation: non-Abelian anyon worldline braiding operations in 2+1 spacetime in Three.js! Follow @kreggsjs! \u26a1\ud83d\udcbb\n\n#threejs #webgl #majorana #quantumcomputing #anyons #braiding #topological #codeart",
    
    displayCode: "// Non-Abelian Anyon Braiding Matrix: R = exp(i * pi / 8 * sigma_z)\nfunction braidOperator(tau1, tau2) {\n  return 'Unitary Gate: Phase e^(i*pi/4)';\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.65
    ],
    "strands": 4
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

      // 4 Braided Worldline Strands (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const s = i % params.strands;
        const y = -7.0 + (i / pCount) * 14.0;
        const phase = y * 1.5 + (s * Math.PI / 2);
        const rad = 2.2 + Math.sin(y * 2.0) * 0.8;

        pPos[i * 3] = Math.cos(phase) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(phase) * rad;

        const col = (s % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const braid = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(braid);

      scene.userData = { group, braid, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.braid.rotation.y = t * 0.8;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
