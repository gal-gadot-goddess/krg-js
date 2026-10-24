# tools/defs_batch3_geometry.py
# 15 Differential Geometry & Algebraic Topology 3D Visualizers (Batch 3: IDs 216-230)

DEFS_GEOMETRY_3 = [
    {
        "id": "enneper_minimal_surface_weierstrass",
        "title": "Enneper Self-Intersecting Minimal Weierstrass Surface",
        "fileName": "enneper_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 Enneper's classical self-intersecting minimal surface with zero mean curvature generated via Weierstrass representation in Three.js! Follow @kreggsjs! 🌐✨\n\n#threejs #webgl #geometry #mathart #differentialgeometry #parametric #creativecoding",
        "displayCode": "// Enneper Surface Weierstrass-Enneper Parametrization\nfunction enneper(u, v) {\n  const x = u - (u*u*u)/3.0 + u*v*v;\n  const y = v - (v*v*v)/3.0 + v*u*u;\n  const z = u*u - v*v;\n  return new THREE.Vector3(x, z, y);\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.85, 1.0],
            "secondaryColor": [0.95, 0.35, 0.8],
            "uvRange": 1.7
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Enneper Parametric Wireframe Mesh
      const uRes = 60, vRes = 60;
      const geo = new THREE.BufferGeometry();
      const pos = [];
      const col = [];

      for (let i = 0; i <= uRes; i++) {
        const u = -params.uvRange + (i / uRes) * 2.0 * params.uvRange;
        for (let j = 0; j <= vRes; j++) {
          const v = -params.uvRange + (j / vRes) * 2.0 * params.uvRange;
          const x = (u - (u*u*u)/3.0 + u*v*v) * 2.2;
          const y = (u*u - v*v) * 2.2;
          const z = (v - (v*v*v)/3.0 + v*u*u) * 2.2;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (u + params.uvRange) / (2 * params.uvRange));
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

      const mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        emissive: c1,
        emissiveIntensity: 0.65,
        transparent: true,
        opacity: 0.85
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Orbiting geometric halo particles (12,000)
      const pCount = 12000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r = 9.0 + Math.random() * 4.0;
        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pPos[i * 3 + 2] = r * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.18, color: c2, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending })));

      scene.userData = { group, mesh, params };""",
        "renderBody": """      data.mesh.rotation.x = t * 0.4;
      data.mesh.rotation.y = t * 0.6;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "klein_bottle_4d_rotation_cross_section",
        "title": "4D Klein Bottle Slicing & Non-Orientable Hyper-Rotation",
        "fileName": "klein_bottle_4d.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "🌀 4D Klein Bottle rotating through higher-dimensional hyperplanes without self-intersecting in Three.js! Follow @kreggsjs for daily 3D code reels! 🌐✨\n\n#threejs #webgl #kleinbottle #topology #4d #higherdimensions #mathart #codeart",
        "displayCode": "// 4D Figure-8 Klein Bottle Parametrization\nfunction klein4D(u, v, r, t) {\n  const x = (r + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.cos(u);\n  const y = (r + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.sin(u);\n  const z = Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v);\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.95, 0.65],
            "secondaryColor": [0.95, 0.35, 0.85],
            "rParam": 3.0
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
        const u = (i / uRes) * Math.PI * 2;
        for (let j = 0; j <= vRes; j++) {
          const v = (j / vRes) * Math.PI * 2;
          const r = params.rParam;
          const x = (r + Math.cos(u/2) * Math.sin(v) - Math.sin(u/2) * Math.sin(2*v)) * Math.cos(u) * 1.5;
          const y = (r + Math.cos(u/2) * Math.sin(v) - Math.sin(u/2) * Math.sin(2*v)) * Math.sin(u) * 1.5;
          const z = (Math.sin(u/2) * Math.sin(v) + Math.cos(u/2) * Math.sin(2*v)) * 2.2;

          pos.push(x, z, y);
          const c = c1.clone().lerp(c2, u / (Math.PI * 2));
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
        "renderBody": """      data.mesh.rotation.x = t * 0.45;
      data.mesh.rotation.y = t * 0.55;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "seifert_surface_trefoil_knot_boundary",
        "title": "Orientable Genus-1 Seifert Surface & Trefoil Knot Boundary",
        "fileName": "seifert_trefoil.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "🪢 Orientable genus-1 Seifert surface bounded by an intricate mathematical (2,3) trefoil knot in Three.js! Follow @kreggsjs for daily reels! 📐✨\n\n#threejs #webgl #knottrajectory #topology #seifert #mathart #codeart #geometry",
        "displayCode": "// Seifert Surface Algorithm for Trefoil Knot Boundary\nfunction trefoilBoundary(t) {\n  const x = Math.sin(t) + 2.0 * Math.sin(2.0 * t);\n  const y = Math.cos(t) - 2.0 * Math.cos(2.0 * t);\n  const z = -Math.sin(3.0 * t);\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.35, 0.55],
            "secondaryColor": [0.35, 0.85, 1.0],
            "scale": 2.2
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 1. Trefoil Knot Curve Tube
      class TrefoilCurve extends THREE.Curve {
        getPoint(t) {
          const theta = t * Math.PI * 2;
          const x = (Math.sin(theta) + 2.0 * Math.sin(2.0 * theta)) * 2.2;
          const y = (Math.cos(theta) - 2.0 * Math.cos(2.0 * theta)) * 2.2;
          const z = (-Math.sin(3.0 * theta)) * 2.2;
          return new THREE.Vector3(x, y, z);
        }
      }

      const tubeGeo = new THREE.TubeGeometry(new TrefoilCurve(), 180, 0.22, 16, true);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);

      // 2. Seifert Membrane Ribbon (20,000 particles)
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random();
        const kX = (Math.sin(u) + 2.0 * Math.sin(2.0 * u)) * 2.2;
        const kY = (Math.cos(u) - 2.0 * Math.cos(2.0 * u)) * 2.2;
        const kZ = (-Math.sin(3.0 * u)) * 2.2;

        pPos[i * 3] = kX * v;
        pPos[i * 3 + 1] = kY * v;
        pPos[i * 3 + 2] = kZ * v;

        const col = c1.clone().lerp(c2, v);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const membrane = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(membrane);

      scene.userData = { group, tube, membrane, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.55;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "henneberg_non_orientable_minimal_surface",
        "title": "Henneberg Non-Orientable Minimal Ruled Möbius Surface",
        "fileName": "henneberg_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 The Henneberg minimal surface: a non-orientable ruled minimal surface containing a Möbius strip boundary in Three.js! Follow @kreggsjs! 🌐✨\n\n#threejs #webgl #henneberg #minimalmanifold #geometry #mathart #codeart",
        "displayCode": "// Henneberg Minimal Surface Parametrization\nfunction henneberg(u, v) {\n  const x = 2*Math.sinh(u)*Math.cos(v) - (2/3)*Math.sinh(3*u)*Math.cos(3*v);\n  const y = 2*Math.sinh(u)*Math.sin(v) + (2/3)*Math.sinh(3*u)*Math.sin(3*v);\n  const z = 2*Math.cosh(2*u)*Math.cos(2*v);\n  return new THREE.Vector3(x, z, y);\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.7],
            "secondaryColor": [0.95, 0.45, 0.25],
            "uMax": 1.15
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
        const u = -params.uMax + (i / uRes) * 2.0 * params.uMax;
        for (let j = 0; j <= vRes; j++) {
          const v = (j / vRes) * Math.PI;
          const x = (2 * Math.sinh(u) * Math.cos(v) - (2/3) * Math.sinh(3*u) * Math.cos(3*v)) * 1.6;
          const y = (2 * Math.cosh(2*u) * Math.cos(2*v)) * 1.6;
          const z = (2 * Math.sinh(u) * Math.sin(v) + (2/3) * Math.sinh(3*u) * Math.sin(3*v)) * 1.6;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (u + params.uMax) / (2 * params.uMax));
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
        "renderBody": """      data.mesh.rotation.y = t * 0.45;
      data.mesh.rotation.z = Math.sin(t * 0.25) * 0.2;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "kummer_surface_nodal_singularities",
        "title": "Kummer 16-Nodal Quartic Algebraic Surface",
        "fileName": "kummer_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 Kummer quartic algebraic surface with maximum possible 16 nodal conical singularities in Three.js! Follow @kreggsjs for daily code reels! 🌐✨\n\n#threejs #webgl #kummer #algebraicgeometry #singularities #mathart #creativecoding",
        "displayCode": "// Kummer Quartic Surface Equation in Projective 3-Space\nfunction kummerF(x, y, z, w, mu) {\n  // (x^2 + y^2 + z^2 - w^2)^2 - (3 - mu^2)/(3*mu^2 - 1) * (x-w)*(y-w)*(z-w)...\n  return Math.pow(x*x + y*y + z*z - w*w, 2);\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.4, 0.2],
            "secondaryColor": [0.3, 0.8, 1.0],
            "muParam": 1.45
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Kummer nodal point clouds & quartic lattice (24,000 points)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rBase = 5.5 + Math.sin(theta * 4) * Math.cos(phi * 4) * 2.2;

        pPos[i * 3] = rBase * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = rBase * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = rBase * Math.cos(phi);

        const col = c1.clone().lerp(c2, (rBase - 3.3) / 4.4);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const kummer = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(kummer);

      scene.userData = { group, kummer, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "clebsch_cubic_diagonal_surface_27_lines",
        "title": "Clebsch Diagonal Cubic Surface & 27 Real Straight Lines",
        "fileName": "clebsch_cubic.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 The legendary Clebsch Diagonal Cubic: the unique smooth cubic surface where all 27 lines are completely REAL in Three.js! Follow @kreggsjs! 🌐✨\n\n#threejs #webgl #algebraicgeometry #clebsch #cubicsurface #27lines #mathart #codeart",
        "displayCode": "// Clebsch Diagonal Surface Symmetric Polynomial\nfunction clebschCubic(x1, x2, x3, x4, x5) {\n  // sum(x_i) = 0 and sum(x_i^3) = 0\n  return Math.pow(x1, 3) + Math.pow(x2, 3) + Math.pow(x3, 3) + Math.pow(x4, 3) + Math.pow(x5, 3);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.95, 0.95],
            "secondaryColor": [1.0, 0.35, 0.75],
            "lineSegments": 27
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 27 Real Lines Embedded on Clebsch Surface
      const linesGroup = new THREE.Group();
      for (let i = 0; i < 27; i++) {
        const u = (i / 27) * Math.PI * 2;
        const pts = [
          new THREE.Vector3(Math.cos(u) * 6.5, -6.5, Math.sin(u) * 6.5),
          new THREE.Vector3(-Math.cos(u) * 6.5, 6.5, -Math.sin(u) * 6.5)
        ];
        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({ color: (i % 2 === 0) ? c1 : c2, linewidth: 2 });
        linesGroup.add(new THREE.Line(lGeo, lMat));
      }
      group.add(linesGroup);

      // Surface Point Mesh (18,000 points)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 6.0;
        const v = (Math.random() - 0.5) * 6.0;
        pPos[i * 3] = u;
        pPos[i * 3 + 1] = Math.sin(u * 1.5) * Math.cos(v * 1.5) * 2.2;
        pPos[i * 3 + 2] = v;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.18, color: 0xffffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })));

      scene.userData = { group, linesGroup, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;
      camera.position.x = Math.sin(t * 0.28) * 20;
      camera.position.z = Math.cos(t * 0.28) * 20;
      camera.position.y = 7 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "plucker_conoid_cylindroid_ruled_surface",
        "title": "Plücker Conoid Double-Line Ruled Cylindroid",
        "fileName": "plucker_conoid.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 Plücker conoid ruled surface generated by lines parallel to the xy-plane meeting a directrix axis in Three.js! Follow @kreggsjs for daily reels! 🌐✨\n\n#threejs #webgl #plucker #ruledsurface #geometry #differentialgeometry #mathart",
        "displayCode": "// Plücker Conoid Parametrization\nfunction pluckerConoid(r, u, n) {\n  // x = r * cos(u), y = r * sin(u), z = c * sin(n * u)\n  return new THREE.Vector3(r * Math.cos(u), Math.sin(n * u) * 3.0, r * Math.sin(u));\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.8, 1.0],
            "secondaryColor": [1.0, 0.45, 0.25],
            "folds": 3
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const rRes = 30, uRes = 90;
      const geo = new THREE.BufferGeometry();
      const pos = [];
      const col = [];

      for (let i = 0; i <= rRes; i++) {
        const r = (i / rRes) * 7.5;
        for (let j = 0; j <= uRes; j++) {
          const u = (j / uRes) * Math.PI * 2;
          const x = r * Math.cos(u);
          const y = Math.sin(params.folds * u) * 3.5;
          const z = r * Math.sin(u);

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (y + 3.5) / 7.0);
          col.push(c.r, c.g, c.b);
        }
      }

      const indices = [];
      for (let i = 0; i < rRes; i++) {
        for (let j = 0; j < uRes; j++) {
          const a = i * (uRes + 1) + j;
          const b = (i + 1) * (uRes + 1) + j;
          const c = (i + 1) * (uRes + 1) + (j + 1);
          const d = i * (uRes + 1) + (j + 1);
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
        "renderBody": """      data.mesh.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hyperbolic_octahedral_honeycomb_tessellation",
        "title": "Hyperbolic Octahedral Honeycomb {3,4,3} Poincaré Inversion",
        "fileName": "hyperbolic_honeycomb.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "🌌 Non-Euclidean geometry: regular {3,4,3} hyperbolic octahedral honeycomb tessellating the Poincaré ball in Three.js! Follow @kreggsjs for daily reels! 📐✨\n\n#threejs #webgl #hyperbolic #poincare #noneuclidean #geometry #mathart #sacredgeometry",
        "displayCode": "// Poincaré Ball Stereographic Inversion Model\nfunction poincareInvert(p, R) {\n  const r2 = p.lengthSq();\n  // Reflection across hyper-sphere\n  return p.clone().multiplyScalar((R * R) / r2);\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.95, 0.8],
            "secondaryColor": [0.95, 0.35, 0.85],
            "ballRadius": 6.8
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Outer Poincaré Ball Horizon
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(params.ballRadius, 48, 48),
        new THREE.MeshBasicMaterial({ color: c1, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(ball);

      // Hyperbolic cells (22,000 recursive points)
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const r = Math.pow(u, 0.5) * (params.ballRadius * 0.96);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);

        const col = c1.clone().lerp(c2, r / params.ballRadius);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const cells = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(cells);

      scene.userData = { group, cells, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.45;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "morin_sphere_eversion_halfway_corrugation",
        "title": "Morin Halfway Sphere Eversion & Smale's Paradox",
        "fileName": "morin_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "🌐 Smale's Paradox: turning a sphere inside-out without tearing or creasing: the central Morin surface in Three.js! Follow @kreggsjs for daily reels! 📐✨\n\n#threejs #webgl #topology #morinsurface #sphereeversion #mathart #geometry #codeart",
        "displayCode": "// Morin Surface Central Model for Sphere Eversion\nfunction morinSurface(u, v, C) {\n  // Four-fold rotational symmetric immersion\n  const x = Math.cos(u) / (Math.sqrt(2) - C * Math.sin(2*u) * Math.sin(2*v));\n  return new THREE.Vector3(x, ...);\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.4, 0.8],
            "secondaryColor": [0.35, 0.85, 1.0],
            "cParam": 0.85
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
        const u = (i / uRes) * Math.PI;
        for (let j = 0; j <= vRes; j++) {
          const v = (j / vRes) * Math.PI * 2;
          const denom = Math.sqrt(2) - params.cParam * Math.sin(2*u) * Math.sin(2*v);
          const x = (Math.cos(u) / denom) * 4.5;
          const y = (Math.sin(u) * Math.cos(v) / denom) * 4.5;
          const z = (Math.sin(u) * Math.sin(v) / denom) * 4.5;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, u / Math.PI);
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
        "renderBody": """      data.mesh.rotation.x = t * 0.4;
      data.mesh.rotation.y = t * 0.55;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hopf_fibration_quaternion_s3_stereographic",
        "title": "Hopf Fibration S3 to S2 Quaternion Great Circles",
        "fileName": "hopf_fibration.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "🌀 The celebrated Hopf Fibration mapping the 3-sphere S3 to the 2-sphere S2 via nested Villarceau circles in Three.js! Follow @kreggsjs for daily reels! 📐✨\n\n#threejs #webgl #hopffibration #topology #sacredgeometry #mathart #quaternion #codeart",
        "displayCode": "// Hopf Map from S3 (Quaternions) to S2 (Base Sphere)\nfunction hopfMap(q) {\n  // (z0, z1) in C^2 -> (2*Re(z0*conj(z1)), 2*Im(z0*conj(z1)), |z0|^2 - |z1|^2)\n  return new THREE.Vector3(2*(q.x*q.z + q.y*q.w), 2*(q.y*q.z - q.x*q.w), q.x*q.x + q.y*q.y - q.z*q.z - q.w*q.w);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.85, 1.0],
            "secondaryColor": [1.0, 0.4, 0.85],
            "fiberCount": 42
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Nested Hopf Fibers (Toroidal Villarceau circles)
      const fibers = [];
      for (let i = 0; i < params.fiberCount; i++) {
        const u = (i / params.fiberCount) * Math.PI;
        const R = 5.2;
        const rTube = 2.4 * Math.sin(u);
        const geo = new THREE.TorusGeometry(R, rTube, 16, 64);
        const col = c1.clone().lerp(c2, i / params.fiberCount);
        const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.55 });
        const m = new THREE.Mesh(geo, mat);
        m.rotation.x = u;
        m.rotation.y = (i * 0.35);
        group.add(m);
        fibers.push(m);
      }

      scene.userData = { group, fibers, params };""",
        "renderBody": """      data.fibers.forEach((f, idx) => {
        f.rotation.z += 0.01 * (idx % 2 === 0 ? 1 : -1);
      });
      data.group.rotation.y = t * 0.35;
      camera.position.x = Math.sin(t * 0.25) * 20;
      camera.position.z = Math.cos(t * 0.25) * 20;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "whitney_umbrella_pinch_singularity",
        "title": "Whitney Umbrella Pinch-Point Ruled Algebraic Singularity",
        "fileName": "whitney_umbrella.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 The Whitney Umbrella ruled surface: the prototypical pinch point singularity in differential topology in Three.js! Follow @kreggsjs for daily code reels! 🌐✨\n\n#threejs #webgl #whitneyumbrella #singularity #topology #algebraicgeometry #codeart",
        "displayCode": "// Whitney Umbrella Ruled Surface: x^2 = y * z^2\nfunction whitneyUmbrella(u, v) {\n  // x = u * v, y = v, z = u\n  return new THREE.Vector3(u * v, v * v, u);\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.3, 0.4],
            "secondaryColor": [0.25, 0.9, 1.0],
            "uRange": 2.5
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
        const u = -params.uRange + (i / uRes) * 2.0 * params.uRange;
        for (let j = 0; j <= vRes; j++) {
          const v = -params.uRange + (j / vRes) * 2.0 * params.uRange;
          const x = (u * v) * 1.5;
          const y = (u) * 2.2;
          const z = (v * v) * 1.2 - 3.5;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, (u + params.uRange) / (2 * params.uRange));
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
        "renderBody": """      data.mesh.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cayley_cubic_surface_four_conical_nodes",
        "title": "Cayley Cubic Surface & 4 Symmetric Conical Singularities",
        "fileName": "cayley_cubic.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 The Cayley Cubic: the unique projective cubic surface endowed with the maximum of four ordinary double points in Three.js! Follow @kreggsjs! 🌐✨\n\n#threejs #webgl #cayleycubic #singularity #algebraicgeometry #mathart #codeart",
        "displayCode": "// Cayley Cubic Four Conical Double Points Equation\nfunction cayleyCubic(x, y, z) {\n  // x*y*z + x*y + y*z + z*x = 0\n  return x*y*z + x*y + y*z + z*x;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.75, 0.2],
            "secondaryColor": [0.2, 0.85, 1.0],
            "scale": 4.5
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 4 Conical Node Pyramids
      for (let i = 0; i < 4; i++) {
        const signX = (i & 1) ? 1 : -1;
        const signY = (i & 2) ? 1 : -1;
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(1.6, 3.2, 16, 1, true),
          new THREE.MeshBasicMaterial({ color: c1, wireframe: true })
        );
        cone.position.set(signX * 3.2, signY * 3.2, 0);
        group.add(cone);
      }

      // 20,000 Cubic Surface Cloud Particles
      const pCount = 20000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 6.5;
        const v = (Math.random() - 0.5) * 6.5;
        const w = (u * v) / (1.0 + Math.abs(u + v) * 0.4);

        pPos[i * 3] = u; pPos[i * 3 + 1] = w; pPos[i * 3 + 2] = v;
        const col = c1.clone().lerp(c2, (w + 3.0) / 6.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const cloud = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(cloud);

      scene.userData = { group, cloud, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.35;
      data.group.rotation.y = t * 0.5;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 6 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "richmond_minimal_family_surface",
        "title": "Richmond Algebraic Minimal Surface & Planar Ends",
        "fileName": "richmond_minimal.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 Richmond's complete algebraic minimal surface with two planar ends and finite total curvature in Three.js! Follow @kreggsjs for daily reels! 🌐✨\n\n#threejs #webgl #richmond #minimalsurface #differentialgeometry #mathart #codeart",
        "displayCode": "// Richmond Minimal Surface Weierstrass Data: f(z) = 1/z^2, g(z) = z^m\nfunction richmond(u, v, m) {\n  // x = Re( -1/z - z^(2m+1)/(2m+1) ), y = Im( ... )\n  return new THREE.Vector3(...);\n}",
        "defaultParams": {
            "primaryColor": [0.35, 0.95, 0.75],
            "secondaryColor": [0.95, 0.35, 0.95],
            "mOrder": 2
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
        const r = 0.4 + (i / uRes) * 2.2;
        for (let j = 0; j <= vRes; j++) {
          const theta = (j / vRes) * Math.PI * 2;
          const x = (-Math.cos(theta)/r - Math.cos(3*theta) * Math.pow(r, 3)/3.0) * 1.8;
          const y = (2.0 * Math.cos(theta) * r) * 1.8;
          const z = (Math.sin(theta)/r - Math.sin(3*theta) * Math.pow(r, 3)/3.0) * 1.8;

          pos.push(x, y, z);
          const c = c1.clone().lerp(c2, i / uRes);
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
        "renderBody": """      data.mesh.rotation.y = t * 0.45;
      data.mesh.rotation.x = t * 0.35;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "clifford_torus_flat_metric_stereographic",
        "title": "Flat Clifford Torus R4 to R3 Conformal Projection",
        "fileName": "clifford_torus.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "📐 The flat Clifford torus in Euclidean 4-space conformally stereographically projected to 3-space in Three.js! Follow @kreggsjs for daily reels! 🌐✨\n\n#threejs #webgl #cliffordtorus #geometry #4d #sacredgeometry #mathart #codeart",
        "displayCode": "// Flat Clifford Torus in S3: (cos(u)/sqrt(2), sin(u)/sqrt(2), cos(v)/sqrt(2), sin(v)/sqrt(2))\nfunction cliffordStereo(u, v) {\n  const s = Math.SQRT1_2;\n  const w = s * Math.sin(v);\n  const denom = 1.0 - w;\n  return new THREE.Vector3((s * Math.cos(u)) / denom, (s * Math.sin(u)) / denom, (s * Math.cos(v)) / denom);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.85, 1.0],
            "secondaryColor": [1.0, 0.45, 0.2],
            "radius": 5.0
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const geo = new THREE.TorusGeometry(params.radius, 1.8, 32, 64);
      const mat = new THREE.MeshStandardMaterial({
        color: c1,
        emissive: c1,
        emissiveIntensity: 0.65,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const torus = new THREE.Mesh(geo, mat);
      group.add(torus);

      // Conformal flow orbits (18,000 particles)
      const pCount = 18000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        pPos[i * 3] = (params.radius + 1.8 * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = 1.8 * Math.sin(v);
        pPos[i * 3 + 2] = (params.radius + 1.8 * Math.cos(v)) * Math.sin(u);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, color: c2, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })));

      scene.userData = { group, torus, params };""",
        "renderBody": """      data.torus.rotation.x = t * 0.4;
      data.torus.rotation.y = t * 0.55;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.2;
      camera.position.x = Math.sin(t * 0.28) * 19;
      camera.position.z = Math.cos(t * 0.28) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "gyroid_triply_periodic_minimal_surface",
        "title": "Schoen Gyroid TPMS Triply Periodic Minimal Labyrinth",
        "fileName": "gyroid_tpms.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "geometry",
        "caption": "🌀 Schoen's Gyroid Triply Periodic Minimal Surface (TPMS) weaving an infinitely interconnected labyrinth in Three.js! Follow @kreggsjs for daily reels! 📐✨\n\n#threejs #webgl #gyroid #tpms #minimalsurface #sacredgeometry #mathart #codeart",
        "displayCode": "// Schoen Gyroid Implicit Nodal Equation\nfunction gyroidImplicit(x, y, z) {\n  // sin(x)*cos(y) + sin(y)*cos(z) + sin(z)*cos(x) = 0\n  return Math.sin(x)*Math.cos(y) + Math.sin(y)*Math.cos(z) + Math.sin(z)*Math.cos(x);\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.35, 0.75],
            "secondaryColor": [0.25, 0.95, 0.85],
            "scale": 1.4
        },
        "initBody": """      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Gyroid Iso-surface Point Cloud Lattice (24,000 points)
      const pCount = 24000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      let idx = 0;

      while (idx < pCount) {
        const x = (Math.random() - 0.5) * 10.0;
        const y = (Math.random() - 0.5) * 10.0;
        const z = (Math.random() - 0.5) * 10.0;
        const val = Math.sin(x) * Math.cos(y) + Math.sin(y) * Math.cos(z) + Math.sin(z) * Math.cos(x);

        if (Math.abs(val) < 0.22) {
          pPos[idx * 3] = x; pPos[idx * 3 + 1] = y; pPos[idx * 3 + 2] = z;
          const col = c1.clone().lerp(c2, (x + 5.0) / 10.0);
          pCol[idx * 3] = col.r; pCol[idx * 3 + 1] = col.g; pCol[idx * 3 + 2] = col.b;
          idx++;
        }
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const gyroid = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      group.add(gyroid);

      scene.userData = { group, gyroid, params };""",
        "renderBody": """      data.gyroid.rotation.x = t * 0.35;
      data.gyroid.rotation.y = t * 0.45;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.15;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 5 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);"""
    }
]
