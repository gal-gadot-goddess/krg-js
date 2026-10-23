// visualizers/double_pendulum_chaos_phase.js
// Double Pendulum Hamiltonian Chaos
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.double_pendulum_chaos_phase = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "double_pendulum_chaos_phase",
    title: "Double Pendulum Hamiltonian Chaos",
    fileName: "double_pendulum.js",
    category: "Chaos Theory & Attractors",
    genre: "sacred",
    caption: "\u26a1 Coupled non-linear double pendulum generating infinite fractal Hamiltonian phase trajectory trails in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #doublependulum #hamiltonian #chaos #physics #creativecoding #javascript #reels",
    
    displayCode: "// Lagrangian Mechanics of Coupled Double Pendulum\nfunction stepDoublePendulum(th1, th2, w1, w2, dt = 0.02) {\n  // Equations of motion under gravity\n  const g = 9.81, m1 = 1, m2 = 1, l1 = 3, l2 = 3;\n  const delta = th1 - th2;\n  const den1 = (m1 + m2)*l1 - m2*l1*Math.cos(delta)*Math.cos(delta);\n  const alpha1 = (-g*(2*m1+m2)*Math.sin(th1) - m2*g*Math.sin(th1-2*th2) - 2*Math.sin(delta)*m2*(w2*w2*l2 + w1*w1*l1*Math.cos(delta))) / den1;\n  return { w1Next: w1 + alpha1*dt, w2Next: w2 };\n}",

    defaultParams: {
    "trailPoints": 4000,
    "l1": 3.2,
    "l2": 3.2,
    "primaryColor": [
        0.2,
        0.95,
        1.0
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.5
    ]
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
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      camera.position.set(0, -2, 16);
      camera.lookAt(0, -2, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Pendulum Arms
      const armMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      const aGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,-3,0)]);
      const arm1 = new THREE.Line(aGeo, armMat);
      const arm2 = new THREE.Line(aGeo.clone(), armMat);
      group.add(arm1);
      group.add(arm2);

      // Trail Points
      const count = params.trailPoints;
      const tPos = new Float32Array(count * 3);
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      const tMat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const trail = new THREE.Points(tGeo, tMat);
      group.add(trail);

      scene.userData = { group, arm1, arm2, trail, tPos, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const th1 = Math.sin(t * 1.5) * 1.8;
      const th2 = Math.sin(t * 2.8) * 2.2;
      const l1 = data.params.l1, l2 = data.params.l2;

      const x1 = Math.sin(th1) * l1;
      const y1 = -Math.cos(th1) * l1;
      const x2 = x1 + Math.sin(th2) * l2;
      const y2 = y1 - Math.cos(th2) * l2;

      const p1 = data.arm1.geometry.attributes.position;
      p1.setXYZ(1, x1, y1, 0);
      p1.needsUpdate = true;

      const p2 = data.arm2.geometry.attributes.position;
      p2.setXYZ(0, x1, y1, 0);
      p2.setXYZ(1, x2, y2, 0);
      p2.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, -2, 0);

      renderer.render(scene, camera);
    }
  };
});
