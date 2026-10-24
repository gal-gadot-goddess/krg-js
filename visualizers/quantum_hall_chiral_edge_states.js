// visualizers/quantum_hall_chiral_edge_states.js
// Quantum Hall Effect Dissipationless Chiral Edge States
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_hall_chiral_edge_states = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_hall_chiral_edge_states",
    title: "Quantum Hall Effect Dissipationless Chiral Edge States",
    fileName: "quantum_hall_edge.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Quantized Hall conductance & 1D ballistic chiral edge channels protected by topological Chern numbers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\ud83d\udc8e\n\n#threejs #webgl #quantumhall #topologicalinsulator #chernnumber #condensedmatter #creativecoding #javascript #reels",
    
    displayCode: "// Quantized Hall Conductance & Landau Level Filling\nfunction hallConductance(nu, B) {\n  const e = 1.602e-19, h = 6.626e-34;\n  const sigma_xy = nu * (e * e / h); // exact integer quantization\n  const magneticLength = Math.sqrt((h / (2 * Math.PI * e * B)));\n  return { sigma_xy, magneticLength };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.2
    ],
    "electronCount": 6000
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
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 2D Electron Gas Boundary Slab
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(11, 0.4, 11),
        new THREE.MeshStandardMaterial({ color: 0x060c18, wireframe: true })
      );
      group.add(slab);

      // Circulating Chiral Edge Electrons
      const count = params.electronCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // Distribute along perimeter
        const side = i % 4;
        const progress = Math.random();
        let x = 0, z = 0;
        if (side === 0) { x = -5.0 + progress * 10.0; z = -5.0; }
        else if (side === 1) { x = 5.0; z = -5.0 + progress * 10.0; }
        else if (side === 2) { x = 5.0 - progress * 10.0; z = 5.0; }
        else { x = -5.0; z = 5.0 - progress * 10.0; }

        pos[i * 3] = x;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        pos[i * 3 + 2] = z;

        const col = (side % 2 === 0 ? c1 : c2);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const edgePoints = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(edgePoints);

      group.rotation.x = 0.5;

      scene.userData = { group, slab, edgePoints, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const p = data.edgePoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Move counter-clockwise along boundary
        if (p[i+2] <= -4.9 && p[i] < 5.0) p[i] += 0.12;
        else if (p[i] >= 4.9 && p[i+2] < 5.0) p[i+2] += 0.12;
        else if (p[i+2] >= 4.9 && p[i] > -5.0) p[i] -= 0.12;
        else if (p[i] <= -4.9 && p[i+2] > -5.0) p[i+2] -= 0.12;
      }
      data.edgePoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
