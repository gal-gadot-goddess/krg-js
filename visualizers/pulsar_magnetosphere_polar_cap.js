// visualizers/pulsar_magnetosphere_polar_cap.js
// Relativistic Pulsar Magnetosphere & Light Cylinder Beam
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.pulsar_magnetosphere_polar_cap = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "pulsar_magnetosphere_polar_cap",
    title: "Relativistic Pulsar Magnetosphere & Light Cylinder Beam",
    fileName: "pulsar_magnetosphere.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u26a1 Relativistic Pulsar Magnetosphere with sweeping synchrotron light-cylinder beams and magnetic dipoles in Three.js! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd2d\n\n#threejs #webgl #pulsar #neutronstar #astrophysics #relativity #creativecoding #codeart",
    
    displayCode: "// Pulsar Light Cylinder Radius R_LC = c / Omega\nfunction lightCylinder(c, omega) {\n  return c / omega;\n}\n// Synchrotron Dipole Magnetic Flux Line\nconst r_mag = R_LC * Math.pow(Math.sin(theta), 2.0);",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.85
    ],
    "rotationPeriod": 0.033,
    "dipoleTilt": 0.45
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

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Neutron star solid core with glowing atmosphere
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(1.8, 48, 48),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      group.add(core);

      // Light Cylinder boundary wireframe
      const cylGeo = new THREE.CylinderGeometry(8.5, 8.5, 18.0, 48, 1, true);
      const cylMat = new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.35 });
      const lightCyl = new THREE.Mesh(cylGeo, cylMat);
      group.add(lightCyl);

      // Dipole field closed loops & synchrotron plasma (22,000 particles)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const theta = (Math.random() - 0.5) * Math.PI * 0.92;
        const phi = Math.random() * Math.PI * 2;
        const L = 2.2 + Math.random() * 6.5; // L-shell parameter
        const r = L * Math.pow(Math.cos(theta), 2);
        const x = r * Math.cos(theta) * Math.cos(phi);
        const y = r * Math.sin(theta);
        const z = r * Math.cos(theta) * Math.sin(phi);

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
        const mix = (r - 2.0) / 6.5;
        const col = c1.clone().lerp(c2, mix);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ theta, phi, L, speed: 1.5 + Math.random() * 2.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const plasma = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(plasma);

      // Dual Relativistic Polar Lighthouse Beams
      const beamGeo = new THREE.ConeGeometry(3.5, 24.0, 32, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, wireframe: true, blending: THREE.AdditiveBlending });
      const beamNorth = new THREE.Mesh(beamGeo, beamMat);
      beamNorth.position.y = 12.0;
      const beamSouth = new THREE.Mesh(beamGeo, beamMat);
      beamSouth.position.y = -12.0;
      beamSouth.rotation.x = Math.PI;

      const beamRig = new THREE.Group();
      beamRig.add(beamNorth); beamRig.add(beamSouth);
      beamRig.rotation.z = params.dipoleTilt;
      group.add(beamRig);

      scene.userData = { group, beamRig, plasma, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.beamRig.rotation.y = t * 6.5;
      data.group.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.3) * 22;
      camera.position.z = Math.cos(t * 0.3) * 22;
      camera.position.y = 6 + Math.sin(t * 0.25) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
