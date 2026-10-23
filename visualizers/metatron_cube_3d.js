// visualizers/metatron_cube_3d.js
// Metatron's Sacred Cube 3D
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.metatron_cube_3d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "metatron_cube_3d",
    title: "Metatron's Sacred Cube 3D",
    fileName: "metatron_cube.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\u2728 Metatron's Sacred Cube containing all 5 Platonic Solids! 13 geometric energy nodes interconnected in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udd2e\ud83d\udcd0\n\n#threejs #webgl #metatron #sacredgeometry #platonic #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Fruit of Life 13 Sacred Energy Centers\nfunction createMetatronNodes(radius = 4.8) {\n  const nodes = [new THREE.Vector3(0, 0, 0)]; // Center node\n  // Inner ring: 6 vertices of regular hexagon\n  for (let i = 0; i < 6; i++) {\n    const a = (i / 6) * Math.PI * 2;\n    nodes.push(new THREE.Vector3(Math.cos(a) * radius * 0.5, Math.sin(a) * radius * 0.5, 0));\n  }\n  // Outer ring: 6 outer nodes\n  for (let i = 0; i < 6; i++) {\n    const a = (i / 6) * Math.PI * 2;\n    nodes.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));\n  }\n  return nodes;\n}",

    defaultParams: {
    "scaleRadius": 4.8,
    "primaryColor": [
        0.95,
        0.8,
        0.2
    ],
    "secondaryColor": [
        0.85,
        0.2,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const nodes = [new THREE.Vector3(0, 0, 0)];
      const rad = params.scaleRadius;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        nodes.push(new THREE.Vector3(Math.cos(a) * rad * 0.5, Math.sin(a) * rad * 0.5, (i%2===0?1:-1)*1.2));
      }
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        nodes.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, (i%2===0?-1:1)*1.2));
      }

      // Connect every node to all other nodes (Metatron interconnects)
      const linePos = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          linePos.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePos.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending
      });
      const lines = new THREE.LineSegments(lGeo, lMat);
      group.add(lines);

      // Node Spheres
      nodes.forEach(n => {
        const sGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const sMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const sphere = new THREE.Mesh(sGeo, sMat);
        sphere.position.copy(n);
        group.add(sphere);
      });

      scene.userData = { group, lines, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.6;
      data.group.rotation.y = t * 0.8;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
