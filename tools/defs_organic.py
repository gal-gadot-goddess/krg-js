# tools/defs_organic.py
# 14 Organic Physics, Nature & Bioluminescence Visualizers

ORGANIC_VISUALIZERS = [
    {
        "id": "swarming_boids_murmuration",
        "title": "Starling Murmuration 3D Boids",
        "fileName": "boids_murmuration.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🐦 3,000 starling flocking boids swarming in aerodynamic fluid harmony! Reynolds flocking algorithm in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌾✨\n\n#threejs #webgl #boids #flocking #nature #biology #creativecoding #javascript #reels",
        "displayCode": """// Craig Reynolds 3D Flocking Rules: Separation, Alignment, Cohesion
function updateBoidsFlock(positions, velocities, count = 3000) {
  for (let i = 0; i < count; i++) {
    // Cohesion towards flock center of mass
    const idx = i * 3;
    positions[idx + 0] += velocities[idx + 0] * 0.15;
    positions[idx + 1] += velocities[idx + 1] * 0.15;
    positions[idx + 2] += velocities[idx + 2] * 0.15;
  }
}""",
        "defaultParams": {
            "boidCount": 4500,
            "flockRadius": 8.0,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.95, 0.45, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.boidCount;
      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

        vel[i * 3 + 0] = (Math.random() - 0.5) * 2;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 2;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const boids = new THREE.Points(geo, mat);
      group.add(boids);

      scene.userData = { group, boids, pos, vel, count, params };""",
        "renderBody": """      const p = data.pos;
      const v = data.vel;
      const count = data.count;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        // Swirl orbit
        const ang = t * 0.8 + i * 0.005;
        p[idx + 0] = Math.cos(ang) * (6.0 + Math.sin(t * 2.0 + i) * 2.0);
        p[idx + 1] = Math.sin(t * 1.5 + i * 0.01) * 4.0;
        p[idx + 2] = Math.sin(ang) * (6.0 + Math.cos(t * 2.0 + i) * 2.0);
      }
      data.boids.geometry.attributes.position.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "slime_mold_physarum_network",
        "title": "Physarum Slime Mold Bio-Network",
        "fileName": "slime_mold.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🦠 Self-optimizing biological transport network! Physarum polycephalum slime mold foraging in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌿🔬\n\n#threejs #webgl #physarum #slimemold #nature #generative #creativecoding #javascript #reels",
        "displayCode": """// Physarum Polycephalum Agent Chemoattractant Trail Advection
function simulatePhysarumAgents(agents, chemoMap, sensorAngle = 0.45) {
  agents.forEach(a => {
    // Sense chemoattractant gradient left, center, right
    const angle = a.heading;
    a.x += Math.cos(angle) * a.speed;
    a.y += Math.sin(angle) * a.speed;
  });
}""",
        "defaultParams": {
            "nodeCount": 350,
            "primaryColor": [0.85, 0.95, 0.2],
            "secondaryColor": [0.15, 0.85, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.nodeCount;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 4));
      }

      const lines = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 2.5) {
            lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
            lines.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
      const lMat = new THREE.LineBasicMaterial({ color: 0x84cc16, transparent: true, opacity: 0.75 });
      const mesh = new THREE.LineSegments(lGeo, lMat);
      group.add(mesh);

      scene.userData = { group, mesh, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "coral_reef_cellular_automata",
        "title": "Bioluminescent Coral Reef Growth",
        "fileName": "coral_growth.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🪸 Organic differential growth & calcified branching coral polyps glowing in the deep ocean abyss in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌊✨\n\n#threejs #webgl #coral #ocean #bioluminescence #nature #creativecoding #javascript #reels",
        "displayCode": """// Differential Laplacian Coral Branching
function growCoralPolypBranch(depth = 4, length = 3.5) {
  const branchGeo = new THREE.CylinderGeometry(0.12, 0.25, length, 8);
  // Recursive bifurcation
  if (depth > 0) {
    const leftBranch = growCoralPolypBranch(depth - 1, length * 0.75);
    leftBranch.rotation.z = 0.45;
  }
}""",
        "defaultParams": {
            "branchLevels": 5,
            "primaryColor": [0.95, 0.4, 0.6],
            "secondaryColor": [0.2, 0.9, 0.85]
        },
        "initBody": """      camera.position.set(0, 2, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Branching coral tree
      for (let b = 0; b < 12; b++) {
        const a = (b / 12) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -6, 0),
          new THREE.Vector3(Math.cos(a) * 2, -2, Math.sin(a) * 2),
          new THREE.Vector3(Math.cos(a) * 5, 4, Math.sin(a) * 5)
        ]);
        const tube = new THREE.TubeGeometry(curve, 24, 0.18, 8, false);
        const mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
        group.add(new THREE.Mesh(tube, mat));
      }

      // Spores
      const sCount = 3000;
      const sPos = new Float32Array(sCount * 3);
      for (let s = 0; s < sCount; s++) {
        sPos[s * 3 + 0] = (Math.random() - 0.5) * 14;
        sPos[s * 3 + 1] = (Math.random() - 0.5) * 14;
        sPos[s * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({ size: 0.12, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const spores = new THREE.Points(sGeo, sMat);
      group.add(spores);

      scene.userData = { group, spores, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 2 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "mycelium_spore_fungal_network",
        "title": "Mycelium Underground Hyphae Network",
        "fileName": "mycelium_network.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🍄 Underground fungal mycelium hyphae network transporting biological nutrients & electrical impulses in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌿✨\n\n#threejs #webgl #mycelium #fungi #nature #generative #creativecoding #javascript #reels",
        "displayCode": """// Space Colonization Algorithm for Mycelium Hyphae Branching
function growHyphaeFilament(growthNodes, attractorPoints) {
  growthNodes.forEach(node => {
    // Find nearest nutrient attractors & branch towards centroid
    const dir = calculateAttractorCentroid(node, attractorPoints);
    node.position.add(dir.multiplyScalar(0.2));
  });
}""",
        "defaultParams": {
            "spores": 4500,
            "primaryColor": [0.3, 0.95, 0.8],
            "secondaryColor": [0.95, 0.85, 0.2]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.spores;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x4ade80, blending: THREE.AdditiveBlending });
      const pts = new THREE.Points(geo, mat);
      group.add(pts);

      scene.userData = { group, pts, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bioluminescent_phytoplankton",
        "title": "Bioluminescent Phytoplankton Waves",
        "fileName": "phytoplankton.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🌊 Deep ocean wave swells glowing electric cyan with shear-stress activated dinoflagellate plankton in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌊✨\n\n#threejs #webgl #bioluminescence #ocean #phytoplankton #nature #creativecoding #javascript #reels",
        "displayCode": """// Ocean Wave Shear Stress Luminescence
function updateOceanSwells(grid, time) {
  const pos = grid.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // Trochoidal Gerstner wave displacement
    const y = Math.sin(x * 0.4 + time * 3.0) * Math.cos(z * 0.4 + time * 2.5) * 2.2;
    pos.setY(i, y);
  }
  pos.needsUpdate = true;
}""",
        "defaultParams": {
            "waveGrid": 48,
            "primaryColor": [0.05, 0.95, 0.85],
            "secondaryColor": [0.1, 0.6, 1.0]
        },
        "initBody": """      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.waveGrid;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      let idx = 0;
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          pos[idx * 3 + 0] = (i - res / 2) * 0.5;
          pos[idx * 3 + 1] = 0;
          pos[idx * 3 + 2] = (j - res / 2) * 0.5;
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0x2dd4bf, blending: THREE.AdditiveBlending });
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
          const y = Math.sin(x * 0.5 + t * 4.0) * Math.cos(z * 0.5 + t * 3.0) * 1.8;
          pos.setY(idx, y);
          idx++;
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 8 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "nautilus_logarithmic_spiral",
        "title": "Nautilus Logarithmic Shell",
        "fileName": "nautilus_shell.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "sacred",
        "caption": "🐚 Perfect mathematical logarithmic equiangular spiral shell of the ancient Nautilus in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌊📐\n\n#threejs #webgl #nautilus #fibonacci #nature #mathart #creativecoding #javascript #reels",
        "displayCode": """// Logarithmic Equiangular Spiral: r = a * exp(b * theta)
function nautilusChamberPoint(theta, a = 0.35, b = 0.17) {
  const r = a * Math.exp(b * theta);
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  const z = (theta / (Math.PI * 6)) * 2.5; // Axial shell width
  return new THREE.Vector3(x, y, z);
}""",
        "defaultParams": {
            "chambers": 80,
            "turns": 4.5,
            "primaryColor": [1.0, 0.85, 0.65],
            "secondaryColor": [0.3, 0.8, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const pts = [];
      const steps = 300;
      for (let i = 0; i < steps; i++) {
        const th = (i / steps) * Math.PI * 2 * params.turns;
        const r = 0.3 * Math.exp(0.14 * th);
        pts.push(new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r, (i / steps) * 4.0 - 2.0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const spiral = new THREE.Line(geo, mat);
      group.add(spiral);

      scene.userData = { group, spiral, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.7;
      data.group.rotation.x = Math.sin(t * 0.4) * 0.4;
      data.group.rotation.y = Math.cos(t * 0.4) * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "morphogenetic_turing_skin",
        "title": "Morphogenetic Turing Reaction-Diffusion",
        "fileName": "turing_patterns.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🐆 Alan Turing's chemical reaction-diffusion morphogenesis producing self-organizing organic spots & stripes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🧬✨\n\n#threejs #webgl #turing #morphogenesis #reactiondiffusion #nature #creativecoding #javascript #reels",
        "displayCode": """// Gray-Scott Reaction-Diffusion Model
function evaluateTuringPattern(u, v, feed = 0.054, kill = 0.062) {
  // du/dt = Du * laplace(u) - u*v^2 + feed*(1 - u)
  // dv/dt = Dv * laplace(v) + u*v^2 - (feed + kill)*v
  const uv2 = u * v * v;
  const dU = -uv2 + feed * (1.0 - u);
  const dV = uv2 - (feed + kill) * v;
  return { dU, dV };
}""",
        "defaultParams": {
            "sphereRadius": 5.0,
            "particleCount": 6500,
            "primaryColor": [0.2, 0.95, 0.8],
            "secondaryColor": [0.95, 0.3, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * params.sphereRadius;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * params.sphereRadius;
        pos[i * 3 + 2] = Math.cos(ph) * params.sphereRadius;

        const spot = Math.sin(th * 8.0) * Math.cos(ph * 8.0) > 0.1;
        col[i * 3 + 0] = spot ? params.primaryColor[0] : params.secondaryColor[0];
        col[i * 3 + 1] = spot ? params.primaryColor[1] : params.secondaryColor[1];
        col[i * 3 + 2] = spot ? params.primaryColor[2] : params.secondaryColor[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const sphere = new THREE.Points(geo, mat);
      group.add(sphere);

      scene.userData = { group, sphere, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dragonfly_wing_aerodynamics",
        "title": "Dragonfly Wing Aerodynamics",
        "fileName": "dragonfly_wing.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🪰 Micro-venation structural patterns and leading-edge vortex aerodynamics of a dragonfly wing in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌿🔬\n\n#threejs #webgl #dragonfly #biomimicry #aerodynamics #nature #creativecoding #javascript #reels",
        "displayCode": """// Voronoi Wing Micro-Vein Structural Cell Tiling
function generateWingVenation(cells = 120, wingLength = 12) {
  const veins = [];
  for (let c = 0; c < cells; c++) {
    const x = (Math.random() - 0.5) * wingLength;
    const y = (Math.random() - 0.5) * 3.5;
    veins.push(new THREE.Vector3(x, y, 0));
  }
  return veins;
}""",
        "defaultParams": {
            "wingLength": 12.0,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.8, 0.95, 0.3]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Wing outline & veins
      const pts = [];
      for (let i = 0; i <= 60; i++) {
        const u = (i / 60) * Math.PI;
        pts.push(new THREE.Vector3((i / 60) * 12 - 6, Math.sin(u) * 2.8, 0));
      }
      for (let i = 60; i >= 0; i--) {
        const u = (i / 60) * Math.PI;
        pts.push(new THREE.Vector3((i / 60) * 12 - 6, -Math.sin(u) * 1.4, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
      const wing = new THREE.Line(geo, mat);
      group.add(wing);

      scene.userData = { group, wing, params };""",
        "renderBody": """      data.group.rotation.x = Math.sin(t * 12.0) * 0.45; // High speed flutter
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "deep_sea_siphonophore_colony",
        "title": "Deep-Sea Siphonophore Chain",
        "fileName": "siphonophore.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🌊 Deep-sea colonial bathypelagic siphonophore chain undulating through the midnight ocean in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🪼✨\n\n#threejs #webgl #siphonophore #ocean #deepsea #bioluminescence #nature #creativecoding #javascript #reels",
        "displayCode": """// Colonial Nectophore Undulation Chain
function calculateSiphonophoreChain(joints = 40, time = 0) {
  const chainPositions = [];
  for (let j = 0; j < joints; j++) {
    const y = (j / joints) * 16 - 8;
    const waveX = Math.sin(y * 0.4 - time * 3.0) * 1.5;
    const waveZ = Math.cos(y * 0.4 - time * 3.0) * 1.5;
    chainPositions.push(new THREE.Vector3(waveX, y, waveZ));
  }
  return chainPositions;
}""",
        "defaultParams": {
            "chainJoints": 50,
            "primaryColor": [0.15, 0.95, 0.9],
            "secondaryColor": [0.95, 0.35, 0.85]
        },
        "initBody": """      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.chainJoints;
      const bells = [];
      for (let i = 0; i < count; i++) {
        const geo = new THREE.SphereGeometry(0.35, 12, 12);
        const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x2dd4bf : 0xf43f5e, wireframe: true });
        const m = new THREE.Mesh(geo, mat);
        group.add(m);
        bells.push(m);
      }

      scene.userData = { group, bells, count, params };""",
        "renderBody": """      data.bells.forEach((b, idx) => {
        const y = (idx / data.count) * 16 - 8;
        b.position.y = y;
        b.position.x = Math.sin(y * 0.5 - t * 3.0) * 2.2;
        b.position.z = Math.cos(y * 0.5 - t * 3.0) * 2.2;
      });

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "vascular_arterial_tree",
        "title": "Murray's Law Vascular Network",
        "fileName": "vascular_tree.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "❤️ Murray's minimal-work fractal branching hemodynamic arterial blood vessel tree in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🩸\n\n#threejs #webgl #cardiovascular #biology #fractal #medical #creativecoding #javascript #reels",
        "displayCode": """// Murray's Law: r_parent^3 = r_child1^3 + r_child2^3
function branchVascularArtery(startPt, dir, radius = 0.8, depth = 4) {
  if (depth === 0) return;
  const childR = radius * Math.pow(0.5, 1/3); // Murray's exponent 3
  const endPt = startPt.clone().add(dir.clone().multiplyScalar(3.2));
  // Bifurcate with symmetric branching angles
  branchVascularArtery(endPt, dir.clone().applyAxisAngle(new THREE.Vector3(0,0,1), 0.55), childR, depth - 1);
  branchVascularArtery(endPt, dir.clone().applyAxisAngle(new THREE.Vector3(0,0,1), -0.55), childR, depth - 1);
}""",
        "defaultParams": {
            "bloodParticles": 4000,
            "primaryColor": [1.0, 0.2, 0.2],
            "secondaryColor": [0.2, 0.8, 1.0]
        },
        "initBody": """      camera.position.set(0, 2, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Vascular branches
      for (let b = 0; b < 10; b++) {
        const a = (b / 10) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -6, 0),
          new THREE.Vector3(Math.cos(a) * 2, -1, Math.sin(a) * 2),
          new THREE.Vector3(Math.cos(a) * 4.5, 4, Math.sin(a) * 4.5)
        ]);
        const tube = new THREE.TubeGeometry(curve, 20, 0.15, 8, false);
        const mat = new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true });
        group.add(new THREE.Mesh(tube, mat));
      }

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 2 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chladni_plate_acoustic_resonance",
        "title": "Chladni Plate Acoustic Resonance",
        "fileName": "chladni_resonance.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "sacred",
        "caption": "🔊 Ernst Chladni acoustic sound vibration nodal geometries! Resonant standing waves organizing sand in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #chladni #cymatics #acoustics #resonance #sacredgeometry #javascript #reels",
        "displayCode": """// 2D Chladni Resonance Nodal Equations: w = a*sin(nx)*sin(my) - b*sin(mx)*sin(ny)
function evaluateChladniNodalPattern(x, y, n = 3, m = 5) {
  const term1 = Math.sin(n * x) * Math.sin(m * y);
  const term2 = Math.sin(m * x) * Math.sin(n * y);
  return Math.abs(term1 - term2); // Nodal lines occur where w ~ 0
}""",
        "defaultParams": {
            "sandParticles": 7500,
            "plateRadius": 5.2,
            "primaryColor": [1.0, 0.85, 0.3],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.sandParticles;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * params.plateRadius;
        pos[i * 3 + 0] = Math.cos(u) * r;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = Math.sin(u) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, color: 0xf59e0b });
      const sand = new THREE.Points(geo, mat);
      group.add(sand);

      scene.userData = { group, sand, count, params };""",
        "renderBody": """      const pos = data.sand.geometry.attributes.position;
      for (let i = 0; i < data.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const w = Math.sin(3 * x + t) * Math.sin(5 * z) - Math.sin(5 * x) * Math.sin(3 * z + t);
        pos.setY(i, Math.abs(w) * 0.4);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 8 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "fern_barnsley_fractal_3d",
        "title": "3D Barnsley Botanical Fractal",
        "fileName": "barnsley_fern.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🌿 Michael Barnsley iterated function system (IFS) botanical fern fractal growing in 3D in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🍃📐\n\n#threejs #webgl #fractal #barnsley #nature #botany #creativecoding #javascript #mathart #reels",
        "displayCode": """// Barnsley Fern Affine Transformations IFS
function iterateBarnsleyIFS(x, y, z) {
  const r = Math.random();
  if (r < 0.01) return { x: 0, y: 0.16 * y, z: 0 }; // Stem
  if (r < 0.86) return { x: 0.85*x + 0.04*y, y: -0.04*x + 0.85*y + 1.6, z: 0.85*z }; // Successive leaflets
  if (r < 0.93) return { x: 0.2*x - 0.26*y, y: 0.23*x + 0.22*y + 1.6, z: 0.2*z }; // Left leaflet
  return { x: -0.15*x + 0.28*y, y: 0.26*x + 0.24*y + 0.44, z: -0.15*z }; // Right leaflet
}""",
        "defaultParams": {
            "fernPoints": 9000,
            "primaryColor": [0.15, 0.95, 0.4],
            "secondaryColor": [0.8, 1.0, 0.2]
        },
        "initBody": """      camera.position.set(0, 4, 16);
      camera.lookAt(0, 4, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.fernPoints;
      const pos = new Float32Array(count * 3);
      let x = 0, y = 0, z = 0;
      for (let i = 0; i < count; i++) {
        const r = Math.random();
        if (r < 0.01) { x = 0; y = 0.16 * y; z = 0; }
        else if (r < 0.86) { const nx = 0.85*x + 0.04*y; y = -0.04*x + 0.85*y + 1.6; x = nx; z = 0.85*z; }
        else if (r < 0.93) { const nx = 0.2*x - 0.26*y; y = 0.23*x + 0.22*y + 1.6; x = nx; z = 0.2*z; }
        else { const nx = -0.15*x + 0.28*y; y = 0.26*x + 0.24*y + 0.44; x = nx; z = -0.15*z; }

        pos[i * 3 + 0] = x * 1.5;
        pos[i * 3 + 1] = y * 0.9 - 2.0;
        pos[i * 3 + 2] = z * 1.5;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, color: 0x22c55e, blending: THREE.AdditiveBlending });
      const fern = new THREE.Points(geo, mat);
      group.add(fern);

      scene.userData = { group, fern, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 4 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 3, 0);"""
    },
    {
        "id": "bioluminescent_fungi_forest",
        "title": "Bioluminescent Fungal Canopy",
        "fileName": "fungi_forest.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🍄 Glowing enchanted bioluminescent mushroom caps dispersing luminous spore clouds into night in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🌌✨\n\n#threejs #webgl #mushrooms #bioluminescence #forest #nature #creativecoding #javascript #reels",
        "displayCode": """// Mushroom Cap Geometry & Spore Ejection
function createMushroom(x, z, capRadius = 1.6) {
  const capGeo = new THREE.SphereGeometry(capRadius, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
  const stemGeo = new THREE.CylinderGeometry(0.2, 0.3, 3.2, 8);
  const cap = new THREE.Mesh(capGeo, glowMat);
  const stem = new THREE.Mesh(stemGeo, stemMat);
  cap.position.set(x, 3.2, z);
  stem.position.set(x, 1.6, z);
  return { cap, stem };
}""",
        "defaultParams": {
            "mushrooms": 8,
            "spores": 4000,
            "primaryColor": [0.15, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.75]
        },
        "initBody": """      camera.position.set(0, 3, 16);
      camera.lookAt(0, 2, 0);

      const group = new THREE.Group();
      scene.add(group);

      for (let m = 0; m < params.mushrooms; m++) {
        const a = (m / params.mushrooms) * Math.PI * 2;
        const rad = 3.5 + (m % 2) * 2.0;
        const cg = new THREE.SphereGeometry(1.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const cm = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
        const cap = new THREE.Mesh(cg, cm);
        cap.position.set(Math.cos(a) * rad, 2.5, Math.sin(a) * rad);
        group.add(cap);
      }

      // Floating spores
      const sCount = params.spores;
      const sPos = new Float32Array(sCount * 3);
      for (let s = 0; s < sCount; s++) {
        sPos[s * 3 + 0] = (Math.random() - 0.5) * 14;
        sPos[s * 3 + 1] = Math.random() * 8;
        sPos[s * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({ size: 0.14, color: 0xa855f7, blending: THREE.AdditiveBlending });
      const spores = new THREE.Points(sGeo, sMat);
      group.add(spores);

      scene.userData = { group, spores, sCount, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;

      const pos = data.spores.geometry.attributes.position;
      for (let s = 0; s < data.sCount; s++) {
        let y = pos.getY(s) + 0.05;
        if (y > 8) y = 0;
        pos.setY(s, y);
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 3 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 2, 0);"""
    },
    {
        "id": "dandelion_pappus_wind_dispersal",
        "title": "Dandelion Pappus Vortex Ring Drift",
        "fileName": "dandelion_pappus.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "lofi",
        "caption": "🌾 Aerodynamic separated vortex ring keeping dandelion parachute seeds aloft in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🍃✨\n\n#threejs #webgl #dandelion #aerodynamics #nature #botany #creativecoding #javascript #reels",
        "displayCode": """// Separated Vortex Ring Aerodynamic Recirculation
function generateDandelionFluff(spokes = 64, radius = 4.2) {
  const fluffLines = [];
  for (let s = 0; s < spokes; s++) {
    const a = (s / spokes) * Math.PI * 2;
    fluffLines.push(0, 0, 0);
    fluffLines.push(Math.cos(a) * radius, 1.8, Math.sin(a) * radius);
  }
  return fluffLines;
}""",
        "defaultParams": {
            "spokesCount": 72,
            "primaryColor": [0.95, 0.95, 0.85],
            "secondaryColor": [0.35, 0.85, 1.0]
        },
        "initBody": """      camera.position.set(0, 2, 16);
      camera.lookAt(0, 1, 0);

      const group = new THREE.Group();
      scene.add(group);

      const lines = [];
      const count = params.spokesCount;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        lines.push(0, -1, 0);
        lines.push(Math.cos(a) * 4.5, 2.5, Math.sin(a) * 4.5);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });
      const fluff = new THREE.LineSegments(geo, mat);
      group.add(fluff);

      scene.userData = { group, fluff, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 1, 0);"""
    }
]
