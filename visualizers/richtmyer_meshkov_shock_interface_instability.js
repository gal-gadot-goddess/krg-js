// visualizers/richtmyer_meshkov_shock_interface_instability.js
// Richtmyer-Meshkov Shock Wave Interface Instability Spikes
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.richtmyer_meshkov_shock_interface_instability = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "richtmyer_meshkov_shock_interface_instability",
    title: "Richtmyer-Meshkov Shock Wave Interface Instability Spikes",
    fileName: "richtmyer_meshkov.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83d\udca5 Shockwave-driven vorticity generation: Richtmyer-Meshkov baroclinic instability growing spikes and bubble fingers in Three.js! Follow @kreggsjs! \ud83d\udd2c\ud83d\udd25\n\n#threejs #webgl #fluidmechanics #shockwave #richtmyermeshkov #turbulence #codeart",
    
    displayCode: "// Baroclinic Vorticity Generation: d(omega)/dt = (grad(rho) x grad(P)) / rho^2\nfunction baroclinicTorque(gradRho, gradP, rho) {\n  return gradRho.clone().cross(gradP).multiplyScalar(1.0 / (rho * rho));\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "secondaryColor": [
        0.25,
        0.9,
        1.0
    ],
    "amplitude": 3.2
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

      // 24,000 Richtmyer-Meshkov Bubble & Spike Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * 16.0;
        const z = (Math.random() - 0.5) * 16.0;
        const kx = x * 0.8;
        const kz = z * 0.8;
        const y = Math.sin(kx) * Math.cos(kz) * params.amplitude + (Math.random() - 0.5) * 0.8;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + params.amplitude) / (2 * params.amplitude));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, z, kx, kz });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const spikes = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(spikes);

      scene.userData = { group, spikes, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.spikes.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        pos[i * 3 + 1] = Math.sin(it.kx + t * 2.0) * Math.cos(it.kz + t * 1.5) * 3.8;
      }
      data.spikes.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
