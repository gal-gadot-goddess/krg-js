// visualizers/supernova_stellar_explosion.js
// Supernova Shockwave & Nebula
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.supernova_stellar_explosion = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "supernova_stellar_explosion",
    title: "Supernova Shockwave & Nebula",
    fileName: "supernova.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83d\udca5 Cataclysmic Type-II Supernova core-collapse & shockwave explosion in Three.js WebGL! Over 10,000 relativistic ejecta particles expanding at 15,000 km/s. Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\u2728\n\n#threejs #webgl #astronomy #supernova #space #creativecoding #javascript #mathart #reels",
    
    displayCode: "// Core-Collapse Supernova Shockwave Particle Ejecta\nfunction initSupernovaShockwave(particles = 10000) {\n  const geo = new THREE.BufferGeometry();\n  const pos = new Float32Array(particles * 3);\n  const vel = new Float32Array(particles * 3);\n\n  for (let i = 0; i < particles; i++) {\n    // Isotropic blast wave with Rayleigh-Taylor finger instability\n    const theta = Math.random() * Math.PI * 2;\n    const phi = Math.acos(2 * Math.random() - 1);\n    const speed = 2.5 + Math.random() * 4.5;\n    \n    vel[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * speed;\n    vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;\n    vel[i * 3 + 2] = Math.cos(phi) * speed;\n  }\n  return { geo, vel };\n}",

    defaultParams: {
    "particleCount": 11000,
    "coreRadius": 1.4,
    "blastSpeed": 2.2,
    "primaryColor": [
        1.0,
        0.45,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.7,
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

      camera.position.set(0, 4, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Core pulsating neutron star remnant
      const coreGeo = new THREE.SphereGeometry(params.coreRadius, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.9 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Shockwave spherical particle shells
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const dirs = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      const pCol = params.primaryColor;
      const sCol = params.secondaryColor;

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const dx = Math.sin(phi) * Math.cos(theta);
        const dy = Math.sin(phi) * Math.sin(theta);
        const dz = Math.cos(phi);

        dirs[i * 3 + 0] = dx;
        dirs[i * 3 + 1] = dy;
        dirs[i * 3 + 2] = dz;

        const spd = 1.0 + Math.random() * 3.5;
        speeds[i] = spd;

        const r0 = params.coreRadius * (0.8 + Math.random() * 0.4);
        pos[i * 3 + 0] = dx * r0;
        pos[i * 3 + 1] = dy * r0;
        pos[i * 3 + 2] = dz * r0;

        const mix = Math.random();
        col[i * 3 + 0] = pCol[0] * mix + sCol[0] * (1 - mix);
        col[i * 3 + 1] = pCol[1] * mix + sCol[1] * (1 - mix);
        col[i * 3 + 2] = pCol[2] * mix + sCol[2] * (1 - mix);
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
      });
      const pMesh = new THREE.Points(pGeo, pMat);
      group.add(pMesh);

      scene.userData = { group, coreMesh, pMesh, dirs, speeds, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pPos = data.pMesh.geometry.attributes.position;
      const count = data.count;
      const loopTime = (t * 0.8) % 10.0;
      const pulse = 1.0 + Math.sin(t * 6.0) * 0.25;

      data.coreMesh.scale.set(pulse, pulse, pulse);
      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;

      for (let i = 0; i < count; i++) {
        const spd = data.speeds[i];
        const dist = 1.2 + loopTime * spd * 1.35;
        pPos.setXYZ(
          i,
          data.dirs[i * 3 + 0] * dist,
          data.dirs[i * 3 + 1] * dist,
          data.dirs[i * 3 + 2] * dist
        );
      }
      pPos.needsUpdate = true;

      const camRadius = 18 + Math.sin(t * 0.3) * 3;
      camera.position.x = Math.sin(t * 0.25) * camRadius;
      camera.position.z = Math.cos(t * 0.25) * camRadius;
      camera.position.y = Math.sin(t * 0.4) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
