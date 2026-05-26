/**
 * ============================================================================
 * MOBILE NAVIGATION CONTROLLER & LAYOUT MANAGER
 * ============================================================================
 * 
 * Provides highly robust mobile menu navigation handling:
 * 1. Lightweight and responsive click toggles for the drawer and close states.
 * 2. Complete accessibility (ARIA labels, expanded states, keyboard ESC closers).
 * 3. Dynamic header sizing queries stored as CSS custom variables for layout calculations.
 * 4. Clean, standard CSS-driven scroll lock state preventing background page scroll.
 * 5. Safe, cross-device listener handling (tap and click events).
 */

(function () {
  "use strict";

  // --- CONFIGURATION & BREAKPOINTS ---
  var MOBILE_BREAKPOINT = 767;
  var mediaQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(max-width: " + MOBILE_BREAKPOINT + "px)")
    : null;

  // --- DOM ELEMENT REFERENCES ---
  var htmlElement   = document.documentElement;
  var siteHeader    = document.getElementById("site-header");
  var menuToggle    = document.getElementById("nav-toggle");
  var primaryNav    = document.getElementById("primary-nav");
  var navBackdrop   = document.getElementById("nav-backdrop");
  var themeToggle   = document.getElementById("theme-toggle");

  // Early exit if the critical DOM elements are missing
  if (!siteHeader || !menuToggle || !primaryNav) return;

  /**
   * Helper utility to identify if the current viewport is in mobile nav mode.
   * Cross-checks window width with native CSS matchMedia triggers.
   */
  function isMobileNavActive() {
    if (mediaQuery) {
      try {
        if (mediaQuery.matches) return true;
      } catch (error) {}
    }
    return (window.innerWidth || MOBILE_BREAKPOINT + 1) <= MOBILE_BREAKPOINT;
  }

  /**
   * Queries the exact physical height of the header element (to the pixel)
   * and sets a CSS variable `--site-header-bottom` on the HTML element root.
   * This is used by CSS to position the dropdown drawer and offset scroll paddings.
   */
  function syncHeaderHeightOffset() {
    try {
      var headerHeight = siteHeader.offsetHeight || Math.ceil(siteHeader.getBoundingClientRect().height);
      htmlElement.style.setProperty("--site-header-bottom", (headerHeight || 62) + "px");
    } catch (error) {
      console.warn("Failed to compute header offset height:", error);
    }
  }

  /**
   * Core state manager that transitions the mobile navigation between active/open
   * and inactive/closed states. Sanitizes accessibility nodes and backdrop visibility.
   * 
   * @param {Boolean} targetState - True to open the menu, False to close.
   */
  function setMenuState(targetState) {
    // Guard: Force close menu if viewport transitions to standard desktop wide resolutions
    if (!isMobileNavActive()) {
      targetState = false;
    }

    var currentState = siteHeader.classList.contains("is-nav-open");
    if (currentState === targetState) return;

    // Toggle stylesheet indicator classes
    siteHeader.classList.toggle("is-nav-open", targetState);
    htmlElement.classList.toggle("nav-open", targetState);

    // Update keyboard and screen-reader accessibility landmarks
    menuToggle.setAttribute("aria-expanded", targetState ? "true" : "false");
    menuToggle.setAttribute("aria-label", targetState ? "Close menu" : "Open menu");

    // Handle background dimming overlay element
    if (navBackdrop) {
      navBackdrop.classList.toggle("is-active", targetState);
      navBackdrop.setAttribute("aria-hidden", targetState ? "false" : "true");
    }

    // Refresh dynamic metrics on expand
    if (targetState) {
      syncHeaderHeightOffset();
    }
  }

  /**
   * Closes the mobile navigation drawer helper.
   */
  function closeMenu() {
    setMenuState(false);
  }

  /**
   * Toggles the mobile navigation drawer state helper.
   */
  function toggleMenu() {
    setMenuState(!siteHeader.classList.contains("is-nav-open"));
  }

  // --- EVENT LISTENERS & TRIGGERS ---

  // 1. Hamburger button click trigger
  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    if (!isMobileNavActive()) return;
    toggleMenu();
  });

  // 2. Dim backdrop click trigger (closes menu immediately on background tap)
  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  // 3. Document click-outside trigger (tapping main page nodes collapses open menu drawer)
  document.addEventListener("click", function (event) {
    if (!siteHeader.classList.contains("is-nav-open")) return;
    if (siteHeader.contains(event.target)) return;
    closeMenu();
  });

  // 4. Color-theme switch trigger (closes menu when light/dark toggle is tapped to prevent flash shifts)
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      if (isMobileNavActive() && siteHeader.classList.contains("is-nav-open")) {
        closeMenu();
      }
    });
  }

  // 5. Accessibility Escape keyboard listener
  document.addEventListener("keydown", function (event) {
    if ((event.key === "Escape" || event.key === "Esc") && siteHeader.classList.contains("is-nav-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // 6. Viewport resize and orientation changes
  function handleViewportChanges() {
    syncHeaderHeightOffset();
    if (!isMobileNavActive()) {
      closeMenu();
    }
  }

  window.addEventListener("resize", handleViewportChanges, { passive: true });
  window.addEventListener(
    "orientationchange",
    function () {
      // Delay recalculations slightly to allow browser window geometry to settle
      window.setTimeout(handleViewportChanges, 200);
    },
    { passive: true }
  );

  // 7. Visibility Change: Close menu drawer if tab is hidden/backgrounded
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      closeMenu();
    }
  });

  // 8. Navigation anchor item click hook (collapses menu and fires standard smooth navigation)
  var anchorLinks = primaryNav.querySelectorAll("a[href^='#']");
  for (var index = 0; index < anchorLinks.length; index++) {
    anchorLinks[index].addEventListener("click", function () {
      if (isMobileNavActive()) {
        closeMenu();
      }
    });
  }

  // --- INITIALIZATION SEQUENCE ---
  closeMenu();
  syncHeaderHeightOffset();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncHeaderHeightOffset);
  }
})();
