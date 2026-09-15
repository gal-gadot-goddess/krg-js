const fs = require('fs');

function generateReelAudio(outputPath, durationSec = 10, variantIndex = 0) {
  const sampleRate = 44100;
  const numSamples = Math.floor(durationSec * sampleRate);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // Chord progression variants (Am7, Dm7, Em7, Fmaj7, Cmaj7, G)
  const progressions = [
    // Am7 -> Fmaj7 -> Cmaj7 -> G
    [
      [220.0, 261.63, 329.63, 392.0],
      [174.61, 220.0, 261.63, 329.63],
      [261.63, 329.63, 392.0, 493.88],
      [196.0, 246.94, 293.66, 392.0]
    ],
    // Dm7 -> G7 -> Cmaj7 -> Am7
    [
      [146.83, 174.61, 220.0, 261.63],
      [196.0, 246.94, 293.66, 349.23],
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 392.0]
    ],
    // Em7 -> Cmaj7 -> G -> D
    [
      [164.81, 196.0, 246.94, 293.66],
      [261.63, 329.63, 392.0, 493.88],
      [196.0, 246.94, 293.66, 392.0],
      [146.83, 185.0, 220.0, 293.66]
    ]
  ];

  const chords = progressions[variantIndex % progressions.length];
  const chordDur = durationSec / chords.length;
  const arpNotes = [440, 523.25, 659.25, 783.99, 880, 659.25, 523.25, 783.99];

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const cIdx = Math.floor(t / chordDur) % chords.length;
    const chord = chords[cIdx];

    // Chords
    let chordVal = 0;
    for (let f of chord) {
      chordVal += Math.sin(2 * Math.PI * f * t) * 0.22;
    }

    // Warm sub-bass
    const bass = Math.sin(Math.PI * chord[0] * t) * 0.45;

    // Drum beat (100 BPM)
    const beatT = (t % 0.6) / 0.6;
    const beatN = Math.floor(t / 0.6) % 4;
    let drum = 0;
    if (beatN === 0 && beatT < 0.2) {
      drum += Math.sin(2 * Math.PI * (105 * Math.exp(-beatT * 15) + 40) * t) * 0.85;
    } else if (beatN === 2 && beatT < 0.25) {
      drum += ((Math.sin(t * 99999) % 1) * 2 - 1) * 0.4;
    }
    if ((t % 0.3) < 0.05) {
      drum += ((Math.sin(t * 55555) % 1) * 2 - 1) * 0.18;
    }

    // Melodic synth pluck
    const arp = Math.sin(2 * Math.PI * arpNotes[Math.floor(t * 4) % arpNotes.length] * t) * Math.exp(-((t % 0.25) / 0.25) * 8) * 0.28;

    let mix = (chordVal + bass + drum + arp);
    if (t < 0.3) mix *= (t / 0.3);
    if (t > durationSec - 0.5) mix *= Math.max(0, (durationSec - t) / 0.5);
    mix = Math.max(-0.95, Math.min(0.95, mix));

    buffer.writeInt16LE(Math.floor(mix * 32767), offset);
    offset += 2;
  }

  fs.writeFileSync(outputPath, buffer);
  console.log('Audio generated:', outputPath);
}

module.exports = { generateReelAudio };
