// visualizers/black_hole_gargantua.js
// Cinematic Gargantua Black Hole with Relativistic Accretion Disk & Gravitational Lensing

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.black_hole_gargantua = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "black_hole_gargantua",
    title: "Cosmic Singularity & Gargantua",
    fileName: "black_hole.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "🌌 Gargantua Black Hole & Relativistic Accretion Disk in Three.js WebGL! 15,000 particles orbiting the event horizon with gravitational warping. Follow for daily 3D creative code reels! 🔭✨\n\n#threejs #webgl #astrophysics #blackhole #creativecoding #javascript #space #reels #mathart",
    
    displayCode: `// Gargantua Accretion Disk Simulation
function initSingularity(scene, particleCount = 14000) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(particleCount * 3);
  const col = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const r = 2.4 + Math.pow(Math.random(), 1.6) * 12.0;
    const theta = Math.random() * Math.PI * 2;
    pos[i * 3 + 0] = Math.cos(theta) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * (0.18 + r * 0.04);
    pos[i * 3 + 2] = Math.sin(theta) * r;

    // Relativistic Doppler beaming gradient
    const heat = Math.max(0, 1.0 - (r - 2.4) / 10.0);
    col[i * 3 + 0] = 0.95 + heat * 0.05;
    col[i * 3 + 1] = 0.45 * heat + 0.15;
    col[i * 3 + 2] = 0.15 * (1.0 - heat) + 0.85 * Math.pow(heat, 3);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.14, vertexColors: true,
    blending: THREE.AdditiveBlending, transparent: true
  });
  return new THREE.Points(geo, mat);
}`,

    defaultParams: {
      particleCount: 14000,
      diskRadiusMin: 2.2,
      diskRadiusMax: 13.5,
      coreRadius: 1.8,
      spinSpeed: 1.2,
      primaryColor: [1.0, 0.55, 0.12],   // Plasma orange
      secondaryColor: [0.35, 0.75, 1.0], // Blueshifted beam
      photonSphereGlow: 0.85
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

      // Camera position & FOV
      camera.fov = 50;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 5.5, 16.5);
      camera.lookAt(0, 0, 0);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // 1. Pitch-Black Event Horizon Sphere
      const horizonGeo = new THREE.SphereGeometry(params.coreRadius, 64, 64);
      const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
      rootGroup.add(horizonMesh);

      // 2. Gravitational Photon Sphere (Inner Luminous Ring)
      const photonGeo = new THREE.TorusGeometry(params.coreRadius * 1.15, 0.08, 32, 120);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      photonMesh.rotation.x = Math.PI / 2;
      rootGroup.add(photonMesh);

      // 3. Gravitational Lensing Halo (Vertical Torus representing warped rear disk)
      const lensGeo = new THREE.TorusGeometry(params.coreRadius * 2.2, 0.45, 32, 100);
      const lensMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        wireframe: true
      });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.name = "lensMesh";
      rootGroup.add(lensMesh);

      // 4. Accretion Disk (14,000+ Relativistic Particles)
      const count = params.particleCount;
      const diskGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const radii = new Float32Array(count);
      const angles = new Float32Array(count);
      const speeds = new Float32Array(count);
      const heights = new Float32Array(count);

      const pCol = params.primaryColor;
      const sCol = params.secondaryColor;

      for (let i = 0; i < count; i++) {
        // Keplerian radial distribution (dense near inner edge)
        const u = Math.pow(Math.random(), 1.7);
        const r = params.diskRadiusMin + u * (params.diskRadiusMax - params.diskRadiusMin);
        const theta = Math.random() * Math.PI * 2;
        const h = (Math.random() - 0.5) * (0.12 + r * 0.035);

        radii[i] = r;
        angles[i] = theta;
        // Kepler's 3rd Law: velocity is proportional to 1/sqrt(r)
        speeds[i] = (2.8 / Math.sqrt(r)) * (0.85 + Math.random() * 0.3);
        heights[i] = h;

        positions[i * 3 + 0] = Math.cos(theta) * r;
        positions[i * 3 + 1] = h;
        positions[i * 3 + 2] = Math.sin(theta) * r;

        // Relativistic Temperature Gradient
        const temp = Math.max(0, 1.0 - (r - params.diskRadiusMin) / (params.diskRadiusMax - params.diskRadiusMin));
        // Blend primary hot plasma into secondary deep cosmic blue
        const cr = pCol[0] * temp + sCol[0] * (1.0 - temp);
        const cg = pCol[1] * temp + sCol[1] * (1.0 - temp);
        const cb = pCol[2] * temp + sCol[2] * (1.0 - temp);

        colors[i * 3 + 0] = cr;
        colors[i * 3 + 1] = cg;
        colors[i * 3 + 2] = cb;
      }

      diskGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      diskGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Circular glowing particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const c = canvas.getContext('2d');
      const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 200, 100, 0.8)');
      grad.addColorStop(0.7, 'rgba(180, 50, 20, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = grad;
      c.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);

      const diskMat = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        map: texture
      });

      const diskPoints = new THREE.Points(diskGeo, diskMat);
      diskPoints.name = "diskPoints";
      rootGroup.add(diskPoints);

      // 5. Relativistic Polar Jet Particles
      const jetCount = 2000;
      const jetGeo = new THREE.BufferGeometry();
      const jetPos = new Float32Array(jetCount * 3);
      const jetCol = new Float32Array(jetCount * 3);
      for (let j = 0; j < jetCount; j++) {
        const sign = j % 2 === 0 ? 1 : -1;
        const dist = Math.random() * 12.0;
        const spread = (dist / 12.0) * 0.8;
        const jTheta = Math.random() * Math.PI * 2;
        jetPos[j * 3 + 0] = Math.cos(jTheta) * spread * (Math.random() + 0.2);
        jetPos[j * 3 + 1] = sign * (params.coreRadius * 0.8 + dist);
        jetPos[j * 3 + 2] = Math.sin(jTheta) * spread * (Math.random() + 0.2);

        const jFade = 1.0 - dist / 12.0;
        jetCol[j * 3 + 0] = 0.4 * jFade;
        jetCol[j * 3 + 1] = 0.85 * jFade;
        jetCol[j * 3 + 2] = 1.0 * jFade;
      }
      jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
      jetGeo.setAttribute('color', new THREE.BufferAttribute(jetCol, 3));

      const jetMat = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        map: texture
      });
      const jetPoints = new THREE.Points(jetGeo, jetMat);
      jetPoints.name = "jetPoints";
      rootGroup.add(jetPoints);

      // Store animation references
      scene.userData = {
        rootGroup,
        diskPoints,
        jetPoints,
        lensMesh,
        radii,
        angles,
        speeds,
        heights,
        count,
        params
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data || !data.diskPoints) return;

      const count = data.count;
      const posAttr = data.diskPoints.geometry.attributes.position;
      const colAttr = data.diskPoints.geometry.attributes.color;
      const posArr = posAttr.array;
      const colArr = colAttr.array;

      const radii = data.radii;
      const angles = data.angles;
      const speeds = data.speeds;
      const heights = data.heights;
      const speedMult = (params && params.spinSpeed) || 1.2;

      // Doppler beaming vectors (left side approaching camera is blueshifted & brighter)
      for (let i = 0; i < count; i++) {
        const curAngle = angles[i] + t * speeds[i] * speedMult;
        const r = radii[i];
        const x = Math.cos(curAngle) * r;
        const z = Math.sin(curAngle) * r;
        const y = heights[i] + Math.sin(t * 2.5 + r * 1.5) * 0.04;

        posArr[i * 3 + 0] = x;
        posArr[i * 3 + 1] = y;
        posArr[i * 3 + 2] = z;

        // Relativistic Doppler beaming factor: approaching particles are amplified
        const doppler = 1.0 + Math.sin(curAngle) * 0.35;
        colArr[i * 3 + 0] = Math.min(1.0, colArr[i * 3 + 0] * doppler);
        colArr[i * 3 + 1] = Math.min(1.0, colArr[i * 3 + 1] * doppler);
        colArr[i * 3 + 2] = Math.min(1.0, colArr[i * 3 + 2] * doppler);
      }
      posAttr.needsUpdate = true;

      // Animate gravitational lens halo
      if (data.lensMesh) {
        data.lensMesh.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.15;
        data.lensMesh.rotation.y = t * 0.4;
      }

      // Animate polar jets
      if (data.jetPoints) {
        data.jetPoints.rotation.y = t * 1.8;
      }

      // Cinematic Camera Motion: Smooth 3D Orbital Sweep with Vertical Dip
      const camRadius = 15.5 + Math.sin(t * 0.4) * 1.8;
      const camTheta = t * 0.35;
      const camHeight = 4.5 + Math.sin(t * 0.6) * 2.8;

      camera.position.x = Math.sin(camTheta) * camRadius;
      camera.position.z = Math.cos(camTheta) * camRadius;
      camera.position.y = camHeight;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    }
  };
});
