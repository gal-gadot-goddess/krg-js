// visualizers/pinch_effect_z_pinch_plasma.js
// Pulsed Power Z-Pinch Magnetic Compression Implosion
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.pinch_effect_z_pinch_plasma = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "pinch_effect_z_pinch_plasma",
    title: "Pulsed Power Z-Pinch Magnetic Compression Implosion",
    fileName: "z_pinch_plasma.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\u26a1 20-million-ampere magnetic Lorentz force crushing cylindrical fusion plasma into an incandescent wire in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83d\udca5\ud83d\udd2c\n\n#threejs #webgl #zpinch #fusion #plasmaphysics #lorentz #pulsedpower #creativecoding #javascript #reels",
    
    displayCode: "// Bennett Pinch Equilibrium Relation\nfunction bennettPinch(I, N, T) {\n  const mu0 = 4 * Math.PI * 1e-7, k_B = 1.38e-23;\n  const bennettCurrent = Math.sqrt((16 * Math.PI * k_B * N * T) / mu0);\n  return bennettCurrent;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.2,
        0.7
    ],
    "particleCount": 7500
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

      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const y = -7.0 + Math.random() * 14.0;
        const rad = 0.5 + Math.random() * 4.0;
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(theta) * rad;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(theta) * rad;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const plasma = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(plasma);

      scene.userData = { group, plasma, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      // Periodic magnetic pinch compression cycle
      const pinch = 0.25 + 0.75 * Math.pow(Math.abs(Math.sin(t * 2.5)), 3.0);
      data.plasma.scale.set(pinch, 1.0, pinch);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
