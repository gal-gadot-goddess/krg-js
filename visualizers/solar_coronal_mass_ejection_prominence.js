// visualizers/solar_coronal_mass_ejection_prominence.js
// Solar Magnetic Helicity Prominence & CME Eruption
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.solar_coronal_mass_ejection_prominence = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "solar_coronal_mass_ejection_prominence",
    title: "Solar Magnetic Helicity Prominence & CME Eruption",
    fileName: "solar_cme_prominence.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u2600\ufe0f Twisted solar magnetic flux ropes erupting into an explosive billion-ton Coronal Mass Ejection in Three.js! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd25\n\n#threejs #webgl #solarphysics #sun #cme #plasma #spaceweather #codeart",
    
    displayCode: "// Magnetic Helicity & Lorentz Force Balance\nfunction lorentzForce(j, B) {\n  // F = (j x B) - grad(P) + rho * g\n  return new THREE.Vector3().crossVectors(j, B);\n}\nconst kink_instability = (twist > 2.5 * Math.PI);",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.3,
        0.05
    ],
    "secondaryColor": [
        1.0,
        0.9,
        0.15
    ],
    "fluxTwist": 3.2
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

      // Solar Photosphere base sphere
      const sun = new THREE.Mesh(
        new THREE.SphereGeometry(6.0, 48, 48),
        new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff3300, emissiveIntensity: 0.8 })
      );
      sun.position.y = -6.5;
      group.add(sun);

      // Prominence Twisted Magnetic Flux Loops (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * Math.PI; // along the arch
        const archR = 7.5;
        const archX = Math.cos(u) * archR;
        const archY = Math.sin(u) * archR - 1.0;
        const twistAngle = u * 8.0 + Math.random() * 0.4;
        const tubeRad = 0.8 + Math.sin(u) * 1.2;

        pPos[i * 3] = archX + Math.cos(twistAngle) * tubeRad;
        pPos[i * 3 + 1] = archY + Math.sin(twistAngle) * tubeRad;
        pPos[i * 3 + 2] = Math.sin(twistAngle) * tubeRad * 1.5;

        const col = c1.clone().lerp(c2, Math.sin(u));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ u, twistAngle, tubeRad });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const prominence = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(prominence);

      scene.userData = { group, prominence, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.prominence.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const pulsate = Math.sin(t * 3.5 + it.u * 4.0) * 0.3;
        pos[i * 3 + 1] += pulsate * 0.05;
      }
      data.prominence.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 4 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    }
  };
});
