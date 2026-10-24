# tools/defs_new_cyber.py
# 10 Cyber-Architectures, Holographic Optics & Synthetic Worlds Visualizers (IDs 191-200)

DEFS_CYBER = [
    {
        "id": "quantum_annealing_spin_glass",
        "title": "Quantum Annealing Ising Spin Glass Flux Lattice",
        "fileName": "quantum_annealing.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "⚡ D-Wave quantum annealing superconducting flux qubits tunneling through energetic barriers into global ground state in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬⚛️\n\n#threejs #webgl #quantumannealing #isingmodel #qubits #spinglass #cyberpunk #creativecoding #javascript #reels",
        "displayCode": "// Transverse Ising Model Quantum Hamiltonian\nfunction isingHamiltonian(spins, J_couplings, Gamma_t) {\n  let energy = 0;\n  for (let i = 0; i < spins.length; i++) {\n    energy += -Gamma_t * Math.cos(spins[i]);\n  }\n  return energy; // adiabatic quantum annealing path\n}",
        "defaultParams": {
            "primaryColor": [0.1, 0.95, 0.85],
            "secondaryColor": [0.95, 0.2, 0.55],
            "gridSize": 12
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.gridSize;
      const spins = [];

      for (let x = -n/2; x < n/2; x++) {
        for (let y = -n/2; y < n/2; y++) {
          const sMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8),
            new THREE.MeshBasicMaterial({ color: (Math.random() > 0.5 ? c1 : c2) })
          );
          sMesh.position.set(x * 1.1, y * 1.1, 0);
          group.add(sMesh);
          spins.push(sMesh);
        }
      }

      scene.userData = { group, spins, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;
      // Quantum tunneling stochastic spin flips
      data.spins.forEach((s, idx) => {
        if (Math.sin(t * 12.0 + idx) > 0.85) {
          s.rotation.x = Math.PI;
        } else {
          s.rotation.x = 0;
        }
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "neural_radiance_field_nerf_voxels",
        "title": "5D Volumetric Neural Radiance Field (NeRF) Density Voxels",
        "fileName": "nerf_voxels.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🌐 Raymarching continuous volumetric 5D Neural Radiance Fields (NeRF) synthesizing view-dependent radiance in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🤖\n\n#threejs #webgl #nerf #neuralradiance #computervision #ai #creativecoding #javascript #reels",
        "displayCode": "// NeRF Volume Rendering Integral\nfunction nerfRaymarch(sigma, color, deltaT) {\n  const transmittance = Math.exp(-sigma * deltaT);\n  const alpha = 1.0 - transmittance;\n  return { alpha, rgb: color.multiplyScalar(alpha) };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.8, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2],
            "voxelCount": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.voxelCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 11.0;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 11.0;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 11.0;

        const mix = (pos[i * 3] + 5.5) / 11.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const voxels = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(voxels);

      scene.userData = { group, voxels, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "diffraction_grating_airy_disk",
        "title": "Fraunhofer Wave Optics Circular Aperture Airy Disk Pattern",
        "fileName": "airy_disk.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "ambient",
        "caption": "🌈 Concentric Bessel optical wave diffraction rings and central central Airy disk diffraction limit in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #airydisk #diffraction #waveoptics #fourier #physics #creativecoding #javascript #reels",
        "displayCode": "// Fraunhofer Circular Aperture Airy Pattern\nfunction airyIntensity(theta, k = 1.0, a = 2.0) {\n  const x = k * a * Math.sin(theta);\n  if (Math.abs(x) < 1e-4) return 1.0;\n  // J1(x) first order Bessel function approximation\n  const J1 = (Math.sin(x) / (x * x)) - (Math.cos(x) / x);\n  const I = Math.pow((2 * J1) / x, 2);\n  return I;\n}",
        "defaultParams": {
            "primaryColor": [0.15, 0.95, 0.75],
            "secondaryColor": [1.0, 0.4, 0.8],
            "rings": 10
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const rings = new THREE.Group();
      group.add(rings);

      for (let r = 1; r <= params.rings; r++) {
        const rad = r * 0.75;
        const rGeo = new THREE.RingGeometry(rad - 0.06, rad + 0.06, 64);
        const col = (r % 2 === 0 ? c1 : c2);
        const rMesh = new THREE.Mesh(rGeo, new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide }));
        rings.add(rMesh);
      }

      scene.userData = { group, rings, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.4;
      data.group.rotation.y = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_computing_surface_code",
        "title": "Surface Code Quantum Error Correction Stabilizer Plaquettes",
        "fileName": "surface_code.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "💎 Fault-tolerant 2D surface code quantum error correction stabilizer lattice measuring Pauli X and Z syndrome plaquettes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💻\n\n#threejs #webgl #surfacecode #quantumcomputing #errorcorrection #qubits #cyberpunk #creativecoding #javascript #reels",
        "displayCode": "// Surface Code Stabilizer Syndrome Check\nfunction measureStabilizers(plaquetteType, qubits) {\n  // X-plaquette measures product of Pauli X, Z-plaquette measures Pauli Z\n  const syndrome = qubits.reduce((acc, q) => acc * q, 1);\n  return { syndrome, hasError: syndrome < 0 };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 0.45],
            "secondaryColor": [0.95, 0.35, 0.7],
            "gridSize": 8
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.gridSize;
      const plaquettes = new THREE.Group();
      group.add(plaquettes);

      for (let x = -n/2; x < n/2; x++) {
        for (let y = -n/2; y < n/2; y++) {
          const isXType = (x + y) % 2 === 0;
          const pMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1.2, 1.2),
            new THREE.MeshStandardMaterial({
              color: isXType ? c1 : c2, emissive: isXType ? c1 : c2, emissiveIntensity: 0.4, wireframe: true, side: THREE.DoubleSide
            })
          );
          pMesh.position.set(x * 1.4, y * 1.4, 0);
          plaquettes.add(pMesh);
        }
      }

      scene.userData = { group, plaquettes, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "moire_quantum_superlattice",
        "title": "Magic-Angle Twisted Bilayer Graphene Moir\u00e9 Superlattice",
        "fileName": "moire_superlattice.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "quantum",
        "caption": "🌀 Magic-angle 1.1 degree twist between bilayer graphene sheets generating flat electronic bands & unconventional superconductivity in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💎\n\n#threejs #webgl #moiresuperlattice #graphene #magicangle #quantum #physics #creativecoding #javascript #reels",
        "displayCode": "// Moir\u00e9 Interference Superlattice Periodicity\nfunction moireWavelength(a0 = 0.246, theta_rad = 0.0192) {\n  // L_M = a0 / (2 * sin(theta / 2))\n  const lambda_M = a0 / (2.0 * Math.sin(theta_rad / 2.0)); // ~13.4 nm\n  return lambda_M;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [1.0, 0.45, 0.2],
            "gridDensity": 28
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Sheet 1 Grid
      const g1 = new THREE.GridHelper(12, params.gridDensity, c1, c1);
      g1.rotation.x = Math.PI / 2;
      g1.position.z = 0.3;
      group.add(g1);

      // Sheet 2 Twisted Grid
      const g2 = new THREE.GridHelper(12, params.gridDensity, c2, c2);
      g2.rotation.x = Math.PI / 2;
      g2.position.z = -0.3;
      group.add(g2);

      scene.userData = { group, g1, g2, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.15;
      // Slight angular twist oscillation creating breathing moire patterns
      data.g2.rotation.z = Math.sin(t * 0.4) * 0.12;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "photonic_topological_laser_array",
        "title": "Topological Insulator Micro-Laser Array Edge Soliton",
        "fileName": "topological_laser.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "💡 Robust single-mode topological laser array immune to scattering and fabrication defects in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #topologicallaser #laserarray #optics #photonics #quantum #creativecoding #javascript #reels",
        "displayCode": "// Non-Hermitian Topological Laser Resonance\nfunction topologicalLaserMode(gamma_gain, kappa_coupling) {\n  const thresholdLasing = gamma_gain > kappa_coupling;\n  return { thresholdLasing };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.2, 0.4],
            "secondaryColor": [0.2, 0.85, 1.0],
            "arraySize": 6
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.arraySize;
      const lasers = new THREE.Group();
      group.add(lasers);

      for (let x = -n; x <= n; x += 2) {
        for (let y = -n; y <= n; y += 2) {
          const isEdge = Math.abs(x) === n || Math.abs(y) === n;
          const lMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 4.0, 16),
            new THREE.MeshStandardMaterial({
              color: isEdge ? c1 : 0x1e293b,
              emissive: isEdge ? c1 : 0x000000,
              emissiveIntensity: isEdge ? 0.9 : 0.0,
              wireframe: true
            })
          );
          lMesh.position.set(x * 1.2, y * 1.2, 0);
          lasers.add(lMesh);
        }
      }

      scene.userData = { group, lasers, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cyber_voronoi_crystalline_hive",
        "title": "3D Lloyd-Relaxed Neon Voronoi Crystalline Hive",
        "fileName": "voronoi_hive.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "⚡ 3D Lloyd-relaxed Voronoi cellular partitions glowing with pulsating cybernetic neon energy conduits in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 💎🏙️\n\n#threejs #webgl #voronoi #computationalgeometry #cyberpunk #neon #creativecoding #javascript #reels",
        "displayCode": "// 3D Voronoi Distance Partitioning\nfunction voronoiCell(p, seeds) {\n  let minDist = Infinity, nearestSeed = null;\n  for (let s of seeds) {\n    const d = p.distanceTo(s);\n    if (d < minDist) { minDist = d; nearestSeed = s; }\n  }\n  return { nearestSeed, minDist };\n}",
        "defaultParams": {
            "primaryColor": [0.1, 0.95, 0.85],
            "secondaryColor": [0.95, 0.2, 0.65],
            "cellCount": 40
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.cellCount;
      const cells = [];

      for (let i = 0; i < count; i++) {
        const rad = 2.0 + Math.random() * 5.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2.0 * Math.random() - 1.0);
        const cMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(1.1 + Math.random() * 0.8),
          new THREE.MeshStandardMaterial({
            color: (i % 2 === 0 ? c1 : c2), wireframe: true, transparent: true, opacity: 0.65
          })
        );
        cMesh.position.set(rad * Math.sin(ph) * Math.cos(th), rad * Math.cos(ph), rad * Math.sin(ph) * Math.sin(th));
        group.add(cMesh);
        cells.push(cMesh);
      }

      scene.userData = { group, cells, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;
      data.cells.forEach((c, idx) => {
        c.rotation.y = t * 0.5 + idx;
        const p = 1.0 + Math.sin(t * 4.0 + idx) * 0.1;
        c.scale.set(p, p, p);
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "gravitational_wave_interferometer_ligo",
        "title": "LIGO Michelson Interferometer Spacetime Strain Ripple",
        "fileName": "ligo_interferometer.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "quantum",
        "caption": "🌌 Quadrupole gravitational spacetime ripples stretching and squeezing 4-kilometer laser interferometer arms in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔭\n\n#threejs #webgl #ligo #gravitationalwaves #einstein #relativity #optics #creativecoding #javascript #reels",
        "displayCode": "// Gravitational Wave Metric Strain Perturbation\nfunction spacetimeStrain(h_plus, h_cross, theta) {\n  const deltaL_x = 0.5 * h_plus * 4000; // meters\n  const deltaL_y = -0.5 * h_plus * 4000;\n  return { deltaL_x, deltaL_y };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.3, 0.2],
            "secondaryColor": [0.2, 0.85, 1.0],
            "armLength": 10.0
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Orthogonal 4km Laser Arms
      const armX = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 14, 16),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.8 })
      );
      armX.rotation.z = Math.PI / 2;
      armX.position.x = 7.0;
      group.add(armX);

      const armY = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 14, 16),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.8 })
      );
      armY.position.z = 7.0;
      armY.rotation.x = Math.PI / 2;
      group.add(armY);

      // Central Beamsplitter
      const bs = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 0.2),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
      );
      bs.rotation.y = Math.PI / 4;
      group.add(bs);

      group.rotation.x = 0.6;

      scene.userData = { group, armX, armY, bs, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      // Gravitational wave quadrupole strain stretch and squeeze
      const strain = Math.sin(t * 8.0) * 0.2;
      data.armX.scale.set(1.0, 1.0 + strain, 1.0);
      data.armY.scale.set(1.0, 1.0 - strain, 1.0);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hyper_dimensional_clifford_algebra",
        "title": "Geometric Clifford Algebra Spacetime Multivector Rotor",
        "fileName": "clifford_algebra.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "sacred",
        "caption": "🔮 Spacetime multivector Cl(3,1) blades spinning bivector planes & pseudo-scalars in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #cliffordalgebra #geometriccalculus #bivector #rotor #mathart #creativecoding #javascript #reels",
        "displayCode": "// Clifford Geometric Product of Vectors\nfunction geometricProduct(u, v) {\n  const dot = u.dot(v); // scalar grade-0\n  const wedge = new THREE.Vector3().crossVectors(u, v); // bivector grade-2\n  return { scalar: dot, bivector: wedge };\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.8, 1.0],
            "secondaryColor": [0.95, 0.2, 0.6],
            "planeCount": 16
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.planeCount;
      const planes = [];

      for (let i = 0; i < count; i++) {
        const phi = (i / count) * Math.PI;
        const pMesh = new THREE.Mesh(
          new THREE.RingGeometry(1.5, 4.8, 32),
          new THREE.MeshStandardMaterial({
            color: (i % 2 === 0 ? c1 : c2), wireframe: true, side: THREE.DoubleSide, transparent: true, opacity: 0.6
          })
        );
        pMesh.rotation.x = phi;
        pMesh.rotation.y = phi * 0.5;
        group.add(pMesh);
        planes.push(pMesh);
      }

      scene.userData = { group, planes, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.planes.forEach((p, idx) => {
        p.rotation.z = t * 0.5 + idx * 0.2;
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "holographic_black_hole_ads_cft",
        "title": "AdS/CFT Holographic Duality Bulk Spacetime Boundary",
        "fileName": "ads_cft_duality.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cosmic",
        "caption": "🌌 Quantum entanglement on the conformal boundary encoding bulk anti-de Sitter gravity & black hole thermodynamics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #adscft #holography #stringtheory #blackhole #quantumgravity #creativecoding #javascript #reels",
        "displayCode": "// Ryu-Takayanagi Holographic Entanglement Entropy\nfunction ryuTakayanagiEntropy(minimalArea_gamma, G_N = 1) {\n  // S_A = Area(gamma_A) / (4 * G_N)\n  const entropy = minimalArea_gamma / (4.0 * G_N);\n  return entropy;\n}",
        "defaultParams": {
            "primaryColor": [0.65, 0.2, 0.95],
            "secondaryColor": [0.2, 0.9, 1.0],
            "bulkLayers": 10
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Concentric AdS Radial Hyperbolic Shells
      const layers = params.bulkLayers;
      const shells = [];

      for (let i = 1; i <= layers; i++) {
        const rad = i * 0.65;
        const sMesh = new THREE.Mesh(
          new THREE.SphereGeometry(rad, 24, 24),
          new THREE.MeshStandardMaterial({
            color: (i === layers ? c2 : c1), wireframe: true, transparent: true, opacity: (i === layers ? 0.9 : 0.3)
          })
        );
        group.add(sMesh);
        shells.push(sMesh);
      }

      // Minimal Ryu-Takayanagi Geodesic Ribbon
      const rpts = [];
      for (let th = -Math.PI/2; th <= Math.PI/2; th += 0.1) {
        const rad = 6.5 * Math.cos(th);
        rpts.push(new THREE.Vector3(rad * Math.sin(th), 0, rad * Math.cos(th)));
      }
      const rGeo = new THREE.BufferGeometry().setFromPoints(rpts);
      const rtRibbon = new THREE.Line(rGeo, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
      group.add(rtRibbon);

      scene.userData = { group, shells, rtRibbon, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    }
]
