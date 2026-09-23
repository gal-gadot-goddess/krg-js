// visualizers/quantum_neural_matrix.js
// 3D Hyper-Dimensional Neural Network & Quantum Synaptic Matrix

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.quantum_neural_matrix = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "quantum_neural_matrix",
    title: "Quantum Neural Synapse Matrix",
    fileName: "neural_matrix.js",
    category: "AI & Neuro-Computation",
    genre: "cyber",
    caption: "🧠 Quantum Neural Synapse Matrix in Three.js WebGL! High-speed action potential impulses flashing across 3D synaptic pathways. Follow for daily algorithmic art! ⚡🤖\n\n#threejs #webgl #neuralnetwork #artificialintelligence #javascript #creativecoding #datascience #reels #aiart",
    
    displayCode: `// 3D Neural Action Potential Network
function simulateSynapses(nodes, connectivity = 0.3) {
  const linePositions = [];
  const lineColors = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j]);
      if (dist < 4.2 && Math.random() < connectivity) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);

        const intensity = 1.0 - dist / 4.2;
        lineColors.push(0.1, 0.85 * intensity, 1.0);
        lineColors.push(0.85 * intensity, 0.1, 1.0);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
  return new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
    vertexColors: true, blending: THREE.AdditiveBlending, transparent: true
  }));
}`,

    defaultParams: {
      nodeCount: 160,
      axonMaxDist: 4.8,
      pulseSpeed: 3.5,
      haloParticles: 7000,
      primaryColor: [0.15, 0.9, 1.0],   // Electric Cyan
      secondaryColor: [0.95, 0.2, 0.85] // Neon Magenta
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

      camera.fov = 55;
      camera.aspect = 984 / 784;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 15);

      const netGroup = new THREE.Group();
      scene.add(netGroup);

      // 1. Generate 3D Brain/Ellipsoid Node Positions
      const nodeCount = params.nodeCount;
      const nodeVectors = [];
      const nodeColors = [];
      const nodeSizes = [];

      for (let i = 0; i < nodeCount; i++) {
        // Dual-hemisphere brain structure
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const radX = 5.2 * (0.8 + Math.random() * 0.4);
        const radY = 4.2 * (0.8 + Math.random() * 0.4);
        const radZ = 4.6 * (0.8 + Math.random() * 0.4);

        const x = radX * Math.sin(phi) * Math.cos(theta);
        const y = radY * Math.sin(phi) * Math.sin(theta);
        const z = radZ * Math.cos(phi);

        nodeVectors.push(new THREE.Vector3(x, y, z));

        const isLeft = x < 0;
        const c1 = params.primaryColor;
        const c2 = params.secondaryColor;
        const mix = isLeft ? 0.85 : 0.15;
        nodeColors.push(
          c1[0] * mix + c2[0] * (1 - mix),
          c1[1] * mix + c2[1] * (1 - mix),
          c1[2] * mix + c2[2] * (1 - mix)
        );
        nodeSizes.push(0.25 + Math.random() * 0.35);
      }

      // 2. Synaptic Axon Connections (Line Segments)
      const edgeStart = [];
      const edgeEnd = [];
      const edgeIndices = [];
      const edgeColors = [];

      for (let i = 0; i < nodeCount; i++) {
        let connCount = 0;
        for (let j = i + 1; j < nodeCount; j++) {
          const d = nodeVectors[i].distanceTo(nodeVectors[j]);
          if (d < params.axonMaxDist && connCount < 5) {
            edgeStart.push(nodeVectors[i].x, nodeVectors[i].y, nodeVectors[i].z);
            edgeEnd.push(nodeVectors[j].x, nodeVectors[j].y, nodeVectors[j].z);
            edgeIndices.push({ i, j, dist: d });

            const alpha = 1.0 - d / params.axonMaxDist;
            edgeColors.push(0.2, 0.6 * alpha + 0.2, 0.9 * alpha, 0.85 * alpha, 0.2, 0.6 * alpha);
            connCount++;
          }
        }
      }

      const axonPositions = [];
      for (let e = 0; e < edgeStart.length / 3; e++) {
        axonPositions.push(
          edgeStart[e * 3 + 0], edgeStart[e * 3 + 1], edgeStart[e * 3 + 2],
          edgeEnd[e * 3 + 0], edgeEnd[e * 3 + 1], edgeEnd[e * 3 + 2]
        );
      }

      const axonGeo = new THREE.BufferGeometry();
      axonGeo.setAttribute('position', new THREE.Float32BufferAttribute(axonPositions, 3));
      axonGeo.setAttribute('color', new THREE.Float32BufferAttribute(edgeColors, 3));
      const axonMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const axonLines = new THREE.LineSegments(axonGeo, axonMat);
      netGroup.add(axonLines);

      // 3. Glowing Node Spheres (Points)
      const nodePosArr = new Float32Array(nodeCount * 3);
      for (let i = 0; i < nodeCount; i++) {
        nodePosArr[i * 3 + 0] = nodeVectors[i].x;
        nodePosArr[i * 3 + 1] = nodeVectors[i].y;
        nodePosArr[i * 3 + 2] = nodeVectors[i].z;
      }
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3));
      nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

      // Circular particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const c = canvas.getContext('2d');
      const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(100, 230, 255, 0.9)');
      grad.addColorStop(0.7, 'rgba(220, 50, 240, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = grad;
      c.fillRect(0, 0, 64, 64);
      const glowTex = new THREE.CanvasTexture(canvas);

      const nodeMat = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        map: glowTex,
        depthWrite: false
      });
      const nodePoints = new THREE.Points(nodeGeo, nodeMat);
      netGroup.add(nodePoints);

      // 4. Action Potential Pulses (Small fast traveling sparks along edges)
      const pulseCount = 180;
      const pulseGeo = new THREE.BufferGeometry();
      const pulsePos = new Float32Array(pulseCount * 3);
      const pulseCol = new Float32Array(pulseCount * 3);
      const pulseEdges = [];

      for (let p = 0; p < pulseCount; p++) {
        const edge = edgeIndices[p % edgeIndices.length];
        pulseEdges.push({
          edge,
          progress: Math.random(),
          speed: 0.4 + Math.random() * 0.8
        });
        pulseCol[p * 3 + 0] = 1.0;
        pulseCol[p * 3 + 1] = 1.0;
        pulseCol[p * 3 + 2] = 0.6; // Radiant spark
      }
      pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
      pulseGeo.setAttribute('color', new THREE.BufferAttribute(pulseCol, 3));

      const pulseMat = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        map: glowTex,
        depthWrite: false
      });
      const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
      netGroup.add(pulsePoints);

      // 5. Quantum Halo Particles Cloud (7,000 Particles)
      const haloCount = params.haloParticles;
      const haloGeo = new THREE.BufferGeometry();
      const haloPos = new Float32Array(haloCount * 3);
      const haloCol = new Float32Array(haloCount * 3);

      for (let h = 0; h < haloCount; h++) {
        const rad = 6.0 + Math.random() * 8.5;
        const hPhi = Math.acos(2 * Math.random() - 1);
        const hTheta = Math.random() * Math.PI * 2;
        haloPos[h * 3 + 0] = rad * Math.sin(hPhi) * Math.cos(hTheta);
        haloPos[h * 3 + 1] = rad * Math.sin(hPhi) * Math.sin(hTheta) * 0.8;
        haloPos[h * 3 + 2] = rad * Math.cos(hPhi);

        const fade = 0.25 + 0.75 * Math.random();
        haloCol[h * 3 + 0] = 0.2 * fade;
        haloCol[h * 3 + 1] = 0.75 * fade;
        haloCol[h * 3 + 2] = 1.0 * fade;
      }
      haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(haloCol, 3));
      const haloMat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });
      const haloPoints = new THREE.Points(haloGeo, haloMat);
      netGroup.add(haloPoints);

      scene.userData = {
        netGroup,
        nodeVectors,
        edgeIndices,
        pulseEdges,
        pulsePoints,
        haloPoints,
        params
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      // Rotate network
      data.netGroup.rotation.y = t * 0.45;
      data.netGroup.rotation.x = Math.sin(t * 0.3) * 0.25;

      // Animate action potential sparks along axons
      const pulseEdges = data.pulseEdges;
      const nodeVecs = data.nodeVectors;
      const pAttr = data.pulsePoints.geometry.attributes.position;
      const pArr = pAttr.array;

      for (let p = 0; p < pulseEdges.length; p++) {
        const item = pulseEdges[p];
        item.progress = (item.progress + (item.speed * 0.02)) % 1.0;
        const vA = nodeVecs[item.edge.i];
        const vB = nodeVecs[item.edge.j];

        pArr[p * 3 + 0] = vA.x + (vB.x - vA.x) * item.progress;
        pArr[p * 3 + 1] = vA.y + (vB.y - vA.y) * item.progress;
        pArr[p * 3 + 2] = vA.z + (vB.z - vA.z) * item.progress;
      }
      pAttr.needsUpdate = true;

      // Animate background halo cloud
      if (data.haloPoints) {
        data.haloPoints.rotation.y = -t * 0.15;
      }

      // Camera choreography: Slow dramatic zoom with spiral pitch
      const camDist = 13.5 + Math.sin(t * 0.5) * 2.5;
      const camY = Math.sin(t * 0.4) * 3.0;
      camera.position.set(0, camY, camDist);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
