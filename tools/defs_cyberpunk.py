# tools/defs_cyberpunk.py
# 14 Cyberpunk, Synthwave & Digital Matrix Visualizers

CYBERPUNK_VISUALIZERS = [
    {
        "id": "matrix_digital_rain_3d",
        "title": "3D Volumetric Matrix Digital Rain",
        "fileName": "matrix_rain.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🟢 Volumetric 3D cascading Matrix phosphor code streams in cyberspace! 8,000 falling data packets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💻\n\n#threejs #webgl #matrix #cyberpunk #codeart #javascript #creativecoding #terminal #reels",
        "displayCode": """// Volumetric Phosphor Matrix Data Streams
function updateMatrixRain(streams, speed = 4.2) {
  const pos = streams.geometry.attributes.position;
  const count = pos.count;
  for (let i = 0; i < count; i++) {
    let y = pos.getY(i) - speed * 0.1;
    if (y < -12.0) y = 12.0; // Reset to top
    pos.setY(i, y);
  }
  pos.needsUpdate = true;
}""",
        "defaultParams": {
            "streamParticles": 8500,
            "fallSpeed": 5.2,
            "primaryColor": [0.15, 0.98, 0.35],
            "secondaryColor": [0.85, 1.0, 0.5]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.streamParticles;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

        col[i * 3 + 0] = params.primaryColor[0];
        col[i * 3 + 1] = params.primaryColor[1];
        col[i * 3 + 2] = params.primaryColor[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending });
      const streamMesh = new THREE.Points(geo, mat);
      group.add(streamMesh);

      scene.userData = { group, streamMesh, count, params };""",
        "renderBody": """      const pos = data.streamMesh.geometry.attributes.position;
      const count = data.count;
      for (let i = 0; i < count; i++) {
        let y = pos.getY(i) - data.params.fallSpeed * 0.05;
        if (y < -12) y = 12;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cyber_tokyo_megacity_grid",
        "title": "Cyber Tokyo Skyscraper Matrix",
        "fileName": "tokyo_skyscrapers.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "synthwave",
        "caption": "🌆 Futuristic Tokyo Neo-Megacity wireframe skyscrapers & neon flight corridors in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🏙️\n\n#threejs #webgl #cyberpunk #synthwave #tokyo #city #creativecoding #javascript #reels",
        "displayCode": """// Procedural Neon Megacity Skyscraper Blocks
function generateSkyscraperGrid(cols = 10, rows = 10, spacing = 2.2) {
  const buildings = new THREE.Group();
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const height = 2.0 + Math.random() * 8.0;
      const bGeo = new THREE.BoxGeometry(1.4, height, 1.4);
      bGeo.translate((c - cols/2)*spacing, height/2, (r - rows/2)*spacing);
      buildings.add(new THREE.Mesh(bGeo, buildingMat));
    }
  }
  return buildings;
}""",
        "defaultParams": {
            "cityCols": 12,
            "cityRows": 12,
            "primaryColor": [0.15, 0.9, 1.0],
            "secondaryColor": [1.0, 0.15, 0.6]
        },
        "initBody": """      camera.position.set(0, 10, 18);
      camera.lookAt(0, 2, 0);

      const group = new THREE.Group();
      scene.add(group);

      const cols = params.cityCols, rows = params.cityRows;
      const bGeoMerged = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const h = 2.0 + Math.pow(Math.random(), 1.5) * 8.0;
          const bg = new THREE.BoxGeometry(1.2, h, 1.2);
          const mat = new THREE.MeshBasicMaterial({
            color: (c + r) % 2 === 0 ? 0x38bdf8 : 0xf43f5e,
            wireframe: true
          });
          const bMesh = new THREE.Mesh(bg, mat);
          bMesh.position.set((c - cols / 2) * 1.8, h / 2, (r - rows / 2) * 1.8);
          group.add(bMesh);
        }
      }

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.position.y = 9 + Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 3, 0);"""
    },
    {
        "id": "cyber_core_reactor",
        "title": "Tokamak Cyber Core Reactor",
        "fileName": "core_reactor.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "⚡ Sci-fi magnetic confinement fusion cyber core reactor spinning with plasma arcs in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🚀🤖\n\n#threejs #webgl #cyberpunk #reactor #fusion #scifi #creativecoding #javascript #reels",
        "displayCode": """// Magnetic Toroidal Fusion Plasma Core
function createCoreRings(ringCount = 5, radius = 4.5) {
  const core = new THREE.Group();
  for (let r = 0; r < ringCount; r++) {
    const geo = new THREE.TorusGeometry(radius + r * 0.6, 0.12, 16, 64);
    const ring = new THREE.Mesh(geo, neonMat);
    ring.rotation.x = (r * Math.PI) / ringCount;
    core.add(ring);
  }
  return core;
}""",
        "defaultParams": {
            "ringsCount": 5,
            "coreRadius": 4.0,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Core plasma sphere
      const pGeo = new THREE.SphereGeometry(2.0, 32, 32);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const core = new THREE.Mesh(pGeo, pMat);
      group.add(core);

      // Magnetic gimbal rings
      const rings = [];
      for (let r = 0; r < params.ringsCount; r++) {
        const rGeo = new THREE.TorusGeometry(params.coreRadius + r * 0.6, 0.08, 16, 64);
        const rMat = new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x22d3ee : 0xf59e0b,
          wireframe: true, transparent: true, opacity: 0.8
        });
        const rm = new THREE.Mesh(rGeo, rMat);
        group.add(rm);
        rings.push(rm);
      }

      scene.userData = { group, core, rings, params };""",
        "renderBody": """      data.core.rotation.y = t * 2.0;
      data.core.scale.setScalar(1.0 + Math.sin(t * 5.0) * 0.15);

      data.rings.forEach((ring, idx) => {
        ring.rotation.x = t * (0.8 + idx * 0.3) * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.y = t * (0.6 + idx * 0.2);
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tron_lightcycle_data_grid",
        "title": "TRON Lightcycle Neon Trails",
        "fileName": "tron_grid.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "synthwave",
        "caption": "🕹️ High-speed TRON lightcycle neon ribbon trails carving 90-degree vector cuts across cyber grid in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🏁\n\n#threejs #webgl #tron #lightcycle #cyberpunk #outrun #creativecoding #javascript #reels",
        "displayCode": """// Vector Trail History & Ribbon Generation
function buildLightTrail(trailHistory, ribbonHeight = 1.6) {
  const quadPositions = [];
  for (let i = 0; i < trailHistory.length - 1; i++) {
    const p1 = trailHistory[i];
    const p2 = trailHistory[i + 1];
    quadPositions.push(p1.x, p1.y, p1.z);
    quadPositions.push(p1.x, p1.y + ribbonHeight, p1.z);
    quadPositions.push(p2.x, p2.y, p2.z);
  }
  return quadPositions;
}""",
        "defaultParams": {
            "gridWidth": 30.0,
            "ribbonHeight": 1.6,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.45, 0.1]
        },
        "initBody": """      camera.position.set(0, 6, 16);
      camera.lookAt(0, 1, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Floor grid
      const grid = new THREE.GridHelper(30, 30, 0x38bdf8, 0x1e293b);
      group.add(grid);

      // Cycle trails (Ribbon meshes)
      const tGeo = new THREE.PlaneGeometry(16, 1.6, 32, 1);
      const tMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, wireframe: true });
      const trail1 = new THREE.Mesh(tGeo, tMat);
      trail1.position.set(0, 0.8, -3);
      group.add(trail1);

      const trail2 = new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, wireframe: true }));
      trail2.position.set(0, 0.8, 3);
      group.add(trail2);

      scene.userData = { group, trail1, trail2, params };""",
        "renderBody": """      data.trail1.position.x = Math.sin(t * 1.5) * 4.0;
      data.trail2.position.x = -Math.sin(t * 1.5) * 4.0;

      camera.position.x = Math.sin(t * 0.3) * 16;
      camera.position.z = Math.cos(t * 0.3) * 16;
      camera.position.y = 6 + Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 1, 0);"""
    },
    {
        "id": "audio_frequency_spectrum_3d",
        "title": "3D Circular Audio Spectrogram",
        "fileName": "audio_spectrum.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "techno",
        "caption": "🎵 3D Radial audio frequency FFT equalizer spectrum bars pulsating with bass waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔊✨\n\n#threejs #webgl #audiovisualizer #equalizer #creativecoding #javascript #vfx #reels",
        "displayCode": """// Circular 3D FFT Frequency Bar Extrusion
function renderCircularSpectrogram(bars = 64, radius = 4.5, time = 0) {
  const barMeshes = [];
  for (let i = 0; i < bars; i++) {
    const angle = (i / bars) * Math.PI * 2;
    // Simulated bass/mid FFT frequency response
    const freqHeight = 0.5 + Math.pow(Math.sin(i * 0.2 + time * 6.0), 2) * 3.5;
    const mesh = new THREE.Mesh(boxGeo, neonMat);
    mesh.position.set(Math.cos(angle)*radius, freqHeight/2, Math.sin(angle)*radius);
    mesh.scale.set(0.2, freqHeight, 0.2);
    barMeshes.push(mesh);
  }
  return barMeshes;
}""",
        "defaultParams": {
            "barCount": 64,
            "radius": 4.8,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [0.95, 0.25, 0.65]
        },
        "initBody": """      camera.position.set(0, 8, 16);
      camera.lookAt(0, 1, 0);

      const group = new THREE.Group();
      scene.add(group);

      const bars = [];
      const count = params.barCount;
      const bGeo = new THREE.BoxGeometry(0.25, 1, 0.25);

      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const col = new THREE.Color();
        col.setHSL(i / count, 0.9, 0.6);
        const bMat = new THREE.MeshBasicMaterial({ color: col });
        const m = new THREE.Mesh(bGeo, bMat);
        m.position.set(Math.cos(a) * params.radius, 0, Math.sin(a) * params.radius);
        group.add(m);
        bars.push(m);
      }

      scene.userData = { group, bars, count, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.5;

      data.bars.forEach((b, idx) => {
        const wave = 0.5 + Math.pow(Math.sin(idx * 0.25 + t * 6.0), 2) * 4.2;
        b.scale.y = wave;
        b.position.y = wave / 2;
      });

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 7 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 1, 0);"""
    },
    {
        "id": "holographic_ai_avatar_mesh",
        "title": "Holographic AI Neural Avatar",
        "fileName": "holographic_ai.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🤖 3D polygonal holographic AI core wireframe with scanlines and neural thought pulse bursts in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🧠\n\n#threejs #webgl #ai #hologram #cyberpunk #future #creativecoding #javascript #reels",
        "displayCode": """// Holographic Scanline Shader Distortion
function animateHoloScanlines(mesh, time, frequency = 8.0) {
  const pos = mesh.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const glitch = Math.sin(y * frequency + time * 12.0) * 0.08;
    pos.setZ(i, pos.getZ(i) + glitch);
  }
  pos.needsUpdate = true;
}""",
        "defaultParams": {
            "headRadius": 4.2,
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [0.85, 0.2, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Polygonal head structure
      const hGeo = new THREE.IcosahedronGeometry(params.headRadius, 2);
      const hMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.8
      });
      const head = new THREE.Mesh(hGeo, hMat);
      group.add(head);

      // Scanning rings
      for (let r = 0; r < 3; r++) {
        const rg = new THREE.TorusGeometry(params.headRadius * 1.3 + r * 0.5, 0.04, 16, 64);
        const rm = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = r * 0.6;
        group.add(ring);
      }

      scene.userData = { group, head, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.7;
      data.head.rotation.x = Math.sin(t * 0.5) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "fiber_optic_data_superhighway",
        "title": "Fiber Optic Data Superhighway",
        "fileName": "fiber_optic.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "💡 Bundled terabit fiber optic glass cables with high-frequency photon laser packet bursts in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌐\n\n#threejs #webgl #fiberoptic #telecom #datacom #network #creativecoding #javascript #reels",
        "displayCode": """// Terabit Fiber Optic Pulse Propagation
function createFiberOpticStrands(strands = 16, length = 20) {
  const fiberGroup = new THREE.Group();
  for (let s = 0; s < strands; s++) {
    const ang = (s / strands) * Math.PI * 2;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(ang)*2.0, -length/2, Math.sin(ang)*2.0),
      new THREE.Vector3(Math.sin(ang)*3.5, 0, Math.cos(ang)*3.5),
      new THREE.Vector3(Math.cos(ang)*2.0, length/2, Math.sin(ang)*2.0)
    ]);
    const tube = new THREE.TubeGeometry(curve, 40, 0.08, 8, false);
    fiberGroup.add(new THREE.Mesh(tube, glassMat));
  }
  return fiberGroup;
}""",
        "defaultParams": {
            "strandCount": 20,
            "packetCount": 3500,
            "primaryColor": [0.1, 0.95, 1.0],
            "secondaryColor": [0.95, 0.2, 0.7]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      for (let s = 0; s < params.strandCount; s++) {
        const a = (s / params.strandCount) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(a) * 2.5, -9, Math.sin(a) * 2.5),
          new THREE.Vector3(Math.sin(a * 2) * 4.5, 0, Math.cos(a * 2) * 4.5),
          new THREE.Vector3(Math.cos(a) * 2.5, 9, Math.sin(a) * 2.5)
        ]);
        const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.06, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
        group.add(new THREE.Mesh(tubeGeo, tubeMat));
      }

      // Laser packets (Particles)
      const count = params.packetCount;
      const pPos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pPos[i * 3 + 0] = (Math.random() - 0.5) * 6;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.16, color: 0xffffff, blending: THREE.AdditiveBlending });
      const packets = new THREE.Points(pGeo, pMat);
      group.add(packets);

      scene.userData = { group, packets, count, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;

      const pos = data.packets.geometry.attributes.position;
      for (let i = 0; i < data.count; i++) {
        let y = pos.getY(i) + 0.35;
        if (y > 9) y = -9;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cyber_glitch_tesseract",
        "title": "RGB Glitch Prism Matrix",
        "fileName": "glitch_tesseract.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "⚡ RGB chromatic aberration split cyber prisms vibrating with high-frequency digital glitch noise in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🕹️\n\n#threejs #webgl #glitchart #cyberpunk #chromaticaberration #creativecoding #javascript #reels",
        "displayCode": """// RGB Channel Splitting Glitch Displacement
function glitchDisplacement(time, amplitude = 0.45) {
  const isGlitchFrame = Math.random() < 0.25;
  if (!isGlitchFrame) return { rOffset: 0, gOffset: 0, bOffset: 0 };
  const rOffset = (Math.random() - 0.5) * amplitude;
  const bOffset = -rOffset;
  return { rOffset, gOffset: 0, bOffset };
}""",
        "defaultParams": {
            "prismCount": 4,
            "primaryColor": [1.0, 0.15, 0.45],
            "secondaryColor": [0.15, 0.95, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const cubes = [];
      const colors = [0xff0055, 0x00ffcc, 0xffcc00];
      for (let c = 0; c < 3; c++) {
        const geo = new THREE.BoxGeometry(5.0, 5.0, 5.0);
        const mat = new THREE.MeshBasicMaterial({ color: colors[c], wireframe: true, transparent: true, opacity: 0.75 });
        const cube = new THREE.Mesh(geo, mat);
        group.add(cube);
        cubes.push(cube);
      }

      scene.userData = { group, cubes, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.8;
      data.group.rotation.y = t * 1.1;

      // RGB Glitch vibration
      const glitch = Math.random() < 0.2;
      data.cubes[0].position.x = glitch ? (Math.random() - 0.5) * 0.8 : 0;
      data.cubes[1].position.y = glitch ? (Math.random() - 0.5) * 0.8 : 0;
      data.cubes[2].position.z = glitch ? (Math.random() - 0.5) * 0.8 : 0;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hacker_terminal_hud_3d",
        "title": "Volumetric Sci-Fi Terminal HUD",
        "fileName": "terminal_hud.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "💻 Volumetric Iron Man sci-fi heads-up display with dynamic targeting telemetry rings in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🤖\n\n#threejs #webgl #hud #scifi #ui #terminal #creativecoding #javascript #reels",
        "displayCode": """// Circular HUD Reticle Gauges & Telemetry Rings
function buildHUDReticle(ringRadius = 4.2) {
  const reticle = new THREE.Group();
  const ringGeo = new THREE.RingGeometry(ringRadius, ringRadius + 0.15, 64);
  const ringMesh = new THREE.Mesh(ringGeo, hudCyanMat);
  reticle.add(ringMesh);
  // Crosshairs
  const crossGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-ringRadius*1.3, 0, 0), new THREE.Vector3(ringRadius*1.3, 0, 0),
    new THREE.Vector3(0, -ringRadius*1.3, 0), new THREE.Vector3(0, ringRadius*1.3, 0)
  ]);
  reticle.add(new THREE.LineSegments(crossGeo, hudCyanMat));
  return reticle;
}""",
        "defaultParams": {
            "rings": 4,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [0.95, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const rings = [];
      for (let r = 0; r < 4; r++) {
        const rad = 2.5 + r * 1.5;
        const geo = new THREE.RingGeometry(rad, rad + 0.1, 48);
        const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(geo, mat);
        ring.position.z = (r - 2) * 1.5;
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, rings, params };""",
        "renderBody": """      data.rings.forEach((r, idx) => {
        r.rotation.z = t * (0.8 + idx * 0.4) * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.x = Math.sin(t * 0.5) * 0.3;
      data.group.rotation.y = Math.cos(t * 0.5) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_cyber_vault",
        "title": "Quantum Cryptographic Vault",
        "fileName": "cyber_vault.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🔐 Quantum cryptographic security vault with rotating decagonal encryption tumblers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔑\n\n#threejs #webgl #cryptography #cybersecurity #security #creativecoding #javascript #reels",
        "displayCode": """// Multi-Tumbler Decryption Wheel Alignment
function rotateSecurityTumblers(tumblers, time) {
  tumblers.forEach((t, idx) => {
    // Stepped mechanical rotation locks
    const speed = (idx + 1) * 0.7;
    t.rotation.z = Math.floor(time * speed) * (Math.PI / 5);
  });
}""",
        "defaultParams": {
            "tumblers": 5,
            "primaryColor": [1.0, 0.8, 0.2],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const tumblers = [];
      for (let i = 0; i < params.tumblers; i++) {
        const rad = 2.0 + i * 1.2;
        const geo = new THREE.CylinderGeometry(rad, rad, 0.6, 12, 1, true);
        const mat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xf59e0b : 0x38bdf8,
          wireframe: true
        });
        const tum = new THREE.Mesh(geo, mat);
        tum.rotation.x = Math.PI / 2;
        group.add(tum);
        tumblers.push(tum);
      }

      scene.userData = { group, tumblers, params };""",
        "renderBody": """      data.tumblers.forEach((tum, idx) => {
        tum.rotation.z = t * (0.6 + idx * 0.3) * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "laser_prism_refraction_matrix",
        "title": "Laser Prism Refraction Array",
        "fileName": "prism_matrix.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🌈 Total internal reflection optical prism maze splitting high-intensity coherent laser beams into rainbows in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💎\n\n#threejs #webgl #optics #laser #prism #creativecoding #javascript #light #reels",
        "displayCode": """// Snell's Law Optical Refraction Matrix
function refractLaserRay(rayOrigin, rayDir, prismFaceNormal, n1 = 1.0, n2 = 1.52) {
  const r = n1 / n2;
  const c = -prismFaceNormal.dot(rayDir);
  const sinT2 = r * r * (1.0 - c * c);
  // Refracted ray vector
  return rayDir.clone().multiplyScalar(r).add(prismFaceNormal.clone().multiplyScalar(r * c - Math.sqrt(1.0 - sinT2)));
}""",
        "defaultParams": {
            "prismCount": 8,
            "primaryColor": [1.0, 0.2, 0.8],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Glass prisms
      const prisms = [];
      for (let p = 0; p < params.prismCount; p++) {
        const a = (p / params.prismCount) * Math.PI * 2;
        const geo = new THREE.ConeGeometry(1.2, 2.4, 3);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.65 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(Math.cos(a) * 5.0, Math.sin(a) * 5.0, 0);
        group.add(mesh);
        prisms.push(mesh);
      }

      // Laser beams
      const lGeo = new THREE.BufferGeometry();
      const lPos = new Float32Array(params.prismCount * 6);
      for (let i = 0; i < params.prismCount; i++) {
        lPos[i * 6 + 0] = 0; lPos[i * 6 + 1] = 0; lPos[i * 6 + 2] = 0;
        const a = (i / params.prismCount) * Math.PI * 2;
        lPos[i * 6 + 3] = Math.cos(a) * 5.0;
        lPos[i * 6 + 4] = Math.sin(a) * 5.0;
        lPos[i * 6 + 5] = 0;
      }
      lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
      const lMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 });
      const beams = new THREE.LineSegments(lGeo, lMat);
      group.add(beams);

      scene.userData = { group, prisms, beams, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.6;
      data.prisms.forEach((p, idx) => {
        p.rotation.y = t * 1.5 + idx;
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "vector_oscilloscope_lissajous",
        "title": "3D Oscilloscope Lissajous Harmonic",
        "fileName": "oscilloscope_3d.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "techno",
        "caption": "📟 Vintage CRT oscilloscope electron beam tracing intricate 3D Lissajous harmonic resonant knots in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌊\n\n#threejs #webgl #oscilloscope #lissajous #harmonics #creativecoding #javascript #mathart #reels",
        "displayCode": """// 3D Harmonic Lissajous Knot Coordinates
function lissajous3DPoint(t, a = 3, b = 4, c = 5, delta = 0.5) {
  const x = Math.sin(a * t + delta) * 5.2;
  const y = Math.sin(b * t) * 5.2;
  const z = Math.sin(c * t) * 5.2;
  return new THREE.Vector3(x, y, z);
}""",
        "defaultParams": {
            "curvePoints": 800,
            "primaryColor": [0.15, 0.98, 0.45],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.curvePoints;
      const pts = [];
      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.sin(3 * u) * 5, Math.sin(4 * u) * 5, Math.sin(5 * u) * 5));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 2
      });
      const curve = new THREE.Line(geo, mat);
      group.add(curve);

      scene.userData = { group, curve, count, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.7;
      data.group.rotation.y = t * 0.9;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hexagonal_shield_generator",
        "title": "Hexagonal Forcefield Shield",
        "fileName": "hex_shield.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🛡️ Kinetic energy deflector shield with glowing hexagonal defensive tiles flashing in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🤖\n\n#threejs #webgl #forcefield #shield #scifi #creativecoding #javascript #vfx #reels",
        "displayCode": """// Hexagonal Spherical Tiling Deflector Array
function buildHexShield(radius = 5.2, detail = 2) {
  const icoGeo = new THREE.IcosahedronGeometry(radius, detail);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  return new THREE.Mesh(icoGeo, wireMat);
}""",
        "defaultParams": {
            "shieldRadius": 5.4,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.2, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const sGeo = new THREE.IcosahedronGeometry(params.shieldRadius, 2);
      const sMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.85
      });
      const shield = new THREE.Mesh(sGeo, sMat);
      group.add(shield);

      // Energy core
      const cGeo = new THREE.SphereGeometry(1.8, 24, 24);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(cGeo, cMat);
      group.add(core);

      scene.userData = { group, shield, core, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.6;
      data.group.rotation.y = t * 0.8;

      const pulse = 1.0 + Math.sin(t * 4.0) * 0.12;
      data.shield.scale.set(pulse, pulse, pulse);

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "digital_synapse_supercluster",
        "title": "Supercomputer Neural Cluster",
        "fileName": "supercluster.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🧠 Massive distributed quantum hypercube server node supercluster routing petabytes of neural data in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌐\n\n#threejs #webgl #supercomputer #datamining #network #cyberpunk #creativecoding #javascript #reels",
        "displayCode": """// Hypercube Distributed Node Data Routing
function routeHypercubePackets(nodes, packetCount = 200) {
  const packetPos = [];
  for (let p = 0; p < packetCount; p++) {
    const src = nodes[Math.floor(Math.random() * nodes.length)];
    const dst = nodes[Math.floor(Math.random() * nodes.length)];
    packetPos.push(src.x, src.y, src.z);
    packetPos.push(dst.x, dst.y, dst.z);
  }
  return packetPos;
}""",
        "defaultParams": {
            "clusterNodes": 120,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.95, 0.3, 0.8]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.clusterNodes;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        ));
      }

      // Node mesh
      const sGeo = new THREE.BufferGeometry().setFromPoints(nodes);
      const sMat = new THREE.PointsMaterial({ size: 0.25, color: 0x38bdf8 });
      const pts = new THREE.Points(sGeo, sMat);
      group.add(pts);

      // Links
      const lines = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 3.2) {
            lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
            lines.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
      const lMat = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 });
      const links = new THREE.LineSegments(lGeo, lMat);
      group.add(links);

      scene.userData = { group, pts, links, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    }
]
