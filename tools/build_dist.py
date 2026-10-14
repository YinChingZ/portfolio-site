"""Collect exactly what the live site needs into dist/ — this folder is what you upload to Cloudflare Pages.

Copies the page, its css/js, fonts, favicon and only the images data.js actually uses
(nothing from preview/, titles/, tools/, notes or unused photos ends up online).
Usage:  python3 tools/build_dist.py            (run from the portfolio-site folder or anywhere)
"""
import pathlib, re, shutil

root = pathlib.Path(__file__).resolve().parent.parent
dist = root / "dist"
FILES = ["index.html", "fonts.css", "pop-title.css", "styles.css", "pop-title.js", "app.js", "data.js", "favicon.svg"]

data = re.sub(r"/\*.*?\*/", "", (root / "data.js").read_text(encoding="utf-8"), flags=re.S)  # ignore examples in comments
need = set(FILES)
need |= {str(p.relative_to(root)) for p in (root / "assets" / "fonts").glob("*")}
need |= set(re.findall(r'"(assets/[^"]+\.(?:webp|jpg|png))"', data))                      # process + Process-area photos
need |= {p.replace("-600.webp", "-sq.webp") for p in need if p.startswith("assets/more/") and p.endswith("-600.webp")}
for slug, widths in re.findall(r'slug:\s*"([^"]+)".*?widths:\s*\[([^\]]+)\]', data, re.S):  # the nine works, every size
    need |= {f"assets/works/{slug}-{w.strip()}.webp" for w in widths.split(",")}
need |= set(re.findall(r'content="(?:https://xiaoranhou.com/)?(assets/[^"]+)"', (root / "index.html").read_text(encoding="utf-8")))  # share image

missing = sorted(p for p in need if not (root / p).is_file())
if missing:
    raise SystemExit("Missing files (fix data.js or rebuild images first):\n  " + "\n  ".join(missing))
import filecmp
changed = 0
for rel in sorted(need):  # copy only what is new or different
    src, dst = root / rel, dist / rel
    if not dst.is_file() or not filecmp.cmp(src, dst, shallow=False):
        dst.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(src, dst); changed += 1
stale = [f for f in dist.rglob("*") if f.is_file() and str(f.relative_to(dist)) not in need]
for f in stale:  # files the site no longer uses
    try: f.unlink()
    except OSError: print("  could not remove (delete it by hand):", f.relative_to(root))
size = sum(f.stat().st_size for f in dist.rglob("*") if f.is_file())
print(f"dist/ ready: {len(need)} files ({changed} updated, {len(stale)} removed), {size / 1e6:.1f} MB  →  upload this folder to Cloudflare Pages")
