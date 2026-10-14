"""Turn original photos into web images for the portfolio.

- converts to sRGB RGB, applies EXIF rotation
- strips ALL metadata (the camera files contain GPS location — never publish originals)
- writes WebP at 600 / 1000 / 1600 / 2400 px wide (never upscales; small originals also get a native-size copy)
- writes a 1200 px JPEG for social previews (og:image)

Usage:
  python3 tools/build_images.py --src "/path/to/网站内照片" --out assets/works
  python3 tools/build_images.py --process --src "/path/to/Extra Photos" --out assets/process
Edit WORKS / PROCESS below to add, rename or reorder images.
"""
import argparse
import os
from PIL import Image, ImageOps

WORKS = [  # slug, original file name
    ("handful-of-sweetness", "0830拍摄-0446.jpg"),
    ("tangled-treats", "0830拍摄-0517.jpg"),
    ("candybound", "0830拍摄-0282.jpg"),
    ("sugar-murmurs", "0830拍摄-0240.jpg"),
    ("eye-candy", "0830拍摄-0097.jpg"),
    ("cracked-and-crumbling", "0830拍摄-0432.jpg"),
    ("sugared-smile", "0830.png"),
    ("within-sweet-reach", "未标题-1.png"),  # 1417 px wide is final (artist confirmed); padded to 4:5 below
    ("lathered-whispers", "Final_0830拍摄-0547 拷贝.jpg"),
]
WIDTHS = [600, 1000, 1600, 2400]
PAD_TO_4x5 = {"within-sweet-reach"}  # pure-white background: pad the 3:4 frame to 4:5 instead of cropping

# Process photos (all from the 30 Aug shoot, folder "Extra Photos"), in the order they are shown.
PROCESS = {
    "handful-of-sweetness": ["0830拍摄-0449.jpg"],
    "tangled-treats": ["0830拍摄-0474.jpg", "0830拍摄-0484.jpg", "0830拍摄-0486.jpg", "0830拍摄-0515.jpg"],
    "candybound": ["0830拍摄-0246.jpg", "0830拍摄-0256.jpg", "0830拍摄-0268.jpg", "0830拍摄-0278.jpg"],
    "sugar-murmurs": ["0830拍摄-0188.jpg", "0830拍摄-0202.jpg", "0830拍摄-0220.jpg", "0830拍摄-0228.jpg", "0830拍摄-0235.jpg"],
    "eye-candy": ["0830拍摄-0033.jpg", "0830拍摄-0048.jpg", "0830拍摄-0073.jpg", "0830拍摄-0098.jpg"],
    "cracked-and-crumbling": ["0830拍摄-0406.jpg", "0830拍摄-0414.jpg", "0830拍摄-0416.jpg", "0830拍摄-0436.jpg"],
    "sugared-smile": ["0830拍摄-0019.jpg", "0830拍摄-0029.jpg", "0830拍摄-0149.jpg", "0830拍摄-0155.jpg"],
    "within-sweet-reach": ["0830拍摄-0336.jpg", "0830拍摄-0344.jpg", "0830拍摄-0365.jpg", "0830拍摄-0378.jpg", "0830拍摄-0386.jpg"],
    "lathered-whispers": ["0830拍摄-0523.jpg", "0830拍摄-0533.jpg", "0830拍摄-0544.jpg"],
}


def load(path, min_w=None):
    im = Image.open(path)
    if min_w and im.format == "JPEG":  # faster decode for big camera files
        W, H = im.size
        im.draft("RGB", (min_w, round(H * min_w / W)))
    im = ImageOps.exif_transpose(im)
    return im.convert("RGB")


def save_webp(im, path, q):
    im.save(path, "WEBP", quality=q, method=6)  # no exif/icc passed -> metadata stripped


def build_works(src, out):
    os.makedirs(out, exist_ok=True)
    for slug, fn in WORKS:
        im = load(os.path.join(src, fn))
        if slug in PAD_TO_4x5:
            w0, h0 = im.size
            target_w = round(h0 * 4 / 5)
            if target_w > w0:
                canvas = Image.new("RGB", (target_w, h0), (255, 255, 255))
                canvas.paste(im, ((target_w - w0) // 2, 0))
                im = canvas
        W, H = im.size
        for w in WIDTHS:
            if w > W:
                continue
            save_webp(im.resize((w, round(H * w / W)), Image.LANCZOS), os.path.join(out, f"{slug}-{w}.webp"), 80 if w <= 1000 else 84)
        if W < WIDTHS[-1]:
            save_webp(im, os.path.join(out, f"{slug}-{W}.webp"), 86)
        og = im.resize((1200, round(H * 1200 / W)), Image.LANCZOS)
        og.save(os.path.join(out, f"{slug}-og.jpg"), "JPEG", quality=82, optimize=True, progressive=True)
        print(slug, W, H)


def build_process(src, out):
    """Process photos: <slug>-p<n>-600.webp and -1600.webp, ratio kept. Prints a JS snippet for data.js."""
    import json
    os.makedirs(out, exist_ok=True)
    manifest = {}
    for slug, files in PROCESS.items():
        items = []
        for n, fn in enumerate(files, 1):
            im = load(os.path.join(src, fn), min_w=1600)
            W, H = im.size
            for w in (600, 1600):
                r = im if W <= w else im.resize((w, round(H * w / W)), Image.LANCZOS)
                save_webp(r, os.path.join(out, f"{slug}-p{n}-{w}.webp"), 80 if w == 600 else 82)
            items.append({"src": f"assets/process/{slug}-p{n}-1600.webp", "thumb": f"assets/process/{slug}-p{n}-600.webp",
                          "ratio": round(W / H, 4), "file": fn, "caption": ""})
        manifest[slug] = items
        print(slug, len(items))
    with open(os.path.join(out, "_process.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--process", action="store_true", help="build the process photos listed in PROCESS")
    a = ap.parse_args()
    (build_process if a.process else build_works)(a.src, a.out)
