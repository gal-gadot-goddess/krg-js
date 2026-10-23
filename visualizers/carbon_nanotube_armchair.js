// visualizers/carbon_nanotube_armchair.js
// Carbon Nanotube Ballistic Flow
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.carbon_nanotube_armchair = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "carbon_nanotube_armchair",
    title: "Carbon Nanotube Ballistic Flow",
    fileName: "carbon_nanotube.js",
    category: "Quantum Mechanics & Biotech",
    genre: "cyber",
    caption: "\ud83d\udd2c Ballistic electron transport through a single-walled carbon nanotube! High-speed quantum electron wavepackets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #nanotechnology #nanotube #graphene #physics #creativecoding #javascript #reels",
    
    displayCode: "// Cylindrical SWCNT Lattice Coordinates\nfunction rollNanotubeCylinder(radius = 3.2, length = 18, rings = 40) {\n  const atoms = [];\n  for (let ring = 0; ring < rings; ring++) {\n    const y = (ring / rings) * length - length / 2;\n    for (let c = 0; c < 16; c++) {\n      const theta = (c / 16) * Math.PI * 2 + (ring % 2) * 0.2;\n      atoms.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));\n    }\n  }\n  return atoms;\n}",

    defaultParams: {
    "radius": 3.0,
    "length": 18.0,
    "electronCount": 4000,
    "primaryColor": [
        0.2,
        0.95,
        0.85
    ],
    "secondaryColor": [
        0.95,
        0.3,
        0.8
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

      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Nanotube cylinder wireframe
      const cylGeo = new THREE.CylinderGeometry(params.radius, params.radius, params.length, 24, 32, true);
      const cylMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.75
      });
      const tube = new THREE.Mesh(cylGeo, cylMat);
      group.add(tube);

      // Electrons flowing through cylinder
      const count = params.electronCount;
      const ePos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * params.length;
        ePos[i * 3 + 0] = Math.cos(th) * params.radius * 0.9;
        ePos[i * 3 + 1] = y;
        ePos[i * 3 + 2] = Math.sin(th) * params.radius * 0.9;
      }
      const eGeo = new THREE.BufferGeometry();
      eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
      const eMat = new THREE.PointsMaterial({ size: 0.14, color: 0xffffff, blending: THREE.AdditiveBlending });
      const electrons = new THREE.Points(eGeo, eMat);
      group.add(electrons);

      scene.userData = { group, tube, electrons, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = 0.5;
      data.group.rotation.y = t * 0.8;

      const pos = data.electrons.geometry.attributes.position;
      const len = data.params.length;
      for (let i = 0; i < data.count; i++) {
        let y = pos.getY(i) + 0.25;
        if (y > len / 2) y = -len / 2;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
