# tools/defs_batch3_quantum.py
# 15 Quantum Field Theory & Particle Physics 3D Visualizers (Batch 3: IDs 231-245)

DEFS_QUANTUM_3 = [
    {
        "id": "quark_gluon_plasma_flux_tube_breaking",
        "title": "Chromo-Electric QCD Flux Tube Snapping & Hadronization",
        "fileName": "qcd_flux_tube.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Quantum Chromodynamics (QCD) chromo-electric flux tube stretching and string-breaking into quark-antiquark pairs in Three.js! Follow @kreggsjs! 🔬⚛️\n\n#threejs #webgl #quantum #particlephysics #qcd #quarks #physics #codeart",
        "displayCode": "// Linear Confinement Potential V(r) = -4/3 * alpha_s / r + sigma * r\nfunction qcdPotential(r, alpha_s, sigma) {\n  return -(4.0 / 3.0) * (alpha_s / r) + sigma * r;\n}\nconst string_tension = 1.0; // GeV/fm",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.75],
            "secondaryColor": [1.0, 0.25, 0.55],
            "stringLength": 14.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Quark & Antiquark End Caps
      const qGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const q1 = new THREE.Mesh(qGeo, new THREE.MeshBasicMaterial({ color: c1 }));
      const q2 = new THREE.Mesh(qGeo, new THREE.MeshBasicMaterial({ color: c2 }));
      group.add(q1); group.add(q2);

      // 22,000 Chromo-electric Gluon Flux Tube Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * params.stringLength;
        const angle = Math.random() * Math.PI * 2;
        const tubeRad = 0.6 + (1.0 - Math.abs(x) / (params.stringLength * 0.5)) * 1.4;
        const r = Math.sqrt(Math.random()) * tubeRad;

        pPos[i * 3] = x;
        pPos[i * 3 + 1] = Math.cos(angle) * r;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = c1.clone().lerp(c2, (x + params.stringLength * 0.5) / params.stringLength);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, angle, r, speed: 2.5 + Math.random() * 2.0 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const tube = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(tube);

      scene.userData = { group, q1, q2, tube, pData, params };""",
        "renderBody": """      const halfL = (params.stringLength * 0.5) + Math.sin(t * 3.0) * 1.5;
      data.q1.position.set(-halfL, 0, 0);
      data.q2.position.set(halfL, 0, 0);

      data.tube.rotation.x = t * 1.5;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_vacuum_casimir_polder_fluctuation",
        "title": "Quantum Vacuum Energy & Casimir-Polder Boundary Stress",
        "fileName": "casimir_fluctuation.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Quantum vacuum zero-point fluctuations excluded between parallel conducting plates generating attractive Casimir force in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #quantumvacuum #casimireffect #zeropointenergy #physics #codeart",
        "displayCode": "// Casimir Energy Density between Conducting Plates\nfunction casimirEnergy(a) {\n  // E / A = - (pi^2 * hbar * c) / (720 * a^3)\n  return - (Math.PI * Math.PI) / (720.0 * Math.pow(a, 3.0));\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [0.95, 0.4, 0.85],
            "plateSep": 4.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Dual Casimir Conducting Plates
      const pGeo = new THREE.BoxGeometry(1.0, 14.0, 14.0);
      const pMat = new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true });
      const plate1 = new THREE.Mesh(pGeo, pMat);
      const plate2 = new THREE.Mesh(pGeo, pMat);
      group.add(plate1); group.add(plate2);

      // Vacuum Fluctuations (22,000 virtual particles)
      const fCount = 22000;
      const fPos = new Float32Array(fCount * 3);
      const fCol = new Float32Array(fCount * 3);
      const fData = [];

      for (let i = 0; i < fCount; i++) {
        const x = (Math.random() - 0.5) * 16.0;
        const y = (Math.random() - 0.5) * 14.0;
        const z = (Math.random() - 0.5) * 14.0;

        fPos[i * 3] = x; fPos[i * 3 + 1] = y; fPos[i * 3 + 2] = z;

        const isInside = (Math.abs(x) < params.plateSep * 0.5);
        const col = isInside ? c1 : c2;
        fCol[i * 3] = col.r; fCol[i * 3 + 1] = col.g; fCol[i * 3 + 2] = col.b;

        fData.push({ x, y, z, freq: 4.0 + Math.random() * 8.0 });
      }

      const fGeo = new THREE.BufferGeometry();
      fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
      fGeo.setAttribute('color', new THREE.BufferAttribute(fCol, 3));
      const vacuum = new THREE.Points(fGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(vacuum);

      scene.userData = { group, plate1, plate2, vacuum, fData, params };""",
        "renderBody": """      const curSep = params.plateSep * 0.5 + Math.sin(t * 1.8) * 0.6;
      data.plate1.position.x = -curSep;
      data.plate2.position.x = curSep;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "neutrino_flavor_oscillation_wavepacket",
        "title": "PMNS Three-Flavor Neutrino Interference Oscillations",
        "fileName": "neutrino_oscillation.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Electron, Muon & Tau neutrino quantum flavor state probability oscillation via the PMNS matrix in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #neutrino #pmns #quantummechanics #particlephysics #codeart",
        "displayCode": "// Three-Flavor Neutrino PMNS Transition Probability\nfunction pmnsTransition(L, E, dm2) {\n  // P(alpha -> beta) = sin^2(2*theta) * sin^2(1.27 * dm2 * L / E)\n  return Math.pow(Math.sin(2.0 * theta), 2) * Math.pow(Math.sin(1.27 * dm2 * L / E), 2);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.95],
            "secondaryColor": [0.95, 0.35, 0.55],
            "pathLength": 22.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);
      const c3 = new THREE.Color(1.0, 0.85, 0.2); // Tau gold

      // 24,000 Neutrino Wavepacket Interference Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const z = -params.pathLength * 0.5 + Math.random() * params.pathLength;
        const normZ = (z + params.pathLength * 0.5) / params.pathLength;
        const angle = normZ * Math.PI * 12.0 + Math.random() * 0.5;
        const rad = 1.2 + Math.sin(normZ * Math.PI * 6.0) * 0.8;

        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = Math.sin(angle) * rad;
        pPos[i * 3 + 2] = z;

        // 3-state quantum superposition color
        const pE = Math.pow(Math.cos(normZ * Math.PI * 3.0), 2);
        const pMu = Math.pow(Math.sin(normZ * Math.PI * 3.0), 2) * 0.7;
        const pTau = 1.0 - pE - pMu;

        const col = c1.clone().multiplyScalar(pE).add(c2.clone().multiplyScalar(pMu)).add(c3.clone().multiplyScalar(pTau));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ z, angle, rad, speed: 2.8 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const beam = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(beam);

      scene.userData = { group, beam, pData, params };""",
        "renderBody": """      data.beam.rotation.z = t * 1.2;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "topological_insulator_dirac_cone_spin_helical",
        "title": "Topological Insulator Dirac Cone & Spin-Momentum Locking",
        "fileName": "dirac_cone_ti.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Relativistic massless Dirac fermions with spin-momentum locking on topological insulator surface states in Three.js! Follow @kreggsjs for daily reels! 🔬⚡\n\n#threejs #webgl #topologicalinsulator #diraccone #quantum #spintronics #codeart",
        "displayCode": "// Surface State Dirac Hamiltonian: H = v_F * (sigma x k)_z\nfunction diracEnergy(kx, ky, v_F) {\n  // E_pm = pm hbar * v_F * sqrt(kx^2 + ky^2)\n  return v_F * Math.sqrt(kx*kx + ky*ky);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [1.0, 0.35, 0.45],
            "kMax": 5.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Dual Upper and Lower Dirac Cones
      const coneGeo = new THREE.ConeGeometry(5.2, 7.5, 32, 1, true);
      const coneUpper = new THREE.Mesh(coneGeo, new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.55 }));
      coneUpper.position.y = 3.75;
      const coneLower = new THREE.Mesh(coneGeo, new THREE.MeshBasicMaterial({ color: c2, wireframe: true, transparent: true, opacity: 0.55 }));
      coneLower.position.y = -3.75;
      coneLower.rotation.x = Math.PI;

      group.add(coneUpper); group.add(coneLower);

      // Helical Spin-Momentum Locked Electrons (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const sign = (i % 2 === 0) ? 1 : -1;
        const k = Math.random() * params.kMax;
        const angle = Math.random() * Math.PI * 2;

        pPos[i * 3] = Math.cos(angle) * k;
        pPos[i * 3 + 1] = sign * (k * 1.36);
        pPos[i * 3 + 2] = Math.sin(angle) * k;

        const col = (sign > 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const electrons = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(electrons);

      scene.userData = { group, coneUpper, coneLower, electrons, params };""",
        "renderBody": """      data.electrons.rotation.y = t * 0.8;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "feynman_path_integral_quantum_phase_sum",
        "title": "Feynman Path Integral All-Histories Phase Amplitude Sum",
        "fileName": "feynman_path_integral.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Quantum particle exploring every possible path through spacetime simultaneously with Feynman path integral phase interference in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #feynman #pathintegral #quantumphysics #wavefunction #codeart",
        "displayCode": "// Feynman Quantum Propagator: K(b, a) = int D[x(t)] * exp(i * S[x] / hbar)\nfunction actionPhase(S_path, hbar) {\n  return new THREE.Vector2(Math.cos(S_path / hbar), Math.sin(S_path / hbar));\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.45, 0.2],
            "secondaryColor": [0.25, 0.9, 1.0],
            "pathCount": 65
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Quantum source A and detector B
      const ptA = new THREE.Vector3(-8.0, 0, 0);
      const ptB = new THREE.Vector3(8.0, 0, 0);
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.8, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffffff })));

      // 65 Classical and Virtual Feynman Paths
      const pathGroup = new THREE.Group();
      for (let i = 0; i < params.pathCount; i++) {
        const pts = [];
        const segs = 32;
        const amp = (i === 0) ? 0 : Math.pow((i / params.pathCount), 1.2) * 5.5;
        const phase = i * 0.45;

        for (let s = 0; s <= segs; s++) {
          const u = s / segs;
          const x = THREE.MathUtils.lerp(ptA.x, ptB.x, u);
          const y = Math.sin(u * Math.PI) * Math.sin(u * Math.PI * 3.0 + phase) * amp;
          const z = Math.sin(u * Math.PI) * Math.cos(u * Math.PI * 2.0 + phase) * amp;
          pts.push(new THREE.Vector3(x, y, z));
        }

        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({
          color: (i === 0) ? new THREE.Color(1, 1, 1) : c1.clone().lerp(c2, i / params.pathCount),
          transparent: true,
          opacity: (i === 0) ? 1.0 : 0.45
        });
        pathGroup.add(new THREE.Line(lGeo, lMat));
      }
      group.add(pathGroup);

      scene.userData = { group, pathGroup, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "fractional_quantum_hall_composite_fermion",
        "title": "Fractional Quantum Hall Effect & Composite Fermion Anyons",
        "fileName": "composite_fermion.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Fractional Quantum Hall Effect: electrons binding magnetic flux vortices to form Composite Fermions with fractional anyonic charge in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #quantumhall #compositefermion #anyons #physics #condensedmatter #codeart",
        "displayCode": "// Composite Fermion Flux Attachment: Phi* = Phi - 2 * p * Phi_0\nfunction effectiveMagneticField(B, n_e, p) {\n  const phi_0 = 4.135e-15;\n  return B - 2.0 * p * n_e * phi_0;\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.75],
            "secondaryColor": [0.95, 0.35, 0.9],
            "vortexFlux": 2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Laughlin state composite vortex particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 1.2 + Math.pow(Math.random(), 0.7) * 9.5;
        const angle = Math.random() * Math.PI * 2;
        const z = (Math.random() - 0.5) * 1.5;

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = z;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = c1.clone().lerp(c2, r / 10.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 2.4 / Math.sqrt(r) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const anyons = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(anyons);

      scene.userData = { group, anyons, pData, params };""",
        "renderBody": """      const pos = data.anyons.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].angle += pData[i].speed * 0.035;
        pos[i * 3] = Math.cos(pData[i].angle) * pData[i].r;
        pos[i * 3 + 2] = Math.sin(pData[i].angle) * pData[i].r;
      }
      data.anyons.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "andreev_reflection_superconductor_heterostructure",
        "title": "Andreev Reflection & Superconducting Cooper Pair Conversion",
        "fileName": "andreev_reflection.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Normal-metal to superconductor boundary: incident electron converted into a reflected hole while a Cooper pair enters the condensate in Three.js! Follow @kreggsjs! 🔬⚡\n\n#threejs #webgl #superconductivity #andreev #quantum #cooperpairs #codeart",
        "displayCode": "// Bogoliubov-de Gennes Andreev Reflection Amplitude\nfunction andreevProbability(E, Delta) {\n  // For E < Delta: R_A = 1 (perfect retro-reflection as hole)\n  return (E < Delta) ? 1.0 : Math.pow(E - Math.sqrt(E*E - Delta*Delta), 2) / (Delta * Delta);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.9],
            "secondaryColor": [1.0, 0.4, 0.25],
            "gapDelta": 1.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Interface Barrier Wireframe Plane
      const bGeo = new THREE.PlaneGeometry(16.0, 16.0, 16, 16);
      const bMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 });
      const barrier = new THREE.Mesh(bGeo, bMat);
      barrier.rotation.y = Math.PI / 2;
      group.add(barrier);

      // 20,000 Electron-Hole Trajectory Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = -8.0 + Math.random() * 8.0; // Normal metal side
        const y = (Math.random() - 0.5) * 12.0;
        const z = (Math.random() - 0.5) * 12.0;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
        pCol[i * 3] = c1.r; pCol[i * 3 + 1] = c1.g; pCol[i * 3 + 2] = c1.b;

        pData.push({ x, y, z, vx: 2.2 + Math.random() * 2.0, isHole: false });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const stream = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(stream);

      scene.userData = { group, barrier, stream, pData, params };""",
        "renderBody": """      const pos = data.stream.geometry.attributes.position.array;
      const col = data.stream.geometry.attributes.color.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].x += pData[i].vx * 0.05;
        if (pData[i].x > 0) {
          pData[i].vx = -Math.abs(pData[i].vx); // Andreev retro-reflection
          col[i * 3] = 1.0; col[i * 3 + 1] = 0.35; col[i * 3 + 2] = 0.25; // Hole color
        }
        if (pData[i].x < -8.0) {
          pData[i].x = -8.0; pData[i].vx = Math.abs(pData[i].vx);
          col[i * 3] = 0.25; col[i * 3 + 1] = 0.95; col[i * 3 + 2] = 0.9; // Electron color
        }
        pos[i * 3] = pData[i].x;
      }
      data.stream.geometry.attributes.position.needsUpdate = true;
      data.stream.geometry.attributes.color.needsUpdate = true;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_teleportation_epr_entanglement_swapping",
        "title": "Quantum Teleportation & EPR Entanglement Swapping",
        "fileName": "teleportation_epr.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Quantum state teleportation via Bell State Measurement & non-local EPR pair entanglement swapping in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #quantumteleportation #entanglement #epr #bellstates #physics #codeart",
        "displayCode": "// Quantum Teleportation State Decomposition\nfunction bellMeasurement(psi, phi_plus) {\n  // |psi>_1 ( |00> + |11> )_23 = 1/2 * sum_k |Bell_k>_12 (sigma_k |psi>_3)\n  return 0.5;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.3, 0.8],
            "beamCount": 3
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Three Quantum Nodes: Alice, Source, Bob
      const nGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const nAlice = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({ color: c1 }));
      nAlice.position.x = -7.5;
      const nSource = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const nBob = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({ color: c2 }));
      nBob.position.x = 7.5;
      group.add(nAlice); group.add(nSource); group.add(nBob);

      // Entanglement Helices (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 16.0;
        const angle = u * 4.0;
        const rad = 1.0 + Math.sin(u * 2.0) * 0.5;

        pPos[i * 3] = u;
        pPos[i * 3 + 1] = Math.cos(angle) * rad;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;

        const col = c1.clone().lerp(c2, (u + 8.0) / 16.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const entangle = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(entangle);

      scene.userData = { group, nAlice, nBob, entangle, params };""",
        "renderBody": """      data.entangle.rotation.x = t * 1.5;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_hall_skyrmion_spin_texture",
        "title": "Quantum Hall Ferromagnetic Skyrmion Spin Textures",
        "fileName": "hall_skyrmion.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Topological Skyrmion spin texture with non-trivial winding number in quantum Hall 2D electron gas in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #skyrmion #quantumhall #spintronics #topology #physics #codeart",
        "displayCode": "// Skyrmion Hedgehog Spin Field: m(r) = (sin(theta)*cos(phi), sin(theta)*sin(phi), cos(theta))\nfunction skyrmionWinding(r, lambda) {\n  // theta(r) = 2 * atan(lambda / r)\n  return 2.0 * Math.atan(lambda / r);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.9, 1.0],
            "secondaryColor": [1.0, 0.45, 0.25],
            "coreRadius": 2.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 Skyrmion 3D Vector Spin Arrows / Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 0.5 + Math.sqrt(Math.random()) * 8.5;
        const phi = Math.random() * Math.PI * 2;
        const theta = 2.0 * Math.atan(params.coreRadius / r);

        const x = Math.cos(phi) * r;
        const z = Math.sin(phi) * r;
        const y = Math.cos(theta) * 2.4;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (Math.cos(theta) + 1.0) * 0.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, phi, theta });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const skyrmion = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(skyrmion);

      scene.userData = { group, skyrmion, params };""",
        "renderBody": """      data.skyrmion.rotation.y = t * 0.55;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "polariton_superfluid_quantum_vortex_lattice",
        "title": "Exciton-Polariton Superfluid & Quantized Vortex Lattice",
        "fileName": "polariton_vortex_lattice.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Microcavity exciton-polariton non-equilibrium Bose-Einstein condensate forming an Abrikosov quantum vortex lattice in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #polariton #superfluid #boseeinstein #vortex #quantum #codeart",
        "displayCode": "// Gross-Pitaevskii Equation Quantized Vortex Core Profile\nfunction vortexCore(r, xi) {\n  // psi(r) = tanh(r / (sqrt(2) * xi))\n  return Math.tanh(r / (1.414 * xi));\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.85, 1.0],
            "secondaryColor": [0.95, 0.35, 0.8],
            "coherenceLength": 0.85
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Polariton Fluid Particles with 7 Vortex Holes
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = 1.0 + Math.pow(Math.random(), 0.6) * 9.5;
        const theta = Math.random() * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const y = Math.sin(r * 2.0) * 0.6;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, r / 10.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const fluid = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(fluid);

      scene.userData = { group, fluid, params };""",
        "renderBody": """      data.fluid.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_cryptography_bb84_bloch_polarization",
        "title": "Quantum Key Distribution BB84 Polarization States",
        "fileName": "bb84_polarization.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "🔐 BB84 Quantum Key Distribution photon polarization conjugate basis states (|0>, |1>, |+>, |->) in Three.js! Follow @kreggsjs for daily reels! ⚛️💻\n\n#threejs #webgl #quantumcomputing #cryptography #bb84 #qkd #cybersecurity #codeart",
        "displayCode": "// BB84 Conjugate Measurement Bases: Z = {|0>, |1>}, X = {|+>, |->}\nfunction bb84Overlap(basisAlice, basisBob) {\n  return (basisAlice === basisBob) ? 1.0 : 0.5;\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.65],
            "secondaryColor": [0.95, 0.35, 0.75],
            "sphereRadius": 5.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Wireframe Poincaré / Bloch Sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(params.sphereRadius, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(sphere);

      // 4 Basis Poles: |H>, |V>, |D>, |A>
      const poles = [
        new THREE.Vector3(0, params.sphereRadius, 0),
        new THREE.Vector3(0, -params.sphereRadius, 0),
        new THREE.Vector3(params.sphereRadius, 0, 0),
        new THREE.Vector3(-params.sphereRadius, 0, 0)
      ];
      poles.forEach((p, idx) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: (idx < 2) ? c1 : c2 }));
        m.position.copy(p);
        group.add(m);
      });

      // 18,000 Polarized Photon State Particles
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[i * 3] = params.sphereRadius * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = params.sphereRadius * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = params.sphereRadius * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c1, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })));

      scene.userData = { group, sphere, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "rydberg_atom_quantum_simulator_blockade",
        "title": "Rydberg Atom Quantum Simulator & Dipole Blockade Spheres",
        "fileName": "rydberg_blockade.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Neutral atom quantum simulator: Rydberg blockade spheres preventing simultaneous double excitation via van der Waals interactions in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #rydberg #quantumcomputing #atoms #quantumsimulator #physics #codeart",
        "displayCode": "// Rydberg Blockade Radius: R_b = (C_6 / hbar * Omega)^(1/6)\nfunction rydbergBlockade(C_6, omega) {\n  return Math.pow(C_6 / omega, 1.0 / 6.0);\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.85],
            "secondaryColor": [1.0, 0.3, 0.55],
            "blockadeRadius": 3.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 3D Optical Tweezer Atom Array Grid (3x3x3)
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const atom = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            atom.position.set(x * 4.5, y * 4.5, z * 4.5);
            group.add(atom);
          }
        }
      }

      // Rydberg Blockade Sphere Shell
      const bGeo = new THREE.SphereGeometry(params.blockadeRadius, 32, 32);
      const bMat = new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.75, wireframe: true, transparent: true, opacity: 0.6 });
      const bSphere = new THREE.Mesh(bGeo, bMat);
      group.add(bSphere);

      scene.userData = { group, bSphere, params };""",
        "renderBody": """      const s = 1.0 + Math.sin(t * 2.5) * 0.25;
      data.bSphere.scale.set(s, s, s);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chiral_anomaly_weyl_semimetal_fermi_arcs",
        "title": "Weyl Semimetal Chiral Nodes & Fermi Arc Surface States",
        "fileName": "weyl_fermi_arcs.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Topological Weyl semimetal with monopoles of Berry curvature and open Fermi arc surface states in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #weylsemimetal #fermiarc #quantum #topological #physics #codeart",
        "displayCode": "// Weyl Monopole Berry Curvature Field: Omega(k) = pm k / (2 * |k|^3)\nfunction berryCurvature(k, chirality) {\n  return k.clone().multiplyScalar(chirality / (2.0 * Math.pow(k.length(), 3)));\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 1.0],
            "secondaryColor": [1.0, 0.45, 0.2],
            "nodeSep": 5.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Weyl Monopole Nodes (+1 chirality cyan, -1 chirality orange)
      const w1 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: c1 }));
      w1.position.x = -params.nodeSep * 0.5;
      const w2 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: c2 }));
      w2.position.x = params.nodeSep * 0.5;
      group.add(w1); group.add(w2);

      // Open Fermi Arc Connecting Nodes (22,000 particles)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = -params.nodeSep * 0.5 + Math.random() * params.nodeSep;
        const normU = (u + params.nodeSep * 0.5) / params.nodeSep;
        const archY = Math.sin(normU * Math.PI) * 3.5;
        const spread = (Math.random() - 0.5) * 1.4;

        pPos[i * 3] = u;
        pPos[i * 3 + 1] = archY + spread;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;

        const col = c1.clone().lerp(c2, normU);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const arcs = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(arcs);

      scene.userData = { group, arcs, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "schwinger_pair_production_extreme_laser",
        "title": "Schwinger Non-Perturbative Vacuum Pair Production",
        "fileName": "schwinger_pairs.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Critical Schwinger electric field (10^18 V/m) tearing electron-positron pairs directly out of the quantum vacuum in Three.js! Follow @kreggsjs for daily reels! 🔬💥\n\n#threejs #webgl #schwinger #lasers #quantumvacuum #electrodynamics #physics #codeart",
        "displayCode": "// Schwinger Critical Field: E_crit = m_e^2 * c^3 / (e * hbar)\nfunction schwingerRate(E, E_crit) {\n  // Gamma ~ exp(-pi * E_crit / E)\n  return Math.exp(-Math.PI * E_crit / E);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [1.0, 0.2, 0.45],
            "eField": 1.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Electron-Positron Vacuum Sparks
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const sign = (i % 2 === 0) ? 1 : -1;
        const dist = 0.5 + Math.random() * 11.0;
        const angle = Math.random() * Math.PI * 2;

        pPos[i * 3] = Math.cos(angle) * dist;
        pPos[i * 3 + 1] = sign * dist * 0.5;
        pPos[i * 3 + 2] = Math.sin(angle) * dist;

        const col = (sign > 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ dist, angle, sign, speed: 2.2 + Math.random() * 2.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const sparks = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(sparks);

      scene.userData = { group, sparks, pData, params };""",
        "renderBody": """      const pos = data.sparks.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].dist = (pData[i].dist + pData[i].speed * 0.05) % 11.0;
        pos[i * 3] = Math.cos(pData[i].angle) * pData[i].dist;
        pos[i * 3 + 1] = pData[i].sign * pData[i].dist * 0.5;
        pos[i * 3 + 2] = Math.sin(pData[i].angle) * pData[i].dist;
      }
      data.sparks.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_darwinism_pointer_state_decoherence",
        "title": "Quantum Darwinism Redundant Pointer State Decoherence",
        "fileName": "quantum_darwinism.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Quantum Darwinism: how classical reality emerges from quantum superpositions through redundant environment recording in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #quantumdarwinism #decoherence #quantum #physics #codeart",
        "displayCode": "// Quantum Darwinism Mutual Information Plateau\nfunction mutualInformation(S_S, S_E, S_SE) {\n  // I(S : E) = S(S) + S(E) - S(S, E) = H_classical\n  return S_S + S_E - S_SE;\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.85],
            "secondaryColor": [0.95, 0.4, 0.25],
            "redundancy": 48
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Quantum System S
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })));

      // Environment Observer Fragments (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = 2.5 + Math.random() * 8.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);

        const col = c1.clone().lerp(c2, (r - 2.5) / 8.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const env = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(env);

      scene.userData = { group, env, params };""",
        "renderBody": """      data.env.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
