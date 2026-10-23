# tools/defs_cosmos.py
# 14 Astrophysics & Deep Cosmos Visualizers

COSMOS_VISUALIZERS = [
    {
        "id": "supernova_stellar_explosion",
        "title": "Supernova Shockwave & Nebula",
        "fileName": "supernova.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "💥 Cataclysmic Type-II Supernova core-collapse & shockwave explosion in Three.js WebGL! Over 10,000 relativistic ejecta particles expanding at 15,000 km/s. Follow @kreggsjs for daily 3D code reels! 🔭✨\n\n#threejs #webgl #astronomy #supernova #space #creativecoding #javascript #mathart #reels",
        "displayCode": """// Core-Collapse Supernova Shockwave Particle Ejecta
function initSupernovaShockwave(particles = 10000) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(particles * 3);
  const vel = new Float32Array(particles * 3);

  for (let i = 0; i < particles; i++) {
    // Isotropic blast wave with Rayleigh-Taylor finger instability
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = 2.5 + Math.random() * 4.5;
    
    vel[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * speed;
    vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
    vel[i * 3 + 2] = Math.cos(phi) * speed;
  }
  return { geo, vel };
}""",
        "defaultParams": {
            "particleCount": 11000,
            "coreRadius": 1.4,
            "blastSpeed": 2.2,
            "primaryColor": [1.0, 0.45, 0.1],
            "secondaryColor": [0.2, 0.7, 1.0]
        },
        "initBody": """      camera.position.set(0, 4, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Core pulsating neutron star remnant
      const coreGeo = new THREE.SphereGeometry(params.coreRadius, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.9 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Shockwave spherical particle shells
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const dirs = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      const pCol = params.primaryColor;
      const sCol = params.secondaryColor;

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const dx = Math.sin(phi) * Math.cos(theta);
        const dy = Math.sin(phi) * Math.sin(theta);
        const dz = Math.cos(phi);

        dirs[i * 3 + 0] = dx;
        dirs[i * 3 + 1] = dy;
        dirs[i * 3 + 2] = dz;

        const spd = 1.0 + Math.random() * 3.5;
        speeds[i] = spd;

        const r0 = params.coreRadius * (0.8 + Math.random() * 0.4);
        pos[i * 3 + 0] = dx * r0;
        pos[i * 3 + 1] = dy * r0;
        pos[i * 3 + 2] = dz * r0;

        const mix = Math.random();
        col[i * 3 + 0] = pCol[0] * mix + sCol[0] * (1 - mix);
        col[i * 3 + 1] = pCol[1] * mix + sCol[1] * (1 - mix);
        col[i * 3 + 2] = pCol[2] * mix + sCol[2] * (1 - mix);
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
      });
      const pMesh = new THREE.Points(pGeo, pMat);
      group.add(pMesh);

      scene.userData = { group, coreMesh, pMesh, dirs, speeds, count, params };""",
        "renderBody": """      const pPos = data.pMesh.geometry.attributes.position;
      const count = data.count;
      const loopTime = (t * 0.8) % 10.0;
      const pulse = 1.0 + Math.sin(t * 6.0) * 0.25;

      data.coreMesh.scale.set(pulse, pulse, pulse);
      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;

      for (let i = 0; i < count; i++) {
        const spd = data.speeds[i];
        const dist = 1.2 + loopTime * spd * 1.35;
        pPos.setXYZ(
          i,
          data.dirs[i * 3 + 0] * dist,
          data.dirs[i * 3 + 1] * dist,
          data.dirs[i * 3 + 2] * dist
        );
      }
      pPos.needsUpdate = true;

      const camRadius = 18 + Math.sin(t * 0.3) * 3;
      camera.position.x = Math.sin(t * 0.25) * camRadius;
      camera.position.z = Math.cos(t * 0.25) * camRadius;
      camera.position.y = Math.sin(t * 0.4) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "pulsar_magnetar_beam",
        "title": "Magnetar & Synchrotron Beams",
        "fileName": "pulsar_magnetar.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "⚡ Ultra-dense Magnetar spinning at 400 RPM with collimated synchrotron gamma-ray beams! Magnetic field exceeding 10^11 Tesla in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! 🌌🔬\n\n#threejs #webgl #pulsar #space #astrophysics #creativecoding #javascript #reels",
        "displayCode": """// Ultra-Relativistic Synchrotron Beam Cones
function renderPulsarBeams(scene, beamLength = 25, rpm = 450) {
  const coneGeo = new THREE.ConeGeometry(3.5, beamLength, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const northBeam = new THREE.Mesh(coneGeo, beamMat);
  const southBeam = northBeam.clone();
  southBeam.rotation.x = Math.PI;
  return { northBeam, southBeam };
}""",
        "defaultParams": {
            "spinSpeed": 8.0,
            "beamLength": 24.0,
            "fieldParticles": 8000,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.85, 0.2, 0.95]
        },
        "initBody": """      camera.position.set(0, 3, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Star core
      const starGeo = new THREE.SphereGeometry(1.6, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Dual relativistic cones
      const beamGeo = new THREE.ConeGeometry(3.2, params.beamLength, 32, 12, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending
      });
      const beamN = new THREE.Mesh(beamGeo, beamMat);
      beamN.position.y = params.beamLength / 2;
      const beamS = new THREE.Mesh(beamGeo, beamMat);
      beamS.position.y = -params.beamLength / 2;
      beamS.rotation.x = Math.PI;

      const beamSystem = new THREE.Group();
      beamSystem.add(beamN);
      beamSystem.add(beamS);
      group.add(beamSystem);

      // Dipolar magnetic field loop particles
      const count = params.fieldParticles;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2 * 12;
        const u = (i / count) * Math.PI;
        const r = 2.0 + Math.sin(u) * 6.5;
        pos[i * 3 + 0] = Math.cos(theta) * r;
        pos[i * 3 + 1] = Math.cos(u) * 7.5;
        pos[i * 3 + 2] = Math.sin(theta) * r;

        col[i * 3 + 0] = params.secondaryColor[0];
        col[i * 3 + 1] = params.secondaryColor[1];
        col[i * 3 + 2] = params.secondaryColor[2];
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, blending: THREE.AdditiveBlending });
      const fieldMesh = new THREE.Points(pGeo, pMat);
      group.add(fieldMesh);

      scene.userData = { group, beamSystem, fieldMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * data.params.spinSpeed;
      data.beamSystem.rotation.z = Math.sin(t * 1.5) * 0.45 + 0.35;
      data.fieldMesh.rotation.y = -t * 1.2;

      camera.position.x = Math.sin(t * 0.3) * 19;
      camera.position.z = Math.cos(t * 0.3) * 19;
      camera.position.y = Math.cos(t * 0.4) * 6;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "relativistic_quasar_jet",
        "title": "Quasar & Relativistic Jets",
        "fileName": "quasar_jets.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🔥 Active Galactic Nucleus Quasar outshining entire galaxies! Relativistic plasma jets accelerated by supermassive black hole magnetic fields in Three.js WebGL! Follow @kreggsjs for daily code reels! 🔭💫\n\n#threejs #webgl #astronomy #quasar #physics #creativecoding #javascript #space #reels",
        "displayCode": """// Collimated Relativistic Plasma Jet Shock Nodes
function buildQuasarJet(length = 30, nodeCount = 8) {
  const nodes = [];
  for (let n = 0; n < nodeCount; n++) {
    const y = (n / nodeCount) * length;
    const r = 0.5 + Math.pow(n / nodeCount, 1.4) * 3.5;
    const ring = new THREE.RingGeometry(r * 0.7, r, 24);
    ring.rotateX(Math.PI / 2);
    ring.translate(0, y, 0);
    nodes.push(ring);
  }
  return nodes;
}""",
        "defaultParams": {
            "jetParticles": 9000,
            "diskParticles": 7000,
            "jetLength": 32.0,
            "primaryColor": [1.0, 0.9, 0.3],
            "secondaryColor": [0.95, 0.2, 0.2]
        },
        "initBody": """      camera.position.set(0, 6, 22);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Dense accretion disk
      const dCount = params.diskParticles;
      const dPos = new Float32Array(dCount * 3);
      const dCol = new Float32Array(dCount * 3);
      for (let i = 0; i < dCount; i++) {
        const r = 2.0 + Math.pow(Math.random(), 2.0) * 9.0;
        const th = Math.random() * Math.PI * 2;
        dPos[i * 3 + 0] = Math.cos(th) * r;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        dPos[i * 3 + 2] = Math.sin(th) * r;
        dCol[i * 3 + 0] = params.primaryColor[0];
        dCol[i * 3 + 1] = params.primaryColor[1];
        dCol[i * 3 + 2] = params.primaryColor[2];
      }
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
      dGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
      const dMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
      const disk = new THREE.Points(dGeo, dMat);
      group.add(disk);

      // Jet particles (dual polar)
      const jCount = params.jetParticles;
      const jPos = new Float32Array(jCount * 3);
      const jCol = new Float32Array(jCount * 3);
      const jSpeeds = new Float32Array(jCount);
      const jDirs = new Float32Array(jCount);

      for (let j = 0; j < jCount; j++) {
        const sign = j % 2 === 0 ? 1 : -1;
        jDirs[j] = sign;
        const spd = 2.0 + Math.random() * 4.0;
        jSpeeds[j] = spd;
        jPos[j * 3 + 0] = (Math.random() - 0.5) * 0.8;
        jPos[j * 3 + 1] = sign * (Math.random() * params.jetLength);
        jPos[j * 3 + 2] = (Math.random() - 0.5) * 0.8;

        jCol[j * 3 + 0] = 0.4 + Math.random() * 0.6;
        jCol[j * 3 + 1] = 0.8 + Math.random() * 0.2;
        jCol[j * 3 + 2] = 1.0;
      }
      const jGeo = new THREE.BufferGeometry();
      jGeo.setAttribute('position', new THREE.BufferAttribute(jPos, 3));
      jGeo.setAttribute('color', new THREE.BufferAttribute(jCol, 3));
      const jMat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending });
      const jet = new THREE.Points(jGeo, jMat);
      group.add(jet);

      scene.userData = { group, disk, jet, jSpeeds, jDirs, jCount, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.8;
      data.disk.rotation.y = t * 1.5;

      const jPos = data.jet.geometry.attributes.position;
      const len = data.params.jetLength;
      for (let j = 0; j < data.jCount; j++) {
        let y = jPos.getY(j);
        const sign = data.jDirs[j];
        y += sign * data.jSpeeds[j] * 0.25;
        if (Math.abs(y) > len) {
          y = sign * 1.0;
        }
        const spread = (Math.abs(y) / len) * 2.2;
        const ang = t * 4.0 + j;
        jPos.setXYZ(j, Math.cos(ang) * spread * 0.8, y, Math.sin(ang) * spread * 0.8);
      }
      jPos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 23;
      camera.position.z = Math.cos(t * 0.2) * 23;
      camera.position.y = 5.0 + Math.sin(t * 0.3) * 5.0;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "galaxy_spiral_collision",
        "title": "Colliding Spiral Galaxies",
        "fileName": "galaxy_collision.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Gravitational tidal stripping during an epic collision of two grand-design spiral galaxies! 12,000 N-body star particles in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! 🔭✨\n\n#threejs #webgl #galaxy #collision #nbody #astronomy #javascript #creativecoding #reels",
        "displayCode": """// Gravitational Tidal Stripping of Two Interacting Galaxies
function createSpiralGalaxy(stars = 6000, arms = 2, armTightness = 1.6) {
  const pos = new Float32Array(stars * 3);
  for (let i = 0; i < stars; i++) {
    const arm = i % arms;
    const r = Math.pow(Math.random(), 1.8) * 9.0;
    const theta = (arm * Math.PI * 2) / arms + r * armTightness;
    pos[i * 3 + 0] = Math.cos(theta) * r + (Math.random() - 0.5) * 0.4;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
    pos[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 0.4;
  }
  return pos;
}""",
        "defaultParams": {
            "starsPerGalaxy": 6500,
            "separation": 11.0,
            "primaryColor": [0.3, 0.75, 1.0],
            "secondaryColor": [1.0, 0.4, 0.75]
        },
        "initBody": """      camera.position.set(0, 10, 24);
      camera.lookAt(0, 0, 0);

      const root = new THREE.Group();
      scene.add(root);

      function buildGal(colRGB) {
        const count = params.starsPerGalaxy;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const arm = i % 2;
          const r = Math.pow(Math.random(), 1.6) * 8.5;
          const th = (arm * Math.PI) + r * 1.45;
          pos[i * 3 + 0] = Math.cos(th) * r + (Math.random() - 0.5) * 0.5;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
          pos[i * 3 + 2] = Math.sin(th) * r + (Math.random() - 0.5) * 0.5;

          const heat = 1.0 - r / 9.0;
          col[i * 3 + 0] = colRGB[0] * (0.6 + heat * 0.4);
          col[i * 3 + 1] = colRGB[1] * (0.6 + heat * 0.4);
          col[i * 3 + 2] = colRGB[2] * (0.6 + heat * 0.4);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
        const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
        return new THREE.Points(geo, mat);
      }

      const galA = buildGal(params.primaryColor);
      const galB = buildGal(params.secondaryColor);

      galA.position.x = -params.separation / 2;
      galB.position.x = params.separation / 2;
      galB.rotation.z = Math.PI / 4;

      root.add(galA);
      root.add(galB);

      scene.userData = { root, galA, galB, params };""",
        "renderBody": """      data.root.rotation.y = t * 0.2;
      data.galA.rotation.y = t * 0.9;
      data.galB.rotation.y = -t * 1.1;

      // Infalling gravitational dance
      const d = Math.sin(t * 0.5) * 4.0;
      data.galA.position.x = -5.0 + d;
      data.galB.position.x = 5.0 - d;
      data.galA.position.z = Math.cos(t * 0.5) * 3.0;
      data.galB.position.z = -Math.cos(t * 0.5) * 3.0;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.position.y = 12 + Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cosmic_web_filaments",
        "title": "Cosmic Web & Dark Matter",
        "fileName": "cosmic_web.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🕸️ Large-Scale Structure of the Universe! Dark matter cosmic filaments connecting superclusters across megaparsecs in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌🔭\n\n#threejs #webgl #astronomy #cosmology #darkmatter #javascript #creativecoding #reels",
        "displayCode": """// Large-Scale Dark Matter Filament Mesh
function generateCosmicFilaments(nodes = 220, maxDist = 5.5) {
  const linePoints = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = nodes[i].distanceTo(nodes[j]);
      if (d < maxDist) {
        linePoints.push(nodes[i].x, nodes[i].y, nodes[i].z);
        linePoints.push(nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }
  return linePoints;
}""",
        "defaultParams": {
            "nodeCount": 260,
            "haloStars": 9000,
            "primaryColor": [0.65, 0.35, 1.0],
            "secondaryColor": [0.15, 0.9, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 24);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.nodeCount;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new THREE.Vector3(
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 22
        ));
      }

      // Filament lines
      const linePos = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dist = nodes[i].distanceTo(nodes[j]);
          if (dist < 4.8) {
            linePos.push(nodes[i].x, nodes[i].y, nodes[i].z);
            linePos.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending
      });
      const lines = new THREE.LineSegments(lGeo, lMat);
      group.add(lines);

      // Star clusters at nodes
      const starCount = params.haloStars;
      const sPos = new Float32Array(starCount * 3);
      for (let s = 0; s < starCount; s++) {
        const n = nodes[s % count];
        sPos[s * 3 + 0] = n.x + (Math.random() - 0.5) * 1.2;
        sPos[s * 3 + 1] = n.y + (Math.random() - 0.5) * 1.2;
        sPos[s * 3 + 2] = n.z + (Math.random() - 0.5) * 1.2;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.12, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const stars = new THREE.Points(sGeo, sMat);
      group.add(stars);

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.15;
      data.group.rotation.x = Math.sin(t * 0.1) * 0.2;

      const camRadius = 24.0 + Math.sin(t * 0.3) * 4.0;
      camera.position.x = Math.sin(t * 0.2) * camRadius;
      camera.position.z = Math.cos(t * 0.2) * camRadius;
      camera.position.y = Math.cos(t * 0.25) * 6.0;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dyson_swarm_sphere",
        "title": "Dyson Swarm Megastructure",
        "fileName": "dyson_swarm.js",
        "category": "Astrophysics & Relativity",
        "genre": "cyber",
        "caption": "☀️ Type-II Civilization Dyson Swarm harvesting 100% of star energy output! Concentric rings of solar collectors in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #dysonsphere #megastructure #scifi #creativecoding #javascript #space #reels",
        "displayCode": """// Multi-Orbital Concentric Dyson Rings
function buildDysonSwarm(rings = 5, collectorsPerRing = 120) {
  const swarmGroup = new THREE.Group();
  for (let r = 0; r < rings; r++) {
    const radius = 4.0 + r * 1.8;
    const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = (r * Math.PI) / rings;
    ringMesh.rotation.y = r * 0.4;
    swarmGroup.add(ringMesh);
  }
  return swarmGroup;
}""",
        "defaultParams": {
            "ringsCount": 6,
            "collectorUnits": 5000,
            "primaryColor": [1.0, 0.8, 0.2],
            "secondaryColor": [0.1, 0.95, 1.0]
        },
        "initBody": """      camera.position.set(0, 4, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Central glowing Star
      const starGeo = new THREE.SphereGeometry(2.2, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xfff0aa });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Dyson Rings
      const ringGroup = new THREE.Group();
      group.add(ringGroup);
      const rings = [];
      for (let r = 0; r < params.ringsCount; r++) {
        const rad = 4.2 + r * 1.6;
        const rGeo = new THREE.TorusGeometry(rad, 0.05, 16, 120);
        const rMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
          wireframe: true, transparent: true, opacity: 0.75
        });
        const rm = new THREE.Mesh(rGeo, rMat);
        rm.rotation.x = (r * Math.PI) / params.ringsCount + 0.3;
        rm.rotation.y = r * 0.5;
        ringGroup.add(rm);
        rings.push(rm);
      }

      // Swarm Solar Collectors (Points)
      const cCount = params.collectorUnits;
      const cPos = new Float32Array(cCount * 3);
      for (let c = 0; c < cCount; c++) {
        const r = 4.0 + Math.random() * 8.0;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        cPos[c * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        cPos[c * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        cPos[c * 3 + 2] = Math.cos(ph) * r;
      }
      const cGeo = new THREE.BufferGeometry();
      cGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
      const cMat = new THREE.PointsMaterial({
        size: 0.12, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const collectors = new THREE.Points(cGeo, cMat);
      group.add(collectors);

      scene.userData = { group, rings, collectors, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      data.rings.forEach((ring, idx) => {
        ring.rotation.z = t * (0.4 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1);
      });
      data.collectors.rotation.y = -t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = Math.cos(t * 0.3) * 5;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "solar_prominence_flare",
        "title": "Solar Prominence & Coronal Loops",
        "fileName": "solar_flare.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "☀️ Violent magnetic reconnection plasma loop on the Sun's surface! Turbulent coronal mass ejection in Three.js WebGL. Follow @kreggsjs for daily 3D code reels! 🔭🔥\n\n#threejs #webgl #sun #astronomy #solarflare #physics #creativecoding #javascript #reels",
        "displayCode": """// Magnetic Flux Rope Plasma Prominence Arcs
function buildCoronalLoops(loops = 12, pointsPerLoop = 60) {
  const loopGroup = new THREE.Group();
  for (let l = 0; l < loops; l++) {
    const angle = (l / loops) * Math.PI * 2;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(angle)*4, 0, Math.sin(angle)*4),
      new THREE.Vector3(Math.cos(angle)*5.5, 3.5, Math.sin(angle)*5.5),
      new THREE.Vector3(Math.cos(angle + 0.3)*4, 0, Math.sin(angle + 0.3)*4)
    ]);
    const tube = new THREE.TubeGeometry(curve, 32, 0.15, 8, false);
    loopGroup.add(new THREE.Mesh(tube, loopMat));
  }
  return loopGroup;
}""",
        "defaultParams": {
            "loopCount": 14,
            "plasmaParticles": 7000,
            "primaryColor": [1.0, 0.35, 0.05],
            "secondaryColor": [1.0, 0.9, 0.2]
        },
        "initBody": """      camera.position.set(0, 2, 17);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Star body
      const starGeo = new THREE.SphereGeometry(3.5, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xff6600, wireframe: true });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Prominence arcs
      const arcs = new THREE.Group();
      group.add(arcs);
      for (let i = 0; i < params.loopCount; i++) {
        const ang = (i / params.loopCount) * Math.PI * 2;
        const height = 2.0 + Math.random() * 2.5;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(ang) * 3.5, Math.sin(ang) * 3.5, 0),
          new THREE.Vector3(Math.cos(ang + 0.15) * (3.5 + height), Math.sin(ang + 0.15) * (3.5 + height), 0),
          new THREE.Vector3(Math.cos(ang + 0.3) * 3.5, Math.sin(ang + 0.3) * 3.5, 0)
        ]);
        const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.12, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
          transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
        });
        const arc = new THREE.Mesh(tubeGeo, tubeMat);
        arc.rotation.z = Math.random() * 0.4;
        arcs.add(arc);
      }

      // Hot CME Particles
      const pCount = params.plasmaParticles;
      const pPos = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        const r = 3.6 + Math.random() * 4.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[p * 3 + 0] = Math.sin(ph) * Math.cos(th) * r;
        pPos[p * 3 + 1] = Math.sin(ph) * Math.sin(th) * r;
        pPos[p * 3 + 2] = Math.cos(ph) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.14, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const pMesh = new THREE.Points(pGeo, pMat);
      group.add(pMesh);

      scene.userData = { group, arcs, pMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.arcs.rotation.z = Math.sin(t * 0.5) * 0.2;
      data.pMesh.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 17;
      camera.position.z = Math.cos(t * 0.25) * 17;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "wormhole_einstein_rosen",
        "title": "Einstein-Rosen Wormhole",
        "fileName": "wormhole.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌀 Traversable Einstein-Rosen bridge connecting two distant corners of spacetime! Relativistic light bending throat in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌✨\n\n#threejs #webgl #wormhole #relativity #physics #creativecoding #javascript #space #reels",
        "displayCode": """// Flamm's Paraboloid Throat Metric (Wormhole Funnel)
function generateWormholeGeometry(radius = 3.0, length = 18, segments = 60) {
  const geo = new THREE.CylinderGeometry(radius, radius * 3.5, length, 40, segments, true);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    // Hyperbolic throat contour r(y) = sqrt(r0^2 + y^2)
    const rThroat = Math.sqrt(radius * radius + y * y * 0.45);
    const ang = Math.atan2(pos.getZ(i), pos.getX(i));
    pos.setXYZ(i, Math.cos(ang) * rThroat, y, Math.sin(ang) * rThroat);
  }
  return geo;
}""",
        "defaultParams": {
            "throatRadius": 2.8,
            "tunnelLength": 20.0,
            "starfieldCount": 8000,
            "primaryColor": [0.15, 0.85, 1.0],
            "secondaryColor": [0.85, 0.25, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Hyperbolic throat tunnel
      const cylGeo = new THREE.CylinderGeometry(params.throatRadius, params.throatRadius * 2.8, params.tunnelLength, 48, 48, true);
      const pos = cylGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const r = Math.sqrt(params.throatRadius * params.throatRadius + y * y * 0.5);
        const th = Math.atan2(pos.getZ(i), pos.getX(i));
        pos.setXYZ(i, Math.cos(th) * r, y, Math.sin(th) * r);
      }
      cylGeo.computeVertexNormals();

      const cylMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending
      });
      const tunnel = new THREE.Mesh(cylGeo, cylMat);
      tunnel.rotation.x = Math.PI / 2;
      group.add(tunnel);

      // Trailing warp stars
      const sCount = params.starfieldCount;
      const sPos = new Float32Array(sCount * 3);
      for (let s = 0; s < sCount; s++) {
        const z = (Math.random() - 0.5) * params.tunnelLength * 1.5;
        const rad = 2.0 + Math.random() * 8.0;
        const ang = Math.random() * Math.PI * 2;
        sPos[s * 3 + 0] = Math.cos(ang) * rad;
        sPos[s * 3 + 1] = Math.sin(ang) * rad;
        sPos[s * 3 + 2] = z;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.12, color: new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const stars = new THREE.Points(sGeo, sMat);
      group.add(stars);

      scene.userData = { group, tunnel, stars, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.5;
      data.tunnel.rotation.y = t * 0.3;

      // Camera diving into wormhole throat
      const camZ = Math.sin(t * 0.4) * 8.0;
      camera.position.z = 10.0 + camZ;
      camera.position.x = Math.cos(t * 0.6) * 2.0;
      camera.position.y = Math.sin(t * 0.6) * 2.0;
      camera.lookAt(0, 0, -5.0);"""
    },
    {
        "id": "saturn_hexagonal_rings",
        "title": "Saturn Rings & Polar Hexagon",
        "fileName": "saturn_rings.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🪐 Majestic Saturnian ring system & polar atmospheric hexagonal jet stream! 12,000 Keplerian particles orbiting in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔭🪐\n\n#threejs #webgl #saturn #astronomy #space #creativecoding #javascript #mathart #reels",
        "displayCode": """// Keplerian Orbital Dynamics in Saturnian Planetary Rings
function generateRingParticles(count = 12000, rMin = 4.2, rMax = 11.5) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Cassini division gap at r ~ 7.2
    let r = rMin + Math.random() * (rMax - rMin);
    if (r > 6.9 && r < 7.4 && Math.random() < 0.85) r += 0.6; // Gap
    const theta = Math.random() * Math.PI * 2;
    pos[i * 3 + 0] = Math.cos(theta) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
    pos[i * 3 + 2] = Math.sin(theta) * r;
  }
  return pos;
}""",
        "defaultParams": {
            "planetRadius": 2.8,
            "ringParticles": 12000,
            "primaryColor": [0.95, 0.85, 0.65],
            "secondaryColor": [0.65, 0.5, 0.35]
        },
        "initBody": """      camera.position.set(0, 8, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);
      group.rotation.x = 0.45; // Saturn axial tilt

      // Planet Sphere
      const pGeo = new THREE.SphereGeometry(params.planetRadius, 40, 40);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xe0c896, wireframe: true });
      const planet = new THREE.Mesh(pGeo, pMat);
      group.add(planet);

      // Polar Hexagon Ring
      const hexPoints = [];
      for (let h = 0; h <= 6; h++) {
        const ha = (h / 6) * Math.PI * 2;
        hexPoints.push(new THREE.Vector3(Math.cos(ha) * 1.4, params.planetRadius * 0.95, Math.sin(ha) * 1.4));
      }
      const hexGeo = new THREE.BufferGeometry().setFromPoints(hexPoints);
      const hexLine = new THREE.Line(hexGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 }));
      group.add(hexLine);

      // Rings (12,000 particles)
      const rCount = params.ringParticles;
      const rPos = new Float32Array(rCount * 3);
      const rCol = new Float32Array(rCount * 3);
      for (let i = 0; i < rCount; i++) {
        let r = 4.0 + Math.pow(Math.random(), 0.9) * 8.0;
        if (r > 7.1 && r < 7.6 && Math.random() < 0.9) r += 0.6; // Cassini Division
        const th = Math.random() * Math.PI * 2;
        rPos[i * 3 + 0] = Math.cos(th) * r;
        rPos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        rPos[i * 3 + 2] = Math.sin(th) * r;

        const shade = 0.6 + Math.random() * 0.4;
        rCol[i * 3 + 0] = params.primaryColor[0] * shade;
        rCol[i * 3 + 1] = params.primaryColor[1] * shade;
        rCol[i * 3 + 2] = params.primaryColor[2] * shade;
      }
      const rGeo = new THREE.BufferGeometry();
      rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
      rGeo.setAttribute('color', new THREE.BufferAttribute(rCol, 3));
      const rMat = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, blending: THREE.AdditiveBlending });
      const rings = new THREE.Points(rGeo, rMat);
      group.add(rings);

      scene.userData = { group, planet, rings, hexLine, params };""",
        "renderBody": """      data.planet.rotation.y = t * 0.6;
      data.rings.rotation.y = t * 0.35;
      data.hexLine.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "oort_cloud_comet_tail",
        "title": "Hyperbolic Comet & Ion Tail",
        "fileName": "comet_tail.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "☄️ Long-period comet diving around the Sun with dynamic ion and dust tails! Solar radiation pressure streaming in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌✨\n\n#threejs #webgl #comet #astronomy #space #creativecoding #javascript #mathart #reels",
        "displayCode": """// Solar Wind Radiation Pressure Deflecting Comet Ion Tail
function renderCometTail(nucleusPos, solarDir, particles = 6000) {
  const tailPos = new Float32Array(particles * 3);
  for (let i = 0; i < particles; i++) {
    const age = Math.random();
    const drift = Math.pow(age, 1.8) * 16.0;
    tailPos[i * 3 + 0] = nucleusPos.x + solarDir.x * drift + (Math.random() - 0.5) * age * 2.2;
    tailPos[i * 3 + 1] = nucleusPos.y + solarDir.y * drift + (Math.random() - 0.5) * age * 2.2;
    tailPos[i * 3 + 2] = nucleusPos.z + solarDir.z * drift + (Math.random() - 0.5) * age * 2.2;
  }
  return tailPos;
}""",
        "defaultParams": {
            "tailParticles": 7500,
            "tailLength": 16.0,
            "primaryColor": [0.25, 0.85, 1.0],
            "secondaryColor": [1.0, 0.9, 0.4]
        },
        "initBody": """      camera.position.set(0, 3, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Comet Nucleus
      const nucGeo = new THREE.DodecahedronGeometry(0.8, 1);
      const nucMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nucleus = new THREE.Mesh(nucGeo, nucMat);
      group.add(nucleus);

      // Ion Tail (Cyan)
      const count = params.tailParticles;
      const tPos = new Float32Array(count * 3);
      const tCol = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const dist = Math.pow(u, 1.5) * params.tailLength;
        const spread = u * 2.2;
        tPos[i * 3 + 0] = -dist;
        tPos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        tPos[i * 3 + 2] = (Math.random() - 0.5) * spread;

        tCol[i * 3 + 0] = params.primaryColor[0];
        tCol[i * 3 + 1] = params.primaryColor[1];
        tCol[i * 3 + 2] = params.primaryColor[2];
      }
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      tGeo.setAttribute('color', new THREE.BufferAttribute(tCol, 3));
      const tMat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const tail = new THREE.Points(tGeo, tMat);
      group.add(tail);

      scene.userData = { group, nucleus, tail, params };""",
        "renderBody": """      data.nucleus.rotation.y = t * 1.5;
      data.nucleus.rotation.x = t * 1.0;

      // Comet orbital path
      const orbA = t * 0.6;
      data.group.position.x = Math.cos(orbA) * 6.0;
      data.group.position.y = Math.sin(orbA * 2) * 2.0;
      data.group.position.z = Math.sin(orbA) * 4.0;
      data.group.rotation.z = orbA;

      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = Math.sin(t * 0.3) * 5;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hawking_radiation_sphere",
        "title": "Hawking Radiation & Horizon",
        "fileName": "hawking_radiation.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "⚛️ Quantum field vacuum fluctuations at the black hole event horizon! Virtual particle separation emitting thermal Hawking radiation in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌✨\n\n#threejs #webgl #hawkingradiation #quantumphysics #blackhole #creativecoding #javascript #space #reels",
        "displayCode": """// Quantum Vacuum Pair Production at Event Horizon
