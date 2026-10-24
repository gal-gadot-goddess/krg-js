// visualizers/leidenfrost_droplet_star_oscillation.js
// Leidenfrost Vapor Cushion & Droplet Star-Mode Oscillations
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.leidenfrost_droplet_star_oscillation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "leidenfrost_droplet_star_oscillation",
    title: "Leidenfrost Vapor Cushion & Droplet Star-Mode Oscillations",
    fileName: "leidenfrost_star.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83d\udca7 Droplet levitating friction-free on its own insulating vapor cushion vibrating in standing azimuthal star modes in Three.js! Follow @kreggsjs for daily reels! \u26a1\u2728\n\n#threejs #webgl #leidenfrost #fluiddynamics #physics #droplet #codeart",
    
    displayCode: "// Rayleigh Droplet Surface Tension Oscillation Frequency\nfunction dropletFreq(n, sigma, rho, R) {\n  // omega_n^2 = n*(n-1)*(n+2) * sigma / (rho * R^3)\n  return Math.sqrt(n * (n - 1) * (n + 2) * (sigma / (rho * Math.pow(R, 3))));\n}",

    defaultParams: {
    "primaryColor": [
        0.25,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.4,
        0.25
    ],
    "starModes": 5
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

      // Star-shaped vibrating droplet (22,000 points)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const baseR = 4.5 + Math.cos(params.starModes * th) * 1.2;

        pPos[i * 3] = baseR * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = baseR * Math.cos(ph) * 0.6; // flattened droplet
        pPos[i * 3 + 2] = baseR * Math.sin(ph) * Math.sin(th);

        const col = c1.clone().lerp(c2, (baseR - 3.3) / 2.4);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ th, ph });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const droplet = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(droplet);

      scene.userData = { group, droplet, pData, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.droplet.geometry.attributes.position.array;
      const pData = data.pData;
      const modeAmp = Math.sin(t * 4.0) * 1.4;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const r = 4.5 + Math.cos(params.starModes * it.th) * modeAmp;
        pos[i * 3] = r * Math.sin(it.ph) * Math.cos(it.th);
        pos[i * 3 + 1] = r * Math.cos(it.ph) * 0.6;
        pos[i * 3 + 2] = r * Math.sin(it.ph) * Math.sin(it.th);
      }
      data.droplet.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
