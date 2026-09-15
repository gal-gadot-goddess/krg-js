// algorithms.js - Multi-day generative algorithms pool

const ALGORITHMS = [
  {
    id: "quantum_vortex",
    title: "Quantum Spiral Vortex",
    fileName: "quantum_vortex.js",
    caption: "🌌 Quantum Spiral Vortex rendered with pure JavaScript & HTML5 Canvas! Follow @kreggsjs for daily creative code reels. ✨\n\n#javascript #creativecoding #generativeart #codeart #html5canvas #webdev #mathart #reels",
    code: `// Quantum Spiral Field Simulation
function renderFrame(time) {
  ctx.fillStyle = 'rgba(8, 6, 17, 0.2)';
  ctx.fillRect(0, 0, width, height);

  const particles = 180;
  for (let i = 0; i < particles; i++) {
    const angle = i * 0.12 + time * 1.5;
    const r = 60 + i * 1.9 + Math.sin(time*3 + i*0.2) * 45;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;

    const hue = (i * 2 + time * 60) % 360;
    ctx.strokeStyle = \`hsl(\${hue}, 95%, 65%)\`;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.arc(x, y, 4 + Math.sin(i + time*4)*3, 0, Math.PI*2);
    ctx.stroke();
  }
}`,
    renderString: `(function(ctx, width, height, t) {
      const cx = width / 2;
      const cy = height / 2;
      ctx.fillStyle = '#080612';
      ctx.fillRect(0, 0, width, height);

      const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 330);
      coreGrad.addColorStop(0, 'rgba(168, 85, 247, 0.38)');
      coreGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.16)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      const arms = 4;
      const countPerArm = 55;
      for (let a = 0; a < arms; a++) {
        const armOffset = (a * Math.PI * 2) / arms;
        ctx.beginPath();
        for (let i = 0; i < countPerArm; i++) {
          const u = i / countPerArm;
          const spin = t * 1.8 + armOffset;
          const angle = spin + u * Math.PI * 3.6;
          const wave = Math.sin(t * 4 + u * 12) * (20 + u * 40);
          const radius = 25 + u * 320 + wave;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          if (i % 3 === 0) {
            const hue = (a * 70 + i * 4 + t * 90) % 360;
            ctx.save();
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 70%)';
            ctx.shadowColor = 'hsl(' + hue + ', 100%, 60%)';
            ctx.shadowBlur = 16;
            ctx.beginPath();
            ctx.arc(x, y, 3.5 + Math.sin(t * 6 + i) * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        const hue = (a * 75 + t * 50) % 360;
        ctx.strokeStyle = 'hsla(' + hue + ', 90%, 65%, 0.8)';
        ctx.lineWidth = 3.5;
        ctx.stroke();
      }

      for (let r = 1; r <= 3; r++) {
        const ringRadius = (t * 80 + r * 110) % 340;
        const alpha = Math.max(0, 1 - ringRadius / 340);
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, ' + (alpha * 0.45) + ')';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    })`
  },
  {
    id: "cyber_flow_field",
    title: "Cyber Flow Field Streams",
    fileName: "cyber_flow_field.js",
    caption: "🌊 Magnetic Cyber Flow Field Streams in JavaScript! Watch the particles navigate trigonometric vector forces. Follow @kreggsjs for more! ⚡\n\n#javascript #flowfield #creativecode #coding #canvas #generative #webdevelopment #reels",
    code: `// Cybernetic Vector Flow Simulation
function renderFlow(time) {
  const cols = 28;
  const rows = 22;
  const spacingX = width / cols;
  const spacingY = height / rows;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const px = x * spacingX + spacingX / 2;
      const py = y * spacingY + spacingY / 2;

      const angle = Math.sin(x*0.25 + time) * 
                    Math.cos(y*0.25 + time*0.8) * Math.PI*2;
      const len = 16 + Math.sin(time*3 + x + y)*8;

      const hue = (x*10 + y*10 + time*70) % 360;
      ctx.strokeStyle = \`hsl(\${hue}, 90%, 60%)\`;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + Math.cos(angle)*len, 
                 py + Math.sin(angle)*len);
      ctx.stroke();
    }
  }
}`,
    renderString: `(function(ctx, width, height, t) {
      ctx.fillStyle = '#060712';
      ctx.fillRect(0, 0, width, height);

      const cols = 28;
      const rows = 22;
      const spacingX = width / cols;
      const spacingY = height / rows;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * spacingX + spacingX / 2;
          const py = y * spacingY + spacingY / 2;

          const angle = Math.sin(x * 0.25 + t * 1.5) * Math.cos(y * 0.25 + t * 1.2) * Math.PI * 2;
          const len = 16 + Math.sin(t * 3.5 + x + y) * 8;
          const ex = px + Math.cos(angle) * len;
          const ey = py + Math.sin(angle) * len;

          const hue = (x * 12 + y * 10 + t * 80) % 360;
          ctx.strokeStyle = 'hsl(' + hue + ', 95%, 65%)';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          // Particle tip
          if ((x + y) % 2 === 0) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(ex, ey, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    })`
  },
  {
    id: "sacred_metatron",
    title: "Sacred Geometry Matrix",
    fileName: "sacred_metatron.js",
    caption: "✨ Sacred Geometric Metatron Matrix rendered in Canvas! Mathematical harmony and concentric rotating nodes. Follow @kreggsjs for daily code reels! 🔮\n\n#sacredgeometry #javascript #generativeart #mathematics #mathart #programming #creativecoding #reels",
    code: `// Multi-dimensional Sacred Hexagram
function drawSacredGrid(time) {
  ctx.fillStyle = 'rgba(10, 8, 22, 0.15)';
  ctx.fillRect(0, 0, width, height);

  const rings = 5;
  for (let r = 1; r <= rings; r++) {
    const count = r * 6;
    const radius = r * 60 + Math.sin(time*2 + r)*15;
    const spin = time * (r % 2 === 0 ? 0.8 : -0.8);

    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI*2) / count + spin;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      const hue = (r*50 + i*15 + time*80) % 360;
      ctx.strokeStyle = \`hsl(\${hue}, 95%, 65%)\`;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI*2);
      ctx.stroke();
    }
  }
}`,
    renderString: `(function(ctx, width, height, t) {
      const cx = width / 2;
      const cy = height / 2;
      ctx.fillStyle = '#070614';
      ctx.fillRect(0, 0, width, height);

      // Radial glow
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 350);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0.35)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.18)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const rings = 5;
      for (let r = 1; r <= rings; r++) {
        const count = r * 6;
        const radius = r * 62 + Math.sin(t * 2.5 + r) * 16;
        const spin = t * (r % 2 === 0 ? 0.7 : -0.7);

        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const angle = (i * Math.PI * 2) / count + spin;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          // Node circles
          ctx.save();
          const hue = (r * 55 + i * 15 + t * 90) % 360;
          ctx.strokeStyle = 'hsl(' + hue + ', 95%, 65%)';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.arc(x, y, 12 + Math.sin(t * 5 + i) * 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        ctx.closePath();
        const ringHue = (r * 60 + t * 60) % 360;
        ctx.strokeStyle = 'hsla(' + ringHue + ', 90%, 65%, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    })`
  },
  {
    id: "gravitational_attractor",
    title: "Chaotic Attractor Orbits",
    fileName: "chaotic_attractor.js",
    caption: "🪐 Chaotic Gravitational N-Body Attractor in JavaScript! Mathematical physics meets kinetic generative art. Follow @kreggsjs for daily code reels! 🚀\n\n#physics #javascript #chaos #generative #animation #coding #frontend #webdev #reels",
    code: `// Strange Attractor Orbit Simulation
function simulateAttractor(time) {
  ctx.fillStyle = 'rgba(7, 8, 18, 0.18)';
  ctx.fillRect(0, 0, width, height);

  const steps = 240;
  let x = 0.1, y = 0.1, z = 0.1;
  const a = 10, b = 28, c = 8 / 3;
  const dt = 0.012;

  ctx.beginPath();
  for (let i = 0; i < steps; i++) {
    const dx = a * (y - x) * dt;
    const dy = (x * (b - z) - y) * dt;
    const dz = (x * y - c * z) * dt;
    x += dx; y += dy; z += dz;

    const px = cx + x * 14 * Math.cos(time*0.8);
    const py = cy + (z - 25) * 12;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
}`,
    renderString: `(function(ctx, width, height, t) {
      const cx = width / 2;
      const cy = height / 2 + 30;
      ctx.fillStyle = '#060714';
      ctx.fillRect(0, 0, width, height);

      const steps = 260;
      let x = 0.1, y = 0.1, z = 0.1;
      const a = 10, b = 28, c = 8 / 3;
      const dt = 0.013;

      for (let arm = 0; arm < 3; arm++) {
        const phase = (arm * Math.PI * 2) / 3 + t * 0.9;
        ctx.beginPath();
        x = 0.1 + arm * 0.05;
        y = 0.1;
        z = 0.1;
        for (let i = 0; i < steps; i++) {
          const dx = a * (y - x) * dt;
          const dy = (x * (b - z) - y) * dt;
          const dz = (x * y - c * z) * dt;
          x += dx; y += dy; z += dz;

          const px = cx + x * 15 * Math.cos(phase) - y * 6 * Math.sin(phase);
          const py = cy + (z - 26) * 13;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);

          if (i % 25 === 0) {
            ctx.save();
            const hue = (arm * 120 + i * 2 + t * 100) % 360;
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 70%)';
            ctx.shadowColor = 'hsl(' + hue + ', 100%, 60%)';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        const hue = (arm * 110 + t * 70) % 360;
        ctx.strokeStyle = 'hsla(' + hue + ', 95%, 65%, 0.85)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    })`
  }
,
  {
    id: "three_torus_hyperspace",
    title: "3D Torus Knot Hyperspace",
    fileName: "torus_knot_3d.js",
    caption: "🌌 Mesmerizing 3D Torus Knot Hyperspace rendered with Three.js & WebGL! Watch the glowing geometric mesh deform in real-time. Follow @kreggsjs for daily 3D code reels! ⚡✨\n\n#threejs #webgl #javascript #creativecoding #3dart #generativeart #mathart #reels",
    isThreeJS: true,
    code: `// 3D Geometric Torus Knot in Three.js
function buildScene() {
  const geom = new THREE.TorusKnotGeometry(1.6, 0.45, 140, 24, 2, 5);
  const mat = new THREE.MeshNormalMaterial({ wireframe: true });
  const mesh = new THREE.Mesh(geom, mat);
  scene.add(mesh);
}

function renderFrame(time) {
  mesh.rotation.x = time * 0.9;
  mesh.rotation.y = time * 1.3;
  mesh.scale.setScalar(1 + Math.sin(time*2.5)*0.15);
  renderer.render(scene, camera);
}`,
    initThreeString: `(function(THREE, scene, camera, renderer) {
      while(scene.children.length > 0) scene.remove(scene.children[0]);
      camera.position.set(0, 0, 4.6);
      
      const geom = new THREE.TorusKnotGeometry(1.5, 0.42, 160, 28, 2, 5);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const mesh = new THREE.Mesh(geom, wireMat);
      mesh.name = "knotMesh";
      scene.add(mesh);

      // Inner glowing core
      const coreGeom = new THREE.IcosahedronGeometry(0.75, 2);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const core = new THREE.Mesh(coreGeom, coreMat);
      core.name = "coreMesh";
      scene.add(core);

      // Particle halo
      const pCount = 800;
      const pGeom = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for(let i=0; i<pCount*3; i+=3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 2.4 + Math.random() * 1.5;
        pPos[i] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i+1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i+2] = r * Math.cos(phi);
      }
      pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xa855f7,
        size: 0.04,
        transparent: true,
        opacity: 0.75
      });
      const points = new THREE.Points(pGeom, pMat);
      points.name = "particles";
      scene.add(points);
    })`,
    renderThreeString: `(function(THREE, scene, camera, renderer, t) {
      const knot = scene.getObjectByName("knotMesh");
      const core = scene.getObjectByName("coreMesh");
      const particles = scene.getObjectByName("particles");

      if (knot) {
        knot.rotation.x = t * 0.85;
        knot.rotation.y = t * 1.25;
        knot.rotation.z = Math.sin(t * 0.5) * 0.4;
        const s = 1.0 + Math.sin(t * 2.8) * 0.12;
        knot.scale.set(s, s, s);
      }
      if (core) {
        core.rotation.x = -t * 1.5;
        core.rotation.y = -t * 1.8;
      }
      if (particles) {
        particles.rotation.y = t * 0.25;
        particles.rotation.x = Math.sin(t * 0.3) * 0.2;
      }

      renderer.render(scene, camera);
    })`
  },
  {
    id: "three_cyber_icosahedron",
    title: "Quantum Icosahedron Matrix",
    fileName: "quantum_icosahedron.js",
    caption: "🔮 High-Dimensional Quantum Icosahedron Matrix rendered in Three.js WebGL! Dynamic vertex pulsations & chromatic field lines. Follow @kreggsjs for more! 🚀💫\n\n#threejs #webgl #generative #programming #creativecoding #javascript #frontend #reels",
    isThreeJS: true,
    code: `// Quantum Wireframe Icosahedron
function createMatrix() {
  const geo = new THREE.IcosahedronGeometry(1.8, 3);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    wireframe: true
  });
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);
}

function render(time) {
  sphere.rotation.x = time * 0.7;
  sphere.rotation.y = time * 1.1;
  const pulse = 1 + Math.sin(time * 3) * 0.2;
  sphere.scale.set(pulse, pulse, pulse);
  renderer.render(scene, camera);
}`,
    initThreeString: `(function(THREE, scene, camera, renderer) {
      while(scene.children.length > 0) scene.remove(scene.children[0]);
      camera.position.set(0, 0, 5.0);

      const geo = new THREE.IcosahedronGeometry(1.8, 2);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = "icoMesh";
      scene.add(mesh);

      // Outer rings
      for (let r = 0; r < 3; r++) {
        const ringGeo = new THREE.TorusGeometry(2.3 + r * 0.3, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
          color: r === 0 ? 0xf43f5e : (r === 1 ? 0xa855f7 : 0x38bdf8),
          transparent: true,
          opacity: 0.65
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.name = "ring_" + r;
        scene.add(ring);
      }
    })`,
    renderThreeString: `(function(THREE, scene, camera, renderer, t) {
      const ico = scene.getObjectByName("icoMesh");
      if (ico) {
        ico.rotation.x = t * 0.65;
        ico.rotation.y = t * 1.05;
        const pulse = 1.0 + Math.sin(t * 3.2) * 0.16;
        ico.scale.set(pulse, pulse, pulse);
      }
      for (let r = 0; r < 3; r++) {
        const ring = scene.getObjectByName("ring_" + r);
        if (ring) {
          ring.rotation.x = t * (0.8 + r * 0.3) * (r % 2 === 0 ? 1 : -1);
          ring.rotation.y = t * (0.6 + r * 0.2);
        }
      }
      renderer.render(scene, camera);
    })`
  }
];

module.exports = { ALGORITHMS };
