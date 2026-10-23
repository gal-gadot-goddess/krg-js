// visualizers/plasma_ball_arc_discharge.js
// Plasma Globe Electric Arcs
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.plasma_ball_arc_discharge = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "plasma_ball_arc_discharge",
    title: "Plasma Globe Electric Arcs",
    fileName: "plasma_globe.js",
    category: "Fluid Dynamics & Plasma",
    genre: "techno",
    caption: "\u26a1 High-voltage dielectric breakdown gas filament arcs reaching outward to the glass sphere in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #plasma #electricity #lightning #scifi #creativecoding #javascript #reels",
    
    displayCode: "// Stochastic Electric Discharge Filaments\nfunction generateLightningArc(startPt, endPt, segments = 16, jitter = 0.4) {\n  const points = [startPt];\n  for (let s = 1; s < segments; s++) {\n    const u = s / segments;\n    const mid = startPt.clone().lerp(endPt, u);\n    mid.add(new THREE.Vector3((Math.random()-0.5)*jitter, (Math.random()-0.5)*jitter, (Math.random()-0.5)*jitter));\n    points.push(mid);\n  }\n  points.push(endPt);\n  return points;\n}",

    defaultParams: {
    "sphereRadius": 5.0,
    "arcCount": 16,
    "primaryColor": [
        0.85,
        0.2,
        0.95
    ],
    "secondaryColor": [
        0.2,
        0.9,
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

      // Glass globe
      const gGeo = new THREE.SphereGeometry(params.sphereRadius, 32, 32);
      const gMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.3 });
      const globe = new THREE.Mesh(gGeo, gMat);
      group.add(globe);

      // Core electrode
      const cGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(cGeo, cMat);
      group.add(core);

      scene.userData = { group, globe, core, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
