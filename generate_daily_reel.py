#!/usr/bin/env python3
"""
Autonomous Daily 3D Three.js Reel Generator
Selects next visual algorithm variation, synthesizes audio, and renders 1080x1920 60FPS video.
"""

import os
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime

# Fix Windows console UTF-8 encoding for emojis
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from render_reel import render_reel, GENRE_MAP, TITLE_MAP

AVAILABLE_VISUALIZERS = [
    "black_hole_gargantua",
    "quantum_neural_matrix",
    "sacred_merkaba_tesseract",
    "cyber_synthwave_highway",
    "bioluminescent_jellyfish",
    "quantum_dna_helix"
]

def load_history(history_file):
    if history_file.exists():
        try:
            with open(history_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_history(history_file, history):
    with open(history_file, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def pick_next_visualizer(history):
    usage_counts = {viz: 0 for viz in AVAILABLE_VISUALIZERS}
    for item in history:
        viz_id = item.get("visualizer_id")
        if viz_id in usage_counts:
            usage_counts[viz_id] += 1

    # Pick the visualizer with the lowest usage
    sorted_viz = sorted(usage_counts.items(), key=lambda x: x[1])
    chosen_viz = sorted_viz[0][0]
    next_variation = usage_counts[chosen_viz]
    return chosen_viz, next_variation

def main():
    parser = argparse.ArgumentParser(description="Autonomous Daily 3D Three.js Reel Generator")
    parser.add_argument("--visualizer", choices=AVAILABLE_VISUALIZERS, default=None, help="Force specific visualizer")
    parser.add_argument("--variation", type=int, default=None, help="Force variation index")
    parser.add_argument("--duration", type=int, default=12, help="Reel duration in seconds")
    parser.add_argument("--fps", type=int, default=60, help="Frames per second")
    parser.add_argument("--list", action="store_true", help="List available visualizers")
    parser.add_argument("--batch", type=int, default=None, help="Render N sequential reels in batch")
    parser.add_argument("--publish", action="store_true", help="Publish rendered reel to Instagram & Facebook Reels via Meta Graph API")

    args = parser.parse_args()

    if args.list:
        print("\nAvailable 3D Three.js Visualizers:")
        for idx, viz in enumerate(AVAILABLE_VISUALIZERS, 1):
            print(f"  {idx}. {viz.ljust(26)} - {TITLE_MAP.get(viz)} ({GENRE_MAP.get(viz)} audio)")
        print()
        return

    project_dir = Path(__file__).parent.resolve()
    history_file = project_dir / "history.json"
    history = load_history(history_file)

    if args.batch:
        count = args.batch
        print(f"\n🚀 Running Batch Generation for {count} Reels...\n")
        for i in range(count):
            viz, var_idx = pick_next_visualizer(history)
            mp4_path = render_reel(visualizer_id=viz, variation_index=var_idx, duration_sec=args.duration, fps=args.fps)
            history.append({
                "visualizer_id": viz,
                "variation_index": var_idx,
                "timestamp": datetime.now().isoformat(),
                "video_file": mp4_path.name
            })
            save_history(history_file, history)
        print(f"\n🎉 Batch render of {count} reels completed successfully!")
        return

    # Single Reel Run
    if args.visualizer:
        chosen_viz = args.visualizer
        chosen_var = args.variation if args.variation is not None else 0
    else:
        chosen_viz, chosen_var = pick_next_visualizer(history)
        if args.variation is not None:
            chosen_var = args.variation

    print(f"\n🎯 Selected Daily Visual: [{chosen_viz}] (Variation #{chosen_var + 1})")

    output_mp4 = render_reel(
        visualizer_id=chosen_viz,
        variation_index=chosen_var,
        duration_sec=args.duration,
        fps=args.fps
    )

    history.append({
        "visualizer_id": chosen_viz,
        "variation_index": chosen_var,
        "timestamp": datetime.now().isoformat(),
        "video_file": output_mp4.name
    })
    save_history(history_file, history)

    # Optional Meta Graph API Publisher
    meta_json = output_mp4.parent / f"{output_mp4.stem}_meta.json"
    meta_info = {}
    if meta_json.exists():
        try:
            with open(meta_json, "r", encoding="utf-8") as mf:
                meta_info = json.load(mf)
        except Exception:
            pass

    has_token = bool(os.environ.get("FACEBOOK_ACCESS_TOKEN")) or bool(os.environ.get("META_LONG_LIVED_ACCESS_TOKEN"))
    should_publish = args.publish or (has_token and not args.batch)
    if should_publish:
        print("\n🚀 Invoking Meta Graph API Publisher for Instagram & Facebook Reels...")
        try:
            from publisher import publish_reel
            caption = meta_info.get("description", f"3D Three.js {chosen_viz} #threejs #creativecoding #reels")
            title = meta_info.get("title", f"3D {chosen_viz}")
            publish_reel(str(output_mp4), caption, title)
        except Exception as pe:
            print(f"[Publisher Error]: {pe}")

    print("✨ Autonomous Reel Workflow Completed Successfully!\n")

if __name__ == "__main__":
    main()
