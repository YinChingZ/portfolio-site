"""Inline ../*.css and ../*.js references so a page can be published as a single artifact page.
Also writes <out>_test.html with local font files and a file:// base for headless checks.
Usage: python3 tools/inline.py titles/src.html titles/index.html
"""
import pathlib, re, sys
root = pathlib.Path(__file__).resolve().parent.parent
src_path, out_path = root / sys.argv[1], root / sys.argv[2]
html = src_path.read_text(encoding="utf-8")
def css(m): return "<style>\n" + (src_path.parent / m.group(1)).read_text(encoding="utf-8") + "\n</style>"
def js(m): return "<script>\n" + (src_path.parent / m.group(1)).read_text(encoding="utf-8") + "\n</script>"
html = re.sub(r'<link rel="stylesheet" href="(\.\./[^"]+\.css)">', css, html)
html = re.sub(r'<script src="(\.\./[^"]+\.js)"></script>', js, html)
out_path.write_text(html, encoding="utf-8")
G = "file:///home/claude/google/fonts/ofl"
fonts = f"""<style>
@font-face{{font-family:"Rubik";src:url("{G}/rubik/Rubik-Italic%5Bwght%5D.ttf");font-style:italic;font-weight:300 900}}
@font-face{{font-family:"Rubik";src:url("{G}/rubik/Rubik%5Bwght%5D.ttf");font-weight:300 900}}
@font-face{{font-family:"Oleo Script";src:url("{G}/oleoscript/OleoScript-Bold.ttf");font-weight:700}}
@font-face{{font-family:"Oleo Script";src:url("{G}/oleoscript/OleoScript-Regular.ttf");font-weight:400}}
@font-face{{font-family:"Bagel Fat One";src:url("{G}/bagelfatone/BagelFatOne-Regular.ttf")}}
@font-face{{font-family:"Figtree";src:url("{G}/figtree/Figtree%5Bwght%5D.ttf");font-weight:300 900}}
@font-face{{font-family:"Courier Prime";src:url("{G}/courierprime/CourierPrime-Regular.ttf")}}
@font-face{{font-family:"Courier Prime";src:url("{G}/courierprime/CourierPrime-Bold.ttf");font-weight:700}}
[hidden]{{display:none!important}}
</style>"""
test = f'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="file://{root}/">' + fonts + html
out_path.with_name(out_path.stem + "_test.html").write_text(test, encoding="utf-8")
print("ok", out_path, len(html))
