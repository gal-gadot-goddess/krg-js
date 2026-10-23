# tools/defs_dimensions.py
# 14 Higher Dimensions & Sacred Geometry Visualizers

DIMENSIONS_VISUALIZERS = [
    {
        "id": "hopf_fibration_torus",
        "title": "Hopf Fibration & Villarceau Circles",
        "fileName": "hopf_fibration.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 4D Hypersphere projected to 3D via the Hopf Fibration map! Interlocking Villarceau circles nested in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #hopffibration #sacredgeometry #mathart #topology #creativecoding #javascript #reels",
        "displayCode": """// S^3 -> S^2 Hopf Map Stereographic Fiber Projection
function createHopfFiberBundle(fibers = 60, pointsPerFiber = 80) {
  const linePoints = [];
  for (let f = 0; f < fibers; f++) {
    const eta = (f / fibers) * Math.PI * 2;
    for (let p = 0; p <= pointsPerFiber; p++) {
      const xi = (p / pointsPerFiber) * Math.PI * 2;
      // 4D unit coordinates (q1, q2, q3, q4)
      const q1 = Math.cos(xi) * Math.sin(eta);
      const q2 = Math.sin(xi) * Math.sin(eta);
      const q3 = Math.cos(xi) * Math.cos(eta);
      const q4 = Math.sin(xi) * Math.cos(eta);
      // Stereographic projection: R^3 = (q1, q2, q3) / (1 - q4)
      const denom = Math.max(0.2, 1.0 - q4 * 0.7);
      linePoints.push(q1 / denom * 4.5, q2 / denom * 4.5, q3 / denom * 4.5);
    }
  }
  return linePoints;
}""",
        "defaultParams": {
            "ringCount": 24,
            "majorRadius": 4.5,
            "minorRadius": 2.2,
            "primaryColor": [0.15, 0.95, 1.0],
            "secondaryColor": [0.95, 0.25, 0.8]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const rings = [];
      const count = params.ringCount;
      for (let i = 0; i < count; i++) {
        const u = i / count;
        const geo = new THREE.TorusGeometry(params.majorRadius, params.minorRadius * 0.2, 16, 80);
        const col = new THREE.Color();
        col.setHSL(u, 0.9, 0.6);
        const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.75 });
        const ring = new THREE.Mesh(geo, mat);
        ring.rotation.x = u * Math.PI * 2;
        ring.rotation.y = u * Math.PI;
        group.add(ring);
        rings.push(ring);
      }

      scene.userData = { group, rings, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      data.group.rotation.z = Math.sin(t * 0.3) * 0.3;

      data.rings.forEach((ring, idx) => {
        ring.rotation.z = t * (0.5 + idx * 0.05);
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "calabi_yau_manifold",
        "title": "Calabi-Yau 6D Manifold",
        "fileName": "calabi_yau.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 6-Dimensional Calabi-Yau compactified string theory manifold projected into 3D! Superstring extra dimensions in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #calabiyau #stringtheory #higherdimensions #mathart #creativecoding #javascript #reels",
        "displayCode": """// 2D Complex Slice of 6D Calabi-Yau Cross-Section
function calculateCalabiYau(u, v, n = 5) {
  // Complex coordinate parameterization: z1^n + z2^n = 1
  const r = Math.pow(Math.abs(Math.cos(u * n / 2)), 2 / n);
  const x = r * Math.cos(u) * Math.cos(v);
  const y = r * Math.sin(u) * Math.cos(v);
  const z = r * Math.sin(v) + Math.cos(u * 2) * 0.5;
  return new THREE.Vector3(x * 5.2, y * 5.2, z * 5.2);
}""",
        "defaultParams": {
            "gridResolution": 50,
            "primaryColor": [0.65, 0.2, 0.95],
            "secondaryColor": [0.2, 0.85, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.gridResolution;
      const geo = new THREE.PlaneGeometry(10, 10, res, res);
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const u = (pos.getX(i) / 5) * Math.PI;
        const v = (pos.getY(i) / 5) * Math.PI;
        const r = Math.pow(Math.abs(Math.cos(u * 2.5)), 0.4);
        pos.setXYZ(i, r * Math.cos(u) * 4.5, r * Math.sin(u) * 4.5, Math.sin(v * 2) * 2.2);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Outer astral rings
      for (let r = 0; r < 3; r++) {
        const rg = new THREE.TorusGeometry(6.5 + r * 0.8, 0.04, 16, 80);
        const rm = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, opacity: 0.5 });
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = r * 0.8;
        group.add(ring);
      }

      scene.userData = { group, mesh, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      const scale = 1.0 + Math.sin(t * 3.0) * 0.12;
      data.mesh.scale.set(scale, scale, scale);

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = Math.sin(t * 0.3) * 5;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "klein_bottle_4d",
        "title": "4D Klein Bottle Topology",
        "fileName": "klein_bottle.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 Non-orientable 4D surface with zero inside and outside! Figure-8 Klein bottle immersion rendered in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #kleinbottle #topology #mathart #geometry #creativecoding #javascript #reels",
        "displayCode": """// Figure-8 Klein Bottle Parametric Immersion
function kleinBottleFigure8(u, v, r = 2.4) {
  const cosU = Math.cos(u), sinU = Math.sin(u);
  const cosV = Math.cos(v), sinV = Math.sin(v);
  const x = (r + cosU/2 * sinV - sinU/2 * Math.sin(2*v)) * cosU;
  const y = (r + cosU/2 * sinV - sinU/2 * Math.sin(2*v)) * sinU;
  const z = sinU/2 * sinV + cosU/2 * Math.sin(2*v);
  return new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2);
}""",
        "defaultParams": {
            "resU": 48,
            "resV": 48,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [1.0, 0.3, 0.6]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const uSteps = params.resU, vSteps = params.resV;
      const geo = new THREE.BufferGeometry();
      const pos = [];

      for (let i = 0; i < uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j < vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          const cosU = Math.cos(u), sinU = Math.sin(u);
          const cosV = Math.cos(v), sinV = Math.sin(v);
          const x = (2.2 + (cosU / 2) * sinV - (sinU / 2) * Math.sin(2 * v)) * cosU;
          const y = (2.2 + (cosU / 2) * sinV - (sinU / 2) * Math.sin(2 * v)) * sinU;
          const z = (sinU / 2) * sinV + (cosU / 2) * Math.sin(2 * v);
          pos.push(x * 2.2, y * 2.2, z * 2.8);
        }
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.16, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.7;
      data.group.rotation.y = t * 0.9;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = Math.sin(t * 0.35) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "metatron_cube_3d",
        "title": "Metatron's Sacred Cube 3D",
        "fileName": "metatron_cube.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "✨ Metatron's Sacred Cube containing all 5 Platonic Solids! 13 geometric energy nodes interconnected in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🔮📐\n\n#threejs #webgl #metatron #sacredgeometry #platonic #mathart #creativecoding #javascript #reels",
        "displayCode": """// Fruit of Life 13 Sacred Energy Centers
function createMetatronNodes(radius = 4.8) {
  const nodes = [new THREE.Vector3(0, 0, 0)]; // Center node
  // Inner ring: 6 vertices of regular hexagon
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    nodes.push(new THREE.Vector3(Math.cos(a) * radius * 0.5, Math.sin(a) * radius * 0.5, 0));
  }
  // Outer ring: 6 outer nodes
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    nodes.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  return nodes;
}""",
        "defaultParams": {
            "scaleRadius": 4.8,
            "primaryColor": [0.95, 0.8, 0.2],
            "secondaryColor": [0.85, 0.2, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const nodes = [new THREE.Vector3(0, 0, 0)];
      const rad = params.scaleRadius;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        nodes.push(new THREE.Vector3(Math.cos(a) * rad * 0.5, Math.sin(a) * rad * 0.5, (i%2===0?1:-1)*1.2));
      }
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        nodes.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, (i%2===0?-1:1)*1.2));
      }

      // Connect every node to all other nodes (Metatron interconnects)
      const linePos = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          linePos.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePos.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending
      });
      const lines = new THREE.LineSegments(lGeo, lMat);
      group.add(lines);

      // Node Spheres
      nodes.forEach(n => {
        const sGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const sMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const sphere = new THREE.Mesh(sGeo, sMat);
        sphere.position.copy(n);
        group.add(sphere);
      });

      scene.userData = { group, lines, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.6;
      data.group.rotation.y = t * 0.8;
      data.group.rotation.z = Math.sin(t * 0.4) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "polychoron_120_cell",
        "title": "120-Cell 4D Polychoron",
        "fileName": "polychoron_120.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 120-Cell regular 4-dimensional polychoron projected stereographically into 3D! 600 vertices rotating in 4D space in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #4d #polychoron #hypercube #sacredgeometry #mathart #javascript #reels",
        "displayCode": """// 4D Rotation in XW and YZ Planes
function rotate4DVector(v, thetaXW, thetaYZ) {
  const [x, y, z, w] = v;
  // Rotation in XW plane
  const xPrime = x * Math.cos(thetaXW) - w * Math.sin(thetaXW);
  const wPrime = x * Math.sin(thetaXW) + w * Math.cos(thetaXW);
  // Rotation in YZ plane
  const yPrime = y * Math.cos(thetaYZ) - z * Math.sin(thetaYZ);
  const zPrime = y * Math.sin(thetaYZ) + z * Math.cos(thetaYZ);
  // Stereographic 4D->3D
  const scale = 3.5 / (2.6 - wPrime);
  return new THREE.Vector3(xPrime * scale, yPrime * scale, zPrime * scale);
}""",
        "defaultParams": {
            "vertexCount": 360,
            "primaryColor": [0.2, 0.95, 0.95],
            "secondaryColor": [0.95, 0.25, 0.75]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Generate 4D vertices on S^3
      const count = params.vertexCount;
      const v4 = [];
      for (let i = 0; i < count; i++) {
        const u = Math.random(), v = Math.random(), w = Math.random();
        const th1 = u * Math.PI * 2, th2 = v * Math.PI * 2;
        const r1 = Math.sqrt(1 - w), r2 = Math.sqrt(w);
        v4.push([r1 * Math.cos(th1), r1 * Math.sin(th1), r2 * Math.cos(th2), r2 * Math.sin(th2)]);
      }

      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(count * 3);
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.22, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(pGeo, pMat);
      group.add(points);

      scene.userData = { group, points, v4, count, params };""",
        "renderBody": """      const pos = data.points.geometry.attributes.position;
      const v4 = data.v4;
      const tXW = t * 0.9;
      const tYZ = t * 0.7;

      for (let i = 0; i < data.count; i++) {
        const [x, y, z, w] = v4[i];
        const xP = x * Math.cos(tXW) - w * Math.sin(tXW);
        const wP = x * Math.sin(tXW) + w * Math.cos(tXW);
        const yP = y * Math.cos(tYZ) - z * Math.sin(tYZ);
        const zP = y * Math.sin(tYZ) + z * Math.cos(tYZ);

        const denom = Math.max(0.4, 2.2 - wP);
        const sc = 4.5 / denom;
        pos.setXYZ(i, xP * sc, yP * sc, zP * sc);
      }
      pos.needsUpdate = true;

      data.group.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "sri_yantra_harmonic_pyramid",
        "title": "Sri Yantra 3D Sacred Pyramid",
        "fileName": "sri_yantra.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 Sacred Sri Yantra 9 interlocking divine triangles extruded into 3D pyramid! Vedic fractal acoustic resonance in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! 🕉️✨\n\n#threejs #webgl #sriyantra #sacredgeometry #pyramid #mathart #creativecoding #javascript #reels",
        "displayCode": """// Interlocking Nine Sacred Triangles (Maha Meru 3D)
function buildSriYantraLayers(levels = 9, baseRadius = 6.0) {
  const layerGroup = new THREE.Group();
  for (let l = 0; l < levels; l++) {
    const y = l * 0.85;
    const r = baseRadius * (1.0 - l / levels);
    const triGeo = new THREE.ConeGeometry(r, 0.08, 3, 1, true);
    triGeo.rotateZ(l % 2 === 0 ? 0 : Math.PI); // Inverted triangles
    const mesh = new THREE.Mesh(triGeo, goldMat);
    mesh.position.y = y;
    layerGroup.add(mesh);
  }
  return layerGroup;
}""",
        "defaultParams": {
            "triangleLevels": 9,
            "lotusPetals": 16,
            "primaryColor": [1.0, 0.85, 0.25],
            "secondaryColor": [0.95, 0.2, 0.5]
        },
        "initBody": """      camera.position.set(0, 4, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // 9 Levels of interlocking triangles
      for (let l = 0; l < params.triangleLevels; l++) {
        const y = (l - 4.5) * 0.8;
        const r = 5.5 * (1.0 - l / 10.0);
        const geo = new THREE.ConeGeometry(r, 0.1, 3, 1, true);
        geo.rotateZ(l % 2 === 0 ? 0 : Math.PI);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
          wireframe: true, transparent: true, opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = y;
        group.add(mesh);
      }

      // Outer lotus petal rings
      const ringGeo = new THREE.TorusGeometry(6.5, 0.1, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.y = t * 0.8;
      data.group.rotation.z = Math.sin(t * 0.5) * 0.2;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.position.y = 4 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "clifford_torus_hypersphere",
        "title": "Clifford Torus in 4D Hyperspace",
        "fileName": "clifford_torus.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Flat Clifford Torus embedded in 4-dimensional Euclidean space S^3! Isometric projection with harmonic rotations in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #cliffordtorus #4d #topology #mathart #creativecoding #javascript #reels",
        "displayCode": """// Clifford Flat Torus: (cos u, sin u, cos v, sin v) / sqrt(2)
function projectCliffordTorus(u, v, angle4D = 0) {
  const invSqrt2 = 1.0 / Math.SQRT2;
  const x = Math.cos(u) * invSqrt2;
  const y = Math.sin(u) * invSqrt2;
  const z = Math.cos(v) * invSqrt2;
  const w = Math.sin(v) * invSqrt2;
  // 4D Rotation in XW
  const xP = x * Math.cos(angle4D) - w * Math.sin(angle4D);
  const wP = x * Math.sin(angle4D) + w * Math.cos(angle4D);
  const scale = 5.5 / (2.0 - wP);
  return new THREE.Vector3(xP * scale, y * scale, z * scale);
}""",
        "defaultParams": {
            "rings": 32,
            "pointsPerRing": 32,
            "primaryColor": [0.3, 0.9, 1.0],
            "secondaryColor": [0.95, 0.3, 0.85]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.rings * params.pointsPerRing;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.18, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      const pos = data.points.geometry.attributes.position;
      const rings = data.params.rings;
      const pts = data.params.pointsPerRing;
      const rot4D = t * 0.8;
      let idx = 0;

      for (let r = 0; r < rings; r++) {
        const u = (r / rings) * Math.PI * 2;
        for (let p = 0; p < pts; p++) {
          const v = (p / pts) * Math.PI * 2;
          const x = Math.cos(u) * 0.7071;
          const y = Math.sin(u) * 0.7071;
          const z = Math.cos(v) * 0.7071;
          const w = Math.sin(v) * 0.7071;

          const xP = x * Math.cos(rot4D) - w * Math.sin(rot4D);
          const wP = x * Math.sin(rot4D) + w * Math.cos(rot4D);
          const sc = 5.2 / Math.max(0.3, 2.0 - wP);

          pos.setXYZ(idx++, xP * sc, y * sc, z * sc);
        }
      }
      pos.needsUpdate = true;

      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;
      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "enneper_minimal_surface",
        "title": "Enneper Minimal Surface",
        "fileName": "enneper_surface.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 Complex analytic Enneper minimal surface with self-intersecting orthogonal curves! Zero mean curvature in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #minimalsurface #mathart #differentialgeometry #creativecoding #javascript #reels",
        "displayCode": """// Enneper Minimal Surface Parameterization
function enneperPoint(u, v) {
  const x = u - (u*u*u)/3 + u*v*v;
  const y = v - (v*v*v)/3 + v*u*u;
  const z = u*u - v*v;
  return new THREE.Vector3(x * 1.8, y * 1.8, z * 1.8);
}""",
        "defaultParams": {
            "uRange": 1.6,
            "res": 40,
            "primaryColor": [0.95, 0.35, 0.7],
            "secondaryColor": [0.2, 0.8, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const res = params.res;
      const count = res * res;
      const pos = new Float32Array(count * 3);
      const uR = params.uRange;

      let idx = 0;
      for (let i = 0; i < res; i++) {
        const u = -uR + (i / res) * (uR * 2);
        for (let j = 0; j < res; j++) {
          const v = -uR + (j / res) * (uR * 2);
          const x = u - (u*u*u)/3 + u*v*v;
          const y = v - (v*v*v)/3 + v*u*u;
          const z = u*u - v*v;
          pos[idx * 3 + 0] = x * 2.2;
          pos[idx * 3 + 1] = y * 2.2;
          pos[idx * 3 + 2] = z * 2.2;
          idx++;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.18, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.7;
      data.group.rotation.y = t * 0.9;
      data.group.rotation.z = Math.sin(t * 0.5) * 0.4;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "golden_ratio_phyllotaxis",
        "title": "Golden Ratio Phyllotaxis Vortex",
        "fileName": "golden_phyllotaxis.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌻 Fibonacci golden angle (137.507°) Vogel spiral stardust vortex in 3D! Divine botanical mathematics in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #fibonacci #goldenratio #phyllotaxis #sacredgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": """// Vogel's Golden Angle Phyllotaxis Algorithm
function generateGoldenSpiral(particleCount = 5000, c = 0.16) {
  const phiAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
  const pos = new Float32Array(particleCount * 3);

  for (let n = 0; n < particleCount; n++) {
    const r = c * Math.sqrt(n);
    const theta = n * phiAngle;
    const z = Math.sin(n * 0.05) * (r * 0.35);
    pos[n * 3 + 0] = Math.cos(theta) * r;
    pos[n * 3 + 1] = Math.sin(theta) * r;
    pos[n * 3 + 2] = z;
  }
  return pos;
}""",
        "defaultParams": {
            "particleCount": 8500,
            "cScale": 0.14,
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.95, 0.3, 0.7]
        },
        "initBody": """      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let n = 0; n < count; n++) {
        const r = params.cScale * Math.sqrt(n);
        const th = n * phi;
        pos[n * 3 + 0] = Math.cos(th) * r;
        pos[n * 3 + 1] = Math.sin(th) * r;
        pos[n * 3 + 2] = (Math.random() - 0.5) * 1.5;

        const u = n / count;
        col[n * 3 + 0] = params.primaryColor[0] * (1 - u) + params.secondaryColor[0] * u;
        col[n * 3 + 1] = params.primaryColor[1] * (1 - u) + params.secondaryColor[1] * u;
        col[n * 3 + 2] = params.primaryColor[2] * (1 - u) + params.secondaryColor[2] * u;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, points, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.5;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.45;
      data.group.rotation.y = Math.cos(t * 0.3) * 0.45;

      camera.position.x = Math.sin(t * 0.2) * 18;
      camera.position.z = Math.cos(t * 0.2) * 18;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "mobius_strip_resonator",
        "title": "Möbius Strip Wave Resonator",
        "fileName": "mobius_strip.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 One-sided non-orientable Möbius strip with traveling harmonic standing waves in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #mobiusstrip #topology #mathart #geometry #creativecoding #javascript #reels",
        "displayCode": """// Möbius Band Harmonic Standing Waves
function mobiusStripPoint(u, v, radius = 5.0, time = 0) {
  // u in [0, 2*PI], v in [-1, 1]
  const wave = Math.sin(u * 6.0 - time * 4.0) * 0.35;
  const x = (radius + (v + wave) * Math.cos(u / 2)) * Math.cos(u);
  const y = (radius + (v + wave) * Math.cos(u / 2)) * Math.sin(u);
  const z = (v + wave) * Math.sin(u / 2);
  return new THREE.Vector3(x, y, z);
}""",
        "defaultParams": {
            "radius": 5.2,
            "stripWidth": 2.0,
            "primaryColor": [0.2, 0.9, 1.0],
            "secondaryColor": [0.95, 0.35, 0.85]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const uSteps = 120, vSteps = 16;
      const count = uSteps * vSteps;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.16, color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Points(geo, mat);
      group.add(mesh);

      scene.userData = { group, mesh, uSteps, vSteps, params };""",
        "renderBody": """      const pos = data.mesh.geometry.attributes.position;
      const uSteps = data.uSteps, vSteps = data.vSteps;
      const rad = data.params.radius;
      let idx = 0;

      for (let i = 0; i < uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j < vSteps; j++) {
          const v = -1.0 + (j / vSteps) * 2.0;
          const wave = Math.sin(u * 5.0 - t * 3.5) * 0.35;
          const rEff = v + wave;
          const x = (rad + rEff * Math.cos(u / 2)) * Math.cos(u);
          const y = (rad + rEff * Math.cos(u / 2)) * Math.sin(u);
          const z = rEff * Math.sin(u / 2);
          pos.setXYZ(idx++, x, y, z);
        }
      }
      pos.needsUpdate = true;

      data.group.rotation.x = t * 0.5;
      data.group.rotation.y = t * 0.7;

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "platonic_solid_fractal_nested",
        "title": "Nested Platonic Solids Orbit",
        "fileName": "nested_platonic.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🔮 Concentric nested Platonic Solids (Icosahedron, Dodecahedron, Octahedron, Cube) rotating on Keplerian golden axes! Sacred geometry in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #platonicsolids #sacredgeometry #kepler #mathart #creativecoding #javascript #reels",
        "displayCode": """// Kepler's Mysterium Cosmographicum Nested Polyhedra
function buildNestedPlatonicSolids() {
  const solids = new THREE.Group();
  const geos = [
    new THREE.IcosahedronGeometry(6.0, 1),
    new THREE.DodecahedronGeometry(4.5, 0),
    new THREE.OctahedronGeometry(3.2, 0),
    new THREE.BoxGeometry(2.0, 2.0, 2.0),
    new THREE.TetrahedronGeometry(1.2, 0)
  ];
  geos.forEach((geo, idx) => {
    const mesh = new THREE.Mesh(geo, wireMaterials[idx]);
    solids.add(mesh);
  });
  return solids;
}""",
        "defaultParams": {
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.2, 0.85, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const meshes = [];
      const geos = [
        new THREE.IcosahedronGeometry(6.2, 1),
        new THREE.DodecahedronGeometry(4.6, 0),
        new THREE.OctahedronGeometry(3.2, 0),
        new THREE.BoxGeometry(2.2, 2.2, 2.2),
        new THREE.TetrahedronGeometry(1.3, 0)
      ];

      const colors = [0x38bdf8, 0xa855f7, 0xf59e0b, 0x10b981, 0xef4444];

      geos.forEach((g, idx) => {
        const mat = new THREE.MeshBasicMaterial({
          color: colors[idx], wireframe: true, transparent: true, opacity: 0.8
        });
        const m = new THREE.Mesh(g, mat);
        group.add(m);
        meshes.push(m);
      });

      scene.userData = { group, meshes, params };""",
        "renderBody": """      data.meshes.forEach((m, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        m.rotation.x = t * (0.6 + idx * 0.15) * dir;
        m.rotation.y = t * (0.8 + idx * 0.2) * dir;
        m.rotation.z = Math.sin(t * 0.5) * 0.3;
      });

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.position.y = Math.sin(t * 0.3) * 4;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "hyperbolic_poincare_dodecahedron",
        "title": "Hyperbolic Poincaré Tessellation",
        "fileName": "hyperbolic_poincare.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Non-Euclidean Hyperbolic geometry: Poincaré dodecahedral space tessellation in Three.js WebGL! Curvature of spacetime in 3D! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #hyperbolic #poincare #noneuclidean #geometry #mathart #creativecoding #javascript #reels",
        "displayCode": """// Poincaré Ball Model Geodesic Curvature
function poincareInversion(p, radius = 5.5) {
  const normSq = p.x*p.x + p.y*p.y + p.z*p.z;
  const factor = (radius * radius) / Math.max(0.1, normSq);
  return new THREE.Vector3(p.x * factor, p.y * factor, p.z * factor);
}""",
        "defaultParams": {
            "particleCount": 7500,
            "ballRadius": 5.5,
            "primaryColor": [0.3, 0.95, 0.7],
            "secondaryColor": [0.65, 0.2, 0.95]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      // Outer boundary sphere
      const bGeo = new THREE.SphereGeometry(params.ballRadius, 32, 32);
      const bMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35 });
      const boundary = new THREE.Mesh(bGeo, bMat);
      group.add(boundary);

      // Hyperbolic geodesics (particles)
      const count = params.particleCount;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const u = Math.pow(Math.random(), 2.0) * (params.ballRadius * 0.95);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);

        pos[i * 3 + 0] = Math.sin(ph) * Math.cos(th) * u;
        pos[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * u;
        pos[i * 3 + 2] = Math.cos(ph) * u;

        const density = u / params.ballRadius;
        col[i * 3 + 0] = params.primaryColor[0] * (1 - density) + params.secondaryColor[0] * density;
        col[i * 3 + 1] = params.primaryColor[1] * (1 - density) + params.secondaryColor[1] * density;
        col[i * 3 + 2] = params.primaryColor[2] * (1 - density) + params.secondaryColor[2] * density;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      group.add(points);

      scene.userData = { group, boundary, points, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.4;
      data.group.rotation.y = t * 0.6;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "trefoil_knot_harmonic_tube",
        "title": "Trefoil Knot Harmonic Topology",
        "fileName": "trefoil_knot.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "🌀 Endless (2,3) Torus Trefoil Knot with pulsating harmonic standing wave caustic ribbons in Three.js WebGL! Follow @kreggsjs for daily 3D code reels! ⚡📐\n\n#threejs #webgl #trefoilknot #knottheory #topology #mathart #creativecoding #javascript #reels",
        "displayCode": """// (2,3) Torus Trefoil Mathematical Curve
function trefoilCurve(t, scale = 2.4) {
  const x = Math.sin(t) + 2 * Math.sin(2 * t);
  const y = Math.cos(t) - 2 * Math.cos(2 * t);
  const z = -Math.sin(3 * t);
  return new THREE.Vector3(x * scale, y * scale, z * scale);
}""",
        "defaultParams": {
            "tubeRadius": 0.5,
            "tubularSegments": 160,
            "primaryColor": [0.95, 0.25, 0.65],
            "secondaryColor": [0.15, 0.95, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const knotGeo = new THREE.TorusKnotGeometry(4.5, params.tubeRadius, params.tubularSegments, 32, 2, 3);
      const knotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]),
        wireframe: true, transparent: true, opacity: 0.85
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);

      // Surrounding particle halo
      const count = 4000;
      const pPos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2 * 3;
        const x = Math.sin(u) + 2 * Math.sin(2 * u);
        const y = Math.cos(u) - 2 * Math.cos(2 * u);
        const z = -Math.sin(3 * u);
        pPos[i * 3 + 0] = x * 2.4 + (Math.random() - 0.5) * 0.8;
        pPos[i * 3 + 1] = y * 2.4 + (Math.random() - 0.5) * 0.8;
        pPos[i * 3 + 2] = z * 2.4 + (Math.random() - 0.5) * 0.8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.14, color: 0x38bdf8, blending: THREE.AdditiveBlending });
      const halo = new THREE.Points(pGeo, pMat);
      group.add(halo);

      scene.userData = { group, knotMesh, halo, params };""",
        "renderBody": """      data.group.rotation.x = t * 0.8;
      data.group.rotation.y = t * 1.1;
      data.group.rotation.z = Math.sin(t * 0.5) * 0.4;

      const scale = 1.0 + Math.sin(t * 3.5) * 0.12;
      data.knotMesh.scale.set(scale, scale, scale);

      camera.position.x = Math.sin(t * 0.25) * 16;
      camera.position.z = Math.cos(t * 0.25) * 16;
      camera.lookAt(0, 0, 0);"""
    },
    {
        "id": "penrose_tiling_3d_rhombus",
        "title": "Aperiodic Penrose 3D Quasicrystal",
        "fileName": "penrose_tiling.js",
        "category": "Higher Dimensions & Sacred Geometry",
        "genre": "sacred",
        "caption": "📐 Aperiodic 5-fold quasicrystal Penrose rhombuses extruded into 3D space in Three.js WebGL! Non-repeating divine symmetry! Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #penrosetiling #quasicrystal #sacredgeometry #mathart #creativecoding #javascript #reels",
        "displayCode": """// Aperiodic Penrose 5-Fold Rhombus Projection
function generatePenroseTiles(levels = 4, radius = 5.2) {
  const vertices = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    vertices.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  return vertices;
}""",
        "defaultParams": {
            "rings": 5,
            "primaryColor": [1.0, 0.85, 0.2],
            "secondaryColor": [0.2, 0.9, 1.0]
        },
        "initBody": """      camera.position.set(0, 0, 16);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      for (let r = 0; r < 5; r++) {
        const rad = 2.0 + r * 1.4;
        const geo = new THREE.RingGeometry(rad, rad + 0.2, 5);
        const mat = new THREE.MeshBasicMaterial({ color: r % 2 === 0 ? 0xf59e0b : 0x38bdf8, wireframe: true });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.z = r * 0.35;
        group.add(mesh);
      }

      scene.userData = { group, params };""",
        "renderBody": """      data.group.rotation.z = t * 0.5;
      data.group.rotation.x = Math.sin(t * 0.3) * 0.3;

      camera.position.x = Math.sin(t * 0.2) * 16;
      camera.position.z = Math.cos(t * 0.2) * 16;
      camera.lookAt(0, 0, 0);"""
    }
]
