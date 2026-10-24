// visualizers/myosin_actin_power_stroke_crossbridge.js
// Actomyosin Power Stroke & Muscle Lever-Arm Tilting
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.myosin_actin_power_stroke_crossbridge = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "myosin_actin_power_stroke_crossbridge",
    title: "Actomyosin Power Stroke & Muscle Lever-Arm Tilting",
    fileName: "myosin_power_stroke.js",
    category: "Organic Physics & Bioluminescence",
    genre: "bio",
    caption: "\ud83d\udcaa Molecular muscle motor: Myosin II head executing a 10 nm mechanical power stroke along the actin thin filament in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u26a1\n\n#threejs #webgl #myosin #actin #biophysics #molecularmotors #muscle #codeart",
    
    displayCode: "// Myosin Mechanical Lever-Arm Angular Swing (70 degree stroke)\nfunction leverStroke(phase) {\n  // theta(t) = theta_pre + Delta_theta * sin(phase)^2\n  return (15.0 * Math.PI / 180.0) + (70.0 * Math.PI / 180.0) * Math.pow(Math.sin(phase), 2);\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.35,
        0.65
    ],
    "secondaryColor": [
        0.35,
        0.85,
        1.0
    ],
    "strokeRate": 3.0
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

      // Actin Double-Helical Filament Cylinder (18,000 points)
      const aCount = 18000;
      const aPos = new Float32Array(aCount * 3);
      for (let i = 0; i < aCount; i++) {
        const x = -8.0 + (i / aCount) * 16.0;
        const angle = x * 2.5;
        const rad = 0.8;
        aPos[i * 3] = x;
        aPos[i * 3 + 1] = 2.5 + Math.sin(angle) * rad;
        aPos[i * 3 + 2] = Math.cos(angle) * rad;
      }
      const aGeo = new THREE.BufferGeometry();
      aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3));
      group.add(new THREE.Points(aGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })));

      // Myosin Head Motor Arm
      const mArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.5, 4.5, 16),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6 })
      );
      mArm.position.set(0, 0, 0);
      group.add(mArm);

      scene.userData = { group, mArm, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const stroke = Math.sin(t * params.strokeRate) * 0.45;
      data.mArm.rotation.z = stroke;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 4 + Math.sin(t * 0.2) * 2;
      camera.lookAt(0, 1.5, 0);

      renderer.render(scene, camera);
    }
  };
});
