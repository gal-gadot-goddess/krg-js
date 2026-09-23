#!/usr/bin/env python3
"""
Automated 1080x1920 60FPS Video Renderer for Three.js Cinematic Reels
Synthesizes procedural audio and renders YouTube Shorts / Instagram Reels ready MP4 video.
"""

import os
import sys
import time
import json
import argparse
import subprocess
from pathlib import Path

# Fix Windows console UTF-8 encoding for emojis
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from playwright.sync_api import sync_playwright

# Import local audio synthesizer
from audio_synth import generate_audio

GENRE_MAP = {
    "black_hole_gargantua": "cosmic",
    "quantum_neural_matrix": "cyber",
    "sacred_merkaba_tesseract": "sacred",
    "cyber_synthwave_highway": "synthwave",
    "bioluminescent_jellyfish": "lofi",
    "quantum_dna_helix": "cyber"
}

TITLE_MAP = {
    "black_hole_gargantua": "Cosmic Singularity & Gargantua",
    "quantum_neural_matrix": "Quantum Neural Synapse Matrix",
    "sacred_merkaba_tesseract": "4D Tesseract & Sacred Merkaba",
    "cyber_synthwave_highway": "Synthwave Grid & Neon Sun",
    "bioluminescent_jellyfish": "Bioluminescent Abyssal Jellyfish",
    "quantum_dna_helix": "Quantum DNA Double Helix"
}

