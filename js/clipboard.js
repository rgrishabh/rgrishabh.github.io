/**
 * Copy-to-clipboard with execCommand fallback for older browsers.
 */
(function () {
  "use strict";

  function copyTextToClipboard(text, onDone) {
    function fallbackExecCommand() {
      var ta = document.createElement("textarea");
      var ok = false;
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(ta);
      ta.focus();
      if (ta.setSelectionRange) {
        ta.setSelectionRange(0, text.length);
      } else {
        ta.select();
      }
      try {
        ok = document.execCommand("copy");
      } catch (ex) {}
      document.body.removeChild(ta);
      onDone(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        var p = navigator.clipboard.writeText(text);
        if (p && typeof p.then === "function") {
          p.then(function () {
            onDone(true);
          }).catch(function () {
            fallbackExecCommand();
          });
        } else {
          onDone(true);
        }
      } catch (e1) {
        fallbackExecCommand();
      }
    } else {
      fallbackExecCommand();
    }
  }

  var copyBtn = document.getElementById("copy-email");
  var copyStatus = document.getElementById("copy-status");
  var emailAddr = "rgrishabh@yahoo.com";
  if (copyBtn && copyStatus) {
    copyBtn.addEventListener("click", function () {
      function done(ok) {
        copyStatus.textContent = ok
          ? "Email copied to clipboard."
          : "Select the address and copy manually (Cmd/Ctrl+C).";
        window.setTimeout(function () {
          copyStatus.textContent = "";
        }, 3200);
      }
      copyTextToClipboard(emailAddr, done);
    });
  }
})();
