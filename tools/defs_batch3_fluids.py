# tools/defs_batch3_fluids.py
# 15 Fluid Dynamics & Plasma Shockwaves 3D Visualizers (Batch 3: IDs 276-290)

DEFS_FLUIDS_3 = [
    {
        "id": "tokamak_magnetic_reconnection_plasma_island",
        "title": "Tokamak Magnetic Reconnection & Tearing Mode Island",
        "fileName": "tokamak_reconnection.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "⚡ Fusion reactor plasma physics: Magnetic flux reconnection forming tearing mode magnetic islands in a tokamak torus in Three.js! Follow @kreggsjs! 🔬🔥\n\n#threejs #webgl #tokamak #fusion #plasma #magneticreconnection #physics #codeart",
        "displayCode": "// Sweet-Parker Magnetic Reconnection Rate\nfunction reconnectionRate(S_lundquist) {\n  // v_rec / v_A ~ S^(-1/2)\n  return 1.0 / Math.sqrt(S_lundquist);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 1.0],
            "secondaryColor": [1.0, 0.35, 0.25],
            "torusRadius": 6.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Tokamak Vacuum Vessel Shell
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(params.torusRadius, 2.5, 32, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(torus);

      // 24,000 Reconnecting Plasma Island Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = params.torusRadius;
        const rTube = 2.0;

        pPos[i * 3] = (R + rTube * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = rTube * Math.sin(v);
        pPos[i * 3 + 2] = (R + rTube * Math.cos(v)) * Math.sin(u);

        const col = c1.clone().lerp(c2, (Math.sin(u * 4.0) + 1.0) * 0.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ u, v, speed: 2.2 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const plasma = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(plasma);

      scene.userData = { group, plasma, pData, params };""",
        "renderBody": """      data.plasma.rotation.z = t * 0.55;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "richtmyer_meshkov_shock_interface_instability",
        "title": "Richtmyer-Meshkov Shock Wave Interface Instability Spikes",
        "fileName": "richtmyer_meshkov.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "💥 Shockwave-driven vorticity generation: Richtmyer-Meshkov baroclinic instability growing spikes and bubble fingers in Three.js! Follow @kreggsjs! 🔬🔥\n\n#threejs #webgl #fluidmechanics #shockwave #richtmyermeshkov #turbulence #codeart",
        "displayCode": "// Baroclinic Vorticity Generation: d(omega)/dt = (grad(rho) x grad(P)) / rho^2\nfunction baroclinicTorque(gradRho, gradP, rho) {\n  return gradRho.clone().cross(gradP).multiplyScalar(1.0 / (rho * rho));\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.2],
            "secondaryColor": [0.25, 0.9, 1.0],
            "amplitude": 3.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Richtmyer-Meshkov Bubble & Spike Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * 16.0;
        const z = (Math.random() - 0.5) * 16.0;
        const kx = x * 0.8;
        const kz = z * 0.8;
        const y = Math.sin(kx) * Math.cos(kz) * params.amplitude + (Math.random() - 0.5) * 0.8;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + params.amplitude) / (2 * params.amplitude));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, z, kx, kz });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const spikes = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(spikes);

      scene.userData = { group, spikes, pData, params };""",
        "renderBody": """      const pos = data.spikes.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        pos[i * 3 + 1] = Math.sin(it.kx + t * 2.0) * Math.cos(it.kz + t * 1.5) * 3.8;
      }
      data.spikes.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "von_karman_coherent_swirling_wake_vorticity",
        "title": "Von Kármán Coherent Vortex Street & Swirling Wake",
        "fileName": "von_karman_wake.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🌊 Periodic Strouhal shedding: alternating clockwise and counter-clockwise swirling vortices past a cylinder in Three.js! Follow @kreggsjs for daily reels! 🌀✨\n\n#threejs #webgl #vonkarman #vortexstreet #fluidmechanics #cfd #aerodynamics #codeart",
        "displayCode": "// Strouhal Shedding Frequency: f_s = St * U / D\nfunction strouhalFrequency(U, D, St) {\n  return (St * U) / D;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.75],
            "strouhal": 0.21
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Obstacle Cylinder
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 10.0, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
      cyl.position.x = -6.5;
      group.add(cyl);

      // 24,000 Swirling Wake Vortex Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = -5.0 + Math.random() * 16.0;
        const sign = (Math.sin(x * 0.8) > 0) ? 1 : -1;
        const vortexY = sign * (1.8 + (x + 5.0) * 0.15);
        const y = vortexY + (Math.random() - 0.5) * 1.8;
        const z = (Math.random() - 0.5) * 8.0;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = (sign > 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, y, z, speed: 2.5 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const wake = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(wake);

      scene.userData = { group, wake, pData, params };""",
        "renderBody": """      const pos = data.wake.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].x += pData[i].speed * 0.05;
        if (pData[i].x > 11.0) pData[i].x = -5.0;
        pos[i * 3] = pData[i].x;
      }
      data.wake.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "taylor_green_decaying_turbulence_energy_cascade",
        "title": "Taylor-Green Vortex Decaying Turbulence Energy Cascade",
        "fileName": "taylor_green_vortex.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🌀 Kolmogorov -5/3 energy cascade: Taylor-Green vortex sheet stretching, roll-up and turbulent dissipation in Three.js! Follow @kreggsjs for daily reels! 🌊✨\n\n#threejs #webgl #turbulence #taylorgreen #fluidmechanics #cfd #navierstokes #codeart",
        "displayCode": "// Taylor-Green Analytical Initial Velocity Field\nfunction taylorGreen(x, y, z, V0) {\n  return {\n    u: V0 * Math.sin(x) * Math.cos(y) * Math.cos(z),\n    v: -V0 * Math.cos(x) * Math.sin(y) * Math.cos(z),\n    w: 0\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.9, 1.0],
            "secondaryColor": [1.0, 0.45, 0.25],
            "reynolds": 1600.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Turbulent Vortex Filament Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * Math.PI * 2.5;
        const y = (Math.random() - 0.5) * Math.PI * 2.5;
        const z = (Math.random() - 0.5) * Math.PI * 2.5;

        pPos[i * 3] = x * 2.2;
        pPos[i * 3 + 1] = y * 2.2;
        pPos[i * 3 + 2] = z * 2.2;

        const vort = Math.abs(Math.sin(x) * Math.sin(y));
        const col = c1.clone().lerp(c2, vort);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const turbulence = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(turbulence);

      scene.userData = { group, turbulence, params };""",
        "renderBody": """      data.turbulence.rotation.x = t * 0.35;
      data.turbulence.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "mhd_blast_wave_magnetic_shock_front",
        "title": "Magnetohydrodynamic (MHD) Blast Wave Shock Front",
        "fileName": "mhd_blast_wave.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "💥 Super-Alfvénic explosion expanding into a magnetized plasma medium: non-spherical MHD blast wave shock in Three.js! Follow @kreggsjs for daily reels! ⚡🔥\n\n#threejs #webgl #plasma #mhd #shockwave #astrophysics #physics #codeart",
        "displayCode": "// Fast Magnetosonic Shock Speed: v_fast^2 = 1/2 * (c_s^2 + v_A^2 + sqrt(...))\nfunction fastMagnetosonic(c_s, v_A, theta) {\n  const sum = c_s*c_s + v_A*v_A;\n  return Math.sqrt(0.5 * (sum + Math.sqrt(sum*sum - 4*c_s*c_s*v_A*v_A*Math.pow(Math.cos(theta), 2))));\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.15],
            "secondaryColor": [0.25, 0.9, 1.0],
            "blastRadius": 7.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Anisotropic MHD Blast Particles (Prolate along B-field)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = (5.5 + Math.cos(phi) * 2.5) * (0.8 + Math.random() * 0.4);

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.cos(phi) * 1.35; // stretched along B (y-axis)
        pPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

        const col = c1.clone().lerp(c2, Math.abs(Math.cos(phi)));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const blast = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(blast);

      scene.userData = { group, blast, params };""",
        "renderBody": """      data.blast.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "supercritical_fluid_opalescence_cluster",
        "title": "Supercritical Fluid Critical Opalescence & Density Clusters",
        "fileName": "critical_opalescence.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🧪 Critical point phase transition: liquid-gas distinction vanishes into giant optical opalescence density fluctuations in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #supercritical #thermodynamics #opalescence #physics #codeart",
        "displayCode": "// Ornstein-Zernike Critical Density Correlation Function\nfunction criticalCorrelation(r, xi) {\n  // G(r) ~ (1 / r) * exp(-r / xi)\n  return (1.0 / r) * Math.exp(-r / xi);\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.8],
            "secondaryColor": [0.95, 0.35, 0.75],
            "correlationLength": 2.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Giant Density Fluctuation Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = Math.pow(Math.random(), 0.6) * 7.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);

        const col = c1.clone().lerp(c2, r / 7.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const opalescence = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(opalescence);

      scene.userData = { group, opalescence, params };""",
        "renderBody": """      data.opalescence.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cavitation_bubble_collapse_water_hammer_jet",
        "title": "Ultrasonic Cavitation Collapse & Water-Hammer Microjet",
        "fileName": "cavitation_microjet.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "💥 Rayleigh-Plesset cavitation bubble collapse forming a high-speed supersonic water-hammer microjet in Three.js! Follow @kreggsjs for daily reels! 🌊⚡\n\n#threejs #webgl #cavitation #fluidmechanics #acoustics #microjet #physics #codeart",
        "displayCode": "// Rayleigh-Plesset Cavitation Collapse Equation\nfunction rayleighPlesset(R, R_dot, P_inf, P_v) {\n  // R * R_ddot + 3/2 * R_dot^2 = (P_v - P_inf) / rho\n  return ((P_v - P_inf) / 1000.0 - 1.5 * R_dot * R_dot) / R;\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 1.0],
            "secondaryColor": [1.0, 0.4, 0.25],
            "jetVelocity": 8.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Collapsing Bubble Toroid Shell
      const bubble = new THREE.Mesh(
        new THREE.TorusGeometry(3.5, 1.2, 24, 64),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(bubble);

      // Central Supersonic Microjet (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const y = -7.0 + (i / pCount) * 14.0;
        const rad = 0.5 + Math.pow(Math.abs(y) / 7.0, 2) * 1.5;
        const th = Math.random() * Math.PI * 2;
        pPos[i * 3] = Math.cos(th) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(th) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, bubble, params };""",
        "renderBody": """      const s = 1.0 + Math.sin(t * 3.5) * 0.3;
      data.bubble.scale.set(s, s, s);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "prandtl_meyer_supersonic_expansion_fan",
        "title": "Prandtl-Meyer Supersonic Expansion Fan & Mach Waves",
        "fileName": "prandtl_meyer_fan.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "✈️ Aerodynamics of supersonic flight: Prandtl-Meyer isentropic expansion fan turning gas around a convex corner in Three.js! Follow @kreggsjs for daily reels! ⚡🌬️\n\n#threejs #webgl #supersonic #aerodynamics #prandtlmeyer #mach #fluidmechanics #codeart",
        "displayCode": "// Prandtl-Meyer Expansion Function nu(M)\nfunction prandtlMeyer(M, gamma) {\n  const g1 = Math.sqrt((gamma + 1.0) / (gamma - 1.0));\n  return g1 * Math.atan(Math.sqrt((gamma - 1.0) / (gamma + 1.0) * (M*M - 1.0))) - Math.atan(Math.sqrt(M*M - 1.0));\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.65],
            "cornerAngle": 0.45
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 Supersonic Mach Wave Expansion Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = 1.5 + Math.random() * 12.0;
        const angle = -0.6 + Math.random() * 1.8;

        pPos[i * 3] = Math.cos(angle) * r - 4.0;
        pPos[i * 3 + 1] = Math.sin(angle) * r;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 6.0;

        const col = c1.clone().lerp(c2, (angle + 0.6) / 1.8);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const fan = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(fan);

      scene.userData = { group, fan, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "atmospheric_gravity_wave_kelvin_wake",
        "title": "Atmospheric Internal Gravity Waves & Mountain Kelvin Wake",
        "fileName": "gravity_wave_wake.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🏔️ Buoyancy-driven internal gravity waves rippling through stratified atmosphere behind a mountain peak in Three.js! Follow @kreggsjs for daily reels! ☁️✨\n\n#threejs #webgl #gravitywaves #meteorology #fluidmechanics #atmospheric #codeart",
        "displayCode": "// Brunt-Väisälä Buoyancy Frequency: N^2 = (g / theta) * (d_theta / dz)\nfunction gravityWavePhase(kx, kz, N) {\n  // omega = N * kx / sqrt(kx^2 + kz^2)\n  return (N * kx) / Math.sqrt(kx*kx + kz*kz);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.75],
            "secondaryColor": [0.95, 0.35, 0.85],
            "wavenumber": 1.4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Mountain Obstacle Cone
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(2.0, 4.0, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
      mtn.position.set(-7.0, -2.0, 0);
      group.add(mtn);

      // 22,000 V-Shaped Kelvin Wake Wave Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const x = -5.0 + Math.random() * 16.0;
        const z = (Math.random() - 0.5) * (x + 6.0) * 0.9;
        const y = Math.sin((x + 5.0) * 1.5) * Math.cos(z * 0.8) * 1.8;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + 1.8) / 3.6);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const wake = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(wake);

      scene.userData = { group, wake, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "standing_acoustofluidic_radiation_trap",
        "title": "Standing Acoustofluidic Radiation Force Particle Trapping",
        "fileName": "acoustofluidic_trap.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🔊 Acoustic radiation force trapping microparticles in pressure nodal planes of a standing acoustic ultrasound wave in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #acoustofluidics #ultrasound #microfluidics #physics #codeart",
        "displayCode": "// Gor'kov Acoustic Radiation Force Potential\nfunction gorkovPotential(p_in, v_in, V_p) {\n  // U = V_p * [ f1 * <p^2> / (2*rho*c^2) - 3/4 * f2 * rho * <v^2> ]\n  return V_p * (p_in * p_in - v_in * v_in);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.45, 0.2],
            "nodePlanes": 5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 5 Pressure Nodal Wireframe Planes
      for (let i = -2; i <= 2; i++) {
        const pl = new THREE.Mesh(
          new THREE.PlaneGeometry(12.0, 12.0, 8, 8),
          new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.25 })
        );
        pl.position.y = i * 2.8;
        pl.rotation.x = Math.PI / 2;
        group.add(pl);
      }

      // 22,000 Trapped Acoustic Levitation Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const nodeIdx = Math.floor(Math.random() * 5) - 2;
        const targetY = nodeIdx * 2.8;
        pPos[i * 3] = (Math.random() - 0.5) * 11.0;
        pPos[i * 3 + 1] = targetY + (Math.random() - 0.5) * 0.4;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 11.0;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "ferrofluid_rosensweig_normal_field_spikes",
        "title": "Ferrofluid Rosensweig Normal-Field Instability Spikes",
        "fileName": "ferrofluid_rosensweig.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🧲 Superparamagnetic liquid forming self-organizing Rosensweig conical spike arrays in magnetic fields in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #ferrofluid #magnetism #rosensweig #physics #fluiddynamics #codeart",
        "displayCode": "// Rosensweig Critical Magnetic Field Threshold\nfunction rosensweigCriticalField(rho, g, gamma, mu) {\n  // H_crit^2 = 2 * (1 + 1/mu_r) * sqrt(rho * g * gamma)\n  return Math.sqrt(2.0 * Math.sqrt(rho * g * gamma));\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.9, 1.0],
            "secondaryColor": [0.95, 0.35, 0.85],
            "spikeCount": 19
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Hexagonal Spikes
      const cones = [];
      for (let i = 0; i < params.spikeCount; i++) {
        const u = (i / params.spikeCount) * Math.PI * 2;
        const r = (i === 0) ? 0 : 2.5 + (i % 2) * 2.2;
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(0.8, 4.2, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true })
        );
        cone.position.set(Math.cos(u) * r, 0, Math.sin(u) * r);
        group.add(cone);
        cones.push(cone);
      }

      scene.userData = { group, cones, params };""",
        "renderBody": """      data.cones.forEach((c, idx) => {
        const s = 1.0 + Math.sin(t * 3.0 + idx * 0.4) * 0.25;
        c.scale.set(1.0, s, 1.0);
      });
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 1.0, 0);"""
    },
    {
        "id": "leidenfrost_droplet_star_oscillation",
        "title": "Leidenfrost Vapor Cushion & Droplet Star-Mode Oscillations",
        "fileName": "leidenfrost_star.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "💧 Droplet levitating friction-free on its own insulating vapor cushion vibrating in standing azimuthal star modes in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #leidenfrost #fluiddynamics #physics #droplet #codeart",
        "displayCode": "// Rayleigh Droplet Surface Tension Oscillation Frequency\nfunction dropletFreq(n, sigma, rho, R) {\n  // omega_n^2 = n*(n-1)*(n+2) * sigma / (rho * R^3)\n  return Math.sqrt(n * (n - 1) * (n + 2) * (sigma / (rho * Math.pow(R, 3))));\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.85],
            "secondaryColor": [0.95, 0.4, 0.25],
            "starModes": 5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Star-shaped vibrating droplet (22,000 points)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const baseR = 4.5 + Math.cos(params.starModes * th) * 1.2;

        pPos[i * 3] = baseR * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = baseR * Math.cos(ph) * 0.6; // flattened droplet
        pPos[i * 3 + 2] = baseR * Math.sin(ph) * Math.sin(th);

        const col = c1.clone().lerp(c2, (baseR - 3.3) / 2.4);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ th, ph });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const droplet = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(droplet);

      scene.userData = { group, droplet, pData, params };""",
        "renderBody": """      const pos = data.droplet.geometry.attributes.position.array;
      const pData = data.pData;
      const modeAmp = Math.sin(t * 4.0) * 1.4;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const r = 4.5 + Math.cos(params.starModes * it.th) * modeAmp;
        pos[i * 3] = r * Math.sin(it.ph) * Math.cos(it.th);
        pos[i * 3 + 1] = r * Math.cos(it.ph) * 0.6;
        pos[i * 3 + 2] = r * Math.sin(it.ph) * Math.sin(it.th);
      }
      data.droplet.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "saffman_taylor_viscous_fingering_interface",
        "title": "Saffman-Taylor Viscous Fingering Instability Tree",
        "fileName": "saffman_taylor_tree.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🌲 Less viscous fluid displacing more viscous fluid in a Hele-Shaw cell: Saffman-Taylor fractal viscous fingering in Three.js! Follow @kreggsjs for daily reels! 🌊✨\n\n#threejs #webgl #viscousfingering #saffmantaylor #fractal #fluiddynamics #codeart",
        "displayCode": "// Saffman-Taylor Finger Width Selection: lambda -> 1/2\nfunction fingerWidth(Ca) {\n  // As capillary number Ca -> infty, lambda -> 0.5\n  return 0.5 + 0.5 / (1.0 + Math.pow(Ca, 0.66));\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.75],
            "fingers": 8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 Viscous Finger Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const fingerR = 3.5 + Math.pow(Math.sin(th * params.fingers * 0.5), 2) * 4.5;
        const r = Math.random() * fingerR;

        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
        pPos[i * 3 + 2] = Math.sin(th) * r;

        const col = c1.clone().lerp(c2, r / 8.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const fingers = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(fingers);

      scene.userData = { group, fingers, params };""",
        "renderBody": """      data.fingers.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "marangoni_surface_tension_convection_cells",
        "title": "Marangoni Thermal Surface Tension Convection Hexagons",
        "fileName": "marangoni_convection.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🍯 Thermocapillary Marangoni effect: surface tension gradients driving hexagonal Bénard convection cells in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #marangoni #surfacetension #convection #fluidmechanics #codeart",
        "displayCode": "// Marangoni Number: Ma = - (d_gamma/dT) * Delta_T * L / (rho * nu * alpha)\nfunction marangoniStress(dGamma_dT, gradT) {\n  return -dGamma_dT * gradT;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.2],
            "secondaryColor": [0.25, 0.85, 1.0],
            "cells": 7
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 Hexagonal Bénard Marangoni Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 14.0;
        const v = (Math.random() - 0.5) * 14.0;
        const hex = Math.cos(u) + Math.cos(0.5*u + 0.866*v) + Math.cos(0.5*u - 0.866*v);
        const y = hex * 0.8;

        pPos[i * 3] = u; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = v;

        const col = c1.clone().lerp(c2, (hex + 1.5) / 3.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const cells = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(cells);

      scene.userData = { group, cells, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "oblique_shock_reflection_mach_stem",
        "title": "Supersonic Oblique Shock Reflection & Mach Stem Foot",
        "fileName": "mach_stem_reflection.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "✈️ Supersonic gas dynamics: transition from regular oblique shock reflection to irregular Mach reflection with triple point in Three.js! Follow @kreggsjs for daily reels! ⚡🌬️\n\n#threejs #webgl #obliqueshock #machstem #aerodynamics #supersonic #codeart",
        "displayCode": "// Rankine-Hugoniot Oblique Shock Theta-Beta-Mach Relation\nfunction thetaBetaMach(M, beta, gamma) {\n  const num = 2.0 * (1.0 / Math.tan(beta)) * (M*M * Math.pow(Math.sin(beta), 2) - 1.0);\n  const den = M*M * (gamma + Math.cos(2.0 * beta)) + 2.0;\n  return Math.atan(num / den);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.85, 0.25],
            "secondaryColor": [0.35, 0.85, 1.0],
            "mach": 2.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Reflecting Wall Solid Plane
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(16.0, 16.0, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 })
      );
      wall.rotation.x = -Math.PI / 2;
      wall.position.y = -3.5;
      group.add(wall);

      // 22,000 Mach Stem Shock Wave Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const x = -7.0 + Math.random() * 14.0;
        const z = (Math.random() - 0.5) * 8.0;
        const shockSlope = 0.55;
        const y = -3.5 + Math.abs(x) * shockSlope + (Math.random() - 0.5) * 0.8;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + 3.5) / 7.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const shock = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(shock);

      scene.userData = { group, shock, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
