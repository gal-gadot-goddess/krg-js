# tools/defs_new_chaos.py
# 15 Chaotic Oscillators, Non-Linear Dynamics & Bifurcations Visualizers (IDs 161-175)

DEFS_CHAOS = [
    {
        "id": "arnold_tongue_circle_map",
        "title": "Arnold Tongue Circle Map Devil's Staircase Mode-Locking",
        "fileName": "arnold_tongue.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Arnold tongues & fractal Devil's staircase frequency mode-locking in coupled non-linear phase oscillators in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #arnoldtongue #circlemap #chaostheory #fractal #mathart #creativecoding #javascript #reels",
        "displayCode": "// Standard Arnold Circle Map Iteration\nfunction stepCircleMap(theta, Omega = 0.606, K = 0.95) {\n  // theta_{n+1} = theta_n + Omega - (K / 2*PI) * sin(2*PI * theta_n)\n  return (theta + Omega - (K / (2 * Math.PI)) * Math.sin(2 * Math.PI * theta)) % 1.0;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.7],
            "secondaryColor": [1.0, 0.25, 0.6],
            "orbitCount": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.orbitCount;
      const pts = [];
      let th = 0.1;
      const K = 0.98;
      const Omega = 0.606;

      for (let i = 0; i < count; i++) {
        th = (th + Omega - (K / (2 * Math.PI)) * Math.sin(2 * Math.PI * th));
        const angle = th * Math.PI * 2;
        const rad = 4.5 + Math.sin(angle * 3) * 0.8;
        const z = (i / count - 0.5) * 10.0;
        pts.push(Math.cos(angle) * rad, z, Math.sin(angle) * rad);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const tongues = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.15, blending: THREE.AdditiveBlending
      }));
      group.add(tongues);

      scene.userData = { group, tongues, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "duffing_chaotic_oscillator",
        "title": "Driven Non-Linear Duffing Oscillator Strange Attractor",
        "fileName": "duffing_oscillator.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Driven non-linear Duffing double-well potential chaotic phase space trajectories in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💫\n\n#threejs #webgl #duffing #chaostheory #strangeattractor #nonlinear #mathart #creativecoding #javascript #reels",
        "displayCode": "// Driven Duffing Differential Equations\nfunction stepDuffing(x, v, t, delta = 0.3, alpha = -1, beta = 1, gamma = 0.5, omega = 1.2) {\n  const dx = v;\n  const dv = -delta * v - alpha * x - beta * Math.pow(x, 3) + gamma * Math.cos(omega * t);\n  return { dx, dv };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.45, 0.15],
            "secondaryColor": [0.2, 0.85, 1.0],
            "points": 8000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.1, v = 0.0;
      const dt = 0.02;
      const delta = 0.25, alpha = -1.0, beta = 1.0, gamma = 0.45, omega = 1.2;

      for (let i = 0; i < count; i++) {
        const time = i * dt;
        const dx = v * dt;
        const dv = (-delta * v - alpha * x - beta * Math.pow(x, 3) + gamma * Math.cos(omega * time)) * dt;
        x += dx; v += dv;
        pts.push(new THREE.Vector3(x * 3.5, v * 3.5, Math.sin(omega * time) * 3.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const duffingLine = new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: c1, transparent: true, opacity: 0.85, linewidth: 1.5
      }));
      group.add(duffingLine);

      scene.userData = { group, duffingLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "van_der_pol_relaxation_oscillator",
        "title": "Van der Pol Stiff Non-Linear Limit Cycle Oscillator",
        "fileName": "vanderpol_oscillator.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Balthasar van der Pol non-conservative limit cycle relaxation oscillations in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #vanderpol #limitcycle #chaostheory #dynamics #mathart #creativecoding #javascript #reels",
        "displayCode": "// Van der Pol Non-Linear Oscillator\nfunction stepVanDerPol(x, y, dt = 0.015, mu = 2.5) {\n  const dx = y * dt;\n  const dy = (mu * (1 - x * x) * y - x) * dt;\n  return { x: x + dx, y: y + dy };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 0.4],
            "secondaryColor": [0.95, 0.25, 0.8],
            "steps": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 0.1, y = 0.1;
      const dt = 0.01;
      const mu = 2.5;

      for (let i = 0; i < count; i++) {
        const dx = y * dt;
        const dy = (mu * (1 - x*x) * y - x) * dt;
        x += dx; y += dy;
        const z = (i / count - 0.5) * 8.0;
        pts.push(new THREE.Vector3(x * 2.5, y * 1.5, z));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const vdpLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(vdpLine);

      scene.userData = { group, vdpLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "ikedamap_optical_cavity_chaos",
        "title": "Ikeda Optical Ring Cavity Laser Chaos Map",
        "fileName": "ikeda_chaos.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Kensuke Ikeda's non-linear laser ring cavity attractor folding light into infinite fractal spirals in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #ikeda #opticalchaos #laser #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": "// Ikeda 2D Complex Laser Cavity Map\nfunction stepIkeda(x, y, u = 0.9, R = 1.0, C1 = 0.4, C2 = 0.9) {\n  const tau = C1 - C2 / (1 + x * x + y * y);\n  const xNew = R + u * (x * Math.cos(tau) - y * Math.sin(tau));\n  const yNew = u * (x * Math.sin(tau) + y * Math.cos(tau));\n  return { x: xNew, y: yNew };\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.25, 0.55],
            "secondaryColor": [0.2, 0.8, 1.0],
            "points": 9000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.1, y = 0.1;
      const u = 0.9, R = 1.0, C1 = 0.4, C2 = 9.0;

      for (let i = 0; i < count; i++) {
        const tau = C1 - C2 / (1.0 + x*x + y*y);
        const xn = R + u * (x * Math.cos(tau) - y * Math.sin(tau));
        const yn = u * (x * Math.sin(tau) + y * Math.cos(tau));
        x = xn; y = yn;
        pts.push((x - 1.0) * 4.2, y * 4.2, Math.sin(i * 0.05) * 3.5);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const ikedaPoints = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.15, blending: THREE.AdditiveBlending
      }));
      group.add(ikedaPoints);

      scene.userData = { group, ikedaPoints, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chua_circuit_double_scroll",
        "title": "Chua's Electronic Circuit Double-Scroll Strange Attractor",
        "fileName": "chua_circuit.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "⚡ Leon Chua's classic electronic chaotic circuit with piecewise-linear negative diode generating infinite double-scroll loops in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🌀\n\n#threejs #webgl #chuacircuit #doublescroll #chaostheory #electronics #mathart #creativecoding #javascript #reels",
        "displayCode": "// Chua's Piecewise-Linear Circuit Equations\nfunction stepChua(x, y, z, alpha = 15.6, beta = 28, m0 = -1.143, m1 = -0.714) {\n  const f = m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1));\n  const dx = alpha * (y - x - f);\n  const dy = x - y + z;\n  const dz = -beta * y;\n  return { dx, dy, dz };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [1.0, 0.35, 0.15],
            "points": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.1, y = 0.0, z = 0.0;
      const dt = 0.006;
      const alpha = 15.6, beta = 28.0, m0 = -1.143, m1 = -0.714;

      for (let i = 0; i < count; i++) {
        const f = m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1));
        const dx = alpha * (y - x - f) * dt;
        const dy = (x - y + z) * dt;
        const dz = (-beta * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.5, y * 3.5, z * 3.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const chuaLine = new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: c1, transparent: true, opacity: 0.85, linewidth: 1.5
      }));
      group.add(chuaLine);

      scene.userData = { group, chuaLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "anokhin_neural_attractor",
        "title": "Biological Neural Synchronization Multi-Stable Chaos Attractor",
        "fileName": "anokhin_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🧠 Multi-stable cortical neural synchrony attractor switching between cognitive perception basins in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #neuralattractor #neuroscience #chaostheory #cognitive #mathart #creativecoding #javascript #reels",
        "displayCode": "// Neural Functional System Functional Attractor\nfunction stepNeuralChaos(x, y, z, dt = 0.008) {\n  const dx = (y - Math.sin(z) * x) * dt;\n  const dy = (z - Math.cos(x) * y) * dt;\n  const dz = (0.2 * x * y - 0.7 * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.65, 0.25, 1.0],
            "secondaryColor": [0.2, 0.9, 0.95],
            "steps": 8000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 0.2, y = 0.1, z = 0.1;
      const dt = 0.008;

      for (let i = 0; i < count; i++) {
        const dx = (y - Math.sin(z) * x) * dt;
        const dy = (z - Math.cos(x) * y) * dt;
        const dz = (0.25 * x * y - 0.65 * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.8, y * 3.8, z * 3.8));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const neuralLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(neuralLine);

      scene.userData = { group, neuralLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "lorenz_84_hadley_circulation",
        "title": "Lorenz-84 Atmospheric Hadley Cell Climate Chaos",
        "fileName": "lorenz_84.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌪️ Edward Lorenz's 1984 low-order general atmospheric circulation model with baroclinic planetary jet stream chaos in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌍\n\n#threejs #webgl #lorenz84 #meteorology #hadleycell #chaostheory #mathart #creativecoding #javascript #reels",
        "displayCode": "// Lorenz 1984 Atmospheric Differential Equations\nfunction stepLorenz84(x, y, z, a = 0.25, b = 4.0, F = 8.0, G = 1.0, dt = 0.005) {\n  const dx = (-y*y - z*z - a*x + a*F) * dt;\n  const dy = (x*y - b*x*z - y + G) * dt;\n  const dz = (b*x*y + x*z - z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.7, 1.0],
            "secondaryColor": [1.0, 0.5, 0.15],
            "steps": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 1.0, y = 1.0, z = 1.0;
      const dt = 0.004;
      const a = 0.25, b = 4.0, F = 8.0, G = 1.0;

      for (let i = 0; i < count; i++) {
        const dx = (-y*y - z*z - a*x + a*F) * dt;
        const dy = (x*y - b*x*z - y + G) * dt;
        const dz = (b*x*y + x*z - z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 2.5, y * 2.5, z * 2.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const l84Line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(l84Line);

      scene.userData = { group, l84Line, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "burke_shaw_chaotic_system",
        "title": "Burke-Shaw Symmetrical Inverted Twin Spiral Attractor",
        "fileName": "burke_shaw.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Burke-Shaw chaotic attractor with symmetrical twin spiral wings executing rapid topological transitions in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💫\n\n#threejs #webgl #burkeshaw #strangeattractor #chaostheory #nonlinear #mathart #creativecoding #javascript #reels",
        "displayCode": "// Burke-Shaw Chaotic System Equations\nfunction stepBurkeShaw(x, y, z, s = 10, v = 4.272, dt = 0.005) {\n  const dx = -s * (x + y) * dt;\n  const dy = (-y - s * x * z) * dt;\n  const dz = (s * x * y + v) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.3, 0.45],
            "secondaryColor": [0.2, 0.9, 0.85],
            "points": 8000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.6, y = 0.6, z = 0.6;
      const dt = 0.003;
      const s = 10.0, v = 4.272;

      for (let i = 0; i < count; i++) {
        const dx = -s * (x + y) * dt;
        const dy = (-y - s * x * z) * dt;
        const dz = (s * x * y + v) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.8, (z - 2.5) * 3.8, y * 3.8));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const bsLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(bsLine);

      scene.userData = { group, bsLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "langford_cylinder_chaos",
        "title": "Langford Toroidal Invariant Cylindrical Knot Attractor",
        "fileName": "langford_chaos.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 William Langford's toroidal cylinder chaos system winding invariant particle streamlines in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #langford #chaostheory #torus #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": "// Langford Toroidal Chaos Differential Equations\nfunction stepLangford(x, y, z, a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1, dt = 0.008) {\n  const dx = ((z - b) * x - d * y) * dt;\n  const dy = (d * x + (z - b) * y) * dt;\n  const dz = (c + a * z - (z*z*z) / 3 - (x*x + y*y) * (1 + e * z) + f * z * Math.pow(x, 3)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.15, 0.95, 0.65],
            "secondaryColor": [0.95, 0.35, 0.85],
            "steps": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.006;
      const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;

      for (let i = 0; i < count; i++) {
        const dx = ((z - b) * x - d * y) * dt;
        const dy = (d * x + (z - b) * y) * dt;
        const dz = (c + a * z - (z*z*z)/3.0 - (x*x + y*y) * (1 + e * z) + f * z * Math.pow(x, 3)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 5.0, y * 5.0, (z - 1.2) * 5.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const lLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(lLine);

      scene.userData = { group, lLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "volterra_lotka_predator_prey_3d",
        "title": "3-Species Lotka-Volterra Competitive Ecosystem Limit Cycle",
        "fileName": "lotka_volterra_3d.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🐺 3-Species competitive predator-prey dynamics cycling through 3D ecological phase space limit cycles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌿\n\n#threejs #webgl #lotkavolterra #predatorprey #ecology #dynamicalsystems #mathart #creativecoding #javascript #reels",
        "displayCode": "// 3-Species Lotka-Volterra Ecosystem Matrix\nfunction stepLotkaVolterra(x, y, z, dt = 0.01) {\n  const dx = x * (1.0 - x - 0.5 * y - 0.5 * z) * dt;\n  const dy = y * (1.0 - 0.5 * x - y - 0.5 * z) * dt;\n  const dz = z * (1.0 - 0.5 * x - 0.5 * y - z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.5],
            "secondaryColor": [1.0, 0.3, 0.2],
            "steps": 7500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 0.3, y = 0.2, z = 0.5;
      const dt = 0.02;

      for (let i = 0; i < count; i++) {
        const dx = x * (1.0 - x - 1.2 * y - 0.2 * z) * dt;
        const dy = y * (1.0 - 0.2 * x - y - 1.2 * z) * dt;
        const dz = z * (1.0 - 1.2 * x - 0.2 * y - z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3((x - 0.3) * 12.0, (y - 0.3) * 12.0, (z - 0.3) * 12.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const lvLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(lvLine);

      scene.userData = { group, lvLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hindmarsh_rose_bursting_neuron",
        "title": "Hindmarsh-Rose Chaotic Bursting Neuron Phase Space",
        "fileName": "hindmarsh_rose.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "⚡ Chaotic bursting spike trains in the Hindmarsh-Rose 3D biological membrane potential model in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🧠\n\n#threejs #webgl #hindmarshrose #neuroscience #actionpotential #chaostheory #mathart #creativecoding #javascript #reels",
        "displayCode": "// Hindmarsh-Rose Bursting Membrane Equations\nfunction stepHindmarshRose(x, y, z, I = 3.2, dt = 0.01) {\n  const dx = (y - x*x*x + 3.0*x*x - z + I) * dt;\n  const dy = (1.0 - 5.0*x*x - y) * dt;\n  const dz = (0.006 * (4.0 * (x + 1.6) - z)) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.75, 0.15],
            "secondaryColor": [0.2, 0.85, 1.0],
            "steps": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = -1.3, y = -1.0, z = 1.0;
      const dt = 0.015;
      const I = 3.25;

      for (let i = 0; i < count; i++) {
        const dx = (y - x*x*x + 3.0*x*x - z + I) * dt;
        const dy = (1.0 - 5.0*x*x - y) * dt;
        const dz = (0.006 * (4.0 * (x + 1.6) - z)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.5, y * 0.8, (z - 2.5) * 3.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const hrLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(hrLine);

      scene.userData = { group, hrLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "newton_leipnik_two_scroll",
        "title": "Newton-Leipnik Symmetrical Twin Ellipsoid Chaotic Attractor",
        "fileName": "newton_leipnik.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Rigid body gyroscope instability producing the Newton-Leipnik twin ellipsoid chaotic attractor in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💫\n\n#threejs #webgl #newtonleipnik #strangeattractor #chaostheory #mechanics #mathart #creativecoding #javascript #reels",
        "displayCode": "// Newton-Leipnik Rigid Gyroscope System\nfunction stepNewtonLeipnik(x, y, z, a = 0.4, b = 0.175, dt = 0.008) {\n  const dx = (-a * x + y + 10 * y * z) * dt;\n  const dy = (-x - 0.4 * y + 5 * x * z) * dt;\n  const dz = (b * z - 5 * x * y) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.85, 1.0],
            "secondaryColor": [1.0, 0.25, 0.7],
            "points": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.349, y = 0.0, z = -0.16;
      const dt = 0.008;
      const a = 0.4, b = 0.175;

      for (let i = 0; i < count; i++) {
        const dx = (-a * x + y + 10.0 * y * z) * dt;
        const dy = (-x - 0.4 * y + 5.0 * x * z) * dt;
        const dz = (b * z - 5.0 * x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 12.0, y * 12.0, z * 12.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const nlLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(nlLine);

      scene.userData = { group, nlLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "rikitake_geomagnetic_dynamo",
        "title": "Rikitake Two-Disk Dynamo Earth Magnetic Field Reversal",
        "fileName": "rikitake_dynamo.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌍 Chaotic geomagnetic dipole pole reversals simulated by the Rikitake coupled two-disk dynamo in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🧲\n\n#threejs #webgl #rikitake #geodynamo #magneticreversal #chaostheory #mathart #creativecoding #javascript #reels",
        "displayCode": "// Rikitake Two-Disk Dynamo System\nfunction stepRikitake(x, y, z, mu = 1.0, a = 5.0, dt = 0.008) {\n  const dx = (-mu * x + y * z) * dt;\n  const dy = (-mu * y + x * (z - a)) * dt;\n  const dz = (1.0 - x * y) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.4, 0.15],
            "secondaryColor": [0.2, 0.7, 1.0],
            "points": 8000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.008;
      const mu = 1.0, a = 5.0;

      for (let i = 0; i < count; i++) {
        const dx = (-mu * x + y * z) * dt;
        const dy = (-mu * y + x * (z - a)) * dt;
        const dz = (1.0 - x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 1.5, (z - 5) * 1.5, y * 1.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const rLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(rLine);

      scene.userData = { group, rLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "genesio_tesi_chaotic_oscillator",
        "title": "Genesio-Tesi Polynomial Chaotic Attractor Ribbon",
        "fileName": "genesio_tesi.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Third-order autonomous polynomial Genesio-Tesi chaotic attractor folding into continuous ribbon loops in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #genesiosi #strangeattractor #chaostheory #polynomial #mathart #creativecoding #javascript #reels",
        "displayCode": "// Genesio-Tesi Chaotic Differential Equations\nfunction stepGenesioTesi(x, y, z, a = 0.44, b = 1.1, c = 1.0, dt = 0.015) {\n  const dx = y * dt;\n  const dy = z * dt;\n  const dz = (-c * x - b * y - a * z + x * x) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [0.85, 0.3, 1.0],
            "secondaryColor": [0.2, 0.95, 0.85],
            "steps": 8000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.steps;
      const pts = [];

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.015;
      const a = 0.44, b = 1.1, c = 1.0;

      for (let i = 0; i < count; i++) {
        const dx = y * dt;
        const dy = z * dt;
        const dz = (-c * x - b * y - a * z + x * x) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 4.5, y * 4.5, z * 4.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const gtLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(gtLine);

      scene.userData = { group, gtLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.25) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tsucs_chaotic_attractor",
        "title": "Three-Scroll Unified Chaotic System (TSUCS) Tri-Wing",
        "fileName": "tsucs_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Three-scroll unified chaotic system (TSUCS) generating tri-fold interlocking chaotic wings in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #tsucs #threescroll #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": "// Three-Scroll Unified Chaotic System\nfunction stepTSUCS(x, y, z, a = 40, b = 0.833, c = 20, d = 0.5, e = 0.65, dt = 0.005) {\n  const dx = (a * (y - x) + d * x * z) * dt;\n  const dy = (c * x - x * z + e * y) * dt;\n  const dz = (x * y - b * z) * dt;\n  return { x: x + dx, y: y + dy, z: z + dz };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.25, 0.75, 1.0],
            "points": 8500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const count = params.points;
      const pts = [];

      let x = 0.1, y = 0.1, z = 0.1;
      const dt = 0.003;
      const a = 40.0, b = 0.833, c = 20.0, d = 0.5, e = 0.65;

      for (let i = 0; i < count; i++) {
        const dx = (a * (y - x) + d * x * z) * dt;
        const dy = (c * x - x * z + e * y) * dt;
        const dz = (x * y - b * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.55, (z - 25) * 0.55, y * 0.55));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const tsucsLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.85 }));
      group.add(tsucsLine);

      scene.userData = { group, tsucsLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    }
]
