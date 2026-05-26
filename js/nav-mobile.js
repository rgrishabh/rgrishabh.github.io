/**
 * Mobile navigation — panel, backdrop, scroll lock.
 *
 * Scroll-lock strategy (cross-browser):
 *   iOS Safari ignores overflow:hidden on <html>/<body> when the page is
 *   already scrolled. The only reliable fix is position:fixed + scroll
 *   restoration. We save scrollY before locking, apply position:fixed, and
 *   restore the exact position after unlocking. We also temporarily disable
 *   scroll-behavior:smooth so window.scrollTo() jumps instantly.
 *
 * Tested: iOS Safari 15+, Android Chrome, Samsung Internet, Firefox, Safari.
 */
(function () {
  "use strict";

  /* ── Breakpoint ─────────────────────────────────────────────────────────── */
  var BP = 767;
  var mq =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(max-width: " + BP + "px)")
      : null;

  function isMobileNav() {
    if (mq) {
      try {
        if (mq.matches) return true;
      } catch (e) {}
    }
    return (window.innerWidth || BP + 1) <= BP;
  }

  /* ── DOM refs ───────────────────────────────────────────────────────────── */
  var header   = document.getElementById("site-header");
  var toggle   = document.getElementById("nav-toggle");
  var nav      = document.getElementById("primary-nav");
  var backdrop = document.getElementById("nav-backdrop");
  var themeBtn = document.getElementById("theme-toggle");
  var html     = document.documentElement;
  var body     = document.body;

  if (!header || !toggle || !nav) return;

  /* ── Scroll lock ────────────────────────────────────────────────────────── */
  var savedScrollY = 0;
  var isLocked = false;

  function lockScroll() {
    if (isLocked) return;
    // Read scroll position before any style change
    savedScrollY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    // position:fixed is the only reliable cross-browser scroll-lock
    // (iOS Safari 9-17 ignores overflow:hidden on scrolled pages)
    body.style.overflow    = "hidden";
    body.style.position    = "fixed";
    body.style.top         = "-" + savedScrollY + "px";
    body.style.left        = "0";
    body.style.right       = "0";
    body.style.width       = "100%";
    // Keep vertical scrollbar space to avoid layout shift on desktop
    body.style.overflowY   = "scroll";
    isLocked = true;
  }

  function unlockScroll() {
    if (!isLocked) return;

    // Remove all inline styles set by lockScroll
    body.style.overflow   = "";
    body.style.position   = "";
    body.style.top        = "";
    body.style.left       = "";
    body.style.right      = "";
    body.style.width      = "";
    body.style.overflowY  = "";
    isLocked = false;

    // Restore scroll position. We must disable scroll-behavior:smooth
    // temporarily — otherwise the browser animates the jump, causing the
    // visible "sticking" effect especially on mid-page opens.
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    try {
      window.scrollTo(0, savedScrollY);
    } catch (e) {
      document.documentElement.scrollTop = savedScrollY;
      document.body.scrollTop = savedScrollY; // Safari fallback
    }
    // Restore scroll-behavior after the next paint
    requestAnimationFrame(function () {
      html.style.scrollBehavior = prev || "";
      savedScrollY = 0;
    });
  }

  /* ── Header height CSS custom property ─────────────────────────────────── */
  function syncHeaderOffset() {
    try {
      var h = header.offsetHeight ||
              Math.ceil(header.getBoundingClientRect().height);
      html.style.setProperty("--site-header-bottom", (h || 62) + "px");
    } catch (e) {}
  }

  /* ── Open / close ───────────────────────────────────────────────────────── */
  function setOpen(open) {
    // Never open on desktop
    if (!isMobileNav()) open = false;

    var isOpen = header.classList.contains("is-nav-open");
    if (open === isOpen) return; // no-op if already in desired state

    header.classList.toggle("is-nav-open", open);
    html.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label",    open ? "Close menu" : "Open menu");

    if (backdrop) {
      backdrop.classList.toggle("is-active", open);
      backdrop.setAttribute("aria-hidden",  open ? "false" : "true");
    }

    if (open) {
      syncHeaderOffset();
      lockScroll();
    } else {
      unlockScroll();
    }
  }

  function close()      { setOpen(false); }
  function toggleMenu() { setOpen(!header.classList.contains("is-nav-open")); }

  /* ── Event listeners ────────────────────────────────────────────────────── */

  // Hamburger button
  toggle.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (!isMobileNav()) return;
    toggleMenu();
  });

  // Backdrop tap / click
  if (backdrop) {
    backdrop.addEventListener("click",      close);
    backdrop.addEventListener("touchstart", close, { passive: true });
  }

  // Tap / pointer outside header closes menu
  document.addEventListener("pointerdown", function (ev) {
    if (!header.classList.contains("is-nav-open")) return;
    if (header.contains(ev.target)) return;
    close();
  });

  // Touch outside header (covers browsers where pointerdown isn't reliable)
  document.addEventListener("touchstart", function (ev) {
    if (!header.classList.contains("is-nav-open")) return;
    if (header.contains(ev.target)) return;
    close();
  }, { passive: true });

  // Theme toggle closes menu on mobile
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      if (isMobileNav() && header.classList.contains("is-nav-open")) close();
    });
  }

  // Escape key
  document.addEventListener("keydown", function (ev) {
    if ((ev.key === "Escape" || ev.key === "Esc") &&
         header.classList.contains("is-nav-open")) {
      close();
      toggle.focus();
    }
  });

  // Tab out of menu closes it
  document.addEventListener("focusin", function (ev) {
    if (!header.classList.contains("is-nav-open")) return;
    if (!header.contains(ev.target)) close();
  });

  // Resize / orientation change
  function onViewportChange() {
    syncHeaderOffset();
    if (!isMobileNav()) close();
  }

  if (mq) {
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onViewportChange);
    } else if (typeof mq.addListener === "function") {
      // Legacy Safari / older browsers
      mq.addListener(onViewportChange);
    }
  }

  window.addEventListener("resize", onViewportChange, { passive: true });
  window.addEventListener(
    "orientationchange",
    function () { window.setTimeout(onViewportChange, 300); },
    { passive: true }
  );

  // Close & unlock when tab is backgrounded (prevents stale lock on return)
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") close();
  });

  // Page show (back-forward cache restore on iOS/Safari)
  window.addEventListener("pageshow", function (ev) {
    if (ev.persisted) {
      close();
      unlockScroll(); // ensure no stale body styles
    }
  });

  /* ── Initialise: clear any stale state ─────────────────────────────────── */
  // Run close() first so aria attributes are correct from the start
  header.classList.remove("is-nav-open");
  html.classList.remove("nav-open");
  if (backdrop) {
    backdrop.classList.remove("is-active");
    backdrop.setAttribute("aria-hidden", "true");
  }
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");

  // Clear any body styles left from a previous script run or hot reload
  isLocked = true;          // force the guard to pass
  savedScrollY = 0;
  unlockScroll();

  // Measure header after layout is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncHeaderOffset);
  } else {
    syncHeaderOffset();
  }

  /* ── Nav links close the drawer ─────────────────────────────────────────── */
  var links = nav.querySelectorAll("a[href^='#']");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      if (isMobileNav()) close();
    });
  }
})();
