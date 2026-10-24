# tools/defs_new_bio.py
# 15 Bio-Synthetics, Living Crystals & Microscopic Wonders Visualizers (IDs 146-160)

DEFS_BIO = [
    {
        "id": "diatom_silica_frustule_lattice",
        "title": "Glass Diatom Microscopic Nanoporous Silica Frustule",
        "fileName": "diatom_silica.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "ambient",
        "caption": "🌿 Intricate natural nanotechnology! Radial nanoporous silica glass architecture of a microscopic oceanic Diatom in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬✨\n\n#threejs #webgl #diatom #nanotechnology #biomineralization #ocean #microscopy #creativecoding #javascript #reels",
        "displayCode": "// Diatom Radial Areola Pore Tessellation\nfunction diatomAreola(r, theta, n = 16) {\n  const poreRadius = 0.3 * (1.0 + 0.2 * Math.sin(theta * n));\n  const ribHeight = Math.cos(r * 4.0) * 0.8;\n  return { poreRadius, ribHeight };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.8, 0.2],
            "rings": 12
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Radial Diatom Frustule Rings with Nanopores
      const frustule = new THREE.Group();
      group.add(frustule);
      const ringCount = params.rings;

      for (let r = 1; r <= ringCount; r++) {
        const radius = r * 0.55;
        const count = r * 8;
        const pts = [];
        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 2;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          const y = Math.cos(radius * 1.5) * 0.8;
          pts.push(x, y, z);
        }
        const rGeo = new THREE.BufferGeometry();
        rGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const col = (r % 2 === 0 ? c1 : c2);
        const points = new THREE.Points(rGeo, new THREE.PointsMaterial({ color: col, size: 0.18, blending: THREE.AdditiveBlending }));
        frustule.add(points);
      }

      // Outer Silica Rim Wireframe
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(ringCount * 0.55 + 0.2, 0.2, 16, 64),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true })
      );
      rim.rotation.x = Math.PI / 2;
      group.add(rim);

      scene.userData = { group, frustule, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = 0.5 + Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bacteriophage_t4_nanomachine",
        "title": "Bacteriophage T4 Nanomachine DNA Injection Mechanism",
        "fileName": "bacteriophage_t4.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "cyber",
        "caption": "🦠 The biological lunar lander! Bacteriophage T4 viral nanomachine injecting genetic viral DNA into a bacterium in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #bacteriophage #virus #nanomachine #biology #molecular #creativecoding #javascript #reels",
        "displayCode": "// Bacteriophage Tail Sheath Contraction Torque\nfunction tailSheathContraction(z, theta, contractionFactor = 0.6) {\n  const newHeight = z * contractionFactor;\n  const twistAngle = theta + (1.0 - contractionFactor) * Math.PI;\n  return { newHeight, twistAngle };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.4],
            "secondaryColor": [0.95, 0.2, 0.7],
            "legCount": 6
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 2, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Icosahedral Head Capsid
      const head = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.4, 1),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true })
      );
      head.position.y = 4.5;
      group.add(head);

      // Contractile Tail Sheath Cylinder
      const tail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 4.0, 16, 8, true),
        new THREE.MeshStandardMaterial({ color: c2, wireframe: true })
      );
      tail.position.y = 1.8;
      group.add(tail);

      // Tail Fibers / Legs
      const legs = new THREE.Group();
      group.add(legs);
      const legCount = params.legCount;

      for (let i = 0; i < legCount; i++) {
        const phi = (i / legCount) * Math.PI * 2;
        const pts = [
          new THREE.Vector3(0, -0.2, 0),
          new THREE.Vector3(Math.cos(phi) * 1.8, -1.8, Math.sin(phi) * 1.8),
          new THREE.Vector3(Math.cos(phi) * 3.2, -3.8, Math.sin(phi) * 3.2)
        ];
        const leg = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: c1, linewidth: 2 })
        );
        legs.add(leg);
      }

      scene.userData = { group, head, tail, legs, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.head.rotation.y = t * 0.8;
      // Tail pulsing injection motion
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.08;
      data.tail.scale.set(1.0 / Math.sqrt(pulse), pulse, 1.0 / Math.sqrt(pulse));

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 2 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "atp_synthase_molecular_motor",
        "title": "Rotary F1-Fo ATP Synthase Molecular Turbine",
        "fileName": "atp_synthase.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "cyber",
        "caption": "⚡ Nature's nano-turbine spinning at 9,000 RPM! F1-Fo ATP Synthase generating cellular chemical energy (ATP) in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🔋\n\n#threejs #webgl #atpsynthase #molecularmotor #biochemistry #nanotechnology #creativecoding #javascript #reels",
        "displayCode": "// ATP Synthase Proton-Motive Force & Rotary Torque\nfunction atpRotaryTorque(delta_pH, delta_psi) {\n  const pmf = delta_psi - 2.3 * (8.314 * 310 / 96485) * delta_pH;\n  const torque = pmf * 3.0 * (100 / 12); // pN*nm per step\n  return { pmf, torque };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.75, 0.15],
            "secondaryColor": [0.2, 0.85, 1.0],
            "subunits": 12
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 3, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Fo Membrane Rotor Ring (c-ring)
      const cRing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 1.8, params.subunits, 1, true),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      cRing.position.y = 3.5;
      group.add(cRing);

      // Central Asymmetric Stalk (gamma subunit)
      const stalk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 4.0, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      stalk.position.y = 1.0;
      group.add(stalk);

      // F1 Catalytic Hexamer (alpha-3 beta-3)
      const f1Head = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.2, 2.2, 6),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.4, wireframe: true })
      );
      f1Head.position.y = -1.8;
      group.add(f1Head);

      scene.userData = { group, cRing, stalk, f1Head, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      // High-speed rotary stepped motion of central rotor
      data.cRing.rotation.y = t * 5.0;
      data.stalk.rotation.y = t * 5.0;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 3 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "kinesin_microtubule_walking",
        "title": "Dimeric Kinesin Motor Protein Walking on Microtubule",
        "fileName": "kinesin_walking.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "👣 Hand-over-hand 8-nanometer steps! Molecular kinesin motor protein carrying synaptic cargo vesicles along a microtubule protofilament in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🧠\n\n#threejs #webgl #kinesin #microtubule #molecularmotor #cellbiology #creativecoding #javascript #reels",
        "displayCode": "// Kinesin Hand-Over-Hand Stepping Velocity\nfunction kinesinVelocity(ATP_conc, loadForce = 2.0) {\n  const V_max = 800; // nm/s\n  const K_m = 20; // microMolar\n  const v = (V_max * ATP_conc) / (K_m + ATP_conc) * Math.exp(-loadForce / 7.0);\n  return v; // 8 nm step per ATP hydrolyzed\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 0.4],
            "secondaryColor": [1.0, 0.45, 0.2],
            "trackLength": 16
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Microtubule Hollow Cylinder (13 Protofilaments)
      const mtGeo = new THREE.CylinderGeometry(1.5, 1.5, 16, 24, 16, true);
      mtGeo.rotateZ(Math.PI / 2);
      const mtMat = new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true });
      const mt = new THREE.Mesh(mtGeo, mtMat);
      mt.position.y = -2.0;
      group.add(mt);

      // Kinesin Two Motor Heads
      const head1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6 }));
      const head2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.6 }));
      group.add(head1);
      group.add(head2);

      // Cargo Vesicle
      const cargo = new THREE.Mesh(
        new THREE.SphereGeometry(2.0, 24, 24),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true })
      );
      cargo.position.y = 2.5;
      group.add(cargo);

      scene.userData = { group, head1, head2, cargo, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      // Hand-over-hand step oscillation
      const stepPhase = t * 4.0;
      const h1x = Math.sin(stepPhase) * 1.2;
      const h1y = -0.5 + Math.max(0, Math.cos(stepPhase)) * 0.8;
      const h2x = -Math.sin(stepPhase) * 1.2;
      const h2y = -0.5 + Math.max(0, -Math.cos(stepPhase)) * 0.8;

      data.head1.position.set(h1x, h1y, 0);
      data.head2.position.set(h2x, h2y, 0);
      data.cargo.position.x = Math.sin(t * 0.5) * 0.4;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chloroplast_thylakoid_grana",
        "title": "Chloroplast Helical Thylakoid Grana Membrane Stacks",
        "fileName": "chloroplast_grana.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "🍃 Helical interconnecting thylakoid grana membrane stacks quantum energy funneling in plant chloroplasts in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬☀️\n\n#threejs #webgl #chloroplast #photosynthesis #thylakoid #biology #biophysics #creativecoding #javascript #reels",
        "displayCode": "// Exciton Energy Transfer Resonance\nfunction forsterEnergyTransfer(R, R0 = 5.0) {\n  const efficiency = 1.0 / (1.0 + Math.pow(R / R0, 6.0));\n  return efficiency; // quantum photosynthetic antenna\n}",
        "defaultParams": {
            "primaryColor": [0.15, 0.95, 0.35],
            "secondaryColor": [0.85, 1.0, 0.2],
            "stackDiscs": 9
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.stackDiscs;
      const discs = [];

      for (let i = 0; i < count; i++) {
        const y = -4.0 + (i / count) * 8.0;
        const dGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.45, 32);
        const mix = i / count;
        const col = c1.clone().lerp(c2, mix);
        const dMat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.4, wireframe: true
        });
        const disc = new THREE.Mesh(dGeo, dMat);
        disc.position.y = y;
        group.add(disc);
        discs.push(disc);
      }

      scene.userData = { group, discs, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.2;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "radiolarian_hexagonal_skeleton",
        "title": "Deep-Sea Radiolarian Symmetrical Opaline Silica Skeleton",
        "fileName": "radiolarian_skeleton.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "ambient",
        "caption": "🌊 Ernst Haeckel's oceanic deep-sea Radiolarian opaline silica mineral skeleton with icosahedral perforations in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 💎✨\n\n#threejs #webgl #radiolaria #haeckel #microscopy #biomineralization #ocean #creativecoding #javascript #reels",
        "displayCode": "// Haeckel Radiolarian Geodesic Perforations\nfunction radiolarianShell(theta, phi, spikes = 12) {\n  const r = 4.2 + 1.2 * Math.sin(theta * spikes) * Math.cos(phi * spikes);\n  return r;\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [0.95, 0.98, 1.0],
            "spikes": 12
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Perforated Icosahedral Shell
      const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(4.5, 3),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(shell);

      // Radial Silica Spines / Needles
      const spineCount = 42;
      const spines = new THREE.Group();
      group.add(spines);

      for (let i = 0; i < spineCount; i++) {
        const phi = Math.acos(2.0 * Math.random() - 1.0);
        const theta = Math.random() * Math.PI * 2;
        const pts = [
          new THREE.Vector3(4.2 * Math.sin(phi) * Math.cos(theta), 4.2 * Math.cos(phi), 4.2 * Math.sin(phi) * Math.sin(theta)),
          new THREE.Vector3(7.2 * Math.sin(phi) * Math.cos(theta), 7.2 * Math.cos(phi), 7.2 * Math.sin(phi) * Math.sin(theta))
        ];
        const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const spine = new THREE.Line(sGeo, new THREE.LineBasicMaterial({ color: c2, linewidth: 2 }));
        spines.add(spine);
      }

      scene.userData = { group, shell, spines, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cardiac_action_potential_spiral",
        "title": "Excitable Heart Tissue FitzHugh-Nagumo Spiral Re-entrant Waves",
        "fileName": "cardiac_spiral.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "❤️ Non-linear excitable myocardium cardiac tissue action potential rotor wave vortex in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🫀\n\n#threejs #webgl #cardiac #fitzhughnagumo #biophysics #heart #actionpotential #creativecoding #javascript #reels",
        "displayCode": "// FitzHugh-Nagumo Excitable Cardiac Differential Equations\nfunction stepFitzHughNagumo(v, w, I = 0.5, a = 0.7, b = 0.8, tau = 12.5) {\n  const dv = (v - (v*v*v) / 3.0 - w + I);\n  const dw = (v + a - b * w) / tau;\n  return { dv, dw };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.15, 0.25],
            "secondaryColor": [1.0, 0.85, 0.2],
            "gridSize": 45
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 8, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.gridSize;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          pts.push(x, 0, z);
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const a = i * (n + 1) + j;
          const b = (i + 1) * (n + 1) + j;
          const c = (i + 1) * (n + 1) + (j + 1);
          const d = i * (n + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const waveMesh = new THREE.Mesh(geo, mat);
      group.add(waveMesh);

      scene.userData = { group, waveMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.2;
      const pos = data.waveMesh.geometry.attributes.position;
      const n = data.params.gridSize;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const x = -6.0 + (i / n) * 12.0;
        for (let j = 0; j <= n; j++) {
          const z = -6.0 + (j / n) * 12.0;
          const r = Math.sqrt(x*x + z*z);
          const theta = Math.atan2(z, x);
          const spiralWave = Math.sin(r * 1.5 - theta * 2.0 - t * 4.0) * 1.5;
          pos.setY(idx++, spiralWave);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "axon_myelin_saltatory_conduction",
        "title": "Neuronal Axon Myelin Sheath Saltatory Conduction",
        "fileName": "saltatory_conduction.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "⚡ Electrical action potentials jumping at 100 m/s between Nodes of Ranvier across myelinated nerve axons in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🧠\n\n#threejs #webgl #neuroscience #axon #myelin #saltatory #bioelectricity #creativecoding #javascript #reels",
        "displayCode": "// Saltatory Conduction Voltage Node Jump\nfunction saltatoryVelocity(axonDiameter) {\n  // Conduction speed scales linearly with myelinated axon diameter\n  const velocity = 6.0 * axonDiameter; // meters per second\n  return velocity;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.85, 1.0],
            "secondaryColor": [1.0, 0.85, 0.2],
            "nodeCount": 6
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Myelin Segments (Insulating Schwann Cells)
      const segments = [];
      const count = params.nodeCount;

      for (let i = 0; i < count; i++) {
        const x = -7.5 + (i / (count - 1)) * 15.0;
        const mMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.9, 0.9, 2.2, 24),
          new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
        );
        mMesh.rotation.z = Math.PI / 2;
        mMesh.position.x = x;
        group.add(mMesh);
        segments.push(mMesh);
      }

      // Action Potential Pulse Spark
      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 16, 16),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 1.2 })
      );
      group.add(spark);

      scene.userData = { group, segments, spark, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      // Saltatory jump trajectory across nodes
      const jumpTime = (t * 2.5) % data.params.nodeCount;
      const nodeIdx = Math.floor(jumpTime);
      const frac = jumpTime - nodeIdx;
      const x1 = -7.5 + (nodeIdx / (data.params.nodeCount - 1)) * 15.0;
      const x2 = -7.5 + ((nodeIdx + 1) / (data.params.nodeCount - 1)) * 15.0;
      data.spark.position.x = x1 + (x2 - x1) * frac;
      data.spark.position.y = Math.sin(frac * Math.PI) * 1.5;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "dna_origami_nanorobot_cube",
        "title": "Autonomous DNA Origami Molecular Nanobox Hinge",
        "fileName": "dna_origami.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "cyber",
        "caption": "🧬 Self-assembled 3D DNA origami hollow nanobox unfolding its molecular aptamer lid to release cancer drugs in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💊\n\n#threejs #webgl #dnaorigami #nanorobotics #biotechnology #nanomedicine #creativecoding #javascript #reels",
        "displayCode": "// DNA Staple Strand Crossover Geometry\nfunction dnaStapleBinding(helixSpacing = 2.0, crossoverInterval = 10.5) {\n  const pitch = 3.4; // nm per helical turn\n  const rigidity = 50.0; // persistence length in nm\n  return { pitch, rigidity };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.3, 0.6],
            "boxSize": 4.5
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Box Base Mesh
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 3.2, 4.5),
        new THREE.MeshStandardMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.6 })
      );
      group.add(base);

      // Hinged Lid Mesh
      const lidGeo = new THREE.BoxGeometry(4.5, 0.4, 4.5);
      lidGeo.translate(0, 0, 2.25);
      const lid = new THREE.Mesh(lidGeo, new THREE.MeshStandardMaterial({ color: c2, wireframe: true }));
      lid.position.set(0, 1.8, -2.25);
      group.add(lid);

      // Contained Molecular Drug Cargo
      const cargo = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: c2, emissiveIntensity: 0.8 })
      );
      group.add(cargo);

      scene.userData = { group, lid, cargo, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      // Lid opening/closing hinge oscillation
      const openAngle = Math.max(0, Math.sin(t * 1.5)) * (Math.PI * 0.65);
      data.lid.rotation.x = -openAngle;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "crispr_cas9_rloop_unwinding",
        "title": "CRISPR-Cas9 Endonuclease DNA Unwinding & Cleavage",
        "fileName": "crispr_cas9.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "✂️ The molecular gene-editing scissors! CRISPR-Cas9 enzyme unwinding double-stranded DNA target sequences in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🧬✨\n\n#threejs #webgl #crispr #cas9 #geneediting #genetics #biotechnology #creativecoding #javascript #reels",
        "displayCode": "// CRISPR Target PAM Site DNA Cleavage\nfunction cas9Cleavage(targetMatchScore, PAM = 'NGG') {\n  const isMatched = targetMatchScore > 0.95;\n  const doubleStrandBreak = isMatched && PAM.endsWith('GG');\n  return { doubleStrandBreak };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.85, 1.0],
            "secondaryColor": [1.0, 0.4, 0.2],
            "helixLength": 40
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Cas9 Enzyme Protein Lobes (REC + NUC)
      const cas9Lobe1 = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, wireframe: true })
      );
      cas9Lobe1.position.x = -1.5;
      group.add(cas9Lobe1);

      const cas9Lobe2 = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x334155, wireframe: true })
      );
      cas9Lobe2.position.x = 1.5;
      group.add(cas9Lobe2);

      // Target DNA Strands Passing Through Catalytic Center
      const pts1 = [], pts2 = [];
      for (let z = -7; z <= 7; z += 0.2) {
        // Unwinding bubble near z = 0
        const bubble = Math.exp(-z * z * 0.5) * 1.5;
        pts1.push(new THREE.Vector3(Math.cos(z * 1.2) * (1.0 + bubble), Math.sin(z * 1.2) * (1.0 + bubble), z));
        pts2.push(new THREE.Vector3(Math.cos(z * 1.2 + Math.PI) * (1.0 + bubble), Math.sin(z * 1.2 + Math.PI) * (1.0 + bubble), z));
      }
      const s1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), new THREE.LineBasicMaterial({ color: c1, linewidth: 2 }));
      const s2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), new THREE.LineBasicMaterial({ color: c2, linewidth: 2 }));
      group.add(s1);
      group.add(s2);

      scene.userData = { group, cas9Lobe1, cas9Lobe2, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bacterial_flagellar_rotor",
        "title": "Bacterial Flagellar Motor Stator Ring Nanomachine",
        "fileName": "flagellar_rotor.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "cyber",
        "caption": "🌀 Ultra-efficient rotary bacterial flagellar nanomachine spinning at 100,000 RPM powered by proton flux in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔬\n\n#threejs #webgl #flagella #nanomachine #biomotor #bacteria #microbiology #creativecoding #javascript #reels",
        "displayCode": "// Bacterial Flagellar Motor Torque Production\nfunction flagellarTorque(protonMotiveForce, nStators = 11) {\n  const torquePerStator = 200; // pN*nm\n  const totalTorque = nStators * torquePerStator * (protonMotiveForce / 150);\n  return totalTorque;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.8, 0.15],
            "secondaryColor": [0.2, 0.95, 0.8],
            "statorCount": 11
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // MS Ring Rotor
      const rotor = new THREE.Mesh(
        new THREE.CylinderGeometry(2.4, 2.4, 1.2, 32),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(rotor);

      // Helical Flagellar Filament Tail
      const pts = [];
      for (let y = 0; y >= -10; y -= 0.15) {
        pts.push(new THREE.Vector3(Math.cos(y * 1.5) * 1.2, y, Math.sin(y * 1.5) * 1.2));
      }
      const flagGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const flagellum = new THREE.Line(flagGeo, new THREE.LineBasicMaterial({ color: c2, linewidth: 2.5 }));
      group.add(flagellum);

      scene.userData = { group, rotor, flagellum, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      data.rotor.rotation.y = t * 6.0;
      data.flagellum.rotation.y = t * 6.0;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "virus_capsid_icosahedral_tessellation",
        "title": "Viral Icosahedral Capsid Caspar-Klug Quasi-Equivalence",
        "fileName": "virus_capsid.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "🦠 Caspar-Klug triangulation T=7 viral capsid assembly from capsomer pentamers and hexamers in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💎\n\n#threejs #webgl #virology #capsid #icosahedron #structuralbiology #creativecoding #javascript #reels",
        "displayCode": "// Caspar-Klug Triangulation Number T = h^2 + hk + k^2\nfunction casparKlugTriangulation(h = 2, k = 1) {\n  const T = h * h + h * k + k * k; // e.g. T = 7\n  const subUnitCount = 60 * T;\n  return { T, subUnitCount };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.7, 1.0],
            "secondaryColor": [0.95, 0.35, 0.6],
            "triangulationNumber": 7
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // T=7 Capsid Outer Shell
      const outerCapsid = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.2, 2),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(outerCapsid);

      // Inner Viral RNA/DNA Genome Core
      const genomeCore = new THREE.Mesh(
        new THREE.SphereGeometry(2.8, 24, 24),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.6, wireframe: true })
      );
      group.add(genomeCore);

      scene.userData = { group, outerCapsid, genomeCore, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.3;
      data.genomeCore.rotation.y = -t * 0.6;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "collagen_triple_helix_fibril",
        "title": "Tensile Collagen Triple-Helix Nanoscale Fibril",
        "fileName": "collagen_helix.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "🧬 Structural biology of connective tissue! Staggered Gly-Pro-Hyp collagen triple-helix fibril assembly in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💪\n\n#threejs #webgl #collagen #triplehelix #structuralbiology #protein #creativecoding #javascript #reels",
        "displayCode": "// Collagen Tropocollagen Staggered D-Periodicity\nfunction collagenFibrilDPeriod(z, D_band = 67.0) {\n  const overlapZone = (z % D_band) < 0.46 * D_band;\n  return { overlapZone }; // 67 nm banding pattern\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.4, 0.2],
            "secondaryColor": [0.2, 0.9, 0.85],
            "length": 14
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 3 Intertwined Polypeptide Chains
      for (let s = 0; s < 3; s++) {
        const offset = (s / 3) * Math.PI * 2;
        const pts = [];
        for (let y = -7; y <= 7; y += 0.2) {
          const r = 1.2;
          pts.push(new THREE.Vector3(Math.cos(y * 1.8 + offset) * r, y, Math.sin(y * 1.8 + offset) * r));
        }
        const cGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const col = (s === 0 ? c1 : (s === 1 ? c2 : new THREE.Color(0xffffff)));
        const chain = new THREE.Line(cGeo, new THREE.LineBasicMaterial({ color: col, linewidth: 2.5 }));
        group.add(chain);
      }

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "lipid_bilayer_liposome_budding",
        "title": "Self-Healing Phospholipid Bilayer Liposome Vesicle",
        "fileName": "lipid_bilayer.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "organic",
        "caption": "🫧 Amphiphilic phospholipid bilayer cell membrane undergoing clathrin-mediated endocytic vesicular budding in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔬🧬\n\n#threejs #webgl #lipidbilayer #membrane #vesicle #cellbiology #creativecoding #javascript #reels",
        "displayCode": "// Helfrich Membrane Bending Free Energy\nfunction helfrichBendingEnergy(H, K, kappa = 20.0, kappa_bar = -10.0) {\n  // E = integral (2*kappa * H^2 + kappa_bar * K) dA\n  const energy = 2 * kappa * H * H + kappa_bar * K;\n  return energy;\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.85, 1.0],
            "secondaryColor": [1.0, 0.35, 0.75],
            "particleCount": 6500
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Inner and Outer Bilayer Lipids
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = (i % 2 === 0 ? 4.5 : 4.0);
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.cos(v);
        pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const bilayer = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c1, size: 0.15, blending: THREE.AdditiveBlending }));
      group.add(bilayer);

      scene.userData = { group, bilayer, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      const p = data.bilayer.geometry.attributes.position.array;
      for (let i = 0; i < p.length; i += 3) {
        // Membrane thermal fluctuation ripples
        const wave = 1.0 + 0.04 * Math.sin(t * 3.0 + p[i] * 1.5);
        p[i] *= wave; p[i+1] *= wave; p[i+2] *= wave;
      }
      data.bilayer.geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tardigrade_cryptobiotic_glass",
        "title": "Tardigrade Cryptobiotic Disordered Protein Glass Vitrification",
        "fileName": "tardigrade_glass.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "ambient",
        "caption": "🐻 Tardigrade intrinsically disordered proteins (TDP) vitrifying cellular components into indestructible biological glass in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡❄️\n\n#threejs #webgl #tardigrade #cryptobiosis #anhydrobiosis #vitrification #biophysics #creativecoding #javascript #reels",
        "displayCode": "// TDP Glass Transition Vitrification Temperature\nfunction glassTransition(viscosity, T, Tg = 150) {\n  const isVitrified = T <= Tg || viscosity > 1e12; // Pa*s\n  return { isVitrified };\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.9],
            "secondaryColor": [0.85, 0.4, 1.0],
            "pointCount": 7000
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Amorphous Glass Network Mesh
      const glass = new THREE.Mesh(
        new THREE.DodecahedronGeometry(5.0, 2),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true })
      );
      group.add(glass);

      // Embedded Cryptobiotic Protein Chains
      const count = params.pointCount;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const r = 4.8 * Math.pow(Math.random(), 0.35);
        pos[i * 3] = r * Math.sin(v) * Math.cos(u);
        pos[i * 3 + 1] = r * Math.cos(v);
        pos[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const proteins = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c2, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(proteins);

      scene.userData = { group, glass, proteins, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    }
]
