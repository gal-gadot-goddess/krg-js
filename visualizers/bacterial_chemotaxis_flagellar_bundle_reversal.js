// visualizers/bacterial_chemotaxis_flagellar_bundle_reversal.js
// Bacterial Chemotaxis Flagellar Bundle Run-and-Tumble
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bacterial_chemotaxis_flagellar_bundle_reversal = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bacterial_chemotaxis_flagellar_bundle_reversal",
    title: "Bacterial Chemotaxis Flagellar Bundle Run-and-Tumble",
    fileName: "chemotaxis_bundle.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\udda0 E. coli chemotaxis: helical flagellar bundle synchronous CCW run switching to CW tumble unraveling in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #bacteria #chemotaxis #flagella #biophysics #microbiology #codeart",
    
    displayCode: "// Chemotactic CheY-P Phosphorylation Switch\nfunction motorSwitchBias(cheY_P) {\n  // Hill equation cooperativity (n ~ 10)\n  return Math.pow(cheY_P, 10) / (Math.pow(K_D, 10) + Math.pow(cheY_P, 10));\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.55
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.2
    ],
    "flagellaCount": 5
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

      // Bacterial Rod Body
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 5.5, 32),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      body.rotation.z = Math.PI / 2;
      group.add(body);

      // Helical Flagella Filaments (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const flagIdx = i % params.flagellaCount;
        const x = -2.8 - (i / pCount) * 14.0;
        const angle = x * 3.5 + (flagIdx * 0.4);
        const rad = 0.6 + Math.abs(x) * 0.1;

        pPos[i * 3] = x;
        pPos[i * 3 + 1] = Math.cos(angle) * rad;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const flagella = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(flagella);

      scene.userData = { group, flagella, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.flagella.rotation.x = t * 6.0;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
