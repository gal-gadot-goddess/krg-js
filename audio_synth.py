"""
Procedural Calm Lo-Fi & Ambient Music Synthesizer
Generates peaceful, soothing, aesthetic Lo-Fi chillhop and ambient music for coding reels.
Uses pure Python standard library (wave, struct, math, random). Zero external dependencies.
"""

import math
import struct
import wave
import random
from pathlib import Path

SAMPLE_RATE = 44100

def _clamp(val, low=-0.95, high=0.95):
    return max(low, min(high, val))

def generate_calm_lofi(output_path, duration_sec=15.0, seed=42):
    """
    Generate very calm, relaxing, aesthetic Lo-Fi chill chords with gentle Rhodes piano,
    mellow sub-bass, soft brush drums, and warm analog vinyl tone.
    """
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    num_samples = int(duration_sec * SAMPLE_RATE)

    # Calm, beautiful Lo-Fi chord progressions (Major 9th & Minor 9th chords)
    PROGRESSIONS = [
        # Progression 1: Fmaj9 -> Em9 -> Dm9 -> Cmaj9 (Classic Tokyo Cafe Lo-Fi)
        [
            [174.61, 220.0, 261.63, 329.63, 392.0], # Fmaj9
            [164.81, 196.0, 246.94, 293.66, 329.63], # Em9
            [146.83, 174.61, 220.0, 261.63, 329.63], # Dm9
            [130.81, 164.81, 196.0, 246.94, 293.66]  # Cmaj9
        ],
        # Progression 2: Abmaj7 -> Gm7 -> Fm9 -> Ebmaj7 (Dreamy Sunset Chill)
        [
            [207.65, 261.63, 311.13, 392.0],
            [196.0, 233.08, 293.66, 349.23],
            [174.61, 207.65, 261.63, 311.13, 349.23],
            [155.56, 196.0, 233.08, 293.66]
        ],
        # Progression 3: Dm9 -> G13 -> Cmaj9 -> A7b13 (Midnight Coffee Jazz)
        [
            [146.83, 220.0, 261.63, 329.63, 392.0],
            [196.0, 246.94, 329.63, 392.0, 440.0],
            [130.81, 196.0, 246.94, 293.66, 329.63],
            [220.0, 277.18, 329.63, 392.0, 415.30]
        ]
    ]

    chords = PROGRESSIONS[seed % len(PROGRESSIONS)]
    chord_dur = duration_sec / len(chords)
    bpm = 78.0 # Relaxed, slow chillhop tempo
    beat_len = 60.0 / bpm

    # Soft melodic arpeggio notes
    first_chord = chords[0]
    arp_notes = [first_chord[i % len(first_chord)] * 1.5 for i in range(8)]

    samples = []
    
    # State
    lfo_phase = 0.0

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        chord_idx = int(t / chord_dur) % len(chords)
        chord = chords[chord_idx]

        chord_time = t % chord_dur
        # Smooth gentle attack on each chord change
        chord_env = min(1.0, chord_time / 0.18) * math.exp(-chord_time * 0.04)

        # 1. Warm Electric Piano (Rhodes / Soft Keys)
        # Uses fundamental + gentle 2nd and 3rd harmonics with subtle chorus detune
        keys_val = 0.0
        for fi, freq in enumerate(chord):
            detune = 1.0 + 0.0015 * math.sin(t * 2.5 + fi * 0.8)
            # Fundamental
            w1 = math.sin(2 * math.pi * freq * detune * t)
            # Gentle bell harmonic
            w2 = 0.3 * math.sin(2 * math.pi * freq * 2.0 * t) * math.exp(-chord_time * 1.2)
            w3 = 0.1 * math.sin(2 * math.pi * freq * 3.0 * t) * math.exp(-chord_time * 2.5)
            keys_val += (w1 + w2 + w3) * 0.14

        keys_val *= chord_env

        # 2. Warm Mellow Sub-Bass (Deep sine wave, soft and calming)
        root = chord[0]
        if root > 140:
            root /= 2.0
        # Gentle sub envelope
        bass_env = min(1.0, chord_time / 0.12) * math.exp(-chord_time * 0.08)
        bass_val = math.sin(2 * math.pi * root * t) * 0.32 * bass_env

        # 3. Soft Lo-Fi Percussion (Very gentle, non-intrusive)
        beat_phase = (t % beat_len) / beat_len
        beat_num = int(t / beat_len) % 4
        drum_val = 0.0

        # Soft padded kick on beat 0 and beat 2.5
        is_soft_kick = (beat_num == 0 and beat_phase < 0.18) or (beat_num == 2 and beat_phase > 0.5 and beat_phase < 0.68)
        if is_soft_kick:
            k_env = math.exp(-beat_phase * 16.0)
            k_freq = 85.0 * math.exp(-beat_phase * 22.0) + 40.0
            drum_val += math.sin(2 * math.pi * k_freq * t) * k_env * 0.45

        # Soft brush / rim tap on beat 2
        if beat_num == 2 and beat_phase < 0.22:
            s_env = math.exp(-beat_phase * 18.0)
            s_noise = (math.sin(t * 77777.0) % 1.0) * 2.0 - 1.0
            drum_val += s_noise * s_env * 0.18

        # Subtle brushed hi-hat on every 8th note
        sub_beat = (t % (beat_len / 2.0)) / (beat_len / 2.0)
        if sub_beat < 0.06:
            h_env = math.exp(-sub_beat * 32.0)
            h_noise = (math.sin(t * 111111.0) % 1.0) * 2.0 - 1.0
            drum_val += h_noise * h_env * 0.08

        # 4. Melodic Ambient Pluck (Soft bell echo)
        step_len = beat_len
        step_phase = (t % step_len) / step_len
        note_idx = int(t / step_len) % len(arp_notes)
        note_f = arp_notes[note_idx]
        p_env = math.exp(-step_phase * 6.0)
        pluck_val = math.sin(2 * math.pi * note_f * t) * p_env * 0.09

        # 5. Subtle Vinyl Warmth / Tape Texture
        vinyl_noise = (math.sin(t * 54321.0) % 1.0) * 0.015

        # Mix all channels
        mix = keys_val + bass_val + drum_val + pluck_val + vinyl_noise

        # Smooth Master Head & Tail Fades
        if t < 0.5:
            mix *= (t / 0.5)
        if t > duration_sec - 0.8:
            mix *= max(0.0, (duration_sec - t) / 0.8)

        # Soft analog tube limiter
        mix = math.tanh(mix * 1.05)
        samples.append(_clamp(mix))

    # Write WAV file (16-bit PCM Mono)
    with wave.open(str(output_path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw_bytes = bytearray()
        for s in samples:
            sample_int = int(s * 32767.0)
            raw_bytes.extend(struct.pack("<h", sample_int))
        wf.writeframes(raw_bytes)

    print(f"[AudioSynth] Generated {duration_sec}s calm lo-fi chill track -> {output_path.name}")
    return output_path

# Alias generate_audio to calm lofi generator
def generate_audio(output_path, duration_sec=15.0, genre=None, seed=42):
    return generate_calm_lofi(output_path, duration_sec=duration_sec, seed=seed)

if __name__ == "__main__":
    test_wav = Path("calm_test.wav")
    generate_calm_lofi(test_wav, duration_sec=6.0)
    print("Calm Lo-Fi test audio generated successfully.")
