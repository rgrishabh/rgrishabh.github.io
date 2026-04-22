/**
 * Calendar tenure from an internal anchor (not shown in UI) → hero, bento, contact blurb.
 */
(function () {
  "use strict";

  function experienceSinceSept2021() {
    var start = new Date(2021, 8, 1);
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
    if (parts.length === 0) return "0 months";
    return parts.join(" ");
  }

  var exp = experienceSinceSept2021();
  var expWords = formatExperienceWords(exp);
  var heroEl = document.getElementById("exp-hero");
  var bentoY = document.getElementById("exp-bento-y");
  var bentoM = document.getElementById("exp-bento-m");
  var contactBlurb = document.getElementById("exp-contact-blurb");
  if (heroEl) heroEl.textContent = expWords;
  if (bentoY) bentoY.textContent = String(exp.years);
  if (bentoM) bentoM.textContent = String(exp.months);
  if (contactBlurb) {
    contactBlurb.textContent = expWords + " in production-facing roles";
  }
})();
