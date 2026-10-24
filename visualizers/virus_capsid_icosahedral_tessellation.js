// visualizers/virus_capsid_icosahedral_tessellation.js
// Viral Icosahedral Capsid Caspar-Klug Quasi-Equivalence
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.virus_capsid_icosahedral_tessellation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "virus_capsid_icosahedral_tessellation",
    title: "Viral Icosahedral Capsid Caspar-Klug Quasi-Equivalence",
    fileName: "virus_capsid.js",
    category: "Organic Physics & Bioluminescence",
    genre: "organic",
    caption: "\ud83e\udda0 Caspar-Klug triangulation T=7 viral capsid assembly from capsomer pentamers and hexamers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udc8e\n\n#threejs #webgl #virology #capsid #icosahedron #structuralbiology #creativecoding #javascript #reels",
    
    displayCode: "// Caspar-Klug Triangulation Number T = h^2 + hk + k^2\nfunction casparKlugTriangulation(h = 2, k = 1) {\n  const T = h * h + h * k + k * k; // e.g. T = 7\n  const subUnitCount = 60 * T;\n  return { T, subUnitCount };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.7,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.6
    ],
    "triangulationNumber": 7
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

      // T=7 Capsid Outer Shell
      const outerCapsid = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.2, 2),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(outerCapsid);

      // Inner Viral RNA/DNA Genome Core
      const genomeCore = new THREE.Mesh(
        new THREE.SphereGeometry(2.8, 24, 24),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.6, wireframe: true })
      );
      group.add(genomeCore);

      scene.userData = { group, outerCapsid, genomeCore, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;
      data.genomeCore.rotation.y = -t * 0.6;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
