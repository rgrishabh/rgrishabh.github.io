/**
 * Mobile navigation: panel, backdrop, scroll lock.
 */
(function () {
  "use strict";

  var BP = 767;
  var mq =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(max-width: " + BP + "px)")
      : null;

  function isMobileNav() {
    var w = typeof window.innerWidth === "number" ? window.innerWidth : BP + 1;
    if (mq) {
      try {
        if (mq.matches) return true;
      } catch (e1) {}
    }
    return w <= BP;
  }

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var backdrop = document.getElementById("nav-backdrop");
  var themeBtn = document.getElementById("theme-toggle");

  if (!header || !toggle || !nav) return;

  function syncHeaderOffset() {
    try {
      var h = header.offsetHeight;
      if (!h && header.getBoundingClientRect) {
        h = Math.ceil(header.getBoundingClientRect().height);
      }
      document.documentElement.style.setProperty("--site-header-bottom", (h || 56) + "px");
    } catch (e2) {}
  }

  function setOpen(open) {
    if (!isMobileNav()) {
      open = false;
    }
    header.classList.toggle("is-nav-open", open);
    document.documentElement.classList.toggle("nav-open", open);
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

  toggle.addEventListener("click", function () {
    if (!isMobileNav()) return;
    toggleMenu();
  });

  if (backdrop) {
    backdrop.addEventListener("click", close);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      if (isMobileNav() && header.classList.contains("is-nav-open")) {
        close();
      }
    });
  }

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && header.classList.contains("is-nav-open")) {
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

  if (mq && typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onViewportChange);
  } else if (mq && typeof mq.addListener === "function") {
    mq.addListener(onViewportChange);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncHeaderOffset);
  } else {
    syncHeaderOffset();
  }

  var links = nav.querySelectorAll("a[href^='#']");
  var i;
  for (i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      if (isMobileNav()) {
        close();
      }
    });
  }
})();
