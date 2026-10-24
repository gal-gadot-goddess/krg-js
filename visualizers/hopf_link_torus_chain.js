// visualizers/hopf_link_torus_chain.js
// Interlocking 7-Fold Hopf Link Torus Chain
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.hopf_link_torus_chain = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "hopf_link_torus_chain",
    title: "Interlocking 7-Fold Hopf Link Torus Chain",
    fileName: "hopf_link_chain.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "\ud83d\udd17 Topological chain of interlocking Hopf link torus rings undulating in harmonic resonance in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2e\n\n#threejs #webgl #hopflink #topology #torus #sacredgeometry #mathart #creativecoding #javascript #reels",
    
    displayCode: "// Interlocking Hopf Link Chain Center Orbit\nfunction hopfChainRing(idx, total = 7, t = 0) {\n  const phi = (idx / total) * Math.PI * 2 + t * 0.2;\n  const r = 4.8;\n  const x = Math.cos(phi) * r;\n  const y = Math.sin(phi * 2) * 1.5;\n  const z = Math.sin(phi) * r;\n  return { pos: new THREE.Vector3(x, y, z), rotZ: phi };\n}",

    defaultParams: {
    "primaryColor": [
        0.2,
        0.75,
        1.0
    ],
    "secondaryColor": [
        1.0,
        0.3,
        0.7
    ],
    "ringCount": 7
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
      camera.position.set(0, 6, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.ringCount;
      const rings = [];

      for (let i = 0; i < count; i++) {
        const tGeo = new THREE.TorusGeometry(2.2, 0.28, 24, 64);
        const mix = i / count;
        const col = c1.clone().lerp(c2, mix);
        const tMat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.5, wireframe: true
        });
        const ring = new THREE.Mesh(tGeo, tMat);
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, rings, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      const count = data.rings.length;
      for (let i = 0; i < count; i++) {
        const phi = (i / count) * Math.PI * 2 + t * 0.3;
        const r = 4.5;
        data.rings[i].position.set(Math.cos(phi) * r, Math.sin(phi * 2) * 1.8, Math.sin(phi) * r);
        data.rings[i].rotation.x = phi;
        data.rings[i].rotation.y = t * 0.5 + i;
      }

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 5 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
