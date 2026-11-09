// Application planner: counts planned applications against the HHS limit of nine per fiscal year.
(function () {
  var KEY = "nih-sbir-planner-v1";
  var LIMIT = 9;
  var TYPES = {
    p1: { label: "New Phase I", counts: true },
    ft: { label: "New Fast-Track", counts: true },
    d2: { label: "New Direct to Phase II", counts: true },
    rs: { label: "Resubmission (A1)", counts: true },
    ct: { label: "Contract proposal", counts: true },
    p2: { label: "Phase II after an awarded Phase I", counts: false }
  };
  var DATES = {
    "2027-01-05": { label: "January 5, 2027", start: "July 2027" },
    "2027-04-05": { label: "April 5, 2027", start: "December 2027" }
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(root, items) {
    var rows = root.querySelector("#pl-rows");
    var used = items.filter(function (i) { return TYPES[i.type].counts; }).length;
    root.querySelector("#pl-used").textContent = used;
    var bar = root.querySelector("#pl-bar");
    bar.style.width = Math.min(used / LIMIT, 1) * 100 + "%";
    bar.className = used > LIMIT ? "over" : used >= 7 ? "warn" : "";
    var status = root.querySelector("#pl-status");
    if (used > LIMIT) {
      status.textContent = (used - LIMIT) + " over the limit. HHS will not accept applications beyond nine in fiscal 2027.";
    } else if (used === LIMIT) {
      status.textContent = "All nine slots are committed. A new idea would have to replace a planned application.";
    } else {
      status.textContent = (LIMIT - used) + (LIMIT - used === 1 ? " slot remains" : " slots remain") + " for fiscal 2027.";
    }
    if (!items.length) {
      rows.innerHTML = '<tr class="empty"><td colspan="6">No applications added yet.</td></tr>';
      return;
    }
    rows.innerHTML = items.map(function (i, n) {
      var t = TYPES[i.type], d = DATES[i.date];
      return "<tr><td>" + esc(i.name) + "</td><td>" + t.label + "</td><td>" + d.label + "</td><td>" + d.start +
        "</td><td>" + (t.counts ? "Yes" : "No") + '</td><td><button type="button" data-n="' + n +
        '" aria-label="Remove ' + esc(i.name) + '">Remove</button></td></tr>';
    }).join("");
  }

  function init() {
    var root = document.querySelector(".sbr-planner");
    if (!root) return;
    var items = load();
    render(root, items);
    root.querySelector("#planner-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = root.querySelector("#pl-name").value.trim();
      if (!name) return;
      items.push({ name: name, type: root.querySelector("#pl-type").value, date: root.querySelector("#pl-date").value });
      save(items); render(root, items);
      root.querySelector("#pl-name").value = "";
    });
    root.querySelector("#pl-rows").addEventListener("click", function (e) {
      var n = e.target.getAttribute("data-n");
      if (n === null) return;
      items.splice(Number(n), 1); save(items); render(root, items);
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(init);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
