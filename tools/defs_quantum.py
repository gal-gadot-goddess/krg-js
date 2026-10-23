# tools/defs_quantum.py
# 13 Quantum Mechanics & Nanotechnology Visualizers

QUANTUM_VISUALIZERS = [
    {
        "id": "atomic_orbital_wavefunction",
        "title": "Hydrogen Atomic Orbitals",
        "fileName": "atomic_orbitals.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚛️ Quantum mechanical probability density |psi(n,l,m)|^2 of atomic electron wavefunctions! 3d orbital nodal lobes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬⚡\n\n#threejs #webgl #quantum #atom #physics #creativecoding #javascript #mathart #reels",
        "displayCode": """// Quantum Spherical Harmonics Y_l^m and Radial Probability
function evaluateAtomicOrbital(r, theta, phi, l = 2, m = 1) {
  // Associated Legendre Polynomial P_2^1(cos theta) ~ 3 * sin(theta) * cos(theta)
  const Ylm = Math.sin(theta) * Math.cos(theta) * Math.cos(m * phi);
  // Hydrogenic radial decay
  const Rnl = Math.exp(-r / 3.0) * (r * r);
  return Rnl * Ylm;
}""",
        "defaultParams": {
            "particleCount": 9500,
            "orbitalScale": 3.2,
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [0.95, 0.25, 0.65]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Nucleus
      const nucGeo = new THREE.SphereGeometry(0.7, 24, 24);
      const nucMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nucleus = new THREE.Mesh(nucGeo, nucMat);
      group.add(nucleus);

      // Electron Cloud (3d orbital)
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI;
        const ph = Math.random() * Math.PI * 2;
        // 3d orbital lobe probability distribution: ~ sin(2*th)
        const prob = Math.abs(Math.sin(2 * th));
        const r = (1.5 + Math.pow(Math.random(), 0.5) * 5.0) * (0.3 + 0.7 * prob);

        pos[i * 3 + 0] = r * Math.sin(th) * Math.cos(ph);
        pos[i * 3 + 1] = r * Math.cos(th);
        pos[i * 3 + 2] = r * Math.sin(th) * Math.sin(ph);

        const phase = Math.sin(2 * th) > 0 ? 1 : 0;
        col[i * 3 + 0] = phase ? params.primaryColor[0] : params.secondaryColor[0];
        col[i * 3 + 1] = phase ? params.primaryColor[1] : params.secondaryColor[1];
        col[i * 3 + 2] = phase ? params.primaryColor[2] : params.secondaryColor[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const cloud = new THREE.Points(geo, mat);
      group.add(cloud);

      scene.userData = { group, cloud, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "graphene_hexagonal_lattice",
        "title": "Graphene Honeycomb & Dirac Cones",
        "fileName": "graphene_lattice.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚡ 2D hexagonal carbon honeycomb graphene sheet with relativistic Dirac cone electron dispersion in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬📐\n\n#threejs #webgl #graphene #nanotech #physics #creativecoding #javascript #mathart #reels",
        "displayCode": """// 2D Graphene Hexagonal Honeycomb Crystal Sheet
function buildGrapheneSheet(rows = 14, cols = 14, a = 0.9) {
  const carbonAtoms = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * a * 1.5;
      const y = (r + (c % 2) * 0.5) * a * Math.sqrt(3);
      carbonAtoms.push(new THREE.Vector3(x - 8, y - 8, 0));
    }
  }
  return carbonAtoms;
}""",
        "defaultParams": {
            "rows": 16,
            "cols": 16,
            "primaryColor": [0.15, 0.95, 0.85],
            "secondaryColor": [0.95, 0.3, 0.9]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const atoms = [];
      const a = 1.0;
      for (let r = 0; r < params.rows; r++) {
        for (let c = 0; c < params.cols; c++) {
          const x = c * a * 1.5 - 10;
          const y = (r + (c % 2) * 0.5) * a * 1.732 - 10;
          atoms.push(new THREE.Vector3(x, y, 0));
        }
      }

      // Honeycomb bonds (LineSegments)
      const linePos = [];
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const d = atoms[i].distanceTo(atoms[j]);
          if (d > 0.8 && d < 1.2) {
            linePos.push(atoms[i].x, atoms[i].y, atoms[i].z);
            linePos.push(atoms[j].x, atoms[j].y, atoms[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.85
      });
      const bonds = new THREE.LineSegments(lGeo, lMat);
      group.add(bonds);

      // Atom spheres
      const sGeo = new THREE.BufferGeometry().setFromPoints(atoms);
      const sMat = new THREE.PointsMaterial({ size: 0.22, color: 0xffffff });
      const points = new THREE.Points(sGeo, sMat);
      group.add(points);

      scene.userData = { group, bonds, points, atoms, params };""",
        "renderBody": """      const bPos = data.bonds.geometry.attributes.position;
      const count = bPos.count;
      for (let i = 0; i < count; i++) {
        const x = bPos.getX(i);
        const y = bPos.getY(i);
        const wave = Math.sin(x * 0.5 + t * 4.0) * Math.cos(y * 0.5 + t * 3.0) * 1.2;
        bPos.setZ(i, wave);
      }
      bPos.needsUpdate = true;

      data.group.rotation.x = 0.6 + Math.sin(t * 0.4) * 0.2;
      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "superconducting_qubit_resonator",
        "title": "Quantum Transmon Qubit",
        "fileName": "transmon_qubit.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "🔬 Superconducting transmon quantum qubit coupled to coplanar waveguide microwave resonator in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🧠\n\n#threejs #webgl #quantumcomputing #qubit #nanotech #physics #creativecoding #javascript #reels",
        "displayCode": """// Josephson Junction Nonlinear Quantum Inductance
function renderQubitResonator(scene, photons = 80) {
  // Microwave Standing Wave Harmonics
  const wavePoints = [];
  for (let x = -8; x <= 8; x += 0.2) {
    const standingWave = Math.sin(x * 0.8) * Math.cos(Date.now() * 0.005) * 1.5;
    wavePoints.push(new THREE.Vector3(x, standingWave, 0));
  }
  return new THREE.BufferGeometry().setFromPoints(wavePoints);
}""",
        "defaultParams": {
            "resonatorLength": 16.0,
            "photonCount": 4000,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Qubit cross capacitor
      const crossGeo = new THREE.BoxGeometry(4.0, 0.4, 0.4);
      const crossMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const c1 = new THREE.Mesh(crossGeo, crossMat);
      const c2 = new THREE.Mesh(crossGeo, crossMat);
      c2.rotation.z = Math.PI / 2;
      group.add(c1);
      group.add(c2);

      // Resonator meandering waveguide
      const wPts = [];
      for (let x = -7; x <= 7; x += 0.2) {
        wPts.push(new THREE.Vector3(x, Math.sin(x * 1.5) * 2.2, 0));
      }
      const wGeo = new THREE.BufferGeometry().setFromPoints(wPts);
      const wMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const wave = new THREE.Line(wGeo, wMat);
      group.add(wave);

      // Quantized microwave photons
      const pCount = params.photonCount;
      const pPos = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        pPos[p * 3 + 0] = (Math.random() - 0.5) * 14;
        pPos[p * 3 + 1] = (Math.random() - 0.5) * 6;
        pPos[p * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.12, color: 0x10b981, blending: THREE.AdditiveBlending });
      const photons = new THREE.Points(pGeo, pMat);
      group.add(photons);

      scene.userData = { group, c1, c2, wave, photons, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.5;
      data.c1.rotation.z = t * 1.2;
      data.c2.rotation.z = t * 1.2 + Math.PI / 2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_entanglement_bell_state",
        "title": "Quantum Entanglement Bell State",
        "fileName": "quantum_entanglement.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚛️ Spooky action at a distance! Paired entangled photons in a maximally entangled Bell state in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #quantumentanglement #bellstate #quantumphysics #creativecoding #javascript #reels",
        "displayCode": """// Maximally Entangled EPR Bell State: |Psi+> = (|01> + |10>) / sqrt(2)
function emitEntangledPair(time, separation = 8.0) {
  const pA = new THREE.Vector3(Math.cos(time * 3) * separation, 0, Math.sin(time * 3) * separation);
  const pB = new THREE.Vector3(-pA.x, 0, -pA.z); // Anti-correlated
  // Quantum state correlation bridge
  const bridge = [pA, pB];
  return { pA, pB, bridge };
}""",
        "defaultParams": {
            "particleSpeed": 2.5,
            "entanglementStreams": 4500,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.25, 0.75]
        },
        "initBody": """      camera.position.set(0, 4, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Photon A and Photon B
      const sGeo = new THREE.SphereGeometry(1.0, 24, 24);
      const matA = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const matB = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const photonA = new THREE.Mesh(sGeo, matA);
      const photonB = new THREE.Mesh(sGeo, matB);
      group.add(photonA);
      group.add(photonB);

      // Entanglement bridge lines
      const bPts = [new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)];
      const bGeo = new THREE.BufferGeometry().setFromPoints(bPts);
      const bMat = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.8 });
      const bridge = new THREE.Line(bGeo, bMat);
      group.add(bridge);

      // Entangled wave trails
      const count = params.entanglementStreams;
      const tPos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        tPos[i * 3 + 0] = (Math.random() - 0.5) * 16;
        tPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
        tPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      const tMat = new THREE.PointsMaterial({ size: 0.12, color: 0x22d3ee, blending: THREE.AdditiveBlending });
      const trails = new THREE.Points(tGeo, tMat);
      group.add(trails);

      scene.userData = { group, photonA, photonB, bridge, params };""",
        "renderBody": """      const dist = 5.5 + Math.sin(t * 1.5) * 1.5;
      const theta = t * 2.2;
      data.photonA.position.set(Math.cos(theta) * dist, Math.sin(t * 3) * 1.2, Math.sin(theta) * dist);
      data.photonB.position.set(-Math.cos(theta) * dist, -Math.sin(t * 3) * 1.2, -Math.sin(theta) * dist);

      const bPos = data.bridge.geometry.attributes.position;
      bPos.setXYZ(0, data.photonA.position.x, data.photonA.position.y, data.photonA.position.z);
      bPos.setXYZ(1, data.photonB.position.x, data.photonB.position.y, data.photonB.position.z);
      bPos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 4 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bose_einstein_condensate",
        "title": "Bose-Einstein Condensate",
        "fileName": "bose_einstein.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "❄️ Macroscopic quantum state of matter at 1 nanokelvin! Thousands of bosonic atoms collapsing into a single quantum wave packet in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬✨\n\n#threejs #webgl #quantum #boseeinstein #physics #superfluid #creativecoding #javascript #reels",
        "displayCode": """// Gross-Pitaevskii Ground State Wavepacket Condensation
function condensateDensity(r, time, width = 2.2) {
  // Gaussian macroscopic wave packet |psi(r)|^2
  const breathing = width * (1.0 + 0.25 * Math.sin(time * 5.0));
  return Math.exp(-(r * r) / (2 * breathing * breathing));
}""",
        "defaultParams": {
            "bosonCount": 8500,
            "trapRadius": 6.0,
            "primaryColor": [0.1, 0.9, 1.0],
            "secondaryColor": [0.85, 0.35, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.bosonCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // High density at center (condensate peak)
        const r = Math.pow(Math.random(), 3.5) * params.trapRadius;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        pos[i * 3 + 2] = Math.cos(ph) * r;

        const u = r / params.trapRadius;
        col[i * 3 + 0] = params.primaryColor[0] * (1 - u) + params.secondaryColor[0] * u;
        col[i * 3 + 1] = params.primaryColor[1] * (1 - u) + params.secondaryColor[1] * u;
        col[i * 3 + 2] = params.primaryColor[2] * (1 - u) + params.secondaryColor[2] * u;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const cloud = new THREE.Points(geo, mat);
      group.add(cloud);

      scene.userData = { group, cloud, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.2;

      // Collective breathing mode oscillation
      const s = 1.0 + Math.sin(t * 4.5) * 0.2;
      data.cloud.scale.set(s, s, s);

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "carbon_nanotube_armchair",
        "title": "Carbon Nanotube Ballistic Flow",
        "fileName": "carbon_nanotube.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "🔬 Ballistic electron transport through a single-walled carbon nanotube! High-speed quantum electron wavepackets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #nanotechnology #nanotube #graphene #physics #creativecoding #javascript #reels",
        "displayCode": """// Cylindrical SWCNT Lattice Coordinates
function rollNanotubeCylinder(radius = 3.2, length = 18, rings = 40) {
  const atoms = [];
  for (let ring = 0; ring < rings; ring++) {
    const y = (ring / rings) * length - length / 2;
    for (let c = 0; c < 16; c++) {
      const theta = (c / 16) * Math.PI * 2 + (ring % 2) * 0.2;
      atoms.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
    }
  }
  return atoms;
}""",
        "defaultParams": {
            "radius": 3.0,
            "length": 18.0,
            "electronCount": 4000,
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.3, 0.8]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Nanotube cylinder wireframe
      const cylGeo = new THREE.CylinderGeometry(params.radius, params.radius, params.length, 24, 32, true);
      const cylMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.75
      });
      const tube = new THREE.Mesh(cylGeo, cylMat);
      group.add(tube);

      // Electrons flowing through cylinder
      const count = params.electronCount;
      const ePos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * params.length;
        ePos[i * 3 + 0] = Math.cos(th) * params.radius * 0.9;
        ePos[i * 3 + 1] = y;
        ePos[i * 3 + 2] = Math.sin(th) * params.radius * 0.9;
      }
      const eGeo = new THREE.BufferGeometry();
      eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
      const eMat = new THREE.PointsMaterial({ size: 0.14, color: 0xffffff, blending: THREE.AdditiveBlending });
      const electrons = new THREE.Points(eGeo, eMat);
      group.add(electrons);

      scene.userData = { group, tube, electrons, count, params };""",
        "renderBody": """      data.group.rotation.z = 0.5;
      data.group.rotation.y = t * 0.8;

      const pos = data.electrons.geometry.attributes.position;
      const len = data.params.length;
      for (let i = 0; i < data.count; i++) {
        let y = pos.getY(i) + 0.25;
        if (y > len / 2) y = -len / 2;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_tunneling_barrier",
        "title": "Quantum Wavepacket Tunneling",
        "fileName": "quantum_tunneling.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚛️ Quantum wave packet incident on an energy potential barrier! Particle transmission and reflection tunneling in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #quantum #tunneling #quantumphysics #creativecoding #javascript #mathart #reels",
        "displayCode": """// 1D Schrödinger Wavepacket Tunneling Simulation
function simulateTunnelingWavepacket(x, time, barrierX = 0, barrierWidth = 1.2) {
  // Incident Gaussian wavepacket psi(x, t)
  const k = 4.0; // Wavenumber
  const sigma = 1.2;
  const x0 = -5.0 + time * 2.0;
  const envelope = Math.exp(-Math.pow(x - x0, 2) / (2 * sigma * sigma));
  // Probability decay inside barrier: exp(-kappa * x)
  if (x > barrierX && x < barrierX + barrierWidth) {
    return envelope * Math.exp(-(x - barrierX) * 2.5);
  }
  return envelope * Math.cos(k * x - time * 6.0);
}""",
        "defaultParams": {
            "wavePoints": 180,
            "barrierWidth": 1.4,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.2, 0.5]
        },
        "initBody": """      camera.position.set(0, 2, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Potential Barrier (Semi-transparent slab)
      const bGeo = new THREE.BoxGeometry(params.barrierWidth, 8, 4);
      const bMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true, transparent: true, opacity: 0.6 });
      const barrier = new THREE.Mesh(bGeo, bMat);
      group.add(barrier);

      // Wavepacket lines
      const pts = [];
      for (let x = -8; x <= 8; x += 0.1) {
        pts.push(new THREE.Vector3(x, 0, 0));
      }
      const wGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const wMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 });
      const wave = new THREE.Line(wGeo, wMat);
      group.add(wave);

      scene.userData = { group, barrier, wave, pts, params };""",
        "renderBody": """      const pos = data.wave.geometry.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const cycle = ((t * 2.5) % 16.0) - 8.0;
        const env = Math.exp(-Math.pow(x - cycle, 2) / 3.0);
        let amp = env * Math.sin(x * 6.0 - t * 8.0) * 2.5;
        if (x > -0.7 && x < 0.7) amp *= 0.3; // Decay inside barrier
        pos.setY(i, amp);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "topological_insulator_edge",
        "title": "Topological Insulator Edge States",
        "fileName": "topological_insulator.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚡ Quantum spin Hall effect! Insulating bulk with dissipationless helical chiral edge conduction in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬📐\n\n#threejs #webgl #topologicalinsulator #condensedmatter #physics #creativecoding #javascript #reels",
        "displayCode": """// Helical Chiral Edge State Conduction
function renderTopologicalEdgeCurrent(perimeter = 400) {
  const edgeParticles = new Float32Array(perimeter * 3);
  for (let i = 0; i < perimeter; i++) {
    const u = i / perimeter;
    const ang = u * Math.PI * 2;
    // Edge channel confined to boundary perimeter
    edgeParticles[i * 3 + 0] = Math.cos(ang) * 5.0;
    edgeParticles[i * 3 + 1] = Math.sin(ang) * 5.0;
    edgeParticles[i * 3 + 2] = Math.sin(u * 12.0) * 0.4;
  }
  return edgeParticles;
}""",
        "defaultParams": {
            "bulkWidth": 8.0,
            "edgeCount": 4500,
            "primaryColor": [0.15, 0.95, 0.85],
            "secondaryColor": [1.0, 0.8, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Insulating bulk crystal slab
      const bGeo = new THREE.BoxGeometry(8, 8, 1.2);
      const bMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true });
      const bulk = new THREE.Mesh(bGeo, bMat);
      group.add(bulk);

      // Chiral edge particles (racing along boundary)
      const count = params.edgeCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = Math.cos(u) * 4.2;
        pos[i * 3 + 1] = Math.sin(u) * 4.2;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const edge = new THREE.Points(geo, mat);
      group.add(edge);

      scene.userData = { group, edge, count, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      data.edge.rotation.z = t * 2.0;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quark_gluon_plasma",
        "title": "Quark-Gluon Plasma Fireball",
        "fileName": "quark_gluon.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "🔥 Ultra-relativistic heavy ion collision creating primordial Quark-Gluon Plasma at 4 trillion Kelvin in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬💥\n\n#threejs #webgl #particlephysics #quarkgluon #cern #quantum #creativecoding #javascript #reels",
        "displayCode": """// Chromodynamic Color Flux Tubes & Deconfined Quarks
function createQuarkFireball(quarks = 5000, tempMeV = 250) {
  const pos = new Float32Array(quarks * 3);
  for (let q = 0; q < quarks; q++) {
    // Relativistic fireball expansion
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const r = Math.pow(Math.random(), 0.6) * 6.5;
    pos[q * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
    pos[q * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
    pos[q * 3 + 2] = Math.cos(ph) * r;
  }
  return pos;
}""",
        "defaultParams": {
            "quarkCount": 7500,
            "fireballRadius": 6.0,
            "primaryColor": [1.0, 0.25, 0.1],
            "secondaryColor": [1.0, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.quarkCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = Math.pow(Math.random(), 0.7) * params.fireballRadius;
        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        pos[i * 3 + 2] = Math.cos(ph) * r;

        // RGB QCD color charge
        const c = i % 3;
        col[i * 3 + 0] = c === 0 ? 1 : 0.2;
        col[i * 3 + 1] = c === 1 ? 1 : 0.2;
        col[i * 3 + 2] = c === 2 ? 1 : 0.2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const fireball = new THREE.Points(geo, mat);
      group.add(fireball);

      scene.userData = { group, fireball, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.9;
      data.group.rotation.x = t * 0.7;

      const sc = 1.0 + Math.sin(t * 6.0) * 0.15;
      data.fireball.scale.set(sc, sc, sc);

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "casimir_effect_vacuum_plates",
        "title": "Casimir Effect Vacuum Force",
        "fileName": "casimir_effect.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚛️ Attractive quantum vacuum fluctuation forces between uncharged metallic boundary plates in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #casimireffect #quantum #vacuum #physics #creativecoding #javascript #reels",
        "displayCode": """// Quantum Vacuum Zero-Point Fluctuations Mode Truncation
function calculateCasimirModes(plateSeparation = 2.4, modes = 60) {
  // Modes excluded between plates produce net attractive pressure
  const excludedModes = [];
  for (let m = 1; m <= modes; m++) {
    const lambda = (2 * plateSeparation) / m;
    excludedModes.push(lambda);
  }
  return excludedModes;
}""",
        "defaultParams": {
            "separation": 3.0,
            "vacuumPhotons": 6000,
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [0.95, 0.4, 0.8]
        },
        "initBody": """      camera.position.set(0, 3, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Dual parallel conducting plates
      const pGeo = new THREE.BoxGeometry(0.3, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const plateA = new THREE.Mesh(pGeo, pMat);
      const plateB = new THREE.Mesh(pGeo, pMat);
      group.add(plateA);
      group.add(plateB);

      // Vacuum photon particles
      const count = params.vacuumPhotons;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.12, color: 0xf43f5e, blending: THREE.AdditiveBlending });
      const photons = new THREE.Points(geo, mat);
      group.add(photons);

      scene.userData = { group, plateA, plateB, params };""",
        "renderBody": """      const sep = 2.0 + Math.sin(t * 2.0) * 1.2;
      data.plateA.position.x = -sep / 2;
      data.plateB.position.x = sep / 2;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 3 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "magnetic_skyrmion_vortex",
        "title": "Magnetic Skyrmion Vortex",
        "fileName": "magnetic_skyrmion.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "🌀 Nanoscale topologically protected chiral magnetic spin whirl! Magnetic skyrmion vortex memory in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #skyrmion #spintronics #nanotech #physics #creativecoding #javascript #reels",
        "displayCode": """// Chiral Hedgehog Magnetic Spin Field Texture
function calculateSkyrmionVector(x, y, radius = 4.0) {
  const r = Math.sqrt(x*x + y*y);
  const theta = (r / radius) * Math.PI; // Core pointing down, rim pointing up
  const phi = Math.atan2(y, x) + Math.PI / 2; // Chiral twist
  const mx = Math.sin(theta) * Math.cos(phi);
  const my = Math.sin(theta) * Math.sin(phi);
  const mz = Math.cos(theta);
  return new THREE.Vector3(mx, my, mz);
}""",
        "defaultParams": {
            "gridRes": 32,
            "vortexRadius": 4.5,
            "primaryColor": [0.1, 0.95, 0.9],
            "secondaryColor": [0.95, 0.25, 0.5]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.gridRes;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      let idx = 0;
      for (let i = 0; i < res; i++) {
        const x = ((i / res) - 0.5) * 10;
        for (let j = 0; j < res; j++) {
          const y = ((j / res) - 0.5) * 10;
          const r = Math.sqrt(x*x + y*y);
          const th = (r / params.vortexRadius) * Math.PI;

          pos[idx * 3 + 0] = x;
          pos[idx * 3 + 1] = y;
          pos[idx * 3 + 2] = Math.cos(th) * 2.0;

          const u = (Math.cos(th) + 1.0) / 2.0;
          col[idx * 3 + 0] = params.primaryColor[0] * u + params.secondaryColor[0] * (1 - u);
          col[idx * 3 + 1] = params.primaryColor[1] * u + params.secondaryColor[1] * (1 - u);
          col[idx * 3 + 2] = params.primaryColor[2] * u + params.secondaryColor[2] * (1 - u);
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.2, vertexColors: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      data.group.rotation.z = t * 1.5;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "feynman_diagram_field",
        "title": "QED Feynman Diagram Lattice",
        "fileName": "feynman_field.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚡ Quantum Electrodynamics interaction vertices! Electron-positron virtual photon annihilation in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬📐\n\n#threejs #webgl #feynman #qed #particlephysics #quantum #creativecoding #javascript #reels",
        "displayCode": """// QED Vertex Propagator Waves: e- + e+ -> gamma -> mu- + mu+
function createFeynmanVertices(nodeCount = 20) {
  const lines = [];
  for (let n = 0; n < nodeCount; n++) {
    const vCenter = new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*10, 0);
    // Propagator wavy lines
    for (let w = 0; w < 4; w++) {
      const ang = (w / 4) * Math.PI * 2;
      lines.push(vCenter.x, vCenter.y, 0);
      lines.push(vCenter.x + Math.cos(ang)*3.5, vCenter.y + Math.sin(ang)*3.5, 0);
    }
  }
  return lines;
}""",
        "defaultParams": {
            "vertexCount": 24,
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const linePos = [];
      const count = params.vertexCount;
      for (let i = 0; i < count; i++) {
        const cx = (Math.random() - 0.5) * 12;
        const cy = (Math.random() - 0.5) * 12;
        const cz = (Math.random() - 0.5) * 4;
        for (let j = 0; j < 4; j++) {
          const a = (j / 4) * Math.PI * 2;
          linePos.push(cx, cy, cz);
          linePos.push(cx + Math.cos(a) * 2.8, cy + Math.sin(a) * 2.8, cz + (Math.random() - 0.5));
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.85
      });
      const lines = new THREE.LineSegments(geo, mat);
      group.add(lines);

      scene.userData = { group, lines, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "photon_polarization_beam",
        "title": "Laser Photon Polarization Wave",
        "fileName": "photon_polarization.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "cyber",
        "caption": "⚡ Coherent laser beam with orthogonal oscillating electric and magnetic field vectors in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🌈\n\n#threejs #webgl #optics #electromagnetism #laser #physics #creativecoding #javascript #reels",
        "displayCode": """// Circular Polarization Orthogonal Field Wavevectors
function calculatePolarizationWave(z, time, k = 1.8, omega = 6.0) {
  const E_x = Math.cos(k * z - omega * time) * 3.0; // Electric vector
  const B_y = Math.sin(k * z - omega * time) * 3.0; // Magnetic vector
  return { E_x, B_y, z };
}""",
        "defaultParams": {
            "waveLength": 18.0,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.3, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const ptsE = [], ptsB = [];
      for (let z = -9; z <= 9; z += 0.2) {
        ptsE.push(new THREE.Vector3(Math.cos(z * 1.5) * 2.8, Math.sin(z * 1.5) * 2.8, z));
        ptsB.push(new THREE.Vector3(-Math.sin(z * 1.5) * 2.8, Math.cos(z * 1.5) * 2.8, z));
      }
      const geoE = new THREE.BufferGeometry().setFromPoints(ptsE);
      const geoB = new THREE.BufferGeometry().setFromPoints(ptsB);
      const lineE = new THREE.Line(geoE, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 }));
      const lineB = new THREE.Line(geoB, new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 2 }));
      group.add(lineE);
      group.add(lineB);

      scene.userData = { group, lineE, lineB, params };""",
        "renderBody": """      data.group.rotation.z = t * 2.0;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    }
]
