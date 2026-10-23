// visualizers/ferrofluid_rosensweig_spikes.js
// Ferrofluid Rosensweig Instability
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.ferrofluid_rosensweig_spikes = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "ferrofluid_rosensweig_spikes",
    title: "Ferrofluid Rosensweig Instability",
    fileName: "ferrofluid_spikes.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\ud83e\uddf2 Rosensweig normal-field instability forming geometric spike hedgehog array in magnetic fluid in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #ferrofluid #magnetism #fluiddynamics #physics #creativecoding #javascript #reels",
    
    displayCode: "// Rosensweig Normal-Field Instability Peaks\nfunction calculateSpikeHeight(x, y, bField = 1.8) {\n  // Critical magnetic field threshold Bc\n  const r = Math.sqrt(x*x + y*y);\n  const peak = Math.cos(x * 2.5) * Math.cos(y * 2.5);\n  return Math.max(0, peak * (bField * 1.4) * Math.exp(-r * 0.3));\n}",

    defaultParams: {
    "spikesRes": 36,
    "primaryColor": [
        0.1,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
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

      camera.position.set(0, 6, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.spikesRes;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          pos[idx * 3 + 0] = (i - res / 2) * 0.4;
          pos[idx * 3 + 1] = 0;
          pos[idx * 3 + 2] = (j - res / 2) * 0.4;
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.2, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Points(geo, mat);
      group.add(mesh);

      scene.userData = { group, mesh, res, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.mesh.geometry.attributes.position;
      const res = data.res;
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          const x = pos.getX(idx);
          const z = pos.getZ(idx);
          const spike = Math.cos(x * 2.0 + t * 2.0) * Math.cos(z * 2.0 + t * 2.0);
          pos.setY(idx, Math.max(0, spike * 2.2));
          idx++;
        }
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 6 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
