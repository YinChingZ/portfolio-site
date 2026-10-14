/*
  PopTitle.render(el, { lines: ["Please don’t", "lick the art"], unit: "letter" | "word" })
  Builds the markup that pop-title.css styles. Use unit "word" for script fonts so letters stay joined.
  Touch: tapping a letter presses it briefly (hover does this with a mouse).
*/
(function (global) {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function render(el, opts) {
    const o = Object.assign({ lines: ["Please don’t", "lick the art"], unit: "letter" }, opts || {});
    let i = 0;
    const unit = (t) => `<span class="pt-u" data-ch="${esc(t)}" style="--i:${i++}"><span class="pt-f">${esc(t)}</span></span>`;
    el.setAttribute("aria-label", o.lines.join(" "));
    el.innerHTML = o.lines.map((line) => `<span class="pt-line" aria-hidden="true">${
      line.split(" ").map((w) => `<span class="pt-word">${o.unit === "word" ? unit(w) : [...w].map(unit).join("")}</span>`).join(" ")
    }</span>`).join("");
    if (!el.dataset.ptTouch) {
      el.dataset.ptTouch = "1";
      el.addEventListener("touchstart", (e) => {
        const u = e.target.closest(".pt-u"); if (!u) return;
        u.classList.add("is-pressed"); setTimeout(() => u.classList.remove("is-pressed"), 260);
      }, { passive: true });
    }
  }
  global.PopTitle = { render };
})(window);
