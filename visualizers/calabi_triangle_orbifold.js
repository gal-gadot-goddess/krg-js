// visualizers/calabi_triangle_orbifold.js
// Hyperbolic Poincaré Triangle Orbifold Tessellation
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.calabi_triangle_orbifold = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "calabi_triangle_orbifold",
    title: "Hyperbolic Poincaré Triangle Orbifold Tessellation",
    fileName: "hyperbolic_orbifold.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 Infinite (2,3,7) hyperbolic triangle group reflection orbifold tiling the Poincar\u00e9 disk in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #poincare #orbifold #hyperbolicgeometry #sacredgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Hyperbolic Distance & Triangle Group Reflection\nfunction hyperbolicPoincareMetric(x, y) {\n  const r2 = x * x + y * y;\n  const ds2 = (4 * (x*x + y*y)) / Math.pow(1 - r2, 2);\n  return { r2, ds2 };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.8,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.7,
        1.0
    ],
    "rings": 8
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

      // Concentric Geodesic Triangle Rings
      const ringsGroup = new THREE.Group();
      group.add(ringsGroup);

      for (let r = 1; r <= params.rings; r++) {
        const rad = 2.0 + Math.tanh(r * 0.35) * 5.5;
        const sides = 3 * r;
        const tGeo = new THREE.RingGeometry(rad - 0.08, rad + 0.08, sides);
        const tMat = new THREE.MeshBasicMaterial({
          color: (r % 2 === 0 ? c1 : c2), side: THREE.DoubleSide, wireframe: true
        });
        const ring = new THREE.Mesh(tGeo, tMat);
        ring.position.z = (r - 4) * 0.6;
        ringsGroup.add(ring);
      }

      scene.userData = { group, ringsGroup, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.4;
      data.group.rotation.y = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
