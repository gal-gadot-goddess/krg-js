// visualizers/tardigrade_cryptobiotic_glass.js
// Tardigrade Cryptobiotic Disordered Protein Glass Vitrification
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tardigrade_cryptobiotic_glass = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tardigrade_cryptobiotic_glass",
    title: "Tardigrade Cryptobiotic Disordered Protein Glass Vitrification",
    fileName: "tardigrade_glass.js",
    category: "Organic Physics & Bioluminescence",
    genre: "ambient",
    caption: "\ud83d\udc3b Tardigrade intrinsically disordered proteins (TDP) vitrifying cellular components into indestructible biological glass in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2744\ufe0f\n\n#threejs #webgl #tardigrade #cryptobiosis #anhydrobiosis #vitrification #biophysics #creativecoding #javascript #reels",
    
    displayCode: "// TDP Glass Transition Vitrification Temperature\nfunction glassTransition(viscosity, T, Tg = 150) {\n  const isVitrified = T <= Tg || viscosity > 1e12; // Pa*s\n  return { isVitrified };\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.85,
        0.4,
        1.0
    ],
    "pointCount": 7000
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

      // Amorphous Glass Network Mesh
      const glass = new THREE.Mesh(
        new THREE.DodecahedronGeometry(5.0, 2),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true })
      );
      group.add(glass);

      // Embedded Cryptobiotic Protein Chains
      const count = params.pointCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 4.8 * Math.pow(Math.random(), 0.35);
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.cos(v);
        pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const proteins = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c2, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(proteins);

      scene.userData = { group, glass, proteins, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
