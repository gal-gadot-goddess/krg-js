// visualizers/dark_matter_halo_nfw_cusp.js
// Cosmic Dark Matter Halo & Navarro-Frenk-White Virial Cusp
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.dark_matter_halo_nfw_cusp = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "dark_matter_halo_nfw_cusp",
    title: "Cosmic Dark Matter Halo & Navarro-Frenk-White Virial Cusp",
    fileName: "dark_matter_halo.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Invisible galactic dark matter halo filaments & Navarro-Frenk-White virial density cusp in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #darkmatter #nfw #halo #cosmology #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Navarro-Frenk-White (NFW) Radial Density Profile\nfunction nfwDensity(r, rho0 = 1.0, rs = 4.0) {\n  const x = r / rs;\n  return rho0 / (x * Math.pow(1 + x, 2));\n}",

    defaultParams: {
    "primaryColor": [
        0.6,
        0.2,
        1.0
    ],
    "secondaryColor": [
        0.1,
        0.85,
        1.0
    ],
    "particleCount": 8500
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

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);
      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      for (let i = 0; i < count; i++) {
        // NFW cusp distribution: high density at center, logarithmic tail
        const u = Math.random();
        const r = 0.5 + Math.pow(u, 2.5) * 11.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0);

        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        const mix = r / 11.5;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const haloGeo = new THREE.BufferGeometry();
      haloGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const haloPoints = new THREE.Points(haloGeo, new THREE.PointsMaterial({
        size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.85
      }));
      group.add(haloPoints);

      // Embedded luminous central galaxy
      const galGeo = new THREE.SphereGeometry(1.2, 24, 24);
      const galMesh = new THREE.Mesh(galGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      group.add(galMesh);

      scene.userData = { group, haloPoints, galMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      data.group.rotation.x = Math.sin(t * 0.15) * 0.2;

      const p = data.haloPoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Virial orbital velocity around cusp
        const r = Math.sqrt(p[i]*p[i] + p[i+1]*p[i+1] + p[i+2]*p[i+2]);
        const v = 0.015 / Math.sqrt(r + 0.5);
        const ang = Math.atan2(p[i+1], p[i]) + v;
        const rad = Math.sqrt(p[i]*p[i] + p[i+1]*p[i+1]);
        p[i] = Math.cos(ang) * rad;
        p[i+1] = Math.sin(ang) * rad;
      }
      data.haloPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
