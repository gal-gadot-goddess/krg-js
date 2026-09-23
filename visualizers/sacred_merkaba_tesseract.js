// visualizers/sacred_merkaba_tesseract.js
// 4D Hypercube (Tesseract) & Sacred Merkaba Kinetic Gyroscope

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.sacred_merkaba_tesseract = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  // 16 Vertices of a 4D Hypercube
  const TESSERACT_VERTICES_4D = [];
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        for (let w = -1; w <= 1; w += 2) {
          TESSERACT_VERTICES_4D.push([x, y, z, w]);
        }
      }
    }
  }

  // 32 Edges connecting vertices differing in exactly one coordinate
  const TESSERACT_EDGES = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let diff = 0;
      for (let k = 0; k < 4; k++) {
        if (TESSERACT_VERTICES_4D[i][k] !== TESSERACT_VERTICES_4D[j][k]) diff++;
      }
      if (diff === 1) {
        TESSERACT_EDGES.push([i, j]);
      }
    }
  }

  return {
    id: "sacred_merkaba_tesseract",
    title: "4D Tesseract & Sacred Merkaba",
    fileName: "tesseract_4d.js",
    category: "Higher Dimensions & Sacred Geometry",
    genre: "sacred",
    caption: "🔮 4D Hypercube (Tesseract) projected into 3D space with concentric Merkaba gimbal rings! Watch 4D coordinate rotation in real-time. Follow for daily geometric code! ⚡📐\n\n#threejs #webgl #tesseract #sacredgeometry #mathart #javascript #creativecoding #geometry #reels",
    
    displayCode: `// 4D Tesseract Stereographic Projection
function project4Dto3D(v4, angleXW, angleYZ) {
  // 4D Rotation in XW and YZ planes
  const cosA = Math.cos(angleXW), sinA = Math.sin(angleXW);
  const cosB = Math.cos(angleYZ), sinB = Math.sin(angleYZ);

  let [x, y, z, w] = v4;
  // Rotate in XW
  const x1 = x * cosA - w * sinA;
  const w1 = x * sinA + w * cosA;
  // Rotate in YZ
  const y1 = y * cosB - z * sinB;
  const z1 = y * sinB + z * cosB;

  // Perspective 4D -> 3D projection
  const distance4D = 2.4;
  const scale = 1.0 / (distance4D - w1);
  return new THREE.Vector3(x1 * scale * 3.8, y1 * scale * 3.8, z1 * scale * 3.8);
}`,

    defaultParams: {
      speedXW: 0.9,
      speedYZ: 0.6,
      ringCount: 3,
      particleStars: 5000,
      primaryColor: [0.95, 0.75, 0.25], // Radiant Solar Gold
      secondaryColor: [0.4, 0.2, 0.95]  // Mystic Ultraviolet
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
      camera.position.set(0, 3, 14);

      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 1. Tesseract Line Segments (32 Edges)
      const edgePos = new Float32Array(TESSERACT_EDGES.length * 2 * 3);
      const edgeCol = new Float32Array(TESSERACT_EDGES.length * 2 * 3);
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
      edgeGeo.setAttribute('color', new THREE.BufferAttribute(edgeCol, 3));

      const edgeMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 2.5,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const tesseractLines = new THREE.LineSegments(edgeGeo, edgeMat);
      mainGroup.add(tesseractLines);

      // 2. Tesseract 16 Vertex Spheres (Points)
      const vertPos = new Float32Array(16 * 3);
      const vertCol = new Float32Array(16 * 3);
      const vertGeo = new THREE.BufferGeometry();
      vertGeo.setAttribute('position', new THREE.BufferAttribute(vertPos, 3));
      vertGeo.setAttribute('color', new THREE.BufferAttribute(vertCol, 3));

      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const c = canvas.getContext('2d');
      const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 220, 80, 0.95)');
      grad.addColorStop(0.7, 'rgba(160, 40, 240, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = grad;
      c.fillRect(0, 0, 64, 64);
      const glowTex = new THREE.CanvasTexture(canvas);

      const vertMat = new THREE.PointsMaterial({
        size: 0.65,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        map: glowTex,
        depthWrite: false
      });
      const tesseractPoints = new THREE.Points(vertGeo, vertMat);
      mainGroup.add(tesseractPoints);

      // 3. Concentric Astral Merkaba Gimbal Rings
      const rings = [];
      const ringRadii = [5.6, 6.4, 7.2];
      for (let r = 0; r < ringRadii.length; r++) {
        const ringGeo = new THREE.TorusGeometry(ringRadii[r], 0.05, 16, 90);
        const ringMat = new THREE.MeshBasicMaterial({
          color: r === 0 ? 0xfbbf24 : (r === 1 ? 0xc084fc : 0x38bdf8),
          wireframe: true,
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = (r * Math.PI) / 3;
        ringMesh.rotation.y = (r * Math.PI) / 4;
        mainGroup.add(ringMesh);
        rings.push(ringMesh);
      }

      // 4. Sacred Star Tetrahedron (Merkaba Core)
      const tetraGeo = new THREE.OctahedronGeometry(2.2, 0);
      const tetraMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const tetraMesh = new THREE.Mesh(tetraGeo, tetraMat);
      mainGroup.add(tetraMesh);

      // 5. Surrounding Sacred Star Dust Particles (5,000)
      const starCount = params.particleStars;
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(starCount * 3);
      const starCol = new Float32Array(starCount * 3);

      for (let s = 0; s < starCount; s++) {
        const u = s / starCount;
        const sR = 7.5 + Math.random() * 8.0;
        const sTheta = s * 0.15;
        const sPhi = Math.acos(2 * Math.random() - 1);

        starPos[s * 3 + 0] = sR * Math.sin(sPhi) * Math.cos(sTheta);
        starPos[s * 3 + 1] = sR * Math.sin(sPhi) * Math.sin(sTheta);
        starPos[s * 3 + 2] = sR * Math.cos(sPhi);

        starCol[s * 3 + 0] = 0.8 + 0.2 * Math.sin(s * 0.2);
        starCol[s * 3 + 1] = 0.6 + 0.3 * Math.cos(s * 0.3);
        starCol[s * 3 + 2] = 0.95;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
      const starMat = new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });
      const starPoints = new THREE.Points(starGeo, starMat);
      mainGroup.add(starPoints);

      scene.userData = {
        mainGroup,
        tesseractLines,
        tesseractPoints,
        tetraMesh,
        rings,
        starPoints,
        params
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      const angleXW = t * (params?.speedXW || 0.9);
      const angleYZ = t * (params?.speedYZ || 0.6);

      const cosA = Math.cos(angleXW), sinA = Math.sin(angleXW);
      const cosB = Math.cos(angleYZ), sinB = Math.sin(angleYZ);
      const dist4D = 2.4;

      // Project 16 4D vertices to 3D
      const projected3D = [];
      const vAttr = data.tesseractPoints.geometry.attributes.position;
      const vArr = vAttr.array;
      const vcAttr = data.tesseractPoints.geometry.attributes.color;
      const vcArr = vcAttr.array;

      for (let i = 0; i < 16; i++) {
        const [x, y, z, w] = TESSERACT_VERTICES_4D[i];
        const x1 = x * cosA - w * sinA;
        const w1 = x * sinA + w * cosA;
        const y1 = y * cosB - z * sinB;
        const z1 = y * sinB + z * cosB;

        const scale = 1.0 / (dist4D - w1);
        const pX = x1 * scale * 3.6;
        const pY = y1 * scale * 3.6;
        const pZ = z1 * scale * 3.6;
        projected3D.push({ x: pX, y: pY, z: pZ, w: w1 });

        vArr[i * 3 + 0] = pX;
        vArr[i * 3 + 1] = pY;
        vArr[i * 3 + 2] = pZ;

        // Color modulation based on 4th dimension coordinate W
        const wNorm = 0.5 + 0.5 * (w1 / 1.4);
        vcArr[i * 3 + 0] = 0.95 * wNorm + 0.3 * (1 - wNorm);
        vcArr[i * 3 + 1] = 0.75 * wNorm + 0.2 * (1 - wNorm);
        vcArr[i * 3 + 2] = 0.25 * wNorm + 0.95 * (1 - wNorm);
      }
      vAttr.needsUpdate = true;
      vcAttr.needsUpdate = true;

      // Update 32 edge lines
      const eAttr = data.tesseractLines.geometry.attributes.position;
      const eArr = eAttr.array;
      const ecAttr = data.tesseractLines.geometry.attributes.color;
      const ecArr = ecAttr.array;

      for (let e = 0; e < TESSERACT_EDGES.length; e++) {
        const [i, j] = TESSERACT_EDGES[e];
        const p1 = projected3D[i];
        const p2 = projected3D[j];

        const idx = e * 6;
        eArr[idx + 0] = p1.x; eArr[idx + 1] = p1.y; eArr[idx + 2] = p1.z;
        eArr[idx + 3] = p2.x; eArr[idx + 4] = p2.y; eArr[idx + 5] = p2.z;

        const wAvg = 0.5 + 0.5 * ((p1.w + p2.w) / 2.8);
        ecArr[idx + 0] = 0.95 * wAvg;
        ecArr[idx + 1] = 0.75 * wAvg;
        ecArr[idx + 2] = 0.3 + 0.7 * (1 - wAvg);
        ecArr[idx + 3] = ecArr[idx + 0];
        ecArr[idx + 4] = ecArr[idx + 1];
        ecArr[idx + 5] = ecArr[idx + 2];
      }
      eAttr.needsUpdate = true;
      ecAttr.needsUpdate = true;

      // Animate gimbal rings
      data.rings.forEach((ring, idx) => {
        ring.rotation.x += (idx + 1) * 0.015;
        ring.rotation.y += (idx + 1) * 0.02;
        ring.rotation.z += (idx + 1) * 0.01;
      });

      // Animate core octahedron
      data.tetraMesh.rotation.x = -t * 0.5;
      data.tetraMesh.rotation.y = t * 0.7;

      // Slow orbital camera
      const camRadius = 13.0 + Math.sin(t * 0.4) * 1.5;
      const camTheta = t * 0.3;
      camera.position.x = Math.sin(camTheta) * camRadius;
      camera.position.z = Math.cos(camTheta) * camRadius;
      camera.position.y = 2.5 + Math.sin(t * 0.5) * 2.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
