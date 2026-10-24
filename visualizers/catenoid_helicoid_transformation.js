// visualizers/catenoid_helicoid_transformation.js
// Bonnet Isometric Catenoid-to-Helicoid Morphing
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.catenoid_helicoid_transformation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "catenoid_helicoid_transformation",
    title: "Bonnet Isometric Catenoid-to-Helicoid Morphing",
    fileName: "catenoid_helicoid.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Bonnet association continuous isometric transformation morphing a catenoid into a helicoid in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #catenoid #helicoid #differentialgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Isometric Bonnet Associate Family Equation\nfunction bonnetTransform(u, v, theta = 0) {\n  const x = Math.cos(theta) * Math.sinh(v) * Math.sin(u) + Math.sin(theta) * Math.cosh(v) * Math.cos(u);\n  const y = -Math.cos(theta) * Math.sinh(v) * Math.cos(u) + Math.sin(theta) * Math.cosh(v) * Math.sin(u);\n  const z = u * Math.cos(theta) + v * Math.sin(theta);\n  return new THREE.Vector3(x * 2.5, z * 2.5, y * 2.5);\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.95,
        0.8
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.6
    ],
    "gridU": 40,
    "gridV": 40
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
      const n = params.gridU;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = -Math.PI + (i / n) * Math.PI * 2;
        for (let j = 0; j <= n; j++) {
          const v = -1.5 + (j / n) * 3.0;
          const x = Math.sinh(v) * Math.sin(u) * 2.8;
          const y = -Math.sinh(v) * Math.cos(u) * 2.8;
          const z = u * 1.8;
          pts.push(x, z, y);
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
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const morphMesh = new THREE.Mesh(geo, mat);
      group.add(morphMesh);

      scene.userData = { group, morphMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      const theta = Math.sin(t * 0.6) * Math.PI * 0.5;
      const pos = data.morphMesh.geometry.attributes.position;
      const n = data.params.gridU;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const u = -Math.PI + (i / n) * Math.PI * 2;
        for (let j = 0; j <= n; j++) {
          const v = -1.5 + (j / n) * 3.0;
          const x = (Math.cos(theta)*Math.sinh(v)*Math.sin(u) + Math.sin(theta)*Math.cosh(v)*Math.cos(u)) * 2.8;
          const y = (-Math.cos(theta)*Math.sinh(v)*Math.cos(u) + Math.sin(theta)*Math.cosh(v)*Math.sin(u)) * 2.8;
          const z = (u * Math.cos(theta) + v * Math.sin(theta)) * 1.8;
          pos.setXYZ(idx++, x, z, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
