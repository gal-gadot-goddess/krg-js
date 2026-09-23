// daily_reel_runner.js
// Autonomous 3D Three.js Reel Generator Bridge
// Forwards execution to the new high-fps, zero-failure 3D Three.js generator suite.

const { spawn } = require('child_process');
const path = require('path');

function runDailyReel() {
  console.log('====================================================');
  console.log('⚡ STARTING 3D THREE.JS CINEMATIC REEL RUNNER ⚡');
  console.log('====================================================');

  const pythonBin = process.platform === 'win32' ? 'python' : 'python3';
  const scriptPath = path.join(__dirname, 'generate_daily_reel.py');

  const child = spawn(pythonBin, [
    '-u',
    scriptPath,
    '--duration', '12',
    '--fps', '60'
  ], {
    stdio: 'inherit',
    env: process.env
  });

  return new Promise((resolve, reject) => {
    child.on('close', (code) => {
      if (code === 0) {
        console.log('\n✅ 3D Reel Execution Completed Successfully!');
        resolve();
      } else {
        console.error(`\n❌ Process exited with return code: ${code}`);
        reject(new Error(`Runner failed with code ${code}`));
      }
    });
  });
}

if (require.main === module) {
  runDailyReel().catch((err) => {
    console.error('Fatal Error:', err);
    process.exit(1);
  });
}

module.exports = { runDailyReel };
