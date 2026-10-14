"""Self-hosted web fonts → assets/fonts/*.woff2 (Latin subset), so the site never depends on Google Fonts
(which also doesn't load in mainland China).

Source: the Google Fonts repo (all fonts are SIL Open Font License). Needs:  pip install fonttools brotli
Usage:  python3 tools/build_fonts.py --src /path/to/google/fonts/ofl
"""
import argparse, os
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

# Basic Latin, Latin-1 (é, ×), common punctuation (’ “ ” – —), €, ™, arrows.
UNICODES = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD"
FONTS = [  # (source, output, weight range — or {axis: range/value} — to keep for variable fonts)
    ("rubik/Rubik-Italic[wght].ttf", "rubik-italic.woff2", (800, 900)),
    ("figtree/Figtree[wght].ttf", "figtree.woff2", (400, 800)),
    ("bagelfatone/BagelFatOne-Regular.ttf", "bagel-fat-one.woff2", None),
    ("courierprime/CourierPrime-Regular.ttf", "courier-prime.woff2", None),
    ("courierprime/CourierPrime-Bold.ttf", "courier-prime-bold.woff2", None),
    ("oleoscript/OleoScript-Bold.ttf", "oleo-script-bold.woff2", None),  # only used by title effect "C"
    # reading fonts for the artist's texts (data.js → textFont); a browser only downloads the one in use
    ("fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf", "fraunces.woff2", {"wght": (400, 700), "SOFT": 100, "WONK": 0}),
    ("fraunces/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf", "fraunces-italic.woff2", {"wght": (400, 700), "SOFT": 100, "WONK": 0}),
    ("literata/Literata[opsz,wght].ttf", "literata.woff2", (400, 700)),
    ("literata/Literata-Italic[opsz,wght].ttf", "literata-italic.woff2", (400, 700)),
    ("nunito/Nunito[wght].ttf", "nunito.woff2", (400, 800)),
    ("nunito/Nunito-Italic[wght].ttf", "nunito-italic.woff2", (400, 800)),
]

def main(src, out):
    os.makedirs(out, exist_ok=True)
    opts = subset.Options(); opts.flavor = "woff2"; opts.layout_features = ["*"]; opts.name_IDs = ["*"]; opts.notdef_outline = True
    for rel, name, wght in FONTS:
        font = TTFont(os.path.join(src, rel), lazy=False)
        sub = subset.Subsetter(opts); sub.populate(unicodes=subset.parse_unicodes(UNICODES)); sub.subset(font)
        if wght and "fvar" in font:  # keep only the weights the site uses
            font = instancer.instantiateVariableFont(font, wght if isinstance(wght, dict) else {"wght": wght})
        dest = os.path.join(out, name); font.flavor = "woff2"; font.save(dest)
        print(f"{name:28s} {os.path.getsize(dest) / 1024:6.1f} KB")

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--src", required=True); ap.add_argument("--out", default="assets/fonts")
    a = ap.parse_args(); main(a.src, a.out)
