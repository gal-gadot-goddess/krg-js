// visualizers/hyper_dimensional_clifford_algebra.js
// Geometric Clifford Algebra Spacetime Multivector Rotor
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hyper_dimensional_clifford_algebra = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hyper_dimensional_clifford_algebra",
    title: "Geometric Clifford Algebra Spacetime Multivector Rotor",
    fileName: "clifford_algebra.js",
    category: "Cyberpunk & Digital Systems",
    genre: "sacred",
    caption: "\ud83d\udd2e Spacetime multivector Cl(3,1) blades spinning bivector planes & pseudo-scalars in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #cliffordalgebra #geometriccalculus #bivector #rotor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Clifford Geometric Product of Vectors\nfunction geometricProduct(u, v) {\n  const dot = u.dot(v); // scalar grade-0\n  const wedge = new THREE.Vector3().crossVectors(u, v); // bivector grade-2\n  return { scalar: dot, bivector: wedge };\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.8,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.6
    ],
    "planeCount": 16
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
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.planeCount;
      const planes = [];

      for (let i = 0; i < count; i++) {
        const phi = (i / count) * Math.PI;
        const pMesh = new THREE.Mesh(
          new THREE.RingGeometry(1.5, 4.8, 32),
          new THREE.MeshStandardMaterial({
            color: (i % 2 === 0 ? c1 : c2), wireframe: true, side: THREE.DoubleSide, transparent: true, opacity: 0.6
          })
        );
        pMesh.rotation.x = phi;
        pMesh.rotation.y = phi * 0.5;
        group.add(pMesh);
        planes.push(pMesh);
      }

      scene.userData = { group, planes, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.planes.forEach((p, idx) => {
        p.rotation.z = t * 0.5 + idx * 0.2;
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
