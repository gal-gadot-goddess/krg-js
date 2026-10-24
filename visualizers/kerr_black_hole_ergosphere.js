// visualizers/kerr_black_hole_ergosphere.js
// Spinning Kerr Black Hole Ergosphere & Penrose Jets
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kerr_black_hole_ergosphere = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "kerr_black_hole_ergosphere",
    title: "Spinning Kerr Black Hole Ergosphere & Penrose Jets",
    fileName: "kerr_ergosphere.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf00 Frame-dragging spacetime oblate ergosphere & Penrose energy extraction around a Kerr rotating black hole in Three.js! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd73\ufe0f\n\n#threejs #webgl #kerrblackhole #ergosphere #relativity #penrose #astrophysics #creativecoding #javascript",
    
    displayCode: "// Kerr Metric Ergosphere Boundary Radius\nfunction ergosphereRadius(M, a, theta) {\n  // r_E(theta) = M + sqrt(M^2 - a^2 * cos^2(theta))\n  const spinTerm = a * Math.cos(theta);\n  return M + Math.sqrt(Math.max(0, M * M - spinTerm * spinTerm));\n}",

    defaultParams: {
    "primaryColor": [
        0.95,
        0.2,
        0.4
    ],
    "secondaryColor": [
        0.2,
        0.9,
        1.0
    ],
    "spinParam": 0.95
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

      // Oblate Ergosphere Ellipsoid
      const ergoGeo = new THREE.SphereGeometry(4.2, 48, 48);
      ergoGeo.scale(1.4, 0.9, 1.4); // Frame dragging equator elongation
      const ergoMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, transparent: true, opacity: 0.55
      });
      const ergosphere = new THREE.Mesh(ergoGeo, ergoMat);
      group.add(ergosphere);

      // Event Horizon (inner sphere)
      const horizon = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      group.add(horizon);

      // Penrose Relativistic Bipolar Jets
      const jetCount = 4000;
      const jetPos = new Float32Array(jetCount * 3);
      const jetCol = new Float32Array(jetCount * 3);

      for (let i = 0; i < jetCount; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const dist = 1.0 + Math.random() * 12.0;
        const spread = (dist * 0.12) * Math.sqrt(Math.random());
        const angle = Math.random() * Math.PI * 2;
        jetPos[i * 3] = Math.cos(angle) * spread;
        jetPos[i * 3 + 1] = sign * dist;
        jetPos[i * 3 + 2] = Math.sin(angle) * spread;

        const mix = dist / 13.0;
        const col = c2.clone().lerp(c1, mix);
        jetCol[i * 3] = col.r; jetCol[i * 3 + 1] = col.g; jetCol[i * 3 + 2] = col.b;
      }

      const jetGeo = new THREE.BufferGeometry();
      jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
      jetGeo.setAttribute('color', new THREE.BufferAttribute(jetCol, 3));
      const jets = new THREE.Points(jetGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(jets);

      scene.userData = { group, ergosphere, horizon, jets, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.ergosphere.rotation.y = t * 1.8;
      data.group.rotation.y = t * 0.25;

      const pos = data.jets.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        if (pos[i + 1] > 0) {
          pos[i + 1] += 0.18;
          if (pos[i + 1] > 14.0) pos[i + 1] = 2.0;
        } else {
          pos[i + 1] -= 0.18;
          if (pos[i + 1] < -14.0) pos[i + 1] = -2.0;
        }
      }
      data.jets.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.3) * 22;
      camera.position.z = Math.cos(t * 0.3) * 22;
      camera.position.y = 5 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
