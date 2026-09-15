const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { ALGORITHMS } = require('./algorithms');
const { generateReelAudio } = require('./sound_synth');
const { renderVideo } = require('./render_reel');

const { generateNewAlgorithmWithPollinations } = require('./ai_generator');

async function runDailyReel(algorithmIndexOverride = null) {
  console.log('====================================================');
  console.log('⚡ STARTING AUTONOMOUS DAILY JAVASCRIPT REEL RUNNER ⚡');
  console.log('====================================================');

  const projectDir = __dirname;
  const historyPath = path.join(projectDir, 'history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {}
  }

  // Choose next algorithm: Try Pollinations AI first for a brand new animation
  let chosenAlgo = null;
  if (algorithmIndexOverride !== null) {
    chosenAlgo = ALGORITHMS[algorithmIndexOverride % ALGORITHMS.length];
  } else {
    try {
      chosenAlgo = await generateNewAlgorithmWithPollinations(history);
    } catch (e) {
      console.warn('[Runner] AI generation fallback:', e.message);
    }

    if (!chosenAlgo) {
      // Pick the algorithm with the fewest prior runs from curated pool
      const usedCounts = {};
      ALGORITHMS.forEach(a => usedCounts[a.id] = 0);
      history.forEach(h => {
        if (usedCounts[h.id] !== undefined) usedCounts[h.id]++;
      });
      chosenAlgo = ALGORITHMS.slice().sort((a, b) => usedCounts[a.id] - usedCounts[b.id])[0];
    }
  }

  console.log(`\n🎯 Selected Daily Visual: [${chosenAlgo.title}] (${chosenAlgo.fileName})`);

  // Step 1: Synthesize Fresh Procedural Lo-Fi Audio
  const audioFile = path.join(projectDir, 'temp_audio.wav');
  generateReelAudio(audioFile, 10.0, history.length);

  // Step 2: Render 1080x1920 Video Reel
  const templatePath = path.join(projectDir, 'template.html');
  const outputVideo = path.join(projectDir, `reel_${chosenAlgo.id}.mp4`);
  
  await renderVideo(templatePath, audioFile, outputVideo, chosenAlgo, 10.0, 30);

  // Step 3: Publish to Facebook Reels and Instagram Reels (Reels tab only)
  console.log('\n🚀 Triggering Meta Graph API Multi-Platform Publisher...');
  const pythonBin = 'python';
  const pubScript = path.join(projectDir, 'publisher.py');

  const pubProcess = spawn(pythonBin, [
    '-u',
    pubScript,
    outputVideo,
    chosenAlgo.caption,
    chosenAlgo.title
  ], { stdio: 'inherit', env: process.env });

  await new Promise((resolve) => {
    pubProcess.on('close', (code) => {
      console.log(`Publisher completed with code: ${code}`);
      resolve();
    });
  });

  // Step 4: Record history
  history.push({
    id: chosenAlgo.id,
    title: chosenAlgo.title,
    timestamp: new Date().toISOString(),
    videoFile: path.basename(outputVideo)
  });
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

  console.log('\n✅ Daily Reel Workflow Completed Successfully!');
}

if (require.main === module) {
  runDailyReel().catch(err => {
    console.error('Fatal Error:', err);
    process.exit(1);
  });
}

module.exports = { runDailyReel };
