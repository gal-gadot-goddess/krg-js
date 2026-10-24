// visualizers/prandtl_meyer_supersonic_expansion_fan.js
// Prandtl-Meyer Supersonic Expansion Fan & Mach Waves
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.prandtl_meyer_supersonic_expansion_fan = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "prandtl_meyer_supersonic_expansion_fan",
    title: "Prandtl-Meyer Supersonic Expansion Fan & Mach Waves",
    fileName: "prandtl_meyer_fan.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\u2708\ufe0f Aerodynamics of supersonic flight: Prandtl-Meyer isentropic expansion fan turning gas around a convex corner in Three.js! Follow @kreggsjs for daily reels! \u26a1\ud83c\udf2c\ufe0f\n\n#threejs #webgl #supersonic #aerodynamics #prandtlmeyer #mach #fluidmechanics #codeart",
    
    displayCode: "// Prandtl-Meyer Expansion Function nu(M)\nfunction prandtlMeyer(M, gamma) {\n  const g1 = Math.sqrt((gamma + 1.0) / (gamma - 1.0));\n  return g1 * Math.atan(Math.sqrt((gamma - 1.0) / (gamma + 1.0) * (M*M - 1.0))) - Math.atan(Math.sqrt(M*M - 1.0));\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.65
    ],
    "cornerAngle": 0.45
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

      // 22,000 Supersonic Mach Wave Expansion Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = 1.5 + Math.random() * 12.0;
        const angle = -0.6 + Math.random() * 1.8;

        pPos[i * 3] = Math.cos(angle) * r - 4.0;
        pPos[i * 3 + 1] = Math.sin(angle) * r;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 6.0;

        const col = c1.clone().lerp(c2, (angle + 0.6) / 1.8);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const fan = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(fan);

      scene.userData = { group, fan, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
