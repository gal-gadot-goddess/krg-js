// visualizers/ikedamap_optical_cavity_chaos.js
// Ikeda Optical Ring Cavity Laser Chaos Map
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.ikedamap_optical_cavity_chaos = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "ikedamap_optical_cavity_chaos",
    title: "Ikeda Optical Ring Cavity Laser Chaos Map",
    fileName: "ikeda_chaos.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\ud83c\udf00 Kensuke Ikeda's non-linear laser ring cavity attractor folding light into infinite fractal spirals in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #ikeda #opticalchaos #laser #strangeattractor #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Ikeda 2D Complex Laser Cavity Map\nfunction stepIkeda(x, y, u = 0.9, R = 1.0, C1 = 0.4, C2 = 0.9) {\n  const tau = C1 - C2 / (1 + x * x + y * y);\n  const xNew = R + u * (x * Math.cos(tau) - y * Math.sin(tau));\n  const yNew = u * (x * Math.sin(tau) + y * Math.cos(tau));\n  return { x: xNew, y: yNew };\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.25,
        0.55
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "points": 9000
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
      const count = params.points;
      const pts = [];

      let x = 0.1, y = 0.1;
      const u = 0.9, R = 1.0, C1 = 0.4, C2 = 9.0;

      for (let i = 0; i < count; i++) {
        const tau = C1 - C2 / (1.0 + x*x + y*y);
        const xn = R + u * (x * Math.cos(tau) - y * Math.sin(tau));
        const yn = u * (x * Math.sin(tau) + y * Math.cos(tau));
        x = xn; y = yn;
        pts.push((x - 1.0) * 4.2, y * 4.2, Math.sin(i * 0.05) * 3.5);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const ikedaPoints = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.15, blending: THREE.AdditiveBlending
      }));
      group.add(ikedaPoints);

      scene.userData = { group, ikedaPoints, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
