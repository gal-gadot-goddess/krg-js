// visualizers/solar_prominence_flare.js
// Solar Prominence & Coronal Loops
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.solar_prominence_flare = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "solar_prominence_flare",
    title: "Solar Prominence & Coronal Loops",
    fileName: "solar_flare.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\u2600\ufe0f Violent magnetic reconnection plasma loop on the Sun's surface! Turbulent coronal mass ejection in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! \ud83d\udd2d\ud83d\udd25\n\n#threejs #webgl #sun #astronomy #solarflare #physics #creativecoding #javascript #reels",
    
    displayCode: "// Magnetic Flux Rope Plasma Prominence Arcs\nfunction buildCoronalLoops(loops = 12, pointsPerLoop = 60) {\n  const loopGroup = new THREE.Group();\n  for (let l = 0; l < loops; l++) {\n    const angle = (l / loops) * Math.PI * 2;\n    const curve = new THREE.CatmullRomCurve3([\n      new THREE.Vector3(Math.cos(angle)*4, 0, Math.sin(angle)*4),\n      new THREE.Vector3(Math.cos(angle)*5.5, 3.5, Math.sin(angle)*5.5),\n      new THREE.Vector3(Math.cos(angle + 0.3)*4, 0, Math.sin(angle + 0.3)*4)\n    ]);\n    const tube = new THREE.TubeGeometry(curve, 32, 0.15, 8, false);\n    loopGroup.add(new THREE.Mesh(tube, loopMat));\n  }\n  return loopGroup;\n}",

    defaultParams: {
    "loopCount": 14,
    "plasmaParticles": 7000,
    "primaryColor": [
        1.0,
        0.35,
        0.05
    ],
    "secondaryColor": [
        1.0,
        0.9,
        0.2
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

      camera.position.set(0, 2, 17);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Star body
      const starGeo = new THREE.SphereGeometry(3.5, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xff6600, wireframe: true });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Prominence arcs
      const arcs = new THREE.Group();
      group.add(arcs);
      for (let i = 0; i < params.loopCount; i++) {
        const ang = (i / params.loopCount) * Math.PI * 2;
        const height = 2.0 + Math.random() * 2.5;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(ang) * 3.5, Math.sin(ang) * 3.5, 0),
          new THREE.Vector3(Math.cos(ang + 0.15) * (3.5 + height), Math.sin(ang + 0.15) * (3.5 + height), 0),
          new THREE.Vector3(Math.cos(ang + 0.3) * 3.5, Math.sin(ang + 0.3) * 3.5, 0)
        ]);
        const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.12, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
          transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
        });
        const arc = new THREE.Mesh(tubeGeo, tubeMat);
        arc.rotation.z = Math.random() * 0.4;
        arcs.add(arc);
      }

      // Hot CME Particles
      const pCount = params.plasmaParticles;
      const pPos = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        const r = 3.6 + Math.random() * 4.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[p * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        pPos[p * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        pPos[p * 3 + 2] = Math.cos(ph) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.14, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const pMesh = new THREE.Points(pGeo, pMat);
      group.add(pMesh);

      scene.userData = { group, arcs, pMesh, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.4;
      data.arcs.rotation.z = Math.sin(t * 0.5) * 0.2;
      data.pMesh.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 17;
      camera.position.z = Math.cos(t * 0.25) * 17;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
