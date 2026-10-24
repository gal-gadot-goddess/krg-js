// visualizers/gap_junction_connexon_hexamer_channel.js
// Connexin-43 Hexameric Hemichannel Gap Junction Pore
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.gap_junction_connexon_hexamer_channel = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "gap_junction_connexon_hexamer_channel",
    title: "Connexin-43 Hexameric Hemichannel Gap Junction Pore",
    fileName: "gap_junction_connexon.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\u26a1 Direct intercellular communication: Connexin-43 hexameric connexon channels docking between cell membranes in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #connexin #gapjunction #cellbiology #biophysics #nanomachines #codeart",
    
    displayCode: "// Connexon Hexamer Pore Permeability (Cutoff ~ 1 kDa)\nfunction poreFlux(delta_V, delta_C) {\n  // J = - D * (dC / dx) + z * mu * C * E\n  return 1.4e-12 * delta_C;\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.25
    ],
    "hexRadius": 3.2
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

      // 6 Connexin Subunits forming the Hexamer
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        const cx = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.7, 8.0, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.55 })
        );
        cx.position.set(Math.cos(theta) * params.hexRadius, 0, Math.sin(theta) * params.hexRadius);
        group.add(cx);
      }

      // Intercellular Ion Stream through Channel (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = Math.random() * 1.5;
        const th = Math.random() * Math.PI * 2;
        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = -5.0 + Math.random() * 10.0;
        pPos[i * 3 + 2] = Math.sin(th) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
