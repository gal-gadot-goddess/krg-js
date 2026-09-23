// visualizers/quantum_dna_helix.js
// Quantum Double Helix, Nucleotide Base Pairs & Orbiting Nanobots

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_dna_helix = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_dna_helix",
    title: "Quantum DNA Double Helix",
    fileName: "quantum_dna.js",
    category: "Biotech & Quantum Genetics",
    genre: "cyber",
    caption: "🧬 Quantum DNA Double Helix & Nanotech Scanner rendered with Three.js WebGL! 4 base-pair nucleotides bound by hydrogen energy potentials. Follow for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #dna #genetics #biotech #creativecoding #javascript #biology #mathart #reels",
    
    displayCode: `// 3D Quantum DNA Helix & Base Pair Bridges
function buildDoubleHelix(length = 24, turns = 3.5) {
  const steps = 180;
  const strandA = [], strandB = [];
  const baseBridges = [];

  for (let i = 0; i < steps; i++) {
    const u = i / steps;
    const angle = u * Math.PI * 2 * turns;
    const y = (u - 0.5) * length;
    const radius = 3.2;

    const pA = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    const pB = new THREE.Vector3(-Math.cos(angle) * radius, y, -Math.sin(angle) * radius);
    strandA.push(pA); strandB.push(pB);

    if (i % 4 === 0) {
      baseBridges.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
    }
  }
  return { strandA, strandB, baseBridges };
}`,

    defaultParams: {
      helixLength: 28,
      turns: 4.2,
      steps: 220,
      radius: 3.4,
      cloudParticles: 5000,
      primaryColor: [0.2, 0.95, 0.95], // Cyan
      secondaryColor: [0.95, 0.25, 0.7] // Magenta
    },

    init: function(THREE, scene, camera, renderer, params) {
      params = Object.assign({}, this.defaultParams, params || {});

      while (scene.children.length > 0) {
        const obj = scene.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        scene.remove(obj);
      }

      camera.fov = 50;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 18);

      const dnaGroup = new THREE.Group();
      scene.add(dnaGroup);

      const steps = params.steps;
      const length = params.helixLength;
      const turns = params.turns;
      const radius = params.radius;

      // 1. Strand A and Strand B Points
      const strandPos = new Float32Array(steps * 2 * 3);
      const strandCol = new Float32Array(steps * 2 * 3);

      for (let i = 0; i < steps; i++) {
        const u = i / steps;
        const angle = u * Math.PI * 2 * turns;
        const y = (u - 0.5) * length;

        // Strand A
        strandPos[i * 3 + 0] = Math.cos(angle) * radius;
        strandPos[i * 3 + 1] = y;
        strandPos[i * 3 + 2] = Math.sin(angle) * radius;

        strandCol[i * 3 + 0] = 0.15;
        strandCol[i * 3 + 1] = 0.95;
        strandCol[i * 3 + 2] = 1.0;

        // Strand B
        const bIdx = (steps + i) * 3;
        strandPos[bIdx + 0] = -Math.cos(angle) * radius;
        strandPos[bIdx + 1] = y;
        strandPos[bIdx + 2] = -Math.sin(angle) * radius;

        strandCol[bIdx + 0] = 0.95;
        strandCol[bIdx + 1] = 0.25;
        strandCol[bIdx + 2] = 0.75;
      }

      const strandGeo = new THREE.BufferGeometry();
      strandGeo.setAttribute('position', new THREE.BufferAttribute(strandPos, 3));
      strandGeo.setAttribute('color', new THREE.BufferAttribute(strandCol, 3));

      // Circular particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const c = canvas.getContext('2d');
      const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(100, 240, 255, 0.9)');
      grad.addColorStop(0.7, 'rgba(240, 60, 180, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = grad;
      c.fillRect(0, 0, 64, 64);
      const glowTex = new THREE.CanvasTexture(canvas);

      const strandMat = new THREE.PointsMaterial({
        size: 0.38,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        map: glowTex,
        depthWrite: false
      });
      const strandPoints = new THREE.Points(strandGeo, strandMat);
      dnaGroup.add(strandPoints);

      // 2. Base Pair Hydrogen Bridges (Line Segments)
      const bridgeLines = [];
      const bridgeColors = [];
      for (let i = 0; i < steps; i += 4) {
        const u = i / steps;
        const angle = u * Math.PI * 2 * turns;
        const y = (u - 0.5) * length;

        const xA = Math.cos(angle) * radius;
        const zA = Math.sin(angle) * radius;
        const xB = -xA;
        const zB = -zA;

        bridgeLines.push(xA, y, zA, xB, y, zB);

        // A-T and G-C base pair color encoding
        const pairType = (i / 4) % 2;
        if (pairType === 0) {
          bridgeColors.push(0.2, 0.9, 1.0, 0.95, 0.85, 0.2); // Adenine - Thymine
        } else {
          bridgeColors.push(0.95, 0.2, 0.7, 0.3, 0.95, 0.4); // Guanine - Cytosine
        }
      }

      const bridgeGeo = new THREE.BufferGeometry();
      bridgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(bridgeLines, 3));
      bridgeGeo.setAttribute('color', new THREE.Float32BufferAttribute(bridgeColors, 3));
      const bridgeMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.75
      });
      const bridgeMesh = new THREE.LineSegments(bridgeGeo, bridgeMat);
      dnaGroup.add(bridgeMesh);

      // 3. Orbiting Nanotech Scanner Ring
      const scannerGroup = new THREE.Group();
      dnaGroup.add(scannerGroup);

      const ringGeo = new THREE.TorusGeometry(radius * 1.45, 0.08, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scannerGroup.add(ringMesh);

      // 4. Surrounding Quantum Cloud Particles (5,000)
      const cloudCount = params.cloudParticles;
      const cloudGeo = new THREE.BufferGeometry();
      const cloudPos = new Float32Array(cloudCount * 3);
      const cloudCol = new Float32Array(cloudCount * 3);

      for (let k = 0; k < cloudCount; k++) {
        const rad = 4.5 + Math.random() * 8.5;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * (length * 1.3);

        cloudPos[k * 3 + 0] = Math.cos(theta) * rad;
        cloudPos[k * 3 + 1] = y;
        cloudPos[k * 3 + 2] = Math.sin(theta) * rad;

        const fade = 0.3 + 0.7 * Math.random();
        cloudCol[k * 3 + 0] = 0.2 * fade;
        cloudCol[k * 3 + 1] = 0.75 * fade;
        cloudCol[k * 3 + 2] = 1.0 * fade;
      }
      cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPos, 3));
      cloudGeo.setAttribute('color', new THREE.BufferAttribute(cloudCol, 3));
      const cloudMat = new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });
      const cloudPoints = new THREE.Points(cloudGeo, cloudMat);
      dnaGroup.add(cloudPoints);

      scene.userData = {
        dnaGroup,
        scannerGroup,
        length,
        params
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      // Rotate DNA strand
      data.dnaGroup.rotation.y = t * 0.7;

      // Animate nanotech scanner ring scanning up and down the helix
      const scanPeriod = 6.0;
      const scanU = (Math.sin((t / scanPeriod) * Math.PI * 2) * 0.5 + 0.5);
      const scanY = (scanU - 0.5) * (data.length * 0.85);
      data.scannerGroup.position.y = scanY;
      data.scannerGroup.rotation.z = t * 2.0;

      // Cinematic vertical dolly sweep
      const camY = Math.sin(t * 0.4) * 6.0;
      const camRadius = 16.0 + Math.cos(t * 0.5) * 2.0;
      const camTheta = t * 0.25;

      camera.position.x = Math.sin(camTheta) * camRadius;
      camera.position.z = Math.cos(camTheta) * camRadius;
      camera.position.y = camY;
      camera.lookAt(0, camY * 0.2, 0);

      renderer.render(scene, camera);
    }
  };
});
