// visualizers/taylor_green_decaying_turbulence_energy_cascade.js
// Taylor-Green Vortex Decaying Turbulence Energy Cascade
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.taylor_green_decaying_turbulence_energy_cascade = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "taylor_green_decaying_turbulence_energy_cascade",
    title: "Taylor-Green Vortex Decaying Turbulence Energy Cascade",
    fileName: "taylor_green_vortex.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83c\udf00 Kolmogorov -5/3 energy cascade: Taylor-Green vortex sheet stretching, roll-up and turbulent dissipation in Three.js! Follow @kreggsjs for daily reels! \ud83c\udf0a\u2728\n\n#threejs #webgl #turbulence #taylorgreen #fluidmechanics #cfd #navierstokes #codeart",
    
    displayCode: "// Taylor-Green Analytical Initial Velocity Field\nfunction taylorGreen(x, y, z, V0) {\n  return {\n    u: V0 * Math.sin(x) * Math.cos(y) * Math.cos(z),\n    v: -V0 * Math.cos(x) * Math.sin(y) * Math.cos(z),\n    w: 0\n  };\n}",

    defaultParams: {
    "primaryColor": [
        0.35,
        0.9,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.45,
        0.25
    ],
    "reynolds": 1600.0
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

      // 24,000 Turbulent Vortex Filament Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * Math.PI * 2.5;
        const y = (Math.random() - 0.5) * Math.PI * 2.5;
        const z = (Math.random() - 0.5) * Math.PI * 2.5;

        pPos[i * 3] = x * 2.2;
        pPos[i * 3 + 1] = y * 2.2;
        pPos[i * 3 + 2] = z * 2.2;

        const vort = Math.abs(Math.sin(x) * Math.sin(y));
        const col = c1.clone().lerp(c2, vort);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const turbulence = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(turbulence);

      scene.userData = { group, turbulence, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.turbulence.rotation.x = t * 0.35;
      data.turbulence.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
