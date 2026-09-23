// variations_engine.js
// Infinite Procedural Variation Synthesizer for 3D Three.js Reels
// Generates thousands of distinct, mathematically sophisticated, non-repetitive visual variations with 0% failure rate.

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VariationsEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  // Deterministic Mulberry32 PRNG
  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Curated Luxury Color Palettes
  const MASTER_PALETTES = [
    {
      name: "Cyber Neon",
      category: "Cyberpunk",
      primary: [0.1, 0.95, 1.0],      // Electric Cyan
      secondary: [1.0, 0.15, 0.65],   // Hot Neon Magenta
      accent: [0.95, 0.9, 0.2],       // Laser Yellow
      bgGlow: "rgba(6, 182, 212, 0.3)"
    },
    {
      name: "Solar Flare & Plasma",
      category: "Stellar",
      primary: [1.0, 0.72, 0.12],     // Incandescent Solar Gold
      secondary: [0.95, 0.2, 0.15],   // Corona Crimson
      accent: [1.0, 0.98, 0.9],       // White Heat Core
      bgGlow: "rgba(245, 158, 11, 0.3)"
    },
    {
      name: "Abyssal Bioluminescence",
      category: "Deep Sea",
      primary: [0.05, 0.95, 0.82],    // Electric Aqua Plankton
      secondary: [0.65, 0.22, 0.95],  // Midnight Violet
      accent: [0.2, 0.8, 1.0],        // Ocean Cyan
      bgGlow: "rgba(45, 212, 191, 0.3)"
    },
    {
      name: "Quantum Matrix",
      category: "Digital Void",
      primary: [0.15, 0.98, 0.45],    // Matrix Emerald Phosphor
      secondary: [0.1, 0.85, 0.95],   // Cold Terminal Cyan
      accent: [0.85, 1.0, 0.2],       // Electric Lime
      bgGlow: "rgba(34, 197, 94, 0.3)"
    },
    {
      name: "Celestial Nebula",
      category: "Cosmology",
      primary: [0.62, 0.25, 0.95],    // Royal Ultraviolet
      secondary: [0.98, 0.45, 0.75],  // Stardust Pink
      accent: [0.35, 0.85, 1.0],      // Ionized Gas Blue
      bgGlow: "rgba(168, 85, 247, 0.3)"
    },
    {
      name: "Relativistic Monolith",
      category: "Dark Matter",
      primary: [0.95, 0.98, 1.0],     // Diamond White
      secondary: [0.25, 0.55, 1.0],   // Cobalt Cherenkov
      accent: [0.55, 0.65, 0.8],      // Titanium Steel
      bgGlow: "rgba(96, 165, 250, 0.3)"
    },
    {
      name: "Supernova Remnant",
      category: "Astrophysics",
      primary: [1.0, 0.35, 0.1],      // Blast Wave Orange
      secondary: [0.3, 0.7, 1.0],     // Synchrotron Blue
      accent: [1.0, 0.9, 0.4],        // Ionized Core
      bgGlow: "rgba(249, 115, 22, 0.3)"
    },
    {
      name: "Tokyo Synthwave",
      category: "Retro-Future",
      primary: [0.95, 0.1, 0.55],     // Outrun Magenta
      secondary: [0.15, 0.9, 0.95],   // Arcade Teal
      accent: [1.0, 0.8, 0.2],        // Sunset Amber
      bgGlow: "rgba(236, 72, 153, 0.3)"
    },
    {
      name: "Aurora Borealis",
      category: "Atmospheric",
      primary: [0.1, 0.95, 0.65],     // Magnetic Green
      secondary: [0.55, 0.2, 0.95],   // Ion Violet
      accent: [0.2, 0.85, 1.0],       // Polar Sky Blue
      bgGlow: "rgba(16, 185, 129, 0.3)"
    },
    {
      name: "Singularity Event",
      category: "Relativity",
      primary: [1.0, 0.85, 0.3],      // Photon Ring Gold
      secondary: [0.1, 0.1, 0.15],    // Event Horizon Pitch
      accent: [0.4, 0.75, 1.0],       // Doppler Jet Cyan
      bgGlow: "rgba(217, 119, 6, 0.3)"
    },
    {
      name: "Electromagnetic Flux",
      category: "Electrodynamics",
      primary: [0.2, 0.6, 1.0],       // Poynting Flux Blue
      secondary: [1.0, 0.3, 0.3],     // Magnetic Vector Red
      accent: [1.0, 1.0, 1.0],        // Electric Field Crest
      bgGlow: "rgba(59, 130, 246, 0.3)"
    },
    {
      name: "Golden Ratio Sacred",
      category: "Geometry",
      primary: [0.95, 0.8, 0.3],      // Fibonacci Gold
      secondary: [0.85, 0.35, 0.95],  // Merkaba Violet
      accent: [1.0, 0.95, 0.8],       // Pure Crystal White
      bgGlow: "rgba(234, 179, 8, 0.3)"
    }
  ];

  const VIRAL_HOOK_ADJECTIVES = [
    "Hypnotic", "Mesmerizing", "Mind-Blowing", "Jaw-Dropping", "Infinite",
    "Relativistic", "Hyperdimensional", "Quantum", "Procedural", "Luminous",
    "Astrophysical", "Bioluminescent", "Algorithmic", "Transcendent", "Harmonic"
  ];

  const CAMERA_MODES = [
    "orbital_cinematic",  // Smooth 360-degree sweep with altitude undulation
    "dramatic_plunge",    // Low-angle sweeping hero dive
    "dolly_spiral",       // Inward/outward breathing corkscrew
    "focal_drift",        // Floating zero-g drift with cinematic tilt
    "oscillating_sweep"   // Left-right harmonic panning
  ];

  function createVariation(visualizerId, variationIndex = 0, customSeed = null) {
    const seedValue = customSeed !== null ? customSeed : (variationIndex * 9973 + 1337);
    const rng = mulberry32(seedValue);

    // Pick Palette
    const paletteIndex = Math.floor(rng() * MASTER_PALETTES.length);
    const palette = MASTER_PALETTES[paletteIndex];

    // Pick Camera Preset
    const cameraMode = CAMERA_MODES[Math.floor(rng() * CAMERA_MODES.length)];

    // Variation Adjective
    const adj = VIRAL_HOOK_ADJECTIVES[Math.floor(rng() * VIRAL_HOOK_ADJECTIVES.length)];

    // Base motion & speed dynamics
    const speedMult = 0.75 + rng() * 0.75; // 0.75 to 1.50
    const densityMult = 0.85 + rng() * 0.50; // 0.85 to 1.35
    const turbulence = 0.5 + rng() * 1.0;

    // Visualizer Specific Parameters
    let specificParams = {};
    let customCodeSnippet = "";
    let baseTitle = "";
    let category = "";
    let fileName = "";
    let caption = "";

    switch (visualizerId) {
      case "black_hole_gargantua": {
        baseTitle = "Cosmic Singularity & Gargantua";
        category = "Astrophysics & Relativity";
        fileName = "black_hole.js";
        const kerrSpin = (0.75 + rng() * 0.24).toFixed(3); // Kerr spin parameter a in [0.75, 0.99]
        const particleCount = Math.floor(12000 * densityMult);
        const diskRadiusMax = 12.0 + rng() * 4.0;
        const dopplerBeaming = 1.0 + rng() * 0.6;

        specificParams = {
          kerrSpin: parseFloat(kerrSpin),
          particleCount,
          diskRadiusMin: 2.1,
          diskRadiusMax,
          coreRadius: 1.8,
          spinSpeed: speedMult * 1.3,
          dopplerBeaming,
          cameraMode
        };

        customCodeSnippet = `// Kerr Metric Relativistic Singularity (Spin a=${kerrSpin})
function renderAccretionDisk(scene, particles = ${particleCount}) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(particles * 3);
  const col = new Float32Array(particles * 3);

  for (let i = 0; i < particles; i++) {
    // Relativistic frame-dragging & Keplerian velocity
    const r = 2.1 + Math.pow(Math.random(), 1.7) * ${(diskRadiusMax - 2.1).toFixed(1)};
    const theta = Math.random() * Math.PI * 2;
    pos[i * 3 + 0] = Math.cos(theta) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * (0.12 + r * 0.035);
    pos[i * 3 + 2] = Math.sin(theta) * r;

    // Doppler beaming temperature: (${palette.name})
    const heat = Math.max(0, 1.0 - (r - 2.1) / ${(diskRadiusMax - 2.1).toFixed(1)});
    col[i * 3 + 0] = ${palette.primary[0].toFixed(2)} * heat + ${palette.secondary[0].toFixed(2)} * (1 - heat);
    col[i * 3 + 1] = ${palette.primary[1].toFixed(2)} * heat + ${palette.secondary[1].toFixed(2)} * (1 - heat);
    col[i * 3 + 2] = ${palette.primary[2].toFixed(2)} * heat + ${palette.secondary[2].toFixed(2)} * (1 - heat);
  }
  return new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.18, vertexColors: true, blending: THREE.AdditiveBlending
  }));
}`;

        caption = `🌌 Relativistic Gargantua Black Hole (Kerr spin a=${kerrSpin}) rendered with Three.js & WebGL! ${particleCount} particles with Doppler shift. Follow @kreggsjs for daily 3D code reels! ✨\n\n#threejs #webgl #astrophysics #blackhole #creativecoding #javascript #space #physics #reels`;
        break;
      }

      case "quantum_neural_matrix": {
        baseTitle = "Quantum Neural Synapse Matrix";
        category = "AI & Neuro-Computation";
        fileName = "neural_matrix.js";
        const nodeCount = Math.floor(140 + rng() * 60);
        const axonDist = 4.2 + rng() * 1.2;
        const pulseCount = Math.floor(160 + rng() * 80);

        specificParams = {
          nodeCount,
          axonMaxDist: axonDist,
          pulseSpeed: speedMult * 3.8,
          pulseCount,
          haloParticles: Math.floor(6000 * densityMult),
          cameraMode
        };

        customCodeSnippet = `// 3D Neural Action Potentials (${nodeCount} Synaptic Nodes)
function simulateSynapses(nodes, maxDist = ${axonDist.toFixed(1)}) {
  const linePos = [], lineCol = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j]);
      if (dist < maxDist && Math.random() < 0.35) {
        linePos.push(nodes[i].x, nodes[i].y, nodes[i].z);
        linePos.push(nodes[j].x, nodes[j].y, nodes[j].z);

        const intensity = 1.0 - dist / maxDist;
        lineCol.push(${palette.primary[0].toFixed(2)} * intensity, ${palette.primary[1].toFixed(2)} * intensity, ${palette.primary[2].toFixed(2)});
        lineCol.push(${palette.secondary[0].toFixed(2)} * intensity, ${palette.secondary[1].toFixed(2)}, ${palette.secondary[2].toFixed(2)} * intensity);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3));
  return new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
    vertexColors: true, blending: THREE.AdditiveBlending
  }));
}`;

        caption = `🧠 Quantum Neural Synapse Matrix with ${nodeCount} active nodes & high-frequency action potentials in Three.js WebGL! Follow @kreggsjs for daily algorithmic art! ⚡🤖\n\n#threejs #webgl #neuralnetwork #artificialintelligence #javascript #creativecoding #datascience #reels #ai`;
        break;
      }

      case "sacred_merkaba_tesseract": {
        baseTitle = "4D Tesseract & Sacred Merkaba";
        category = "Higher Dimensions & Sacred Geometry";
        fileName = "tesseract_4d.js";
        const speedXW = (0.7 + rng() * 0.6) * speedMult;
        const speedYZ = (0.5 + rng() * 0.5) * speedMult;

        specificParams = {
          speedXW,
          speedYZ,
          ringCount: 3,
          particleStars: Math.floor(5000 * densityMult),
          cameraMode
        };

        customCodeSnippet = `// 4D Tesseract Stereographic Projection
function project4Dto3D(v4, angleXW, angleYZ) {
  const cosA = Math.cos(angleXW), sinA = Math.sin(angleXW);
  const cosB = Math.cos(angleYZ), sinB = Math.sin(angleYZ);

  let [x, y, z, w] = v4;
  // Rotate in XW (Speed: ${speedXW.toFixed(2)})
  const x1 = x * cosA - w * sinA;
  const w1 = x * sinA + w * cosA;
  // Rotate in YZ (Speed: ${speedYZ.toFixed(2)})
  const y1 = y * cosB - z * sinB;
  const z1 = y * sinB + z * cosB;

  const distance4D = 2.4;
  const scale = 1.0 / (distance4D - w1);
  return new THREE.Vector3(x1 * scale * 3.8, y1 * scale * 3.8, z1 * scale * 3.8);
}`;

        caption = `🔮 4D Hypercube (Tesseract) projected into 3D with Astral Merkaba gimbal rings in Three.js WebGL! Follow @kreggsjs for daily math art reels! ⚡📐\n\n#threejs #webgl #tesseract #sacredgeometry #mathart #javascript #creativecoding #geometry #reels #math`;
        break;
      }

      case "cyber_synthwave_highway": {
        baseTitle = "Synthwave Grid & Neon Sun";
        category = "Retro-Futurism & Cyberpunk";
        fileName = "synthwave_highway.js";
        const highwaySpeed = 2.6 + rng() * 1.6;
        const waveScale = (2.2 + rng() * 1.4).toFixed(2);

        specificParams = {
          highwaySpeed,
          waveScale: parseFloat(waveScale),
          sunRadius: 4.6 + rng() * 0.8,
          cameraMode
        };

        customCodeSnippet = `// Procedural Cyber Terrain Waves (Speed: ${highwaySpeed.toFixed(1)})
function renderGridTerrain(gridMesh, time, speed = ${highwaySpeed.toFixed(1)}) {
  const pos = gridMesh.geometry.attributes.position;
  const count = pos.count;

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const zOffset = (y + time * speed) % 60;
    
    // Mountain ridges along perimeter (${waveScale}x amplitude)
    const roadDist = Math.abs(x);
    const mountainFactor = Math.pow(Math.min(1.0, roadDist / 12.0), 2.2);
    const wave = Math.sin(x * 0.35 + time * 1.5) * Math.cos(zOffset * 0.25);
    pos.setZ(i, wave * ${waveScale} * mountainFactor);
  }
  pos.needsUpdate = true;
}`;

        caption = `🌆 Infinite Cyberpunk Synthwave Grid & Neon Horizon Sun in Three.js WebGL! Procedural terrain waves at ${highwaySpeed.toFixed(1)}x velocity. Follow @kreggsjs for daily code reels! ⚡🕹️\n\n#threejs #webgl #synthwave #cyberpunk #outrun #creativecoding #javascript #vfx #reels #retrowave`;
        break;
      }

      case "bioluminescent_jellyfish": {
        baseTitle = "Bioluminescent Abyssal Jellyfish";
        category = "Organic Physics & Marine Bioluminescence";
        fileName = "abyssal_jellyfish.js";
        const tentacleCount = Math.floor(8 + rng() * 8); // 8 to 15 tentacles
        const pulseRate = (1.8 + rng() * 1.0).toFixed(2);

        specificParams = {
          tentacleCount,
          particlesPerTentacle: 120,
          pulseRate: parseFloat(pulseRate),
          planktonCount: Math.floor(3500 * densityMult),
          cameraMode
        };

        customCodeSnippet = `// Bioluminescent Bell Contraction (Pulse: ${pulseRate} Hz)
function updateJellyfishBell(geometry, time, pulseRate = ${pulseRate}) {
  const pos = geometry.attributes.position;
  const count = pos.count;
  
  // Biological pulse contraction & expansion cycle
  const pulse = Math.pow(Math.sin(time * pulseRate), 4.0);
  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const r = Math.sqrt(x * x + z * z);
    const wave = Math.sin(r * 2.2 - time * 4.0) * 0.18;
    pos.setY(i, y + wave + pulse * 0.6);
  }
  pos.needsUpdate = true;
}`;

        caption = `🪼 Mesmerizing Bioluminescent Deep-Sea Jellyfish with ${tentacleCount} tentacles undulating in Three.js WebGL! Follow @kreggsjs for daily creative code reels! 🌊✨\n\n#threejs #webgl #generativeart #creativecoding #ocean #bioluminescence #javascript #animation #reels`;
        break;
      }

      case "quantum_dna_helix": {
        baseTitle = "Quantum DNA Double Helix";
        category = "Biotech & Quantum Genetics";
        fileName = "quantum_dna.js";
        const turns = (3.2 + rng() * 1.8).toFixed(1);
        const steps = Math.floor(180 + rng() * 80);

        specificParams = {
          helixLength: 26,
          turns: parseFloat(turns),
          steps,
          radius: 3.2 + rng() * 0.6,
          cloudParticles: Math.floor(5000 * densityMult),
          cameraMode
        };

        customCodeSnippet = `// Quantum DNA Helix (${turns} Turns, ${steps} Base Pairs)
function buildDoubleHelix(length = 26, turns = ${turns}) {
  const steps = ${steps};
  const strandA = [], strandB = [];
  const baseBridges = [];

  for (let i = 0; i < steps; i++) {
    const u = i / steps;
    const angle = u * Math.PI * 2 * turns;
    const y = (u - 0.5) * length;

    const pA = new THREE.Vector3(Math.cos(angle) * 3.2, y, Math.sin(angle) * 3.2);
    const pB = new THREE.Vector3(-pA.x, y, -pA.z);
    strandA.push(pA); strandB.push(pB);

    if (i % 4 === 0) {
      baseBridges.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
    }
  }
  return { strandA, strandB, baseBridges };
}`;

        caption = `🧬 Quantum DNA Double Helix & Nanotech Scanner in Three.js WebGL! ${steps} base pairs rendered live at 60 FPS. Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #dna #genetics #biotech #creativecoding #javascript #biology #mathart #reels`;
        break;
      }

      default: {
        baseTitle = visualizerId;
        category = "Creative Coding";
        fileName = "algorithm.js";
        customCodeSnippet = "// 3D WebGL Algorithmic Visualizer";
        caption = "#threejs #webgl #creativecoding #reels";
      }
    }

    const variantId = `${visualizerId}_var_${variationIndex + 1}`;
    const title = `${adj} ${baseTitle} #${variationIndex + 1}`;

    const params = Object.assign({
      variantIndex: variationIndex,
      seed: seedValue,
      paletteName: palette.name,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent,
      bgGlow: palette.bgGlow,
      speedMult,
      densityMult,
      turbulence
    }, specificParams);

    return {
      variantId,
      visualizerId,
      variationIndex,
      seed: seedValue,
      title,
      paletteName: palette.name,
      bgGlow: palette.bgGlow,
      category,
      fileName,
      displayCode: customCodeSnippet,
      caption,
      params
    };
  }

  return {
    MASTER_PALETTES,
    VIRAL_HOOK_ADJECTIVES,
    CAMERA_MODES,
    createVariation
  };
});
