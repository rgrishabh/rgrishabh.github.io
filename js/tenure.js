/**
 * Calendar tenure from an internal anchor (not shown in UI) → hero metric.
 */
(function () {
  "use strict";

  var CAREER_START = new Date(2021, 8, 1); // Sept 2021

  function experienceSince(start) {
    var now = new Date();
    var y = now.getFullYear() - start.getFullYear();
    var m = now.getMonth() - start.getMonth();
    var d = now.getDate() - start.getDate();
    if (d < 0) m--;
    if (m < 0) {
      y--;
      m += 12;
    }
    if (y < 0) {
      y = 0;
      m = 0;
    }
    return { years: y, months: m };
  }

  function formatExperienceWords(ym) {
    var parts = [];
    if (ym.years > 0) {
      parts.push(ym.years === 1 ? "1 year" : ym.years + " years");
    }
    if (ym.months > 0) {
      parts.push(ym.months === 1 ? "1 month" : ym.months + " months");
    }
    return parts.length ? parts.join(" ") : "0 months";
  }

  var heroEl = document.getElementById("exp-hero");
  if (heroEl) {
    heroEl.textContent = formatExperienceWords(experienceSince(CAREER_START));
  }
})();
