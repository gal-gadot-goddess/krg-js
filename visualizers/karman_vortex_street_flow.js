// visualizers/karman_vortex_street_flow.js
// Von Kármán Alternating Bluff Body Vortex Shedding Street
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.karman_vortex_street_flow = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "karman_vortex_street_flow",
    title: "Von Kármán Alternating Bluff Body Vortex Shedding Street",
    fileName: "karman_vortex.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83d\udca8 Laminar airflow creating an alternating double row of staggered Von K\u00e1rm\u00e1n vortices behind an obstacle in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #karmanvortex #aerodynamics #fluiddynamics #vortexshedding #creativecoding #javascript #reels",
    
    displayCode: "// Von K\u00e1rm\u00e1n Vortex Shedding Strouhal Frequency\nfunction strouhalFrequency(U, d, St = 0.21) {\n  const sheddingFreq = (St * U) / d; // Hz\n  return sheddingFreq;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.9,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.6
    ],
    "particleCount": 8500
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
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Cylindrical Obstacle Cylinder
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 6.0, 24),
        new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
      );
      cyl.position.x = -6.0;
      group.add(cyl);

      // Trailing Staggered Vortices Particles
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const x = -5.0 + Math.random() * 14.0;
        const side = Math.sin(x * 1.2) > 0 ? 1 : -1;
        const y = side * 1.5 + (Math.random() - 0.5) * 1.0;
        const z = (Math.random() - 0.5) * 4.0;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const street = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(street);

      scene.userData = { group, cyl, street, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.15;
      const p = data.street.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.12;
        if (p[i] > 9.0) p[i] = -5.0;
        p[i+1] += Math.sin(p[i] * 1.5 + t * 4.0) * 0.04;
      }
      data.street.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
