/**
 * Scroll-triggered section reveals; respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  var reveals = document.querySelectorAll(".reveal");
  var r;
  for (r = 0; r < reveals.length; r++) {
    reveals[r].classList.add("reveal--pending");
  }

  var reduceMotion = false;
  try {
    if (window.matchMedia) {
      reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  } catch (mqErr) {}

  if (!reduceMotion && typeof window.IntersectionObserver === "function") {
    var observer = new window.IntersectionObserver(
      function (entries) {
        var i;
        for (i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("reveal--visible");
            entries[i].target.classList.remove("reveal--pending");
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    for (r = 0; r < reveals.length; r++) {
      observer.observe(reveals[r]);
    }
  } else {
    for (r = 0; r < reveals.length; r++) {
      reveals[r].classList.add("reveal--visible");
      reveals[r].classList.remove("reveal--pending");
    }
  }
})();
