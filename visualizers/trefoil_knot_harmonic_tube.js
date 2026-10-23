// visualizers/trefoil_knot_harmonic_tube.js
// Trefoil Knot Harmonic Topology
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.trefoil_knot_harmonic_tube = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "trefoil_knot_harmonic_tube",
    title: "Trefoil Knot Harmonic Topology",
    fileName: "trefoil_knot.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83c\udf00 Endless (2,3) Torus Trefoil Knot with pulsating harmonic standing wave caustic ribbons in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #trefoilknot #knottheory #topology #mathart #creativecoding #javascript #reels",
    
    displayCode: "// (2,3) Torus Trefoil Mathematical Curve\nfunction trefoilCurve(t, scale = 2.4) {\n  const x = Math.sin(t) + 2 * Math.sin(2 * t);\n  const y = Math.cos(t) - 2 * Math.cos(2 * t);\n  const z = -Math.sin(3 * t);\n  return new THREE.Vector3(x * scale, y * scale, z * scale);\n}",

    defaultParams: {
    "tubeRadius": 0.5,
    "tubularSegments": 160,
    "primaryColor": [
        0.95,
        0.25,
        0.65
    ],
    "secondaryColor": [
        0.15,
        0.95,
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

      const knotGeo = new THREE.TorusKnotGeometry(4.5, params.tubeRadius, params.tubularSegments, 32, 2, 3);
      const knotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.85
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);

      // Surrounding particle halo
      const count = 4000;
      const pPos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2 * 3;
        const x = Math.sin(u) + 2 * Math.sin(2 * u);
        const y = Math.cos(u) - 2 * Math.cos(2 * u);
        const z = -Math.sin(3 * u);
        pPos[i * 3 + 0] = x * 2.4 + (Math.random() - 0.5) * 0.8;
        pPos[i * 3 + 1] = y * 2.4 + (Math.random() - 0.5) * 0.8;
        pPos[i * 3 + 2] = z * 2.4 + (Math.random() - 0.5) * 0.8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const halo = new THREE.Points(pGeo, pMat);
      group.add(halo);

      scene.userData = { group, knotMesh, halo, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.8;
      data.group.rotation.y = t * 1.1;
      data.group.rotation.z = Math.sin(t * 0.5) * 0.4;

      const scale = 1.0 + Math.sin(t * 3.5) * 0.12;
      data.knotMesh.scale.set(scale, scale, scale);

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
