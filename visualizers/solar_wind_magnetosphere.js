// visualizers/solar_wind_magnetosphere.js
// Earth Dipole Magnetosphere Shield
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.solar_wind_magnetosphere = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "solar_wind_magnetosphere",
    title: "Earth Dipole Magnetosphere Shield",
    fileName: "magnetosphere.js",
    category: "Fluid Dynamics & Plasma",
    genre: "cosmic",
    caption: "\ud83c\udf0d Planetary dipole magnetic field deflecting charged solar wind proton plasma into auroral cusps in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udee1\ufe0f\n\n#threejs #webgl #magnetosphere #spacephysics #earth #astronomy #creativecoding #javascript #reels",
    
    displayCode: "// Planetary Dipole Magnetic Field: B(r, theta) = mu0*M / (4*pi*r^3)\nfunction computeDipoleFieldLine(r0, theta) {\n  const r = r0 * Math.pow(Math.sin(theta), 2); // Dipole equation r = r0 * sin^2(theta)\n  const x = r * Math.sin(theta);\n  const y = r * Math.cos(theta);\n  return new THREE.Vector3(x, y, 0);\n}",

    defaultParams: {
    "fieldLines": 16,
    "windParticles": 6000,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
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

      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Earth sphere
      const eGeo = new THREE.SphereGeometry(1.8, 32, 32);
      const eMat = new THREE.MeshBasicMaterial({ color: 0x1d4ed8 });
      const earth = new THREE.Mesh(eGeo, eMat);
      group.add(earth);

      // Dipole field lines
      for (let l = 0; l < params.fieldLines; l++) {
        const a = (l / params.fieldLines) * Math.PI * 2;
        const pts = [];
        for (let t = 0.2; t <= Math.PI - 0.2; t += 0.1) {
          const r = 5.5 * Math.pow(Math.sin(t), 2);
          pts.push(new THREE.Vector3(Math.cos(a) * r * Math.sin(t), r * Math.cos(t), Math.sin(a) * r * Math.sin(t)));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 }));
        group.add(line);
      }

      scene.userData = { group, earth, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