function emitHawkingPhotons(horizonRadius = 2.4, pairsPerFrame = 80) {
  const escapes = [];
  for (let i = 0; i < pairsPerFrame; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    // Real photon escapes with positive energy
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)
    );
    escapes.push(dir.multiplyScalar(horizonRadius + 0.1));
  }
  return escapes;
}""",
        "defaultParams": {
            "horizonRadius": 2.2,
            "quantumParticles": 9000,
            "primaryColor": [1.0, 0.95, 0.4],
            "secondaryColor": [0.4, 0.7, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 15);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Pitch black horizon
      const hGeo = new THREE.SphereGeometry(params.horizonRadius, 48, 48);
      const hMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const horizon = new THREE.Mesh(hGeo, hMat);
      group.add(horizon);

      // Photon sphere glow wireframe
      const gGeo = new THREE.SphereGeometry(params.horizonRadius * 1.1, 24, 24);
      const gMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 });
      const glow = new THREE.Mesh(gGeo, gMat);
      group.add(glow);

      // Evaporating Hawking Quanta (Particles)
      const count = params.quantumParticles;
      const qPos = new Float32Array(count * 3);
      const qCol = new Float32Array(count * 3);
      const qDirs = new Float32Array(count * 3);
      const qSpeeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const dx = Math.sin(ph) * Math.cos(th);
        const dy = Math.sin(ph) * Math.sin(th);
        const dz = Math.cos(ph);

        qDirs[i * 3 + 0] = dx;
        qDirs[i * 3 + 1] = dy;
        qDirs[i * 3 + 2] = dz;
        qSpeeds[i] = 1.0 + Math.random() * 2.5;

        qPos[i * 3 + 0] = dx * params.horizonRadius;
        qPos[i * 3 + 1] = dy * params.horizonRadius;
        qPos[i * 3 + 2] = dz * params.horizonRadius;

        qCol[i * 3 + 0] = params.primaryColor[0];
        qCol[i * 3 + 1] = params.primaryColor[1];
        qCol[i * 3 + 2] = params.primaryColor[2];
      }
      const qGeo = new THREE.BufferGeometry();
      qGeo.setAttribute('position', new THREE.BufferAttribute(qPos, 3));
      qGeo.setAttribute('color', new THREE.BufferAttribute(qCol, 3));
      const qMat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const quanta = new THREE.Points(qGeo, qMat);
      group.add(quanta);

      scene.userData = { group, glow, quanta, qDirs, qSpeeds, count, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.glow.rotation.x = t * 0.7;

      const pos = data.quanta.geometry.attributes.position;
      const count = data.count;
      const r0 = data.params.horizonRadius;
      for (let i = 0; i < count; i++) {
        const dist = r0 + ((t * data.qSpeeds[i] * 1.5 + i * 0.05) % 8.0);
        pos.setXYZ(
          i,
          data.qDirs[i * 3 + 0] * dist,
          data.qDirs[i * 3 + 1] * dist,
          data.qDirs[i * 3 + 2] * dist
        );
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.3) * 15;
      camera.position.z = Math.cos(t * 0.3) * 15;
      camera.position.y = Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "planetary_nebula_hourglass",
        "title": "Bipolar Planetary Nebula",
        "fileName": "planetary_nebula.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🌌 Luminous bipolar Hourglass Planetary Nebula formed by dying asymptotic giant branch star! Relativistic gas expansion in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔭✨\n\n#threejs #webgl #nebula #astronomy #space #creativecoding #javascript #mathart #reels",
        "displayCode": """// Bipolar Hourglass Gas Expansion Coordinates
