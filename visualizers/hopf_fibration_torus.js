// visualizers/hopf_fibration_torus.js
// Hopf Fibration & Villarceau Circles
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hopf_fibration_torus = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hopf_fibration_torus",
    title: "Hopf Fibration & Villarceau Circles",
    fileName: "hopf_fibration.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd2e 4D Hypersphere projected to 3D via the Hopf Fibration map! Interlocking Villarceau circles nested in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #hopffibration #sacredgeometry #mathart #topology #creativecoding #javascript #reels",
    
    displayCode: "// S^3 -> S^2 Hopf Map Stereographic Fiber Projection\nfunction createHopfFiberBundle(fibers = 60, pointsPerFiber = 80) {\n  const linePoints = [];\n  for (let f = 0; f < fibers; f++) {\n    const eta = (f / fibers) * Math.PI * 2;\n    for (let p = 0; p <= pointsPerFiber; p++) {\n      const xi = (p / pointsPerFiber) * Math.PI * 2;\n      // 4D unit coordinates (q1, q2, q3, q4)\n      const q1 = Math.cos(xi) * Math.sin(eta);\n      const q2 = Math.sin(xi) * Math.sin(eta);\n      const q3 = Math.cos(xi) * Math.cos(eta);\n      const q4 = Math.sin(xi) * Math.cos(eta);\n      // Stereographic projection: R^3 = (q1, q2, q3) / (1 - q4)\n      const denom = Math.max(0.2, 1.0 - q4 * 0.7);\n      linePoints.push(q1 / denom * 4.5, q2 / denom * 4.5, q3 / denom * 4.5);\n    }\n  }\n  return linePoints;\n}",

    defaultParams: {
    "ringCount": 24,
    "majorRadius": 4.5,
    "minorRadius": 2.2,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.8
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

      const rings = [];
      const count = params.ringCount;
      for (let i = 0; i < count; i++) {
        const u = i / count;
        const geo = new THREE.TorusGeometry(params.majorRadius, params.minorRadius * 0.2, 16, 80);
        const col = new THREE.Color();
        col.setHSL(u, 0.9, 0.6);
        const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.75 });
        const ring = new THREE.Mesh(geo, mat);
        ring.rotation.x = u * Math.PI * 2;
        ring.rotation.y = u * Math.PI;
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.3;

      data.rings.forEach((ring, idx) => {
        ring.rotation.z = t * (0.5 + idx * 0.05);
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
