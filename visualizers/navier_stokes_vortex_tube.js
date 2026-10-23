// visualizers/navier_stokes_vortex_tube.js
// Navier-Stokes Vortex Tube
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.navier_stokes_vortex_tube = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "navier_stokes_vortex_tube",
    title: "Navier-Stokes Vortex Tube",
    fileName: "vortex_tube.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\ud83c\udf2a\ufe0f 3D Navier-Stokes turbulent vortex core stretching & vorticity filament dynamics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0a\u26a1\n\n#threejs #webgl #fluidmechanics #navierstokes #turbulence #creativecoding #javascript #vfx #reels",
    
    displayCode: "// Biot-Savart Law Induced Fluid Velocity\nfunction computeVorticityVelocity(point, filamentCurve, gamma = 4.2) {\n  // Line integral v = (gamma / 4*pi) * integral (dl x r) / |r|^3\n  const vel = new THREE.Vector3();\n  const dl = filamentCurve.getTangent(0);\n  vel.crossVectors(dl, point).normalize().multiplyScalar(gamma);\n  return vel;\n}",

    defaultParams: {
    "vortexParticles": 8000,
    "tubeRadius": 3.5,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.3,
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

      const count = params.vortexParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 14;
        const r = 1.0 + Math.pow(Math.random(), 2.0) * params.tubeRadius;
        pos[i * 3 + 0] = Math.cos(u) * r;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(u) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const vortex = new THREE.Points(geo, mat);
      group.add(vortex);

      scene.userData = { group, vortex, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 1.5;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
