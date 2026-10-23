// visualizers/wormhole_einstein_rosen.js
// Einstein-Rosen Wormhole
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.wormhole_einstein_rosen = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "wormhole_einstein_rosen",
    title: "Einstein-Rosen Wormhole",
    fileName: "wormhole.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf00 Traversable Einstein-Rosen bridge connecting two distant corners of spacetime! Relativistic light bending throat in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \ud83c\udf0c\u2728\n\n#threejs #webgl #wormhole #relativity #physics #creativecoding #javascript #space #reels",
    
    displayCode: "// Flamm's Paraboloid Throat Metric (Wormhole Funnel)\nfunction generateWormholeGeometry(radius = 3.0, length = 18, segments = 60) {\n  const geo = new THREE.CylinderGeometry(radius, radius * 3.5, length, 40, segments, true);\n  const pos = geo.attributes.position;\n  for (let i = 0; i < pos.count; i++) {\n    const y = pos.getY(i);\n    // Hyperbolic throat contour r(y) = sqrt(r0^2 + y^2)\n    const rThroat = Math.sqrt(radius * radius + y * y * 0.45);\n    const ang = Math.atan2(pos.getZ(i), pos.getX(i));\n    pos.setXYZ(i, Math.cos(ang) * rThroat, y, Math.sin(ang) * rThroat);\n  }\n  return geo;\n}",

    defaultParams: {
    "throatRadius": 2.8,
    "tunnelLength": 20.0,
    "starfieldCount": 8000,
    "primaryColor": [
        0.15,
        0.85,
        1.0
    ],
    "secondaryColor": [
        0.85,
        0.25,
        1.0
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

      // Hyperbolic throat tunnel
      const cylGeo = new THREE.CylinderGeometry(params.throatRadius, params.throatRadius * 2.8, params.tunnelLength, 48, 48, true);
      const pos = cylGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const r = Math.sqrt(params.throatRadius * params.throatRadius + y * y * 0.5);
        const th = Math.atan2(pos.getZ(i), pos.getX(i));
        pos.setXYZ(i, Math.cos(th) * r, y, Math.sin(th) * r);
      }
      cylGeo.computeVertexNormals();

      const cylMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending
      });
      const tunnel = new THREE.Mesh(cylGeo, cylMat);
      tunnel.rotation.x = Math.PI / 2;
      group.add(tunnel);

      // Trailing warp stars
      const sCount = params.starfieldCount;
      const sPos = new Float32Array(sCount * 3);
      for (let s = 0; s < sCount; s++) {
        const z = (Math.random() - 0.5) * params.tunnelLength * 1.5;
        const rad = 2.0 + Math.random() * 8.0;
        const ang = Math.random() * Math.PI * 2;
        sPos[s * 3 + 0] = Math.cos(ang) * rad;
        sPos[s * 3 + 1] = Math.sin(ang) * rad;
        sPos[s * 3 + 2] = z;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.12, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const stars = new THREE.Points(sGeo, sMat);
      group.add(stars);

      scene.userData = { group, tunnel, stars, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.z = t * 0.5;
      data.tunnel.rotation.y = t * 0.3;

      // Camera diving into wormhole throat
      const camZ = Math.sin(t * 0.4) * 8.0;
      camera.position.z = 10.0 + camZ;
      camera.position.x = Math.cos(t * 0.6) * 2.0;
      camera.position.y = Math.sin(t * 0.6) * 2.0;
      camera.lookAt(0, 0, -5.0);

      renderer.render(scene, camera);
    }
  };
});