function calculateHourglassLobes(count = 9000, waistR = 1.2, lobeLength = 9.0) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    const y = sign * Math.pow(Math.random(), 0.8) * lobeLength;
    const r = waistR + Math.pow(Math.abs(y) / lobeLength, 1.4) * 5.2;
    const th = Math.random() * Math.PI * 2;
    pos[i * 3 + 0] = Math.cos(th) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(th) * r;
  }
  return pos;
}""",
        "defaultParams": {
            "gasParticles": 9500,
            "lobeLength": 8.5,
            "primaryColor": [0.95, 0.25, 0.65],
            "secondaryColor": [0.2, 0.85, 1.0]
        },
        "initBody": """      camera.position.set(0, 2, 20);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Central white dwarf
      const starGeo = new THREE.SphereGeometry(0.8, 24, 24);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);

      // Hourglass particles
      const count = params.gasParticles;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const u = Math.pow(Math.random(), 0.9);
        const y = sign * u * params.lobeLength;
        const r = 1.2 + Math.pow(u, 1.5) * 5.5 + (Math.random() - 0.5) * 0.4;
        const th = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = Math.cos(th) * r;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(th) * r;

        col[i * 3 + 0] = params.primaryColor[0] * u + params.secondaryColor[0] * (1 - u);
        col[i * 3 + 1] = params.primaryColor[1] * u + params.secondaryColor[1] * (1 - u);
        col[i * 3 + 2] = params.primaryColor[2] * u + params.secondaryColor[2] * (1 - u);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
      const nebula = new THREE.Points(geo, mat);
      group.add(nebula);

      scene.userData = { group, star, nebula, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.25;

      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = Math.sin(t * 0.35) * 6;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "kuiper_asteroid_swarm",
        "title": "Kuiper Belt Asteroid Swarm",
        "fileName": "kuiper_belt.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "🪨 Swarm of thousands of primordial tumbling icy planetesimals in the outer Solar System! Dynamic N-body Keplerian disk in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌✨\n\n#threejs #webgl #asteroid #kuiperbelt #astronomy #space #creativecoding #javascript #reels",
        "displayCode": """// Resonant Kuiper Belt Asteroid Orbits
function buildAsteroidBelt(asteroidCount = 600, rMin = 6.0, rMax = 14.0) {
  const meshGroup = new THREE.Group();
  const baseGeos = [new THREE.DodecahedronGeometry(0.3, 0), new THREE.IcosahedronGeometry(0.25, 0)];
  for (let a = 0; a < asteroidCount; a++) {
    const geo = baseGeos[a % 2];
    const mesh = new THREE.Mesh(geo, rockMat);
    const r = rMin + Math.random() * (rMax - rMin);
    const th = Math.random() * Math.PI * 2;
    mesh.position.set(Math.cos(th)*r, (Math.random()-0.5)*1.2, Math.sin(th)*r);
    meshGroup.add(mesh);
  }
  return meshGroup;
}""",
        "defaultParams": {
            "asteroidCount": 8500,
            "rMin": 5.0,
            "rMax": 15.0,
            "primaryColor": [0.85, 0.85, 0.95],
            "secondaryColor": [0.35, 0.55, 0.85]
        },
        "initBody": """      camera.position.set(0, 9, 21);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.asteroidCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = params.rMin + Math.pow(Math.random(), 0.9) * (params.rMax - params.rMin);
        const th = Math.random() * Math.PI * 2;
        pos[i * 3 + 0] = Math.cos(th) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1.4;
        pos[i * 3 + 2] = Math.sin(th) * r;

        const shade = 0.5 + Math.random() * 0.5;
        col[i * 3 + 0] = params.primaryColor[0] * shade;
        col[i * 3 + 1] = params.primaryColor[1] * shade;
        col[i * 3 + 2] = params.primaryColor[2] * shade;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const swarm = new THREE.Points(geo, mat);
      group.add(swarm);

      scene.userData = { group, swarm, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.25) * 5;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "binary_neutron_stars",
        "title": "Binary Neutron Star Merger",
        "fileName": "neutron_merger.js",
        "category": "Astrophysics & Relativity",
        "genre": "cosmic",
        "caption": "💫 Inspiraling binary neutron stars emitting gravitational wave chirps! Ultra-dense stellar collision in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌🔭\n\n#threejs #webgl #gravitationalwaves #neutronstar #merger #physics #creativecoding #javascript #reels",
        "displayCode": """// Gravitational Quadrupole Radiation & Binary Chirp
function calculateBinaryOrbit(time, orbitalRadius = 4.0, chirpRate = 1.8) {
  const r = Math.max(0.6, orbitalRadius - (time * 0.15) % orbitalRadius);
  const omega = Math.pow(r, -1.5) * chirpRate;
  const angle = time * omega;
  const starA = new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r);
  const starB = new THREE.Vector3(-Math.cos(angle) * r, 0, -Math.sin(angle) * r);
  return { starA, starB, r };
}""",
        "defaultParams": {
            "orbitRadius": 4.5,
            "waveRipples": 10,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.2, 0.6]
        },
        "initBody": """      camera.position.set(0, 8, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Star A & Star B
      const sGeo = new THREE.SphereGeometry(1.1, 32, 32);
      const matA = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const matB = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const starA = new THREE.Mesh(sGeo, matA);
      const starB = new THREE.Mesh(sGeo, matB);
      group.add(starA);
      group.add(starB);

      // Gravitational wave spiral ripples (Rings)
      const rings = [];
      for (let r = 0; r < params.waveRipples; r++) {
        const ringGeo = new THREE.TorusGeometry(3.0 + r * 1.4, 0.04, 16, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xa855f7, transparent: true, opacity: 0.6, wireframe: true
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, starA, starB, rings, params };""",
        "renderBody": """      const rBase = data.params.orbitRadius;
      const theta = t * 3.5;
      data.starA.position.set(Math.cos(theta) * rBase, 0, Math.sin(theta) * rBase);
      data.starB.position.set(-Math.cos(theta) * rBase, 0, -Math.sin(theta) * rBase);

      data.rings.forEach((ring, idx) => {
        const pulse = 1.0 + Math.sin(t * 4.0 - idx * 0.6) * 0.15;
        ring.scale.set(pulse, pulse, pulse);
      });

      camera.position.x = Math.sin(t * 0.3) * 18;
      camera.position.z = Math.cos(t * 0.3) * 18;
      camera.position.y = 8 + Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
