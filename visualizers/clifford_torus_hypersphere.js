// visualizers/clifford_torus_hypersphere.js
// Clifford Torus in 4D Hyperspace
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.clifford_torus_hypersphere = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "clifford_torus_hypersphere",
    title: "Clifford Torus in 4D Hyperspace",
    fileName: "clifford_torus.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Flat Clifford Torus embedded in 4-dimensional Euclidean space S^3! Isometric projection with harmonic rotations in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #cliffordtorus #4d #topology #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Clifford Flat Torus: (cos u, sin u, cos v, sin v) / sqrt(2)\nfunction projectCliffordTorus(u, v, angle4D = 0) {\n  const invSqrt2 = 1.0 / Math.SQRT2;\n  const x = Math.cos(u) * invSqrt2;\n  const y = Math.sin(u) * invSqrt2;\n  const z = Math.cos(v) * invSqrt2;\n  const w = Math.sin(v) * invSqrt2;\n  // 4D Rotation in XW\n  const xP = x * Math.cos(angle4D) - w * Math.sin(angle4D);\n  const wP = x * Math.sin(angle4D) + w * Math.cos(angle4D);\n  const scale = 5.5 / (2.0 - wP);\n  return new THREE.Vector3(xP * scale, y * scale, z * scale);\n}",

    defaultParams: {
    "rings": 32,
    "pointsPerRing": 32,
    "primaryColor": [
        0.3,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.85
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.rings * params.pointsPerRing;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.18, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.points.geometry.attributes.position;
      const rings = data.params.rings;
      const pts = data.params.pointsPerRing;
      const rot4D = t * 0.8;
      let idx = 0;

      for (let r = 0; r < rings; r++) {
        const u = (r / rings) * Math.PI * 2;
        for (let p = 0; p < pts; p++) {
          const v = (p / pts) * Math.PI * 2;
          const x = Math.cos(u) * 0.7071;
          const y = Math.sin(u) * 0.7071;
          const z = Math.cos(v) * 0.7071;
          const w = Math.sin(v) * 0.7071;

          const xP = x * Math.cos(rot4D) - w * Math.sin(rot4D);
          const wP = x * Math.sin(rot4D) + w * Math.cos(rot4D);
          const sc = 5.2 / Math.max(0.3, 2.0 - wP);

          pos.setXYZ(idx++, xP * sc, y * sc, z * sc);
        }
      }
      pos.needsUpdate = true;

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
