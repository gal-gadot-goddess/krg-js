// visualizers/neural_synaptic_plasticity_stdp_hebbian_network.js
// Spike-Timing-Dependent Plasticity (STDP) Synaptic Graph
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.neural_synaptic_plasticity_stdp_hebbian_network = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "neural_synaptic_plasticity_stdp_hebbian_network",
    title: "Spike-Timing-Dependent Plasticity (STDP) Synaptic Graph",
    fileName: "stdp_neural_network.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83e\udde0 Neuromorphic computing: Spike-Timing-Dependent Plasticity (STDP) Hebbian rewiring and dendritic spine growth in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udcbb\n\n#threejs #webgl #neuralnetworks #neuromorphic #neuroscience #ai #stdp #codeart",
    
    displayCode: "// STDP Synaptic Weight Modification Function Delta_w\nfunction stdpWeightUpdate(delta_t, A_plus, A_minus, tau) {\n  return (delta_t > 0)\n    ? A_plus * Math.exp(-delta_t / tau)\n    : -A_minus * Math.exp(delta_t / tau);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.55
    ],
    "neuronCount": 42
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

      // Somata Nodes
      const somata = [];
      for (let i = 0; i < params.neuronCount; i++) {
        const pos = new THREE.Vector3((Math.random() - 0.5) * 15.0, (Math.random() - 0.5) * 15.0, (Math.random() - 0.5) * 15.0);
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: c1 }));
        node.position.copy(pos);
        group.add(node);
        somata.push(pos);
      }

      // 20,000 Action Potential Axon Signal Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const sA = somata[i % somata.length];
        const sB = somata[(i * 3 + 1) % somata.length];
        const u = Math.random();

        pPos[i * 3] = THREE.MathUtils.lerp(sA.x, sB.x, u);
        pPos[i * 3 + 1] = THREE.MathUtils.lerp(sA.y, sB.y, u);
        pPos[i * 3 + 2] = THREE.MathUtils.lerp(sA.z, sB.z, u);

        const col = (u < 0.5) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const spikes = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(spikes);

      scene.userData = { group, spikes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
