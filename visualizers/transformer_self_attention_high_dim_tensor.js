// visualizers/transformer_self_attention_high_dim_tensor.js
// Transformer Multi-Head Self-Attention Hypergraph
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.transformer_self_attention_high_dim_tensor = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "transformer_self_attention_high_dim_tensor",
    title: "Transformer Multi-Head Self-Attention Hypergraph",
    fileName: "transformer_attention.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83e\udd16 The architecture driving modern AI: Transformer scaled dot-product multi-head self-attention attention heads in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udcbb\n\n#threejs #webgl #transformer #llm #selfattention #ai #machinelearning #codeart",
    
    displayCode: "// Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V\nfunction attention(Q, K, d_k) {\n  return Math.exp(Q * K / Math.sqrt(d_k));\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.75
    ],
    "tokens": 28
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

      // Token Embedding Ring
      for (let i = 0; i < params.tokens; i++) {
        const u = (i / params.tokens) * Math.PI * 2;
        const tok = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: c1 }));
        tok.position.set(Math.cos(u) * 6.8, 0, Math.sin(u) * 6.8);
        group.add(tok);
      }

      // 20,000 Attention Weight Query-Key Flow Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const thA = Math.random() * Math.PI * 2;
        const thB = Math.random() * Math.PI * 2;
        const alpha = Math.random();
        const pA = new THREE.Vector3(Math.cos(thA) * 6.8, 0, Math.sin(thA) * 6.8);
        const pB = new THREE.Vector3(Math.cos(thB) * 6.8, 0, Math.sin(thB) * 6.8);

        pPos[i * 3] = THREE.MathUtils.lerp(pA.x, pB.x, alpha);
        pPos[i * 3 + 1] = Math.sin(alpha * Math.PI) * 2.8;
        pPos[i * 3 + 2] = THREE.MathUtils.lerp(pA.z, pB.z, alpha);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 7 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
