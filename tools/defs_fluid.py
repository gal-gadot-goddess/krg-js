# tools/defs_fluid.py
# 10 Fluid Dynamics, Plasma & Energetic Fields Visualizers

FLUID_VISUALIZERS = [
    {
        "id": "navier_stokes_vortex_tube",
        "title": "Navier-Stokes Vortex Tube",
        "fileName": "vortex_tube.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "🌪️ 3D Navier-Stokes turbulent vortex core stretching & vorticity filament dynamics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌊⚡\n\n#threejs #webgl #fluidmechanics #navierstokes #turbulence #creativecoding #javascript #vfx #reels",
        "displayCode": """// Biot-Savart Law Induced Fluid Velocity
function computeVorticityVelocity(point, filamentCurve, gamma = 4.2) {
  // Line integral v = (gamma / 4*pi) * integral (dl x r) / |r|^3
  const vel = new THREE.Vector3();
  const dl = filamentCurve.getTangent(0);
  vel.crossVectors(dl, point).normalize().multiplyScalar(gamma);
  return vel;
}""",
        "defaultParams": {
            "vortexParticles": 8000,
            "tubeRadius": 3.5,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [0.95, 0.3, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.vortexParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 14;
        const r = 1.0 + Math.pow(Math.random(), 2.0) * params.tubeRadius;
        pos[i * 3 + 0] = Math.cos(u) * r;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(u) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const vortex = new THREE.Points(geo, mat);
      group.add(vortex);

      scene.userData = { group, vortex, params };""",
        "renderBody": """      data.group.rotation.y = t * 1.5;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "curl_noise_turbulent_smoke",
        "title": "Curl Noise Incompressible Flow",
        "fileName": "curl_noise.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "💨 Divergence-free 3D curl noise velocity field advecting 8,000 fluid smoke particles in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌊\n\n#threejs #webgl #curlnoise #fluidsimulation #vfx #creativecoding #javascript #mathart #reels",
        "displayCode": """// Divergence-Free Incompressible Curl Velocity Field: v = curl(Psi)
function computeCurlNoise(x, y, z, eps = 0.01) {
  // v_x = dPsi_z/dy - dPsi_y/dz
  // v_y = dPsi_x/dz - dPsi_z/dx
  // v_z = dPsi_y/dx - dPsi_x/dy
  const vx = Math.sin(y * 0.5) * Math.cos(z * 0.5);
  const vy = Math.sin(z * 0.5) * Math.cos(x * 0.5);
  const vz = Math.sin(x * 0.5) * Math.cos(y * 0.5);
  return new THREE.Vector3(vx, vy, vz);
}""",
        "defaultParams": {
            "smokeParticles": 8500,
            "primaryColor": [0.2, 0.95, 0.9],
            "secondaryColor": [0.95, 0.3, 0.7]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.smokeParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, color: 0x2dd4bf, blending: THREE.AdditiveBlending });
      const smoke = new THREE.Points(geo, mat);
      group.add(smoke);

      scene.userData = { group, smoke, count, params };""",
        "renderBody": """      const pos = data.smoke.geometry.attributes.position;
      for (let i = 0; i < data.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        const vx = Math.sin(y * 0.4 + t) * 0.05;
        const vy = Math.cos(z * 0.4 + t) * 0.05;
        const vz = Math.sin(x * 0.4 + t) * 0.05;

        pos.setXYZ(i, x + vx, y + vy, z + vz);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "plasma_ball_arc_discharge",
        "title": "Plasma Globe Electric Arcs",
        "fileName": "plasma_globe.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "⚡ High-voltage dielectric breakdown gas filament arcs reaching outward to the glass sphere in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #plasma #electricity #lightning #scifi #creativecoding #javascript #reels",
        "displayCode": """// Stochastic Electric Discharge Filaments
function generateLightningArc(startPt, endPt, segments = 16, jitter = 0.4) {
  const points = [startPt];
  for (let s = 1; s < segments; s++) {
    const u = s / segments;
    const mid = startPt.clone().lerp(endPt, u);
    mid.add(new THREE.Vector3((Math.random()-0.5)*jitter, (Math.random()-0.5)*jitter, (Math.random()-0.5)*jitter));
    points.push(mid);
  }
  points.push(endPt);
  return points;
}""",
        "defaultParams": {
            "sphereRadius": 5.0,
            "arcCount": 16,
            "primaryColor": [0.85, 0.2, 0.95],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Glass globe
      const gGeo = new THREE.SphereGeometry(params.sphereRadius, 32, 32);
      const gMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.3 });
      const globe = new THREE.Mesh(gGeo, gMat);
      group.add(globe);

      // Core electrode
      const cGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(cGeo, cMat);
      group.add(core);

      scene.userData = { group, globe, core, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tesla_coil_corona_streamers",
        "title": "Tesla Coil Corona Discharge",
        "fileName": "tesla_coil.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "⚡ Resonant induction transformer releasing branching high-frequency electrical corona streamers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡⚡\n\n#threejs #webgl #teslacoil #lightning #physics #highvoltage #creativecoding #javascript #reels",
        "displayCode": """// Resonant Inductive Corona Branching Streamers
function buildTeslaStreamers(origin, length = 8.0, branches = 12) {
  const linePos = [];
  for (let b = 0; b < branches; b++) {
    const angle = (b / branches) * Math.PI * 2;
    let curr = origin.clone();
    for (let s = 0; s < 6; s++) {
      linePos.push(curr.x, curr.y, curr.z);
      curr.x += Math.cos(angle)*1.2 + (Math.random()-0.5)*0.6;
      curr.y += 1.0 + (Math.random()-0.5)*0.6;
      curr.z += Math.sin(angle)*1.2 + (Math.random()-0.5)*0.6;
      linePos.push(curr.x, curr.y, curr.z);
    }
  }
  return linePos;
}""",
        "defaultParams": {
            "toroidRadius": 3.5,
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [0.95, 0.4, 0.95]
        },
        "initBody": """      camera.position.set(0, 3, 16);
      camera.lookAt(0, 2, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Toroid top terminal
      const tGeo = new THREE.TorusGeometry(params.toroidRadius, 0.8, 16, 48);
      const tMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true });
      const toroid = new THREE.Mesh(tGeo, tMat);
      toroid.rotation.x = Math.PI / 2;
      toroid.position.y = 4;
      group.add(toroid);

      // Secondary coil
      const cGeo = new THREE.CylinderGeometry(0.8, 0.8, 6, 24, 1, true);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true });
      const coil = new THREE.Mesh(cGeo, cMat);
      coil.position.y = 0;
      group.add(coil);

      scene.userData = { group, toroid, coil, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.5;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 3 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 2, 0);"""
    },
    {
        "id": "fluid_vortex_ring_collision",
        "title": "Colliding Fluid Vortex Rings",
        "fileName": "vortex_collision.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "💨 Hydrodynamic collision and reconnection of two coaxial fluid vortex rings into turbulent instability waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌊⚡\n\n#threejs #webgl #fluiddynamics #vortex #hydrodynamics #creativecoding #javascript #reels",
        "displayCode": """// Coaxial Vortex Ring Hydrodynamic Collision
function stepVortexRings(ringA, ringB, time) {
  // Rings approach and expand radially via mutual induction
  const dist = Math.max(0.2, 5.0 - (time * 1.5) % 5.0);
  ringA.position.y = -dist;
  ringB.position.y = dist;
  const radius = 3.0 + (1.0 / dist) * 0.5;
  ringA.scale.set(radius, 1, radius);
  ringB.scale.set(radius, 1, radius);
}""",
        "defaultParams": {
            "particlesPerRing": 3500,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [1.0, 0.25, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particlesPerRing * 2;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const ring = i % 2 === 0 ? 1 : -1;
        const a = Math.random() * Math.PI * 2;
        const r = 3.5 + (Math.random() - 0.5) * 0.6;
        pos[i * 3 + 0] = Math.cos(a) * r;
        pos[i * 3 + 1] = ring * 3.0;
        pos[i * 3 + 2] = Math.sin(a) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const rings = new THREE.Points(geo, mat);
      group.add(rings);

      scene.userData = { group, rings, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "solar_wind_magnetosphere",
        "title": "Earth Dipole Magnetosphere Shield",
        "fileName": "magnetosphere.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "cosmic",
        "caption": "🌍 Planetary dipole magnetic field deflecting charged solar wind proton plasma into auroral cusps in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌🛡️\n\n#threejs #webgl #magnetosphere #spacephysics #earth #astronomy #creativecoding #javascript #reels",
        "displayCode": """// Planetary Dipole Magnetic Field: B(r, theta) = mu0*M / (4*pi*r^3)
function computeDipoleFieldLine(r0, theta) {
  const r = r0 * Math.pow(Math.sin(theta), 2); // Dipole equation r = r0 * sin^2(theta)
  const x = r * Math.sin(theta);
  const y = r * Math.cos(theta);
  return new THREE.Vector3(x, y, 0);
}""",
        "defaultParams": {
            "fieldLines": 16,
            "windParticles": 6000,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Earth sphere
      const eGeo = new THREE.SphereGeometry(1.8, 32, 32);
      const eMat = new THREE.MeshBasicMaterial({ color: 0x1d4ed8 });
      const earth = new THREE.Mesh(eGeo, eMat);
      group.add(earth);

      // Dipole field lines
      for (let l = 0; l < params.fieldLines; l++) {
        const a = (l / params.fieldLines) * Math.PI * 2;
        const pts = [];
        for (let t = 0.2; t <= Math.PI - 0.2; t += 0.1) {
          const r = 5.5 * Math.pow(Math.sin(t), 2);
          pts.push(new THREE.Vector3(Math.cos(a) * r * Math.sin(t), r * Math.cos(t), Math.sin(a) * r * Math.sin(t)));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 }));
        group.add(line);
      }

      scene.userData = { group, earth, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "ferrofluid_rosensweig_spikes",
        "title": "Ferrofluid Rosensweig Instability",
        "fileName": "ferrofluid_spikes.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "🧲 Rosensweig normal-field instability forming geometric spike hedgehog array in magnetic fluid in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #ferrofluid #magnetism #fluiddynamics #physics #creativecoding #javascript #reels",
        "displayCode": """// Rosensweig Normal-Field Instability Peaks
function calculateSpikeHeight(x, y, bField = 1.8) {
  // Critical magnetic field threshold Bc
  const r = Math.sqrt(x*x + y*y);
  const peak = Math.cos(x * 2.5) * Math.cos(y * 2.5);
  return Math.max(0, peak * (bField * 1.4) * Math.exp(-r * 0.3));
}""",
        "defaultParams": {
            "spikesRes": 36,
            "primaryColor": [0.1, 0.95, 1.0],
            "secondaryColor": [0.95, 0.2, 0.6]
        },
        "initBody": """      camera.position.set(0, 6, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.spikesRes;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          pos[idx * 3 + 0] = (i - res / 2) * 0.4;
          pos[idx * 3 + 1] = 0;
          pos[idx * 3 + 2] = (j - res / 2) * 0.4;
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.2, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Points(geo, mat);
      group.add(mesh);

      scene.userData = { group, mesh, res, params };""",
        "renderBody": """      const pos = data.mesh.geometry.attributes.position;
      const res = data.res;
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          const x = pos.getX(idx);
          const z = pos.getZ(idx);
          const spike = Math.cos(x * 2.0 + t * 2.0) * Math.cos(z * 2.0 + t * 2.0);
          pos.setY(idx, Math.max(0, spike * 2.2));
          idx++;
        }
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 6 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tokamak_fusion_plasma_torus",
        "title": "Tokamak Helical Fusion Plasma",
        "fileName": "tokamak_plasma.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "🔥 D-T Deuterium-Tritium nuclear fusion plasma stream twisting through a magnetic Tokamak torus in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🚀\n\n#threejs #webgl #fusion #tokamak #plasma #nuclear #scifi #creativecoding #javascript #reels",
        "displayCode": """// Helical Magnetic Safety Factor q(r) Plasma Stream
function buildTokamakStream(majorR = 5.5, minorR = 2.0, turns = 8) {
  const streamPoints = [];
  for (let u = 0; u <= Math.PI * 2 * turns; u += 0.1) {
    const phi = u / turns;
    const theta = u;
    const x = (majorR + minorR * Math.cos(theta)) * Math.cos(phi);
    const y = minorR * Math.sin(theta);
    const z = (majorR + minorR * Math.cos(theta)) * Math.sin(phi);
    streamPoints.push(new THREE.Vector3(x, y, z));
  }
  return streamPoints;
}""",
        "defaultParams": {
            "plasmaParticles": 7500,
            "majorR": 5.5,
            "minorR": 2.0,
            "primaryColor": [1.0, 0.45, 0.1],
            "secondaryColor": [0.2, 0.85, 1.0]
        },
        "initBody": """      camera.position.set(0, 6, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.plasmaParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = (params.majorR + params.minorR * Math.cos(v)) * Math.cos(u);
        pos[i * 3 + 1] = params.minorR * Math.sin(v);
        pos[i * 3 + 2] = (params.majorR + params.minorR * Math.cos(v)) * Math.sin(u);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, color: 0xf97316, blending: THREE.AdditiveBlending });
      const torus = new THREE.Points(geo, mat);
      group.add(torus);

      scene.userData = { group, torus, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.8;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 6 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "rayleigh_benard_convection",
        "title": "Rayleigh-Bénard Convection Cells",
        "fileName": "convection_cells.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "♨️ Buoyancy-driven Rayleigh-Bénard thermal convection circulation rolls in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🌊\n\n#threejs #webgl #thermodynamics #convection #fluidmechanics #physics #creativecoding #javascript #reels",
        "displayCode": """// Thermal Rayleigh-Bénard Convection Streamlines
function computeConvectionRolls(x, y, time) {
  // Stream function psi = A * sin(k*x) * sin(pi*y)
  const u = Math.sin(x * 1.5) * Math.cos(y * 1.5 + time * 3.0) * 1.5;
  const v = -Math.cos(x * 1.5) * Math.sin(y * 1.5 + time * 3.0) * 1.5;
  return new THREE.Vector3(u, v, 0);
}""",
        "defaultParams": {
            "particles": 6500,
            "primaryColor": [1.0, 0.35, 0.1],
            "secondaryColor": [0.2, 0.75, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const pts = new THREE.Points(geo, mat);
      group.add(pts);

      scene.userData = { group, pts, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "superfluid_quantum_vortex_lattice",
        "title": "Superfluid Helium Quantum Vortices",
        "fileName": "superfluid_lattice.js",
        "category": "Fluid Dynamics & Plasma",
        "genre": "techno",
        "caption": "❄️ Abrikosov triangular lattice of quantized circulation vortices in rotating superfluid liquid Helium-4 in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬✨\n\n#threejs #webgl #superfluid #quantum #helium #physics #creativecoding #javascript #reels",
        "displayCode": """// Abrikosov Hexagonal Quantized Vortex Lattice
function buildQuantizedVortices(vortexCount = 19, radius = 5.2) {
  const vortexCenters = [new THREE.Vector3(0, 0, 0)];
  for (let ring = 1; ring <= 2; ring++) {
    const nInRing = ring * 6;
    for (let i = 0; i < nInRing; i++) {
      const a = (i / nInRing) * Math.PI * 2;
      vortexCenters.push(new THREE.Vector3(Math.cos(a)*ring*2.2, 0, Math.sin(a)*ring*2.2));
    }
  }
  return vortexCenters;
}""",
        "defaultParams": {
            "particles": 7000,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [0.95, 0.25, 0.8]
        },
        "initBody": """      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 6.0;
        pos[i * 3 + 0] = Math.cos(u) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
        pos[i * 3 + 2] = Math.sin(u) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x22d3ee, blending: THREE.AdditiveBlending });
      const lattice = new THREE.Points(geo, mat);
      group.add(lattice);

      scene.userData = { group, lattice, params };""",
        "renderBody": """      data.group.rotation.y = t * 1.2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 8 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 0, 0);"""
    }
]
