// visualizers/von_karman_coherent_swirling_wake_vorticity.js
// Von Kármán Coherent Vortex Street & Swirling Wake
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.von_karman_coherent_swirling_wake_vorticity = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "von_karman_coherent_swirling_wake_vorticity",
    title: "Von Kármán Coherent Vortex Street & Swirling Wake",
    fileName: "von_karman_wake.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83c\udf0a Periodic Strouhal shedding: alternating clockwise and counter-clockwise swirling vortices past a cylinder in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf00\u2728\n\n#threejs #webgl #vonkarman #vortexstreet #fluidmechanics #cfd #aerodynamics #codeart",
    
    displayCode: "// Strouhal Shedding Frequency: f_s = St * U / D\nfunction strouhalFrequency(U, D, St) {\n  return (St * U) / D;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.35,
        0.75
    ],
    "strouhal": 0.21
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

      // Obstacle Cylinder
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 10.0, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
      cyl.position.x = -6.5;
      group.add(cyl);

      // 24,000 Swirling Wake Vortex Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = -5.0 + Math.random() * 16.0;
        const sign = (Math.sin(x * 0.8) > 0) ? 1 : -1;
        const vortexY = sign * (1.8 + (x + 5.0) * 0.15);
        const y = vortexY + (Math.random() - 0.5) * 1.8;
        const z = (Math.random() - 0.5) * 8.0;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = (sign > 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, y, z, speed: 2.5 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const wake = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(wake);

      scene.userData = { group, wake, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.wake.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].x += pData[i].speed * 0.05;
        if (pData[i].x > 11.0) pData[i].x = -5.0;
        pos[i * 3] = pData[i].x;
      }
      data.wake.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
