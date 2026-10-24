// visualizers/active_galactic_nucleus_broad_line_region.js
// AGN Clumpy Torus & Broad-Line Region Reverberation
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.active_galactic_nucleus_broad_line_region = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "active_galactic_nucleus_broad_line_region",
    title: "AGN Clumpy Torus & Broad-Line Region Reverberation",
    fileName: "agn_broad_line.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Active Galactic Nucleus clumpy molecular torus & relativistic broad-line reverberation clouds in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83d\udd73\ufe0f\n\n#threejs #webgl #agn #blackhole #galaxy #astronomy #codeart",
    
    displayCode: "// AGN Reverberation Time Lag Mapping\nfunction timeLag(r_BLR, theta_view) {\n  // tau = (r_BLR / c) * (1 - cos(theta_view))\n  return (r_BLR / 3e5) * (1.0 - Math.cos(theta_view));\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.4,
        0.8
    ],
    "secondaryColor": [
        0.3,
        0.7,
        1.0
    ],
    "torusRadius": 9.0
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

      // Central Engine SMBH
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })));

      // Clumpy Molecular Torus (22,000 particles)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 8.5;
        const rTube = 3.2 + Math.random() * 1.5;

        pPos[i * 3] = (R + rTube * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = rTube * Math.sin(v) * 0.8;
        pPos[i * 3 + 2] = (R + rTube * Math.cos(v)) * Math.sin(u);

        const col = (i % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const torus = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(torus);

      scene.userData = { group, torus, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.torus.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.28) * 22;
      camera.position.z = Math.cos(t * 0.28) * 22;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
