// visualizers/higgs_field_symmetry_breaking.js
// Higgs Field Mexican Hat Spontaneous Symmetry Breaking
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.higgs_field_symmetry_breaking = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "higgs_field_symmetry_breaking",
    title: "Higgs Field Mexican Hat Spontaneous Symmetry Breaking",
    fileName: "higgs_symmetry.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Spontaneous electroweak symmetry breaking in the Mexican hat scalar Higgs potential giving mass to elementary particles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #higgs #symmetrybreaking #particlephysics #standardmodel #creativecoding #javascript #reels",
    
    displayCode: "// Higgs Field Goldstone & Radial Potential\nfunction higgsPotential(phi_r, lambda = 0.25, v = 3.5) {\n  // V(phi) = -mu^2 * |phi|^2 + lambda * |phi|^4\n  const V = lambda * Math.pow(phi_r * phi_r - v * v, 2);\n  return V;\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.7,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.6,
        1.0
    ],
    "resolution": 45
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

      const n = params.resolution;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const r = (i / n) * 5.5;
        for (let j = 0; j <= n; j++) {
          const theta = (j / n) * Math.PI * 2;
          // Mexican hat potential: V = lambda * (r^2 - v^2)^2
          const v = 3.0;
          const V = 0.12 * Math.pow(r*r - v*v, 2) - 3.0;
          pts.push(r * Math.cos(theta), V, r * Math.sin(theta));
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.35, wireframe: true, side: THREE.DoubleSide
      });
      const hatMesh = new THREE.Mesh(geo, mat);
      group.add(hatMesh);

      // Rolling Higgs Boson Particle in minimum valley
      const boson = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 24, 24),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.9 })
      );
      group.add(boson);

      scene.userData = { group, hatMesh, boson, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      // Vacuum expectation value goldstone rotation
      const ang = t * 1.8;
      data.boson.position.set(Math.cos(ang) * 3.0, -3.0, Math.sin(ang) * 3.0);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
