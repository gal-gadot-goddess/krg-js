// visualizers/cosmic_reionization_bubble_network.js
// Epoch of Reionization Strömgren Spheres & Ionization Web
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cosmic_reionization_bubble_network = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cosmic_reionization_bubble_network",
    title: "Epoch of Reionization Strömgren Spheres & Ionization Web",
    fileName: "reionization_bubbles.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c First stars of the Universe blowing cosmic Str\u00f6mgren ionization bubbles across neutral hydrogen in Three.js! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\u2728\n\n#threejs #webgl #cosmology #reionization #firststars #astronomy #codeart",
    
    displayCode: "// Str\u00f6mgren Sphere Reionization Radius\nfunction stromgrenRadius(Q_H, n_H, alpha_B) {\n  // R_S = (3 * Q_H / (4 * pi * n_H^2 * alpha_B))^(1/3)\n  return Math.cbrt((3 * Q_H) / (4 * Math.PI * n_H * n_H * alpha_B));\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.3,
        0.7
    ],
    "secondaryColor": [
        0.3,
        0.9,
        1.0
    ],
    "bubbleCount": 24
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

      const bubbles = [];
      for (let i = 0; i < params.bubbleCount; i++) {
        const rad = 1.2 + Math.random() * 2.8;
        const bGeo = new THREE.SphereGeometry(rad, 24, 24);
        const bMat = new THREE.MeshStandardMaterial({
          color: (i % 2 === 0) ? c1 : c2,
          emissive: (i % 2 === 0) ? c1 : c2,
          emissiveIntensity: 0.65,
          wireframe: true,
          transparent: true,
          opacity: 0.45
        });
        const m = new THREE.Mesh(bGeo, bMat);
        m.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22);
        group.add(m);
        bubbles.push({ mesh: m, baseRad: rad, phase: Math.random() * Math.PI * 2 });
      }

      // Neutral intergalactic medium gas dust (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 36;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 36;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 36;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.16, color: 0x64748b, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending });
      group.add(new THREE.Points(pGeo, pMat));

      scene.userData = { group, bubbles, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.bubbles.forEach((b, idx) => {
        const s = 1.0 + Math.sin(t * 1.8 + b.phase) * 0.35;
        b.mesh.scale.set(s, s, s);
        b.mesh.rotation.y = t * 0.3 * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.y = t * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 24;
      camera.position.z = Math.cos(t * 0.25) * 24;
      camera.position.y = 8 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