def render_reel(visualizer_id="black_hole_gargantua", variation_index=0, duration_sec=12, fps=60, output_dir=None):
    project_dir = Path(__file__).parent.resolve()
    if output_dir is None:
        output_dir = project_dir / "output_videos"
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    template_file = project_dir / "template_reel.html"
    if not template_file.exists():
        print(f"Error: Template file '{template_file}' not found.")
        sys.exit(1)

    variant_slug = f"{visualizer_id}_var_{variation_index + 1}"
    base_name = f"reel_{variant_slug}"
    output_mp4 = output_dir / f"{base_name}.mp4"
    output_png = output_dir / f"{base_name}_preview.png"
    output_meta = output_dir / f"{base_name}_meta.json"
    temp_dir = output_dir / f"_temp_rec_{variant_slug}"
    temp_dir.mkdir(parents=True, exist_ok=True)
    temp_audio = temp_dir / "temp_audio.wav"

    genre = GENRE_MAP.get(visualizer_id, "cosmic")
    title = TITLE_MAP.get(visualizer_id, visualizer_id)

    print("==================================================")
    print(f"  🎬 Rendering 3D Three.js Cinematic Reel")
    print(f"  Visualizer   : {visualizer_id}")
    print(f"  Variation    : #{variation_index + 1}")
    print(f"  Audio Genre  : {genre}")
    print(f"  Duration     : {duration_sec}s @ {fps} FPS")
    print(f"  Resolution   : 1080 x 1920 (9:16 Vertical Video)")
    print(f"  Output MP4   : {output_mp4.name}")
    print("==================================================")

    # Step 1: Synthesize procedural audio
    print("[1/4] Synthesizing genre-matched procedural audio...")
    generate_audio(temp_audio, duration_sec=duration_sec, genre=genre, seed=variation_index * 1337 + 42)

    # Step 2: Launch Chromium & Record 1080x1920 Video
    url = f"{template_file.as_uri()}?visualizer={visualizer_id}&var={variation_index}"
    print(f"[2/4] Launching Chromium headless & capturing {duration_sec}s...")

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--enable-webgl",
                "--enable-features=VaapiVideoDecoder",
                "--disable-gpu-vsync",
                "--no-sandbox"
            ]
        )

        context = browser.new_context(
            viewport={"width": 1080, "height": 1920},
            device_scale_factor=1,
            record_video_dir=str(temp_dir),
            record_video_size={"width": 1080, "height": 1920}
        )

        page = context.new_page()
        page.goto(url)

        # Wait for Three.js & assets to settle
        time.sleep(1.0)

        # Capture high-res preview thumbnail at t = 3.5s
        time.sleep(2.5)
        page.screenshot(path=str(output_png))
        print(f"      Captured preview thumbnail -> {output_png.name}")

        # Capture video for remaining duration
        start_time = time.time()
        remaining_sec = max(1.0, duration_sec - 3.5)
        while time.time() - start_time < remaining_sec:
            elapsed = time.time() - start_time + 3.5
            print(f"\r      Capturing: {elapsed:.1f}s / {duration_sec:.1f}s ({(elapsed/duration_sec*100):.0f}%)", end="", flush=True)
            time.sleep(0.5)

        print("\n      Capture complete.")
        page.close()
        context.close()
        browser.close()

    # Step 3: Locate recorded webm file & mux with audio via FFmpeg
    recorded_webms = list(temp_dir.glob("*.webm"))
    if not recorded_webms:
        print("Error: No recorded webm file found.")
        sys.exit(1)

    latest_webm = max(recorded_webms, key=os.path.getctime)
    print("[3/4] Muxing video & audio to High-Bitrate H.264 MP4 with FFmpeg...")

    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-i", str(latest_webm),
        "-i", str(temp_audio),
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-r", str(fps),
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        str(output_mp4)
    ]

    res = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"FFmpeg error: {res.stderr}")
        sys.exit(1)

    # Clean up temporary files
    try:
        latest_webm.unlink(missing_ok=True)
        temp_audio.unlink(missing_ok=True)
        for f in temp_dir.glob("*"):
            f.unlink(missing_ok=True)
        temp_dir.rmdir()
    except Exception as e:
        pass

    # Step 4: Generate bot-ready JSON metadata
    print("[4/4] Writing publishing metadata JSON...")
    meta_info = {
        "visualizer_id": visualizer_id,
        "variation_index": variation_index,
        "title": f"Mind-Blowing {title} (Three.js 60 FPS) #Shorts",
        "suggested_titles": [
            f"Mind-Blowing {title} in JavaScript #Shorts",
            f"Watch Three.js Render This {title} Live! #CodeArt",
            f"Can You Code This in Three.js? {title} #WebDev"
        ],
        "category": "Science & Technology",
        "duration_sec": duration_sec,
        "resolution": "1080x1920 (9:16)",
        "fps": fps,
        "video_file": output_mp4.name,
        "preview_image": output_png.name,
        "tags": [
            "threejs", "webgl", "javascript", "creativecoding", "codeart",
            "html5", "programming", "frontend", "developer", "reels", "shorts"
        ],
        "description": (
            f"⚡ Procedural 3D WebGL Visualization: {title} rendered live at 60 FPS using Three.js and JavaScript!\n\n"
            f"👨‍💻 Source Code & Visual Algorithms available in the project.\n"
            f"✨ Follow @kreggsjs for daily 3D algorithmic code art reels.\n\n"
            f"#threejs #webgl #javascript #creativecoding #codeart #developer #mathart #reels #shorts"
        )
    }

    with open(output_meta, "w", encoding="utf-8") as f:
        json.dump(meta_info, f, indent=2)

    print(f"\n✅ Reel rendering complete:")
    print(f"   🎥 Video MP4  : {output_mp4}")
    print(f"   🖼️ Preview PNG: {output_png}")
    print(f"   📄 Metadata   : {output_meta}\n")
    return output_mp4

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Render 3D Three.js Reel")
    parser.add_argument("--visualizer", default="black_hole_gargantua", help="Visualizer ID")
    parser.add_argument("--variation", type=int, default=0, help="Variation Index (0-99)")
    parser.add_argument("--duration", type=int, default=12, help="Video duration in seconds")
    parser.add_argument("--fps", type=int, default=60, help="Frames per second")
    parser.add_argument("--output-dir", default=None, help="Output directory")

    args = parser.parse_args()
    render_reel(
        visualizer_id=args.visualizer,
        variation_index=args.variation,
        duration_sec=args.duration,
        fps=args.fps,
        output_dir=args.output_dir
    )
