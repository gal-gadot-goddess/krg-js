// visualizers/riemann_zeta_critical_strip.js
// Riemann Zeta Function Analytic Critical Strip Landscape
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.riemann_zeta_critical_strip = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "riemann_zeta_critical_strip",
    title: "Riemann Zeta Function Analytic Critical Strip Landscape",
    fileName: "riemann_zeta.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd22 The Riemann Zeta function complex modulus landscape & non-trivial zeros along the Critical Line Re(s)=1/2 in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8e\n\n#threejs #webgl #riemannhypothesis #zetafunction #primenumbers #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Dirichlet Eta Series Riemann Zeta Approximation\nfunction dirichletEta(sigma, t, N = 60) {\n  let re = 0, im = 0;\n  for (let n = 1; n <= N; n++) {\n    const sign = (n % 2 === 1) ? 1 : -1;\n    const term = sign * Math.pow(n, -sigma);\n    re += term * Math.cos(t * Math.log(n));\n    im -= term * Math.sin(t * Math.log(n));\n  }\n  return Math.sqrt(re * re + im * im);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.6,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.8,
        0.1
    ],
    "gridX": 50,
    "gridY": 60
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
      camera.position.set(0, 10, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const nx = params.gridX, ny = params.gridY;
      const pts = [];

      for (let i = 0; i < nx; i++) {
        const sigma = 0.0 + (i / nx) * 1.0; // Critical strip [0, 1]
        for (let j = 0; j < ny; j++) {
          const ty = 5.0 + (j / ny) * 35.0; // Imaginary height
          // Modulus approximation
          let re = 0, im = 0;
          for (let n = 1; n <= 25; n++) {
            const s = (n % 2 === 1) ? 1 : -1;
            const term = s * Math.pow(n, -sigma);
            re += term * Math.cos(ty * Math.log(n));
            im -= term * Math.sin(ty * Math.log(n));
          }
          const mod = Math.sqrt(re*re + im*im);
          pts.push((sigma - 0.5) * 12.0, mod * 1.8 - 3.0, (ty - 22.5) * 0.6);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const zetaLandscape = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.16, blending: THREE.AdditiveBlending
      }));
      group.add(zetaLandscape);

      // Critical Line Re(s) = 0.5
      const linePts = [new THREE.Vector3(0, -3.0, -12), new THREE.Vector3(0, 8.0, 12)];
      const critLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePts),
        new THREE.LineBasicMaterial({ color: c2, linewidth: 2 })
      );
      group.add(critLine);

      scene.userData = { group, zetaLandscape, critLine, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
