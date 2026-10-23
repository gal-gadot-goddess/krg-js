// visualizers/klein_bottle_4d.js
// 4D Klein Bottle Topology
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.klein_bottle_4d = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "klein_bottle_4d",
    title: "4D Klein Bottle Topology",
    fileName: "klein_bottle.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 Non-orientable 4D surface with zero inside and outside! Figure-8 Klein bottle immersion rendered in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #kleinbottle #topology #mathart #geometry #creativecoding #javascript #reels",
    
    displayCode: "// Figure-8 Klein Bottle Parametric Immersion\nfunction kleinBottleFigure8(u, v, r = 2.4) {\n  const cosU = Math.cos(u), sinU = Math.sin(u);\n  const cosV = Math.cos(v), sinV = Math.sin(v);\n  const x = (r + cosU/2 * sinV - sinU/2 * Math.sin(2*v)) * cosU;\n  const y = (r + cosU/2 * sinV - sinU/2 * Math.sin(2*v)) * sinU;\n  const z = sinU/2 * sinV + cosU/2 * Math.sin(2*v);\n  return new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2);\n}",

    defaultParams: {
    "resU": 48,
    "resV": 48,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.3,
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

      const uSteps = params.resU, vSteps = params.resV;
      const geo = new THREE.BufferGeometry();
      const pos = [];

      for (let i = 0; i < uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j < vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          const cosU = Math.cos(u), sinU = Math.sin(u);
          const cosV = Math.cos(v), sinV = Math.sin(v);
          const x = (2.2 + (cosU / 2) * sinV - (sinU / 2) * Math.sin(2 * v)) * cosU;
          const y = (2.2 + (cosU / 2) * sinV - (sinU / 2) * Math.sin(2 * v)) * sinU;
          const z = (sinU / 2) * sinV + (cosU / 2) * Math.sin(2 * v);
          pos.push(x * 2.2, y * 2.2, z * 2.8);
        }
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.16, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.7;
      data.group.rotation.y = t * 0.9;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = Math.sin(t * 0.35) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
