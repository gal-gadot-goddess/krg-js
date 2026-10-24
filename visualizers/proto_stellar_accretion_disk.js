// visualizers/proto_stellar_accretion_disk.js
// Protostellar Circumstellar Disk & Herbig-Haro Bipolar Jets
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.proto_stellar_accretion_disk = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "proto_stellar_accretion_disk",
    title: "Protostellar Circumstellar Disk & Herbig-Haro Bipolar Jets",
    fileName: "protostellar_disk.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u2728 Newborn protostar feeding on circumstellar protoplanetary disk gas and shooting collimated Herbig-Haro jets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udd2d\n\n#threejs #webgl #protostar #herbig_haro #astronomy #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Protostellar Magnetocentrifugal Jet Acceleration\nfunction herbigHaroJet(z, r, B_phi, B_z) {\n  const alfvenVelocity = Math.sqrt((B_phi * B_phi + B_z * B_z) / 4 * Math.PI);\n  const jetCollimation = r / (1.0 + Math.pow(z * 0.2, 1.5));\n  return { alfvenVelocity, jetCollimation };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.55,
        0.15
    ],
    "secondaryColor": [
        0.2,
        0.75,
        1.0
    ],
    "diskParticles": 7500
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
      camera.position.set(0, 6, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Protostar Core
      const proto = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 32, 32),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 1.0 })
      );
      group.add(proto);

      // Flared Circumstellar Accretion Disk
      const count = params.diskParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 2.0 + Math.random() * 8.5;
        const flare = Math.pow(rad / 10.5, 1.5) * 0.8;
        pos[i * 3] = Math.cos(theta) * rad;
        pos[i * 3 + 1] = (Math.random() - 0.5) * flare;
        pos[i * 3 + 2] = Math.sin(theta) * rad;

        const mix = rad / 10.5;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const diskGeo = new THREE.BufferGeometry();
      diskGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      diskGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const diskPoints = new THREE.Points(diskGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(diskPoints);

      // Herbig-Haro Bipolar Jets
      const jCount = 2000;
      const jPos = new Float32Array(jCount * 3);
      for (let i = 0; i < jCount; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const z = 1.8 + Math.random() * 11.0;
        const spread = (z * 0.08) * Math.sqrt(Math.random());
        const a = Math.random() * Math.PI * 2;
        jPos[i * 3] = Math.cos(a) * spread;
        jPos[i * 3 + 1] = sign * z;
        jPos[i * 3 + 2] = Math.sin(a) * spread;
      }
      const jGeo = new THREE.BufferGeometry();
      jGeo.setAttribute('position', new THREE.BufferAttribute(jPos, 3));
      const jetPoints = new THREE.Points(jGeo, new THREE.PointsMaterial({ color: c2, size: 0.16, blending: THREE.AdditiveBlending }));
      group.add(jetPoints);

      scene.userData = { group, proto, diskPoints, jetPoints, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.proto.rotation.y = t * 1.5;

      const p = data.jetPoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        if (p[i+1] > 0) {
          p[i+1] += 0.22;
          if (p[i+1] > 13.0) p[i+1] = 1.8;
        } else {
          p[i+1] -= 0.22;
          if (p[i+1] < -13.0) p[i+1] = -1.8;
        }
      }
      data.jetPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 5 + Math.sin(t * 0.18) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
