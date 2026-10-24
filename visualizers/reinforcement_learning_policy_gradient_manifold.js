// visualizers/reinforcement_learning_policy_gradient_manifold.js
// Reinforcement Learning Policy Gradient Loss Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.reinforcement_learning_policy_gradient_manifold = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "reinforcement_learning_policy_gradient_manifold",
    title: "Reinforcement Learning Policy Gradient Loss Surface",
    fileName: "policy_gradient_manifold.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83e\udd16 Deep Reinforcement Learning: PPO clipped surrogate objective policy gradient loss landscape optimization in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udcbb\n\n#threejs #webgl #reinforcementlearning #ai #machinelearning #policygradient #codeart",
    
    displayCode: "// PPO Clipped Surrogate Loss: L_CLIP(theta) = E[ min(r_t*A_t, clip(r_t, 1-eps, 1+eps)*A_t) ]\nfunction ppoClip(r_t, A_t, eps) {\n  return Math.min(r_t * A_t, Math.max(1.0 - eps, Math.min(1.0 + eps, r_t)) * A_t);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.2
    ],
    "range": 6.5
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

      const uRes = 50, vRes = 50;
      const geo = new THREE.BufferGeometry();
      const pos = [];
      const col = [];

      for (let i = 0; i <= uRes; i++) {
        const u = -params.range + (i / uRes) * 2.0 * params.range;
        for (let j = 0; j <= vRes; j++) {
          const v = -params.range + (j / vRes) * 2.0 * params.range;
          const y = (Math.sin(u * 0.8) * Math.cos(v * 0.8) * 2.4) + (Math.sin(Math.sqrt(u*u + v*v)) * 1.5);

          pos.push(u, y, v);
          const c = c1.clone().lerp(c2, (y + 3.9) / 7.8);
          col.push(c.r, c.g, c.b);
        }
      }

      const indices = [];
      for (let i = 0; i < uRes; i++) {
        for (let j = 0; j < vRes; j++) {
          const a = i * (vRes + 1) + j;
          const b = (i + 1) * (vRes + 1) + j;
          const c = (i + 1) * (vRes + 1) + (j + 1);
          const d = i * (vRes + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        emissive: c1,
        emissiveIntensity: 0.65,
        transparent: true,
        opacity: 0.85
      }));
      group.add(mesh);

      scene.userData = { group, mesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.mesh.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
