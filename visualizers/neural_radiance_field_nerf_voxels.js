// visualizers/neural_radiance_field_nerf_voxels.js
// 5D Volumetric Neural Radiance Field (NeRF) Density Voxels
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.neural_radiance_field_nerf_voxels = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "neural_radiance_field_nerf_voxels",
    title: "5D Volumetric Neural Radiance Field (NeRF) Density Voxels",
    fileName: "nerf_voxels.js",
    category: "Cyberpunk & Digital Systems",
    genre: "cyber",
    caption: "\ud83c\udf10 Raymarching continuous volumetric 5D Neural Radiance Fields (NeRF) synthesizing view-dependent radiance in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\udd16\n\n#threejs #webgl #nerf #neuralradiance #computervision #ai #creativecoding #javascript #reels",
    
    displayCode: "// NeRF Volume Rendering Integral\nfunction nerfRaymarch(sigma, color, deltaT) {\n  const transmittance = Math.exp(-sigma * deltaT);\n  const alpha = 1.0 - transmittance;\n  return { alpha, rgb: color.multiplyScalar(alpha) };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.85,
        0.2
    ],
    "voxelCount": 7500
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

      const count = params.voxelCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 11.0;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 11.0;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 11.0;

        const mix = (pos[i * 3] + 5.5) / 11.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const voxels = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(voxels);

      scene.userData = { group, voxels, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
