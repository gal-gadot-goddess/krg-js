# tools/defs_new_quantum.py
# 15 Quantum Optics, Photonic Crystals & Particle Physics Visualizers (IDs 131-145)

DEFS_QUANTUM = [
    {
        "id": "chiral_photonic_metamaterial",
        "title": "Chiral Photonic Metamaterial Negative Index Light Bending",
        "fileName": "chiral_metamaterial.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "🔮 Artificial electromagnetic chiral metamaterial helices reversing Snell's law with negative refractive index in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #metamaterials #optics #physics #negativeindex #quantum #creativecoding #javascript #reels",
        "displayCode": "// Negative Refractive Index Dispersion Relation\nfunction negativeIndexDrude(omega, omega_p) {\n  const epsilon = 1.0 - (omega_p * omega_p) / (omega * omega);\n  const mu = 1.0 - (omega_p * omega_p) / (omega * omega);\n  const n = (epsilon < 0 && mu < 0) ? -Math.sqrt(epsilon * mu) : Math.sqrt(epsilon * mu);\n  return { epsilon, mu, n };\n}",
        "defaultParams": {
            "primaryColor": [0.1, 0.95, 0.85],
            "secondaryColor": [1.0, 0.25, 0.65],
            "helixCount": 16
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.helixCount;
      const helices = [];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const rad = 4.5;
        const pts = [];
        for (let t = -6; t <= 6; t += 0.15) {
          const hx = Math.cos(t * 2.5) * 0.9;
          const hy = t * 1.0;
          const hz = Math.sin(t * 2.5) * 0.9;
          pts.push(new THREE.Vector3(hx, hy, hz));
        }
        const hGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const col = (i % 2 === 0 ? c1 : c2);
        const hMat = new THREE.LineBasicMaterial({ color: col, linewidth: 2 });
        const helix = new THREE.Line(hGeo, hMat);
        helix.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
        group.add(helix);
        helices.push(helix);
      }

      scene.userData = { group, helices, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.helices.forEach((h, idx) => {
        h.rotation.y = t * 1.2 + idx * 0.2;
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_hall_chiral_edge_states",
        "title": "Quantum Hall Effect Dissipationless Chiral Edge States",
        "fileName": "quantum_hall_edge.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Quantized Hall conductance & 1D ballistic chiral edge channels protected by topological Chern numbers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬💎\n\n#threejs #webgl #quantumhall #topologicalinsulator #chernnumber #condensedmatter #creativecoding #javascript #reels",
        "displayCode": "// Quantized Hall Conductance & Landau Level Filling\nfunction hallConductance(nu, B) {\n  const e = 1.602e-19, h = 6.626e-34;\n  const sigma_xy = nu * (e * e / h); // exact integer quantization\n  const magneticLength = Math.sqrt((h / (2 * Math.PI * e * B)));\n  return { sigma_xy, magneticLength };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.8, 1.0],
            "secondaryColor": [1.0, 0.4, 0.2],
            "electronCount": 6000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 2D Electron Gas Boundary Slab
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(11, 0.4, 11),
        new THREE.MeshStandardMaterial({ color: 0x060c18, wireframe: true })
      );
      group.add(slab);

      // Circulating Chiral Edge Electrons
      const count = params.electronCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // Distribute along perimeter
        const side = i % 4;
        const progress = Math.random();
        let x = 0, z = 0;
        if (side === 0) { x = -5.0 + progress * 10.0; z = -5.0; }
        else if (side === 1) { x = 5.0; z = -5.0 + progress * 10.0; }
        else if (side === 2) { x = 5.0 - progress * 10.0; z = 5.0; }
        else { x = -5.0; z = 5.0 - progress * 10.0; }

        pos[i * 3] = x;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        pos[i * 3 + 2] = z;

        const col = (side % 2 === 0 ? c1 : c2);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const edgePoints = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(edgePoints);

      group.rotation.x = 0.5;

      scene.userData = { group, slab, edgePoints, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const p = data.edgePoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Move counter-clockwise along boundary
        if (p[i+2] <= -4.9 && p[i] < 5.0) p[i] += 0.12;
        else if (p[i] >= 4.9 && p[i+2] < 5.0) p[i+2] += 0.12;
        else if (p[i+2] >= 4.9 && p[i] > -5.0) p[i] -= 0.12;
        else if (p[i] <= -4.9 && p[i+2] > -5.0) p[i+2] -= 0.12;
      }
      data.edgePoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "josephson_junction_fluxon_vortex",
        "title": "Superconducting Josephson Junction Quantum Fluxon Soliton",
        "fileName": "josephson_fluxon.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Magnetic flux quantum phi_0 moving as a topological sine-Gordon soliton across a Josephson tunneling junction in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬⚛️\n\n#threejs #webgl #superconductivity #josephson #fluxon #soliton #quantum #creativecoding #javascript #reels",
        "displayCode": "// Sine-Gordon Soliton Phase Kink\nfunction sineGordonKink(x, t, v = 0.7) {\n  const gamma = 1.0 / Math.sqrt(1.0 - v * v);\n  const phi = 4.0 * Math.atan(Math.exp(gamma * (x - v * t)));\n  return phi; // 2*PI topological phase jump\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.7],
            "secondaryColor": [0.95, 0.3, 0.9],
            "gridPoints": 80
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 5, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Twin Superconducting Electrodes
      const el1 = new THREE.Mesh(
        new THREE.BoxGeometry(12, 0.3, 3.5),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.35, wireframe: true })
      );
      el1.position.y = 1.5;
      group.add(el1);

      const el2 = new THREE.Mesh(
        new THREE.BoxGeometry(12, 0.3, 3.5),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.35, wireframe: true })
      );
      el2.position.y = -1.5;
      group.add(el2);

      // Tunneling Fluxon Vortex Soliton Waveform
      const pts = [];
      const n = params.gridPoints;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        const phi = 4.0 * Math.atan(Math.exp(x * 1.5));
        const y = Math.sin(phi) * 1.4;
        pts.push(new THREE.Vector3(x, y, 0));
      }
      const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const sMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2.5 });
      const solitonLine = new THREE.Line(sGeo, sMat);
      group.add(solitonLine);

      scene.userData = { group, el1, el2, solitonLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      const pos = data.solitonLine.geometry.attributes.position;
      const n = data.params.gridPoints;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        const phaseShift = x - Math.sin(t * 2.0) * 4.0;
        const phi = 4.0 * Math.atan(Math.exp(phaseShift * 1.5));
        pos.setY(i, Math.sin(phi) * 1.4);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 5 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "optomechanical_optical_tweezer",
        "title": "Dual-Beam Laser Optical Cavity Tweezer Trapping",
        "fileName": "optical_tweezer.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "🔬 Laser gradient radiation pressure optical tweezers trapping and cooling levitated dielectric nanoparticles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #opticaltweezers #lasertrapping #nanotechnology #quantumoptics #creativecoding #javascript #reels",
        "displayCode": "// Optical Dipole Gradient Force\nfunction opticalGradientForce(I, gradI, alpha_p) {\n  // F_grad = (1/2) * alpha_p * grad(E^2)\n  const force = 0.5 * alpha_p * gradI;\n  return force; // directed towards highest intensity focal point\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.2, 0.2],
            "secondaryColor": [0.2, 0.9, 1.0],
            "trapStiffness": 2.5
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Laser Gaussian Beam Focus Cones
      const cone1 = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 8.0, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.5 })
      );
      cone1.position.y = 4.0;
      group.add(cone1);

      const cone2 = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 8.0, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.5 })
      );
      cone2.position.y = -4.0;
      cone2.rotation.x = Math.PI;
      group.add(cone2);

      // Trapped Levitated Nanoparticle
      const nano = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.8, roughness: 0.2 })
      );
      group.add(nano);

      // Trapped Brownian Motion Track Points
      const tCount = 800;
      const tPos = new Float32Array(tCount * 3);
      const trackGeo = new THREE.BufferGeometry();
      trackGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      const track = new THREE.Points(trackGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));
      group.add(track);

      scene.userData = { group, nano, track, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      // Brownian oscillation in harmonic optical potential
      const ox = Math.sin(t * 12.0) * 0.25 + Math.cos(t * 8.5) * 0.15;
      const oy = Math.cos(t * 14.0) * 0.2 + Math.sin(t * 9.2) * 0.12;
      const oz = Math.sin(t * 11.0) * 0.2;
      data.nano.position.set(ox, oy, oz);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "majorana_fermion_braiding",
        "title": "Topological Majorana Zero-Mode Quantum Braiding",
        "fileName": "majorana_braiding.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Non-Abelian anyons & Majorana zero-mode topological quantum gate braiding along semiconductor nanowires in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬⚛️\n\n#threejs #webgl #majorana #quantumcomputing #anyons #braiding #topologicalquantum #creativecoding #javascript #reels",
        "displayCode": "// Non-Abelian Majorana Braid Matrix Exchange\nfunction majoranaBraidOperator(gamma_1, gamma_2) {\n  // U = exp((PI / 4) * gamma_1 * gamma_2) = (1 + gamma_1 * gamma_2) / sqrt(2)\n  const phaseShift = Math.PI / 4;\n  return { phaseShift, isNonAbelian: true };\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.8, 0.1],
            "secondaryColor": [0.2, 0.85, 1.0],
            "wireCount": 4
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // T-junction Nanowire Grid
      const wGroup = new THREE.Group();
      group.add(wGroup);

      const wGeo1 = new THREE.CylinderGeometry(0.2, 0.2, 12, 16);
      const wMat = new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true });
      const w1 = new THREE.Mesh(wGeo1, wMat);
      w1.rotation.z = Math.PI / 2;
      wGroup.add(w1);

      const w2 = new THREE.Mesh(wGeo1, wMat);
      wGroup.add(w2);

      // Majorana Zero Modes (Glowing Bound States)
      const modes = [];
      for (let i = 0; i < 4; i++) {
        const mMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshStandardMaterial({ color: (i % 2 === 0 ? c1 : c2), emissive: (i % 2 === 0 ? c1 : c2), emissiveIntensity: 0.9 })
        );
        group.add(mMesh);
        modes.push(mMesh);
      }

      scene.userData = { group, modes, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      // Braiding exchange trajectory
      const theta = t * 1.5;
      data.modes[0].position.set(Math.cos(theta) * 4.5, Math.sin(theta) * 4.5, 0);
      data.modes[1].position.set(-Math.cos(theta) * 4.5, -Math.sin(theta) * 4.5, 0);
      data.modes[2].position.set(0, 0, Math.sin(t * 1.2) * 4.5);
      data.modes[3].position.set(0, 0, -Math.sin(t * 1.2) * 4.5);

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "higgs_field_symmetry_breaking",
        "title": "Higgs Field Mexican Hat Spontaneous Symmetry Breaking",
        "fileName": "higgs_symmetry.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Spontaneous electroweak symmetry breaking in the Mexican hat scalar Higgs potential giving mass to elementary particles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #higgs #symmetrybreaking #particlephysics #standardmodel #creativecoding #javascript #reels",
        "displayCode": "// Higgs Field Goldstone & Radial Potential\nfunction higgsPotential(phi_r, lambda = 0.25, v = 3.5) {\n  // V(phi) = -mu^2 * |phi|^2 + lambda * |phi|^4\n  const V = lambda * Math.pow(phi_r * phi_r - v * v, 2);\n  return V;\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.7, 0.1],
            "secondaryColor": [0.2, 0.6, 1.0],
            "resolution": 45
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.resolution;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const r = (i / n) * 5.5;
        for (let j = 0; j <= n; j++) {
          const theta = (j / n) * Math.PI * 2;
          // Mexican hat potential: V = lambda * (r^2 - v^2)^2
          const v = 3.0;
          const V = 0.12 * Math.pow(r*r - v*v, 2) - 3.0;
          pts.push(r * Math.cos(theta), V, r * Math.sin(theta));
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.35, wireframe: true, side: THREE.DoubleSide
      });
      const hatMesh = new THREE.Mesh(geo, mat);
      group.add(hatMesh);

      // Rolling Higgs Boson Particle in minimum valley
      const boson = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 24, 24),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.9 })
      );
      group.add(boson);

      scene.userData = { group, hatMesh, boson, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      // Vacuum expectation value goldstone rotation
      const ang = t * 1.8;
      data.boson.position.set(Math.cos(ang) * 3.0, -3.0, Math.sin(ang) * 3.0);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "synchrotron_radiation_undulator",
        "title": "Relativistic Electron Undulator Synchrotron X-Ray Beam",
        "fileName": "synchrotron_undulator.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚡ Relativistic electrons wiggling through periodic magnetic arrays emitting coherent synchrotron X-rays in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬💫\n\n#threejs #webgl #synchrotron #undulator #xray #acceleratorphysics #creativecoding #javascript #reels",
        "displayCode": "// Undulator Fundamental Wavelength Emission\nfunction undulatorWavelength(lambda_u, gamma, K, theta = 0) {\n  // lambda = (lambda_u / (2 * gamma^2)) * (1 + K^2 / 2 + gamma^2 * theta^2)\n  const harmonic = (lambda_u / (2 * gamma * gamma)) * (1 + (K * K) / 2);\n  return harmonic;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2],
            "poleCount": 24
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Alternating Magnetic Poles Array
      const poles = new THREE.Group();
      group.add(poles);
      const count = params.poleCount;

      for (let i = 0; i < count; i++) {
        const x = -8.0 + (i / count) * 16.0;
        const pTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 1.5), new THREE.MeshBasicMaterial({ color: (i%2===0?0xef4444:0x3b82f6) }));
        pTop.position.set(x, 2.0, 0);
        poles.add(pTop);

        const pBot = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 1.5), new THREE.MeshBasicMaterial({ color: (i%2===0?0x3b82f6:0xef4444) }));
        pBot.position.set(x, -2.0, 0);
        poles.add(pBot);
      }

      // Wiggling Sinusoidal Electron Trajectory
      const pts = [];
      for (let x = -8.0; x <= 8.0; x += 0.1) {
        pts.push(new THREE.Vector3(x, Math.sin(x * 3.5) * 0.6, 0));
      }
      const ePath = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: c2, linewidth: 2.5 })
      );
      group.add(ePath);

      // Emitted X-Ray Photons Cone
      const xCount = 2000;
      const xPos = new Float32Array(xCount * 3);
      for (let i = 0; i < xCount; i++) {
        const x = 2.0 + Math.random() * 8.0;
        const rad = (x * 0.1) * Math.sqrt(Math.random());
        const th = Math.random() * Math.PI * 2;
        xPos[i * 3] = x;
        xPos[i * 3 + 1] = Math.cos(th) * rad;
        xPos[i * 3 + 2] = Math.sin(th) * rad;
      }
      const xGeo = new THREE.BufferGeometry();
      xGeo.setAttribute('position', new THREE.BufferAttribute(xPos, 3));
      const xRays = new THREE.Points(xGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(xRays);

      scene.userData = { group, ePath, xRays, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;

      const p = data.xRays.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.35;
        if (p[i] > 11.0) p[i] = 1.0;
      }
      data.xRays.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bloch_sphere_quantum_state_vector",
        "title": "Bloch Sphere Qubit Quantum State Precession",
        "fileName": "bloch_sphere.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Pure qubit quantum state vector undergoing Rabi oscillations and Larmor precession on the Bloch Sphere in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #blochsphere #qubit #quantumcomputing #rabi #creativecoding #javascript #reels",
        "displayCode": "// Qubit Superposition State Vector |psi>\nfunction blochStateVector(theta, phi) {\n  // |psi> = cos(theta/2)|0> + exp(i*phi)*sin(theta/2)|1>\n  const x = Math.sin(theta) * Math.cos(phi);\n  const y = Math.sin(theta) * Math.sin(phi);\n  const z = Math.cos(theta);\n  return new THREE.Vector3(x * 5.0, z * 5.0, y * 5.0);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [1.0, 0.3, 0.6],
            "sphereRadius": 5.0
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Wireframe Bloch Sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(params.sphereRadius, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.4 })
      );
      group.add(sphere);

      // Coordinate Axes
      const axes = new THREE.AxesHelper(6.5);
      group.add(axes);

      // State Vector Arrow (Line + Cone Head)
      const arrowGeo = new THREE.CylinderGeometry(0.12, 0.12, params.sphereRadius, 16);
      arrowGeo.translate(0, params.sphereRadius / 2, 0);
      const stateArrow = new THREE.Mesh(arrowGeo, new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.8 }));
      group.add(stateArrow);

      // Quantum Precession Trace
      const trCount = 600;
      const trPos = new Float32Array(trCount * 3);
      const trGeo = new THREE.BufferGeometry();
      trGeo.setAttribute('position', new THREE.BufferAttribute(trPos, 3));
      const trace = new THREE.Line(trGeo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.7 }));
      group.add(trace);

      scene.userData = { group, stateArrow, trace, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      // Precession angles
      const theta = 0.8 + Math.sin(t * 1.5) * 0.5; // Rabi nutation
      const phi = t * 2.5; // Larmor precession

      data.stateArrow.rotation.z = Math.sin(phi) * theta;
      data.stateArrow.rotation.x = Math.cos(phi) * theta;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "optical_soliton_supercontinuum",
        "title": "Non-Linear Kerr Optical Soliton Supercontinuum Rainbow",
        "fileName": "optical_soliton.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "🌈 Non-linear optical Kerr self-phase modulation compressing laser pulses into ultra-broadband rainbow supercontinuum in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #supercontinuum #laser #soliton #nonlinearlight #optics #creativecoding #javascript #reels",
        "displayCode": "// Non-Linear Schrödinger Equation (NLSE) Soliton\nfunction opticalSoliton(t, z, beta2 = -1, gamma = 1) {\n  const amplitude = 1.0 / Math.cosh(t);\n  const phase = 0.5 * gamma * z;\n  return { amplitude, phase };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.2, 0.8],
            "secondaryColor": [0.1, 0.9, 1.0],
            "ribbonWidth": 40
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 5, 22);

      const group = new THREE.Group();
      scene.add(group);

      const count = 30;
      const ribbons = [];

      for (let i = 0; i < count; i++) {
        const pts = [];
        const color = new THREE.Color().setHSL(i / count, 0.95, 0.55);
        for (let x = -7.0; x <= 7.0; x += 0.25) {
          const sech = 1.0 / Math.cosh(x * 0.8);
          const y = sech * 3.5 * Math.sin(x * 2.0 + i * 0.2);
          const z = (i - count / 2) * 0.25;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const rMat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
        const ribbon = new THREE.Line(rGeo, rMat);
        group.add(ribbon);
        ribbons.push(ribbon);
      }

      scene.userData = { group, ribbons, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.ribbons.forEach((r, idx) => {
        const pos = r.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const x = pos.getX(j);
          const sech = 1.0 / Math.cosh(x * 0.8);
          const y = sech * 3.5 * Math.sin(x * 2.0 + idx * 0.2 + t * 4.0);
          pos.setY(j, y);
        }
        pos.needsUpdate = true;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 5 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "polariton_condensate_fluid",
        "title": "Exciton-Polariton Quantum Fluid Superfluidity",
        "fileName": "polariton_condensate.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "💧 Light-matter hybrid exciton-polariton quantum fluid flowing with zero friction around microscopic defects in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #polariton #superfluid #boseeinstein #quantumphysics #creativecoding #javascript #reels",
        "displayCode": "// Gross-Pitaevskii Exciton-Polariton Wavefunction\nfunction polaritonWavefunction(x, y, t) {\n  const density = Math.sin(x * 0.8 + t) * Math.cos(y * 0.8 + t);\n  const phase = Math.atan2(Math.sin(x), Math.cos(y));\n  return { density, phase };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.7, 1.0],
            "secondaryColor": [0.95, 0.4, 0.85],
            "gridSize": 45
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridSize;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          pts.push(x, 0, z);
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const fluidMesh = new THREE.Mesh(geo, mat);
      group.add(fluidMesh);

      scene.userData = { group, fluidMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const pos = data.fluidMesh.geometry.attributes.position;
      const n = data.params.gridSize;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          const r = Math.sqrt(x*x + z*z);
          const y = Math.sin(r * 1.8 - t * 3.5) * Math.cos(Math.atan2(z, x) * 3 + t) * 1.2;
          pos.setY(idx++, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "electron_spin_resonance_precession",
        "title": "Electron Spin Resonance (ESR) Zeeman Larmor Precession",
        "fileName": "electron_spin_resonance.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "⚛️ Electron magnetic dipole moment undergoing Zeeman splitting & GHz microwave resonance precession in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #esr #electronspin #quantum #zeeman #resonance #creativecoding #javascript #reels",
        "displayCode": "// Electron Spin Zeeman Energy Splitting\nfunction zeemanSplitting(B0, g_e = 2.002319) {\n  const mu_B = 9.274e-24; // Bohr magneton\n  const deltaE = g_e * mu_B * B0;\n  const larmorFrequency = (g_e * mu_B * B0) / 6.626e-34;\n  return { deltaE, larmorFrequency };\n}",
        "defaultParams": {
            "primaryColor": [0.1, 0.95, 0.5],
            "secondaryColor": [0.95, 0.2, 0.4],
            "spinPoints": 4000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Static Magnetic Field Vectors (Vertical Arrows)
      const bFields = new THREE.Group();
      group.add(bFields);
      for (let x = -4; x <= 4; x += 2) {
        for (let z = -4; z <= 4; z += 2) {
          const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, -3, z), 6, 0x334155, 0.6, 0.3);
          bFields.add(arrow);
        }
      }

      // Precessing Electron Wavecloud Points
      const count = params.spinPoints;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const rad = 2.5 * Math.pow(Math.random(), 0.5);
        pos[i * 3] = rad * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = rad * Math.cos(v);
        pos[i * 3 + 2] = rad * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const spinCloud = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(spinCloud);

      scene.userData = { group, spinCloud, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      // Precession around B field axis
      data.spinCloud.rotation.z = Math.sin(t * 3.0) * 0.45;
      data.spinCloud.rotation.y = t * 2.5;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cherenkov_radiation_cone",
        "title": "Relativistic Cherenkov Luminescence Shock Cone",
        "fileName": "cherenkov_radiation.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "💙 Charged relativistic particles traveling faster than the phase velocity of light in water radiating eerie Cherenkov blue photons in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌊\n\n#threejs #webgl #cherenkov #nuclearphysics #relativity #quantum #creativecoding #javascript #reels",
        "displayCode": "// Cherenkov Emission Angle Equation\nfunction cherenkovAngle(beta, n = 1.33) {\n  // cos(theta_c) = 1 / (n * beta)\n  const threshold = 1.0 / (n * beta);\n  if (threshold > 1.0) return 0; // sub-threshold, no emission\n  return Math.acos(threshold);\n}",
        "defaultParams": {
            "primaryColor": [0.1, 0.6, 1.0],
            "secondaryColor": [0.8, 0.95, 1.0],
            "particleCount": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Mach-Cherenkov Photonic Shock Cone
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(5.2, 12, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.6 })
      );
      cone.rotation.z = Math.PI / 2;
      group.add(cone);

      // Fast Relativistic Blue Photons
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const x = -6.0 + Math.random() * 12.0;
        const rad = (x + 6.0) * 0.42 * Math.sqrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = x;
        pos[i * 3 + 1] = Math.cos(theta) * rad;
        pos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const photons = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c2, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(photons);

      scene.userData = { group, cone, photons, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      const p = data.photons.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.25;
        if (p[i] > 6.0) p[i] = -6.0;
      }
      data.photons.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "photonic_crystal_bandgap_resonator",
        "title": "2D Honeycomb Photonic Crystal Complete Bandgap Cavity",
        "fileName": "photonic_bandgap.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "💎 Complete optical photonic bandgap microcavity trapping single-mode laser photons in a honeycomb dielectric slab in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #photoniccrystal #bandgap #optics #nanophotonics #creativecoding #javascript #reels",
        "displayCode": "// Photonic Crystal Maxwell Eigenmode Helmholtz\nfunction helmholtzEigenmode(k, a) {\n  const braggReflect = Math.sin(k * a) / (k * a);\n  const inBandgap = Math.abs(braggReflect) > 1.0;\n  return { braggReflect, inBandgap };\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.25, 0.6],
            "secondaryColor": [0.2, 0.9, 1.0],
            "hexGrid": 8
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.hexGrid;
      const pillars = new THREE.Group();
      group.add(pillars);

      for (let q = -n; q <= n; q++) {
        for (let r = -n; r <= n; r++) {
          if (Math.abs(q + r) <= n) {
            // Defect cavity at center
            if (q === 0 && r === 0) continue;
            const x = 1.1 * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
            const z = 1.1 * (3/2 * r);
            const pMesh = new THREE.Mesh(
              new THREE.CylinderGeometry(0.35, 0.35, 3.0, 16),
              new THREE.MeshStandardMaterial({ color: c1, wireframe: true })
            );
            pMesh.position.set(x, 0, z);
            pillars.add(pMesh);
          }
        }
      }

      // Trapped Cavity Light Mode
      const cavityLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 24, 24),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 1.2 })
      );
      group.add(cavityLight);

      scene.userData = { group, pillars, cavityLight, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.2;
      const pulse = 0.9 + Math.sin(t * 6.0) * 0.25;
      data.cavityLight.scale.set(pulse, pulse, pulse);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "muon_magnetic_dipole_anomaly",
        "title": "Muon g-2 Relativistic Anomalous Magnetic Precession",
        "fileName": "muon_g2.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "🔬 Subatomic muon particles orbiting in a uniform magnetic storage ring precessing with anomalous magnetic moment g-2 in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡⚛️\n\n#threejs #webgl #muong2 #particlephysics #fermilab #standardmodel #creativecoding #javascript #reels",
        "displayCode": "// Muon Anomalous Magnetic Moment g-2 Precession\nfunction muonPrecessionFrequency(B, a_mu = 0.00116592) {\n  const q = 1.602e-19, m_mu = 1.883e-28;\n  const omega_a = a_mu * (q * B / m_mu); // anomalous precession\n  return omega_a;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.4, 0.1],
            "secondaryColor": [0.2, 0.8, 1.0],
            "ringRadius": 6.0
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Storage Ring Torus
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(params.ringRadius, 0.45, 24, 80),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true })
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Orbiting Muon Particle Cluster
      const mCount = 1500;
      const mPos = new Float32Array(mCount * 3);
      for (let i = 0; i < mCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = params.ringRadius + (Math.random() - 0.5) * 0.6;
        mPos[i * 3] = Math.cos(theta) * rad;
        mPos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        mPos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      const mGeo = new THREE.BufferGeometry();
      mGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
      const muons = new THREE.Points(mGeo, new THREE.PointsMaterial({ color: c1, size: 0.16, blending: THREE.AdditiveBlending }));
      group.add(muons);

      scene.userData = { group, ring, muons, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.muons.rotation.y = t * 3.0;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_quantum_zeno_effect",
        "title": "Quantum Zeno Effect Frequent Measurement State Freezing",
        "fileName": "quantum_zeno.js",
        "category": "Quantum Mechanics & Biotech",
        "genre": "quantum",
        "caption": "👁️ A quantum state frozen in mid-transition by rapid continuous projective measurements (A watched pot never boils!) in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #zenoeffect #quantummeasurement #superposition #physics #creativecoding #javascript #reels",
        "displayCode": "// Quantum Zeno Survival Probability\nfunction zenoSurvival(N, t, tau_Z = 1.0) {\n  // P_N(t) = (1 - (t / N*tau_Z)^2)^N -> 1 as N -> infinity\n  const deltaT = t / N;\n  const survivalProb = Math.pow(1 - (deltaT / tau_Z) * (deltaT / tau_Z), N);\n  return survivalProb;\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.9],
            "secondaryColor": [0.95, 0.25, 0.6],
            "cloudCount": 5000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Collapsing & Freezing Quantum Wavepacket
      const count = params.cloudCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 3.5 * Math.pow(Math.random(), 0.5);
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.cos(v);
        pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const wavepacket = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(wavepacket);

      // Measurement Detector Grid Cage
      const cage = new THREE.Mesh(
        new THREE.BoxGeometry(7, 7, 7),
        new THREE.MeshStandardMaterial({ color: c2, wireframe: true, transparent: true, opacity: 0.5 })
      );
      group.add(cage);

      scene.userData = { group, wavepacket, cage, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.cage.rotation.z = Math.sin(t * 0.25) * 0.3;
      // High frequency measurement snap
      const snap = (Math.sin(t * 18.0) > 0.8) ? 0.85 : 1.0;
      data.wavepacket.scale.set(snap, snap, snap);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    }
]
