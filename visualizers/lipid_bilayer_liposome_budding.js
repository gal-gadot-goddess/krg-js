// visualizers/lipid_bilayer_liposome_budding.js
// Self-Healing Phospholipid Bilayer Liposome Vesicle
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.lipid_bilayer_liposome_budding = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "lipid_bilayer_liposome_budding",
    title: "Self-Healing Phospholipid Bilayer Liposome Vesicle",
    fileName: "lipid_bilayer.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\ud83e\udee7 Amphiphilic phospholipid bilayer cell membrane undergoing clathrin-mediated endocytic vesicular budding in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83e\uddec\n\n#threejs #webgl #lipidbilayer #membrane #vesicle #cellbiology #creativecoding #javascript #reels",
    
    displayCode: "// Helfrich Membrane Bending Free Energy\nfunction helfrichBendingEnergy(H, K, kappa = 20.0, kappa_bar = -10.0) {\n  // E = integral (2*kappa * H^2 + kappa_bar * K) dA\n  const energy = 2 * kappa * H * H + kappa_bar * K;\n  return energy;\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.75
    ],
    "particleCount": 6500
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
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Inner and Outer Bilayer Lipids
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = (i % 2 === 0 ? 4.5 : 4.0);
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.cos(v);
        pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const bilayer = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(bilayer);

      scene.userData = { group, bilayer, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      const p = data.bilayer.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Membrane thermal fluctuation ripples
        const wave = 1.0 + 0.04 * Math.sin(t * 3.0 + p[i] * 1.5);
        p[i] *= wave; p[i+1] *= wave; p[i+2] *= wave;
      }
      data.bilayer.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
