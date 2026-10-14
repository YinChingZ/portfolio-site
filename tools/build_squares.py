"""Square thumbnails for the Process contact sheets.

Reads every assets/more/<id>-1600.webp and writes assets/more/<id>-sq.webp (240 × 240, centre crop, no metadata).
Run it again after tools/build_more.py adds or replaces photos.
Usage:  python3 tools/build_squares.py
"""
import pathlib
from PIL import Image, ImageOps

root = pathlib.Path(__file__).resolve().parent.parent / "assets" / "more"
SIZE = 240
n = 0
for src in sorted(root.glob("*-1600.webp")):
    im = Image.open(src).convert("RGB")
    sq = ImageOps.fit(im, (SIZE, SIZE), Image.LANCZOS, centering=(0.5, 0.5))
    sq.save(src.with_name(src.name.replace("-1600.webp", "-sq.webp")), "WEBP", quality=80, method=6)
    n += 1
print("wrote", n, "square thumbnails to", root)
