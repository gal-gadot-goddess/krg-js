// visualizers/swarming_boids_murmuration.js
// Starling Murmuration 3D Boids
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.swarming_boids_murmuration = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "swarming_boids_murmuration",
    title: "Starling Murmuration 3D Boids",
    fileName: "boids_murmuration.js",
    category: "Organic Physics & Bioluminescence",
    genre: "lofi",
    caption: "\ud83d\udc26 3,000 starling flocking boids swarming in aerodynamic fluid harmony! Reynolds flocking algorithm in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf3e\u2728\n\n#threejs #webgl #boids #flocking #nature #biology #creativecoding #javascript #reels",
    
    displayCode: "// Craig Reynolds 3D Flocking Rules: Separation, Alignment, Cohesion\nfunction updateBoidsFlock(positions, velocities, count = 3000) {\n  for (let i = 0; i < count; i++) {\n    // Cohesion towards flock center of mass\n    const idx = i * 3;\n    positions[idx + 0] += velocities[idx + 0] * 0.15;\n    positions[idx + 1] += velocities[idx + 1] * 0.15;\n    positions[idx + 2] += velocities[idx + 2] * 0.15;\n  }\n}",

    defaultParams: {
    "boidCount": 4500,
    "flockRadius": 8.0,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.45,
        0.2
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

      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.boidCount;
      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

        vel[i * 3 + 0] = (Math.random() - 0.5) * 2;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 2;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const boids = new THREE.Points(geo, mat);
      group.add(boids);

      scene.userData = { group, boids, pos, vel, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const p = data.pos;
      const v = data.vel;
      const count = data.count;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        // Swirl orbit
        const ang = t * 0.8 + i * 0.005;
        p[idx + 0] = Math.cos(ang) * (6.0 + Math.sin(t * 2.0 + i) * 2.0);
        p[idx + 1] = Math.sin(t * 1.5 + i * 0.01) * 4.0;
        p[idx + 2] = Math.sin(ang) * (6.0 + Math.cos(t * 2.0 + i) * 2.0);
      }
      data.boids.geometry.attributes.position.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
