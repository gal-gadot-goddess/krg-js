// visualizers/cayley_cubic_surface_four_conical_nodes.js
// Cayley Cubic Surface & 4 Symmetric Conical Singularities
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cayley_cubic_surface_four_conical_nodes = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cayley_cubic_surface_four_conical_nodes",
    title: "Cayley Cubic Surface & 4 Symmetric Conical Singularities",
    fileName: "cayley_cubic.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "geometry",
    caption: "\ud83d\udcd0 The Cayley Cubic: the unique projective cubic surface endowed with the maximum of four ordinary double points in Three.js! Follow @kreggsjs! \ud83c\udf10\u2728\n\n#threejs #webgl #cayleycubic #singularity #algebraicgeometry #mathart #codeart",
    
    displayCode: "// Cayley Cubic Four Conical Double Points Equation\nfunction cayleyCubic(x, y, z) {\n  // x*y*z + x*y + y*z + z*x = 0\n  return x*y*z + x*y + y*z + z*x;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.75,
        0.2
    ],
    "secondaryColor": [
        0.2,
        0.85,
        1.0
    ],
    "scale": 4.5
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

      // 4 Conical Node Pyramids
      for (let i = 0; i < 4; i++) {
        const signX = (i & 1) ? 1 : -1;
        const signY = (i & 2) ? 1 : -1;
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(1.6, 3.2, 16, 1, true),
          new THREE.MeshBasicMaterial({ color: c1, wireframe: true })
        );
        cone.position.set(signX * 3.2, signY * 3.2, 0);
        group.add(cone);
      }

      // 20,000 Cubic Surface Cloud Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 6.5;
        const v = (Math.random() - 0.5) * 6.5;
        const w = (u * v) / (1.0 + Math.abs(u + v) * 0.4);

        pPos[i * 3] = u; pPos[i * 3 + 1] = w; pPos[i * 3 + 2] = v;
        const col = c1.clone().lerp(c2, (w + 3.0) / 6.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const cloud = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(cloud);

      scene.userData = { group, cloud, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
