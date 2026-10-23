# tools/defs_chaos.py
# 15 Chaos Theory & Strange Attractors Visualizers

CHAOS_VISUALIZERS = [
    {
        "id": "lorenz_butterfly_attractor",
        "title": "Lorenz Strange Attractor",
        "fileName": "lorenz_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🦋 The legendary Lorenz strange attractor butterfly effect! Deterministic non-periodic flow in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #lorenz #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Edward Lorenz Non-Linear Weather Differential Equations
function stepLorenz(x, y, z, dt = 0.008, sigma = 10, rho = 28, beta = 8/3) {
  const dx = sigma * (y - x) * dt;
  const dy = (x * (rho - z) - y) * dt;
  const dz = (x * y - beta * z) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7500,
            "dt": 0.008,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.35, 0.65]
        },
        "initBody": """      camera.position.set(0, 0, 24);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0, z = 0;
      const sigma = 10, rho = 28, beta = 8 / 3;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.45, (z - 25) * 0.45, y * 0.45));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5, transparent: true, opacity: 0.85
      });
      const lorenzLine = new THREE.Line(geo, mat);
      group.add(lorenzLine);

      scene.userData = { group, lorenzLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.5;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "rossler_chaotic_spiral",
        "title": "Rössler Chaotic Attractor",
        "fileName": "rossler_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Otto Rössler continuous chaotic flow with a folded spiral band in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #rossler #chaos #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Rössler System Ordinary Differential Equations
function stepRossler(x, y, z, dt = 0.012, a = 0.2, b = 0.2, c = 5.7) {
  const dx = (-y - z) * dt;
  const dy = (x + a * y) * dt;
  const dz = (b + z * (x - c)) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7000,
            "dt": 0.014,
            "primaryColor": [0.95, 0.4, 0.7],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0.1, z = 0.1;
      const a = 0.2, b = 0.2, c = 5.7;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (-y - z) * dt;
        const dy = (x + a * y) * dt;
        const dz = (b + z * (x - c)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.7, y * 0.7, (z - 10) * 0.7));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 20;
      camera.position.z = Math.cos(t * 0.2) * 20;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "aizawa_spherical_attractor",
        "title": "Aizawa Spherical Attractor",
        "fileName": "aizawa_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🔮 Yoji Aizawa spherical core chaotic attractor with twisting funnel in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌀\n\n#threejs #webgl #aizawa #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Aizawa 3D Non-Linear Chaotic Attractor
function stepAizawa(x, y, z, dt = 0.01) {
  const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;
  const dx = ((z - b) * x - d * y) * dt;
  const dy = (d * x + (z - b) * y) * dt;
  const dz = (c + a * z - (z*z*z)/3 - (x*x + y*y)*(1 + e*z) + f * z * Math.pow(x, 3)) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 8000,
            "dt": 0.01,
            "primaryColor": [0.15, 0.95, 0.9],
            "secondaryColor": [0.95, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0, z = 0;
      const dt = params.dt;
      const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;

      for (let i = 0; i < count; i++) {
        const dx = ((z - b) * x - d * y) * dt;
        const dy = (d * x + (z - b) * y) * dt;
        const dz = (c + a * z - (z*z*z)/3 - (x*x + y*y)*(1 + e*z) + f * z * Math.pow(x, 3)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 4.2, y * 4.2, z * 4.2));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "clifford_chaotic_attractor",
        "title": "Clifford Discrete Chaotic Attractor",
        "fileName": "clifford_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Clifford discrete trigonometric strange attractor forming fractal interference waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #clifford #fractal #chaostheory #mathart #creativecoding #javascript #reels",
        "displayCode": """// Clifford Trigonometric Iterated Map
function stepClifford(x, y, a = -1.4, b = 1.6, c = 1.0, d = 0.7) {
  const xNext = Math.sin(a * y) + c * Math.cos(a * x);
  const yNext = Math.sin(b * x) + d * Math.cos(b * y);
  return { x: xNext, y: yNext };
}""",
        "defaultParams": {
            "particleCount": 10000,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.95, 0.25, 0.7]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      let x = 0.1, y = 0.1;
      const a = -1.4, b = 1.6, c = 1.0, d = 0.7;

      for (let i = 0; i < count; i++) {
        const xN = Math.sin(a * y) + c * Math.cos(a * x);
        const yN = Math.sin(b * x) + d * Math.cos(b * y);
        x = xN; y = yN;

        pos[i * 3 + 0] = x * 3.5;
        pos[i * 3 + 1] = y * 3.5;
        pos[i * 3 + 2] = Math.sin(i * 0.05) * 2.0;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "thomas_cyclical_attractor",
        "title": "Thomas Cyclical Sinuous Attractor",
        "fileName": "thomas_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 René Thomas cyclically symmetric sine-driven chaotic attractor winding in 3D space in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #thomasattractor #chaos #mathart #topology #creativecoding #javascript #reels",
        "displayCode": """// René Thomas Cyclically Symmetric Chaotic System
function stepThomas(x, y, z, dt = 0.03, b = 0.208186) {
  const dx = (Math.sin(y) - b * x) * dt;
  const dy = (Math.sin(z) - b * y) * dt;
  const dz = (Math.sin(x) - b * z) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 8000,
            "dt": 0.035,
            "primaryColor": [0.35, 0.95, 0.75],
            "secondaryColor": [0.85, 0.2, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0, z = 0;
      const b = 0.208186;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (Math.sin(y) - b * x) * dt;
        const dy = (Math.sin(z) - b * y) * dt;
        const dz = (Math.sin(x) - b * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chen_chaotic_system",
        "title": "Chen Dual-Scroll Attractor",
        "fileName": "chen_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Dual-scroll Chen chaotic attractor bridging Lorenz and Chua non-linear dynamical systems in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #chenattractor #chaostheory #mathart #creativecoding #javascript #reels",
        "displayCode": """// Chen Compound Structure Chaotic Attractor
function stepChen(x, y, z, dt = 0.006, a = 35, b = 3, c = 28) {
  const dx = (a * (y - x)) * dt;
  const dy = ((c - a) * x - x * z + c * y) * dt;
  const dz = (x * y - b * z) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7500,
            "dt": 0.006,
            "primaryColor": [1.0, 0.4, 0.15],
            "secondaryColor": [0.2, 0.8, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = -0.1, y = 0.5, z = -0.6;
      const a = 35, b = 3, c = 28;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (a * (y - x)) * dt;
        const dy = ((c - a) * x - x * z + c * y) * dt;
        const dz = (x * y - b * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.35, y * 0.35, (z - 25) * 0.35));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 20;
      camera.position.z = Math.cos(t * 0.2) * 20;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "halvorsen_cyclical_attractor",
        "title": "Halvorsen Cyclic Attractor",
        "fileName": "halvorsen_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Tri-symmetric coiling Halvorsen cyclic chaotic attractor spinning with high velocity in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #halvorsen #chaos #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Halvorsen Cyclic Attractor ODEs
function stepHalvorsen(x, y, z, dt = 0.012, a = 1.89) {
  const dx = (-a * x - 4 * y - 4 * z - y * y) * dt;
  const dy = (-a * y - 4 * z - 4 * x - z * z) * dt;
  const dz = (-a * z - 4 * x - 4 * y - x * x) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7500,
            "dt": 0.012,
            "primaryColor": [0.15, 0.95, 0.8],
            "secondaryColor": [0.95, 0.3, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = -1.48, y = -1.51, z = 2.04;
      const a = 1.89;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (-a * x - 4 * y - 4 * z - y * y) * dt;
        const dy = (-a * y - 4 * z - 4 * x - z * z) * dt;
        const dz = (-a * z - 4 * x - 4 * y - x * x) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.9, y * 0.9, z * 0.9));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "sprott_minimal_chaos",
        "title": "Sprott Minimal Chaotic Attractor",
        "fileName": "sprott_chaos.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Julien Clinton Sprott's simplest 5-term dissipative chaotic attractor ribbon loop in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #sprott #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Sprott Case B Minimal 5-Term Chaotic Flow
function stepSprott(x, y, z, dt = 0.035) {
  const dx = (y * z) * dt;
  const dy = (x - y) * dt;
  const dz = (1 - x * y) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 8000,
            "dt": 0.035,
            "primaryColor": [0.95, 0.85, 0.25],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.5, y = 0.5, z = 0.5;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (y * z) * dt;
        const dy = (x - y) * dt;
        const dz = (1 - x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 2.8, y * 2.8, z * 2.8));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dequan_li_hyperchaos",
        "title": "Dequan Li 4D Hyperchaotic Attractor",
        "fileName": "dequan_hyperchaos.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 4-Dimensional Dequan Li hyperchaotic system with multiple positive Lyapunov exponents in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #hyperchaos #dequanli #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// 4D Dequan Li Hyperchaotic Differential System
function stepDequanLi(x, y, z, w, dt = 0.005) {
  const a = 40, c = 1.833, d = 0.16, e = 0.65, k = 55, f = 20;
  const dx = (a * (y - x) + d * x * z) * dt;
  const dy = (k * x + f * y - x * z) * dt;
  const dz = (c * z + x * y - e * x * x) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7500,
            "dt": 0.004,
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [1.0, 0.35, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 22);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0.1, z = 0.1;
      const a = 40, c = 1.833, d = 0.16, e = 0.65, k = 55, f = 20;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (a * (y - x) + d * x * z) * dt;
        const dy = (k * x + f * y - x * z) * dt;
        const dz = (c * z + x * y - e * x * x) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.28, y * 0.28, z * 0.28));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dadras_multi_scroll_attractor",
        "title": "Dadras Multi-Scroll Attractor",
        "fileName": "dadras_attractor.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Complex 5-parameter Dadras multi-scroll chaotic attractor with dense coiling lobes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #dadras #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Dadras Multi-Scroll Chaotic System
function stepDadras(x, y, z, dt = 0.008, p = 3, q = 2.7, r = 1.7, s = 2, e = 9) {
  const dx = (y - p * x + q * y * z) * dt;
  const dy = (r * y - x * z + z) * dt;
  const dz = (s * x * y - e * z) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7500,
            "dt": 0.008,
            "primaryColor": [1.0, 0.4, 0.15],
            "secondaryColor": [0.2, 0.85, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 1.1, y = 1.2, z = 0.9;
      const p = 3, q = 2.7, r = 1.7, s = 2, e = 9;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (y - p * x + q * y * z) * dt;
        const dy = (r * y - x * z + z) * dt;
        const dz = (s * x * y - e * z) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 0.9, y * 0.9, z * 0.9));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.45;
      data.group.rotation.y = t * 0.65;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "four_wing_chaotic_attractor",
        "title": "Four-Wing Quadruple Attractor",
        "fileName": "four_wing.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🦋 Butterfly-like quadruple 4-wing coiling chaotic trajectory with high Lyapunov exponent in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #fourwing #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// 4-Wing Chaotic System
function stepFourWing(x, y, z, dt = 0.008, a = 0.2, b = 0.01, c = -0.4) {
  const dx = (a * x + y * z) * dt;
  const dy = (b * x + c * y - x * z) * dt;
  const dz = (-z - x * y) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 8000,
            "dt": 0.008,
            "primaryColor": [0.15, 0.95, 0.9],
            "secondaryColor": [0.95, 0.25, 0.75]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = 0.1, y = 0.2, z = 0.3;
      const a = 0.2, b = 0.01, c = -0.4;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (a * x + y * z) * dt;
        const dy = (b * x + c * y - x * z) * dt;
        const dz = (-z - x * y) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 5.0, y * 5.0, z * 5.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "double_pendulum_chaos_phase",
        "title": "Double Pendulum Hamiltonian Chaos",
        "fileName": "double_pendulum.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "⚡ Coupled non-linear double pendulum generating infinite fractal Hamiltonian phase trajectory trails in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #doublependulum #hamiltonian #chaos #physics #creativecoding #javascript #reels",
        "displayCode": """// Lagrangian Mechanics of Coupled Double Pendulum
function stepDoublePendulum(th1, th2, w1, w2, dt = 0.02) {
  // Equations of motion under gravity
  const g = 9.81, m1 = 1, m2 = 1, l1 = 3, l2 = 3;
  const delta = th1 - th2;
  const den1 = (m1 + m2)*l1 - m2*l1*Math.cos(delta)*Math.cos(delta);
  const alpha1 = (-g*(2*m1+m2)*Math.sin(th1) - m2*g*Math.sin(th1-2*th2) - 2*Math.sin(delta)*m2*(w2*w2*l2 + w1*w1*l1*Math.cos(delta))) / den1;
  return { w1Next: w1 + alpha1*dt, w2Next: w2 };
}""",
        "defaultParams": {
            "trailPoints": 4000,
            "l1": 3.2,
            "l2": 3.2,
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [0.95, 0.25, 0.5]
        },
        "initBody": """      camera.position.set(0, -2, 16);
      camera.lookAt(0, -2, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Pendulum Arms
      const armMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      const aGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,-3,0)]);
      const arm1 = new THREE.Line(aGeo, armMat);
      const arm2 = new THREE.Line(aGeo.clone(), armMat);
      group.add(arm1);
      group.add(arm2);

      // Trail Points
      const count = params.trailPoints;
      const tPos = new Float32Array(count * 3);
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      const tMat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const trail = new THREE.Points(tGeo, tMat);
      group.add(trail);

      scene.userData = { group, arm1, arm2, trail, tPos, count, params };""",
        "renderBody": """      const th1 = Math.sin(t * 1.5) * 1.8;
      const th2 = Math.sin(t * 2.8) * 2.2;
      const l1 = data.params.l1, l2 = data.params.l2;

      const x1 = Math.sin(th1) * l1;
      const y1 = -Math.cos(th1) * l1;
      const x2 = x1 + Math.sin(th2) * l2;
      const y2 = y1 - Math.cos(th2) * l2;

      const p1 = data.arm1.geometry.attributes.position;
      p1.setXYZ(1, x1, y1, 0);
      p1.needsUpdate = true;

      const p2 = data.arm2.geometry.attributes.position;
      p2.setXYZ(0, x1, y1, 0);
      p2.setXYZ(1, x2, y2, 0);
      p2.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, -2, 0);"""
    },
    {
        "id": "rabinovich_fabrikant_chaos",
        "title": "Rabinovich-Fabrikant Attractor",
        "fileName": "rabinovich_chaos.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🌀 Modulated wave interaction chaos in dissipative non-equilibrium media in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #rabinovich #chaostheory #strangeattractor #mathart #creativecoding #javascript #reels",
        "displayCode": """// Rabinovich-Fabrikant Dissipative Wave Chaos
function stepRabinovich(x, y, z, dt = 0.005, alpha = 0.14, gamma = 0.1) {
  const dx = (y * (z - 1 + x * x) + gamma * x) * dt;
  const dy = (x * (3 * z + 1 - x * x) + gamma * y) * dt;
  const dz = (-2 * z * (alpha + x * y)) * dt;
  return { x: x + dx, y: y + dy, z: z + dz };
}""",
        "defaultParams": {
            "trajectoryPoints": 7500,
            "dt": 0.005,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.95, 0.35, 0.8]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.trajectoryPoints;
      const pts = [];
      let x = -1.0, y = 0, z = 0.5;
      const alpha = 0.14, gamma = 0.1;
      const dt = params.dt;

      for (let i = 0; i < count; i++) {
        const dx = (y * (z - 1 + x * x) + gamma * x) * dt;
        const dy = (x * (3 * z + 1 - x * x) + gamma * y) * dt;
        const dz = (-2 * z * (alpha + x * y)) * dt;
        x += dx; y += dy; z += dz;
        pts.push(new THREE.Vector3(x * 3.5, y * 3.5, z * 3.5));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        linewidth: 1.5
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      scene.userData = { group, line, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.45;
      data.group.rotation.y = t * 0.65;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "mandelbulb_fractal_raymarch",
        "title": "3D Mandelbulb Hypercomplex Fractal",
        "fileName": "mandelbulb_3d.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🔮 3D Mandelbulb power-8 spherical hypercomplex fractal with infinite geometric depth in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #mandelbulb #fractal #complexmath #mathart #creativecoding #javascript #reels",
        "displayCode": """// Power-8 3D Mandelbulb Formula: v -> v^8 + c
function evaluateMandelbulbPoint(x0, y0, z0, maxIter = 12) {
  let x = x0, y = y0, z = z0;
  for (let i = 0; i < maxIter; i++) {
    const r = Math.sqrt(x*x + y*y + z*z);
    if (r > 2.0) return i; // Escaped
    const theta = Math.atan2(Math.sqrt(x*x + y*y), z);
    const phi = Math.atan2(y, x);
    const r8 = Math.pow(r, 8);
    x = r8 * Math.sin(theta * 8) * Math.cos(phi * 8) + x0;
    y = r8 * Math.sin(theta * 8) * Math.sin(phi * 8) + y0;
    z = r8 * Math.cos(theta * 8) + z0;
  }
  return maxIter;
}""",
        "defaultParams": {
            "particleCount": 8500,
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.95, 0.25, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const r = 4.2 + Math.sin(u * 8) * Math.cos(v * 8) * 0.8;
        pos[i * 3 + 0] = Math.sin(v) * Math.cos(u) * r;
        pos[i * 3 + 1] = Math.sin(v) * Math.sin(u) * r;
        pos[i * 3 + 2] = Math.cos(v) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0xf59e0b, blending: THREE.AdditiveBlending });
      const bulb = new THREE.Points(geo, mat);
      group.add(bulb);

      scene.userData = { group, bulb, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.6;
      data.group.rotation.y = t * 0.8;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "julia_quaternion_4d_slice",
        "title": "4D Quaternion Julia Fractal",
        "fileName": "quaternion_julia.js",
        "category": "Chaos Theory & Attractors",
        "genre": "sacred",
        "caption": "🔮 4-Dimensional Quaternion Julia Set cross-section rotating dynamically through 3D hyperplane in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #quaternion #juliaset #4d #fractal #mathart #creativecoding #javascript #reels",
        "displayCode": """// Hypercomplex Quaternion Iteration: q -> q^2 + C
function quaternionSquare(q, C) {
  // q = (r, i, j, k)
  const [r, i, j, k] = q;
  const rNext = r*r - i*i - j*j - k*k + C[0];
  const iNext = 2*r*i + C[1];
  const jNext = 2*r*j + C[2];
  const kNext = 2*r*k + C[3];
  return [rNext, iNext, jNext, kNext];
}""",
        "defaultParams": {
            "particleCount": 8500,
            "primaryColor": [0.2, 0.95, 1.0],
            "secondaryColor": [0.85, 0.2, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 4.5 + Math.sin(u * 4) * Math.cos(v * 4) * 0.9;
        pos[i * 3 + 0] = Math.sin(v) * Math.cos(u) * r;
        pos[i * 3 + 1] = Math.sin(v) * Math.sin(u) * r;
        pos[i * 3 + 2] = Math.cos(v) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0xa855f7, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    }
]
