// visualizers/standing_acoustofluidic_radiation_trap.js
// Standing Acoustofluidic Radiation Force Particle Trapping
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.standing_acoustofluidic_radiation_trap = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "standing_acoustofluidic_radiation_trap",
    title: "Standing Acoustofluidic Radiation Force Particle Trapping",
    fileName: "acoustofluidic_trap.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83d\udd0a Acoustic radiation force trapping microparticles in pressure nodal planes of a standing acoustic ultrasound wave in Three.js! Follow @kreggsjs! \ud83d\udd2c\u2728\n\n#threejs #webgl #acoustofluidics #ultrasound #microfluidics #physics #codeart",
    
    displayCode: "// Gor'kov Acoustic Radiation Force Potential\nfunction gorkovPotential(p_in, v_in, V_p) {\n  // U = V_p * [ f1 * <p^2> / (2*rho*c^2) - 3/4 * f2 * rho * <v^2> ]\n  return V_p * (p_in * p_in - v_in * v_in);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.45,
        0.2
    ],
    "nodePlanes": 5
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
      camera.aspect = 1080 / 1920;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 5 Pressure Nodal Wireframe Planes
      for (let i = -2; i <= 2; i++) {
        const pl = new THREE.Mesh(
          new THREE.PlaneGeometry(12.0, 12.0, 8, 8),
          new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.25 })
        );
        pl.position.y = i * 2.8;
        pl.rotation.x = Math.PI / 2;
        group.add(pl);
      }

      // 22,000 Trapped Acoustic Levitation Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const nodeIdx = Math.floor(Math.random() * 5) - 2;
        const targetY = nodeIdx * 2.8;
        pPos[i * 3] = (Math.random() - 0.5) * 11.0;
        pPos[i * 3 + 1] = targetY + (Math.random() - 0.5) * 0.4;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 11.0;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
