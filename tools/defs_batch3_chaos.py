# tools/defs_batch3_chaos.py
# 15 Non-Linear Chaos & Strange Attractors 3D Visualizers (Batch 3: IDs 261-275)

DEFS_CHAOS_3 = [
    {
        "id": "hadley_circulation_multiscale_atmospheric_attractor",
        "title": "Hadley Atmospheric Circulation & Coriolis Strange Attractor",
        "fileName": "hadley_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌪️ Hadley cell tropical atmospheric circulation chaotic flow with Coriolis trade winds in Three.js! Follow @kreggsjs for daily reels! 🌀⚡\n\n#threejs #webgl #chaostheory #strangeattractor #meteorology #hadleycell #codeart",
        "displayCode": "// Hadley 3D Atmospheric System: dx/dt = -y^2 - z^2 - a*x + a*F ...\nfunction hadleyDeriv(x, y, z, a, b, F, G) {\n  return {\n    dx: -y*y - z*z - a*x + a*F,\n    dy: x*y - b*x*z - y + G,\n    dz: b*x*y + x*z - z\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 1.0],
            "secondaryColor": [1.0, 0.45, 0.25],
            "paramA": 0.25,
            "paramB": 4.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Numerical RK4 trajectory integration (24,000 points)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.015;
      const a = params.paramA, b = params.paramB, F = 8.0, G = 1.0;

      for (let i = 0; i < pCount; i++) {
        const dx = (-y*y - z*z - a*x + a*F) * dt;
        const dy = (x*y - b*x*z - y + G) * dt;
        const dz = (b*x*y + x*z - z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 1.5;
        pPos[i * 3 + 1] = y * 1.5;
        pPos[i * 3 + 2] = z * 1.5;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chen_lee_chaotic_system_symmetric_scroll",
        "title": "Chen-Lee Symmetric Strange Attractor & Invariant Manifold",
        "fileName": "chen_lee_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 The Chen-Lee 3D chaotic dynamical system with dual symmetric spherical attractor orbits in Three.js! Follow @kreggsjs for daily reels! ⚡📐\n\n#threejs #webgl #chaostheory #chenlee #dynamicalsystems #mathart #codeart",
        "displayCode": "// Chen-Lee Equations: dx/dt = a*x - y*z, dy/dt = b*y + x*z, dz/dt = c*z + (x*y)/3\nfunction chenLee(x, y, z, a, b, c) {\n  return {\n    dx: a * x - y * z,\n    dy: b * y + x * z,\n    dz: c * z + (x * y) / 3.0\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.65],
            "a": 5.0, "b": -10.0, "c": -0.38
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 1.0, y = 0.0, z = 4.5;
      const dt = 0.0035;

      for (let i = 0; i < pCount; i++) {
        const dx = (params.a * x - y * z) * dt;
        const dy = (params.b * y + x * z) * dt;
        const dz = (params.c * z + (x * y) / 3.0) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.45;
        pPos[i * 3 + 1] = y * 0.45;
        pPos[i * 3 + 2] = z * 0.45;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "halvorsen_cyclic_symmetric_attractor",
        "title": "Halvorsen Cyclic Permutation 3D Strange Attractor",
        "fileName": "halvorsen_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Perfect ternary cyclic symmetry: the Halvorsen strange attractor with 3 symmetric chaotic lobes in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #halvorsen #chaostheory #mathart #symmetry #codeart",
        "displayCode": "// Halvorsen Cyclic System: dx/dt = -a*x - 4*y - 4*z - y^2\nfunction halvorsen(x, y, z, a) {\n  return {\n    dx: -a*x - 4*y - 4*z - y*y,\n    dy: -a*y - 4*z - 4*x - z*z,\n    dz: -a*z - 4*x - 4*y - x*x\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.9],
            "secondaryColor": [1.0, 0.4, 0.8],
            "a": 1.89
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = -1.48, y = -1.51, z = 2.04;
      const dt = 0.006;

      for (let i = 0; i < pCount; i++) {
        const dx = (-params.a * x - 4*y - 4*z - y*y) * dt;
        const dy = (-params.a * y - 4*z - 4*x - z*z) * dt;
        const dz = (-params.a * z - 4*x - 4*y - x*x) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.9;
        pPos[i * 3 + 1] = y * 0.9;
        pPos[i * 3 + 2] = z * 0.9;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "four_wing_hyperchaotic_memristor_attractor",
        "title": "Four-Wing Memristive Hyperchaotic Attractor",
        "fileName": "four_wing_memristor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🦋 Memristive hyperchaos: a 4D nonlinear dynamical system producing four distinct phase-space butterfly wings in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #hyperchaos #memristor #fourwing #chaostheory #codeart",
        "displayCode": "// Four-Wing Chaotic Circuit with Memristive Feedback\nfunction fourWing(x, y, z, a, b, c) {\n  return {\n    dx: a * (y - x),\n    dy: b * x - x * z + y,\n    dz: x * y - c * z\n  };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.35, 0.55],
            "secondaryColor": [0.35, 0.85, 1.0],
            "a": 10.0, "b": 40.0, "c": 2.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.0025;

      for (let i = 0; i < pCount; i++) {
        const dx = (params.a * (y - x)) * dt;
        const dy = (params.b * x - x * z + y) * dt;
        const dz = (x * y - params.c * z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.35;
        pPos[i * 3 + 1] = (z - 25.0) * 0.35;
        pPos[i * 3 + 2] = y * 0.35;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "arneodo_cascade_chaotic_oscillator",
        "title": "Arnéodo Homoclinic Orbit Multi-Scale Cascade",
        "fileName": "arneodo_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Arnéodo chaotic oscillator: multi-scale period-doubling cascade towards a homoclinic orbit in Three.js! Follow @kreggsjs for daily reels! ⚡📐\n\n#threejs #webgl #arneodo #chaostheory #homoclinic #mathart #codeart",
        "displayCode": "// Arnéodo 3rd-Order Differential System\nfunction arneodo(x, y, z, a, b, c) {\n  return {\n    dx: y,\n    dy: z,\n    dz: -a * x - b * y - z + c * Math.pow(x, 3)\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.75],
            "secondaryColor": [0.95, 0.45, 0.2],
            "a": -5.5, "b": 3.5, "c": -1.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.015;

      for (let i = 0; i < pCount; i++) {
        const dx = y * dt;
        const dy = z * dt;
        const dz = (-params.a * x - params.b * y - z + params.c * Math.pow(x, 3)) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 2.2;
        pPos[i * 3 + 1] = y * 1.5;
        pPos[i * 3 + 2] = z * 0.8;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "sprott_b_minimal_dissipative_chaotic_flow",
        "title": "Sprott System B Pure Monomial Quadratic Chaotic Flow",
        "fileName": "sprott_b_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Sprott's simplest dissipative chaotic flow with minimal monomial algebraic terms in Three.js! Follow @kreggsjs for daily reels! ⚡📐\n\n#threejs #webgl #sprott #chaostheory #minimalchaos #mathart #codeart",
        "displayCode": "// Sprott Minimal System B: dx/dt = y * z, dy/dt = x - y, dz/dt = 1 - x * y\nfunction sprottB(x, y, z) {\n  return { dx: y * z, dy: x - y, dz: 1.0 - x * y };\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 1.0],
            "secondaryColor": [1.0, 0.35, 0.85],
            "scale": 2.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.5, y = 0.5, z = 0.5;
      const dt = 0.02;

      for (let i = 0; i < pCount; i++) {
        const dx = (y * z) * dt;
        const dy = (x - y) * dt;
        const dz = (1.0 - x * y) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 2.8;
        pPos[i * 3 + 1] = y * 2.8;
        pPos[i * 3 + 2] = z * 2.8;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "lorenz_84_climatic_monsoon_oscillation",
        "title": "Lorenz 84 Global Climate & Monsoon Shift Attractor",
        "fileName": "lorenz_84_climate.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌍 Edward Lorenz's 1984 simplified climate model demonstrating abrupt monsoon shifts and planetary wave resonance in Three.js! Follow @kreggsjs! 🌀✨\n\n#threejs #webgl #lorenz #climatechaos #meteorology #attractor #codeart",
        "displayCode": "// Lorenz-84 Climate Model: dx/dt = -y^2 - z^2 - a*x + a*F ...\nfunction lorenz84(x, y, z, a, b, F, G) {\n  return {\n    dx: -y*y - z*z - a*x + a*F,\n    dy: x*y - b*x*z - y + G,\n    dz: b*x*y + x*z - z\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.65],
            "secondaryColor": [0.95, 0.35, 0.95],
            "paramF": 6.84, "paramG": 1.28
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 1.0, y = 1.0, z = 1.0;
      const dt = 0.012;
      const a = 0.25, b = 4.0;

      for (let i = 0; i < pCount; i++) {
        const dx = (-y*y - z*z - a*x + a*params.paramF) * dt;
        const dy = (x*y - b*x*z - y + params.paramG) * dt;
        const dz = (b*x*y + x*z - z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 2.2;
        pPos[i * 3 + 1] = y * 2.2;
        pPos[i * 3 + 2] = z * 2.2;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.4;
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "thomas_cyclically_symmetric_attractor",
        "title": "Thomas Labyrinthine Sinuous Chaotic Flow",
        "fileName": "thomas_labyrinth.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Thomas' cyclically symmetric friction-dissipated strange attractor winding a continuous 3D labyrinth in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #thomasattractor #chaostheory #labyrinth #mathart #codeart",
        "displayCode": "// Thomas Sinuous Cyclically Symmetric System\nfunction thomas(x, y, z, b) {\n  return {\n    dx: Math.sin(y) - b * x,\n    dy: Math.sin(z) - b * y,\n    dz: Math.sin(x) - b * z\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.85],
            "secondaryColor": [0.95, 0.45, 0.2],
            "b": 0.208186
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.1, y = 0.0, z = 0.0;
      const dt = 0.045;

      for (let i = 0; i < pCount; i++) {
        const dx = (Math.sin(y) - params.b * x) * dt;
        const dy = (Math.sin(z) - params.b * y) * dt;
        const dz = (Math.sin(x) - params.b * z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 1.6;
        pPos[i * 3 + 1] = y * 1.6;
        pPos[i * 3 + 2] = z * 1.6;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "burke_shaw_spherical_envelope_chaos",
        "title": "Burke-Shaw Bounded Spherical Chaotic Ribbon",
        "fileName": "burke_shaw_envelope.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Burke-Shaw chaotic attractor: a single continuous trajectory tightly enveloped on an invariant sphere in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #burkeshaw #chaostheory #dynamicalsystems #mathart #codeart",
        "displayCode": "// Burke-Shaw System: dx/dt = -s*(x + y), dy/dt = -y - s*x*z, dz/dt = s*x*y + V\nfunction burkeShaw(x, y, z, s, V) {\n  return {\n    dx: -s * (x + y),\n    dy: -y - s * x * z,\n    dz: s * x * y + V\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.35, 0.75],
            "secondaryColor": [0.25, 0.9, 1.0],
            "s": 10.0, "V": 4.272
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.6, y = 0.6, z = 0.6;
      const dt = 0.003;

      for (let i = 0; i < pCount; i++) {
        const dx = (-params.s * (x + y)) * dt;
        const dy = (-y - params.s * x * z) * dt;
        const dz = (params.s * x * y + params.V) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 3.2;
        pPos[i * 3 + 1] = y * 3.2;
        pPos[i * 3 + 2] = z * 3.2;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dadras_momeni_five_term_chaotic_attractor",
        "title": "Dadras-Momeni Five-Term Autonomous Chaotic Dynamo",
        "fileName": "dadras_momeni.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Dadras-Momeni autonomous chaotic dynamo system: multi-scroll orbits winding through interconnected phase-space funnels in Three.js! Follow @kreggsjs! ⚡✨\n\n#threejs #webgl #dadras #chaostheory #multiscroll #mathart #codeart",
        "displayCode": "// Dadras-Momeni Chaotic System: dx/dt = y - a*x + b*y*z ...\nfunction dadras(x, y, z, a, b, c, d, e) {\n  return {\n    dx: y - a*x + b*y*z,\n    dy: c*y - x*z + z,\n    dz: d*x*y - e*z\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.75],
            "secondaryColor": [1.0, 0.4, 0.2],
            "a": 3.0, "b": 2.7, "c": 1.7, "d": 2.0, "e": 9.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 1.0, y = 1.0, z = 0.0;
      const dt = 0.0035;

      for (let i = 0; i < pCount; i++) {
        const dx = (y - params.a*x + params.b*y*z) * dt;
        const dy = (params.c*y - x*z + z) * dt;
        const dz = (params.d*x*y - params.e*z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.9;
        pPos[i * 3 + 1] = y * 0.9;
        pPos[i * 3 + 2] = z * 0.9;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "yu_wang_four_wing_coupled_attractor",
        "title": "Yu-Wang Coupled Dual-Lyapunov Hyperchaotic Wings",
        "fileName": "yu_wang_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🦋 Yu-Wang hyperchaotic system featuring two positive Lyapunov exponents and four symmetrical phase lobes in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #yuwang #hyperchaos #butterflywings #mathart #codeart",
        "displayCode": "// Yu-Wang Hyperchaotic Equations: dx/dt = a*(y - x), dy/dt = b*x - k*x*z ...\nfunction yuWang(x, y, z, a, b, c, d) {\n  return {\n    dx: a * (y - x),\n    dy: b * x - x * z,\n    dz: Math.exp(x * y) - c * z\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.85, 1.0],
            "secondaryColor": [0.95, 0.35, 0.75],
            "a": 10.0, "b": 40.0, "c": 2.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.2, y = 0.2, z = 0.2;
      const dt = 0.003;

      for (let i = 0; i < pCount; i++) {
        const dx = (params.a * (y - x)) * dt;
        const dy = (params.b * x - x * z) * dt;
        const dz = (x * y - params.c * z) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 0.35;
        pPos[i * 3 + 1] = (z - 20.0) * 0.35;
        pPos[i * 3 + 2] = y * 0.35;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.x = t * 0.3;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "wang_sun_chaotic_bistable_switch",
        "title": "Wang-Sun Bistable Chaotic Gyroscopic System",
        "fileName": "wang_sun_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Wang-Sun bistable chaotic gyroscope alternating between two symmetric toroidal attractors in Three.js! Follow @kreggsjs for daily reels! ⚡📐\n\n#threejs #webgl #wangsun #bistable #chaostheory #gyroscope #mathart #codeart",
        "displayCode": "// Wang-Sun Chaotic Gyroscopic Equations\nfunction wangSun(x, y, z, a, b, c, d) {\n  return {\n    dx: a * x - y * z,\n    dy: b * x + c * y + x * z,\n    dz: d * z + x * y\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.7],
            "secondaryColor": [0.95, 0.4, 0.3],
            "a": 0.2, "b": -0.01, "c": -0.4, "d": -1.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      let x = 0.5, y = 0.5, z = 0.5;
      const dt = 0.012;

      for (let i = 0; i < pCount; i++) {
        const dx = (params.a * x - y * z) * dt;
        const dy = (params.b * x + params.c * y + x * z) * dt;
        const dz = (params.d * z + x * y) * dt;
        x += dx; y += dy; z += dz;

        pPos[i * 3] = x * 1.8;
        pPos[i * 3 + 1] = y * 1.8;
        pPos[i * 3 + 2] = z * 1.8;

        const col = c1.clone().lerp(c2, i / pCount);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const attractor = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(attractor);

      scene.userData = { group, attractor, params };""",
        "renderBody": """      data.attractor.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "rayleigh_benard_turbulent_convection_rolls",
        "title": "Rayleigh-Bénard Thermal Convective Roll Plumes",
        "fileName": "rayleigh_benard_rolls.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🔥 Thermal buoyancy vs viscosity: Rayleigh-Bénard counter-rotating convection rolls and chaotic thermal plumes in Three.js! Follow @kreggsjs for daily reels! 🌀✨\n\n#threejs #webgl #convection #rayleighbenard #fluidmechanics #chaostheory #codeart",
        "displayCode": "// Rayleigh-Bénard Convection Roll Velocity Streamfunction\nfunction streamRoll(x, z, k_x) {\n  // psi(x, z) = psi_0 * sin(k_x * x) * sin(pi * z / H)\n  return Math.sin(k_x * x) * Math.sin(z * 0.8);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.4, 0.15],
            "secondaryColor": [0.25, 0.8, 1.0],
            "rollCount": 4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Thermal Convection Plume Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const pData = [];

      for (let i = 0; i < pCount; i++) {
        const x = (Math.random() - 0.5) * 16.0;
        const y = (Math.random() - 0.5) * 6.0;
        const z = (Math.random() - 0.5) * 12.0;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;

        const isHot = (y < 0);
        const col = isHot ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;

        pData.push({ x, y, z, rollIdx: Math.floor((x + 8.0) / 4.0) });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const rolls = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(rolls);

      scene.userData = { group, rolls, pData, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 7 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "belousov_zhabotinsky_3d_scroll_wave_filament",
        "title": "Belousov-Zhabotinsky 3D Chemical Scroll Wave Filament",
        "fileName": "bz_scroll_wave.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🌀 Chemical wave turbulence: Belousov-Zhabotinsky reaction-diffusion scroll rings twisting in 3D solution in Three.js! Follow @kreggsjs for daily reels! 🧪✨\n\n#threejs #webgl #belousovzhabotinsky #chemicalreaction #scrollwave #chaos #codeart",
        "displayCode": "// Oregonator Model for Belousov-Zhabotinsky Scroll Ring Dynamics\nfunction bzPhase(r, theta, z, t) {\n  // phi = theta - k * r + omega * t\n  return theta - 0.6 * r + 2.5 * t;\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.75],
            "torusRadius": 6.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Scroll Wave Particles
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const rTube = 2.4;
        const R = params.torusRadius;

        pPos[i * 3] = (R + rTube * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = rTube * Math.sin(v);
        pPos[i * 3 + 2] = (R + rTube * Math.cos(v)) * Math.sin(u);

        const col = c1.clone().lerp(c2, (Math.sin(u * 3.0 + v * 2.0) + 1.0) * 0.5);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const scroll = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(scroll);

      scene.userData = { group, scroll, params };""",
        "renderBody": """      data.scroll.rotation.x = t * 0.35;
      data.scroll.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "turing_reaction_diffusion_morphogenesis_labyrinth",
        "title": "Turing Reaction-Diffusion Morphogenesis Labyrinth",
        "fileName": "turing_morphogenesis.js",
        "category": "Chaos Theory & Attractors",
        "genre": "chaos",
        "caption": "🐆 Alan Turing's mathematical morphogenesis: activator-inhibitor chemical reaction-diffusion creating self-organizing skin patterns in Three.js! Follow @kreggsjs! 📐✨\n\n#threejs #webgl #alanturing #morphogenesis #reactiondiffusion #mathart #codeart",
        "displayCode": "// Gray-Scott Reaction-Diffusion Model: du/dt = D_u*lap(u) - u*v^2 + F*(1-u)\nfunction grayScott(u, v, F, k) {\n  return {\n    du: -u * v * v + F * (1.0 - u),\n    dv: u * v * v - (F + k) * v\n  };\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.85],
            "secondaryColor": [0.95, 0.45, 0.2],
            "fParam": 0.0545, "kParam": 0.062
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 24,000 Turing Spot-Labyrinth Spherical Points
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const rad = 6.5 + Math.sin(th * 8.0) * Math.cos(ph * 8.0) * 1.2;

        pPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = rad * Math.cos(ph);

        const col = c1.clone().lerp(c2, (rad - 5.3) / 2.4);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const turing = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(turing);

      scene.userData = { group, turing, params };""",
        "renderBody": """      data.turing.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
