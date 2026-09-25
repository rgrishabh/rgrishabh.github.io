/**
 * Motion layer: scroll progress, cursor spotlight, typed terminal, counters,
 * tilt, magnetic buttons, staggered reveals.
 *
 * Every effect is additive — the page is complete and readable with this file
 * absent or blocked. Bails out entirely under prefers-reduced-motion.
 */
(function () {
  "use strict";

  var reduce = false;
  try {
    reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  var fine = true;
  try {
    fine = !window.matchMedia || window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  } catch (e) {}

  /* ---------------------------------------------------- staggered reveals */
  var staggers = document.querySelectorAll(".stagger");
  if (!reduce && typeof window.IntersectionObserver === "function") {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); so.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(staggers, function (el) { so.observe(el); });
  } else {
    Array.prototype.forEach.call(staggers, function (el) { el.classList.add("is-in"); });
  }

  if (reduce) { paintCounters(true); return; }

  /* ------------------------------------------------------ scroll progress */
  var bar = document.querySelector(".scroll-progress");
  if (bar) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------- cursor spotlight */
  var spot = document.querySelector(".spotlight");
  if (spot && fine) {
    window.addEventListener("pointermove", function (ev) {
      window.requestAnimationFrame(function () {
        spot.style.transform = "translate3d(" + (ev.clientX - 310) + "px," + (ev.clientY - 310) + "px,0)";
      });
    }, { passive: true });
  }

  /* --------------------------------------- pointer-tracked card highlight */
  Array.prototype.forEach.call(document.querySelectorAll(".project-card"), function (card) {
    card.addEventListener("pointermove", function (ev) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (ev.clientX - r.left) + "px");
      card.style.setProperty("--my", (ev.clientY - r.top) + "px");
    }, { passive: true });
  });

  /* ------------------------------------------------------------ 3D tilt */
  if (fine) {
    Array.prototype.forEach.call(document.querySelectorAll(".tilt"), function (el) {
      el.addEventListener("pointermove", function (ev) {
        var r = el.getBoundingClientRect();
        var rx = ((ev.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((ev.clientX - r.left) / r.width - 0.5) * 5;
        el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(0)";
      }, { passive: true });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });

    /* ------------------------------------------------- magnetic buttons */
    Array.prototype.forEach.call(document.querySelectorAll(".magnetic"), function (el) {
      el.addEventListener("pointermove", function (ev) {
        var r = el.getBoundingClientRect();
        el.style.transform = "translate(" + ((ev.clientX - r.left - r.width / 2) * 0.18) + "px," +
                                            ((ev.clientY - r.top - r.height / 2) * 0.3) + "px)";
      }, { passive: true });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------- counters */
  function paintCounters(instant) {
    var nums = document.querySelectorAll("[data-count]");
    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = (el.getAttribute("data-dec") | 0);
      var unit = el.getAttribute("data-unit") || "";
      if (instant) { el.innerHTML = target.toFixed(dec) + "<span class='unit'>" + unit + "</span>"; return; }
      var t0 = null, dur = 1500;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.innerHTML = (target * eased).toFixed(dec) + "<span class='unit'>" + unit + "</span>";
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    if (instant || typeof window.IntersectionObserver !== "function") {
      Array.prototype.forEach.call(nums, run);
      return;
    }
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(nums, function (el) { co.observe(el); });
  }
  paintCounters(false);

  /* ---------------------------------------------------- typed terminal */
  var term = document.getElementById("terminal-body");
  if (term) {
    var script = [
      { t: "$ ", c: "terminal__prompt", inst: true },
      { t: "kubectl get pods -n bhashini -l tier=inference\n", c: "" },
      { t: "asr-hi-7c9f   1/1   Running   0   6d\n", c: "terminal__dim", inst: true },
      { t: "tts-en-4b21   1/1   Running   0   6d\n", c: "terminal__dim", inst: true },
      { t: "nmt-22l-9ad   1/1   Running   0   6d\n\n", c: "terminal__dim", inst: true },
      { t: "$ ", c: "terminal__prompt", inst: true },
      { t: "argocd app sync infrasight\n", c: "" },
      { t: "✔ Synced        revision 64133b7\n", c: "terminal__ok", inst: true },
      { t: "✔ Healthy       5/5 services\n\n", c: "terminal__ok", inst: true },
      { t: "$ ", c: "terminal__prompt", inst: true },
      { t: "whoami\n", c: "" },
      { t: "rishabh — I keep the boring parts boring.\n", c: "terminal__ok", inst: true }
    ];
    var si = 0, ci = 0, cur = null;
    var caret = document.createElement("span");
    caret.className = "terminal__cursor";

    function tick() {
      if (si >= script.length) { term.appendChild(caret); return; }
      var part = script[si];
      if (!cur) {
        cur = document.createElement("span");
        cur.className = "terminal__line " + part.c;
        term.appendChild(cur);
      }
      if (part.inst) {
        cur.textContent = part.t; si++; cur = null;
        window.setTimeout(tick, 150);
        return;
      }
      cur.textContent = part.t.slice(0, ++ci);
      if (ci >= part.t.length) { si++; ci = 0; cur = null; window.setTimeout(tick, 380); return; }
      window.setTimeout(tick, 34);
    }

    if (typeof window.IntersectionObserver === "function") {
      var to = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { to.disconnect(); window.setTimeout(tick, 420); }
      }, { threshold: 0.3 });
      to.observe(term);
    } else { tick(); }
  }
})();
