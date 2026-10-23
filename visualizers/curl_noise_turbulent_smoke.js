// visualizers/curl_noise_turbulent_smoke.js
// Curl Noise Incompressible Flow
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.curl_noise_turbulent_smoke = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "curl_noise_turbulent_smoke",
    title: "Curl Noise Incompressible Flow",
    fileName: "curl_noise.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\ud83d\udca8 Divergence-free 3D curl noise velocity field advecting 8,000 fluid smoke particles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf0a\n\n#threejs #webgl #curlnoise #fluidsimulation #vfx #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Divergence-Free Incompressible Curl Velocity Field: v = curl(Psi)\nfunction computeCurlNoise(x, y, z, eps = 0.01) {\n  // v_x = dPsi_z/dy - dPsi_y/dz\n  // v_y = dPsi_x/dz - dPsi_z/dx\n  // v_z = dPsi_y/dx - dPsi_x/dy\n  const vx = Math.sin(y * 0.5) * Math.cos(z * 0.5);\n  const vy = Math.sin(z * 0.5) * Math.cos(x * 0.5);\n  const vz = Math.sin(x * 0.5) * Math.cos(y * 0.5);\n  return new THREE.Vector3(vx, vy, vz);\n}",

    defaultParams: {
    "smokeParticles": 8500,
    "primaryColor": [
        0.2,
        0.95,
        0.9
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.7
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

      const count = params.smokeParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, color: 0x2dd4bf, blending: THREE.AdditiveBlending });
      const smoke = new THREE.Points(geo, mat);
      group.add(smoke);

      scene.userData = { group, smoke, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.smoke.geometry.attributes.position;
      for (let i = 0; i < data.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        const vx = Math.sin(y * 0.4 + t) * 0.05;
        const vy = Math.cos(z * 0.4 + t) * 0.05;
        const vz = Math.sin(x * 0.4 + t) * 0.05;

        pos.setXYZ(i, x + vx, y + vy, z + vz);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
