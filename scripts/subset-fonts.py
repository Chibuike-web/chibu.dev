#!/usr/bin/env python3
"""Cut the site's fonts down to what it uses. Run by hand, commit the output.

    python -m pip install fonttools brotli
    python scripts/subset-fonts.py

Rerun when a new OpenType feature is turned on, or after adding a non-ASCII
character to app/ or components/. New characters go into the extended file:
copy its printed unicode-range into the @font-face rules in app/globals.css.
"""
from io import BytesIO
from pathlib import Path

from fontTools.merge import Merger
from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
INTER = ROOT / "assets/fonts/inter"
CAVEAT = ROOT / "assets/fonts/caveat"

ASCII = set(range(0x20, 0x7F))
PUNCTUATION = {0xA0, 0xA9, 0xB7, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026}
CORE = ASCII | PUNCTUATION
LATIN = set(range(0xA0, 0x180))

source_text = "".join(
    path.read_text(encoding="utf-8")
    for folder in ("app", "components")
    for path in (ROOT / folder).rglob("*")
    if path.suffix in {".ts", ".tsx", ".css"}
)
USED = {ord(char) for char in source_text if ord(char) > 0x7E}
EXTENDED = (LATIN | USED) - CORE

INTER_FEATURES = ["calt", "ccmp", "kern", "mark", "mkmk", "tnum"]
CAVEAT_FEATURES = ["calt", "kern", "liga", "mark", "mkmk"]


def subset(font, unicodes, features):
    options = Options()
    options.layout_features = features
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    options.notdef_outline = True
    options.hinting = False
    options.ignore_missing_unicodes = True
    subsetter = Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    return font


def reopen(font):
    buffer = BytesIO()
    font.save(buffer)
    buffer.seek(0)
    return TTFont(buffer)


def unicode_range(font):
    codes = sorted(font.getBestCmap())
    starts = [code for code in codes if code - 1 not in codes]
    ends = [code for code in codes if code + 1 not in codes]
    return ",".join(
        f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}"
        for start, end in zip(starts, ends)
    )


def write(font, path):
    font.flavor = "woff2"
    font.save(path)
    saved = TTFont(path)
    print(f"{path.name}: {path.stat().st_size} B, {saved['maxp'].numGlyphs} glyphs")
    print(f"  unicode-range: {unicode_range(saved)}")


def build_inter():
    # Keep the full axis ranges. Narrowing them re-rounds every variation delta, which moves
    # advance widths by 1/2048 em at in-between weights and sizes and shifts text on the page.
    source = TTFont(INTER / "InterVariable.woff2")
    source["fvar"].instances = []
    write(subset(reopen(source), CORE, INTER_FEATURES), INTER / "inter-core.woff2")
    write(subset(reopen(source), EXTENDED, INTER_FEATURES), INTER / "inter-extended.woff2")


def build_caveat():
    latin = CAVEAT / "Caveat-Medium-latin.woff2"
    latin_ext = CAVEAT / "Caveat-Medium-latin-ext.woff2"
    write(subset(TTFont(latin), CORE, CAVEAT_FEATURES), CAVEAT / "caveat-core.woff2")

    parts = []
    for source in (latin, latin_ext):
        part = subset(TTFont(source), EXTENDED, CAVEAT_FEATURES)
        part.flavor = None
        path = source.with_suffix(".ttf")
        part.save(path)
        parts.append(path)
    merged = Merger().merge([str(path) for path in parts])
    for path in parts:
        path.unlink()
    write(merged, CAVEAT / "caveat-extended.woff2")


build_inter()
build_caveat()
