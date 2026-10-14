"""Bundle the static site into one page for the Claude artifact preview.

The real site (index.html + css + js + assets/) is what gets deployed. This writes preview/index.html
with all CSS and JS inlined and only the <body> content (the artifact host adds its own document
skeleton), plus preview/index_test.html for local headless checks.
Usage:  python3 tools/build_preview.py
"""
import pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
title = re.search(r"<title>.*?</title>", html, re.S).group(0)
fonts = "\n".join(re.findall(r'<link rel="(?:preconnect|stylesheet)" href="https://fonts[^>]*>', html))
css = "".join((root / m).read_text(encoding="utf-8") for m in re.findall(r'<link rel="stylesheet" href="([^":]+\.css)">', html))
body = re.search(r"<body>(.*)</body>", html, re.S).group(1)
body = re.sub(r'<script src="([^":]+\.js)"></script>', lambda m: "<script>\n" + (root / m.group(1)).read_text(encoding="utf-8") + "\n</script>", body)
out = f"{title}\n{fonts}\n<style>\n{css}\n</style>\n{body}"
dest = root / "preview" / "index.html"; dest.parent.mkdir(exist_ok=True); dest.write_text(out, encoding="utf-8")
(root / "preview" / "index_test.html").write_text(f'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="file://{root}/">' + out, encoding="utf-8")
print("wrote", dest, len(out))
