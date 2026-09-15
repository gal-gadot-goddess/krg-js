const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function renderVideo(templateHtmlPath, audioPath, outputPath, algorithmConfig, durationSec = 10, fps = 30) {
  console.log(`[Renderer] Starting Render for: ${algorithmConfig.title}`);
  const totalFrames = fps * durationSec;
  const width = 1080;
  const height = 1920;

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

  const fileUrl = 'file://' + path.resolve(templateHtmlPath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Inject algorithm configuration
  await page.evaluate((cfg) => {
    const configObj = {
      title: cfg.title,
      fileName: cfg.fileName,
      code: cfg.code,
      isThreeJS: !!cfg.isThreeJS
    };

    if (cfg.isThreeJS) {
      if (cfg.initThreeString) configObj.initThree = eval(cfg.initThreeString);
      if (cfg.renderThreeString) configObj.renderThree = eval(cfg.renderThreeString);
    } else if (cfg.renderString) {
      configObj.render = eval(cfg.renderString);
    }

    window.setVisualizationConfig(configObj);
  }, algorithmConfig);

  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(fps),
    '-i', '-',
    '-i', audioPath,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ];

  console.log('[Renderer] Starting FFmpeg process...');
  const ffmpeg = spawn('ffmpeg', ffmpegArgs);

  ffmpeg.stderr.on('data', (data) => {
    const msg = data.toString();
    if (msg.includes('Error')) {
      console.error('[FFmpeg Error]', msg);
    }
  });

  const startTime = Date.now();

  for (let frame = 0; frame < totalFrames; frame++) {
    const currentTime = frame / fps;

    await page.evaluate((t) => {
      window.setSeekTime(t);
    }, currentTime);

    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: false
    });

    const canContinue = ffmpeg.stdin.write(buffer);
    if (!canContinue) {
      await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
    }

    if (frame % 45 === 0 || frame === totalFrames - 1) {
      const pct = Math.round(((frame + 1) / totalFrames) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`[Renderer] Frame ${frame + 1}/${totalFrames} (${pct}%) - ${elapsed}s elapsed`);
    }
  }

  ffmpeg.stdin.end();
  await browser.close();

  return new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log(`[Renderer] Success! Rendered to: ${outputPath}`);
        resolve(outputPath);
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });
}

module.exports = { renderVideo };
