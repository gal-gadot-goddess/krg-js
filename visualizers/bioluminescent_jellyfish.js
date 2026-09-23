// visualizers/bioluminescent_jellyfish.js
// Bioluminescent Deep-Sea Jellyfish & Organic Particle Ribbons

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.bioluminescent_jellyfish = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "bioluminescent_jellyfish",
    title: "Bioluminescent Abyssal Jellyfish",
    fileName: "abyssal_jellyfish.js",
    category: "Organic Physics & Marine Bioluminescence",
    genre: "lofi",
    caption: "🪼 Mesmerizing Bioluminescent Deep-Sea Jellyfish undulating in Three.js WebGL! Glowing particle tentacles flowing with fluid dynamics. Follow for daily generative art reels! 🌊✨\n\n#threejs #webgl #generativeart #creativecoding #ocean #bioluminescence #javascript #animation #reels",
    
    displayCode: `// Organic Bioluminescent Bell Undulation
function updateJellyfishBell(geometry, time, pulseRate = 2.2) {
  const pos = geometry.attributes.position;
  const count = pos.count;
  
  // Biological pulse contraction & expansion cycle
  const pulse = Math.pow(Math.sin(time * pulseRate), 4.0);
  const flare = Math.sin(time * pulseRate + 0.4) * 0.35;

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const r = Math.sqrt(x * x + z * z);
    const wave = Math.sin(r * 2.2 - time * 4.0) * 0.18;
    const contractedR = r * (1.0 + (pulse - 0.5) * 0.45);

    pos.setY(i, y + wave + pulse * 0.6);
  }
  pos.needsUpdate = true;
}`,

    defaultParams: {
      tentacleCount: 10,
      particlesPerTentacle: 120,
      pulseRate: 2.2,
      planktonCount: 3500,
      primaryColor: [0.1, 0.95, 0.85],  // Cyan-Teal Bioluminescence
      secondaryColor: [0.85, 0.2, 0.9]  // Deep Sea Violet
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

      camera.fov = 55;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 16);

      const creatureGroup = new THREE.Group();
      scene.add(creatureGroup);

      // 1. Jellyfish Translucent Bell Mesh
      const bellGeo = new THREE.SphereGeometry(3.5, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const bellMat = new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const bellMesh = new THREE.Mesh(bellGeo, bellMat);
      bellMesh.rotation.x = Math.PI; // Invert dome so apex points up
      creatureGroup.add(bellMesh);

      // 2. Inner Glowing Core / Organ
      const organGeo = new THREE.IcosahedronGeometry(1.4, 2);
      const organMat = new THREE.MeshBasicMaterial({
        color: 0xe879f9,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const organMesh = new THREE.Mesh(organGeo, organMat);
      organMesh.position.y = 0.8;
      creatureGroup.add(organMesh);

      // 3. Flowing Bioluminescent Tentacles (Particle Streams)
      const tentacleCount = params.tentacleCount;
      const ptsPerTen = params.particlesPerTentacle;
      const totalTenPts = tentacleCount * ptsPerTen;

      const tenGeo = new THREE.BufferGeometry();
      const tenPos = new Float32Array(totalTenPts * 3);
      const tenCol = new Float32Array(totalTenPts * 3);

      const pCol = params.primaryColor;
      const sCol = params.secondaryColor;

      for (let t = 0; t < tentacleCount; t++) {
        const angle = (t / tentacleCount) * Math.PI * 2;
        const baseRadius = 2.2 + Math.random() * 0.6;
        for (let p = 0; p < ptsPerTen; p++) {
          const idx = (t * ptsPerTen + p) * 3;
          const u = p / ptsPerTen;
          tenPos[idx + 0] = Math.cos(angle) * baseRadius;
          tenPos[idx + 1] = -u * 9.5;
          tenPos[idx + 2] = Math.sin(angle) * baseRadius;

          // Bioluminescent gradient down the tentacle
          const cr = pCol[0] * (1 - u) + sCol[0] * u;
          const cg = pCol[1] * (1 - u) + sCol[1] * u;
          const cb = pCol[2] * (1 - u) + sCol[2] * u;
          tenCol[idx + 0] = cr;
          tenCol[idx + 1] = cg;
          tenCol[idx + 2] = cb;
        }
      }
      tenGeo.setAttribute('position', new THREE.BufferAttribute(tenPos, 3));
      tenGeo.setAttribute('color', new THREE.BufferAttribute(tenCol, 3));

      // Circular particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const c = canvas.getContext('2d');
      const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(45, 212, 191, 0.9)');
      grad.addColorStop(0.7, 'rgba(192, 132, 252, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = grad;
      c.fillRect(0, 0, 64, 64);
      const glowTex = new THREE.CanvasTexture(canvas);

      const tenMat = new THREE.PointsMaterial({
        size: 0.22,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        map: glowTex,
        depthWrite: false
      });
      const tentaclePoints = new THREE.Points(tenGeo, tenMat);
      creatureGroup.add(tentaclePoints);

      // 4. Floating Plankton Bokeh Particles (3,500)
      const planktonCount = params.planktonCount;
      const plankGeo = new THREE.BufferGeometry();
      const plankPos = new Float32Array(planktonCount * 3);
      const plankCol = new Float32Array(planktonCount * 3);

      for (let k = 0; k < planktonCount; k++) {
        plankPos[k * 3 + 0] = (Math.random() - 0.5) * 35;
        plankPos[k * 3 + 1] = (Math.random() - 0.5) * 35;
        plankPos[k * 3 + 2] = (Math.random() - 0.5) * 25;

        plankCol[k * 3 + 0] = 0.2 + 0.3 * Math.random();
        plankCol[k * 3 + 1] = 0.7 + 0.3 * Math.random();
        plankCol[k * 3 + 2] = 0.8 + 0.2 * Math.random();
      }
      plankGeo.setAttribute('position', new THREE.BufferAttribute(plankPos, 3));
      plankGeo.setAttribute('color', new THREE.BufferAttribute(plankCol, 3));
      const plankMat = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });
      const plankPoints = new THREE.Points(plankGeo, plankMat);
      scene.add(plankPoints);

      scene.userData = {
        creatureGroup,
        bellMesh,
        organMesh,
        tentaclePoints,
        plankPoints,
        tentacleCount,
        ptsPerTen,
        origBellPositions: bellGeo.attributes.position.clone(),
        params
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const pulseRate = params?.pulseRate || 2.2;
      const pulse = Math.pow(Math.sin(t * pulseRate), 4.0);

      // 1. Biological swimming undulation
      const creatureY = Math.sin(t * (pulseRate * 0.5)) * 1.8;
      data.creatureGroup.position.y = creatureY;
      data.creatureGroup.rotation.y = t * 0.3;
      data.creatureGroup.rotation.z = Math.sin(t * 1.2) * 0.08;

      // 2. Bell deformation
      const bPosAttr = data.bellMesh.geometry.attributes.position;
      const bPosArr = bPosAttr.array;
      const origArr = data.origBellPositions.array;
      const count = bPosAttr.count;

      for (let i = 0; i < count; i++) {
        const x = origArr[i * 3 + 0];
        const y = origArr[i * 3 + 1];
        const z = origArr[i * 3 + 2];

        const r = Math.sqrt(x * x + z * z);
        const contraction = 1.0 + (pulse - 0.4) * 0.35;
        const wave = Math.sin(r * 2.5 - t * 4.5) * 0.22;

        bPosArr[i * 3 + 0] = x * contraction;
        bPosArr[i * 3 + 1] = y + wave + pulse * 0.45;
        bPosArr[i * 3 + 2] = z * contraction;
      }
      bPosAttr.needsUpdate = true;

      // 3. Organ inner pulsation
      data.organMesh.scale.setScalar(1.0 + pulse * 0.45);
      data.organMesh.rotation.y = -t * 1.2;

      // 4. Tentacle physics simulation (harmonic lag waves)
      const tPosAttr = data.tentaclePoints.geometry.attributes.position;
      const tPosArr = tPosAttr.array;
      const tenCount = data.tentacleCount;
      const ptsPerTen = data.ptsPerTen;

      for (let tc = 0; tc < tenCount; tc++) {
        const baseAngle = (tc / tenCount) * Math.PI * 2;
        for (let p = 0; p < ptsPerTen; p++) {
          const idx = (tc * ptsPerTen + p) * 3;
          const u = p / ptsPerTen;

          const baseRad = (2.2 + Math.sin(t * pulseRate) * 0.4) * (1.0 - u * 0.5);
          const lag = u * 4.5;
          const waveX = Math.sin(t * 3.5 - lag + tc) * (u * 1.8);
          const waveZ = Math.cos(t * 3.0 - lag + tc) * (u * 1.8);

          tPosArr[idx + 0] = Math.cos(baseAngle) * baseRad + waveX;
          tPosArr[idx + 1] = -u * 10.5 + Math.sin(t * 2.0 - lag) * 0.4;
          tPosArr[idx + 2] = Math.sin(baseAngle) * baseRad + waveZ;
        }
      }
      tPosAttr.needsUpdate = true;

      // 5. Plankton drift
      data.plankPoints.rotation.y = t * 0.05;

      // Camera motion: slow cinematic dive around creature
      const camTheta = t * 0.25;
      camera.position.x = Math.sin(camTheta) * 15.0;
      camera.position.z = Math.cos(camTheta) * 15.0;
      camera.position.y = creatureY * 0.5;
      camera.lookAt(0, creatureY * 0.8, 0);

      renderer.render(scene, camera);
    }
  };
});
