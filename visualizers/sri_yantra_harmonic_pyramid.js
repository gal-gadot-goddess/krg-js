// visualizers/sri_yantra_harmonic_pyramid.js
// Sri Yantra 3D Sacred Pyramid
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.sri_yantra_harmonic_pyramid = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "sri_yantra_harmonic_pyramid",
    title: "Sri Yantra 3D Sacred Pyramid",
    fileName: "sri_yantra.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 Sacred Sri Yantra 9 interlocking divine triangles extruded into 3D pyramid! Vedic fractal acoustic resonance in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd49\ufe0f\u2728\n\n#threejs #webgl #sriyantra #sacredgeometry #pyramid #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Interlocking Nine Sacred Triangles (Maha Meru 3D)\nfunction buildSriYantraLayers(levels = 9, baseRadius = 6.0) {\n  const layerGroup = new THREE.Group();\n  for (let l = 0; l < levels; l++) {\n    const y = l * 0.85;\n    const r = baseRadius * (1.0 - l / levels);\n    const triGeo = new THREE.ConeGeometry(r, 0.08, 3, 1, true);\n    triGeo.rotateZ(l % 2 === 0 ? 0 : Math.PI); // Inverted triangles\n    const mesh = new THREE.Mesh(triGeo, goldMat);\n    mesh.position.y = y;\n    layerGroup.add(mesh);\n  }\n  return layerGroup;\n}",

    defaultParams: {
    "triangleLevels": 9,
    "lotusPetals": 16,
    "primaryColor": [
        1.0,
        0.85,
        0.25
    ],
    "secondaryColor": [
        0.95,
        0.2,
        0.5
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

      camera.position.set(0, 4, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // 9 Levels of interlocking triangles
      for (let l = 0; l < params.triangleLevels; l++) {
        const y = (l - 4.5) * 0.8;
        const r = 5.5 * (1.0 - l / 10.0);
        const geo = new THREE.ConeGeometry(r, 0.1, 3, 1, true);
        geo.rotateZ(l % 2 === 0 ? 0 : Math.PI);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
          wireframe: true, transparent: true, opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = y;
        group.add(mesh);
      }

      // Outer lotus petal rings
      const ringGeo = new THREE.TorusGeometry(6.5, 0.1, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.8;
      data.group.rotation.z = Math.sin(t * 0.5) * 0.2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 4 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
