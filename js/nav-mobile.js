/**
 * Mobile navigation: panel toggle and simple scroll lock.
 *
 * Optimized scroll-lock:
 *   Instead of overriding window.scrollTo (which breaks smooth anchor navigation),
 *   we toggle the `nav-open` class on `<html>` and let CSS handle the scroll lock cleanly.
 *   This is robust, fast, side-effect free, and works on all modern Android/iOS browsers.
 */
(function () {
  "use strict";

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

  var header   = document.getElementById("site-header");
  var toggle   = document.getElementById("nav-toggle");
  var nav      = document.getElementById("primary-nav");
  var backdrop = document.getElementById("nav-backdrop");
  var themeBtn = document.getElementById("theme-toggle");
  var html     = document.documentElement;

  if (!header || !toggle || !nav) return;

  function syncHeaderOffset() {
    try {
      var h = header.offsetHeight || Math.ceil(header.getBoundingClientRect().height);
      html.style.setProperty("--site-header-bottom", (h || 62) + "px");
    } catch (e) {}
  }

  function setOpen(open) {
    if (!isMobileNav()) open = false;

    var isOpen = header.classList.contains("is-nav-open");
    if (open === isOpen) return;

    header.classList.toggle("is-nav-open", open);
    html.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (backdrop) {
      backdrop.classList.toggle("is-active", open);
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }

    if (open) {
      syncHeaderOffset();
    }
  }

  function close() {
    setOpen(false);
  }

  function toggleMenu() {
    setOpen(!header.classList.contains("is-nav-open"));
  }

  // Use clean click listeners; browsers safely map taps to click events with no delay now
  toggle.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (!isMobileNav()) return;
    toggleMenu();
  });

  if (backdrop) {
    backdrop.addEventListener("click", close);
  }

  // Tap outside header closes the menu
  document.addEventListener("click", function (ev) {
    if (!header.classList.contains("is-nav-open")) return;
    if (header.contains(ev.target)) return;
    close();
  });

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      if (isMobileNav() && header.classList.contains("is-nav-open")) {
        close();
      }
    });
  }

  // Keyboard accessibility
  document.addEventListener("keydown", function (ev) {
    if ((ev.key === "Escape" || ev.key === "Esc") && header.classList.contains("is-nav-open")) {
      close();
      toggle.focus();
    }
  });

  function onViewportChange() {
    syncHeaderOffset();
    if (!isMobileNav()) {
      close();
    }
  }

  if (mq) {
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onViewportChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onViewportChange);
    }
  }

  window.addEventListener("resize", onViewportChange, { passive: true });
  window.addEventListener(
    "orientationchange",
    function () {
      window.setTimeout(onViewportChange, 200);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      close();
    }
  });

  // Initial state setup
  close();
  syncHeaderOffset();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncHeaderOffset);
  }

  // Navigation link click transitions
  var links = nav.querySelectorAll("a[href^='#']");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      if (isMobileNav()) {
        close();
      }
    });
  }
})();
