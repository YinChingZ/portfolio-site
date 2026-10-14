"""Process-area photos (test shoots, studio outtakes, behind the scenes) → assets/more/.

Writes <group>-<nn>-600.webp and -1600.webp (no metadata) and _more.json (ratio, source file, related work).
Usage:  python3 tools/build_more.py --base "/Users/you/Downloads" --out assets/more
Edit GROUPS to change the selection or order. "related" is the slug of the work a photo belongs to.
"""
import argparse, json, os
from PIL import Image, ImageOps

GROUPS = {
 "test": ("素材from test shooting‼️", [
   ("IMG_4692.jpg", None), ("IMG_1248.JPG", "handful-of-sweetness"), ("IMG_1090.JPG", "tangled-treats"),
   ("IMG_0890.JPG", None), ("IMG_1068.JPG", "within-sweet-reach"), ("IMG_1232.JPG", "within-sweet-reach"),
   ("IMG_0960.JPG", "eye-candy"), ("IMG_1136.JPG", "sugared-smile"), ("IMG_1224.JPG", "lathered-whispers"),
   ("IMG_1216.JPG", None), ("IMG_0917.JPG", None), ("IMG_0930.JPG", None), ("IMG_1005.JPG", None),
   ("IMG_1156.JPG", None), ("IMG_1199.JPG", None), ("IMG_0884.JPG", None), ("IMG_1034.JPG", None), ("IMG_0974.JPG", None)]),
 "outtakes": ("Extra Photos", [
   ("0830拍摄-0299.jpg", None), ("0830拍摄-0461.jpg", None), ("0830拍摄-0466.jpg", None),
   ("0830拍摄-0012.jpg", "sugared-smile"), ("0830拍摄-0157.jpg", "sugared-smile"), ("0830拍摄-0193.jpg", "sugar-murmurs"),
   ("0830拍摄-0251.jpg", "candybound"), ("0830拍摄-0296.jpg", "candybound"), ("0830拍摄-0479.jpg", "tangled-treats"),
   ("0830拍摄-0343.jpg", "within-sweet-reach"), ("0830拍摄-0372.jpg", "within-sweet-reach"), ("0830拍摄-0039.jpg", "eye-candy")]),
 "bts": ("花絮", [
   ("0830拍摄-0444.jpg", None), ("IMG_1293.JPG", None), ("IMG_1276.JPG", None), ("IMG_1277 3.JPG", None),
   ("IMG_1278.JPG", None), ("IMG_1283.JPG", None), ("IMG_1274.JPG", "sugar-murmurs"), ("IMG_1269.JPG", "eye-candy"),
   ("IMG_1287.JPG", "within-sweet-reach"), ("IMG_1291.JPG", "tangled-treats"), ("IMG_1289.JPG", "cracked-and-crumbling"),
   ("IMG_1282.JPG", None), ("0830拍摄-0321.jpg", None), ("IMG_1286.JPG", None), ("IMG_1294.JPG", None)]),
}

def main(base, out):
    os.makedirs(out, exist_ok=True)
    man = {}
    for g, (folder, items) in GROUPS.items():
        res = []
        for n, (fn, rel) in enumerate(items, 1):
            im = Image.open(os.path.join(base, folder, fn))
            if im.format == "JPEG":
                W, H = im.size; im.draft("RGB", (1600, round(H * 1600 / W)))
            im = ImageOps.exif_transpose(im).convert("RGB"); W, H = im.size
            for w in (600, 1600):
                r = im if W <= w else im.resize((w, round(H * w / W)), Image.LANCZOS)
                r.save(os.path.join(out, f"{g}-{n:02d}-{w}.webp"), "WEBP", quality=80 if w == 600 else 82, method=6)
            res.append({"src": f"assets/more/{g}-{n:02d}-1600.webp", "thumb": f"assets/more/{g}-{n:02d}-600.webp",
                        "ratio": round(W / H, 4), "file": fn, "related": rel})
        man[g] = res; print(g, len(res))
    json.dump(man, open(os.path.join(out, "_more.json"), "w"), ensure_ascii=False, indent=1)

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--base", required=True); ap.add_argument("--out", required=True)
    a = ap.parse_args(); main(a.base, a.out)
