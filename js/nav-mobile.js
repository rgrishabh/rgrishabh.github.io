/**
 * Mobile hamburger: open/close primary nav, backdrop, escape, resize, link follow.
 */
(function () {
  "use strict";

  var mq = typeof window.matchMedia === "function" ? window.matchMedia("(max-width: 767px)") : null;

  function isMobileNav() {
    if (!mq) return false;
    try {
      return mq.matches;
    } catch (e) {
      return window.innerWidth <= 767;
    }
  }

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var backdrop = document.getElementById("nav-backdrop");

  if (!header || !toggle || !nav) return;

  function setOpen(open) {
    if (!isMobileNav()) {
      open = false;
    }
    header.classList.toggle("is-nav-open", open);
    document.documentElement.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (backdrop) {
      if (open) {
        backdrop.removeAttribute("hidden");
        backdrop.setAttribute("aria-hidden", "false");
      } else {
        backdrop.setAttribute("hidden", "");
        backdrop.setAttribute("aria-hidden", "true");
      }
    }
    if (open) {
      try {
        document.body.style.overflow = "hidden";
      } catch (e1) {}
    } else {
      try {
        document.body.style.overflow = "";
      } catch (e2) {}
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

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && header.classList.contains("is-nav-open")) {
      close();
      toggle.focus();
    }
  });

  if (mq && typeof mq.addEventListener === "function") {
    mq.addEventListener("change", function () {
      if (!isMobileNav()) {
        close();
      }
    });
  } else if (mq && typeof mq.addListener === "function") {
    mq.addListener(function () {
      if (!isMobileNav()) {
        close();
      }
    });
  }

  window.addEventListener(
    "resize",
    function () {
      if (!isMobileNav()) {
        close();
      }
    },
    { passive: true }
  );

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
