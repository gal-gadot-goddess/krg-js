// visualizers/hexagonal_shield_generator.js
// Hexagonal Forcefield Shield
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hexagonal_shield_generator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hexagonal_shield_generator",
    title: "Hexagonal Forcefield Shield",
    fileName: "hex_shield.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83d\udee1\ufe0f Kinetic energy deflector shield with glowing hexagonal defensive tiles flashing in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\udd16\n\n#threejs #webgl #forcefield #shield #scifi #creativecoding #javascript #vfx #reels",
    
    displayCode: "// Hexagonal Spherical Tiling Deflector Array\nfunction buildHexShield(radius = 5.2, detail = 2) {\n  const icoGeo = new THREE.IcosahedronGeometry(radius, detail);\n  const wireMat = new THREE.MeshBasicMaterial({\n    color: 0x22d3ee,\n    wireframe: true,\n    transparent: true,\n    opacity: 0.8\n  });\n  return new THREE.Mesh(icoGeo, wireMat);\n}",

    defaultParams: {
    "shieldRadius": 5.4,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.2,
        0.6
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

      const sGeo = new THREE.IcosahedronGeometry(params.shieldRadius, 2);
      const sMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.85
      });
      const shield = new THREE.Mesh(sGeo, sMat);
      group.add(shield);

      // Energy core
      const cGeo = new THREE.SphereGeometry(1.8, 24, 24);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(cGeo, cMat);
      group.add(core);

      scene.userData = { group, shield, core, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.6;
      data.group.rotation.y = t * 0.8;

      const pulse = 1.0 + Math.sin(t * 4.0) * 0.12;
      data.shield.scale.set(pulse, pulse, pulse);

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
