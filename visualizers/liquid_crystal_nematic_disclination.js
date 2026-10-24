// visualizers/liquid_crystal_nematic_disclination.js
// Nematic Liquid Crystal Topological Defect Disclinations
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.liquid_crystal_nematic_disclination = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "liquid_crystal_nematic_disclination",
    title: "Nematic Liquid Crystal Topological Defect Disclinations",
    fileName: "nematic_disclination.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83c\udf00 Topological defects & +1/2 and -1/2 hedgehog disclination singular director fields in nematic liquid crystals in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8e\n\n#threejs #webgl #liquidcrystal #disclination #topologicaldefect #softmatter #creativecoding #javascript #reels",
    
    displayCode: "// Frank Free Energy Nematic Director Field\nfunction nematicDirectorAngle(x, y, strength = 0.5) {\n  const theta = strength * Math.atan2(y, x);\n  return { nx: Math.cos(theta), ny: Math.sin(theta) };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.8,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.75,
        1.0
    ],
    "gridStep": 18
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
      const n = params.gridStep;
      const directors = new THREE.Group();
      group.add(directors);

      for (let i = -n; i <= n; i += 2) {
        for (let j = -n; j <= n; j += 2) {
          const x = i * 0.45, y = j * 0.45;
          const theta = 0.5 * Math.atan2(y, x); // +1/2 defect
          const dGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
          const dMesh = new THREE.Mesh(dGeo, new THREE.MeshBasicMaterial({ color: c1 }));
          dMesh.position.set(x, y, 0);
          dMesh.rotation.z = theta;
          directors.add(dMesh);
        }
      }

      scene.userData = { group, directors, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.2;
      data.directors.children.forEach((d, idx) => {
        d.rotation.z += 0.02;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
