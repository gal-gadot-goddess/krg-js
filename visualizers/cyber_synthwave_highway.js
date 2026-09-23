// visualizers/cyber_synthwave_highway.js
// Retro-Futuristic Synthwave Cyber Grid, Neon Horizon Sun & Monoliths

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.cyber_synthwave_highway = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "cyber_synthwave_highway",
    title: "Synthwave Grid & Neon Sun",
    fileName: "synthwave_highway.js",
    category: "Retro-Futurism & Cyberpunk",
    genre: "synthwave",
    caption: "🌆 Infinite Cyberpunk Synthwave Grid & Neon Horizon Sun rendered in Three.js WebGL! Procedural mountainous terrain waves and 80s aesthetics. Follow for daily code reels! ⚡🕹️\n\n#threejs #webgl #synthwave #cyberpunk #outrun #creativecoding #javascript #vfx #reels #retrowave",
    
    displayCode: `// Procedural Cyber Terrain Waves
function renderGridTerrain(gridMesh, time, speed = 2.4) {
  const pos = gridMesh.geometry.attributes.position;
  const count = pos.count;

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Continuous forward highway flow
    const zOffset = (y + time * speed) % 60;
    
    // Mountain ridges along perimeter, smooth road in center
    const roadDist = Math.abs(x);
    const mountainFactor = Math.pow(Math.min(1.0, roadDist / 12.0), 2.2);
    const wave = Math.sin(x * 0.35 + time * 1.5) * Math.cos(zOffset * 0.25);
    const z = wave * 2.8 * mountainFactor;

    pos.setZ(i, z);
  }
  pos.needsUpdate = true;
}`,

    defaultParams: {
      gridCols: 48,
      gridRows: 48,
      highwaySpeed: 3.2,
      sunRadius: 4.8,
      primaryColor: [1.0, 0.2, 0.6],    // Hot Neon Pink
      secondaryColor: [0.15, 0.9, 1.0]  // Cyber Cyan
    },

    init: function(THREE, scene, camera, renderer, params) {
      params = Object.assign({}, this.defaultParams, params || {});

      while (scene.children.length > 0) {
        const obj = scene.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        scene.remove(obj);
      }

      camera.fov = 60;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 2.2, 11);
      camera.lookAt(0, 3.2, -25);

      const world = new THREE.Group();
      scene.add(world);

      // 1. Undulating Terrain Grid (Plane)
      const planeGeo = new THREE.PlaneGeometry(50, 70, params.gridCols, params.gridRows);
      planeGeo.rotateX(-Math.PI / 2);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const gridMesh = new THREE.Mesh(planeGeo, planeMat);
      gridMesh.position.set(0, -1.0, -18);
      world.add(gridMesh);

      // 2. Horizon Neon Sun with Horizontal Blinds Cutouts
      const sunGroup = new THREE.Group();
      sunGroup.position.set(0, 4.5, -38);
      world.add(sunGroup);

      const sunGeo = new THREE.CircleGeometry(params.sunRadius, 64);
      const sunMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.95
      });
      const sunMesh = new THREE.Mesh(sunGeo, sunMat);
      sunGroup.add(sunMesh);

      // Sun Blinds Cutout Bars
      const barCount = 7;
      for (let b = 0; b < barCount; b++) {
        const barH = 0.18 + b * 0.08;
        const barY = -params.sunRadius + 0.6 + b * 0.65;
        const barGeo = new THREE.PlaneGeometry(params.sunRadius * 2.2, barH);
        const barMat = new THREE.MeshBasicMaterial({ color: 0x05040a });
        const barMesh = new THREE.Mesh(barGeo, barMat);
        barMesh.position.set(0, barY, 0.1);
        sunGroup.add(barMesh);
      }

      // Outer Sun Neon Corona Glow
      const coronaGeo = new THREE.RingGeometry(params.sunRadius, params.sunRadius * 1.35, 64);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
      coronaMesh.position.z = -0.1;
      sunGroup.add(coronaMesh);

      // 3. Floating Cyber Monoliths along the horizon
      const monoliths = [];
      const mCount = 6;
      for (let m = 0; m < mCount; m++) {
        const mGeo = new THREE.BoxGeometry(1.4, 6.0 + Math.random() * 4.0, 1.4);
        const mMat = new THREE.MeshBasicMaterial({
          color: m % 2 === 0 ? 0x06b6d4 : 0xa855f7,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
        const mMesh = new THREE.Mesh(mGeo, mMat);
        const sign = m % 2 === 0 ? 1 : -1;
        mMesh.position.set(sign * (9.0 + (m * 2.5)), 1.5, -15 - m * 5);
        world.add(mMesh);
        monoliths.push(mMesh);
      }

      // 4. Synthwave Starfield Dust (4,000 Particles)
      const starCount = 4000;
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(starCount * 3);
      const starCol = new Float32Array(starCount * 3);

      for (let s = 0; s < starCount; s++) {
        starPos[s * 3 + 0] = (Math.random() - 0.5) * 60;
        starPos[s * 3 + 1] = 1.0 + Math.random() * 25;
        starPos[s * 3 + 2] = -5 - Math.random() * 45;

        starCol[s * 3 + 0] = 0.5 + 0.5 * Math.random();
        starCol[s * 3 + 1] = 0.8 + 0.2 * Math.random();
        starCol[s * 3 + 2] = 1.0;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
      const starMat = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const stars = new THREE.Points(starGeo, starMat);
      world.add(stars);

      scene.userData = {
        world,
        gridMesh,
        sunGroup,
        monoliths,
        params,
        originalVertices: planeGeo.attributes.position.clone()
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const gridMesh = data.gridMesh;
      const posAttr = gridMesh.geometry.attributes.position;
      const posArr = posAttr.array;
      const origArr = data.originalVertices.array;
      const count = posAttr.count;
      const speed = (params?.highwaySpeed || 3.2);

      for (let i = 0; i < count; i++) {
        const x = origArr[i * 3 + 0];
        const origZ = origArr[i * 3 + 2];

        // Undulating road waves
        const flowZ = (origZ + t * speed * 2.0);
        const distFromCenter = Math.abs(x);
        const mountainFactor = Math.pow(Math.min(1.0, distFromCenter / 10.0), 2.0);

        const wave = Math.sin(x * 0.4 + t * 2.0) * Math.cos(flowZ * 0.3);
        const ridge = Math.sin(x * 0.8) * Math.sin(flowZ * 0.5) * 1.5;
        const z = (wave * 2.5 + ridge) * mountainFactor;

        posArr[i * 3 + 1] = z; // Y is height because plane is rotated
      }
      posAttr.needsUpdate = true;

      // Animate floating monoliths
      data.monoliths.forEach((m, idx) => {
        m.rotation.y = t * 0.8 + idx;
        m.position.y = 1.8 + Math.sin(t * 1.5 + idx) * 0.6;
      });

      // Subtle camera breathing
      camera.position.x = Math.sin(t * 0.6) * 1.2;
      camera.position.y = 2.2 + Math.cos(t * 0.8) * 0.3;
      camera.lookAt(0, 3.2, -25);

      renderer.render(scene, camera);
    }
  };
});
