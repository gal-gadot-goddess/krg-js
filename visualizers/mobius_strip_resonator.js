// visualizers/mobius_strip_resonator.js
// Möbius Strip Wave Resonator
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.mobius_strip_resonator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "mobius_strip_resonator",
    title: "Möbius Strip Wave Resonator",
    fileName: "mobius_strip.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 One-sided non-orientable M\u00f6bius strip with traveling harmonic standing waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #mobiusstrip #topology #mathart #geometry #creativecoding #javascript #reels",
    
    displayCode: "// M\u00f6bius Band Harmonic Standing Waves\nfunction mobiusStripPoint(u, v, radius = 5.0, time = 0) {\n  // u in [0, 2*PI], v in [-1, 1]\n  const wave = Math.sin(u * 6.0 - time * 4.0) * 0.35;\n  const x = (radius + (v + wave) * Math.cos(u / 2)) * Math.cos(u);\n  const y = (radius + (v + wave) * Math.cos(u / 2)) * Math.sin(u);\n  const z = (v + wave) * Math.sin(u / 2);\n  return new THREE.Vector3(x, y, z);\n}",

    defaultParams: {
    "radius": 5.2,
    "stripWidth": 2.0,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.85
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

      const uSteps = 120, vSteps = 16;
      const count = uSteps * vSteps;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.16, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Points(geo, mat);
      group.add(mesh);

      scene.userData = { group, mesh, uSteps, vSteps, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.mesh.geometry.attributes.position;
      const uSteps = data.uSteps, vSteps = data.vSteps;
      const rad = data.params.radius;
      let idx = 0;

      for (let i = 0; i < uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j < vSteps; j++) {
          const v = -1.0 + (j / vSteps) * 2.0;
          const wave = Math.sin(u * 5.0 - t * 3.5) * 0.35;
          const rEff = v + wave;
          const x = (rad + rEff * Math.cos(u / 2)) * Math.cos(u);
          const y = (rad + rEff * Math.cos(u / 2)) * Math.sin(u);
          const z = rEff * Math.sin(u / 2);
          pos.setXYZ(idx++, x, y, z);
        }
      }
      pos.needsUpdate = true;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
