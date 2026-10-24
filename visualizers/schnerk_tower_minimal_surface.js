// visualizers/schnerk_tower_minimal_surface.js
// Scherk's Infinite Periodic Minimal Tower Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.schnerk_tower_minimal_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "schnerk_tower_minimal_surface",
    title: "Scherk's Infinite Periodic Minimal Tower Surface",
    fileName: "scherk_tower.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udfdb\ufe0f Heinrich Scherk's doubly periodic minimal surface forming an infinite twisted helical tower in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #scherksurface #minimalsurface #geometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Scherk's Second Surface Explicit Equation\nfunction scherkSurface(x, y) {\n  // z = ln(cos(y) / cos(x))\n  const cosX = Math.cos(x);\n  const cosY = Math.cos(y);\n  if (cosX * cosY <= 0) return 0;\n  return Math.log(Math.abs(cosY / cosX));\n}",

    defaultParams: {
    "primaryColor": [
        0.4,
        0.7,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.3
    ],
    "gridPoints": 50
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
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridPoints;
      const pts = [];

      for (let i = 0; i < n; i++) {
        const x = -1.35 + (i / n) * 2.7;
        for (let j = 0; j < n; j++) {
          const y = -1.35 + (j / n) * 2.7;
          const z = Math.log(Math.abs(Math.cos(y) / (Math.cos(x) + 0.001)));
          if (Math.abs(z) < 3.5) {
            pts.push(x * 4.0, z * 2.0, y * 4.0);
            pts.push(x * 4.0, -z * 2.0, y * 4.0);
          }
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const tower = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.16, blending: THREE.AdditiveBlending
      }));
      group.add(tower);

      scene.userData = { group, tower, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
