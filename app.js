(function () {
  "use strict";
  const P = window.PORTFOLIO;
  if (!P) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const W = P.works, n = W.length;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rich = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>"); // **key words**, *titles*
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
  const pinColors = ["#E8173F", "#4FC6EE", "#FFE14D", "#3DC96F", "#F4A9C0", "#7DB9FF", "#FF9A5E"];
  const pin = (i, size) => `<span class="pin" style="--pc:${pinColors[i % pinColors.length]}${size ? `;--ph:${size}px` : ""}" aria-hidden="true"></span>`;
  const squig = '<svg viewBox="0 0 48 16" aria-hidden="true"><path d="M2 8c4-6 8-6 12 0s8 6 12 0 8-6 12 0M38 3l7 5-7 5"/></svg>';
  const img = (w, size) => `assets/works/${w.slug}-${size}.webp`;
  const srcset = (w) => w.widths.map((x) => `${img(w, x)} ${x}w`).join(", ");
  const largest = (w) => img(w, w.widths[w.widths.length - 1]);
  const bySlug = Object.fromEntries(W.map((w, i) => [w.slug, i]));

  /* ---------- palette + title ---------- */
  const T = Object.assign({ effect: "A", palette: 1 }, P.title || {});
  const palClass = `pal-${T.palette}`;
  // One continuous backdrop: hero + works / process / about each have a tone; it fades between them.
  // Pale tones so the photographs carry the colour: hero + works / process / about / research / plans (palette 4 has all five).
  const TONES = {
    1: ["#FFF7CF", "#E6F4FB", "#FCE8F0"], 2: ["#FFF3CC", "#E3F7F1", "#FDE6E7"], 3: ["#F8EEF0", "#FBE9EC", "#EEEAF6"],
    4: ["#E6F4FB", "#FFF1C4", "#FBE4EE", "#DFF4E8", "#FFE8DA"], 5: ["#E7F6EC", "#FFEEE3", "#E6F4FB"], 6: ["#EEE9F8", "#E6F4FB", "#FCE8F0"]
  };
  const tones = TONES[T.palette] || TONES[1];
  const backdrop = $("[data-backdrop]");
  backdrop.style.setProperty("--tone", tones[0]);
  const titleEl = $("[data-title]");
  titleEl.className = `pt pt-${T.effect} ${palClass}${T.effect !== "A" ? " pt-dots" : ""}${T.outline ? "" : " pt-soft"}`;
  const lines = P.seriesTitle.slice();
  if (T.effect === "C") lines[lines.length - 1] = lines[lines.length - 1].replace(/!?$/, "!");
  if (T.side) titleEl.style.setProperty("--side", T.side);    // colour of the 3D depth (data.js → title.side)
  if (T.side2) titleEl.style.setProperty("--side2", T.side2);
  window.PopTitle.render(titleEl, { lines, unit: T.effect === "C" ? "word" : "letter" });
  const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const t0 = performance.now();
  document.title = P.seriesTitle.join(" ");
  if (P.textFont) document.documentElement.dataset.textfont = P.textFont; // font of the artist's texts (see styles.css)

  $$("[data-artist]").forEach((e) => (e.textContent = P.artist));
  $("[data-sticker]").innerHTML = `
    <div class="spec">${pin(0, 24)}
      <p class="medium">Digital photography, ${P.year}</p>
      <p class="quote">“${esc(P.epigraph)}”</p>
      <p class="from">From the text for ${esc(P.epigraphSource)}</p>
      <div class="stamp-row"><span class="stamp">DO NOT LICK</span><p class="sig"><span aria-hidden="true"></span>${esc(P.artist)}</p></div>
    </div>
    <a class="cue" href="#works"><span>Look, don’t lick</span>
      <svg viewBox="0 0 130 120" aria-hidden="true"><path d="M14 10c38-6 74 6 80 34 5 24-22 36-32 20-9-15 18-24 32-6 12 16 4 40-14 54"/><path d="M58 104l22 8 2-22"/></svg></a>`;
  $("[data-footer]").textContent = `© ${P.year} ${P.artist}. All photographs by the artist.`;

  /* ---------- nav ---------- */
  const navItems = [["Works", "#works"], ["Process", "#process"]].concat((P.sections || []).map((s) => [s.label, "#" + s.id]), [["About", "#about"]]);
  $("[data-nav]").innerHTML = navItems.map(([l, h]) => `<a href="${h}">${esc(l)}</a>`).join("");

  /* ---------- works board ---------- */
  const tilts = [-3, 2, -1.5, 2.5, -2, 3, -2.5, 1.5, -3];
  const board = $("[data-grid]");
  board.innerHTML = W.map((w, i) => `
    <li><button class="specimen" type="button" data-open="${i}" style="--rot:${tilts[i % tilts.length]}deg" aria-label="Open ${esc(w.title)}">${pin(i)}
      <img class="print" src="${img(w, 600)}" srcset="${img(w, 600)} 600w, ${img(w, 1000)} 1000w" sizes="(max-width: 560px) 31vw, 330px"
           width="600" height="${Math.round(600 / w.ratio)}" alt="${esc(w.alt)}" decoding="async" ${i > 5 ? 'loading="lazy"' : ""}>
      <span class="cap">${esc(w.title)}</span></button></li>`).join("");

  // Entrance: the title pops, the sticker is slapped on, then each work is pinned to the board as it comes into view
  // (row by row, left to right). Without JS or with reduced motion everything is simply there.
  if (motionOK && "IntersectionObserver" in window) {
    board.classList.add("pre");
    const io = new IntersectionObserver((entries) => {
      const shown = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      const base = Math.max(0, 1350 - (performance.now() - t0)); // first screen: wait for the sticker
      shown.forEach((li, j) => { li.style.setProperty("--dl", `${Math.round(base + j * 130)}ms`); li.classList.add("in"); io.unobserve(li); });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.12 });
    $$("li", board).forEach((li) => io.observe(li));
  }

  /* ---------- work detail ---------- */
  const detail = $("[data-detail]"), inner = $("[data-detail-inner]");
  let cur = -1, lastFocus = null;
  function renderDetail(i) {
    const w = W[i];
    detail.style.setProperty("--flavor", w.flavor);
    detail.style.setProperty("--mark", w.mark || "#FFE14D"); // key-word highlighter (data.js → mark)
    const proc = w.process || [];
    inner.innerHTML = `
      <div class="detail-img"><img class="print" src="${img(w, 1000)}" srcset="${srcset(w)}" sizes="(max-width: 860px) 92vw, 52vw" width="1000" height="${Math.round(1000 / w.ratio)}" alt="${esc(w.alt)}" data-zoom="work"></div>
      <div class="detail-text">
        <p class="detail-no">${i + 1} / ${n}</p>
        <h2 class="detail-title" id="detail-title">${esc(w.title)}</h2>
        <ul class="chips" aria-label="Details"><li>${P.year}</li><li>${esc(w.medium)}</li><li>${esc(w.size)}</li></ul>
        ${w.materials ? `<div class="spec">${pin(i, 17)}<p><span class="k">Materials:</span> ${esc(w.materials)}</p></div>` : ""}
        <div class="desc">${w.description.split(/\n\s*\n/).map((t) => `<p>${rich(t.trim())}</p>`).join("")}</div>
        ${proc.length ? `<p class="strip-h">Process</p><div class="strip">${proc.map((p, j) => `<button type="button" data-zoom="proc" data-j="${j}" aria-label="View process photo ${j + 1}"><img src="${p.thumb}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>` : ""}
        <div class="detail-next">
          <button class="link" type="button" data-d="next">${squig}<span>Next: ${esc(W[(i + 1) % n].title)}</span></button>
        </div>
      </div>`;
    detail.scrollTop = 0;
  }
  function openWork(i, fromHash) {
    cur = (i + n) % n;
    renderDetail(cur);
    if (detail.hidden) { lastFocus = document.activeElement; detail.hidden = false; document.documentElement.classList.add("no-scroll"); }
    $('[data-d="close"]', detail).focus({ preventScroll: true });
    if (!fromHash && location.hash !== "#" + W[cur].slug) { try { history.pushState(null, "", "#" + W[cur].slug); } catch (_) {} }
  }
  function closeWork(fromHash) {
    if (detail.hidden) return;
    detail.hidden = true; document.documentElement.classList.remove("no-scroll");
    const back = $(`.specimen[data-open="${cur}"]`);
    (back || lastFocus || document.body).focus({ preventScroll: true });
    if (back) back.scrollIntoView({ block: "center" });
    if (!fromHash) { try { history.pushState(null, "", "#works"); } catch (_) {} }
  }
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); openWork(+o.dataset.open); return; }
    const d = e.target.closest("[data-d]");
    if (d) { const a = d.dataset.d; if (a === "close") closeWork(); else openWork(cur + (a === "next" ? 1 : -1)); return; }
    const rel = e.target.closest("[data-rel]");
    if (rel) { e.preventDefault(); openWork(bySlug[rel.dataset.rel]); }
  });
  window.addEventListener("hashchange", () => {
    const s = location.hash.slice(1);
    if (s in bySlug) openWork(bySlug[s], true); else closeWork(true);
  });
  if (location.hash.slice(1) in bySlug) openWork(bySlug[location.hash.slice(1)], true);

  /* ---------- process: one small pinned contact sheet per group ---------- */
  const groups = P.process || [];
  $("[data-process-intro]").textContent = P.processIntro || "";
  const sheetTilt = [-1.6, 1.3, -0.9, 1.1];
  const sq = (it) => it.sq || it.thumb.replace(/-600\.webp$/, "-sq.webp");
  $("[data-sheets]").innerHTML = groups.map((g, k) => {
    const cols = Math.min(6, Math.max(3, Math.ceil(g.items.length / 3))); // aim for three rows
    return `
    <article class="sheet" style="--rot:${sheetTilt[k % sheetTilt.length]}deg;--cols:${cols}" aria-labelledby="sheet-${esc(g.id)}">${pin(k + 4, 18)}
      <div class="sheet-grid">${g.items.map((it, j) => `<button type="button" data-lbg="g${k}" data-k="${j}" aria-label="${esc(g.label)}, photo ${j + 1} of ${g.items.length}"><img src="${sq(it)}" alt="" width="240" height="240" loading="lazy" decoding="async"></button>`).join("")}</div>
      <div class="sheet-cap"><h3 id="sheet-${esc(g.id)}">${esc(g.label)} <small>${g.items.length}</small></h3>${g.intro ? `<p>${esc(g.intro)}</p>` : ""}</div>
    </article>`;
  }).join("");
  if (!groups.length) $("#process").hidden = true;
  const figure = (it, k, list) => `
    <figure style="--i:${k}">
      <button type="button" data-lbg="${list}" data-k="${k}" aria-label="View larger"><img src="${it.thumb}" alt="${esc(it.caption || "")}" loading="lazy" decoding="async" width="600" height="${Math.round(600 / it.ratio)}"></button>
      ${(it.caption || (it.related && it.related in bySlug)) ? `<figcaption>${it.caption ? `<span>${esc(it.caption)}</span>` : ""}${it.related && it.related in bySlug ? `<a href="#${it.related}" data-rel="${it.related}">→ ${esc(W[bySlug[it.related]].title)}</a>` : ""}</figcaption>` : ""}
    </figure>`;

  /* ---------- extra sections (Plans, later Research …) ---------- */
  const relLinks = (rel) => [].concat(rel || []).filter((r) => r in bySlug)
    .map((r) => `<a href="#${r}" data-rel="${r}">→ ${esc(W[bySlug[r]].title)}</a>`).join("");
  const tapes = ["#FFE14D", "#F6A9C9", "#9EDCF5", "#A8E6C1", "#FFC59E"];
  const strip = (s, k) => `
      <div class="pages-wrap">
        <ol class="pages" tabindex="0" aria-label="${esc(s.label)}, ${s.items.length} pages" data-pages>${s.items.map((it, j) => `
          <li class="page" style="--rot:${[-1.6, 1.2, -0.8, 1.6, -1.2][j % 5]}deg;--tape:${tapes[j % tapes.length]}">
            <button type="button" data-lbg="s${k}" data-k="${j}" aria-label="View “${esc(it.title || "")}” larger"><img src="${it.thumb}" alt="" width="600" height="450" loading="lazy" decoding="async"></button>
            <h3>${esc(it.title || "")}</h3>${it.note ? `<p>${esc(it.note)}</p>` : ""}${relLinks(it.related) ? `<p class="rel">${relLinks(it.related)}</p>` : ""}
          </li>`).join("")}
        </ol>
        <div class="pages-ctrl"><button class="candy" type="button" data-pages-go="-1" aria-label="Scroll back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button class="candy" type="button" data-pages-go="1" aria-label="Scroll forward"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>
      </div>`;

  /* ---------- research pages: drawn here (no images except crops of the nine works) ---------- */
  const CROP = { "eye-candy": "52% 47%", "sugar-murmurs": "44% 44%", "sugared-smile": "38% 40%", "handful-of-sweetness": "42% 32%",
    "candybound": "40% 55%", "cracked-and-crumbling": "40% 32%", "within-sweet-reach": "55% 38%", "lathered-whispers": "45% 55%", "tangled-treats": "45% 45%" };
  const disc = (slug, zoom) => `<span class="r-disc"><img src="assets/works/${slug}-600.webp" alt="" style="object-position:${CROP[slug] || "50% 50%"};transform-origin:${CROP[slug] || "50% 50%"};--z:${zoom || 1.6}" loading="lazy" decoding="async"></span>`;
  const VIS = {
    flavor: () => `<div class="r-flavor" aria-hidden="true">
        <svg viewBox="0 0 100 75"><defs><marker id="rf-a" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse"><path d="M0 0L6 3L0 6z"/></marker></defs>
          <path class="arc" d="M19 13 C 38 1, 62 1, 81 13"/><path class="arc" d="M19 62 C 38 74, 62 74, 81 62"/>
          <path class="arc" d="M8 28 C 4 38, 4 44, 8 52"/><path class="arc" d="M92 28 C 96 38, 96 44, 92 52"/>
          <path class="ar" d="M44 32 L37 26"/><path class="ar" d="M56 32 L63 26"/><path class="ar" d="M44 44 L37 50"/><path class="ar" d="M56 44 L63 50"/></svg>
        <span class="core">Flavor</span>
        <span class="bub" style="--x:31;--y:27">taste</span><span class="bub" style="--x:69;--y:27">aroma</span>
        <span class="bub" style="--x:31;--y:73">texture</span><span class="bub" style="--x:69;--y:73">tempera&shy;ture</span>
        <span class="route" style="--x:11;--y:19">${disc("eye-candy", 2.2)}<i>eyes</i></span><span class="route" style="--x:89;--y:19">${disc("sugar-murmurs", 1.25)}<i>ears</i></span>
        <span class="route" style="--x:11;--y:81">${disc("sugared-smile", 1.9)}<i>mouth</i></span><span class="route" style="--x:89;--y:81">${disc("handful-of-sweetness", 1.7)}<i>hands</i></span>
      </div>`,
    candy: () => `<div class="r-candy" aria-hidden="true">
        <div class="row"><span class="n">01</span><span class="lab">translucency</span><span class="gums"><i style="--c:#F2384F"></i><i style="--c:#FFC21A"></i><i style="--c:#45C26B"></i><i style="--c:#EDE7DA"></i></span></div>
        <div class="row"><span class="n">02</span><span class="lab">roundness</span><span class="lolly"><b></b><s></s></span><span class="dots"><i style="--c:#F2385E"></i><i style="--c:#FF8A2A"></i><i style="--c:#FFD233"></i><i style="--c:#6CC94B"></i></span></div>
      </div>`,
    textures: () => `<div class="r-tex" aria-hidden="true">
        <div class="sw">${[["candybound", "glossy &amp; translucent"], ["cracked-and-crumbling", "porous &amp; brittle"], ["within-sweet-reach", "soft &amp; yielding"]]
          .map(([slug, l]) => `<span>${disc(slug, 2.4)}<i>${l}</i></span>`).join("")}</div>
        <div class="wave"><svg viewBox="0 0 200 30" preserveAspectRatio="none"><path d="M0 15 ${Array.from({ length: 40 }, (_, i) => `L${i * 5 + 2.5} ${15 + (i % 2 ? -1 : 1) * (2 + ((i * 7) % 11) * (i > 12 && i < 30 ? 1.1 : .35))}`).join(" ")} L200 15"/></svg><i>crunch: the sound of a bite changes how crisp it seems</i></div>
      </div>`,
    works: (v) => `<div class="r-works">${v.slugs.filter((x) => x in bySlug).map((x, i) => `
        <a class="r-print" href="#${x}" data-rp-slug="${x}" style="--rot:${i % 2 ? 2.5 : -2}deg">${pin(i + 2, 16)}<img src="assets/works/${x}-600.webp" alt="${esc(W[bySlug[x]].title)}" loading="lazy" decoding="async"><span>→ ${esc(W[bySlug[x]].title)}</span></a>`).join("")}</div>`
  };
  const coverVis = (c) => c === "flavor" ? VIS.flavor() : c === "before"
    ? `<div class="r-before">${VIS.candy()}<div class="sw3">${["candybound", "cracked-and-crumbling", "within-sweet-reach"].map((x) => disc(x, 2.4)).join("")}</div></div>`
    : c && c.startsWith("work:") ? `<div class="r-cw">${pin(3, 12)}<img src="assets/works/${c.slice(5)}-600.webp" alt="" loading="lazy" decoding="async"></div>` : "";
  const researchStrip = (s, k) => `
      <div class="pages-wrap">
        <ol class="pages research-pages" tabindex="0" aria-label="${esc(s.label)}, ${s.items.length} pages" data-pages>${s.items.map((it, j) => `
          <li class="page rpage-card" style="--rot:${[-1.4, 1.1, -0.9, 1.5][j % 4]}deg;--tape:${tapes[(j + 2) % tapes.length]}">
            <button type="button" data-rs="${k}" data-j="${j}" aria-label="Read “${esc(it.title)}”">
              <span class="rcover cv-${esc((it.cover || "").split(":")[0])}" aria-hidden="true">
                <span class="k">${esc(it.kicker || "")}</span><span class="t">${esc(it.title)}</span>${it.subtitle ? `<span class="st">${esc(it.subtitle)}</span>` : ""}
                <span class="cv">${coverVis(it.cover)}</span>
              </span>
            </button>
            ${it.note ? `<p>${esc(it.note)}</p>` : ""}<p class="rel"><button type="button" class="read" data-rs="${k}" data-j="${j}">Read the page →</button></p>
          </li>`).join("")}
        </ol>
        <div class="pages-ctrl"><button class="candy" type="button" data-pages-go="-1" aria-label="Scroll back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button class="candy" type="button" data-pages-go="1" aria-label="Scroll forward"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>
      </div>`;
  const researchPage = (it, j, n) => `
      <header class="rp-head"><p class="k">${esc(it.kicker || "")}<span>${j + 1} / ${n}</span></p><h2 id="rdlg-h">${esc(it.title)}</h2>${it.subtitle ? `<p class="st">${esc(it.subtitle)}</p>` : ""}${it.ref ? `<p class="ref">${rich(it.ref)}</p>` : ""}</header>
      ${(it.groups || []).map((g) => `
      <section class="rp-group">${g.heading ? `<h3 class="rp-gh">${esc(g.heading)}</h3>` : ""}
        <div class="rp-grid">
          <div class="rp-text">${(g.blocks || []).map((b) => `<div class="rp-b"><p class="lab">${esc(b.label)}</p><p>${rich(b.text)}</p></div>`).join("")}</div>
          ${g.visual && VIS[g.visual.type] ? `<figure class="rp-vis">${VIS[g.visual.type](g.visual)}</figure>` : ""}
        </div>
      </section>`).join("")}
      <footer class="rp-foot">
        ${(it.sources || []).length ? `<div><p class="lab">Sources</p><ul>${it.sources.map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)} ↗</a></li>`).join("")}</ul></div>` : ""}
        ${relLinks(it.related) ? `<div><p class="lab">Related work</p><p class="rel">${[].concat(it.related).filter((r) => r in bySlug).map((r) => `<a href="#${r}" data-rp-slug="${r}">→ ${esc(W[bySlug[r]].title)}</a>`).join("")}</p></div>` : ""}
      </footer>`;
  $("[data-sections]").innerHTML = (P.sections || []).map((s, k) => `
    <section class="extra extra-${esc(s.layout || "masonry")}" id="${esc(s.id)}" data-tone="${s.tone ?? 1}" aria-labelledby="${esc(s.id)}-h">
      <div class="section-head center"><h2 class="h2" id="${esc(s.id)}-h">${esc(s.label)}</h2>${s.intro ? `<p class="lede">${esc(s.intro)}</p>` : ""}</div>
      ${s.layout === "strip" ? strip(s, k) : s.layout === "research" ? researchStrip(s, k) : `<div class="masonry">${(s.items || []).map((it, j) => figure(it, j, "s" + k)).join("")}</div>`}
    </section>`).join("");
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-pages-go]"); if (!b) return;
    const row = $("[data-pages]", b.closest(".pages-wrap"));
    row.scrollBy({ left: +b.dataset.pagesGo * row.clientWidth * 0.8, behavior: "smooth" });
  });

  /* ---------- backdrop tone follows the area in the middle of the screen ---------- */
  const toneAreas = $$("[data-tone]");
  let toneRaf = 0, lastTone = -1;
  function pickTone() {
    toneRaf = 0;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let t = 0;
    if (atBottom) t = +toneAreas[toneAreas.length - 1].dataset.tone;
    else toneAreas.forEach((s) => { if (s.getBoundingClientRect().top < window.innerHeight * 0.55) t = +s.dataset.tone; });
    if (t !== lastTone) { lastTone = t; backdrop.style.setProperty("--tone", tones[t] || tones[0]); }
  }
  window.addEventListener("scroll", () => { if (!toneRaf) toneRaf = requestAnimationFrame(pickTone); }, { passive: true });
  window.addEventListener("resize", pickTone);
  pickTone();

  /* ---------- about ---------- */
  const a = P.about || {};
  if (a.heading) $("#about-h").textContent = a.heading;
  let about = "";
  if (a.bio) about += a.bio.split(/\n\s*\n/).map((p) => `<p>${esc(p)}</p>`).join("");
  else if (P.showDraftNotes) about += '<p class="draft-note">Draft note: a short bio goes here, about 100 words in your own voice. Add it in data.js.</p>';
  if ((a.photos || []).length) $("[data-about-photos]").innerHTML = `<div class="about-photos">${a.photos.map((ph, i) => `
    <figure class="snap ${(ph.w || 1) >= (ph.h || 1) ? "wide" : "tall"}" style="--rot:${i % 2 ? 3.5 : -3}deg">${pin(i + 1, 18)}
      <img src="${esc(ph.src)}" alt="${esc(ph.alt || "")}" width="${ph.w || 600}" height="${ph.h || 600}" loading="lazy" decoding="async">${ph.caption ? `<figcaption>${esc(ph.caption)}</figcaption>` : ""}
    </figure>`).join("")}</div>`;
  if (a.email) about += `<p class="contact">Email <a href="mailto:${esc(a.email)}">${esc(a.email)}</a></p>`;
  if (a.instagram) about += `<p class="contact">Instagram ${esc(a.instagram)}</p>`;
  $("[data-about]").innerHTML = about;

  /* ---------- lightbox ---------- */
  const dlg = $(".lightbox"), stage = $(".lb-stage", dlg), lbImg = $("img", stage), lbTitle = $(".lb-title", dlg), lbRels = $("[data-lb-rels]", dlg);
  let list = [], idx = 0;
  const lists = {
    work: () => W.map((w) => ({ src: largest(w), alt: w.alt, title: w.title, flavor: w.flavor })),
    proc: () => (W[cur].process || []).map((p, j) => ({ src: p.src, alt: p.caption || "", title: `${W[cur].title}, process ${j + 1}`, flavor: W[cur].flavor, small: true }))
  };
  groups.forEach((g, k) => (lists["g" + k] = () => g.items.map((it, j) => ({ src: it.src, alt: it.caption || `${g.label}, photo ${j + 1}`, title: `${g.label} · ${j + 1} / ${g.items.length}`, flavor: "#FBF8FF", rel: it.related in bySlug ? it.related : null, small: true }))));
  (P.sections || []).forEach((s, k) => (lists["s" + k] = () => (s.items || []).map((it, j) => ({ src: it.src, alt: it.note || it.caption || "", title: it.title ? `${s.label} · ${it.title}` : `${s.label} ${j + 1}`, flavor: "#FBF8FF", rel: it.related }))));
  function lbShow() {
    const it = list[idx]; stage.classList.remove("zoomed"); dlg.classList.toggle("is-small", !!it.small);
    lbImg.src = it.src; lbImg.alt = it.alt; lbTitle.textContent = it.title;
    const rels = [].concat(it.rel || []).filter((r) => r in bySlug);
    lbRels.hidden = !rels.length;
    lbRels.innerHTML = rels.length ? "Related work: " + rels.map((r) => `<a class="lb-rel" href="#${r}" data-lb-slug="${r}">${esc(W[bySlug[r]].title)} →</a>`).join(" ") : "";
    dlg.style.setProperty("--flavor", it.flavor);
    $$('[data-lb="prev"], [data-lb="next"]', dlg).forEach((b) => (b.hidden = list.length < 2));
  }
  function lbOpen(name, i) { list = lists[name](); idx = i; lbShow(); if (!dlg.open) dlg.showModal(); }
  document.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (z) { if (z.dataset.zoom === "work") lbOpen("work", cur); else lbOpen("proc", +z.dataset.j); return; }
    const g = e.target.closest("[data-lbg]");
    if (g) lbOpen(g.dataset.lbg, +g.dataset.k);
  });
  $('[data-lb="prev"]', dlg).addEventListener("click", () => { idx = (idx - 1 + list.length) % list.length; lbShow(); });
  $('[data-lb="next"]', dlg).addEventListener("click", () => { idx = (idx + 1) % list.length; lbShow(); });
  $('[data-lb="close"]', dlg).addEventListener("click", () => dlg.close());
  lbRels.addEventListener("click", (e) => { const l = e.target.closest("[data-lb-slug]"); if (!l) return; e.preventDefault(); dlg.close(); openWork(bySlug[l.dataset.lbSlug]); });
  lbImg.addEventListener("click", () => stage.classList.toggle("zoomed"));
  stage.addEventListener("click", (e) => { if (e.target === stage) dlg.close(); });


  /* ---------- research page viewer ---------- */
  const rdlg = $("[data-rdlg]"), rbody = $("[data-rpage]", rdlg);
  let rsec = 0, rj = 0;
  function rShow() {
    const s = P.sections[rsec], it = s.items[rj];
    rbody.innerHTML = researchPage(it, rj, s.items.length); rdlg.scrollTop = 0; rbody.scrollTop = 0;
  }
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-rs]");
    if (o) { rsec = +o.dataset.rs; rj = +o.dataset.j; rShow(); if (!rdlg.open) rdlg.showModal(); return; }
    const l = e.target.closest("[data-rp-slug]");
    if (l && rdlg.open) { e.preventDefault(); rdlg.close(); openWork(bySlug[l.dataset.rpSlug]); }
  });
  const rStep = (d) => { const n = P.sections[rsec].items.length; rj = (rj + d + n) % n; rShow(); };
  $('[data-rd="prev"]', rdlg).addEventListener("click", () => rStep(-1));
  $('[data-rd="next"]', rdlg).addEventListener("click", () => rStep(1));
  $('[data-rd="close"]', rdlg).addEventListener("click", () => rdlg.close());
  rdlg.addEventListener("click", (e) => { if (e.target === rdlg) rdlg.close(); });
  rdlg.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") rStep(-1); if (e.key === "ArrowRight") rStep(1); });

  /* ---------- keyboard ---------- */
  document.addEventListener("keydown", (e) => {
    if (dlg.open) {
      if (e.key === "ArrowLeft" && list.length > 1) { idx = (idx - 1 + list.length) % list.length; lbShow(); }
      if (e.key === "ArrowRight" && list.length > 1) { idx = (idx + 1) % list.length; lbShow(); }
      return;
    }
    if (detail.hidden) return;
    if (e.key === "Escape") closeWork();
    if (e.key === "ArrowLeft") openWork(cur - 1);
    if (e.key === "ArrowRight") openWork(cur + 1);
    if (e.key === "Tab") { // keep focus inside the detail view
      const f = $$("button, a[href]", detail).filter((x) => !x.hidden && x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
})();
