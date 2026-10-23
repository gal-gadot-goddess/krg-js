// visualizers/cosmic_web_filaments.js
// Cosmic Web & Dark Matter
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cosmic_web_filaments = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cosmic_web_filaments",
    title: "Cosmic Web & Dark Matter",
    fileName: "cosmic_web.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udd78\ufe0f Large-Scale Structure of the Universe! Dark matter cosmic filaments connecting superclusters across megaparsecs in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd2d\n\n#threejs #webgl #astronomy #cosmology #darkmatter #javascript #creativecoding #reels",
    
    displayCode: "// Large-Scale Dark Matter Filament Mesh\nfunction generateCosmicFilaments(nodes = 220, maxDist = 5.5) {\n  const linePoints = [];\n  for (let i = 0; i < nodes.length; i++) {\n    for (let j = i + 1; j < nodes.length; j++) {\n      const d = nodes[i].distanceTo(nodes[j]);\n      if (d < maxDist) {\n        linePoints.push(nodes[i].x, nodes[i].y, nodes[i].z);\n        linePoints.push(nodes[j].x, nodes[j].y, nodes[j].z);\n      }\n    }\n  }\n  return linePoints;\n}",

    defaultParams: {
    "nodeCount": 260,
    "haloStars": 9000,
    "primaryColor": [
        0.65,
        0.35,
        1.0
    ],
    "secondaryColor": [
        0.15,
        0.9,
        0.95
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

      camera.position.set(0, 0, 24);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.nodeCount;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new THREE.Vector3(
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 22
        ));
      }

      // Filament lines
      const linePos = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dist = nodes[i].distanceTo(nodes[j]);
          if (dist < 4.8) {
            linePos.push(nodes[i].x, nodes[i].y, nodes[i].z);
            linePos.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending
      });
      const lines = new THREE.LineSegments(lGeo, lMat);
      group.add(lines);

      // Star clusters at nodes
      const starCount = params.haloStars;
      const sPos = new Float32Array(starCount * 3);
      for (let s = 0; s < starCount; s++) {
        const n = nodes[s % count];
        sPos[s * 3 + 0] = n.x + (Math.random() - 0.5) * 1.2;
        sPos[s * 3 + 1] = n.y + (Math.random() - 0.5) * 1.2;
        sPos[s * 3 + 2] = n.z + (Math.random() - 0.5) * 1.2;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.12, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const stars = new THREE.Points(sGeo, sMat);
      group.add(stars);

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.15;
      data.group.rotation.x = Math.sin(t * 0.1) * 0.2;

      const camRadius = 24.0 + Math.sin(t * 0.3) * 4.0;
      camera.position.x = Math.sin(t * 0.2) * camRadius;
      camera.position.z = Math.cos(t * 0.2) * camRadius;
      camera.position.y = Math.cos(t * 0.25) * 6.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
