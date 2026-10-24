// visualizers/neutron_star_crust_pasta.js
// Neutron Star Crust Nuclear Pasta
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.neutron_star_crust_pasta = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "neutron_star_crust_pasta",
    title: "Neutron Star Crust Nuclear Pasta",
    fileName: "nuclear_pasta.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "\ud83c\udf0c Dense nuclear pasta matter inside neutron star crusts! Waffles, spaghetti & gnocchi quark-gluon phases in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! \u26a1\ud83d\udd2c\n\n#threejs #webgl #neutronstar #nuclearpasta #physics #astrophysics #creativecoding #javascript #reels",
    
    displayCode: "// Nuclear Pasta Phase Density Equation\nfunction computeNuclearPasta(x, y, z, t) {\n  const density = Math.sin(x * 1.5) * Math.cos(y * 1.5) + Math.sin(z * 1.5 + t);\n  const protonFraction = 0.35 + 0.15 * Math.sin(x + y - z);\n  return { density, protonFraction };\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.1
    ],
    "secondaryColor": [
        0.2,
        0.8,
        1.0
    ],
    "particleCount": 8000
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

      camera.fov = 50;
      camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const light1 = new THREE.PointLight(new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]), 3, 50);
      light1.position.set(10, 10, 10);
      scene.add(light1);

      const light2 = new THREE.PointLight(new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]), 2, 50);
      light2.position.set(-10, -10, -10);
      scene.add(light2);

      // Core Dense Quark Tube Geometry (Spaghetti/Lasagna Phase)
      const count = params.particleCount;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const r = 4.5 + Math.sin(u * 4) * Math.cos(v * 4) * 2.2;
        positions[i * 3] = r * Math.sin(u) * Math.cos(v);
        positions[i * 3 + 1] = r * Math.sin(u) * Math.sin(v);
        positions[i * 3 + 2] = r * Math.cos(u);

        const mixRatio = Math.sin(u * 2) * 0.5 + 0.5;
        const col = c1.clone().lerp(c2, mixRatio);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.95
      });
      const pastaPoints = new THREE.Points(geo, mat);
      group.add(pastaPoints);

      // Inner degenerate core sphere
      const coreGeo = new THREE.SphereGeometry(2.0, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true, transparent: true, opacity: 0.7
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      scene.userData = { group, pastaPoints, coreMesh, params, light1, light2 };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;
      data.coreMesh.rotation.y = -t * 0.6;

      const pos = data.pastaPoints.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += Math.sin(t * 2.0 + pos[i] * 0.5) * 0.015;
      }
      data.pastaPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = Math.sin(t * 0.15) * 6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
