# tools/defs_new_geometry.py
# 15 Hyper-Dimensional & Advanced Pure Mathematics Visualizers (IDs 116-130)

DEFS_GEOMETRY = [
    {
        "id": "costa_minimal_surface",
        "title": "Costa's Genus-One Minimal Surface",
        "fileName": "costa_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 Costa's revolutionary Genus-1 Triply Periodic Minimal Surface with zero mean curvature in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #costasurface #minimalsurface #sacredgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Weierstrass-Enneper Parametrization of Costa Surface\nfunction costaWeierstrass(u, v) {\n  const x = Math.sinh(u) * Math.sin(v) / (1 + Math.cosh(u) * Math.cos(v));\n  const y = -Math.sinh(u) * Math.cos(v) / (1 + Math.cosh(u) * Math.cos(v));\n  const z = u - (Math.sinh(2*u) / (2 * (Math.cosh(2*u) + Math.cos(2*v))));\n  return new THREE.Vector3(x * 4.0, y * 4.0, z * 2.0);\n}",
        "defaultParams": {
            "primaryColor": [0.65, 0.2, 0.95],
            "secondaryColor": [0.2, 0.9, 1.0],
            "gridU": 50,
            "gridV": 50
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const uSteps = params.gridU, vSteps = params.gridV;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= uSteps; i++) {
        const u = -1.8 + (i / uSteps) * 3.6;
        for (let j = 0; j <= vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          const denom = 1 + Math.cosh(u) * Math.cos(v);
          const safeDenom = Math.abs(denom) < 0.05 ? 0.05 : denom;
          const x = (Math.sinh(u) * Math.sin(v)) / safeDenom;
          const y = (-Math.sinh(u) * Math.cos(v)) / safeDenom;
          const z = u - (Math.sinh(2*u) / (2 * (Math.cosh(2*u) + Math.cos(2*v) + 0.1)));
          pts.push(x * 3.2, z * 2.5, y * 3.2);
        }
      }

      for (let i = 0; i < uSteps; i++) {
        for (let j = 0; j < vSteps; j++) {
          const a = i * (vSteps + 1) + j;
          const b = (i + 1) * (vSteps + 1) + j;
          const c = (i + 1) * (vSteps + 1) + (j + 1);
          const d = i * (vSteps + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.35, wireframe: true, side: THREE.DoubleSide
      });
      const costaMesh = new THREE.Mesh(geo, mat);
      group.add(costaMesh);

      // Orbital ambient particles
      const pCount = 3000;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const rad = 5.0 + Math.random() * 6.0;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.random() * Math.PI;
        pPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = rad * Math.cos(ph);
        pPos[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const sparkles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: c2, size: 0.14, blending: THREE.AdditiveBlending }));
      group.add(sparkles);

      scene.userData = { group, costaMesh, sparkles, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "roman_steiner_surface",
        "title": "Steiner's Roman Surface & Tetrahedral Cross-Caps",
        "fileName": "steiner_roman.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 Jakob Steiner's legendary Roman Surface with 4 tetrahedral cross-caps and triple self-intersections in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #romansurface #steiner #projectivegeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Steiner Roman Surface Parametrization\nfunction steinerRoman(u, v, r = 5.2) {\n  const x = r * Math.sin(2 * u) * Math.cos(v) * Math.cos(v);\n  const y = r * Math.sin(u) * Math.sin(2 * v);\n  const z = r * Math.cos(u) * Math.sin(2 * v);\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.25, 0.55],
            "secondaryColor": [0.35, 0.85, 1.0],
            "gridResolution": 44
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.gridResolution;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI;
          const r = 5.0;
          const x = r * Math.sin(2 * u) * Math.cos(v) * Math.cos(v);
          const y = r * Math.sin(u) * Math.sin(2 * v);
          const z = r * Math.cos(u) * Math.sin(2 * v);
          pts.push(x, y, z);
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.4, wireframe: true, side: THREE.DoubleSide
      });
      const romanMesh = new THREE.Mesh(geo, mat);
      group.add(romanMesh);

      scene.userData = { group, romanMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.4;
      data.group.rotation.z = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "boy_surface_projective_plane",
        "title": "Boy's Surface 3D Real Projective Plane Embedding",
        "fileName": "boy_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Werner Boy's non-orientable immersion of the Real Projective Plane with 3-fold tetrahedral symmetry in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #boysurface #topology #projectivegeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Boy's Surface Apery Complex Parametrization\nfunction boySurface(u, v) {\n  const z = new THREE.Vector2(Math.sin(u) * Math.cos(v), Math.cos(u));\n  const d = Math.sqrt(2) * Math.pow(z.y, 3) * Math.sin(3 * v);\n  return { x: d * Math.cos(u), y: d * Math.sin(u), z: z.y * 4.5 };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.9, 0.75],
            "secondaryColor": [0.95, 0.3, 0.7],
            "uDivs": 48
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.uDivs;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI;
          // Apery polynomial immersion approximation
          const d = Math.sqrt(2) * Math.pow(Math.cos(u), 3) * Math.sin(3 * v);
          const x = 4.2 * Math.cos(u) * Math.cos(v) + d * 0.4;
          const y = 4.2 * Math.cos(u) * Math.sin(v) + d * 0.4;
          const z = 4.2 * Math.sin(u) * Math.cos(2 * v);
          pts.push(x, y, z);
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const boyMesh = new THREE.Mesh(geo, mat);
      group.add(boyMesh);

      scene.userData = { group, boyMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "barth_sextic_nodal_surface",
        "title": "Barth Sextic 65-Nodal Icosahedral Algebraic Surface",
        "fileName": "barth_sextic.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "✨ The miraculous Barth Sextic algebraic surface having the maximum possible 65 ordinary double nodal points with golden ratio symmetry in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💎\n\n#threejs #webgl #barthsextic #algebraicsurface #icosahedron #sacredgeometry #creativecoding #javascript #reels",
        "displayCode": "// Barth Sextic Algebraic Equation\nfunction barthSextic(x, y, z, phi = 1.6180339887) {\n  const term1 = 4 * (phi*phi * x*x - y*y) * (phi*phi * y*y - z*z) * (phi*phi * z*z - x*x);\n  const term2 = (1 + 2*phi) * Math.pow(x*x + y*y + z*z - 1, 2);\n  return term1 - term2;\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.4, 0.2, 0.9],
            "nodePoints": 65
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Nested Icosahedral Nodal Skeleton
      const ico1 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(4.8, 1),
        new THREE.MeshStandardMaterial({ color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true })
      );
      group.add(ico1);

      const ico2 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.2, 2),
        new THREE.MeshStandardMaterial({ color: c2, emissive: c2, emissiveIntensity: 0.4, wireframe: true })
      );
      group.add(ico2);

      // 65 Nodal Singular Points
      const nPos = [];
      const phi = (1 + Math.sqrt(5)) / 2;
      const baseCoords = [
        [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
        [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
        [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]
      ];
      baseCoords.forEach(c => {
        nPos.push(c[0] * 2.4, c[1] * 2.4, c[2] * 2.4);
      });
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nPos, 3));
      const nodes = new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25, blending: THREE.AdditiveBlending }));
      group.add(nodes);

      scene.userData = { group, ico1, ico2, nodes, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;
      data.ico2.rotation.y = -t * 0.5;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "cross_cap_projective_space",
        "title": "Cross-Cap Self-Intersecting Whitney Umbrella Space",
        "fileName": "cross_cap.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 The non-orientable topological Cross-Cap with Whitney umbrella singular pinch points in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #crosscap #whitneyumbrella #topology #mathart #creativecoding #javascript #reels",
        "displayCode": "// Cross-Cap Parametric Coordinates\nfunction crossCap(u, v, r = 4.8) {\n  const x = r * Math.cos(u) * Math.sin(2 * v);\n  const y = r * Math.sin(u) * Math.sin(2 * v);\n  const z = r * (Math.cos(v) * Math.cos(v) - Math.cos(u) * Math.cos(u) * Math.sin(v) * Math.sin(v));\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.35, 0.2],
            "secondaryColor": [0.2, 0.7, 1.0],
            "divs": 42
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.divs;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI / 2;
          const r = 5.2;
          const x = r * Math.cos(u) * Math.sin(2 * v);
          const y = r * Math.sin(u) * Math.sin(2 * v);
          const z = r * (Math.cos(v)*Math.cos(v) - Math.cos(u)*Math.cos(u)*Math.sin(v)*Math.sin(v));
          pts.push(x, z, y);
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.4, wireframe: true, side: THREE.DoubleSide
      });
      const capMesh = new THREE.Mesh(geo, mat);
      group.add(capMesh);

      scene.userData = { group, capMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.z = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "kuen_pseudospherical_surface",
        "title": "Kuen Surface of Constant Negative Gaussian Curvature",
        "fileName": "kuen_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Alfred Kuen's pseudospherical surface with constant negative Gaussian curvature twisting into elegant horns in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #kuensurface #hyperbolic #differentialgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Kuen Surface Soliton Equation Parameterization\nfunction kuenSurface(u, v) {\n  const denom = 1 + u * u * Math.sin(v) * Math.sin(v);\n  const x = 2 * (Math.cos(v) + v * Math.sin(v)) * Math.sin(u) / denom;\n  const y = 2 * (Math.sin(v) - v * Math.cos(v)) * Math.sin(u) / denom;\n  const z = Math.log(Math.tan(u / 2)) + (2 * Math.cos(u)) / denom;\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [0.25, 0.85, 1.0],
            "secondaryColor": [1.0, 0.45, 0.75],
            "resolution": 45
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.resolution;
      const pts = [];
      const indices = [];

      for (let i = 1; i < n; i++) {
        const u = 0.1 + (i / n) * (Math.PI - 0.2);
        for (let j = 0; j <= n; j++) {
          const v = -3.5 + (j / n) * 7.0;
          const denom = 1 + u * u * Math.sin(v) * Math.sin(v);
          const x = 2 * (Math.cos(v) + v * Math.sin(v)) * Math.sin(u) / denom;
          const y = 2 * (Math.sin(v) - v * Math.cos(v)) * Math.sin(u) / denom;
          const z = Math.log(Math.tan(u / 2)) + (2 * Math.cos(u)) / denom;
          pts.push(x * 2.2, z * 2.0, y * 2.2);
        }
      }

      for (let i = 0; i < n - 2; i++) {
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const kuenMesh = new THREE.Mesh(geo, mat);
      group.add(kuenMesh);

      scene.userData = { group, kuenMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.35;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "schnerk_tower_minimal_surface",
        "title": "Scherk's Infinite Periodic Minimal Tower Surface",
        "fileName": "scherk_tower.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🏛️ Heinrich Scherk's doubly periodic minimal surface forming an infinite twisted helical tower in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #scherksurface #minimalsurface #geometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Scherk's Second Surface Explicit Equation\nfunction scherkSurface(x, y) {\n  // z = ln(cos(y) / cos(x))\n  const cosX = Math.cos(x);\n  const cosY = Math.cos(y);\n  if (cosX * cosY <= 0) return 0;\n  return Math.log(Math.abs(cosY / cosX));\n}",
        "defaultParams": {
            "primaryColor": [0.4, 0.7, 1.0],
            "secondaryColor": [1.0, 0.85, 0.3],
            "gridPoints": 50
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridPoints;
      const pts = [];

      for (let i = 0; i < n; i++) {
        const x = -1.35 + (i / n) * 2.7;
        for (let j = 0; j < n; j++) {
          const y = -1.35 + (j / n) * 2.7;
          const z = Math.log(Math.abs(Math.cos(y) / (Math.cos(x) + 0.001)));
          if (Math.abs(z) < 3.5) {
            pts.push(x * 4.0, z * 2.0, y * 4.0);
            pts.push(x * 4.0, -z * 2.0, y * 4.0);
          }
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const tower = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.16, blending: THREE.AdditiveBlending
      }));
      group.add(tower);

      scene.userData = { group, tower, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hyperbolic_paraboloid_saddle",
        "title": "Doubly Ruled Hyperbolic Paraboloid Saddle Lattice",
        "fileName": "hyperbolic_paraboloid.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 The architectural doubly ruled hyperbolic paraboloid saddle surface weaving straight lines into curves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🏛️\n\n#threejs #webgl #hyperbolicparaboloid #ruledsurface #geometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Doubly Ruled Hyperbolic Paraboloid\nfunction hyperbolicSaddle(x, y, a = 3.5, b = 3.5) {\n  // z = (x^2 / a^2) - (y^2 / b^2)\n  const z = (x * x) / (a * a) - (y * y) / (b * b);\n  return new THREE.Vector3(x, z * 2.5, y);\n}",
        "defaultParams": {
            "primaryColor": [0.1, 0.95, 0.75],
            "secondaryColor": [1.0, 0.2, 0.5],
            "lineDensity": 36
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 4, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const n = params.lineDensity;
      const lines = new THREE.Group();
      group.add(lines);

      for (let i = 0; i <= n; i++) {
        const u = -4.5 + (i / n) * 9.0;
        // Family 1 straight ruling lines
        const pts1 = [
          new THREE.Vector3(u, (u*u - 20) * 0.2, -4.5),
          new THREE.Vector3(u, (u*u - 20) * 0.2, 4.5)
        ];
        const g1 = new THREE.BufferGeometry().setFromPoints(pts1);
        lines.add(new THREE.Line(g1, new THREE.LineBasicMaterial({ color: c1, transparent: true, opacity: 0.6 })));

        // Family 2 straight ruling lines
        const pts2 = [
          new THREE.Vector3(-4.5, (20 - u*u) * 0.2, u),
          new THREE.Vector3(4.5, (20 - u*u) * 0.2, u)
        ];
        const g2 = new THREE.BufferGeometry().setFromPoints(pts2);
        lines.add(new THREE.Line(g2, new THREE.LineBasicMaterial({ color: c2, transparent: true, opacity: 0.6 })));
      }

      scene.userData = { group, lines, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.2) * 0.35;

      camera.position.x = Math.sin(t * 0.25) * 22;
      camera.position.z = Math.cos(t * 0.25) * 22;
      camera.position.y = 4 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "bour_minimal_ruled_surface",
        "title": "Bour's Minimal Surface with 8-Fold Petal Symmetries",
        "fileName": "bour_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌸 Edmond Bour's classical minimal surface exhibiting twisting eight-fold petal harmonics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #boursurface #minimalsurface #geometry #sacredgeometry #creativecoding #javascript #reels",
        "displayCode": "// Bour's Minimal Surface Parametrization\nfunction bourSurface(u, v, m = 4) {\n  const r = Math.pow(u, m - 1);\n  const x = u * Math.cos(v) - (r / (2*m - 1)) * Math.cos((2*m - 1) * v);\n  const y = u * Math.sin(v) + (r / (2*m - 1)) * Math.sin((2*m - 1) * v);\n  const z = (2 * Math.pow(u, m) / m) * Math.cos(m * v);\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [0.85, 0.25, 1.0],
            "secondaryColor": [0.15, 0.9, 0.95],
            "radSteps": 42
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.radSteps;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = 0.1 + (i / n) * 1.5;
        for (let j = 0; j <= n; j++) {
          const v = (j / n) * Math.PI * 2;
          const m = 3;
          const r = Math.pow(u, m - 1);
          const x = (u * Math.cos(v) - (r / (2*m - 1)) * Math.cos((2*m - 1) * v)) * 3.5;
          const y = (u * Math.sin(v) + (r / (2*m - 1)) * Math.sin((2*m - 1) * v)) * 3.5;
          const z = ((2 * Math.pow(u, m) / m) * Math.cos(m * v)) * 3.0;
          pts.push(x, z, y);
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.45, wireframe: true, side: THREE.DoubleSide
      });
      const bourMesh = new THREE.Mesh(geo, mat);
      group.add(bourMesh);

      scene.userData = { group, bourMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hopf_link_torus_chain",
        "title": "Interlocking 7-Fold Hopf Link Torus Chain",
        "fileName": "hopf_link_chain.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔗 Topological chain of interlocking Hopf link torus rings undulating in harmonic resonance in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #hopflink #topology #torus #sacredgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Interlocking Hopf Link Chain Center Orbit\nfunction hopfChainRing(idx, total = 7, t = 0) {\n  const phi = (idx / total) * Math.PI * 2 + t * 0.2;\n  const r = 4.8;\n  const x = Math.cos(phi) * r;\n  const y = Math.sin(phi * 2) * 1.5;\n  const z = Math.sin(phi) * r;\n  return { pos: new THREE.Vector3(x, y, z), rotZ: phi };\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.75, 1.0],
            "secondaryColor": [1.0, 0.3, 0.7],
            "ringCount": 7
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 6, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const count = params.ringCount;
      const rings = [];

      for (let i = 0; i < count; i++) {
        const tGeo = new THREE.TorusGeometry(2.2, 0.28, 24, 64);
        const mix = i / count;
        const col = c1.clone().lerp(c2, mix);
        const tMat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.5, wireframe: true
        });
        const ring = new THREE.Mesh(tGeo, tMat);
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, rings, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;
      const count = data.rings.length;
      for (let i = 0; i < count; i++) {
        const phi = (i / count) * Math.PI * 2 + t * 0.3;
        const r = 4.5;
        data.rings[i].position.set(Math.cos(phi) * r, Math.sin(phi * 2) * 1.8, Math.sin(phi) * r);
        data.rings[i].rotation.x = phi;
        data.rings[i].rotation.y = t * 0.5 + i;
      }

      camera.position.x = Math.sin(t * 0.22) * 22;
      camera.position.z = Math.cos(t * 0.22) * 22;
      camera.position.y = 5 + Math.sin(t * 0.15) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "seifert_fiber_hyper_knot",
        "title": "Seifert Surface of a Figure-8 Topological Knot",
        "fileName": "seifert_knot.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Orientable 2D Seifert manifold with boundary spanning a figure-eight knot in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #seifertsurface #knottheory #figure8knot #topology #creativecoding #javascript #reels",
        "displayCode": "// Figure-Eight Knot Parametric Trajectory\nfunction figure8Knot(t, scale = 4.0) {\n  const x = scale * (2 + Math.cos(2*t)) * Math.cos(3*t);\n  const y = scale * (2 + Math.cos(2*t)) * Math.sin(3*t);\n  const z = scale * Math.sin(4*t);\n  return new THREE.Vector3(x, y, z);\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.6, 0.1],
            "secondaryColor": [0.3, 0.8, 1.0],
            "tubeSegments": 200
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 24);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Custom Figure-8 Knot Curve
      class Fig8Curve extends THREE.Curve {
        getPoint(t) {
          const theta = t * Math.PI * 2;
          const x = (2 + Math.cos(2 * theta)) * Math.cos(3 * theta) * 1.5;
          const y = (2 + Math.cos(2 * theta)) * Math.sin(3 * theta) * 1.5;
          const z = Math.sin(4 * theta) * 2.2;
          return new THREE.Vector3(x, z, y);
        }
      }

      const path = new Fig8Curve();
      const knotGeo = new THREE.TubeGeometry(path, params.tubeSegments, 0.45, 16, true);
      const knotMat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.6, wireframe: true
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);

      scene.userData = { group, knotMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.4;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.35;

      camera.position.x = Math.sin(t * 0.2) * 24;
      camera.position.z = Math.cos(t * 0.2) * 24;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "catenoid_helicoid_transformation",
        "title": "Bonnet Isometric Catenoid-to-Helicoid Morphing",
        "fileName": "catenoid_helicoid.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Bonnet association continuous isometric transformation morphing a catenoid into a helicoid in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #catenoid #helicoid #differentialgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Isometric Bonnet Associate Family Equation\nfunction bonnetTransform(u, v, theta = 0) {\n  const x = Math.cos(theta) * Math.sinh(v) * Math.sin(u) + Math.sin(theta) * Math.cosh(v) * Math.cos(u);\n  const y = -Math.cos(theta) * Math.sinh(v) * Math.cos(u) + Math.sin(theta) * Math.cosh(v) * Math.sin(u);\n  const z = u * Math.cos(theta) + v * Math.sin(theta);\n  return new THREE.Vector3(x * 2.5, z * 2.5, y * 2.5);\n}",
        "defaultParams": {
            "primaryColor": [0.3, 0.95, 0.8],
            "secondaryColor": [0.95, 0.2, 0.6],
            "gridU": 40,
            "gridV": 40
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.gridU;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const u = -Math.PI + (i / n) * Math.PI * 2;
        for (let j = 0; j <= n; j++) {
          const v = -1.5 + (j / n) * 3.0;
          const x = Math.sinh(v) * Math.sin(u) * 2.8;
          const y = -Math.sinh(v) * Math.cos(u) * 2.8;
          const z = u * 1.8;
          pts.push(x, z, y);
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const morphMesh = new THREE.Mesh(geo, mat);
      group.add(morphMesh);

      scene.userData = { group, morphMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.3;
      const theta = Math.sin(t * 0.6) * Math.PI * 0.5;
      const pos = data.morphMesh.geometry.attributes.position;
      const n = data.params.gridU;

      let idx = 0;
      for (let i = 0; i <= n; i++) {
        const u = -Math.PI + (i / n) * Math.PI * 2;
        for (let j = 0; j <= n; j++) {
          const v = -1.5 + (j / n) * 3.0;
          const x = (Math.cos(theta)*Math.sinh(v)*Math.sin(u) + Math.sin(theta)*Math.cosh(v)*Math.cos(u)) * 2.8;
          const y = (-Math.cos(theta)*Math.sinh(v)*Math.cos(u) + Math.sin(theta)*Math.cosh(v)*Math.sin(u)) * 2.8;
          const z = (u * Math.cos(theta) + v * Math.sin(theta)) * 1.8;
          pos.setXYZ(idx++, x, z, y);
        }
      }
      pos.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "riemann_zeta_critical_strip",
        "title": "Riemann Zeta Function Analytic Critical Strip Landscape",
        "fileName": "riemann_zeta.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔢 The Riemann Zeta function complex modulus landscape & non-trivial zeros along the Critical Line Re(s)=1/2 in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡💎\n\n#threejs #webgl #riemannhypothesis #zetafunction #primenumbers #mathart #creativecoding #javascript #reels",
        "displayCode": "// Dirichlet Eta Series Riemann Zeta Approximation\nfunction dirichletEta(sigma, t, N = 60) {\n  let re = 0, im = 0;\n  for (let n = 1; n <= N; n++) {\n    const sign = (n % 2 === 1) ? 1 : -1;\n    const term = sign * Math.pow(n, -sigma);\n    re += term * Math.cos(t * Math.log(n));\n    im -= term * Math.sin(t * Math.log(n));\n  }\n  return Math.sqrt(re * re + im * im);\n}",
        "defaultParams": {
            "primaryColor": [0.2, 0.6, 1.0],
            "secondaryColor": [1.0, 0.8, 0.1],
            "gridX": 50,
            "gridY": 60
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 10, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      const nx = params.gridX, ny = params.gridY;
      const pts = [];

      for (let i = 0; i < nx; i++) {
        const sigma = 0.0 + (i / nx) * 1.0; // Critical strip [0, 1]
        for (let j = 0; j < ny; j++) {
          const ty = 5.0 + (j / ny) * 35.0; // Imaginary height
          // Modulus approximation
          let re = 0, im = 0;
          for (let n = 1; n <= 25; n++) {
            const s = (n % 2 === 1) ? 1 : -1;
            const term = s * Math.pow(n, -sigma);
            re += term * Math.cos(ty * Math.log(n));
            im -= term * Math.sin(ty * Math.log(n));
          }
          const mod = Math.sqrt(re*re + im*im);
          pts.push((sigma - 0.5) * 12.0, mod * 1.8 - 3.0, (ty - 22.5) * 0.6);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const zetaLandscape = new THREE.Points(geo, new THREE.PointsMaterial({
        color: c1, size: 0.16, blending: THREE.AdditiveBlending
      }));
      group.add(zetaLandscape);

      // Critical Line Re(s) = 0.5
      const linePts = [new THREE.Vector3(0, -3.0, -12), new THREE.Vector3(0, 8.0, 12)];
      const critLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePts),
        new THREE.LineBasicMaterial({ color: c2, linewidth: 2 })
      );
      group.add(critLine);

      scene.userData = { group, zetaLandscape, critLine, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.25;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.position.y = 8 + Math.sin(t * 0.15) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "quaternion_rotor_spherical_harmonics",
        "title": "4D Quaternion Rotor & Spherical Harmonic Orbital Lobes",
        "fileName": "quaternion_rotor.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 4D quaternion double-cover SO(3) rotations projecting undulating real spherical harmonic orbital lobes in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #quaternion #sphericalharmonics #orbital #higherdimensions #creativecoding #javascript #reels",
        "displayCode": "// Spherical Harmonics Y_l^m Complex Angular Lobes\nfunction sphericalHarmonicY32(theta, phi) {\n  // l = 3, m = 2 octupole lobe\n  const r = 4.5 * Math.sin(theta) * Math.sin(theta) * Math.cos(theta) * Math.cos(2 * phi);\n  return Math.abs(r);\n}",
        "defaultParams": {
            "primaryColor": [0.95, 0.2, 0.8],
            "secondaryColor": [0.2, 0.9, 1.0],
            "lobeDivs": 45
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const n = params.lobeDivs;
      const pts = [];
      const indices = [];

      for (let i = 0; i <= n; i++) {
        const theta = (i / n) * Math.PI;
        for (let j = 0; j <= n; j++) {
          const phi = (j / n) * Math.PI * 2;
          // Octupole spherical harmonic lobe
          const r = 2.0 + 3.8 * Math.pow(Math.sin(theta), 2) * Math.abs(Math.cos(2 * phi));
          pts.push(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.cos(theta),
            r * Math.sin(theta) * Math.sin(phi)
          );
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
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: c1, emissive: c1, emissiveIntensity: 0.5, wireframe: true, side: THREE.DoubleSide
      });
      const lobeMesh = new THREE.Mesh(geo, mat);
      group.add(lobeMesh);

      scene.userData = { group, lobeMesh, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.45;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.4;
      data.group.rotation.z = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "calabi_triangle_orbifold",
        "title": "Hyperbolic Poincaré Triangle Orbifold Tessellation",
        "fileName": "hyperbolic_orbifold.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 Infinite (2,3,7) hyperbolic triangle group reflection orbifold tiling the Poincaré disk in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡🔮\n\n#threejs #webgl #poincare #orbifold #hyperbolicgeometry #sacredgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": "// Hyperbolic Distance & Triangle Group Reflection\nfunction hyperbolicPoincareMetric(x, y) {\n  const r2 = x * x + y * y;\n  const ds2 = (4 * (x*x + y*y)) / Math.pow(1 - r2, 2);\n  return { r2, ds2 };\n}",
        "defaultParams": {
            "primaryColor": [1.0, 0.8, 0.2],
            "secondaryColor": [0.2, 0.7, 1.0],
            "rings": 8
        },
        "initBody": """      camera.fov = 50; camera.aspect = 1080 / 1920;
      camera.near = 0.1; camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 22);

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // Concentric Geodesic Triangle Rings
      const ringsGroup = new THREE.Group();
      group.add(ringsGroup);

      for (let r = 1; r <= params.rings; r++) {
        const rad = 2.0 + Math.tanh(r * 0.35) * 5.5;
        const sides = 3 * r;
        const tGeo = new THREE.RingGeometry(rad - 0.08, rad + 0.08, sides);
        const tMat = new THREE.MeshBasicMaterial({
          color: (r % 2 === 0 ? c1 : c2), side: THREE.DoubleSide, wireframe: true
        });
        const ring = new THREE.Mesh(tGeo, tMat);
        ring.position.z = (r - 4) * 0.6;
        ringsGroup.add(ring);
      }

      scene.userData = { group, ringsGroup, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.3;
      data.group.rotation.x = Math.sin(t * 0.25) * 0.4;
      data.group.rotation.y = Math.cos(t * 0.2) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 22;
      camera.position.z = Math.cos(t * 0.2) * 22;
      camera.lookAt(0, 0, 0);"""
    }
]
