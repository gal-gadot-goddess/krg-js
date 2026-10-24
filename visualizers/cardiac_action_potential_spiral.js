// visualizers/cardiac_action_potential_spiral.js
// Excitable Heart Tissue FitzHugh-Nagumo Spiral Re-entrant Waves
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cardiac_action_potential_spiral = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cardiac_action_potential_spiral",
    title: "Excitable Heart Tissue FitzHugh-Nagumo Spiral Re-entrant Waves",
    fileName: "cardiac_spiral.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\u2764\ufe0f Non-linear excitable myocardium cardiac tissue action potential rotor wave vortex in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\udec0\n\n#threejs #webgl #cardiac #fitzhughnagumo #biophysics #heart #actionpotential #creativecoding #javascript #reels",
    
    displayCode: "// FitzHugh-Nagumo Excitable Cardiac Differential Equations\nfunction stepFitzHughNagumo(v, w, I = 0.5, a = 0.7, b = 0.8, tau = 12.5) {\n  const dv = (v - (v*v*v) / 3.0 - w + I);\n  const dw = (v + a - b * w) / tau;\n  return { dv, dw };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.15,
        0.25
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
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
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

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
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const waveMesh = new THREE.Mesh(geo, mat);
      group.add(waveMesh);

      scene.userData = { group, waveMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const pos = data.waveMesh.geometry.attributes.position;
      const n = data.params.gridSize;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          const r = Math.sqrt(x*x + z*z);
          const theta = Math.atan2(z, x);
          const spiralWave = Math.sin(r * 1.5 - theta * 2.0 - t * 4.0) * 1.5;
          pos.setY(idx++, spiralWave);
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
