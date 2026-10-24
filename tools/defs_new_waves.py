# tools/defs_new_waves.py
# 15 Plasmas, Fluid Vortex Dynamics & Acoustic Waves Visualizers (IDs 176-190)

DEFS_WAVES = [
    {
        "id": "kelvin_helmholtz_shear_instability",
        "title": "Oceanic & Atmospheric Kelvin-Helmholtz Shear Instability Billows",
        "fileName": "kelvin_helmholtz.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "🌊 Oceanic & atmospheric velocity shear rolling stratified fluids into breaking vortex billows in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #kelvinhelmholtz #fluiddynamics #shearwaves #oceanography #creativecoding #javascript #reels",
        "displayCode": "// Kelvin-Helmholtz Richardson Number Instability\nfunction richardsonInstability(N_bv, dU_dz) {\n  const Ri = (N_bv * N_bv) / (dU_dz * dU_dz);\n  const isUnstable = Ri < 0.25; // Miles-Howard criterion\n  return { Ri, isUnstable };\n}",
        "defaultParams": {
            "primaryColor": [0.15, 0.85, 1.0],
            "secondaryColor": [0.95, 0.45, 0.15],
            "billowParticles": 8000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.billowParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const x = -8.0 + Math.random() * 16.0;
        const z = (Math.random() - 0.5) * 6.0;
        // Periodic KH cat's eye billow curl
        const phase = x * 0.9;
        const roll = Math.sin(phase) * 1.8;
        const y = roll + (Math.random() - 0.5) * 1.5;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        const mix = (y + 3.0) / 6.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const billows = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(billows);

      scene.userData = { group, billows, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const p = data.billows.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.08;
        if (p[i] > 8.0) p[i] = -8.0;
        p[i+1] = Math.sin(p[i] * 0.9 + t * 2.5) * 1.8;
      }
      data.billows.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "karman_vortex_street_flow",
        "title": "Von Kármán Alternating Bluff Body Vortex Shedding Street",
        "fileName": "karman_vortex.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "💨 Laminar airflow creating an alternating double row of staggered Von Kármán vortices behind an obstacle in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #karmanvortex #aerodynamics #fluiddynamics #vortexshedding #creativecoding #javascript #reels",
        "displayCode": "// Von Kármán Vortex Shedding Strouhal Frequency\nfunction strouhalFrequency(U, d, St = 0.21) {\n  const sheddingFreq = (St * U) / d; // Hz\n  return sheddingFreq;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 0.85],
            "secondaryColor": [1.0, 0.35, 0.6],
            "particleCount": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Cylindrical Obstacle Cylinder
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 6.0, 24),
        new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
      );
      cyl.position.x = -6.0;
      group.add(cyl);

      // Trailing Staggered Vortices Particles
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const x = -5.0 + Math.random() * 14.0;
        const side = Math.sin(x * 1.2) > 0 ? 1 : -1;
        const y = side * 1.5 + (Math.random() - 0.5) * 1.0;
        const z = (Math.random() - 0.5) * 4.0;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const street = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(street);

      scene.userData = { group, cyl, street, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.15;
      const p = data.street.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.12;
        if (p[i] > 9.0) p[i] = -5.0;
        p[i+1] += Math.sin(p[i] * 1.5 + t * 4.0) * 0.04;
      }
      data.street.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "mach_diamond_shock_diamonds",
        "title": "Supersonic Rocket Exhaust Plume Mach Shock Diamonds",
        "fileName": "mach_diamonds.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "🚀 Over-expanded supersonic rocket exhaust creating periodic oblique shock wave reflections & Mach diamonds in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔥\n\n#threejs #webgl #machdiamonds #rocketscience #shockwaves #supersonic #propulsion #creativecoding #javascript #reels",
        "displayCode": "// Prandtl-Meyer Expansion & Shock Diamond Spacing\nfunction machDiamondSpacing(d_nozzle, M, gamma = 1.4) {\n  // Periodic cell wavelength: L = d * sqrt(M^2 - 1)\n  const cellLength = d_nozzle * Math.sqrt(Math.max(0, M * M - 1.0));\n  return cellLength;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.1],
            "secondaryColor": [0.2, 0.85, 1.0],
            "diamondCount": 6
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Rocket Nozzle Bell
      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 0.8, 2.5, 24, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
      );
      nozzle.position.x = -7.0;
      nozzle.rotation.z = Math.PI / 2;
      group.add(nozzle);

      // Periodic Diamond Shock Cones
      const diamonds = new THREE.Group();
      group.add(diamonds);
      const count = params.diamondCount;

      for (let i = 0; i < count; i++) {
        const x = -5.0 + i * 2.2;
        const dMesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.2 - i * 0.12),
          new THREE.MeshStandardMaterial({ color: (i%2===0?c1:c2), emissive: (i%2===0?c1:c2), emissiveIntensity: 0.8, wireframe: true })
        );
        dMesh.position.x = x;
        diamonds.add(dMesh);
      }

      scene.userData = { group, nozzle, diamonds, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.25;
      data.diamonds.children.forEach((d, idx) => {
        d.rotation.x = t * 2.0 + idx;
        const s = 1.0 + Math.sin(t * 8.0 + idx) * 0.12;
        d.scale.set(s, s, s);
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "solitary_rossby_planetary_wave",
        "title": "Coriolis Non-Linear Planetary Rossby Solitary Wave",
        "fileName": "rossby_wave.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "🌍 Giant planetary Rossby meanders & solitary modon vortex pairs driven by the Coriolis beta-effect in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #rossbywave #geophysicalfluid #coriolis #meteorology #mathart #creativecoding #javascript #reels",
        "displayCode": "// Planetary Rossby Wave Dispersion Relation\nfunction rossbyDispersion(k, l, beta = 2.28e-11) {\n  const omega = -(beta * k) / (k * k + l * l);\n  const phaseVelocity = omega / k; // westward propagation\n  return { omega, phaseVelocity };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.8, 1.0],
            "secondaryColor": [0.95, 0.35, 0.6],
            "gridU": 48
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 6, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridU;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const x = -7.0 + (i / n) * 14.0;
        for (let j = 0; j <= n; j++) {
          const z = -4.0 + (j / n) * 8.0;
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
      const waveMesh = new THREE.Mesh(geo, mat);
      group.add(waveMesh);

      scene.userData = { group, waveMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const pos = data.waveMesh.geometry.attributes.position;
      const n = data.params.gridU;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -7.0 + (i / n) * 14.0;
        for (let j = 0; j <= n; j++) {
          const z = -4.0 + (j / n) * 8.0;
          const y = Math.sin(x * 1.2 - t * 2.5) * Math.cos(z * 0.8) * 1.8;
          pos.setY(idx++, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 6 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "acoustic_levitation_standing_wave",
        "title": "Ultrasonic Acoustic Levitation Standing Wave Nodal Array",
        "fileName": "acoustic_levitator.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "ambient",
        "caption": "🔊 40 kHz ultrasonic standing wave acoustic radiation pressure suspending liquid droplets mid-air in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💧\n\n#threejs #webgl #acousticlevitation #soundwaves #physics #standingwave #creativecoding #javascript #reels",
        "displayCode": "// Gor'kov Acoustic Radiation Potential\nfunction gorkovPotential(p_rms, v_rms, V_particle) {\n  // U = V * [ (1/2)*f1*kappa*<p^2> - (3/4)*f2*rho*<v^2> ]\n  const acousticForce = -0.5 * V_particle * (p_rms * p_rms - v_rms * v_rms);\n  return acousticForce;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [1.0, 0.85, 0.2],
            "nodeCount": 5
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Top & Bottom Transducer Horns
      const topTrans = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 2.5, 1.5, 32), new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true }));
      topTrans.position.y = 6.0;
      group.add(topTrans);

      const botTrans = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 4.0, 1.5, 32), new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true }));
      botTrans.position.y = -6.0;
      group.add(botTrans);

      // Suspended Levitating Droplets at Nodal Planes
      const count = params.nodeCount;
      const droplets = [];
      for (let i = 0; i < count; i++) {
        const y = -3.5 + (i / (count - 1)) * 7.0;
        const drop = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.8, roughness: 0.1 })
        );
        drop.position.y = y;
        group.add(drop);
        droplets.push(drop);
      }

      scene.userData = { group, droplets, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.droplets.forEach((d, idx) => {
        // High frequency harmonic wobble
        d.position.x = Math.sin(t * 8.0 + idx) * 0.12;
        d.position.z = Math.cos(t * 7.0 + idx) * 0.12;
        const squish = 1.0 + Math.sin(t * 12.0 + idx) * 0.08;
        d.scale.set(squish, 1.0 / squish, squish);
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "faraday_wave_cymatic_patterns",
        "title": "Subharmonic Faraday Liquid Wave Cymatic Lattices",
        "fileName": "faraday_waves.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "ambient",
        "caption": "🌊 Vertically oscillated liquid fluid forming subharmonic standing Faraday waves & hexagonal cymatic lattices in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #faradaywaves #cymatics #fluiddynamics #wavemechanics #creativecoding #javascript #reels",
        "displayCode": "// Subharmonic Faraday Resonance Instability\nfunction faradaySubharmonic(f_drive, h, sigma, rho) {\n  const f_wave = f_drive / 2.0; // exact half-frequency response\n  const k = (2 * Math.PI * f_wave) / Math.sqrt(9.81 * h);\n  return { f_wave, k };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.85, 1.0],
            "secondaryColor": [0.95, 0.4, 0.75],
            "gridResolution": 50
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridResolution;
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
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const cymaticMesh = new THREE.Mesh(geo, mat);
      group.add(cymaticMesh);

      scene.userData = { group, cymaticMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      const pos = data.cymaticMesh.geometry.attributes.position;
      const n = data.params.gridResolution;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          // Hexagonal standing Faraday wave mode
          const y = (Math.cos(x * 1.5) + Math.cos(0.5*x*1.5 + Math.sqrt(3)/2*z*1.5) + Math.cos(0.5*x*1.5 - Math.sqrt(3)/2*z*1.5)) * Math.sin(t * 6.0) * 0.6;
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
        "id": "magnetohydrodynamic_alfven_waves",
        "title": "MHD Alfvén Waves Propagating Along Coronal Loops",
        "fileName": "alfven_waves.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "☀️ Magnetohydrodynamic Alfvén transverse plasma tension waves racing along solar coronal magnetic loops in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🧲\n\n#threejs #webgl #alfvenwaves #plasma #mhd #solarphysics #spacephysics #creativecoding #javascript #reels",
        "displayCode": "// Alfvén Wave Velocity in Magnetized Plasma\nfunction alfvenVelocity(B, rho) {\n  const mu0 = 4 * Math.PI * 1e-7;\n  const v_A = B / Math.sqrt(mu0 * rho);\n  return v_A; // magnetic tension wave speed\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.1],
            "secondaryColor": [0.2, 0.8, 1.0],
            "loopCount": 7
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.loopCount;
      const loops = [];

      for (let i = 0; i < count; i++) {
        const rad = 4.5 + i * 0.5;
        const pts = [];
        for (let theta = 0; theta <= Math.PI; theta += 0.08) {
          const x = Math.cos(theta) * rad;
          const y = Math.sin(theta) * rad - 2.5;
          const z = (i - count / 2) * 0.8;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({ color: (i%2===0?c1:c2), linewidth: 2 });
        const loop = new THREE.Line(lGeo, lMat);
        group.add(loop);
        loops.push(loop);
      }

      scene.userData = { group, loops, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      data.loops.forEach((l, idx) => {
        const pos = l.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const s = pos.getX(j);
          const zWave = Math.sin(s * 1.5 - t * 5.0 + idx) * 0.4;
          pos.setZ(j, (idx - data.params.loopCount / 2) * 0.8 + zWave);
        }
        pos.needsUpdate = true;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "pinch_effect_z_pinch_plasma",
        "title": "Pulsed Power Z-Pinch Magnetic Compression Implosion",
        "fileName": "z_pinch_plasma.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "⚡ 20-million-ampere magnetic Lorentz force crushing cylindrical fusion plasma into an incandescent wire in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 💥🔬\n\n#threejs #webgl #zpinch #fusion #plasmaphysics #lorentz #pulsedpower #creativecoding #javascript #reels",
        "displayCode": "// Bennett Pinch Equilibrium Relation\nfunction bennettPinch(I, N, T) {\n  const mu0 = 4 * Math.PI * 1e-7, k_B = 1.38e-23;\n  const bennettCurrent = Math.sqrt((16 * Math.PI * k_B * N * T) / mu0);\n  return bennettCurrent;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.2, 0.7],
            "particleCount": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const y = -7.0 + Math.random() * 14.0;
        const rad = 0.5 + Math.random() * 4.0;
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(theta) * rad;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(theta) * rad;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const plasma = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(plasma);

      scene.userData = { group, plasma, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      // Periodic magnetic pinch compression cycle
      const pinch = 0.25 + 0.75 * Math.pow(Math.abs(Math.sin(t * 2.5)), 3.0);
      data.plasma.scale.set(pinch, 1.0, pinch);

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "siphon_effect_capillary_torus",
        "title": "Zero-Gravity Marangoni Capillary Flow Liquid Torus",
        "fileName": "capillary_torus.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "💧 Surface tension gradients driving zero-gravity thermocapillary Marangoni flow along a liquid bridge in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌊\n\n#threejs #webgl #marangoni #zerogravity #fluiddynamics #capillary #surfacetension #creativecoding #javascript #reels",
        "displayCode": "// Marangoni Surface Tension Stress Boundary\nfunction marangoniStress(dSigma_dT, gradT) {\n  const tau_surface = dSigma_dT * gradT;\n  return tau_surface; // shear stress driving surface flow\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 0.95],
            "secondaryColor": [0.95, 0.35, 0.65],
            "streamlines": 24
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Torus Liquid Bridge Body
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(4.8, 1.6, 32, 64),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.5 })
      );
      group.add(torus);

      scene.userData = { group, torus, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.3;
      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hydraulic_jump_circular_shock",
        "title": "Circular Radial Hydraulic Shock Wave Jump",
        "fileName": "hydraulic_jump.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "🌊 Supercritical shallow laminar jet transitioning across a circular shock into turbulent deep water in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #hydraulicjump #shockwave #fluiddynamics #froude #mathart #creativecoding #javascript #reels",
        "displayCode": "// Froude Number Critical Hydraulic Transition\nfunction froudeNumber(v, h, g = 9.81) {\n  const Fr = v / Math.sqrt(g * h);\n  const isSupercritical = Fr > 1.0;\n  return { Fr, isSupercritical };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.75, 1.0],
            "secondaryColor": [0.9, 0.95, 1.0],
            "jumpRadius": 4.5
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 10, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Radial Flow Disk with Jump Step
      const geo = new THREE.RingGeometry(0.5, 8.0, 48, 20);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i);
        const r = Math.sqrt(x*x + y*y);
        const h = r < 4.2 ? -1.0 : 1.2;
        pos.setZ(i, h);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({ color: c1, wireframe: true, side: THREE.DoubleSide });
      const jumpMesh = new THREE.Mesh(geo, mat);
      jumpMesh.rotation.x = -Math.PI / 2;
      group.add(jumpMesh);

      scene.userData = { group, jumpMesh, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 10 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "taylor_couette_vortex_columns",
        "title": "Taylor-Couette Concentric Cylinder Counter-Rotating Vortex Columns",
        "fileName": "taylor_couette.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "🌀 Hydrodynamic centrifugal instability forming stacked toroidal Taylor vortex rolls between concentric cylinders in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #taylorcouette #vortexrolls #hydrodynamics #fluiddynamics #creativecoding #javascript #reels",
        "displayCode": "// Taylor Number Centrifugal Instability\nfunction taylorNumber(Omega, R1, d, nu) {\n  const Ta = (4 * Omega * Omega * Math.pow(R1, 4)) / (nu * nu * Math.pow(d, 4));\n  const isVortexFormed = Ta > 1708; // Rayleigh threshold\n  return { Ta, isVortexFormed };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.65],
            "secondaryColor": [1.0, 0.35, 0.8],
            "doughnutCount": 7
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.doughnutCount;
      const rolls = [];

      for (let i = 0; i < count; i++) {
        const y = -6.0 + (i / (count - 1)) * 12.0;
        const tGeo = new THREE.TorusGeometry(3.6, 0.65, 16, 48);
        const col = (i % 2 === 0 ? c1 : c2);
        const tMat = new THREE.MeshStandardMaterial({ color: col, wireframe: true });
        const roll = new THREE.Mesh(tGeo, tMat);
        roll.position.y = y;
        roll.rotation.x = Math.PI / 2;
        group.add(roll);
        rolls.push(roll);
      }

      scene.userData = { group, rolls, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.rolls.forEach((r, idx) => {
        const dir = (idx % 2 === 0 ? 1 : -1);
        r.rotation.z = dir * t * 1.5;
      });

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "helmholtz_resonator_vortex_puff",
        "title": "Acoustic Helmholtz Resonator Pulsed Vortex Ring Puff",
        "fileName": "helmholtz_vortex.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "fluid",
        "caption": "💨 Periodic acoustic puffs issuing self-propagating toroidal smoke vortex rings from an acoustic resonator in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #helmholtz #vortexring #acoustics #aerodynamics #creativecoding #javascript #reels",
        "displayCode": "// Helmholtz Acoustic Resonance Frequency\nfunction helmholtzFrequency(S_neck, L_neck, V_cavity, c = 343) {\n  const f_H = (c / (2 * Math.PI)) * Math.sqrt(S_neck / (L_neck * V_cavity));\n  return f_H;\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [1.0, 0.45, 0.2],
            "ringParticles": 6000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.ringParticles;
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 3.8, r = 0.9;
        pos[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
        pos[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const rings = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(rings);

      scene.userData = { group, rings, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      const p = data.rings.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i + 1] += 0.08;
        if (p[i + 1] > 4.0) p[i + 1] = -4.0;
      }
      data.rings.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bubble_sonoluminescence_implosion",
        "title": "Single-Bubble Sonoluminescence (SBSL) Plasma Flash",
        "fileName": "sonoluminescence.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "💥 Acoustic sound waves imploding a microscopic gas bubble to 20,000 Kelvin creating picosecond light flashes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #sonoluminescence #plasma #starinajar #acoustics #creativecoding #javascript #reels",
        "displayCode": "// Rayleigh-Plesset Cavitation Bubble Dynamics\nfunction rayleighPlesset(R, R_dot, P_acoustic) {\n  const R_ddot = (-1.5 * R_dot * R_dot + P_acoustic / 1000) / R;\n  return R_ddot; // violent adiabatic collapse\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.8, 1.0],
            "secondaryColor": [1.0, 0.95, 0.9],
            "flashCycles": 4
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);

      // Collapsing Cavitation Bubble
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(3.5, 32, 32),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.6 })
      );
      group.add(bubble);

      // Core Incandescent Light Flash
      const flash = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      group.add(flash);

      scene.userData = { group, bubble, flash, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      // Violent Rayleigh-Plesset collapse cycle
      const cycle = Math.sin(t * 8.0);
      const r = cycle > 0.8 ? 0.2 : (1.0 + cycle * 0.6);
      data.bubble.scale.set(r, r, r);
      data.flash.scale.set(1.0 / (r * 2), 1.0 / (r * 2), 1.0 / (r * 2));

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_bohmian_pilot_wave",
        "title": "Bohmian Quantum Mechanics Pilot Wave Guidance Field",
        "fileName": "bohmian_pilot_wave.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "quantum",
        "caption": "🌊 De Broglie-Bohm pilot wave hydrodynamics guiding quantum particle trajectories through double-slit interference in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #bohmianmechanics #pilotwave #quantumphysics #debroglie #creativecoding #javascript #reels",
        "displayCode": "// Bohmian Quantum Potential & Guidance Velocity\nfunction bohmianVelocity(psi_r, psi_i, grad_phase) {\n  const hbar = 1.054e-34, m = 9.109e-31;\n  const v = (hbar / m) * grad_phase; // deterministic particle guidance\n  return v;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 0.85],
            "secondaryColor": [0.95, 0.3, 0.7],
            "trackCount": 50
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.trackCount;
      const tracks = [];

      for (let i = 0; i < count; i++) {
        const y0 = -4.0 + (i / count) * 8.0;
        const pts = [];
        for (let x = -7.0; x <= 7.0; x += 0.25) {
          // Double slit interference ripple
          const y = y0 + Math.sin(x * 1.5) * Math.sin(y0 * 1.2) * 0.8;
          pts.push(new THREE.Vector3(x, y, 0));
        }
        const tGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const track = new THREE.Line(tGeo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.6 }));
        group.add(track);
        tracks.push(track);
      }

      scene.userData = { group, tracks, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.tracks.forEach((tr, idx) => {
        const pos = tr.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const x = pos.getX(j);
          const y0 = -4.0 + (idx / data.params.trackCount) * 8.0;
          const y = y0 + Math.sin(x * 1.5 - t * 4.0) * Math.sin(y0 * 1.2) * 0.8;
          pos.setY(j, y);
        }
        pos.needsUpdate = true;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "liquid_crystal_nematic_disclination",
        "title": "Nematic Liquid Crystal Topological Defect Disclinations",
        "fileName": "nematic_disclination.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "plasma",
        "caption": "🌀 Topological defects & +1/2 and -1/2 hedgehog disclination singular director fields in nematic liquid crystals in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💎\n\n#threejs #webgl #liquidcrystal #disclination #topologicaldefect #softmatter #creativecoding #javascript #reels",
        "displayCode": "// Frank Free Energy Nematic Director Field\nfunction nematicDirectorAngle(x, y, strength = 0.5) {\n  const theta = strength * Math.atan2(y, x);\n  return { nx: Math.cos(theta), ny: Math.sin(theta) };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.8, 0.15],
            "secondaryColor": [0.2, 0.75, 1.0],
            "gridStep": 18
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridStep;
      const directors = new THREE.Group();
      group.add(directors);

      for (let i = -n; i <= n; i += 2) {
        for (let j = -n; j <= n; j += 2) {
          const x = i * 0.45, y = j * 0.45;
          const theta = 0.5 * Math.atan2(y, x); // +1/2 defect
          const dGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
          const dMesh = new THREE.Mesh(dGeo, new THREE.MeshBasicMaterial({ color: c1 }));
          dMesh.position.set(x, y, 0);
          dMesh.rotation.z = theta;
          directors.add(dMesh);
        }
      }

      scene.userData = { group, directors, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.2;
      data.directors.children.forEach((d, idx) => {
        d.rotation.z += 0.02;
      });

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    }
]
