// visualizers/microtubule_dynamic_instability_catastrophe.js
// Microtubule GTP Cap Hydrolysis & Peeling Protofilament Catastrophe
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.microtubule_dynamic_instability_catastrophe = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "microtubule_dynamic_instability_catastrophe",
    title: "Microtubule GTP Cap Hydrolysis & Peeling Protofilament Catastrophe",
    fileName: "microtubule_catastrophe.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83e\uddec Microtubule dynamic instability: GTP cap loss triggering catastrophic curling and protofilament peeling in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #microtubule #cytoskeleton #biophysics #mitosis #cellbiology #codeart",
    
    displayCode: "// Microtubule 13-Protofilament Curvature Transition\nfunction protofilamentPeeling(z, isGTP) {\n  // GTP tubulin = straight (0 deg); GDP tubulin = bent outward (12 deg)\n  return (isGTP) ? 0.0 : 12.0 * (Math.PI / 180.0) * (z / 5.0);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "protofilaments": 13
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

      // 13 Protofilaments Cylinder (22,000 points)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const proto = i % params.protofilaments;
        const theta = (proto / params.protofilaments) * Math.PI * 2;
        const y = -8.0 + (i / pCount) * 16.0;

        // Curling tips (GDP peeling)
        const isTip = (y > 4.5);
        const curl = isTip ? (y - 4.5) * 0.8 : 0;
        const rad = 2.4 + curl;

        pPos[i * 3] = Math.cos(theta) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(theta) * rad;

        const col = isTip ? c2 : c1;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const mt = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(mt);

      scene.userData = { group, mt, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.mt.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 4 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
