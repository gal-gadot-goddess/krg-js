// visualizers/josephson_junction_fluxon_vortex.js
// Superconducting Josephson Junction Quantum Fluxon Soliton
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.josephson_junction_fluxon_vortex = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "josephson_junction_fluxon_vortex",
    title: "Superconducting Josephson Junction Quantum Fluxon Soliton",
    fileName: "josephson_fluxon.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u26a1 Magnetic flux quantum phi_0 moving as a topological sine-Gordon soliton across a Josephson tunneling junction in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u269b\ufe0f\n\n#threejs #webgl #superconductivity #josephson #fluxon #soliton #quantum #creativecoding #javascript #reels",
    
    displayCode: "// Sine-Gordon Soliton Phase Kink\nfunction sineGordonKink(x, t, v = 0.7) {\n  const gamma = 1.0 / Math.sqrt(1.0 - v * v);\n  const phi = 4.0 * Math.atan(Math.exp(gamma * (x - v * t)));\n  return phi; // 2*PI topological phase jump\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.95,
        0.7
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.9
    ],
    "gridPoints": 80
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
      camera.position.set(0, 5, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Twin Superconducting Electrodes
      const el1 = new THREE.Mesh(
        new THREE.BoxGeometry(12, 0.3, 3.5),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.35, wireframe: true })
      );
      el1.position.y = 1.5;
      group.add(el1);

      const el2 = new THREE.Mesh(
        new THREE.BoxGeometry(12, 0.3, 3.5),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.35, wireframe: true })
      );
      el2.position.y = -1.5;
      group.add(el2);

      // Tunneling Fluxon Vortex Soliton Waveform
      const pts = [];
      const n = params.gridPoints;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        const phi = 4.0 * Math.atan(Math.exp(x * 1.5));
        const y = Math.sin(phi) * 1.4;
        pts.push(new THREE.Vector3(x, y, 0));
      }
      const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const sMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2.5 });
      const solitonLine = new THREE.Line(sGeo, sMat);
      group.add(solitonLine);

      scene.userData = { group, el1, el2, solitonLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      const pos = data.solitonLine.geometry.attributes.position;
      const n = data.params.gridPoints;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        const phaseShift = x - Math.sin(t * 2.0) * 4.0;
        const phi = 4.0 * Math.atan(Math.exp(phaseShift * 1.5));
        pos.setY(i, Math.sin(phi) * 1.4);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 5 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
