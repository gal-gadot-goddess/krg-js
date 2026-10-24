// visualizers/gravitational_lensing_einstein_ring.js
// Relativistic Gravitational Lensing & Dual Einstein Rings
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.gravitational_lensing_einstein_ring = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "gravitational_lensing_einstein_ring",
    title: "Relativistic Gravitational Lensing & Dual Einstein Rings",
    fileName: "gravitational_lensing.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udd2d General Relativity Gravitational Lensing & Dual Einstein Rings bending spacetime geodesics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #einstein #gravitationallensing #relativity #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Einstein Ring Angular Deflection Angle\nfunction deflectionAngle(r, mass = 4e6, G = 6.674e-11, c = 3e8) {\n  const thetaE = Math.sqrt((4 * G * mass) / (c * c * r));\n  const warpX = Math.cos(thetaE) / (1 + r * 0.1);\n  return { thetaE, warpX };\n}",

    defaultParams: {
    "primaryColor": [
        0.3,
        0.7,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.8,
        0.2
    ],
    "ringRadius": 6.0
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
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Dual Einstein Rings
      const ringGeo1 = new THREE.TorusGeometry(params.ringRadius, 0.18, 30, 200);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: c1, transparent: true, opacity: 0.85, wireframe: true });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      group.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(params.ringRadius * 0.65, 0.12, 24, 160);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: c2, transparent: true, opacity: 0.8, wireframe: true });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      group.add(ring2);

      // Deflected background star particle lattice
      const pCount = 6000;
      const positions = new Float32Array(pCount * 3);
      const colors = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 2.0 + Math.random() * 10.0;
        const warp = 1.0 + 1.8 / (rad * 0.8);
        positions[i * 3] = Math.cos(theta) * rad * warp;
        positions[i * 3 + 1] = Math.sin(theta) * rad * warp;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6.0;

        const mix = rad / 12.0;
        const col = c1.clone().lerp(c2, mix);
        colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
      }

      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const starMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
      const starField = new THREE.Points(starGeo, starMat);
      group.add(starField);

      // Central gravitational lensing mass
      const massMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x010206 })
      );
      group.add(massMesh);

      scene.userData = { group, ring1, ring2, starField, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.15;
      data.ring1.rotation.x = Math.sin(t * 0.3) * 0.4;
      data.ring1.rotation.y = Math.cos(t * 0.25) * 0.4;
      data.ring2.rotation.x = -Math.sin(t * 0.3) * 0.4;
      data.ring2.rotation.y = -Math.cos(t * 0.25) * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.y = Math.cos(t * 0.18) * 6;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
