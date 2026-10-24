# tools/defs_batch3_cosmos.py
# 15 Exotic Astrophysics & Cosmic Phenomena 3D Visualizers (Batch 3: IDs 201-215)

DEFS_COSMOS_3 = [
    {
        "id": "pulsar_magnetosphere_polar_cap",
        "title": "Relativistic Pulsar Magnetosphere & Light Cylinder Beam",
        "fileName": "pulsar_magnetosphere.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "⚡ Relativistic Pulsar Magnetosphere with sweeping synchrotron light-cylinder beams and magnetic dipoles in Three.js! Follow @kreggsjs for daily 3D code reels! 🌌🔭\n\n#threejs #webgl #pulsar #neutronstar #astrophysics #relativity #creativecoding #codeart",
        "displayCode": "// Pulsar Light Cylinder Radius R_LC = c / Omega\nfunction lightCylinder(c, omega) {\n  return c / omega;\n}\n// Synchrotron Dipole Magnetic Flux Line\nconst r_mag = R_LC * Math.pow(Math.sin(theta), 2.0);",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 1.0],
            "secondaryColor": [0.95, 0.25, 0.85],
            "rotationPeriod": 0.033,
            "dipoleTilt": 0.45
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Neutron star solid core with glowing atmosphere
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(1.8, 48, 48),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      group.add(core);

      // Light Cylinder boundary wireframe
      const cylGeo = new THREE.CylinderGeometry(8.5, 8.5, 18.0, 48, 1, true);
      const cylMat = new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.35 });
      const lightCyl = new THREE.Mesh(cylGeo, cylMat);
      group.add(lightCyl);

      // Dipole field closed loops & synchrotron plasma (22,000 particles)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const theta = (Math.random() - 0.5) * Math.PI * 0.92;
        const phi = Math.random() * Math.PI * 2;
        const L = 2.2 + Math.random() * 6.5; // L-shell parameter
        const r = L * Math.pow(Math.cos(theta), 2);
        const x = r * Math.cos(theta) * Math.cos(phi);
        const y = r * Math.sin(theta);
        const z = r * Math.cos(theta) * Math.sin(phi);

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
        const mix = (r - 2.0) / 6.5;
        const col = c1.clone().lerp(c2, mix);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ theta, phi, L, speed: 1.5 + Math.random() * 2.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const plasma = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(plasma);

      // Dual Relativistic Polar Lighthouse Beams
      const beamGeo = new THREE.ConeGeometry(3.5, 24.0, 32, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, wireframe: true, blending: THREE.AdditiveBlending });
      const beamNorth = new THREE.Mesh(beamGeo, beamMat);
      beamNorth.position.y = 12.0;
      const beamSouth = new THREE.Mesh(beamGeo, beamMat);
      beamSouth.position.y = -12.0;
      beamSouth.rotation.x = Math.PI;

      const beamRig = new THREE.Group();
      beamRig.add(beamNorth); beamRig.add(beamSouth);
      beamRig.rotation.z = params.dipoleTilt;
      group.add(beamRig);

      scene.userData = { group, beamRig, plasma, pData, params };""",
        "renderBody": """      data.beamRig.rotation.y = t * 6.5;
      data.group.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.3) * 22;
      camera.position.z = Math.cos(t * 0.3) * 22;
      camera.position.y = 6 + Math.sin(t * 0.25) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "supermassive_quasar_relativistic_inflow",
        "title": "Supermassive Quasar Accretion Inflow & High-Z Radiative Torrent",
        "fileName": "quasar_inflow.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🔥 Supermassive Quasar with billion-solar-mass gravitational accretion inflow & radiative feedback in Three.js! Follow @kreggsjs for daily 3D code reels! 🌌⚡\n\n#threejs #webgl #quasar #blackhole #astrophysics #cosmos #creativecoding #javascript",
        "displayCode": "// Quasar Eddington Luminosity Limit\nfunction eddingtonLuminosity(M) {\n  // L_Edd = 4 * pi * G * M * m_p * c / sigma_T\n  return 1.26e38 * (M / 1.989e30);\n}\nconst r_isco = 6.0 * G * M / (c * c);",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.15],
            "secondaryColor": [0.2, 0.85, 1.0],
            "eddingtonRatio": 1.4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central supermassive singularity
      const smbh = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 48), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      group.add(smbh);

      // Quasar inward spiral accretion torrent (25,000 particles)
      const pCount = 25000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const r = 2.4 + Math.pow(u, 2.0) * 14.0;
        const angle = Math.random() * Math.PI * 2;
        const z = (Math.random() - 0.5) * (r * 0.3);

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = z;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const normR = (r - 2.4) / 14.0;
        const col = (normR < 0.3) ? new THREE.Color(1.0, 1.0, 1.0).lerp(c1, normR * 3) : c1.clone().lerp(c2, (normR - 0.3) / 0.7);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 2.2 / Math.pow(r, 0.75), z });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const torrent = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(torrent);

      scene.userData = { group, torrent, pData, params };""",
        "renderBody": """      const pos = data.torrent.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        it.angle += it.speed * 0.04;
        it.r -= 0.025;
        if (it.r < 2.4) it.r = 16.0;
        pos[i * 3] = Math.cos(it.angle) * it.r;
        pos[i * 3 + 2] = Math.sin(it.angle) * it.r;
      }
      data.torrent.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 7 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cosmic_reionization_bubble_network",
        "title": "Epoch of Reionization Strömgren Spheres & Ionization Web",
        "fileName": "reionization_bubbles.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 First stars of the Universe blowing cosmic Strömgren ionization bubbles across neutral hydrogen in Three.js! Follow @kreggsjs for daily 3D code reels! 🔭✨\n\n#threejs #webgl #cosmology #reionization #firststars #astronomy #codeart",
        "displayCode": "// Strömgren Sphere Reionization Radius\nfunction stromgrenRadius(Q_H, n_H, alpha_B) {\n  // R_S = (3 * Q_H / (4 * pi * n_H^2 * alpha_B))^(1/3)\n  return Math.cbrt((3 * Q_H) / (4 * Math.PI * n_H * n_H * alpha_B));\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.3, 0.7],
            "secondaryColor": [0.3, 0.9, 1.0],
            "bubbleCount": 24
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const bubbles = [];
      for (let i = 0; i < params.bubbleCount; i++) {
        const rad = 1.2 + Math.random() * 2.8;
        const bGeo = new THREE.SphereGeometry(rad, 24, 24);
        const bMat = new THREE.MeshStandardMaterial({
          color: (i % 2 === 0) ? c1 : c2,
          emissive: (i % 2 === 0) ? c1 : c2,
          emissiveIntensity: 0.65,
          wireframe: true,
          transparent: true,
          opacity: 0.45
        });
        const m = new THREE.Mesh(bGeo, bMat);
        m.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22);
        group.add(m);
        bubbles.push({ mesh: m, baseRad: rad, phase: Math.random() * Math.PI * 2 });
      }

      // Neutral intergalactic medium gas dust (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 36;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 36;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 36;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.16, color: 0x64748b, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending });
      group.add(new THREE.Points(pGeo, pMat));

      scene.userData = { group, bubbles, params };""",
        "renderBody": """      data.bubbles.forEach((b, idx) => {
        const s = 1.0 + Math.sin(t * 1.8 + b.phase) * 0.35;
        b.mesh.scale.set(s, s, s);
        b.mesh.rotation.y = t * 0.3 * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.y = t * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 24;
      camera.position.z = Math.cos(t * 0.25) * 24;
      camera.position.y = 8 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "binary_neutron_star_kilonova_merger",
        "title": "Binary Neutron Star Chirp Merger & R-Process Kilonova",
        "fileName": "kilonova_merger.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "💥 Binary neutron star gravitational-wave chirp spiral & radioactive gold-forging Kilonova explosion in Three.js! Follow @kreggsjs for daily 3D code reels! 🌌🔥\n\n#threejs #webgl #kilonova #neutronstar #gravitationalwaves #ligo #creativecoding #physics",
        "displayCode": "// Gravitational Wave Chirp Mass Equation\nfunction chirpMass(m1, m2) {\n  // M_chirp = (m1 * m2)^(3/5) / (m1 + m2)^(1/5)\n  return Math.pow(m1 * m2, 0.6) / Math.pow(m1 + m2, 0.2);\n}\nconst gw_omega = Math.pow(c, 3.0) / (8.0 * Math.PI * G * M_chirp);",
        "defaultParams": {
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.2, 0.95, 0.9],
            "chirpRate": 2.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Dual Neutron Stars
      const nsGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const ns1 = new THREE.Mesh(nsGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const ns2 = new THREE.Mesh(nsGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      group.add(ns1); group.add(ns2);

      // Tidal Debris & Kilonova Ejecta Cloud (24,000 particles)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 2.0 + Math.random() * 12.0;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * (r * 0.4);

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = (i % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ r, angle, speed: 2.5 / Math.sqrt(r), y });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const ejecta = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(ejecta);

      scene.userData = { group, ns1, ns2, ejecta, pData, params };""",
        "renderBody": """      const sep = 3.2 + Math.sin(t * 1.5) * 1.2;
      const theta = t * 4.8;
      data.ns1.position.set(Math.cos(theta) * sep, 0, Math.sin(theta) * sep);
      data.ns2.position.set(-Math.cos(theta) * sep, 0, -Math.sin(theta) * sep);

      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 7 + Math.cos(t * 0.25) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "solar_coronal_mass_ejection_prominence",
        "title": "Solar Magnetic Helicity Prominence & CME Eruption",
        "fileName": "solar_cme_prominence.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "☀️ Twisted solar magnetic flux ropes erupting into an explosive billion-ton Coronal Mass Ejection in Three.js! Follow @kreggsjs for daily 3D code reels! ⚡🔥\n\n#threejs #webgl #solarphysics #sun #cme #plasma #spaceweather #codeart",
        "displayCode": "// Magnetic Helicity & Lorentz Force Balance\nfunction lorentzForce(j, B) {\n  // F = (j x B) - grad(P) + rho * g\n  return new THREE.Vector3().crossVectors(j, B);\n}\nconst kink_instability = (twist > 2.5 * Math.PI);",
        "defaultParams": {
            "primaryColor": [1.0, 0.3, 0.05],
            "secondaryColor": [1.0, 0.9, 0.15],
            "fluxTwist": 3.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Solar Photosphere base sphere
      const sun = new THREE.Mesh(
        new THREE.SphereGeometry(6.0, 48, 48),
        new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff3300, emissiveIntensity: 0.8 })
      );
      sun.position.y = -6.5;
      group.add(sun);

      // Prominence Twisted Magnetic Flux Loops (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * Math.PI; // along the arch
        const archR = 7.5;
        const archX = Math.cos(u) * archR;
        const archY = Math.sin(u) * archR - 1.0;
        const twistAngle = u * 8.0 + Math.random() * 0.4;
        const tubeRad = 0.8 + Math.sin(u) * 1.2;

        pPos[i * 3] = archX + Math.cos(twistAngle) * tubeRad;
        pPos[i * 3 + 1] = archY + Math.sin(twistAngle) * tubeRad;
        pPos[i * 3 + 2] = Math.sin(twistAngle) * tubeRad * 1.5;

        const col = c1.clone().lerp(c2, Math.sin(u));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ u, twistAngle, tubeRad });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const prominence = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(prominence);

      scene.userData = { group, prominence, pData, params };""",
        "renderBody": """      const pos = data.prominence.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const pulsate = Math.sin(t * 3.5 + it.u * 4.0) * 0.3;
        pos[i * 3 + 1] += pulsate * 0.05;
      }
      data.prominence.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 4 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 2, 0);"""
    },
    {
        "id": "blazar_superluminal_relativistic_beaming",
        "title": "Blazar Relativistic Jet & Superluminal Doppler Motion",
        "fileName": "blazar_beaming.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Supermassive active galactic nucleus Blazar firing its relativistic particle beam directly down our line of sight in Three.js! Follow @kreggsjs! ⚡🔭\n\n#threejs #webgl #blazar #relativity #astrophysics #cosmos #creativecoding #codeart",
        "displayCode": "// Relativistic Doppler Boosting Factor delta\nfunction dopplerFactor(gamma, beta, theta) {\n  // delta = 1 / (gamma * (1 - beta * cos(theta)))\n  return 1.0 / (gamma * (1.0 - beta * Math.cos(theta)));\n}\nconst apparent_velocity = (beta * Math.sin(theta)) / (1.0 - beta * Math.cos(theta));",
        "defaultParams": {
            "primaryColor": [0.2, 0.7, 1.0],
            "secondaryColor": [0.95, 0.35, 1.0],
            "lorentzGamma": 15.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Line-of-sight cone jet (26,000 particles)
      const pCount = 26000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const z = -2.0 + Math.random() * 26.0;
        const spread = (z + 2.0) * 0.24;
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * spread;

        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = Math.sin(angle) * rad;
        pPos[i * 3 + 2] = z;

        const mix = z / 24.0;
        const col = (mix < 0.2) ? new THREE.Color(1, 1, 1) : c1.clone().lerp(c2, mix);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ z, rad, angle, speed: 2.5 + Math.random() * 2.0 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const jet = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(jet);

      scene.userData = { group, jet, pData, params };""",
        "renderBody": """      const pos = data.jet.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].z -= pData[i].speed * 0.15;
        if (pData[i].z < -2.0) pData[i].z = 24.0;
        pos[i * 3 + 2] = pData[i].z;
      }
      data.jet.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.z = t * 0.4;
      camera.position.set(Math.sin(t * 0.2) * 4, Math.cos(t * 0.2) * 4, -14);
      camera.lookAt(0, 0, 10);"""
    },
    {
        "id": "galactic_habitable_zone_metallicity_spiral",
        "title": "Milky Way Galactic Habitable Zone & Stellar Metallicity Drift",
        "fileName": "habitable_zone_spiral.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Galactic Habitable Zone ring spanning 7 to 9 kiloparsecs with life-harboring star systems in Three.js! Follow @kreggsjs for daily 3D code reels! 🪐✨\n\n#threejs #webgl #galaxy #milkyway #habitablezone #astronomy #science #codeart",
        "displayCode": "// Galactic Habitable Zone Radial Annulus (7 kpc to 9 kpc)\nfunction inGHZ(r_gal) {\n  const r_min = 7.0, r_max = 9.0;\n  return (r_gal >= r_min && r_gal <= r_max);\n}\nconst metallicity = [Fe/H]_0 * Math.exp(-r_gal / 3.5);",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.55],
            "secondaryColor": [0.35, 0.65, 1.0],
            "spiralArms": 4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Spiral galaxy stars (24,000 particles)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const arm = i % params.spiralArms;
        const armOffset = (arm * Math.PI * 2) / params.spiralArms;
        const r = 1.5 + Math.pow(Math.random(), 1.4) * 13.5;
        const angle = armOffset + r * 0.45 + (Math.random() - 0.5) * 0.6;
        const z = (Math.random() - 0.5) * (0.8 + (14.0 - r) * 0.1);

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = z;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        // Highlight Habitable Zone (r between 6.5 and 9.5)
        const isGHZ = (r >= 6.5 && r <= 9.5);
        const col = isGHZ ? c1 : c2.clone().multiplyScalar(0.6);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 1.2 / Math.sqrt(r) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const galaxy = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(galaxy);

      scene.userData = { group, galaxy, pData, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.22;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 11 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cosmic_web_dark_energy_filament_tessellation",
        "title": "Cosmic Web Dark Energy Filaments & Supercluster Nodes",
        "fileName": "cosmic_web_filaments.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Large-Scale Structure of the Universe: 3D cosmic web filaments, galaxy superclusters & giant cosmic voids in Three.js! Follow @kreggsjs for daily code reels! 🔭🌐\n\n#threejs #webgl #cosmology #cosmicweb #darkmatter #astronomy #mathart #codeart",
        "displayCode": "// Zel'dovich Approximation for Filament Collapse\nfunction zeldovichDisplacement(q, D_plus, Psi) {\n  // x(q, t) = q - D_plus(t) * grad(Psi(q))\n  return q.clone().sub(Psi.multiplyScalar(D_plus));\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.85, 1.0],
            "secondaryColor": [0.95, 0.4, 0.85],
            "nodeCount": 35
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Supercluster attractor nodes
      const nodes = [];
      for (let i = 0; i < params.nodeCount; i++) {
        nodes.push(new THREE.Vector3((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 24, (Math.random() - 0.5) * 24));
      }

      // 22,000 cosmic filament particles bridging nearest nodes
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const nA = nodes[i % nodes.length];
        const nB = nodes[(i * 7 + 1) % nodes.length];
        const alpha = Math.random();
        const spread = (1.0 - Math.abs(alpha - 0.5) * 2.0) * 1.4;

        pPos[i * 3] = THREE.MathUtils.lerp(nA.x, nB.x, alpha) + (Math.random() - 0.5) * spread;
        pPos[i * 3 + 1] = THREE.MathUtils.lerp(nA.y, nB.y, alpha) + (Math.random() - 0.5) * spread;
        pPos[i * 3 + 2] = THREE.MathUtils.lerp(nA.z, nB.z, alpha) + (Math.random() - 0.5) * spread;

        const col = (alpha < 0.5) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const web = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(web);

      scene.userData = { group, web, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.12;
      data.group.rotation.x = Math.sin(t * 0.1) * 0.15;
      camera.position.x = Math.sin(t * 0.2) * 25;
      camera.position.z = Math.cos(t * 0.2) * 25;
      camera.position.y = 8 + Math.cos(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "wolf_rayet_colliding_wind_spiral_pinwheel",
        "title": "Wolf-Rayet Colliding Winds & Archimedean Dust Pinwheel",
        "fileName": "wolf_rayet_pinwheel.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌀 Colliding supersonic stellar winds around binary Wolf-Rayet WR 104 carving an Archimedean dust pinwheel in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #wolfrayet #pinwheel #nebula #astronomy #spaceart #codeart",
        "displayCode": "// Archimedean Spiral Pinwheel Wind Equation\nfunction archimedeanPinwheel(v_wind, omega_orb, theta) {\n  // r(theta) = v_wind * (theta / omega_orb)\n  return v_wind * (theta / omega_orb);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.4, 0.2],
            "secondaryColor": [0.25, 0.85, 1.0],
            "windSpeed": 3.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Binary Central Stars
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), new THREE.MeshBasicMaterial({ color: 0x66ccff }));
      group.add(s1); group.add(s2);

      // 24,000 Archimedean Pinwheel Dust Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const theta = (i / pCount) * Math.PI * 16.0;
        const r = 1.8 + theta * 0.28;
        const spread = (r / 16.0) * 0.7;

        pPos[i * 3] = Math.cos(theta) * r + (Math.random() - 0.5) * spread;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        pPos[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * spread;

        const col = c1.clone().lerp(c2, r / 16.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ theta, r, speed: 1.8 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const pinwheel = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(pinwheel);

      scene.userData = { group, s1, s2, pinwheel, params };""",
        "renderBody": """      const orbAngle = t * 3.5;
      data.s1.position.set(Math.cos(orbAngle) * 1.4, 0, Math.sin(orbAngle) * 1.4);
      data.s2.position.set(-Math.cos(orbAngle) * 1.4, 0, -Math.sin(orbAngle) * 1.4);

      data.pinwheel.rotation.y = t * 0.8;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 8 + Math.cos(t * 0.25) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "intermediate_mass_black_hole_globular_core",
        "title": "Globular Cluster Core Collapse & Intermediate-Mass Black Hole",
        "fileName": "globular_imbh_core.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 50,000 stars swirling in gravothermal core collapse around a hidden Intermediate-Mass Black Hole in Three.js! Follow @kreggsjs for daily reels! 🕳️✨\n\n#threejs #webgl #blackhole #globularcluster #astronomy #creativecoding #physics",
        "displayCode": "// King Model Core Radius & Velocity Dispersion\nfunction kingCoreDensity(r, r_c, rho_0) {\n  // rho(r) = rho_0 / (1 + (r / r_c)^2)^(3/2)\n  return rho_0 / Math.pow(1.0 + (r * r) / (r_c * r_c), 1.5);\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [1.0, 0.75, 0.2],
            "coreRadius": 2.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central IMBH Event Horizon
      const bh = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      group.add(bh);

      // Dense Globular Core Stars (26,000 particles)
      const pCount = 26000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        // King Profile distribution
        const u = Math.random();
        const r = 1.8 + Math.pow(u, 2.5) * 14.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);

        const col = (r < 4.5) ? new THREE.Color(1, 1, 1).lerp(c1, 0.5) : c1.clone().lerp(c2, r / 15.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, theta, phi, speed: 2.2 / Math.sqrt(r) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const stars = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(stars);

      scene.userData = { group, stars, pData, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.28) * 21;
      camera.position.z = Math.cos(t * 0.28) * 21;
      camera.position.y = 6 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "type_ia_supernova_carbon_detonation_shock",
        "title": "Type Ia Supernova Thermonuclear Flame Front & Shock Wave",
        "fileName": "supernova_ia_shock.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "💥 White dwarf runaway carbon fusion deflagration-to-detonation Type Ia supernova shock wave in Three.js! Follow @kreggsjs for daily reels! 🌌🔥\n\n#threejs #webgl #supernova #astronomy #physics #creativecoding #codeart",
        "displayCode": "// Chandrasekhar Mass Limit Carbon Runaway\nfunction detonationVelocity(rho_c, q_nuc) {\n  // D = sqrt(2 * (gamma^2 - 1) * q_nuc)\n  return Math.sqrt(2.0 * (1.333 * 1.333 - 1.0) * q_nuc);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.9, 0.4],
            "secondaryColor": [0.95, 0.2, 0.35],
            "shockRadius": 8.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Expanding Turbulent Shock Shell (25,000 particles)
      const pCount = 25000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const baseR = 3.0 + Math.random() * 8.0;

        pPos[i * 3] = baseR * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = baseR * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = baseR * Math.cos(phi);

        const col = c1.clone().lerp(c2, (baseR - 3.0) / 8.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ theta, phi, baseR, speed: 1.5 + Math.random() * 1.5 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const shock = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(shock);

      scene.userData = { group, shock, pData, params };""",
        "renderBody": """      const pos = data.shock.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const r = it.baseR + ((t * it.speed) % 8.0);
        pos[i * 3] = r * Math.sin(it.phi) * Math.cos(it.theta);
        pos[i * 3 + 1] = r * Math.sin(it.phi) * Math.sin(it.theta);
        pos[i * 3 + 2] = r * Math.cos(it.phi);
      }
      data.shock.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "active_galactic_nucleus_broad_line_region",
        "title": "AGN Clumpy Torus & Broad-Line Region Reverberation",
        "fileName": "agn_broad_line.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Active Galactic Nucleus clumpy molecular torus & relativistic broad-line reverberation clouds in Three.js! Follow @kreggsjs for daily reels! ⚡🕳️\n\n#threejs #webgl #agn #blackhole #galaxy #astronomy #codeart",
        "displayCode": "// AGN Reverberation Time Lag Mapping\nfunction timeLag(r_BLR, theta_view) {\n  // tau = (r_BLR / c) * (1 - cos(theta_view))\n  return (r_BLR / 3e5) * (1.0 - Math.cos(theta_view));\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.4, 0.8],
            "secondaryColor": [0.3, 0.7, 1.0],
            "torusRadius": 9.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Engine SMBH
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })));

      // Clumpy Molecular Torus (22,000 particles)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 8.5;
        const rTube = 3.2 + Math.random() * 1.5;

        pPos[i * 3] = (R + rTube * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = rTube * Math.sin(v) * 0.8;
        pPos[i * 3 + 2] = (R + rTube * Math.cos(v)) * Math.sin(u);

        const col = (i % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const torus = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(torus);

      scene.userData = { group, torus, params };""",
        "renderBody": """      data.torus.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.28) * 22;
      camera.position.z = Math.cos(t * 0.28) * 22;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "planetesimal_pebble_accretion_vortex",
        "title": "Protoplanetary Disk Gas Drag & Pebble Accretion Vortices",
        "fileName": "pebble_accretion.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🪐 Millimeter chondrule pebbles spiraling into anticyclonic pressure vortices to birth protoplanets in Three.js! Follow @kreggsjs for daily reels! 🌌✨\n\n#threejs #webgl #protoplanet #planets #astronomy #physics #codeart",
        "displayCode": "// Stokes Drag Stopping Time & Pebble Drift\nfunction stokesStoppingTime(rho_s, s, rho_g, c_s) {\n  // t_stop = (rho_s * s) / (rho_g * c_s)\n  return (rho_s * s) / (rho_g * c_s);\n}\nconst v_drift = -2.0 * eta * v_k * (tau_s / (1.0 + tau_s * tau_s));",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.85],
            "secondaryColor": [1.0, 0.5, 0.15],
            "vortexCount": 3
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Protoplanetary pebbles (24,000 particles)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const r = 2.5 + Math.pow(Math.random(), 1.5) * 12.0;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.8;

        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(angle) * r;

        const col = c1.clone().lerp(c2, r / 14.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ r, angle, speed: 2.0 / Math.pow(r, 0.6) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const disk = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(disk);

      scene.userData = { group, disk, pData, params };""",
        "renderBody": """      const pos = data.disk.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        pData[i].angle += pData[i].speed * 0.03;
        pos[i * 3] = Math.cos(pData[i].angle) * pData[i].r;
        pos[i * 3 + 2] = Math.sin(pData[i].angle) * pData[i].r;
      }
      data.disk.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.3) * 20;
      camera.position.z = Math.cos(t * 0.3) * 20;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "intergalactic_warm_hot_medium_whim_sheet",
        "title": "Intergalactic Warm-Hot Medium (WHIM) Cosmic Sheets",
        "fileName": "whim_cosmic_sheets.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 The missing baryonic matter of the Universe: million-Kelvin WHIM plasma sheets permeating intergalactic voids in Three.js! Follow @kreggsjs! 🔭✨\n\n#threejs #webgl #astronomy #plasma #cosmology #creativecoding #codeart",
        "displayCode": "// WHIM Thermal Collisional Ionization Equilibrium\nfunction whimCooling(Lambda_T, n_e, n_H) {\n  // L = Lambda(T) * n_e * n_H\n  return Lambda_T * n_e * n_H;\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.75],
            "secondaryColor": [0.95, 0.3, 0.8],
            "sheetExtent": 16.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 WHIM sheet particles with sinuous thermal undulation
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * 26.0;
        const z = (Math.random() - 0.5) * 26.0;
        const y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 3.5 + (Math.random() - 0.5) * 1.5;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, (y + 4.0) / 8.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
        pData.push({ x, z, basePhase: Math.random() * Math.PI * 2 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const sheet = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(sheet);

      scene.userData = { group, sheet, pData, params };""",
        "renderBody": """      const pos = data.sheet.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        pos[i * 3 + 1] = Math.sin(it.x * 0.3 + t * 1.2) * Math.cos(it.z * 0.3 + t * 0.9) * 3.5;
      }
      data.sheet.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "microquasar_ss433_precessing_jet_corkscrew",
        "title": "Microquasar SS 433 Precessing Relativistic Jet Corkscrew",
        "fileName": "ss433_corkscrew.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌀 Stellar-mass microquasar SS 433 precessing its 0.26c relativistic relativistic jet corkscrew in Three.js! Follow @kreggsjs for daily reels! ⚡🕳️\n\n#threejs #webgl #ss433 #microquasar #relativity #astrophysics #creativecoding #codeart",
        "displayCode": "// Kinematic Precessing Jet Corkscrew Model\nfunction jetCorkscrew(v_jet, theta_prec, omega_prec, t) {\n  // z = v_jet * t, r = z * tan(theta_prec), phi = omega_prec * t\n  return {\n    x: (v_jet * t) * Math.tan(theta_prec) * Math.cos(omega_prec * t),\n    y: (v_jet * t) * Math.tan(theta_prec) * Math.sin(omega_prec * t),\n    z: v_jet * t\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.25, 0.65],
            "precessionPeriod": 5.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Microquasar central compact object
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })));

      // 24,000 Corkscrew Precessing Jet Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const sign = (i % 2 === 0) ? 1 : -1;
        const progress = Math.random();
        const dist = 1.2 + progress * 22.0;
        const precAngle = progress * Math.PI * 6.0;
        const coneRadius = dist * 0.35;

        pPos[i * 3] = Math.cos(precAngle) * coneRadius;
        pPos[i * 3 + 1] = sign * dist;
        pPos[i * 3 + 2] = Math.sin(precAngle) * coneRadius;

        const col = c1.clone().lerp(c2, progress);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ sign, progress, speed: 2.2 + Math.random() * 1.5, precAngle, coneRadius });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const corkscrew = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(corkscrew);

      scene.userData = { group, corkscrew, pData, params };""",
        "renderBody": """      const pos = data.corkscrew.geometry.attributes.position.array;
      const pData = data.pData;
      for (let i = 0; i < pData.length; i++) {
        const it = pData[i];
        const p = (it.progress + t * 0.35) % 1.0;
        const dist = 1.2 + p * 22.0;
        const angle = it.precAngle + t * 3.5;
        const rad = dist * 0.35;
        pos[i * 3] = Math.cos(angle) * rad;
        pos[i * 3 + 1] = it.sign * dist;
        pos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      data.corkscrew.geometry.attributes.position.needsUpdate = true;
      data.group.rotation.y = t * 0.3;
      camera.position.x = Math.sin(t * 0.28) * 22;
      camera.position.z = Math.cos(t * 0.28) * 22;
      camera.position.y = 5 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);"""
    }
]
