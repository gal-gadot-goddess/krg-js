// visualizers/optical_soliton_supercontinuum.js
// Non-Linear Kerr Optical Soliton Supercontinuum Rainbow
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.optical_soliton_supercontinuum = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "optical_soliton_supercontinuum",
    title: "Non-Linear Kerr Optical Soliton Supercontinuum Rainbow",
    fileName: "optical_soliton.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83c\udf08 Non-linear optical Kerr self-phase modulation compressing laser pulses into ultra-broadband rainbow supercontinuum in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #supercontinuum #laser #soliton #nonlinearlight #optics #creativecoding #javascript #reels",
    
    displayCode: "// Non-Linear Schr\u00f6dinger Equation (NLSE) Soliton\nfunction opticalSoliton(t, z, beta2 = -1, gamma = 1) {\n  const amplitude = 1.0 / Math.cosh(t);\n  const phase = 0.5 * gamma * z;\n  return { amplitude, phase };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.2,
        0.8
    ],
    "secondaryColor": [
        0.1,
        0.9,
        1.0
    ],
    "ribbonWidth": 40
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
      camera.position.set(0, 5, 22);

      const group = new THREE.Group();
      scene.add(group);

      const count = 30;
      const ribbons = [];

      for (let i = 0; i < count; i++) {
        const pts = [];
        const color = new THREE.Color().setHSL(i / count, 0.95, 0.55);
        for (let x = -7.0; x <= 7.0; x += 0.25) {
          const sech = 1.0 / Math.cosh(x * 0.8);
          const y = sech * 3.5 * Math.sin(x * 2.0 + i * 0.2);
          const z = (i - count / 2) * 0.25;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const rMat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
        const ribbon = new THREE.Line(rGeo, rMat);
        group.add(ribbon);
        ribbons.push(ribbon);
      }

      scene.userData = { group, ribbons, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.ribbons.forEach((r, idx) => {
        const pos = r.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const x = pos.getX(j);
          const sech = 1.0 / Math.cosh(x * 0.8);
          const y = sech * 3.5 * Math.sin(x * 2.0 + idx * 0.2 + t * 4.0);
          pos.setY(j, y);
        }
        pos.needsUpdate = true;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 5 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
