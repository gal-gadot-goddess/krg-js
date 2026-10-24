// visualizers/heliospheric_bow_shock_sheath.js
// Solar Wind Heliosphere & Interstellar Boundary Bow Shock
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.heliospheric_bow_shock_sheath = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "heliospheric_bow_shock_sheath",
    title: "Solar Wind Heliosphere & Interstellar Boundary Bow Shock",
    fileName: "heliosphere_shock.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u2600\ufe0f The protective solar heliosphere bubble colliding with interstellar medium magnetic fields in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\ud83d\udee1\ufe0f\n\n#threejs #webgl #heliosphere #solarwind #bowshock #interstellar #creativecoding #javascript #reels",
    
    displayCode: "// Magnetopause Balance Pressure Stagnation Point\nfunction heliopauseStagnation(rho_sw, v_sw, B_ism) {\n  const ramPressure = rho_sw * v_sw * v_sw;\n  const magneticPressure = (B_ism * B_ism) / (8 * Math.PI);\n  return Math.sqrt(ramPressure / magneticPressure);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.8,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.5,
        1.0
    ],
    "flowCount": 7000
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

      // Parabolic Bow Shock Wave Surface
      const shockGeo = new THREE.CylinderGeometry(8.0, 1.5, 12.0, 32, 20, true);
      shockGeo.rotateZ(Math.PI / 2);
      const shockMat = new THREE.MeshBasicMaterial({
        color: c1, wireframe: true, transparent: true, opacity: 0.6
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      group.add(shockMesh);

      // Solar Wind & Interstellar Plasma Particle Stream
      const count = params.flowCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16.0;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10.0;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10.0;

        const isSolar = pos[i * 3] < 0;
        const col = isSolar ? c1 : c2;
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const flowGeo = new THREE.BufferGeometry();
      flowGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      flowGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const plasmaFlow = new THREE.Points(flowGeo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(plasmaFlow);

      scene.userData = { group, shockMesh, plasmaFlow, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      const p = data.plasmaFlow.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.08;
        if (p[i] > 8.0) p[i] = -8.0;
      }
      data.plasmaFlow.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
