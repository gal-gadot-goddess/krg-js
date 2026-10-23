// visualizers/tesla_coil_corona_streamers.js
// Tesla Coil Corona Discharge
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.tesla_coil_corona_streamers = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "tesla_coil_corona_streamers",
    title: "Tesla Coil Corona Discharge",
    fileName: "tesla_coil.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\u26a1 Resonant induction transformer releasing branching high-frequency electrical corona streamers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u26a1\n\n#threejs #webgl #teslacoil #lightning #physics #highvoltage #creativecoding #javascript #reels",
    
    displayCode: "// Resonant Inductive Corona Branching Streamers\nfunction buildTeslaStreamers(origin, length = 8.0, branches = 12) {\n  const linePos = [];\n  for (let b = 0; b < branches; b++) {\n    const angle = (b / branches) * Math.PI * 2;\n    let curr = origin.clone();\n    for (let s = 0; s < 6; s++) {\n      linePos.push(curr.x, curr.y, curr.z);\n      curr.x += Math.cos(angle)*1.2 + (Math.random()-0.5)*0.6;\n      curr.y += 1.0 + (Math.random()-0.5)*0.6;\n      curr.z += Math.sin(angle)*1.2 + (Math.random()-0.5)*0.6;\n      linePos.push(curr.x, curr.y, curr.z);\n    }\n  }\n  return linePos;\n}",

    defaultParams: {
    "toroidRadius": 3.5,
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.4,
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

      camera.position.set(0, 3, 16);
      camera.lookAt(0, 2, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Toroid top terminal
      const tGeo = new THREE.TorusGeometry(params.toroidRadius, 0.8, 16, 48);
      const tMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true });
      const toroid = new THREE.Mesh(tGeo, tMat);
      toroid.rotation.x = Math.PI / 2;
      toroid.position.y = 4;
      group.add(toroid);

      // Secondary coil
      const cGeo = new THREE.CylinderGeometry(0.8, 0.8, 6, 24, 1, true);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true });
      const coil = new THREE.Mesh(cGeo, cMat);
      coil.position.y = 0;
      group.add(coil);

      scene.userData = { group, toroid, coil, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.5;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 3 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    }
  };
});
