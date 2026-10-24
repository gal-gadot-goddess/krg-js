// visualizers/quaternion_rotor_spherical_harmonics.js
// 4D Quaternion Rotor & Spherical Harmonic Orbital Lobes
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quaternion_rotor_spherical_harmonics = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quaternion_rotor_spherical_harmonics",
    title: "4D Quaternion Rotor & Spherical Harmonic Orbital Lobes",
    fileName: "quaternion_rotor.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd2e 4D quaternion double-cover SO(3) rotations projecting undulating real spherical harmonic orbital lobes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #quaternion #sphericalharmonics #orbital #higherdimensions #creativecoding #javascript #reels",
    
    displayCode: "// Spherical Harmonics Y_l^m Complex Angular Lobes\nfunction sphericalHarmonicY32(theta, phi) {\n  // l = 3, m = 2 octupole lobe\n  const r = 4.5 * Math.sin(theta) * Math.sin(theta) * Math.cos(theta) * Math.cos(2 * phi);\n  return Math.abs(r);\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.2,
        0.8
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "lobeDivs": 45
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
      const n = params.lobeDivs;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const theta = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const phi = (j / n) * Math.PI * 2;
          // Octupole spherical harmonic lobe
          const r = 2.0 + 3.8 * Math.pow(Math.sin(theta), 2) * Math.abs(Math.cos(2 * phi));
          pts.push(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.cos(theta),
            r * Math.sin(theta) * Math.sin(phi)
          );
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const lobeMesh = new THREE.Mesh(geo, mat);
      group.add(lobeMesh);

      scene.userData = { group, lobeMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.4;
      data.group.rotation.z = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
