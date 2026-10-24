// visualizers/optomechanical_optical_tweezer.js
// Dual-Beam Laser Optical Cavity Tweezer Trapping
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.optomechanical_optical_tweezer = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "optomechanical_optical_tweezer",
    title: "Dual-Beam Laser Optical Cavity Tweezer Trapping",
    fileName: "optical_tweezer.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\ud83d\udd2c Laser gradient radiation pressure optical tweezers trapping and cooling levitated dielectric nanoparticles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\u2728\n\n#threejs #webgl #opticaltweezers #lasertrapping #nanotechnology #quantumoptics #creativecoding #javascript #reels",
    
    displayCode: "// Optical Dipole Gradient Force\nfunction opticalGradientForce(I, gradI, alpha_p) {\n  // F_grad = (1/2) * alpha_p * grad(E^2)\n  const force = 0.5 * alpha_p * gradI;\n  return force; // directed towards highest intensity focal point\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.2,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "trapStiffness": 2.5
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

      // Laser Gaussian Beam Focus Cones
      const cone1 = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 8.0, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.5 })
      );
      cone1.position.y = 4.0;
      group.add(cone1);

      const cone2 = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 8.0, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.5 })
      );
      cone2.position.y = -4.0;
      cone2.rotation.x = Math.PI;
      group.add(cone2);

      // Trapped Levitated Nanoparticle
      const nano = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.8, roughness: 0.2 })
      );
      group.add(nano);

      // Trapped Brownian Motion Track Points
      const tCount = 800;
      const tPos = new Float32Array(tCount * 3);
      const trackGeo = new THREE.BufferGeometry();
      trackGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      const track = new THREE.Points(trackGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));
      group.add(track);

      scene.userData = { group, nano, track, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      // Brownian oscillation in harmonic optical potential
      const ox = Math.sin(t * 12.0) * 0.25 + Math.cos(t * 8.5) * 0.15;
      const oy = Math.cos(t * 14.0) * 0.2 + Math.sin(t * 9.2) * 0.12;
      const oz = Math.sin(t * 11.0) * 0.2;
      data.nano.position.set(ox, oy, oz);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
