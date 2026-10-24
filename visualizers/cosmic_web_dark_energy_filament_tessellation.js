// visualizers/cosmic_web_dark_energy_filament_tessellation.js
// Cosmic Web Dark Energy Filaments & Supercluster Nodes
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cosmic_web_dark_energy_filament_tessellation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cosmic_web_dark_energy_filament_tessellation",
    title: "Cosmic Web Dark Energy Filaments & Supercluster Nodes",
    fileName: "cosmic_web_filaments.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Large-Scale Structure of the Universe: 3D cosmic web filaments, galaxy superclusters & giant cosmic voids in Three.js! Follow @kreggsjs for daily code reels! \ud83d\udd2d\ud83c\udf10\n\n#threejs #webgl #cosmology #cosmicweb #darkmatter #astronomy #mathart #codeart",
    
    displayCode: "// Zel'dovich Approximation for Filament Collapse\nfunction zeldovichDisplacement(q, D_plus, Psi) {\n  // x(q, t) = q - D_plus(t) * grad(Psi(q))\n  return q.clone().sub(Psi.multiplyScalar(D_plus));\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.85
    ],
    "nodeCount": 35
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

      // Supercluster attractor nodes
      const nodes = [];
      for (let i = 0; i < params.nodeCount; i++) {
        nodes.push(new THREE.Vector3((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 24, (Math.random() - 0.5) * 24));
      }

      // 22,000 cosmic filament particles bridging nearest nodes
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const nA = nodes[i % nodes.length];
        const nB = nodes[(i * 7 + 1) % nodes.length];
        const alpha = Math.random();
        const spread = (1.0 - Math.abs(alpha - 0.5) * 2.0) * 1.4;

        pPos[i * 3] = THREE.MathUtils.lerp(nA.x, nB.x, alpha) + (Math.random() - 0.5) * spread;
        pPos[i * 3 + 1] = THREE.MathUtils.lerp(nA.y, nB.y, alpha) + (Math.random() - 0.5) * spread;
        pPos[i * 3 + 2] = THREE.MathUtils.lerp(nA.z, nB.z, alpha) + (Math.random() - 0.5) * spread;

        const col = (alpha < 0.5) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const web = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(web);

      scene.userData = { group, web, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.12;
      data.group.rotation.x = Math.sin(t * 0.1) * 0.15;
      camera.position.x = Math.sin(t * 0.2) * 25;
      camera.position.z = Math.cos(t * 0.2) * 25;
      camera.position.y = 8 + Math.cos(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
