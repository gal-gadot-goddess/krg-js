// visualizers/interstellar_molecular_cloud_pillar.js
// Cosmic Pillars of Creation Star-Forming Nebula
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.interstellar_molecular_cloud_pillar = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "interstellar_molecular_cloud_pillar",
    title: "Cosmic Pillars of Creation Star-Forming Nebula",
    fileName: "pillars_of_creation.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u2728 Towering interstellar cold molecular gas pillars sculptured by ultraviolet stellar photo-evaporation in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd2d\n\n#threejs #webgl #pillarsofcreation #nebula #astronomy #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Photo-Evaporating Dense Molecular Spires\nfunction nebulaPhotoEvaporation(x, y, z, UV_flux) {\n  const gasDensity = Math.exp(-y * 0.3) * (Math.sin(x * 1.2) * Math.cos(z * 1.2));\n  const ablationVelocity = Math.sqrt(UV_flux / (gasDensity + 0.1));\n  return { gasDensity, ablationVelocity };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.85,
        0.95
    ],
    "secondaryColor": [
        0.95,
        0.5,
        0.2
    ],
    "cloudParticles": 9000
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
      camera.position.set(0, 2, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.cloudParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // 3 Distinct Nebular Spire Columns
        const spireIdx = i % 3;
        const xOffset = (spireIdx - 1) * 3.8;
        const heightMax = 12.0 - spireIdx * 2.2;
        const y = (Math.random() - 0.5) * heightMax;
        const taper = 1.0 - (y + heightMax * 0.5) / heightMax;
        const rad = (1.4 + Math.random() * 1.5) * (0.4 + taper * 0.8);
        const theta = Math.random() * Math.PI * 2;

        pos[i * 3] = xOffset + Math.cos(theta) * rad;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(theta) * rad;

        const mix = (y + 6.0) / 12.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      cloudGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const nebula = new THREE.Points(cloudGeo, new THREE.PointsMaterial({ size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.9 }));
      group.add(nebula);

      scene.userData = { group, nebula, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.18;
      const p = data.nebula.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i + 1] += Math.sin(t * 1.5 + p[i] * 0.5) * 0.01;
      }
      data.nebula.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.position.y = 2 + Math.sin(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
