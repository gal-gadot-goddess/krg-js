# tools/defs_batch3_bio.py
# 15 Biophysics & Molecular Nanomachines 3D Visualizers (Batch 3: IDs 246-260)

DEFS_BIO_3 = [
    {
        "id": "ribosome_mrna_translation_polypeptide_chain",
        "title": "Ribosome 70S Translation & Polypeptide Chain Synthesis",
        "fileName": "ribosome_translation.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🧬 Molecular factory of life: Ribosome translating messenger RNA strand into a folding polypeptide protein helix in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #ribosome #translation #molecularbiology #dna #biophysics #codeart",
        "displayCode": "// Ribosomal Peptidyl Transferase Peptide Bond Synthesis\nfunction translateCodon(codon_idx) {\n  const aa_phi = codon_idx * 0.45;\n  const aa_r = 1.2;\n  return new THREE.Vector3(Math.cos(aa_phi) * aa_r, codon_idx * 0.38, Math.sin(aa_phi) * aa_r);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.65],
            "chainLength": 85
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 50S Large Subunit and 30S Small Subunit Mesh Domes
      const s50 = new THREE.Mesh(new THREE.SphereGeometry(3.6, 32, 32), new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true }));
      s50.position.y = 2.4;
      const s30 = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 32), new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.45, wireframe: true }));
      s30.position.y = -2.6;
      group.add(s50); group.add(s30);

      // Growing Polypeptide Alpha Helix (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * 14.0;
        const angle = u * 4.5;
        const rad = 0.9 + Math.sin(u * 1.5) * 0.3;

        pPos[i * 3] = Math.cos(angle) * rad + (Math.random() - 0.5) * 0.3;
        pPos[i * 3 + 1] = 4.5 + u;
        pPos[i * 3 + 2] = Math.sin(angle) * rad + (Math.random() - 0.5) * 0.3;

        const col = c1.clone().lerp(c2, u / 14.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const peptide = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(peptide);

      scene.userData = { group, peptide, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.peptide.rotation.y = t * 0.6;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 3, 0);"""
    },
    {
        "id": "synaptic_vesicle_snare_complex_fusion",
        "title": "SNARE Complex Four-Helix Zippering & Vesicle Fusion",
        "fileName": "snare_fusion.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "⚡ Synaptic vesicle neurotransmitter release: SNARE four-helix bundle mechanical zippering and membrane fusion pore opening in Three.js! Follow @kreggsjs! 🧠🔬\n\n#threejs #webgl #neuroscience #snare #synapse #biophysics #molecularbiology #codeart",
        "displayCode": "// SNARE Complex 4-Helix Bundle Zippering Free Energy\nfunction snareZipperingEnergy(z_progress) {\n  // Delta G ~ 35 k_B * T zippering from N to C terminal\n  return 35.0 * Math.pow(z_progress, 1.5);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 1.0],
            "secondaryColor": [1.0, 0.3, 0.55],
            "helixLength": 8.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Synaptic Vesicle Sphere
      const vGeo = new THREE.SphereGeometry(3.5, 32, 32);
      const vMat = new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true });
      const vesicle = new THREE.Mesh(vGeo, vMat);
      vesicle.position.y = 5.5;
      group.add(vesicle);

      // Presynaptic Membrane Plane
      const mGeo = new THREE.PlaneGeometry(16.0, 16.0, 24, 24);
      const mMat = new THREE.MeshBasicMaterial({ color: c2, wireframe: true, transparent: true, opacity: 0.45 });
      const membrane = new THREE.Mesh(mGeo, mMat);
      membrane.rotation.x = -Math.PI / 2;
      membrane.position.y = -2.5;
      group.add(membrane);

      // 4 SNARE Coiled-Coil Helices (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * params.helixLength;
        const coil = (i % 4) * (Math.PI / 2);
        const rad = 0.6 + (1.0 - u / params.helixLength) * 0.9;
        const angle = u * 5.0 + coil;

        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = 5.0 - u;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;

        const col = (i % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const bundle = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(bundle);

      scene.userData = { group, vesicle, bundle, params };""",
        "renderBody": """      const zip = Math.sin(t * 2.0) * 0.8;
      data.vesicle.position.y = 5.5 - Math.max(0, zip);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 1.5, 0);"""
    },
    {
        "id": "nuclear_pore_complex_fg_nucleoporin_sieve",
        "title": "Nuclear Pore Eight-Fold Complex & FG-Repeat Hydrophobic Sieve",
        "fileName": "nuclear_pore_sieve.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🧬 Gatekeeper of the cell nucleus: 8-fold symmetric Nuclear Pore Complex with entropic FG-repeat nucleoporin hydrogel sieve in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #nuclearcell #biophysics #nanomachines #cellbiology #codeart",
        "displayCode": "// Nuclear Pore Hydrophobic FG-Repeat Transport Free Energy\nfunction fgTranslocationRate(cargo_size, kap_affinity) {\n  // NuP98/NuP62 mesh barrier: P_pass ~ exp(-Delta F / k_B T)\n  return kap_affinity * Math.exp(-Math.pow(cargo_size / 5.2, 2.0));\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.9, 1.0],
            "secondaryColor": [0.95, 0.45, 0.2],
            "ringRadius": 6.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 8-Fold Symmetric Cytoplasmic Ring Spokes
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        const spoke = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 4.2, 16),
          new THREE.MeshBasicMaterial({ color: c1, wireframe: true })
        );
        spoke.position.set(Math.cos(theta) * params.ringRadius, 0, Math.sin(theta) * params.ringRadius);
        spoke.rotation.z = Math.PI / 2;
        spoke.rotation.y = theta;
        group.add(spoke);
      }

      // 22,000 Entropic FG-Repeat Sieve Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const r = Math.sqrt(Math.random()) * (params.ringRadius * 0.85);
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 3.5;

        pPos[i * 3] = Math.cos(theta) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(theta) * r;

        const col = c1.clone().lerp(c2, r / (params.ringRadius * 0.85));
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const sieve = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(sieve);

      scene.userData = { group, sieve, params };""",
        "renderBody": """      data.sieve.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "myosin_actin_power_stroke_crossbridge",
        "title": "Actomyosin Power Stroke & Muscle Lever-Arm Tilting",
        "fileName": "myosin_power_stroke.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "💪 Molecular muscle motor: Myosin II head executing a 10 nm mechanical power stroke along the actin thin filament in Three.js! Follow @kreggsjs for daily reels! 🔬⚡\n\n#threejs #webgl #myosin #actin #biophysics #molecularmotors #muscle #codeart",
        "displayCode": "// Myosin Mechanical Lever-Arm Angular Swing (70 degree stroke)\nfunction leverStroke(phase) {\n  // theta(t) = theta_pre + Delta_theta * sin(phase)^2\n  return (15.0 * Math.PI / 180.0) + (70.0 * Math.PI / 180.0) * Math.pow(Math.sin(phase), 2);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.35, 0.65],
            "secondaryColor": [0.35, 0.85, 1.0],
            "strokeRate": 3.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Actin Double-Helical Filament Cylinder (18,000 points)
      const aCount = 18000;
      const aPos = new Float32Array(aCount * 3);
      for (let i = 0; i < aCount; i++) {
        const x = -8.0 + (i / aCount) * 16.0;
        const angle = x * 2.5;
        const rad = 0.8;
        aPos[i * 3] = x;
        aPos[i * 3 + 1] = 2.5 + Math.sin(angle) * rad;
        aPos[i * 3 + 2] = Math.cos(angle) * rad;
      }
      const aGeo = new THREE.BufferGeometry();
      aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3));
      group.add(new THREE.Points(aGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })));

      // Myosin Head Motor Arm
      const mArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.5, 4.5, 16),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6 })
      );
      mArm.position.set(0, 0, 0);
      group.add(mArm);

      scene.userData = { group, mArm, params };""",
        "renderBody": """      const stroke = Math.sin(t * params.strokeRate) * 0.45;
      data.mArm.rotation.z = stroke;
      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 4 + Math.sin(t * 0.2) * 2;
      camera.lookAt(0, 1.5, 0);"""
    },
    {
        "id": "voltage_gated_sodium_channel_activation",
        "title": "Voltage-Gated Sodium Channel S4 Helix Screw Gate",
        "fileName": "sodium_channel_nav.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "⚡ Action potential initiation: Nav1.7 sodium channel four-domain voltage sensor sliding outward in helical screw motion in Three.js! Follow @kreggsjs! 🧠🔬\n\n#threejs #webgl #ionchannels #neuroscience #biophysics #electrophysiology #codeart",
        "displayCode": "// Hodgkin-Huxley Sodium Activation Gate m-particle Dynamics\nfunction sodiumActivation(V) {\n  // alpha_m = 0.1 * (V + 40) / (1 - exp(-(V + 40) / 10))\n  return 0.1 * (V + 40.0) / (1.0 - Math.exp(-(V + 40.0) / 10.0));\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.75],
            "secondaryColor": [1.0, 0.8, 0.2],
            "voltage": -20.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Central Ion Conduction Pore Barrel (Cylinder)
      const pore = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 7.5, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.45 })
      );
      group.add(pore);

      // 4 S4 Positively Charged Helices (Arginine / Lysine repeats)
      const s4Group = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const theta = (i / 4) * Math.PI * 2;
        const s4 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 6.0, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.6 })
        );
        s4.position.set(Math.cos(theta) * 3.8, 0, Math.sin(theta) * 3.8);
        s4Group.add(s4);
      }
      group.add(s4Group);

      // Translocating Sodium Ions (Na+) (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = Math.random() * 1.2;
        const th = Math.random() * Math.PI * 2;
        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
        pPos[i * 3 + 2] = Math.sin(th) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, s4Group, params };""",
        "renderBody": """      const sScrew = Math.sin(t * 3.0) * 0.8;
      data.s4Group.children.forEach(s => s.position.y = sScrew);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "microtubule_dynamic_instability_catastrophe",
        "title": "Microtubule GTP Cap Hydrolysis & Peeling Protofilament Catastrophe",
        "fileName": "microtubule_catastrophe.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🧬 Microtubule dynamic instability: GTP cap loss triggering catastrophic curling and protofilament peeling in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #microtubule #cytoskeleton #biophysics #mitosis #cellbiology #codeart",
        "displayCode": "// Microtubule 13-Protofilament Curvature Transition\nfunction protofilamentPeeling(z, isGTP) {\n  // GTP tubulin = straight (0 deg); GDP tubulin = bent outward (12 deg)\n  return (isGTP) ? 0.0 : 12.0 * (Math.PI / 180.0) * (z / 5.0);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.85, 1.0],
            "secondaryColor": [0.95, 0.35, 0.75],
            "protofilaments": 13
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 13 Protofilaments Cylinder (22,000 points)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const proto = i % params.protofilaments;
        const theta = (proto / params.protofilaments) * Math.PI * 2;
        const y = -8.0 + (i / pCount) * 16.0;

        // Curling tips (GDP peeling)
        const isTip = (y > 4.5);
        const curl = isTip ? (y - 4.5) * 0.8 : 0;
        const rad = 2.4 + curl;

        pPos[i * 3] = Math.cos(theta) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(theta) * rad;

        const col = isTip ? c2 : c1;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const mt = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(mt);

      scene.userData = { group, mt, params };""",
        "renderBody": """      data.mt.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 4 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bacterial_chemotaxis_flagellar_bundle_reversal",
        "title": "Bacterial Chemotaxis Flagellar Bundle Run-and-Tumble",
        "fileName": "chemotaxis_bundle.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🦠 E. coli chemotaxis: helical flagellar bundle synchronous CCW run switching to CW tumble unraveling in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #bacteria #chemotaxis #flagella #biophysics #microbiology #codeart",
        "displayCode": "// Chemotactic CheY-P Phosphorylation Switch\nfunction motorSwitchBias(cheY_P) {\n  // Hill equation cooperativity (n ~ 10)\n  return Math.pow(cheY_P, 10) / (Math.pow(K_D, 10) + Math.pow(cheY_P, 10));\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.55],
            "secondaryColor": [1.0, 0.4, 0.2],
            "flagellaCount": 5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Bacterial Rod Body
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 5.5, 32),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      body.rotation.z = Math.PI / 2;
      group.add(body);

      // Helical Flagella Filaments (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const flagIdx = i % params.flagellaCount;
        const x = -2.8 - (i / pCount) * 14.0;
        const angle = x * 3.5 + (flagIdx * 0.4);
        const rad = 0.6 + Math.abs(x) * 0.1;

        pPos[i * 3] = x;
        pPos[i * 3 + 1] = Math.cos(angle) * rad;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const flagella = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(flagella);

      scene.userData = { group, flagella, params };""",
        "renderBody": """      data.flagella.rotation.x = t * 6.0;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "chlorophyll_resonance_energy_transfer_fret",
        "title": "Photosystem II Chlorophyll Förster Resonance Energy Transfer",
        "fileName": "chlorophyll_fret.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🌿 Quantum coherence in photosynthesis: solar exciton dipole-dipole FRET hopping across LHCII chlorophyll networks in Three.js! Follow @kreggsjs for daily reels! ☀️✨\n\n#threejs #webgl #photosynthesis #quantumbiology #fret #chlorophyll #biophysics #codeart",
        "displayCode": "// Förster Resonance Energy Transfer (FRET) 1/R^6 Efficiency\nfunction fretEfficiency(r, R0) {\n  // E_FRET = R0^6 / (R0^6 + r^6)\n  return Math.pow(R0, 6) / (Math.pow(R0, 6) + Math.pow(r, 6));\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.45],
            "secondaryColor": [0.95, 0.9, 0.25],
            "pigmentCount": 36
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // LHCII Trimeric Ring Chlorophyll Pigments
      for (let i = 0; i < params.pigmentCount; i++) {
        const theta = (i / params.pigmentCount) * Math.PI * 2;
        const r = 5.2 + Math.sin(theta * 3.0) * 1.5;
        const porphyrin = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.8, 0.1),
          new THREE.MeshStandardMaterial({ color: (i % 2 === 0) ? c1 : c2, emissive: c1, emissiveIntensity: 0.6 })
        );
        porphyrin.position.set(Math.cos(theta) * r, (Math.random() - 0.5) * 2.0, Math.sin(theta) * r);
        group.add(porphyrin);
      }

      // 18,000 Exciton Delocalization Energy Wave Particles
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const rad = 4.0 + Math.random() * 3.5;
        pPos[i * 3] = Math.cos(th) * rad;
        pPos[i * 3 + 1] = Math.sin(th * 6.0) * 0.8;
        pPos[i * 3 + 2] = Math.sin(th) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const exciton = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(exciton);

      scene.userData = { group, exciton, params };""",
        "renderBody": """      data.exciton.rotation.y = t * 1.2;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 7 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cohesin_dna_loop_extrusion_tad_boundary",
        "title": "Cohesin Ring SMC Motor & Chromatin Loop Extrusion",
        "fileName": "cohesin_loop_extrusion.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🧬 Cohesin molecular ring motor extruding 3D chromatin loops to form Topologically Associating Domains (TADs) in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #cohesin #genomics #chromatin #dna #biophysics #codeart",
        "displayCode": "// Cohesin Loop Extrusion Processivity Velocity (v ~ 1 kb/s)\nfunction loopExtrusion(t, k_step) {\n  // L(t) = L_0 + 2 * v_ext * t until CTCF stall\n  return 2.0 * k_step * t;\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.85, 1.0],
            "secondaryColor": [1.0, 0.45, 0.25],
            "maxLoop": 8.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Cohesin ATPase Ring Torus
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.8, 0.25, 24, 64),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.7 })
      );
      group.add(ring);

      // Extruding DNA Loop Arc (18,000 points)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = (i / pCount) * Math.PI;
        const rad = 6.5;
        pPos[i * 3] = Math.cos(u) * rad;
        pPos[i * 3 + 1] = Math.sin(u) * rad;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const loop = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c1, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(loop);

      scene.userData = { group, ring, loop, params };""",
        "renderBody": """      const s = 1.0 + Math.sin(t * 2.0) * 0.35;
      data.loop.scale.set(s, s, s);
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 3, 0);"""
    },
    {
        "id": "proteasome_26s_ubiquitin_substrate_degradation",
        "title": "26S Proteasome AAA+ Motor & Polyubiquitin Degradation",
        "fileName": "proteasome_26s.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🧬 Cellular recycling machine: 26S Proteasome AAA+ unfoldase threading ubiquitinated substrates into the 20S catalytic barrel in Three.js! Follow @kreggsjs! 🔬⚡\n\n#threejs #webgl #proteasome #ubiquitin #molecularbiology #biophysics #codeart",
        "displayCode": "// Proteasomal ATP-Dependent Translocation Rate\nfunction translocationVelocity(k_cat, step_size) {\n  // v = k_cat * 2 amino acids / ATP\n  return k_cat * step_size;\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.75],
            "secondaryColor": [0.95, 0.3, 0.5],
            "barrelHeight": 8.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 20S Proteolytic Barrel (4 stacked rings)
      for (let i = -1.5; i <= 1.5; i += 1.0) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(3.2, 0.45, 16, 48),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5 })
        );
        ring.position.y = i * 2.2;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }

      // Threaded Substrate Peptide (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const y = -6.0 + (i / pCount) * 12.0;
        const angle = y * 6.0;
        const rad = 0.5;
        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bacteriorhodopsin_proton_pumping_photocycle",
        "title": "Bacteriorhodopsin Retinal Photoisomerization Proton Pump",
        "fileName": "bacteriorhodopsin_pump.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "☀️ Solar light-driven proton pumping: Bacteriorhodopsin all-trans to 13-cis retinal photoisomerization photocycle in Three.js! Follow @kreggsjs for daily reels! 🔬⚡\n\n#threejs #webgl #bacteriorhodopsin #biophysics #retinal #protonpump #codeart",
        "displayCode": "// Retinal 13-cis Photoisomerization Photocycle Lifetime (tau ~ 200 fs)\nfunction photocycleTransition(state) {\n  // BR -> K -> L -> M1 -> M2 -> N -> O -> BR\n  return ['K', 'L', 'M', 'N', 'O'][state % 5];\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.4, 0.85],
            "secondaryColor": [0.25, 0.9, 1.0],
            "helixCount": 7
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 7 Transmembrane Alpha-Helices (7TM Barrel)
      for (let i = 0; i < 7; i++) {
        const theta = (i / 7) * Math.PI * 2;
        const h = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 7.5, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.55 })
        );
        h.position.set(Math.cos(theta) * 3.4, 0, Math.sin(theta) * 3.4);
        group.add(h);
      }

      // Translocating Protons (H+) (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const y = -5.0 + (i / pCount) * 10.0;
        pPos[i * 3] = (Math.random() - 0.5) * 1.2;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "extracellular_matrix_integrin_talin_focal_adhesion",
        "title": "Integrin Mechanotransduction & Talin Focal Adhesion Complex",
        "fileName": "focal_adhesion.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "⚡ Cellular mechanobiology: Integrin-talin-actin focal adhesion complex transmitting piconewton extracellular tension in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #mechanobiology #integrin #focaladhesion #biophysics #codeart",
        "displayCode": "// Talin Mechanosensitive Rod Unfolding under Force\nfunction talinUnfoldingRate(force_pN) {\n  // Bell model: k(F) = k_0 * exp(F * x_dagger / k_B T)\n  return 0.05 * Math.exp(force_pN * 0.18);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.9, 1.0],
            "secondaryColor": [1.0, 0.35, 0.6],
            "force_pN": 12.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Extracellular Fibronectin Matrix Mesh Plane
      const eGeo = new THREE.PlaneGeometry(16.0, 16.0, 24, 24);
      const eMat = new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.45 });
      const ecm = new THREE.Mesh(eGeo, eMat);
      ecm.rotation.x = -Math.PI / 2;
      ecm.position.y = -3.5;
      group.add(ecm);

      // Integrin Heterodimer Clustered Heads (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 10.0;
        pPos[i * 3 + 1] = -3.0 + Math.random() * 6.0;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 10.0;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "telomerase_ribonucleoprotein_telomere_capping",
        "title": "Telomerase Reverse Transcriptase & TTAGGG Telomere Capping",
        "fileName": "telomerase_capping.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "🧬 Cellular immortality engine: Telomerase ribonucleoprotein complex elongating G-rich TTAGGG telomeric chromosome caps in Three.js! Follow @kreggsjs! 🔬✨\n\n#threejs #webgl #telomeres #telomerase #genetics #biophysics #aging #codeart",
        "displayCode": "// Telomeric Repeat Extension Kinetics\nfunction telomericRepeat(t_cycles) {\n  const seq = ['T', 'T', 'A', 'G', 'G', 'G'];\n  return seq[t_cycles % 6];\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.45, 0.85],
            "secondaryColor": [0.35, 0.95, 0.75],
            "repeats": 24
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // TERT Catalytic Ring (Enzyme)
      const tert = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 1.2, 24, 64),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.55, wireframe: true })
      );
      group.add(tert);

      // Telomere Double-Stranded DNA Core (18,000 points)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = -6.0 + (i / pCount) * 12.0;
        const angle = u * 4.5;
        pPos[i * 3] = Math.cos(angle) * 0.8;
        pPos[i * 3 + 1] = u;
        pPos[i * 3 + 2] = Math.sin(angle) * 0.8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, tert, params };""",
        "renderBody": """      data.tert.rotation.x = t * 0.45;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "gap_junction_connexon_hexamer_channel",
        "title": "Connexin-43 Hexameric Hemichannel Gap Junction Pore",
        "fileName": "gap_junction_connexon.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "⚡ Direct intercellular communication: Connexin-43 hexameric connexon channels docking between cell membranes in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #connexin #gapjunction #cellbiology #biophysics #nanomachines #codeart",
        "displayCode": "// Connexon Hexamer Pore Permeability (Cutoff ~ 1 kDa)\nfunction poreFlux(delta_V, delta_C) {\n  // J = - D * (dC / dx) + z * mu * C * E\n  return 1.4e-12 * delta_C;\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.4, 0.25],
            "hexRadius": 3.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 6 Connexin Subunits forming the Hexamer
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        const cx = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.7, 8.0, 16),
          new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.55 })
        );
        cx.position.set(Math.cos(theta) * params.hexRadius, 0, Math.sin(theta) * params.hexRadius);
        group.add(cx);
      }

      // Intercellular Ion Stream through Channel (16,000 particles)
      const pCount = 16000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = Math.random() * 1.5;
        const th = Math.random() * Math.PI * 2;
        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = -5.0 + Math.random() * 10.0;
        pPos[i * 3 + 2] = Math.sin(th) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 18;
      camera.position.z = Math.cos(t * 0.25) * 18;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "circadian_clock_per_cry_transcriptional_loop",
        "title": "Circadian Molecular Clockwork & PER-CRY Oscillations",
        "fileName": "circadian_clock.js",
        "category": "Organic Physics & Bioluminescence",
        "genre": "bio",
        "caption": "⏰ The 24-hour master clock in every cell: CLOCK-BMAL1 activator & PER-CRY negative feedback transcriptional wave in Three.js! Follow @kreggsjs for daily reels! 🔬✨\n\n#threejs #webgl #circadian #biology #biophysics #chronobiology #codeart",
        "displayCode": "// Goodwin Circadian Oscillator Model: dX/dt = v1 / (1 + (Z/K)^n) - k2*X\nfunction circadianFeedback(Z, K, n) {\n  return 1.0 / (1.0 + Math.pow(Z / K, n));\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.75, 0.2],
            "secondaryColor": [0.35, 0.85, 1.0],
            "period": 24.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Circadian Phase Limit Cycle Torus
      const clockTorus = new THREE.Mesh(
        new THREE.TorusGeometry(5.5, 0.8, 24, 64),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(clockTorus);

      // Oscillating Transcriptional Wave Particles (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const rad = 5.5 + Math.sin(u * 2.0) * 1.2;
        pPos[i * 3] = Math.cos(u) * rad;
        pPos[i * 3 + 1] = Math.sin(u * 3.0) * 1.5;
        pPos[i * 3 + 2] = Math.sin(u) * rad;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, clockTorus, params };""",
        "renderBody": """      data.clockTorus.rotation.z = t * 0.55;
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
