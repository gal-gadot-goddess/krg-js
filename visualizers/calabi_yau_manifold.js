// visualizers/calabi_yau_manifold.js
// Calabi-Yau 6D Manifold
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.calabi_yau_manifold = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "calabi_yau_manifold",
    title: "Calabi-Yau 6D Manifold",
    fileName: "calabi_yau.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd2e 6-Dimensional Calabi-Yau compactified string theory manifold projected into 3D! Superstring extra dimensions in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #calabiyau #stringtheory #higherdimensions #mathart #creativecoding #javascript #reels",
    
    displayCode: "// 2D Complex Slice of 6D Calabi-Yau Cross-Section\nfunction calculateCalabiYau(u, v, n = 5) {\n  // Complex coordinate parameterization: z1^n + z2^n = 1\n  const r = Math.pow(Math.abs(Math.cos(u * n / 2)), 2 / n);\n  const x = r * Math.cos(u) * Math.cos(v);\n  const y = r * Math.sin(u) * Math.cos(v);\n  const z = r * Math.sin(v) + Math.cos(u * 2) * 0.5;\n  return new THREE.Vector3(x * 5.2, y * 5.2, z * 5.2);\n}",

    defaultParams: {
    "gridResolution": 50,
    "primaryColor": [
        0.65,
        0.2,
        0.95
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
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

      const res = params.gridResolution;
      const geo = new THREE.PlaneGeometry(10, 10, res, res);
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const u = (pos.getX(i) / 5) * Math.PI;
        const v = (pos.getY(i) / 5) * Math.PI;
        const r = Math.pow(Math.abs(Math.cos(u * 2.5)), 0.4);
        pos.setXYZ(i, r * Math.cos(u) * 4.5, r * Math.sin(u) * 4.5, Math.sin(v * 2) * 2.2);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Outer astral rings
      for (let r = 0; r < 3; r++) {
        const rg = new THREE.TorusGeometry(6.5 + r * 0.8, 0.04, 16, 80);
        const rm = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, opacity: 0.5 });
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = r * 0.8;
        group.add(ring);
      }

      scene.userData = { group, mesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      const scale = 1.0 + Math.sin(t * 3.0) * 0.12;
      data.mesh.scale.set(scale, scale, scale);

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = Math.sin(t * 0.3) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
