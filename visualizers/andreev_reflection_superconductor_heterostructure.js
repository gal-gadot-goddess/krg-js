// visualizers/andreev_reflection_superconductor_heterostructure.js
// Andreev Reflection & Superconducting Cooper Pair Conversion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.andreev_reflection_superconductor_heterostructure = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "andreev_reflection_superconductor_heterostructure",
    title: "Andreev Reflection & Superconducting Cooper Pair Conversion",
    fileName: "andreev_reflection.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Normal-metal to superconductor boundary: incident electron converted into a reflected hole while a Cooper pair enters the condensate in Three.js! Follow @kreggsjs! \ud83d\udd2c\u26a1\n\n#threejs #webgl #superconductivity #andreev #quantum #cooperpairs #codeart",
    
    displayCode: "// Bogoliubov-de Gennes Andreev Reflection Amplitude\nfunction andreevProbability(E, Delta) {\n  // For E < Delta: R_A = 1 (perfect retro-reflection as hole)\n  return (E < Delta) ? 1.0 : Math.pow(E - Math.sqrt(E*E - Delta*Delta), 2) / (Delta * Delta);\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.9
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.25
    ],
    "gapDelta": 1.8
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

      // Interface Barrier Wireframe Plane
      const bGeo = new THREE.PlaneGeometry(16.0, 16.0, 16, 16);
      const bMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 });
      const barrier = new THREE.Mesh(bGeo, bMat);
      barrier.rotation.y = Math.PI / 2;
      group.add(barrier);

      // 20,000 Electron-Hole Trajectory Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = -8.0 + Math.random() * 8.0; // Normal metal side
        const y = (Math.random() - 0.5) * 12.0;
        const z = (Math.random() - 0.5) * 12.0;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
        pCol[i * 3] = c1.r; pCol[i * 3 + 1] = c1.g; pCol[i * 3 + 2] = c1.b;

        pData.push({ x, y, z, vx: 2.2 + Math.random() * 2.0, isHole: false });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const stream = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(stream);

      scene.userData = { group, barrier, stream, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.stream.geometry.attributes.position.array;
      const col = data.stream.geometry.attributes.color.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].x += pData[i].vx * 0.05;
        if (pData[i].x > 0) {
          pData[i].vx = -Math.abs(pData[i].vx); // Andreev retro-reflection
          col[i * 3] = 1.0; col[i * 3 + 1] = 0.35; col[i * 3 + 2] = 0.25; // Hole color
        }
        if (pData[i].x < -8.0) {
          pData[i].x = -8.0; pData[i].vx = Math.abs(pData[i].vx);
          col[i * 3] = 0.25; col[i * 3 + 1] = 0.95; col[i * 3 + 2] = 0.9; // Electron color
        }
        pos[i * 3] = pData[i].x;
      }
      data.stream.geometry.attributes.position.needsUpdate = true;
      data.stream.geometry.attributes.color.needsUpdate = true;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
