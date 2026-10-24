// visualizers/kelvin_helmholtz_shear_instability.js
// Oceanic & Atmospheric Kelvin-Helmholtz Shear Instability Billows
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kelvin_helmholtz_shear_instability = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "kelvin_helmholtz_shear_instability",
    title: "Oceanic & Atmospheric Kelvin-Helmholtz Shear Instability Billows",
    fileName: "kelvin_helmholtz.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83c\udf0a Oceanic & atmospheric velocity shear rolling stratified fluids into breaking vortex billows in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #kelvinhelmholtz #fluiddynamics #shearwaves #oceanography #creativecoding #javascript #reels",
    
    displayCode: "// Kelvin-Helmholtz Richardson Number Instability\nfunction richardsonInstability(N_bv, dU_dz) {\n  const Ri = (N_bv * N_bv) / (dU_dz * dU_dz);\n  const isUnstable = Ri < 0.25; // Miles-Howard criterion\n  return { Ri, isUnstable };\n}",

    defaultParams: {
    "primaryColor": [
        0.15,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.45,
        0.15
    ],
    "billowParticles": 8000
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
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.billowParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const x = -8.0 + Math.random() * 16.0;
        const z = (Math.random() - 0.5) * 6.0;
        // Periodic KH cat's eye billow curl
        const phase = x * 0.9;
        const roll = Math.sin(phase) * 1.8;
        const y = roll + (Math.random() - 0.5) * 1.5;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        const mix = (y + 3.0) / 6.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const billows = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(billows);

      scene.userData = { group, billows, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const p = data.billows.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.08;
        if (p[i] > 8.0) p[i] = -8.0;
        p[i+1] = Math.sin(p[i] * 0.9 + t * 2.5) * 1.8;
      }
      data.billows.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
