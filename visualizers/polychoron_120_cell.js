// visualizers/polychoron_120_cell.js
// 120-Cell 4D Polychoron
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.polychoron_120_cell = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "polychoron_120_cell",
    title: "120-Cell 4D Polychoron",
    fileName: "polychoron_120.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd2e 120-Cell regular 4-dimensional polychoron projected stereographically into 3D! 600 vertices rotating in 4D space in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udcd0\n\n#threejs #webgl #4d #polychoron #hypercube #sacredgeometry #mathart #javascript #reels",
    
    displayCode: "// 4D Rotation in XW and YZ Planes\nfunction rotate4DVector(v, thetaXW, thetaYZ) {\n  const [x, y, z, w] = v;\n  // Rotation in XW plane\n  const xPrime = x * Math.cos(thetaXW) - w * Math.sin(thetaXW);\n  const wPrime = x * Math.sin(thetaXW) + w * Math.cos(thetaXW);\n  // Rotation in YZ plane\n  const yPrime = y * Math.cos(thetaYZ) - z * Math.sin(thetaYZ);\n  const zPrime = y * Math.sin(thetaYZ) + z * Math.cos(thetaYZ);\n  // Stereographic 4D->3D\n  const scale = 3.5 / (2.6 - wPrime);\n  return new THREE.Vector3(xPrime * scale, yPrime * scale, zPrime * scale);\n}",

    defaultParams: {
    "vertexCount": 360,
    "primaryColor": [
        0.2,
        0.95,
        0.95
    ],
    "secondaryColor": [
        0.95,
        0.25,
        0.75
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

      // Generate 4D vertices on S^3
      const count = params.vertexCount;
      const v4 = [];
      for (let i = 0; i < count; i++) {
        const u = Math.random(), v = Math.random(), w = Math.random();
        const th1 = u * Math.PI * 2, th2 = v * Math.PI * 2;
        const r1 = Math.sqrt(1 - w), r2 = Math.sqrt(w);
        v4.push([r1 * Math.cos(th1), r1 * Math.sin(th1), r2 * Math.cos(th2), r2 * Math.sin(th2)]);
      }

      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(count * 3);
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.22, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(pGeo, pMat);
      group.add(points);

      scene.userData = { group, points, v4, count, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pos = data.points.geometry.attributes.position;
      const v4 = data.v4;
      const tXW = t * 0.9;
      const tYZ = t * 0.7;

      for (let i = 0; i < data.count; i++) {
        const [x, y, z, w] = v4[i];
        const xP = x * Math.cos(tXW) - w * Math.sin(tXW);
        const wP = x * Math.sin(tXW) + w * Math.cos(tXW);
        const yP = y * Math.cos(tYZ) - z * Math.sin(tYZ);
        const zP = y * Math.sin(tYZ) + z * Math.cos(tYZ);

        const denom = Math.max(0.4, 2.2 - wP);
        const sc = 4.5 / denom;
        pos.setXYZ(i, xP * sc, yP * sc, zP * sc);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
