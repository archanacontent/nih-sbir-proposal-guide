// Runs the onboarding guide defined in guides/onboarding.json using Driver.js.
(function () {
  var GUIDE_URL = new URL("guides/onboarding.json", document.querySelector("base") ? document.baseURI : location.href).href;

  function storage(action, key, value) {
    try {
      if (action === "get") return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  function firstVisible(selectors) {
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el && el.getClientRects().length && el.offsetWidth > 0) return el;
    }
    return null;
  }

  function isTargetPage(pages) {
    return pages.some(function (p) {
      return p === "/" ? !!document.querySelector(".sbr-hero") : location.pathname.indexOf(p) !== -1;
    });
  }

  function buildSteps(guide) {
    return guide.steps.map(function (step) {
      var popover = {
        title: step.title,
        description: step.body,
        side: step.side || "bottom",
        align: "start",
        nextBtnText: step.nextLabel || "Next",
        doneBtnText: step.nextLabel || "Done"
      };
      if (step.type === "announcement") {
        popover.popoverClass = "sbr-tour sbr-tour--announce";
        popover.showButtons = ["next", "close"];
        return { popover: popover };
      }
      popover.popoverClass = "sbr-tour";
      var el = firstVisible(step.anchor || []);
      return el ? { element: el, popover: popover } : { popover: popover };
    });
  }

  function start(guide) {
    var tour = window.driver.js.driver({
      showProgress: true,
      progressText: "{{current}} of {{total}}",
      prevBtnText: "Back",
      overlayOpacity: 0.65,
      stagePadding: 6,
      stageRadius: 6,
      steps: buildSteps(guide),
      onDestroyed: function () { storage("set", guide.frequency.storageKey, "seen"); }
    });
    tour.drive();
  }

  function init() {
    if (!window.driver || !window.driver.js) return;
    fetch(GUIDE_URL)
      .then(function (r) { return r.json(); })
      .then(function (guide) {
        if (!isTargetPage(guide.targeting.pages)) return;
        var replay = document.querySelector(guide.frequency.replayElement);
        if (replay) replay.addEventListener("click", function (e) { e.preventDefault(); start(guide); });
        var seen = guide.frequency.showOnce && storage("get", guide.frequency.storageKey) === "seen";
        if (!seen) setTimeout(function () { start(guide); }, guide.targeting.delayMs || 0);
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
