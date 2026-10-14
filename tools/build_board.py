"""Inline data.js and jelly-title.js into directions2/index.html for the artifact preview."""
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "directions2" / "src.html").read_text(encoding="utf-8")
for name in ("data.js", "jelly-title.js"):
    src = src.replace(f'<script src="../{name}"></script>', "<script>\n" + (root / name).read_text(encoding="utf-8") + "\n</script>")
(root / "directions2" / "index.html").write_text(src, encoding="utf-8")
G = "file:///home/claude/google/fonts/ofl"
local_fonts = f"""<style>
@font-face{{font-family:"Rubik";src:url("{G}/rubik/Rubik-Italic%5Bwght%5D.ttf");font-style:italic;font-weight:300 900}}
@font-face{{font-family:"Bagel Fat One";src:url("{G}/bagelfatone/BagelFatOne-Regular.ttf")}}
@font-face{{font-family:"Figtree";src:url("{G}/figtree/Figtree%5Bwght%5D.ttf");font-weight:300 900}}
@font-face{{font-family:"Courier Prime";src:url("{G}/courierprime/CourierPrime-Regular.ttf")}}
@font-face{{font-family:"Courier Prime";src:url("{G}/courierprime/CourierPrime-Bold.ttf");font-weight:700}}
</style>"""
test = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="file://%s/">' % root + local_fonts + src
(root / "directions2" / "_test.html").write_text(test, encoding="utf-8")
print("ok", len(src))
