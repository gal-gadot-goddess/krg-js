# tools/defs_new_cosmos.py
# 15 Stellar & Deep Astrophysics Visualizers (IDs 101-115)

DEFS_COSMOS = [
    {
        "id": "neutron_star_crust_pasta",
        "title": "Neutron Star Crust Nuclear Pasta",
        "fileName": "nuclear_pasta.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Dense nuclear pasta matter inside neutron star crusts! Waffles, spaghetti & gnocchi quark-gluon phases in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #neutronstar #nuclearpasta #physics #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Nuclear Pasta Phase Density Equation\nfunction computeNuclearPasta(x, y, z, t) {\n  const density = Math.sin(x * 1.5) * Math.cos(y * 1.5) + Math.sin(z * 1.5 + t);\n  const protonFraction = 0.35 + 0.15 * Math.sin(x + y - z);\n  return { density, protonFraction };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.1],
            "secondaryColor": [0.2, 0.8, 1.0],
            "particleCount": 8000
        },
        "initBody": """      camera.fov = 50;
      camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const light1 = new THREE.PointLight(new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]), 3, 50);
      light1.position.set(10, 10, 10);
      scene.add(light1);

      const light2 = new THREE.PointLight(new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]), 2, 50);
      light2.position.set(-10, -10, -10);
      scene.add(light2);

      // Core Dense Quark Tube Geometry (Spaghetti/Lasagna Phase)
      const count = params.particleCount;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const r = 4.5 + Math.sin(u * 4) * Math.cos(v * 4) * 2.2;
        positions[i * 3] = r * Math.sin(u) * Math.cos(v);
        positions[i * 3 + 1] = r * Math.sin(u) * Math.sin(v);
        positions[i * 3 + 2] = r * Math.cos(u);

        const mixRatio = Math.sin(u * 2) * 0.5 + 0.5;
        const col = c1.clone().lerp(c2, mixRatio);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.95
      });
      const pastaPoints = new THREE.Points(geo, mat);
      group.add(pastaPoints);

      // Inner degenerate core sphere
      const coreGeo = new THREE.SphereGeometry(2.0, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true, transparent: true, opacity: 0.7
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      scene.userData = { group, pastaPoints, coreMesh, params, light1, light2 };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;
      data.coreMesh.rotation.y = -t * 0.6;

      const pos = data.pastaPoints.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += Math.sin(t * 2.0 + pos[i] * 0.5) * 0.015;
      }
      data.pastaPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = Math.sin(t * 0.15) * 6;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "gravitational_lensing_einstein_ring",
        "title": "Relativistic Gravitational Lensing & Dual Einstein Rings",
        "fileName": "gravitational_lensing.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🔭 General Relativity Gravitational Lensing & Dual Einstein Rings bending spacetime geodesics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌✨\n\n#threejs #webgl #einstein #gravitationallensing #relativity #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Einstein Ring Angular Deflection Angle\nfunction deflectionAngle(r, mass = 4e6, G = 6.674e-11, c = 3e8) {\n  const thetaE = Math.sqrt((4 * G * mass) / (c * c * r));\n  const warpX = Math.cos(thetaE) / (1 + r * 0.1);\n  return { thetaE, warpX };\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.7, 1.0],
            "secondaryColor": [1.0, 0.8, 0.2],
            "ringRadius": 6.0
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Dual Einstein Rings
      const ringGeo1 = new THREE.TorusGeometry(params.ringRadius, 0.18, 30, 200);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: c1, transparent: true, opacity: 0.85, wireframe: true });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      group.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(params.ringRadius * 0.65, 0.12, 24, 160);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: c2, transparent: true, opacity: 0.8, wireframe: true });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      group.add(ring2);

      // Deflected background star particle lattice
      const pCount = 6000;
      const positions = new Float32Array(pCount * 3);
      const colors = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 2.0 + Math.random() * 10.0;
        const warp = 1.0 + 1.8 / (rad * 0.8);
        positions[i * 3] = Math.cos(theta) * rad * warp;
        positions[i * 3 + 1] = Math.sin(theta) * rad * warp;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6.0;

        const mix = rad / 12.0;
        const col = c1.clone().lerp(c2, mix);
        colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
      }

      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const starMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
      const starField = new THREE.Points(starGeo, starMat);
      group.add(starField);

      // Central gravitational lensing mass
      const massMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x010206 })
      );
      group.add(massMesh);

      scene.userData = { group, ring1, ring2, starField, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.15;
      data.ring1.rotation.x = Math.sin(t * 0.3) * 0.4;
      data.ring1.rotation.y = Math.cos(t * 0.25) * 0.4;
      data.ring2.rotation.x = -Math.sin(t * 0.3) * 0.4;
      data.ring2.rotation.y = -Math.cos(t * 0.25) * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.y = Math.cos(t * 0.18) * 6;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "kerr_black_hole_ergosphere",
        "title": "Spinning Kerr Black Hole Ergosphere & Penrose Jets",
        "fileName": "kerr_ergosphere.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌀 Frame-dragging spacetime oblate ergosphere & Penrose energy extraction around a Kerr rotating black hole in Three.js! Follow @kreggsjs for daily 3D code reels! ⚡🕳️\n\n#threejs #webgl #kerrblackhole #ergosphere #relativity #penrose #astrophysics #creativecoding #javascript",
        "displayCode": "// Kerr Metric Ergosphere Boundary Radius\nfunction ergosphereRadius(M, a, theta) {\n  // r_E(theta) = M + sqrt(M^2 - a^2 * cos^2(theta))\n  const spinTerm = a * Math.cos(theta);\n  return M + Math.sqrt(Math.max(0, M * M - spinTerm * spinTerm));\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.2, 0.4],
            "secondaryColor": [0.2, 0.9, 1.0],
            "spinParam": 0.95
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Oblate Ergosphere Ellipsoid
      const ergoGeo = new THREE.SphereGeometry(4.2, 48, 48);
      ergoGeo.scale(1.4, 0.9, 1.4); // Frame dragging equator elongation
      const ergoMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, transparent: true, opacity: 0.55
      });
      const ergosphere = new THREE.Mesh(ergoGeo, ergoMat);
      group.add(ergosphere);

      // Event Horizon (inner sphere)
      const horizon = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      group.add(horizon);

      // Penrose Relativistic Bipolar Jets
      const jetCount = 4000;
      const jetPos = new Float32Array(jetCount * 3);
      const jetCol = new Float32Array(jetCount * 3);

      for (let i = 0; i < jetCount; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const dist = 1.0 + Math.random() * 12.0;
        const spread = (dist * 0.12) * Math.sqrt(Math.random());
        const angle = Math.random() * Math.PI * 2;
        jetPos[i * 3] = Math.cos(angle) * spread;
        jetPos[i * 3 + 1] = sign * dist;
        jetPos[i * 3 + 2] = Math.sin(angle) * spread;

        const mix = dist / 13.0;
        const col = c2.clone().lerp(c1, mix);
        jetCol[i * 3] = col.r; jetCol[i * 3 + 1] = col.g; jetCol[i * 3 + 2] = col.b;
      }

      const jetGeo = new THREE.BufferGeometry();
      jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
      jetGeo.setAttribute('color', new THREE.BufferAttribute(jetCol, 3));
      const jets = new THREE.Points(jetGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(jets);

      scene.userData = { group, ergosphere, horizon, jets, params };""",
        "renderBody": """      data.ergosphere.rotation.y = t * 1.8;
      data.group.rotation.y = t * 0.25;

      const pos = data.jets.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        if (pos[i + 1] > 0) {
          pos[i + 1] += 0.18;
          if (pos[i + 1] > 14.0) pos[i + 1] = 2.0;
        } else {
          pos[i + 1] -= 0.18;
          if (pos[i + 1] < -14.0) pos[i + 1] = -2.0;
        }
      }
      data.jets.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.3) * 22;
      camera.position.z = Math.cos(t * 0.3) * 22;
      camera.position.y = 5 + Math.sin(t * 0.2) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "magnetar_starquake_gamma_burst",
        "title": "Magnetar Crust Starquake & Giant Gamma Flare",
        "fileName": "magnetar_starquake.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "⚡ Billion-Tesla magnetic field fracture & relativistic gamma flare from a magnetar starquake in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌💥\n\n#threejs #webgl #magnetar #starquake #gammaray #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Magnetar Magnetic Stress Tensor Fracture\nfunction magneticTorqueStress(B = 1e11, R = 10) {\n  const shearModulus = 1e30; // dyne/cm^2\n  const maxShearStrain = (B * B) / (8 * Math.PI * shearModulus);\n  const starquakeEnergy = 1e44 * Math.sin(maxShearStrain * 100);\n  return { maxShearStrain, starquakeEnergy };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.9, 0.2],
            "secondaryColor": [0.8, 0.1, 0.95],
            "fieldLines": 48
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Ultra-Magnetic Core Sphere
      const coreGeo = new THREE.SphereGeometry(2.8, 48, 48);
      const coreMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.8, wireframe: true
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Toroidal Magnetic Dipole Field Lines
      const linesGroup = new THREE.Group();
      group.add(linesGroup);
      const lineCount = params.fieldLines;

      for (let i = 0; i < lineCount; i++) {
        const phi = (i / lineCount) * Math.PI * 2;
        const pts = [];
        const scale = 5.0 + (i % 3) * 2.2;
        for (let t = -Math.PI * 0.9; t <= Math.PI * 0.9; t += 0.08) {
          const r = scale * Math.cos(t) * Math.cos(t);
          const x = r * Math.sin(t) * Math.cos(phi);
          const y = r * Math.cos(t);
          const z = r * Math.sin(t) * Math.sin(phi);
          pts.push(new THREE.Vector3(x, y, z));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({
          color: (i % 2 === 0) ? c1 : c2, transparent: true, opacity: 0.65
        });
        linesGroup.add(new THREE.Line(geo, mat));
      }

      // Starquake expanding blast wave particles
      const bCount = 3500;
      const bPos = new Float32Array(bCount * 3);
      for (let i = 0; i < bCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const rad = 3.0 + Math.random() * 8.0;
        bPos[i * 3] = rad * Math.sin(v) * Math.cos(u);
        bPos[i * 3 + 1] = rad * Math.cos(v);
        bPos[i * 3 + 2] = rad * Math.sin(v) * Math.sin(u);
      }
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
      const blastPoints = new THREE.Points(bGeo, new THREE.PointsMaterial({
        color: c1, size: 0.16, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.85
      }));
      group.add(blastPoints);

      scene.userData = { group, core, linesGroup, blastPoints, params };""",
        "renderBody": """      data.core.rotation.y = t * 2.5;
      data.linesGroup.rotation.y = t * 0.5;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.2;

      const p = data.blastPoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        const d = Math.sqrt(p[i]*p[i] + p[i+1]*p[i+1] + p[i+2]*p[i+2]);
        const factor = 1.0 + 0.015 * Math.sin(t * 4 + d);
        p[i] *= factor;
        p[i+1] *= factor;
        p[i+2] *= factor;
        if (d > 14.0) { p[i] *= 0.25; p[i+1] *= 0.25; p[i+2] *= 0.25; }
      }
      data.blastPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.position.y = Math.cos(t * 0.15) * 8;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "planetary_ring_shepherd_moons",
        "title": "Saturnian Crystalline Rings & Shepherd Moon Resonances",
        "fileName": "shepherd_moons.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🪐 Shepherd moons Prometheus & Pandora carving wavy edge density waves in icy crystalline rings in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ❄️✨\n\n#threejs #webgl #saturn #planetaryrings #shepherdmoons #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Resonant Lindblad Orbit Gap Confinement\nfunction shepherdResonance(r, moonRadius, massRatio) {\n  const deltaR = r - moonRadius;\n  const torque = -(massRatio * massRatio) / Math.pow(Math.abs(deltaR), 4);\n  return { deltaR, torque };\n}",
        "defaultParams": {
            "primaryColor": [0.85, 0.92, 1.0],
            "secondaryColor": [1.0, 0.65, 0.3],
            "iceParticleCount": 9000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 10, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Gas Giant Planet
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(3.6, 32, 32),
        new THREE.MeshStandardMaterial({ color: c2, roughness: 0.6, metalness: 0.2 })
      );
      group.add(planet);

      // Crystalline Ice Particles Ring
      const count = params.iceParticleCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        let radius = 5.0 + Math.random() * 5.8;
        // Cassini/Encke Division gap
        if (radius > 7.4 && radius < 8.0) {
          radius += (Math.random() > 0.5 ? 0.7 : -0.7);
        }
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        const mix = (radius - 5.0) / 5.8;
        const col = c1.clone().lerp(c2, mix * 0.4);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      ringGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const rings = new THREE.Points(ringGeo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(rings);

      // Shepherd Moons
      const moonGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const moon1 = new THREE.Mesh(moonGeo, moonMat);
      const moon2 = new THREE.Mesh(moonGeo, moonMat);
      group.add(moon1);
      group.add(moon2);

      group.rotation.x = 0.5;

      scene.userData = { group, planet, rings, moon1, moon2, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const m1Ang = t * 0.7;
      data.moon1.position.set(Math.cos(m1Ang) * 7.2, 0, Math.sin(m1Ang) * 7.2);

      const m2Ang = t * 0.55 + Math.PI;
      data.moon2.position.set(Math.cos(m2Ang) * 8.2, 0, Math.sin(m2Ang) * 8.2);

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tidal_disruption_flare_event",
        "title": "Supermassive Black Hole Tidal Disruption Event (TDE)",
        "fileName": "tidal_disruption.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 A passing stellar star torn apart by gravitational tidal forces into relativistic accretion streams in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #blackhole #tidaldisruption #tde #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Tidal Disruption Radius & Relativistic Spaghettification\nfunction tidalDisruptionRadius(M_BH, M_star, R_star) {\n  // R_t = R_star * (M_BH / M_star)^(1/3)\n  const massRatio = Math.cbrt(M_BH / M_star);\n  return R_star * massRatio;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.3, 0.1],
            "secondaryColor": [0.3, 0.9, 1.0],
            "streamParticles": 7000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Supermassive Singularity
      const smbh = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      group.add(smbh);

      // Debris accretion stream particles
      const count = params.streamParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 4.0;
        const r = 2.5 + Math.pow(u * 0.45, 1.8);
        const theta = u + (Math.random() - 0.5) * 0.25;
        pos[i * 3] = Math.cos(theta) * r;
        pos[i * 3 + 1] = (Math.sin(u * 2) * 1.5) * (1.0 / (r * 0.3 + 1.0));
        pos[i * 3 + 2] = Math.sin(theta) * r;

        const mix = r / 12.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const streamGeo = new THREE.BufferGeometry();
      streamGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      streamGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const debrisStream = new THREE.Points(streamGeo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(debrisStream);

      // Relativistic Accretion Ring
      const accRing = new THREE.Mesh(
        new THREE.RingGeometry(2.3, 4.2, 64),
        new THREE.MeshBasicMaterial({ color: c1, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
      );
      accRing.rotation.x = Math.PI / 2;
      group.add(accRing);

      scene.userData = { group, smbh, debrisStream, accRing, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.45;
      data.accRing.rotation.z = -t * 1.2;

      const p = data.debrisStream.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Spiral inflow towards singularity
        const rad = Math.sqrt(p[i]*p[i] + p[i+2]*p[i+2]);
        const ang = Math.atan2(p[i+2], p[i]) + 0.03 * (5.0 / (rad + 1.0));
        p[i] = Math.cos(ang) * rad;
        p[i+2] = Math.sin(ang) * rad;
      }
      data.debrisStream.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 6 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cosmic_inflation_quantum_fluctuations",
        "title": "Primordial Cosmic Inflation & CMB Quantum Fluctuations",
        "fileName": "cosmic_inflation.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Exponential expansion of primordial spacetime stretching subatomic quantum fluctuations into the Cosmic Microwave Background in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔭\n\n#threejs #webgl #cosmology #cosmicinflation #cmb #physics #creativecoding #javascript #reels",
        "displayCode": "// Primordial Inflaton Field Scalar Potential\nfunction inflatonExpansion(phi, H0, t) {\n  const scaleFactor = Math.exp(H0 * t);\n  const fluctuation = Math.sin(phi * 4.0) * Math.cos(phi * 3.0) / scaleFactor;\n  return { scaleFactor, fluctuation };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.6, 1.0],
            "secondaryColor": [1.0, 0.4, 0.6],
            "gridDivs": 45
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Primordial CMB Waveform Sphere
      const sphereGeo = new THREE.SphereGeometry(6.5, params.gridDivs, params.gridDivs);
      const pos = sphereGeo.attributes.position;
      const basePos = pos.clone();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, wireframe: true, transparent: true, opacity: 0.85
      });
      const cmbSphere = new THREE.Mesh(sphereGeo, mat);
      group.add(cmbSphere);

      // Embedded inflaton energy field particles
      const pCount = 5000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 6.5 + (Math.random() - 0.5) * 1.2;
        pPos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pPos[i * 3 + 1] = r * Math.cos(v);
        pPos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);

        const mix = Math.sin(u * 3) * 0.5 + 0.5;
        const col = c1.clone().lerp(c2, mix);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const inflatons = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(inflatons);

      scene.userData = { group, cmbSphere, basePos, inflatons, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      const pos = data.cmbSphere.geometry.attributes.position;
      const base = data.basePos;
      for (let i = 0; i < pos.count; i++) {
        const bx = base.getX(i), by = base.getY(i), bz = base.getZ(i);
        const wave = Math.sin(bx * 0.8 + t * 2.5) * Math.cos(by * 0.8 + t * 2.0) * 0.5;
        pos.setXYZ(i, bx * (1 + wave * 0.12), by * (1 + wave * 0.12), bz * (1 + wave * 0.12));
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dark_matter_halo_nfw_cusp",
        "title": "Cosmic Dark Matter Halo & Navarro-Frenk-White Virial Cusp",
        "fileName": "dark_matter_halo.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Invisible galactic dark matter halo filaments & Navarro-Frenk-White virial density cusp in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #darkmatter #nfw #halo #cosmology #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Navarro-Frenk-White (NFW) Radial Density Profile\nfunction nfwDensity(r, rho0 = 1.0, rs = 4.0) {\n  const x = r / rs;\n  return rho0 / (x * Math.pow(1 + x, 2));\n}",
        "defaultParams": {
            "primaryColor": [0.6, 0.2, 1.0],
            "secondaryColor": [0.1, 0.85, 1.0],
            "particleCount": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);
      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      for (let i = 0; i < count; i++) {
        // NFW cusp distribution: high density at center, logarithmic tail
        const u = Math.random();
        const r = 0.5 + Math.pow(u, 2.5) * 11.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0);

        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        const mix = r / 11.5;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const haloGeo = new THREE.BufferGeometry();
      haloGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const haloPoints = new THREE.Points(haloGeo, new THREE.PointsMaterial({
        size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.85
      }));
      group.add(haloPoints);

      // Embedded luminous central galaxy
      const galGeo = new THREE.SphereGeometry(1.2, 24, 24);
      const galMesh = new THREE.Mesh(galGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      group.add(galMesh);

      scene.userData = { group, haloPoints, galMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      data.group.rotation.x = Math.sin(t * 0.15) * 0.2;

      const p = data.haloPoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Virial orbital velocity around cusp
        const r = Math.sqrt(p[i]*p[i] + p[i+1]*p[i+1] + p[i+2]*p[i+2]);
        const v = 0.015 / Math.sqrt(r + 0.5);
        const ang = Math.atan2(p[i+1], p[i]) + v;
        const rad = Math.sqrt(p[i]*p[i] + p[i+1]*p[i+1]);
        p[i] = Math.cos(ang) * rad;
        p[i+1] = Math.sin(ang) * rad;
      }
      data.haloPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "proto_stellar_accretion_disk",
        "title": "Protostellar Circumstellar Disk & Herbig-Haro Bipolar Jets",
        "fileName": "protostellar_disk.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "✨ Newborn protostar feeding on circumstellar protoplanetary disk gas and shooting collimated Herbig-Haro jets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌🔭\n\n#threejs #webgl #protostar #herbig_haro #astronomy #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Protostellar Magnetocentrifugal Jet Acceleration\nfunction herbigHaroJet(z, r, B_phi, B_z) {\n  const alfvenVelocity = Math.sqrt((B_phi * B_phi + B_z * B_z) / 4 * Math.PI);\n  const jetCollimation = r / (1.0 + Math.pow(z * 0.2, 1.5));\n  return { alfvenVelocity, jetCollimation };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.55, 0.15],
            "secondaryColor": [0.2, 0.75, 1.0],
            "diskParticles": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 6, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Protostar Core
      const proto = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 32, 32),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 1.0 })
      );
      group.add(proto);

      // Flared Circumstellar Accretion Disk
      const count = params.diskParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 2.0 + Math.random() * 8.5;
        const flare = Math.pow(rad / 10.5, 1.5) * 0.8;
        pos[i * 3] = Math.cos(theta) * rad;
        pos[i * 3 + 1] = (Math.random() - 0.5) * flare;
        pos[i * 3 + 2] = Math.sin(theta) * rad;

        const mix = rad / 10.5;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const diskGeo = new THREE.BufferGeometry();
      diskGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      diskGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const diskPoints = new THREE.Points(diskGeo, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(diskPoints);

      // Herbig-Haro Bipolar Jets
      const jCount = 2000;
      const jPos = new Float32Array(jCount * 3);
      for (let i = 0; i < jCount; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const z = 1.8 + Math.random() * 11.0;
        const spread = (z * 0.08) * Math.sqrt(Math.random());
        const a = Math.random() * Math.PI * 2;
        jPos[i * 3] = Math.cos(a) * spread;
        jPos[i * 3 + 1] = sign * z;
        jPos[i * 3 + 2] = Math.sin(a) * spread;
      }
      const jGeo = new THREE.BufferGeometry();
      jGeo.setAttribute('position', new THREE.BufferAttribute(jPos, 3));
      const jetPoints = new THREE.Points(jGeo, new THREE.PointsMaterial({ color: c2, size: 0.16, blending: THREE.AdditiveBlending }));
      group.add(jetPoints);

      scene.userData = { group, proto, diskPoints, jetPoints, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.proto.rotation.y = t * 1.5;

      const p = data.jetPoints.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        if (p[i+1] > 0) {
          p[i+1] += 0.22;
          if (p[i+1] > 13.0) p[i+1] = 1.8;
        } else {
          p[i+1] -= 0.22;
          if (p[i+1] < -13.0) p[i+1] = -1.8;
        }
      }
      data.jetPoints.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 5 + Math.sin(t * 0.18) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "sombrero_galaxy_dust_ring",
        "title": "Sombrero Galaxy (M104) Relativistic Dust Lane & Stellar Bulge",
        "fileName": "sombrero_galaxy.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 The majestic Sombrero Galaxy (Messier 104) glowing stellar bulge & razor-sharp interstellar dust ring in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔭✨\n\n#threejs #webgl #sombrero #messier104 #galaxy #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// M104 Elliptical Bulge & Dust Lane Absorption\nfunction sombreroLuminosity(r, z) {\n  const R_e = 4.2; // effective bulge radius\n  const bulge = Math.exp(-7.67 * (Math.pow(r / R_e, 0.25) - 1.0));\n  const dustAbsorption = (r > 5.5 && r < 7.5) ? Math.exp(-Math.abs(z) * 3.0) : 0;\n  return { bulge, dustAbsorption };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.88, 0.6],
            "secondaryColor": [0.8, 0.2, 0.1],
            "starCount": 9500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 5, 23);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Massive Elliptical Stellar Bulge
      const bCount = 5500;
      const bPos = new Float32Array(bCount * 3);
      for (let i = 0; i < bCount; i++) {
        const u = Math.random();
        const r = Math.pow(u, 2.0) * 4.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0);
        bPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        bPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
        bPos[i * 3 + 2] = r * Math.cos(phi);
      }
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
      const bulge = new THREE.Points(bGeo, new THREE.PointsMaterial({ color: c1, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(bulge);

      // Dark Interstellar PAH Dust Ring
      const dCount = 4000;
      const dPos = new Float32Array(dCount * 3);
      for (let i = 0; i < dCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 6.0 + Math.random() * 2.2;
        dPos[i * 3] = Math.cos(theta) * rad;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
        dPos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
      const dustRing = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: c2, size: 0.13, blending: THREE.AdditiveBlending }));
      group.add(dustRing);

      group.rotation.x = 0.35;

      scene.userData = { group, bulge, dustRing, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      camera.position.x = Math.sin(t * 0.2) * 23;
      camera.position.z = Math.cos(t * 0.2) * 23;
      camera.position.y = 4 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "white_dwarf_crystallization_core",
        "title": "Crystallized White Dwarf Carbon-Oxygen Diamond Lattice",
        "fileName": "white_dwarf_core.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "💎 Billion-carat crystalline carbon-oxygen diamond core of a cooling white dwarf star pulsing in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡❄️\n\n#threejs #webgl #whitedwarf #diamondstar #crystallization #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Coulomb Liquid-to-Solid Crystallization Gamma Parameter\nfunction coulombParameter(Z, T, a) {\n  const k_B = 1.38e-16; // erg/K\n  const gamma = (Z * Z * 4.8e-10 * 4.8e-10) / (a * k_B * T);\n  return { gamma, isSolid: gamma >= 178 }; // freezing transition\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.85, 1.0],
            "secondaryColor": [0.95, 0.98, 1.0],
            "gridResolution": 14
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // FCC Diamond Crystal Lattice Points
      const n = params.gridResolution;
      const pts = [];
      const step = 0.75;
      const offset = (n * step) / 2;

      for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
          for (let z = 0; z < n; z++) {
            const px = x * step - offset;
            const py = y * step - offset;
            const pz = z * step - offset;
            if (px*px + py*py + pz*pz < 28) {
              pts.push(px, py, pz);
            }
          }
        }
      }

      const crystalGeo = new THREE.BufferGeometry();
      crystalGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const crystal = new THREE.Points(crystalGeo, new THREE.PointsMaterial({
        color: c1, size: 0.18, blending: THREE.AdditiveBlending
      }));
      group.add(crystal);

      // Surrounding Degenerate Electron Gas Shell
      const shellGeo = new THREE.IcosahedronGeometry(6.2, 3);
      const shellMat = new THREE.MeshStandardMaterial({
        color: c2, emissive: c2, emissiveIntensity: 0.4, wireframe: true, transparent: true, opacity: 0.6
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      group.add(shell);

      scene.userData = { group, crystal, shell, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;
      data.shell.rotation.z = -t * 0.2;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "heliospheric_bow_shock_sheath",
        "title": "Solar Wind Heliosphere & Interstellar Boundary Bow Shock",
        "fileName": "heliosphere_shock.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "☀️ The protective solar heliosphere bubble colliding with interstellar medium magnetic fields in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌🛡️\n\n#threejs #webgl #heliosphere #solarwind #bowshock #interstellar #creativecoding #javascript #reels",
        "displayCode": "// Magnetopause Balance Pressure Stagnation Point\nfunction heliopauseStagnation(rho_sw, v_sw, B_ism) {\n  const ramPressure = rho_sw * v_sw * v_sw;\n  const magneticPressure = (B_ism * B_ism) / (8 * Math.PI);\n  return Math.sqrt(ramPressure / magneticPressure);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.8, 0.2],
            "secondaryColor": [0.2, 0.5, 1.0],
            "flowCount": 7000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Parabolic Bow Shock Wave Surface
      const shockGeo = new THREE.CylinderGeometry(8.0, 1.5, 12.0, 32, 20, true);
      shockGeo.rotateZ(Math.PI / 2);
      const shockMat = new THREE.MeshBasicMaterial({
        color: c1, wireframe: true, transparent: true, opacity: 0.6
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      group.add(shockMesh);

      // Solar Wind & Interstellar Plasma Particle Stream
      const count = params.flowCount;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16.0;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10.0;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10.0;

        const isSolar = pos[i * 3] < 0;
        const col = isSolar ? c1 : c2;
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const flowGeo = new THREE.BufferGeometry();
      flowGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      flowGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const plasmaFlow = new THREE.Points(flowGeo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(plasmaFlow);

      scene.userData = { group, shockMesh, plasmaFlow, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const p = data.plasmaFlow.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += 0.08;
        if (p[i] > 8.0) p[i] = -8.0;
      }
      data.plasmaFlow.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "gamma_ray_burst_hypernova",
        "title": "Ultra-Relativistic Gamma-Ray Burst (GRB) Collapsar",
        "fileName": "hypernova_grb.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "💥 The most luminous explosion in the universe! Wolf-Rayet star core collapsar emitting ultra-relativistic Lorentz factor gamma jets in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌⚡\n\n#threejs #webgl #gammarayburst #hypernova #lorentz #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Relativistic Beaming & Lorentz Factor Boost\nfunction lorentzBeaming(gamma = 300, theta = 0.02) {\n  const dopplerFactor = 1.0 / (gamma * (1.0 - Math.cos(theta)));\n  const fluxBoost = Math.pow(dopplerFactor, 4.0);\n  return { dopplerFactor, fluxBoost };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [1.0, 0.25, 0.85],
            "jetResolution": 6000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Hypernova Exploding Shell
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(2.0, 32, 32),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 1.2, wireframe: true })
      );
      group.add(core);

      // Collimated Relativistic Shock Cones
      const count = params.jetResolution;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const z = 1.0 + Math.random() * 14.0;
        const radius = (z * 0.12) * Math.sqrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(theta) * radius;
        pos[i * 3 + 1] = sign * z;
        pos[i * 3 + 2] = Math.sin(theta) * radius;

        const mix = z / 15.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const jetGeo = new THREE.BufferGeometry();
      jetGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      jetGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const gammaJets = new THREE.Points(jetGeo, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending }));
      group.add(gammaJets);

      scene.userData = { group, core, gammaJets, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.core.rotation.x = t * 1.0;

      const p = data.gammaJets.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        if (p[i+1] > 0) {
          p[i+1] += 0.3;
          if (p[i+1] > 15.0) p[i+1] = 1.0;
        } else {
          p[i+1] -= 0.3;
          if (p[i+1] < -15.0) p[i+1] = -1.0;
        }
      }
      data.gammaJets.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.3) * 24;
      camera.position.z = Math.cos(t * 0.3) * 24;
      camera.position.y = Math.sin(t * 0.2) * 5;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "interstellar_molecular_cloud_pillar",
        "title": "Cosmic Pillars of Creation Star-Forming Nebula",
        "fileName": "pillars_of_creation.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "✨ Towering interstellar cold molecular gas pillars sculptured by ultraviolet stellar photo-evaporation in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌🔭\n\n#threejs #webgl #pillarsofcreation #nebula #astronomy #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Photo-Evaporating Dense Molecular Spires\nfunction nebulaPhotoEvaporation(x, y, z, UV_flux) {\n  const gasDensity = Math.exp(-y * 0.3) * (Math.sin(x * 1.2) * Math.cos(z * 1.2));\n  const ablationVelocity = Math.sqrt(UV_flux / (gasDensity + 0.1));\n  return { gasDensity, ablationVelocity };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.85, 0.95],
            "secondaryColor": [0.95, 0.5, 0.2],
            "cloudParticles": 9000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 2, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.cloudParticles;
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // 3 Distinct Nebular Spire Columns
        const spireIdx = i % 3;
        const xOffset = (spireIdx - 1) * 3.8;
        const heightMax = 12.0 - spireIdx * 2.2;
        const y = (Math.random() - 0.5) * heightMax;
        const taper = 1.0 - (y + heightMax * 0.5) / heightMax;
        const rad = (1.4 + Math.random() * 1.5) * (0.4 + taper * 0.8);
        const theta = Math.random() * Math.PI * 2;

        pos[i * 3] = xOffset + Math.cos(theta) * rad;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(theta) * rad;

        const mix = (y + 6.0) / 12.0;
        const col = c1.clone().lerp(c2, mix);
        cols[i * 3] = col.r; cols[i * 3 + 1] = col.g; cols[i * 3 + 2] = col.b;
      }

      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      cloudGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const nebula = new THREE.Points(cloudGeo, new THREE.PointsMaterial({ size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.9 }));
      group.add(nebula);

      scene.userData = { group, nebula, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.18;
      const p = data.nebula.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        p[i + 1] += Math.sin(t * 1.5 + p[i] * 0.5) * 0.01;
      }
      data.nebula.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.position.y = 2 + Math.sin(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "primordial_black_hole_cluster",
        "title": "Swarm of Primordial Micro-Black Holes & Hawking Flash",
        "fileName": "primordial_black_holes.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🕳️ Swarm of primordial asteroid-mass micro-singularities formed in the Big Bang undergoing gravitational capture in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌⚡\n\n#threejs #webgl #blackhole #primordial #hawking #astrophysics #creativecoding #javascript #reels",
        "displayCode": "// Primordial Black Hole Hawking Evaporation Flash\nfunction hawkingEvaporationLuminosity(M) {\n  const hbar = 1.054e-27, c = 3e10, G = 6.67e-8;\n  const L_H = (hbar * Math.pow(c, 6)) / (15360 * Math.PI * G * G * M * M);\n  return L_H; // explosive terminal burst\n}",
        "defaultParams": {
            "primaryColor": [0.9, 0.3, 1.0],
            "secondaryColor": [0.1, 0.95, 0.8],
            "holeCount": 60
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.holeCount;
      const holes = [];

      for (let i = 0; i < count; i++) {
        const rad = 2.0 + Math.random() * 8.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0);

        const hGroup = new THREE.Group();
        hGroup.position.set(
          rad * Math.sin(phi) * Math.cos(theta),
          rad * Math.sin(phi) * Math.sin(theta),
          rad * Math.cos(phi)
        );

        // Micro horizon
        const mMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        hGroup.add(mMesh);

        // Luminous micro accretion ring
        const rMesh = new THREE.Mesh(
          new THREE.RingGeometry(0.4, 0.85, 24),
          new THREE.MeshBasicMaterial({ color: (i % 2 === 0 ? c1 : c2), side: THREE.DoubleSide })
        );
        rMesh.rotation.x = Math.PI / 2;
        hGroup.add(rMesh);

        group.add(hGroup);
        holes.push({ group: hGroup, rad, theta, speed: 0.2 + Math.random() * 0.4 });
      }

      scene.userData = { group, holes, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.15;
      data.holes.forEach(h => {
        h.theta += h.speed * 0.03;
        h.group.position.x = Math.cos(h.theta) * h.rad;
        h.group.position.z = Math.sin(h.theta) * h.rad;
      });

      camera.position.x = Math.sin(t * 0.25) * 24;
      camera.position.z = Math.cos(t * 0.25) * 24;
      camera.lookAt(0, 0, 0);"""
    }
]
