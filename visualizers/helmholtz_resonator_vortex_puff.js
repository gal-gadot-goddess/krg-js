// visualizers/helmholtz_resonator_vortex_puff.js
// Acoustic Helmholtz Resonator Pulsed Vortex Ring Puff
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.helmholtz_resonator_vortex_puff = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "helmholtz_resonator_vortex_puff",
    title: "Acoustic Helmholtz Resonator Pulsed Vortex Ring Puff",
    fileName: "helmholtz_vortex.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83d\udca8 Periodic acoustic puffs issuing self-propagating toroidal smoke vortex rings from an acoustic resonator in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #helmholtz #vortexring #acoustics #aerodynamics #creativecoding #javascript #reels",
    
    displayCode: "// Helmholtz Acoustic Resonance Frequency\nfunction helmholtzFrequency(S_neck, L_neck, V_cavity, c = 343) {\n  const f_H = (c / (2 * Math.PI)) * Math.sqrt(S_neck / (L_neck * V_cavity));\n  return f_H;\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.85,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "ringParticles": 6000
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
      const count = params.ringParticles;
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 3.8, r = 0.9;
        pos[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
        pos[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const rings = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(rings);

      scene.userData = { group, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      const p = data.rings.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i + 1] += 0.08;
        if (p[i + 1] > 4.0) p[i + 1] = -4.0;
      }
      data.rings.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
