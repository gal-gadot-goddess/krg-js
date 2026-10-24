# tools/defs_batch3_cyber.py
# 10 Cybernetic Topology & Quantum Computing 3D Visualizers (Batch 3: IDs 291-300)

DEFS_CYBER_3 = [
    {
        "id": "quantum_fourier_transform_phase_lattice",
        "title": "Quantum Fourier Transform Unitary Phase Rotation Lattice",
        "fileName": "qft_phase_lattice.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "💻 Quantum algorithm core: Quantum Fourier Transform unitary controlled-phase rotation cascade in Three.js! Follow @kreggsjs for daily reels! ⚡⚛️\n\n#threejs #webgl #qft #quantumcomputing #shorsalgorithm #cyberpunk #codeart",
        "displayCode": "// Quantum Fourier Transform Unitary: |j> -> 1/sqrt(N) * sum_k exp(2*pi*i*j*k/N) |k>\nfunction qftPhase(j, k, N) {\n  const theta = (2.0 * Math.PI * j * k) / N;\n  return new THREE.Vector2(Math.cos(theta), Math.sin(theta));\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 1.0],
            "secondaryColor": [0.95, 0.35, 0.85],
            "qubitStages": 8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 8 Qubit Register Lines with Controlled Phase Rotation Gates
      for (let q = 0; q < params.qubitStages; q++) {
        const y = -7.0 + q * 2.0;
        const line = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 16.0, 16),
          new THREE.MeshBasicMaterial({ color: 0x475569 })
        );
        line.rotation.z = Math.PI / 2;
        line.position.y = y;
        group.add(line);
      }

      // 20,000 Unitary Phase Wave Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const q = Math.floor(Math.random() * params.qubitStages);
        const y = -7.0 + q * 2.0;
        const x = (Math.random() - 0.5) * 15.0;
        const phase = (x * (q + 1) * 0.8);
        const z = Math.sin(phase) * 1.5;

        pPos[i * 3] = x; pPos[i * 3 + 1] = y + Math.cos(phase) * 0.6; pPos[i * 3 + 2] = z;

        const col = c1.clone().lerp(c2, q / params.qubitStages);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const qft = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(qft);

      scene.userData = { group, qft, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "neural_synaptic_plasticity_stdp_hebbian_network",
        "title": "Spike-Timing-Dependent Plasticity (STDP) Synaptic Graph",
        "fileName": "stdp_neural_network.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🧠 Neuromorphic computing: Spike-Timing-Dependent Plasticity (STDP) Hebbian rewiring and dendritic spine growth in Three.js! Follow @kreggsjs for daily reels! ⚡💻\n\n#threejs #webgl #neuralnetworks #neuromorphic #neuroscience #ai #stdp #codeart",
        "displayCode": "// STDP Synaptic Weight Modification Function Delta_w\nfunction stdpWeightUpdate(delta_t, A_plus, A_minus, tau) {\n  return (delta_t > 0)\n    ? A_plus * Math.exp(-delta_t / tau)\n    : -A_minus * Math.exp(delta_t / tau);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [1.0, 0.35, 0.55],
            "neuronCount": 42
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Somata Nodes
      const somata = [];
      for (let i = 0; i < params.neuronCount; i++) {
        const pos = new THREE.Vector3((Math.random() - 0.5) * 15.0, (Math.random() - 0.5) * 15.0, (Math.random() - 0.5) * 15.0);
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: c1 }));
        node.position.copy(pos);
        group.add(node);
        somata.push(pos);
      }

      // 20,000 Action Potential Axon Signal Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const sA = somata[i % somata.length];
        const sB = somata[(i * 3 + 1) % somata.length];
        const u = Math.random();

        pPos[i * 3] = THREE.MathUtils.lerp(sA.x, sB.x, u);
        pPos[i * 3 + 1] = THREE.MathUtils.lerp(sA.y, sB.y, u);
        pPos[i * 3 + 2] = THREE.MathUtils.lerp(sA.z, sB.z, u);

        const col = (u < 0.5) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const spikes = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(spikes);

      scene.userData = { group, spikes, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hyperbolic_poincare_embedding_knowledge_graph",
        "title": "Poincaré Disk Hyperbolic Embedding & Knowledge Graph Hierarchy",
        "fileName": "poincare_knowledge_graph.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🌐 Machine learning representation: hierarchical knowledge graph embedded into continuous negative-curvature Poincaré disk in Three.js! Follow @kreggsjs for daily reels! ⚡✨\n\n#threejs #webgl #machinelearning #hyperbolic #poincare #graphneuralnetwork #ai #codeart",
        "displayCode": "// Poincaré Distance Metric: d_H(u, v) = arcosh(1 + 2 * ||u-v||^2 / ((1-||u||^2)*(1-||v||^2)))\nfunction poincareDistance(u, v) {\n  const num = 2.0 * u.clone().sub(v).lengthSq();\n  const den = (1.0 - u.lengthSq()) * (1.0 - v.lengthSq());\n  return Math.acosh(1.0 + num / den);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.85, 1.0],
            "secondaryColor": [1.0, 0.45, 0.2],
            "diskRadius": 7.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Outer Boundary Horizon Circle
      const boundary = new THREE.Mesh(
        new THREE.RingGeometry(params.diskRadius - 0.1, params.diskRadius, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
      );
      group.add(boundary);

      // 22,000 Tree Leaves in Hyperbolic Space
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const r = Math.pow(u, 0.4) * (params.diskRadius * 0.98);
        const th = Math.random() * Math.PI * 2;

        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
        pPos[i * 3 + 2] = Math.sin(th) * r;

        const col = c1.clone().lerp(c2, r / params.diskRadius);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const tree = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(tree);

      scene.userData = { group, tree, params };""",
        "renderBody": """      data.tree.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_error_correction_steane_7_qubit_code",
        "title": "Steane [[7,1,3]] Quantum Error Correction Stabilizer Polytope",
        "fileName": "steane_qec.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🔐 Fault-tolerant quantum computing: Steane [[7,1,3]] code measuring X & Z stabilizer syndromic parity operators in Three.js! Follow @kreggsjs for daily reels! ⚛️💻\n\n#threejs #webgl #quantumcomputing #qec #steanecode #quantumerrorcorrection #codeart",
        "displayCode": "// Steane [[7, 1, 3]] CSS Code Generator Matrix: G = [I_3 | P_3x4]\nfunction stabilizerCheck(x_syndrome, z_syndrome) {\n  return (x_syndrome === 0 && z_syndrome === 0) ? 'No Error' : 'Correction Applied';\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.75],
            "secondaryColor": [0.95, 0.35, 0.85],
            "octaRadius": 5.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 7 Physical Qubit Spheres
      for (let i = 0; i < 7; i++) {
        const u = (i / 7) * Math.PI * 2;
        const q = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), new THREE.MeshBasicMaterial({ color: (i < 3) ? c1 : c2 }));
        q.position.set(Math.cos(u) * params.octaRadius, (i % 2 === 0 ? 1 : -1) * 2.0, Math.sin(u) * params.octaRadius);
        group.add(q);
      }

      // Parity Syndrome Flow (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[i * 3] = params.octaRadius * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = params.octaRadius * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = params.octaRadius * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: 0xffffff, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "tessellated_octree_sparse_voxel_octree_svo",
        "title": "Sparse Voxel Octree (SVO) Hierarchical Ray-Traced Voxels",
        "fileName": "svo_voxel_hive.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🧊 Next-gen real-time ray tracing: Sparse Voxel Octree (SVO) 3D spatial partitioning and hierarchical leaf voxel rendering in Three.js! Follow @kreggsjs! ⚡💻\n\n#threejs #webgl #voxels #octree #raytracing #graphics #gamedev #codeart",
        "displayCode": "// SVO Node Subdivision Index: child = (x > cx) | ((y > cy) << 1) | ((z > cz) << 2)\nfunction svoTraverse(ray_pos, ray_dir, depth) {\n  return Math.pow(2, -depth);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.65],
            "treeDepth": 4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Hierarchical Voxel Cubes
      const voxelGroup = new THREE.Group();
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          for (let z = -2; z <= 2; z++) {
            if (Math.random() < 0.35) {
              const sz = 1.0 + Math.random() * 0.8;
              const box = new THREE.Mesh(
                new THREE.BoxGeometry(sz, sz, sz),
                new THREE.MeshStandardMaterial({ color: (Math.random() < 0.5) ? c1 : c2, emissive: c1, emissiveIntensity: 0.45, wireframe: true })
              );
              box.position.set(x * 2.8, y * 2.8, z * 2.8);
              voxelGroup.add(box);
            }
          }
        }
      }
      group.add(voxelGroup);

      scene.userData = { group, voxelGroup, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "reinforcement_learning_policy_gradient_manifold",
        "title": "Reinforcement Learning Policy Gradient Loss Surface",
        "fileName": "policy_gradient_manifold.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🤖 Deep Reinforcement Learning: PPO clipped surrogate objective policy gradient loss landscape optimization in Three.js! Follow @kreggsjs for daily reels! ⚡💻\n\n#threejs #webgl #reinforcementlearning #ai #machinelearning #policygradient #codeart",
        "displayCode": "// PPO Clipped Surrogate Loss: L_CLIP(theta) = E[ min(r_t*A_t, clip(r_t, 1-eps, 1+eps)*A_t) ]\nfunction ppoClip(r_t, A_t, eps) {\n  return Math.min(r_t * A_t, Math.max(1.0 - eps, Math.min(1.0 + eps, r_t)) * A_t);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.9, 1.0],
            "secondaryColor": [1.0, 0.4, 0.2],
            "range": 6.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const uRes = 50, vRes = 50;
      const geo = new THREE.BufferGeometry();
      const pos = [];
      const col = [];

      for (let i = 0; i <= uRes; i++) {
        const u = -params.range + (i / uRes) * 2.0 * params.range;
        for (let j = 0; j <= vRes; j++) {
          const v = -params.range + (j / vRes) * 2.0 * params.range;
          const y = (Math.sin(u * 0.8) * Math.cos(v * 0.8) * 2.4) + (Math.sin(Math.sqrt(u*u + v*v)) * 1.5);

          pos.push(u, y, v);
          const c = c1.clone().lerp(c2, (y + 3.9) / 7.8);
          col.push(c.r, c.g, c.b);
        }
      }

      const indices = [];
      for (let i = 0; i < uRes; i++) {
        for (let j = 0; j < vRes; j++) {
          const a = i * (vRes + 1) + j;
          const b = (i + 1) * (vRes + 1) + j;
          const c = (i + 1) * (vRes + 1) + (j + 1);
          const d = i * (vRes + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        emissive: c1,
        emissiveIntensity: 0.65,
        transparent: true,
        opacity: 0.85
      }));
      group.add(mesh);

      scene.userData = { group, mesh, params };""",
        "renderBody": """      data.mesh.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "topological_quantum_majorana_braid_knot",
        "title": "Non-Abelian Anyon Worldline Majorana Quantum Braiding",
        "fileName": "majorana_braid.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "⚛️ Fault-tolerant topological quantum computation: non-Abelian anyon worldline braiding operations in 2+1 spacetime in Three.js! Follow @kreggsjs! ⚡💻\n\n#threejs #webgl #majorana #quantumcomputing #anyons #braiding #topological #codeart",
        "displayCode": "// Non-Abelian Anyon Braiding Matrix: R = exp(i * pi / 8 * sigma_z)\nfunction braidOperator(tau1, tau2) {\n  return 'Unitary Gate: Phase e^(i*pi/4)';\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.65],
            "strands": 4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 4 Braided Worldline Strands (20,000 points)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const s = i % params.strands;
        const y = -7.0 + (i / pCount) * 14.0;
        const phase = y * 1.5 + (s * Math.PI / 2);
        const rad = 2.2 + Math.sin(y * 2.0) * 0.8;

        pPos[i * 3] = Math.cos(phase) * rad;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(phase) * rad;

        const col = (s % 2 === 0) ? c1 : c2;
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const braid = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(braid);

      scene.userData = { group, braid, params };""",
        "renderBody": """      data.braid.rotation.y = t * 0.8;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cellular_automata_3d_conway_glider_stream",
        "title": "3D Cellular Automata Conway Glider Gun & Collision Crystalline Stream",
        "fileName": "conway_3d_glider.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "👾 Emergent artificial life: 3D Conway cellular automata glider streams and crystalline collisions in Three.js! Follow @kreggsjs for daily reels! ⚡💻\n\n#threejs #webgl #cellularautomata #gameoflife #artificiallife #cyberpunk #mathart #codeart",
        "displayCode": "// 3D Life Rule Bays 5766/4/2: Survives if 5-7 neighbors, Born if 6\nfunction lifeRule3D(neighbors, state) {\n  return (state === 1) ? (neighbors >= 5 && neighbors <= 7 ? 1 : 0) : (neighbors === 6 ? 1 : 0);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.65],
            "secondaryColor": [0.95, 0.35, 0.85],
            "gridSize": 12
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 3D Glider Streams (Instanced or Box cluster)
      const cubes = [];
      for (let i = 0; i < 48; i++) {
        const sz = 0.8;
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(sz, sz, sz),
          new THREE.MeshStandardMaterial({ color: (i % 2 === 0) ? c1 : c2, emissive: c1, emissiveIntensity: 0.55, wireframe: true })
        );
        box.position.set((Math.random() - 0.5) * 12.0, (Math.random() - 0.5) * 12.0, (Math.random() - 0.5) * 12.0);
        group.add(box);
        cubes.push(box);
      }

      scene.userData = { group, cubes, params };""",
        "renderBody": """      data.cubes.forEach((c, idx) => {
        c.position.y += 0.05;
        if (c.position.y > 7.0) c.position.y = -7.0;
        c.rotation.x += 0.02;
      });
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "transformer_self_attention_high_dim_tensor",
        "title": "Transformer Multi-Head Self-Attention Hypergraph",
        "fileName": "transformer_attention.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "🤖 The architecture driving modern AI: Transformer scaled dot-product multi-head self-attention attention heads in Three.js! Follow @kreggsjs for daily reels! ⚡💻\n\n#threejs #webgl #transformer #llm #selfattention #ai #machinelearning #codeart",
        "displayCode": "// Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V\nfunction attention(Q, K, d_k) {\n  return Math.exp(Q * K / Math.sqrt(d_k));\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.85, 1.0],
            "secondaryColor": [1.0, 0.35, 0.75],
            "tokens": 28
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Token Embedding Ring
      for (let i = 0; i < params.tokens; i++) {
        const u = (i / params.tokens) * Math.PI * 2;
        const tok = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: c1 }));
        tok.position.set(Math.cos(u) * 6.8, 0, Math.sin(u) * 6.8);
        group.add(tok);
      }

      // 20,000 Attention Weight Query-Key Flow Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const thA = Math.random() * Math.PI * 2;
        const thB = Math.random() * Math.PI * 2;
        const alpha = Math.random();
        const pA = new THREE.Vector3(Math.cos(thA) * 6.8, 0, Math.sin(thA) * 6.8);
        const pB = new THREE.Vector3(Math.cos(thB) * 6.8, 0, Math.sin(thB) * 6.8);

        pPos[i * 3] = THREE.MathUtils.lerp(pA.x, pB.x, alpha);
        pPos[i * 3 + 1] = Math.sin(alpha * Math.PI) * 2.8;
        pPos[i * 3 + 2] = THREE.MathUtils.lerp(pA.z, pB.z, alpha);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 7 + Math.cos(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quantum_entangled_w_state_tripartite_sphere",
        "title": "Tripartite Quantum Entangled W-State Bloch Polytope",
        "fileName": "w_state_entanglement.js",
        "category": "Cyberpunk & Digital Systems",
        "genre": "cyber",
        "caption": "⚛️ Genuine tripartite quantum entanglement: the maximally robust W-State (|001> + |010> + |100>)/sqrt(3) in Three.js! Follow @kreggsjs for daily reels! ⚡💻\n\n#threejs #webgl #wstate #quantum #entanglement #quantumcomputing #physics #codeart",
        "displayCode": "// Tripartite W-State Superposition\nfunction wState() {\n  // |W> = 1/sqrt(3) * ( |100> + |010> + |001> )\n  return 1.0 / Math.sqrt(3.0);\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.85],
            "secondaryColor": [0.95, 0.35, 0.75],
            "polyRadius": 5.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 3 Entangled Vertex Nodes
      for (let i = 0; i < 3; i++) {
        const u = (i / 3) * Math.PI * 2;
        const q = new THREE.Mesh(new THREE.SphereGeometry(1.0, 24, 24), new THREE.MeshBasicMaterial({ color: c1 }));
        q.position.set(Math.cos(u) * params.polyRadius, (i === 0 ? 2 : -1.5), Math.sin(u) * params.polyRadius);
        group.add(q);
      }

      // 20,000 Non-Local Tripartite Entanglement Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = params.polyRadius * (0.8 + Math.random() * 0.4);
        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })));

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
