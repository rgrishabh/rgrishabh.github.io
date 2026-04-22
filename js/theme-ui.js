/**
 * Light/dark theme toggle, theme-color meta sync, footer year.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var meta = document.getElementById("theme-color-meta");
  var btn = document.getElementById("theme-toggle");

  function syncMeta() {
    if (!meta) return;
    var light = root.getAttribute("data-theme") === "light";
    meta.setAttribute("content", light ? "#f0f4fb" : "#060910");
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch (e) {}
    syncMeta();
    if (btn) btn.setAttribute("aria-pressed", next === "light" ? "true" : "false");
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  syncMeta();
  if (btn) btn.setAttribute("aria-pressed", root.getAttribute("data-theme") === "light" ? "true" : "false");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
