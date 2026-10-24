// visualizers/hydraulic_jump_circular_shock.js
// Circular Radial Hydraulic Shock Wave Jump
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hydraulic_jump_circular_shock = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hydraulic_jump_circular_shock",
    title: "Circular Radial Hydraulic Shock Wave Jump",
    fileName: "hydraulic_jump.js",
    category: "Fluid Dynamics & Plasma",
    genre: "fluid",
    caption: "\ud83c\udf0a Supercritical shallow laminar jet transitioning across a circular shock into turbulent deep water in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83c\udf00\n\n#threejs #webgl #hydraulicjump #shockwave #fluiddynamics #froude #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Froude Number Critical Hydraulic Transition\nfunction froudeNumber(v, h, g = 9.81) {\n  const Fr = v / Math.sqrt(g * h);\n  const isSupercritical = Fr > 1.0;\n  return { Fr, isSupercritical };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.75,
        1.0
    ],
    "secondaryColor": [
        0.9,
        0.95,
        1.0
    ],
    "jumpRadius": 4.5
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

      // Radial Flow Disk with Jump Step
      const geo = new THREE.RingGeometry(0.5, 8.0, 48, 20);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i);
        const r = Math.sqrt(x*x + y*y);
        const h = r < 4.2 ? -1.0 : 1.2;
        pos.setZ(i, h);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({ color: c1, wireframe: true, side: THREE.DoubleSide });
      const jumpMesh = new THREE.Mesh(geo, mat);
      jumpMesh.rotation.x = -Math.PI / 2;
      group.add(jumpMesh);

      scene.userData = { group, jumpMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 10 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
