// visualizers/pulsar_magnetar_beam.js
// Magnetar & Synchrotron Beams
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.pulsar_magnetar_beam = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "pulsar_magnetar_beam",
    title: "Magnetar & Synchrotron Beams",
    fileName: "pulsar_magnetar.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u26a1 Ultra-dense Magnetar spinning at 400 RPM with collimated synchrotron gamma-ray beams! Magnetic field exceeding 10^11 Tesla in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd2c\n\n#threejs #webgl #pulsar #space #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Ultra-Relativistic Synchrotron Beam Cones\nfunction renderPulsarBeams(scene, beamLength = 25, rpm = 450) {\n  const coneGeo = new THREE.ConeGeometry(3.5, beamLength, 32, 1, true);\n  const beamMat = new THREE.MeshBasicMaterial({\n    color: 0x38bdf8,\n    wireframe: true,\n    transparent: true,\n    opacity: 0.65,\n    blending: THREE.AdditiveBlending\n  });\n  const northBeam = new THREE.Mesh(coneGeo, beamMat);\n  const southBeam = northBeam.clone();\n  southBeam.rotation.x = Math.PI;\n  return { northBeam, southBeam };\n}",

    defaultParams: {
    "spinSpeed": 8.0,
    "beamLength": 24.0,
    "fieldParticles": 8000,
    "primaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "secondaryColor": [
        0.85,
        0.2,
        0.95
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

      camera.position.set(0, 3, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Star core
      const starGeo = new THREE.SphereGeometry(1.6, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Dual relativistic cones
      const beamGeo = new THREE.ConeGeometry(3.2, params.beamLength, 32, 12, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending
      });
      const beamN = new THREE.Mesh(beamGeo, beamMat);
      beamN.position.y = params.beamLength / 2;
      const beamS = new THREE.Mesh(beamGeo, beamMat);
      beamS.position.y = -params.beamLength / 2;
      beamS.rotation.x = Math.PI;

      const beamSystem = new THREE.Group();
      beamSystem.add(beamN);
      beamSystem.add(beamS);
      group.add(beamSystem);

      // Dipolar magnetic field loop particles
      const count = params.fieldParticles;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2 * 12;
        const u = (i / count) * Math.PI;
        const r = 2.0 + Math.sin(u) * 6.5;
        pos[i * 3 + 0] = Math.cos(theta) * r;
        pos[i * 3 + 1] = Math.cos(u) * 7.5;
        pos[i * 3 + 2] = Math.sin(theta) * r;

        col[i * 3 + 0] = params.secondaryColor[0];
        col[i * 3 + 1] = params.secondaryColor[1];
        col[i * 3 + 2] = params.secondaryColor[2];
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, blending: THREE.AdditiveBlending });
      const fieldMesh = new THREE.Points(pGeo, pMat);
      group.add(fieldMesh);

      scene.userData = { group, beamSystem, fieldMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * data.params.spinSpeed;
      data.beamSystem.rotation.z = Math.sin(t * 1.5) * 0.45 + 0.35;
      data.fieldMesh.rotation.y = -t * 1.2;

      camera.position.x = Math.sin(t * 0.3) * 19;
      camera.position.z = Math.cos(t * 0.3) * 19;
      camera.position.y = Math.cos(t * 0.4) * 6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
