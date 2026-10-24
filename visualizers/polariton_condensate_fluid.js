// visualizers/polariton_condensate_fluid.js
// Exciton-Polariton Quantum Fluid Superfluidity
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.polariton_condensate_fluid = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "polariton_condensate_fluid",
    title: "Exciton-Polariton Quantum Fluid Superfluidity",
    fileName: "polariton_condensate.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udca7 Light-matter hybrid exciton-polariton quantum fluid flowing with zero friction around microscopic defects in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #polariton #superfluid #boseeinstein #quantumphysics #creativecoding #javascript #reels",
    
    displayCode: "// Gross-Pitaevskii Exciton-Polariton Wavefunction\nfunction polaritonWavefunction(x, y, t) {\n  const density = Math.sin(x * 0.8 + t) * Math.cos(y * 0.8 + t);\n  const phase = Math.atan2(Math.sin(x), Math.cos(y));\n  return { density, phase };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.7,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.85
    ],
    "gridSize": 45
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
      const n = params.gridSize;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          pts.push(x, 0, z);
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const fluidMesh = new THREE.Mesh(geo, mat);
      group.add(fluidMesh);

      scene.userData = { group, fluidMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const pos = data.fluidMesh.geometry.attributes.position;
      const n = data.params.gridSize;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          const r = Math.sqrt(x*x + z*z);
          const y = Math.sin(r * 1.8 - t * 3.5) * Math.cos(Math.atan2(z, x) * 3 + t) * 1.2;
          pos.setY(idx++, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
