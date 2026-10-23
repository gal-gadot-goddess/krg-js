// visualizers/bioluminescent_fungi_forest.js
// Bioluminescent Fungal Canopy
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bioluminescent_fungi_forest = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bioluminescent_fungi_forest",
    title: "Bioluminescent Fungal Canopy",
    fileName: "fungi_forest.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83c\udf44 Glowing enchanted bioluminescent mushroom caps dispersing luminous spore clouds into night in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #mushrooms #bioluminescence #forest #nature #creativecoding #javascript #reels",
    
    displayCode: "// Mushroom Cap Geometry & Spore Ejection\nfunction createMushroom(x, z, capRadius = 1.6) {\n  const capGeo = new THREE.SphereGeometry(capRadius, 16, 16, 0, Math.PI*2, 0, Math.PI/2);\n  const stemGeo = new THREE.CylinderGeometry(0.2, 0.3, 3.2, 8);\n  const cap = new THREE.Mesh(capGeo, glowMat);\n  const stem = new THREE.Mesh(stemGeo, stemMat);\n  cap.position.set(x, 3.2, z);\n  stem.position.set(x, 1.6, z);\n  return { cap, stem };\n}",

    defaultParams: {
    "mushrooms": 8,
    "spores": 4000,
    "primaryColor": [
        0.15,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
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

      camera.position.set(0, 3, 16);
      camera.lookAt(0, 2, 0);

      const group = new THREE.Group();
      scene.add(group);

      for (let m = 0; m < params.mushrooms; m++) {
        const a = (m / params.mushrooms) * Math.PI * 2;
        const rad = 3.5 + (m % 2) * 2.0;
        const cg = new THREE.SphereGeometry(1.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const cm = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
        const cap = new THREE.Mesh(cg, cm);
        cap.position.set(Math.cos(a) * rad, 2.5, Math.sin(a) * rad);
        group.add(cap);
      }

      // Floating spores
      const sCount = params.spores;
      const sPos = new Float32Array(sCount * 3);
      for (let s = 0; s < sCount; s++) {
        sPos[s * 3 + 0] = (Math.random() - 0.5) * 14;
        sPos[s * 3 + 1] = Math.random() * 8;
        sPos[s * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({ size: 0.14, color: 0xa855f7, blending: THREE.AdditiveBlending });
      const spores = new THREE.Points(sGeo, sMat);
      group.add(spores);

      scene.userData = { group, spores, sCount, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;

      const pos = data.spores.geometry.attributes.position;
      for (let s = 0; s < data.sCount; s++) {
        let y = pos.getY(s) + 0.05;
        if (y > 8) y = 0;
        pos.setY(s, y);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 3 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    }
  };
});
