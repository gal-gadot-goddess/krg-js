// visualizers/diatom_silica_frustule_lattice.js
// Glass Diatom Microscopic Nanoporous Silica Frustule
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.diatom_silica_frustule_lattice = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "diatom_silica_frustule_lattice",
    title: "Glass Diatom Microscopic Nanoporous Silica Frustule",
    fileName: "diatom_silica.js",
    category: "Organic Physics & Bioluminescence",
    genre: "ambient",
    caption: "\ud83c\udf3f Intricate natural nanotechnology! Radial nanoporous silica glass architecture of a microscopic oceanic Diatom in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #diatom #nanotechnology #biomineralization #ocean #microscopy #creativecoding #javascript #reels",
    
    displayCode: "// Diatom Radial Areola Pore Tessellation\nfunction diatomAreola(r, theta, n = 16) {\n  const poreRadius = 0.3 * (1.0 + 0.2 * Math.sin(theta * n));\n  const ribHeight = Math.cos(r * 4.0) * 0.8;\n  return { poreRadius, ribHeight };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.8,
        0.2
    ],
    "rings": 12
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

      // Radial Diatom Frustule Rings with Nanopores
      const frustule = new THREE.Group();
      group.add(frustule);
      const ringCount = params.rings;

      for (let r = 1; r <= ringCount; r++) {
        const radius = r * 0.55;
        const count = r * 8;
        const pts = [];
        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 2;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          const y = Math.cos(radius * 1.5) * 0.8;
          pts.push(x, y, z);
        }
        const rGeo = new THREE.BufferGeometry();
        rGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const col = (r % 2 === 0 ? c1 : c2);
        const points = new THREE.Points(rGeo, new THREE.PointsMaterial({ color: col, size: 0.18, blending: THREE.AdditiveBlending }));
        frustule.add(points);
      }

      // Outer Silica Rim Wireframe
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(ringCount * 0.55 + 0.2, 0.2, 16, 64),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true })
      );
      rim.rotation.x = Math.PI / 2;
      group.add(rim);

      scene.userData = { group, frustule, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = 0.5 + Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
