// visualizers/taylor_couette_vortex_columns.js
// Taylor-Couette Concentric Cylinder Counter-Rotating Vortex Columns
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.taylor_couette_vortex_columns = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "taylor_couette_vortex_columns",
    title: "Taylor-Couette Concentric Cylinder Counter-Rotating Vortex Columns",
    fileName: "taylor_couette.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83c\udf00 Hydrodynamic centrifugal instability forming stacked toroidal Taylor vortex rolls between concentric cylinders in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #taylorcouette #vortexrolls #hydrodynamics #fluiddynamics #creativecoding #javascript #reels",
    
    displayCode: "// Taylor Number Centrifugal Instability\nfunction taylorNumber(Omega, R1, d, nu) {\n  const Ta = (4 * Omega * Omega * Math.pow(R1, 4)) / (nu * nu * Math.pow(d, 4));\n  const isVortexFormed = Ta > 1708; // Rayleigh threshold\n  return { Ta, isVortexFormed };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.65
    ],
    "secondaryColor": [
        1.0,
        0.35,
        0.8
    ],
    "doughnutCount": 7
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

      const count = params.doughnutCount;
      const rolls = [];

      for (let i = 0; i < count; i++) {
        const y = -6.0 + (i / (count - 1)) * 12.0;
        const tGeo = new THREE.TorusGeometry(3.6, 0.65, 16, 48);
        const col = (i % 2 === 0 ? c1 : c2);
        const tMat = new THREE.MeshStandardMaterial({ color: col, wireframe: true });
        const roll = new THREE.Mesh(tGeo, tMat);
        roll.position.y = y;
        roll.rotation.x = Math.PI / 2;
        group.add(roll);
        rolls.push(roll);
      }

      scene.userData = { group, rolls, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.3;
      data.rolls.forEach((r, idx) => {
        const dir = (idx % 2 === 0 ? 1 : -1);
        r.rotation.z = dir * t * 1.5;
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
