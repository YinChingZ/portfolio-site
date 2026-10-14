(function () {
  "use strict";
  const P = window.PORTFOLIO;
  if (!P) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const W = P.works, n = W.length;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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
  // Pale tones so the photographs carry the colour (hero + works / process / about).
  const TONES = {
    1: ["#FFF7CF", "#E6F4FB", "#FCE8F0"], 2: ["#FFF3CC", "#E3F7F1", "#FDE6E7"], 3: ["#F8EEF0", "#FBE9EC", "#EEEAF6"],
    4: ["#E6F4FB", "#FFF7CF", "#FCE8F0"], 5: ["#E7F6EC", "#FFEEE3", "#E6F4FB"], 6: ["#EEE9F8", "#E6F4FB", "#FCE8F0"]
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

  $$("[data-artist]").forEach((e) => (e.textContent = P.artist));
  $("[data-sticker]").innerHTML = `
    <div class="spec">${pin(0, 24)}
      <h3>${esc(P.artist)}</h3>
      <p>${words[n] || n} photographs, ${P.year}</p>
      <p class="quote">“${esc(P.epigraph)}”</p>
      <p class="from">From the text for ${esc(P.epigraphSource)}</p>
      <div class="stamp-row"><span class="stamp">DO NOT LICK</span></div>
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
    const proc = w.process || [];
    inner.innerHTML = `
      <div class="detail-img"><img class="print" src="${img(w, 1000)}" srcset="${srcset(w)}" sizes="(max-width: 860px) 92vw, 52vw" width="1000" height="${Math.round(1000 / w.ratio)}" alt="${esc(w.alt)}" data-zoom="work"></div>
      <div class="detail-text">
        <p class="detail-no">${i + 1} / ${n}</p>
        <h2 class="detail-title" id="detail-title">${esc(w.title)}</h2>
        <ul class="chips" aria-label="Details"><li>${P.year}</li><li>${esc(w.medium)}</li><li>${esc(w.size)}</li></ul>
        ${w.materials ? `<div class="spec">${pin(i, 17)}<p><span class="k">Materials:</span> ${esc(w.materials)}</p></div>` : ""}
        <div class="desc">${w.description.split(/\n\s*\n/).map((t) => `<p>${esc(t.trim())}</p>`).join("")}</div>
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

  /* ---------- optional extra sections (e.g. Research) ---------- */
  $("[data-sections]").innerHTML = (P.sections || []).map((s, k) => `
    <section class="extra" id="${esc(s.id)}" data-tone="1" aria-labelledby="${esc(s.id)}-h">
      <div class="section-head"><h2 class="h2" id="${esc(s.id)}-h">${esc(s.label)}</h2></div>
      ${s.intro ? `<p class="group-intro"><span>${esc(s.intro)}</span></p>` : ""}
      <div class="masonry">${(s.items || []).map((it, j) => figure(it, j, "s" + k)).join("")}</div>
    </section>`).join("");

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
  let about = "";
  if (a.bio) about += a.bio.split(/\n\s*\n/).map((p) => `<p>${esc(p)}</p>`).join("");
  else if (P.showDraftNotes) about += '<p class="draft-note">Draft note: a short bio goes here, about 100 words in your own voice. Add it in data.js.</p>';
  if (a.email) about += `<p class="contact">Email <a href="mailto:${esc(a.email)}">${esc(a.email)}</a></p>`;
  if (a.instagram) about += `<p class="contact">Instagram ${esc(a.instagram)}</p>`;
  $("[data-about]").innerHTML = about;

  /* ---------- lightbox ---------- */
  const dlg = $(".lightbox"), stage = $(".lb-stage", dlg), lbImg = $("img", stage), lbTitle = $(".lb-title", dlg), lbRel = $("[data-lb-rel]", dlg);
  let list = [], idx = 0;
  const lists = {
    work: () => W.map((w) => ({ src: largest(w), alt: w.alt, title: w.title, flavor: w.flavor })),
    proc: () => (W[cur].process || []).map((p, j) => ({ src: p.src, alt: p.caption || "", title: `${W[cur].title}, process ${j + 1}`, flavor: W[cur].flavor, small: true }))
  };
  groups.forEach((g, k) => (lists["g" + k] = () => g.items.map((it, j) => ({ src: it.src, alt: it.caption || `${g.label}, photo ${j + 1}`, title: `${g.label} · ${j + 1} / ${g.items.length}`, flavor: "#FBF8FF", rel: it.related in bySlug ? it.related : null, small: true }))));
  (P.sections || []).forEach((s, k) => (lists["s" + k] = () => (s.items || []).map((it, j) => ({ src: it.src, alt: it.caption || "", title: `${s.label} ${j + 1}`, flavor: "#FBF8FF" }))));
  function lbShow() {
    const it = list[idx]; stage.classList.remove("zoomed"); dlg.classList.toggle("is-small", !!it.small);
    lbImg.src = it.src; lbImg.alt = it.alt; lbTitle.textContent = it.title;
    lbRel.hidden = !it.rel;
    if (it.rel) { lbRel.href = "#" + it.rel; lbRel.dataset.slug = it.rel; lbRel.textContent = `Related work: ${W[bySlug[it.rel]].title} →`; }
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
  lbRel.addEventListener("click", (e) => { e.preventDefault(); dlg.close(); openWork(bySlug[lbRel.dataset.slug]); });
  lbImg.addEventListener("click", () => stage.classList.toggle("zoomed"));
  stage.addEventListener("click", (e) => { if (e.target === stage) dlg.close(); });

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
