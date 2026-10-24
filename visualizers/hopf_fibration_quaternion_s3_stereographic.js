// visualizers/hopf_fibration_quaternion_s3_stereographic.js
// Hopf Fibration S3 to S2 Quaternion Great Circles
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hopf_fibration_quaternion_s3_stereographic = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hopf_fibration_quaternion_s3_stereographic",
    title: "Hopf Fibration S3 to S2 Quaternion Great Circles",
    fileName: "hopf_fibration.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83c\udf00 The celebrated Hopf Fibration mapping the 3-sphere S3 to the 2-sphere S2 via nested Villarceau circles in Three.js! Follow @kreggsjs for daily reels! \ud83d\udcd0\u2728\n\n#threejs #webgl #hopffibration #topology #sacredgeometry #mathart #quaternion #codeart",
    
    displayCode: "// Hopf Map from S3 (Quaternions) to S2 (Base Sphere)\nfunction hopfMap(q) {\n  // (z0, z1) in C^2 -> (2*Re(z0*conj(z1)), 2*Im(z0*conj(z1)), |z0|^2 - |z1|^2)\n  return new THREE.Vector3(2*(q.x*q.z + q.y*q.w), 2*(q.y*q.z - q.x*q.w), q.x*q.x + q.y*q.y - q.z*q.z - q.w*q.w);\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.4,
        0.85
    ],
    "fiberCount": 42
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

      // Nested Hopf Fibers (Toroidal Villarceau circles)
      const fibers = [];
      for (let i = 0; i < params.fiberCount; i++) {
        const u = (i / params.fiberCount) * Math.PI;
        const R = 5.2;
        const rTube = 2.4 * Math.sin(u);
        const geo = new THREE.TorusGeometry(R, rTube, 16, 64);
        const col = c1.clone().lerp(c2, i / params.fiberCount);
        const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.55 });
        const m = new THREE.Mesh(geo, mat);
        m.rotation.x = u;
        m.rotation.y = (i * 0.35);
        group.add(m);
        fibers.push(m);
      }

      scene.userData = { group, fibers, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.fibers.forEach((f, idx) => {
        f.rotation.z += 0.01 * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
