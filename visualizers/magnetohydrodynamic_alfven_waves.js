// visualizers/magnetohydrodynamic_alfven_waves.js
// MHD Alfvén Waves Propagating Along Coronal Loops
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.magnetohydrodynamic_alfven_waves = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "magnetohydrodynamic_alfven_waves",
    title: "MHD Alfvén Waves Propagating Along Coronal Loops",
    fileName: "alfven_waves.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\u2600\ufe0f Magnetohydrodynamic Alfv\u00e9n transverse plasma tension waves racing along solar coronal magnetic loops in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83e\uddf2\n\n#threejs #webgl #alfvenwaves #plasma #mhd #solarphysics #spacephysics #creativecoding #javascript #reels",
    
    displayCode: "// Alfv\u00e9n Wave Velocity in Magnetized Plasma\nfunction alfvenVelocity(B, rho) {\n  const mu0 = 4 * Math.PI * 1e-7;\n  const v_A = B / Math.sqrt(mu0 * rho);\n  return v_A; // magnetic tension wave speed\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "loopCount": 7
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
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.loopCount;
      const loops = [];

      for (let i = 0; i < count; i++) {
        const rad = 4.5 + i * 0.5;
        const pts = [];
        for (let theta = 0; theta <= Math.PI; theta += 0.08) {
          const x = Math.cos(theta) * rad;
          const y = Math.sin(theta) * rad - 2.5;
          const z = (i - count / 2) * 0.8;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({ color: (i%2===0?c1:c2), linewidth: 2 });
        const loop = new THREE.Line(lGeo, lMat);
        group.add(loop);
        loops.push(loop);
      }

      scene.userData = { group, loops, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      data.loops.forEach((l, idx) => {
        const pos = l.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const s = pos.getX(j);
          const zWave = Math.sin(s * 1.5 - t * 5.0 + idx) * 0.4;
          pos.setZ(j, (idx - data.params.loopCount / 2) * 0.8 + zWave);
        }
        pos.needsUpdate = true;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
