// visualizers/laser_prism_refraction_matrix.js
// Laser Prism Refraction Array
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.laser_prism_refraction_matrix = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "laser_prism_refraction_matrix",
    title: "Laser Prism Refraction Array",
    fileName: "prism_matrix.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83c\udf08 Total internal reflection optical prism maze splitting high-intensity coherent laser beams into rainbows in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8e\n\n#threejs #webgl #optics #laser #prism #creativecoding #javascript #light #reels",
    
    displayCode: "// Snell's Law Optical Refraction Matrix\nfunction refractLaserRay(rayOrigin, rayDir, prismFaceNormal, n1 = 1.0, n2 = 1.52) {\n  const r = n1 / n2;\n  const c = -prismFaceNormal.dot(rayDir);\n  const sinT2 = r * r * (1.0 - c * c);\n  // Refracted ray vector\n  return rayDir.clone().multiplyScalar(r).add(prismFaceNormal.clone().multiplyScalar(r * c - Math.sqrt(1.0 - sinT2)));\n}",

    defaultParams: {
    "prismCount": 8,
    "primaryColor": [
        1.0,
        0.2,
        0.8
    ],
    "secondaryColor": [
        0.2,
        0.9,
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

      // Glass prisms
      const prisms = [];
      for (let p = 0; p < params.prismCount; p++) {
        const a = (p / params.prismCount) * Math.PI * 2;
        const geo = new THREE.ConeGeometry(1.2, 2.4, 3);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.65 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(Math.cos(a) * 5.0, Math.sin(a) * 5.0, 0);
        group.add(mesh);
        prisms.push(mesh);
      }

      // Laser beams
      const lGeo = new THREE.BufferGeometry();
      const lPos = new Float32Array(params.prismCount * 6);
      for (let i = 0; i < params.prismCount; i++) {
        lPos[i * 6 + 0] = 0; lPos[i * 6 + 1] = 0; lPos[i * 6 + 2] = 0;
        const a = (i / params.prismCount) * Math.PI * 2;
        lPos[i * 6 + 3] = Math.cos(a) * 5.0;
        lPos[i * 6 + 4] = Math.sin(a) * 5.0;
        lPos[i * 6 + 5] = 0;
      }
      lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
      const lMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 });
      const beams = new THREE.LineSegments(lGeo, lMat);
      group.add(beams);

      scene.userData = { group, prisms, beams, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.6;
      data.prisms.forEach((p, idx) => {
        p.rotation.y = t * 1.5 + idx;
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
