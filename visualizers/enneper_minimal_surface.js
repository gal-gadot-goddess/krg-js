// visualizers/enneper_minimal_surface.js
// Enneper Minimal Surface
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.enneper_minimal_surface = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "enneper_minimal_surface",
    title: "Enneper Minimal Surface",
    fileName: "enneper_surface.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udcd0 Complex analytic Enneper minimal surface with self-intersecting orthogonal curves! Zero mean curvature in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #minimalsurface #mathart #differentialgeometry #creativecoding #javascript #reels",
    
    displayCode: "// Enneper Minimal Surface Parameterization\nfunction enneperPoint(u, v) {\n  const x = u - (u*u*u)/3 + u*v*v;\n  const y = v - (v*v*v)/3 + v*u*u;\n  const z = u*u - v*v;\n  return new THREE.Vector3(x * 1.8, y * 1.8, z * 1.8);\n}",

    defaultParams: {
    "uRange": 1.6,
    "res": 40,
    "primaryColor": [
        0.95,
        0.35,
        0.7
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
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

      const res = params.res;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      const uR = params.uRange;

      let idx = 0;
      for (let i = 0; i < res; i++) {
        const u = -uR + (i / res) * (uR * 2);
        for (let j = 0; j < res; j++) {
          const v = -uR + (j / res) * (uR * 2);
          const x = u - (u*u*u)/3 + u*v*v;
          const y = v - (v*v*v)/3 + v*u*u;
          const z = u*u - v*v;
          pos[idx * 3 + 0] = x * 2.2;
          pos[idx * 3 + 1] = y * 2.2;
          pos[idx * 3 + 2] = z * 2.2;
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.18, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
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
      data.group.rotation.z = Math.sin(t * 0.5) * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
