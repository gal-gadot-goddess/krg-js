const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { generateReelAudio } = require('./sound_synth');

const sampleAlgorithm = {
  id: "clifford_quantum_torus",
  title: "4D Clifford Attractor Torus",
  fileName: "clifford_torus.js",
  category: "Hyperspace & Chaos Theory",
  caption: "🌌 Hypnotic 4D Clifford Attractor Ribbon & Quantum Particle Field in Three.js WebGL! Rendered at 60 FPS. Follow @kreggsjs for daily code reels! ⚡📐\n\n#threejs #webgl #creativecoding #mathart #javascript #codeart #reels #developer",
  isThreeJS: true,

  code: `// 4D Clifford Attractor Parametric Orbit
function updateCliffordAttractor(points, t, a = -1.4, b = 1.6, c = 1.0, d = 0.7) {
  let x = Math.sin(t * 0.2), y = Math.cos(t * 0.2);
  const pos = points.geometry.attributes.position.array;
  const count = pos.length / 3;

  for (let i = 0; i < count; i++) {
    const xn = Math.sin(a * y) + c * Math.cos(a * x);
    const yn = Math.sin(b * x) + d * Math.cos(b * y);
    x = xn; y = yn;

    // Stereographic projection into 3D space
    const r = Math.sqrt(x * x + y * y);
    const angle = i * 0.05 + t * 1.2;
    pos[i * 3 + 0] = x * 3.2 + Math.cos(angle) * 0.6;
    pos[i * 3 + 1] = y * 3.2 + Math.sin(angle) * 0.6;
    pos[i * 3 + 2] = Math.sin(r * 2.0 - t * 3.0) * 1.8;
  }
  points.geometry.attributes.position.needsUpdate = true;
}`,

  initThreeString: `(function(THREE, scene, camera, renderer) {
  while(scene.children.length > 0) scene.remove(scene.children[0]);
  camera.position.set(0, 0, 8.5);

  const pCount = 5000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(pCount * 3);
  const col = new Float32Array(pCount * 3);

  for(let i = 0; i < pCount; i++) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * 6.5;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 5.0;

    const u = i / pCount;
    col[i * 3 + 0] = 0.2 + 0.8 * Math.sin(u * Math.PI * 2);
    col[i * 3 + 1] = 0.8 + 0.2 * Math.cos(u * Math.PI * 2);
    col[i * 3 + 2] = 1.0;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.85
  });
  const cloud = new THREE.Points(geo, mat);
  scene.add(cloud);

  // Iridescent 4D Torus Knot
  const torusGeo = new THREE.TorusKnotGeometry(2.4, 0.48, 128, 28, 2, 3);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });
  const knot = new THREE.Mesh(torusGeo, torusMat);
  scene.add(knot);

  // Inner Core Glowing Sphere
  const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xf43f5e,
    wireframe: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  scene.userData = { cloud, knot, core };
})`,

  renderThreeString: `(function(THREE, scene, camera, renderer, t) {
  const { cloud, knot, core } = scene.userData;
  if (knot) {
    knot.rotation.x = t * 1.1;
    knot.rotation.y = t * 1.4;
    const pulse = 1.0 + Math.sin(t * 3.5) * 0.15;
    knot.scale.set(pulse, pulse, pulse);
  }
  if (core) {
    core.rotation.x = -t * 1.8;
    core.rotation.z = t * 2.2;
    const corePulse = 1.0 + Math.cos(t * 4.0) * 0.25;
    core.scale.set(corePulse, corePulse, corePulse);
  }
  if (cloud) {
    cloud.rotation.z = -t * 0.45;
    cloud.rotation.y = t * 0.65;
  }
  camera.position.x = Math.sin(t * 0.5) * 1.6;
  camera.position.y = Math.cos(t * 0.4) * 1.0;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
})`
};

async function renderSampleReel() {
  console.log('====================================================');
  console.log('🎬 GENERATING AI THREE.JS VISUALIZER SAMPLE VIDEO');
  console.log('====================================================');

  const durationSec = 6; // 6-second vertical reel
  const fps = 30;        // 30 FPS for fast crisp render (180 frames)
  const totalFrames = durationSec * fps;
  const width = 1080;
  const height = 1920;

  const projectDir = __dirname;
  const audioPath = path.join(projectDir, 'temp_audio.wav');
  const templatePath = path.join(projectDir, 'template.html');
  const outputPath = path.join(projectDir, 'sample_clifford_torus_reel.mp4');
  const previewPngPath = path.join(projectDir, 'sample_clifford_preview.png');

  // Step 1: Synthesize audio
  console.log('[1/4] Synthesizing background audio track...');
  generateReelAudio(audioPath, durationSec, 1);

  // Step 2: Launch browser
  console.log('[2/4] Launching headless browser with WebGL...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    headless: 'new',
    args: [
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--window-size=${width},${height}`
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });

  const fileUrl = 'file://' + path.resolve(templatePath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Inject algorithm
  await page.evaluate((cfg) => {
    const configObj = {
      title: cfg.title,
      fileName: cfg.fileName,
      code: cfg.code,
      isThreeJS: true,
      initThree: eval(cfg.initThreeString),
      renderThree: eval(cfg.renderThreeString)
    };
    window.setVisualizationConfig(configObj);
  }, sampleAlgorithm);

  // Step 3: Setup FFmpeg pipeline
  console.log('[3/4] Piping 1080x1920 frames directly into FFmpeg H.264...');
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(fps),
    '-i', '-',
    '-i', audioPath,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs);

  ffmpeg.stderr.on('data', (d) => {
    const s = d.toString();
    if (s.includes('Error')) console.error('[FFmpeg Error]:', s);
  });

  const startTime = Date.now();

  for (let frame = 0; frame < totalFrames; frame++) {
    const currentTime = frame / fps;

    await page.evaluate((t) => {
      window.setSeekTime(t);
    }, currentTime);

    const buffer = await page.screenshot({ type: 'png', omitBackground: false });

    // Save thumbnail at frame 60 (2.0s in)
    if (frame === 60) {
      fs.writeFileSync(previewPngPath, buffer);
      console.log(`      📸 Saved preview frame -> ${path.basename(previewPngPath)}`);
    }

    const canWrite = ffmpeg.stdin.write(buffer);
    if (!canWrite) {
      await new Promise(r => ffmpeg.stdin.once('drain', r));
    }

    if (frame % 30 === 0 || frame === totalFrames - 1) {
      const pct = Math.round(((frame + 1) / totalFrames) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`      Rendering: Frame ${frame + 1}/${totalFrames} (${pct}%) - ${elapsed}s elapsed`);
    }
  }

  ffmpeg.stdin.end();
  await browser.close();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  console.log('[4/4] Video rendered successfully!');
  console.log('====================================================');
  console.log(`🎥 MP4 Video : ${outputPath}`);
  console.log(`🖼️ Preview PNG: ${previewPngPath}`);
  console.log(`📦 File Size  : ${(fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2)} MB`);
  console.log('====================================================');
}

renderSampleReel().catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});
