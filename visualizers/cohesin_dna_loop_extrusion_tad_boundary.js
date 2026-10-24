// visualizers/cohesin_dna_loop_extrusion_tad_boundary.js
// Cohesin Ring SMC Motor & Chromatin Loop Extrusion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cohesin_dna_loop_extrusion_tad_boundary = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cohesin_dna_loop_extrusion_tad_boundary",
    title: "Cohesin Ring SMC Motor & Chromatin Loop Extrusion",
    fileName: "cohesin_loop_extrusion.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\uddec Cohesin molecular ring motor extruding 3D chromatin loops to form Topologically Associating Domains (TADs) in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #cohesin #genomics #chromatin #dna #biophysics #codeart",
    
    displayCode: "// Cohesin Loop Extrusion Processivity Velocity (v ~ 1 kb/s)\nfunction loopExtrusion(t, k_step) {\n  // L(t) = L_0 + 2 * v_ext * t until CTCF stall\n  return 2.0 * k_step * t;\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.25
    ],
    "maxLoop": 8.0
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

      // Cohesin ATPase Ring Torus
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.8, 0.25, 24, 64),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.7 })
      );
      group.add(ring);

      // Extruding DNA Loop Arc (18,000 points)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * Math.PI;
        const rad = 6.5;
        pPos[i * 3] = Math.cos(u) * rad;
        pPos[i * 3 + 1] = Math.sin(u) * rad;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const loop = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c1, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(loop);

      scene.userData = { group, ring, loop, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const s = 1.0 + Math.sin(t * 2.0) * 0.35;
      data.loop.scale.set(s, s, s);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 3, 0);

      renderer.render(scene, camera);
    }
  };
});
