// visualizers/arnold_tongue_circle_map.js
// Arnold Tongue Circle Map Devil's Staircase Mode-Locking
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.arnold_tongue_circle_map = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "arnold_tongue_circle_map",
    title: "Arnold Tongue Circle Map Devil's Staircase Mode-Locking",
    fileName: "arnold_tongue.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Arnold tongues & fractal Devil's staircase frequency mode-locking in coupled non-linear phase oscillators in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #arnoldtongue #circlemap #chaostheory #fractal #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Standard Arnold Circle Map Iteration\nfunction stepCircleMap(theta, Omega = 0.606, K = 0.95) {\n  // theta_{n+1} = theta_n + Omega - (K / 2*PI) * sin(2*PI * theta_n)\n  return (theta + Omega - (K / (2 * Math.PI)) * Math.sin(2 * Math.PI * theta)) % 1.0;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.7
    ],
    "secondaryColor": [
        1.0,
        0.25,
        0.6
    ],
    "orbitCount": 7500
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

      const count = params.orbitCount;
      const pts = [];
      let th = 0.1;
      const K = 0.98;
      const Omega = 0.606;

      for (let i = 0; i < count; i++) {
        th = (th + Omega - (K / (2 * Math.PI)) * Math.sin(2 * Math.PI * th));
        const angle = th * Math.PI * 2;
        const rad = 4.5 + Math.sin(angle * 3) * 0.8;
        const z = (i / count - 0.5) * 10.0;
        pts.push(Math.cos(angle) * rad, z, Math.sin(angle) * rad);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const tongues = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.15, blending: THREE.AdditiveBlending
      }));
      group.add(tongues);

      scene.userData = { group, tongues, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
