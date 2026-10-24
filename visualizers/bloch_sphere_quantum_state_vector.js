// visualizers/bloch_sphere_quantum_state_vector.js
// Bloch Sphere Qubit Quantum State Precession
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bloch_sphere_quantum_state_vector = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bloch_sphere_quantum_state_vector",
    title: "Bloch Sphere Qubit Quantum State Precession",
    fileName: "bloch_sphere.js",
    category: "Quantum Mechanics & Biotech",
    genre: "quantum",
    caption: "\u269b\ufe0f Pure qubit quantum state vector undergoing Rabi oscillations and Larmor precession on the Bloch Sphere in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #blochsphere #qubit #quantumcomputing #rabi #creativecoding #javascript #reels",
    
    displayCode: "// Qubit Superposition State Vector |psi>\nfunction blochStateVector(theta, phi) {\n  // |psi> = cos(theta/2)|0> + exp(i*phi)*sin(theta/2)|1>\n  const x = Math.sin(theta) * Math.cos(phi);\n  const y = Math.sin(theta) * Math.sin(phi);\n  const z = Math.cos(theta);\n  return new THREE.Vector3(x * 5.0, z * 5.0, y * 5.0);\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.6
    ],
    "sphereRadius": 5.0
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
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Wireframe Bloch Sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(params.sphereRadius, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.4 })
      );
      group.add(sphere);

      // Coordinate Axes
      const axes = new THREE.AxesHelper(6.5);
      group.add(axes);

      // State Vector Arrow (Line + Cone Head)
      const arrowGeo = new THREE.CylinderGeometry(0.12, 0.12, params.sphereRadius, 16);
      arrowGeo.translate(0, params.sphereRadius / 2, 0);
      const stateArrow = new THREE.Mesh(arrowGeo, new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.8 }));
      group.add(stateArrow);

      // Quantum Precession Trace
      const trCount = 600;
      const trPos = new Float32Array(trCount * 3);
      const trGeo = new THREE.BufferGeometry();
      trGeo.setAttribute('position', new THREE.BufferAttribute(trPos, 3));
      const trace = new THREE.Line(trGeo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.7 }));
      group.add(trace);

      scene.userData = { group, stateArrow, trace, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.2;
      // Precession angles
      const theta = 0.8 + Math.sin(t * 1.5) * 0.5; // Rabi nutation
      const phi = t * 2.5; // Larmor precession

      data.stateArrow.rotation.z = Math.sin(phi) * theta;
      data.stateArrow.rotation.x = Math.cos(phi) * theta;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
