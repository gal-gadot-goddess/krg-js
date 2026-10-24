// visualizers/magnetar_starquake_gamma_burst.js
// Magnetar Crust Starquake & Giant Gamma Flare
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.magnetar_starquake_gamma_burst = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "magnetar_starquake_gamma_burst",
    title: "Magnetar Crust Starquake & Giant Gamma Flare",
    fileName: "magnetar_starquake.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u26a1 Billion-Tesla magnetic field fracture & relativistic gamma flare from a magnetar starquake in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udca5\n\n#threejs #webgl #magnetar #starquake #gammaray #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Magnetar Magnetic Stress Tensor Fracture\nfunction magneticTorqueStress(B = 1e11, R = 10) {\n  const shearModulus = 1e30; // dyne/cm^2\n  const maxShearStrain = (B * B) / (8 * Math.PI * shearModulus);\n  const starquakeEnergy = 1e44 * Math.sin(maxShearStrain * 100);\n  return { maxShearStrain, starquakeEnergy };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.9,
        0.2
    ],
    "secondaryColor": [
        0.8,
        0.1,
        0.95
    ],
    "fieldLines": 48
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

      // Ultra-Magnetic Core Sphere
      const coreGeo = new THREE.SphereGeometry(2.8, 48, 48);
      const coreMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.8, wireframe: true
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Toroidal Magnetic Dipole Field Lines
      const linesGroup = new THREE.Group();
      group.add(linesGroup);
      const lineCount = params.fieldLines;

      for (let i = 0; i < lineCount; i++) {
        const phi = (i / lineCount) * Math.PI * 2;
        const pts = [];
        const scale = 5.0 + (i % 3) * 2.2;
        for (let t = -Math.PI * 0.9; t <= Math.PI * 0.9; t += 0.08) {
          const r = scale * Math.cos(t) * Math.cos(t);
          const x = r * Math.sin(t) * Math.cos(phi);
          const y = r * Math.cos(t);
          const z = r * Math.sin(t) * Math.sin(phi);
          pts.push(new THREE.Vector3(x, y, z));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({
          color: (i % 2 === 0) ? c1 : c2, transparent: true, opacity: 0.65
        });
        linesGroup.add(new THREE.Line(geo, mat));
      }

      // Starquake expanding blast wave particles
      const bCount = 3500;
      const bPos = new Float32Array(bCount * 3);
      for (let i = 0; i < bCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const rad = 3.0 + Math.random() * 8.0;
        bPos[i * 3] = rad * Math.sin(v) * Math.cos(u);
        bPos[i * 3 + 1] = rad * Math.cos(v);
        bPos[i * 3 + 2] = rad * Math.sin(v) * Math.sin(u);
      }
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
      const blastPoints = new THREE.Points(bGeo, new THREE.PointsMaterial({
        color: c1, size: 0.16, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.85
      }));
      group.add(blastPoints);

      scene.userData = { group, core, linesGroup, blastPoints, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.core.rotation.y = t * 2.5;
      data.linesGroup.rotation.y = t * 0.5;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.2;

      const p = data.blastPoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        const d = Math.sqrt(p[i]*p[i] + p[i+1]*p[i+1] + p[i+2]*p[i+2]);
        const factor = 1.0 + 0.015 * Math.sin(t * 4 + d);
        p[i] *= factor;
        p[i+1] *= factor;
        p[i+2] *= factor;
        if (d > 14.0) { p[i] *= 0.25; p[i+1] *= 0.25; p[i+2] *= 0.25; }
      }
      data.blastPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.position.y = Math.cos(t * 0.15) * 8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
