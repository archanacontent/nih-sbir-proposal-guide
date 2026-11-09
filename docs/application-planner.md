---
title: Application Planner
hide:
  - toc
---

# Application Planner

HHS accepts nine SBIR and STTR applications per company in each fiscal year, and the count covers new and resubmitted Phase I, Fast-Track and Direct to Phase II applications as well as contract proposals ([NOT-OD-26-090](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-26-090.html)). Enter every application your company plans for fiscal 2027 to see how many slots remain and the earliest month each award could start.

<div class="sbr-planner" markdown="0">
  <form id="planner-form" class="sbr-planner__form" autocomplete="off">
    <label>Project
      <input id="pl-name" type="text" maxlength="60" placeholder="Wearable sepsis monitor" required>
    </label>
    <label>Application type
      <select id="pl-type">
        <option value="p1">New Phase I</option>
        <option value="ft">New Fast-Track</option>
        <option value="d2">New Direct to Phase II</option>
        <option value="rs">Resubmission (A1)</option>
        <option value="ct">Contract proposal</option>
        <option value="p2">Phase II after an awarded Phase I</option>
      </select>
    </label>
    <label>Receipt date
      <select id="pl-date">
        <option value="2027-01-05">January 5, 2027</option>
        <option value="2027-04-05">April 5, 2027</option>
      </select>
    </label>
    <button type="submit" class="md-button md-button--primary">Add</button>
  </form>

  <div class="sbr-planner__meter" aria-live="polite">
    <div class="sbr-planner__count"><strong id="pl-used">0</strong> of 9 slots used</div>
    <div class="sbr-planner__bar"><span id="pl-bar"></span></div>
    <p id="pl-status" class="sbr-planner__status">9 slots remain for fiscal 2027.</p>
  </div>

  <table class="sbr-planner__table">
    <thead><tr><th>Project</th><th>Type</th><th>Receipt date</th><th>Earliest start</th><th>Counts</th><th></th></tr></thead>
    <tbody id="pl-rows"><tr class="empty"><td colspan="6">No applications added yet.</td></tr></tbody>
  </table>
</div>

Fiscal 2027 runs from October 1, 2026 to September 30, 2027. Earliest start dates come from the review cycles in [PA-27-100](https://files.simpler.grants.gov/opportunities/d1ba49e5-3684-4420-849a-ab2330ec493e/attachments/743ad4bd-fc28-450e-9249-1008f37490af/PA-27-100-Revised-Full-Announcement.html), which expires on April 6, 2027. Your entries stay in this browser and are never sent anywhere.
