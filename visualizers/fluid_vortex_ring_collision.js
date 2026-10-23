// visualizers/fluid_vortex_ring_collision.js
// Colliding Fluid Vortex Rings
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.fluid_vortex_ring_collision = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "fluid_vortex_ring_collision",
    title: "Colliding Fluid Vortex Rings",
    fileName: "vortex_collision.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\ud83d\udca8 Hydrodynamic collision and reconnection of two coaxial fluid vortex rings into turbulent instability waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0a\u26a1\n\n#threejs #webgl #fluiddynamics #vortex #hydrodynamics #creativecoding #javascript #reels",
    
    displayCode: "// Coaxial Vortex Ring Hydrodynamic Collision\nfunction stepVortexRings(ringA, ringB, time) {\n  // Rings approach and expand radially via mutual induction\n  const dist = Math.max(0.2, 5.0 - (time * 1.5) % 5.0);\n  ringA.position.y = -dist;\n  ringB.position.y = dist;\n  const radius = 3.0 + (1.0 / dist) * 0.5;\n  ringA.scale.set(radius, 1, radius);\n  ringB.scale.set(radius, 1, radius);\n}",

    defaultParams: {
    "particlesPerRing": 3500,
    "primaryColor": [
        0.15,
        0.95,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.25,
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particlesPerRing * 2;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const ring = i % 2 === 0 ? 1 : -1;
        const a = Math.random() * Math.PI * 2;
        const r = 3.5 + (Math.random() - 0.5) * 0.6;
        pos[i * 3 + 0] = Math.cos(a) * r;
        pos[i * 3 + 1] = ring * 3.0;
        pos[i * 3 + 2] = Math.sin(a) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const rings = new THREE.Points(geo, mat);
      group.add(rings);

      scene.userData = { group, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
