const state = {
  view: "overview",
  range: 7,
  workspace: "northstar",
  notifications: 3,
  reportCount: 4,
  paused: false,
  tasks: [
    { id: 1, title: "Review enterprise renewal list", owner: "Mina", done: false },
    { id: 2, title: "Approve onboarding sequence", owner: "David", done: false },
    { id: 3, title: "Ship invoice retry update", owner: "Ari", done: true },
  ],
  deals: [
    { name: "Luna Retail", value: 42000, progress: 78 },
    { name: "HelioCloud", value: 31000, progress: 58 },
    { name: "BrightPath", value: 18500, progress: 36 },
  ],
};

const views = {
  overview: {
    eyebrow: "Executive command center",
    title: "Animate revenue, users, and operations in one place.",
    copy: "Track every moving part of your SaaS business with live filters, animated metrics, and fast team workflows.",
  },
  analytics: {
    eyebrow: "Product analytics",
    title: "Spot adoption patterns before the numbers go cold.",
    copy: "Compare account activity, feature usage, and revenue velocity across workspaces and time windows.",
  },
  billing: {
    eyebrow: "Billing operations",
    title: "Keep invoices, payments, and expansion revenue moving.",
    copy: "Monitor renewals, payment retries, and invoice risk with quick export and search controls.",
  },
  team: {
    eyebrow: "Team workspace",
    title: "Turn priorities into visible, finished work.",
    copy: "Coordinate owners, tasks, deals, and automation status without leaving the dashboard.",
  },
  automation: {
    eyebrow: "Lifecycle automation",
    title: "Control customer journeys with one responsive command surface.",
    copy: "Pause, resume, and inspect flows that drive activation, retention, and revenue recovery.",
  },
};

const workspaceMultipliers = {
  northstar: 1,
  atlas: 0.82,
  orbit: 1.22,
};

const chartLabels = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F"];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function formatMoney(value) {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toLocaleString()}`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function openModal(title, text, actions = []) {
  $("#modalTitle").textContent = title;
  $("#modalText").textContent = text;
  const actionWrap = $("#modalActions");
  actionWrap.innerHTML = "";

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = action.primary ? "primary-btn" : "outline-btn";
    button.textContent = action.label;
    button.addEventListener("click", () => {
      action.onClick?.();
      closeModal();
    });
    actionWrap.appendChild(button);
  });

  if (!actions.length) {
    const ok = document.createElement("button");
    ok.type = "button";
    ok.className = "primary-btn";
    ok.textContent = "Done";
    ok.addEventListener("click", closeModal);
    actionWrap.appendChild(ok);
  }

  $("#modal").hidden = false;
}

function closeModal() {
  $("#modal").hidden = true;
}

function setView(view) {
  state.view = view;
  const data = views[view];
  $("#viewEyebrow").textContent = data.eyebrow;
  $("#viewTitle").textContent = data.title;
  $("#viewCopy").textContent = data.copy;
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  closeSidebar();
  showToast(`${data.eyebrow} loaded`);
}

function metricBase() {
  const multiplier = workspaceMultipliers[state.workspace] * (state.range / 7) ** 0.23;
  return {
    revenue: 128400 * multiplier,
    users: 42810 * multiplier,
    churn: Math.max(1.6, 2.8 / multiplier),
    tickets: 1294 * multiplier,
  };
}

function animateNumber(element, target, formatter) {
  const start = Number(element.dataset.value || 0);
  const duration = 650;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (target - start) * eased;
    element.textContent = formatter(value);
    if (progress < 1) requestAnimationFrame(tick);
    else element.dataset.value = target;
  }

  requestAnimationFrame(tick);
}

function renderMetrics() {
  const metrics = metricBase();
  animateNumber($("#revenueValue"), metrics.revenue, formatMoney);
  animateNumber($("#usersValue"), metrics.users, (v) => Math.round(v).toLocaleString());
  animateNumber($("#churnValue"), metrics.churn, (v) => `${v.toFixed(1)}%`);
  animateNumber($("#ticketsValue"), metrics.tickets, (v) => Math.round(v).toLocaleString());
  $("#usageLabel").textContent = `${Math.round(58 + state.range / 3)}%`;
  $("#usageBar").style.width = `${Math.min(92, 58 + state.range / 3)}%`;
}

function renderChart() {
  const chart = $("#barChart");
  chart.innerHTML = "";
  const multiplier = workspaceMultipliers[state.workspace] * (state.range / 7) ** 0.18;
  chartLabels.forEach((label, index) => {
    const wave = Math.sin(index * 0.9 + state.range) * 18;
    const randomish = ((index * 17 + state.range * 3) % 28) - 8;
    const height = Math.max(18, Math.min(98, (45 + index * 3 + wave + randomish) * multiplier));
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.dataset.label = label;
    bar.style.height = `${height}%`;
    bar.style.animationDelay = `${index * 35}ms`;
    chart.appendChild(bar);
  });
  $("#chartCaption").textContent = `${state.range}-day recurring revenue for ${$("#workspaceSelect").selectedOptions[0].text}.`;
}

function renderFlows() {
  const flows = [
    { name: "Trial activation", status: state.paused ? "Paused" : "Running", progress: state.paused ? 44 : 84 },
    { name: "Invoice recovery", status: state.paused ? "Paused" : "Running", progress: state.paused ? 38 : 71 },
    { name: "Expansion prompts", status: state.paused ? "Paused" : "Running", progress: state.paused ? 29 : 63 },
  ];
  $("#flowList").innerHTML = flows
    .map(
      (flow) => `
        <div class="flow-item">
          <div class="flow-top">
            <span class="flow-title">${flow.name}</span>
            <span class="pill">${flow.status}</span>
          </div>
          <div class="progress"><span style="width:${flow.progress}%"></span></div>
        </div>
      `,
    )
    .join("");
  $("#pauseAllBtn").textContent = state.paused ? "Resume all" : "Pause all";
}

function renderDeals() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const deals = state.deals.filter((deal) => deal.name.toLowerCase().includes(query));
  $("#pipelineList").innerHTML = deals
    .map(
      (deal, index) => `
        <div class="deal-item">
          <div class="deal-top">
            <div>
              <div class="deal-title">${deal.name}</div>
              <small>${formatMoney(deal.value)} projected ARR</small>
            </div>
            <button class="outline-btn small deal-advance" data-index="${index}" type="button">Advance</button>
          </div>
          <div class="progress"><span style="width:${deal.progress}%"></span></div>
        </div>
      `,
    )
    .join("");

  $$(".deal-advance").forEach((button) => {
    button.addEventListener("click", () => {
      const visibleDeals = state.deals.filter((deal) => deal.name.toLowerCase().includes(query));
      const deal = visibleDeals[Number(button.dataset.index)];
      deal.progress = Math.min(100, deal.progress + 12);
      renderDeals();
      showToast(`${deal.name} advanced to ${deal.progress}%`);
    });
  });
}

function renderTasks() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const tasks = state.tasks.filter((task) => task.title.toLowerCase().includes(query) || task.owner.toLowerCase().includes(query));
  $("#taskList").innerHTML = tasks
    .map(
      (task) => `
        <button class="task-item ${task.done ? "done" : ""}" data-id="${task.id}" type="button">
          <span>
            <span class="task-title">${task.title}</span><br />
            <small>Owner: ${task.owner}</small>
          </span>
          <span class="pill">${task.done ? "Done" : "Open"}</span>
        </button>
      `,
    )
    .join("");

  $$(".task-item").forEach((button) => {
    button.addEventListener("click", () => {
      const task = state.tasks.find((item) => item.id === Number(button.dataset.id));
      task.done = !task.done;
      renderTasks();
      showToast(`${task.title} marked ${task.done ? "done" : "open"}`);
    });
  });
}

function renderAll() {
  renderMetrics();
  renderChart();
  renderFlows();
  renderDeals();
  renderTasks();
}

function exportCsv() {
  const rows = [
    ["Metric", "Value"],
    ["Revenue", $("#revenueValue").textContent],
    ["Users", $("#usersValue").textContent],
    ["Churn", $("#churnValue").textContent],
    ["Tickets", $("#ticketsValue").textContent],
  ];
  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pulseops-${state.workspace}-${state.range}d.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("CSV export started");
}

function openSidebar() {
  $("#sidebar").classList.add("open");
  $("#drawerBackdrop").classList.add("show");
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#drawerBackdrop").classList.remove("show");
}

function bindEvents() {
  $$(".nav-item").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));

  $$(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      state.range = Number(button.dataset.range);
      $$(".segment").forEach((segment) => segment.classList.toggle("active", segment === button));
      renderAll();
      showToast(`${state.range}-day range applied`);
    });
  });

  $("#workspaceSelect").addEventListener("change", (event) => {
    state.workspace = event.target.value;
    renderAll();
    showToast(`${event.target.selectedOptions[0].text} selected`);
  });

  $("#liveToggle").addEventListener("change", (event) => {
    document.body.classList.toggle("animations-off", !event.target.checked);
    showToast(`Live animation ${event.target.checked ? "enabled" : "paused"}`);
  });

  $("#searchInput").addEventListener("input", () => {
    renderDeals();
    renderTasks();
  });

  $("#themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    showToast(`${document.body.classList.contains("dark") ? "Dark" : "Light"} theme applied`);
  });

  $("#notifyBtn").addEventListener("click", () => {
    state.notifications = 0;
    $("#notificationDot").style.display = "none";
    openModal("Notifications", "All alerts are clear. Revenue automation and billing retries are running normally.");
  });

  $("#profileBtn").addEventListener("click", () => {
    openModal("Account", "Signed in as Olic Admin. Profile, security, and workspace preferences are ready.");
  });

  $("#upgradeBtn").addEventListener("click", () => {
    openModal("Upgrade plan", "Move to Scale for higher usage limits, priority automation, and advanced billing exports.", [
      { label: "Maybe later" },
      { label: "Upgrade now", primary: true, onClick: () => showToast("Scale plan selected") },
    ]);
  });

  $("#newReportBtn").addEventListener("click", () => {
    state.reportCount += 1;
    openModal("New report created", `Report #${state.reportCount} is ready with ${state.range}-day ${$("#workspaceSelect").selectedOptions[0].text} metrics.`);
  });

  $("#exportBtn").addEventListener("click", exportCsv);
  $("#shuffleChartBtn").addEventListener("click", () => {
    state.range = state.range === 90 ? 7 : state.range + 23;
    renderChart();
    showToast("Revenue chart refreshed");
  });

  $("#pauseAllBtn").addEventListener("click", () => {
    state.paused = !state.paused;
    renderFlows();
    showToast(`Automation flows ${state.paused ? "paused" : "resumed"}`);
  });

  $("#addDealBtn").addEventListener("click", () => {
    const next = state.deals.length + 1;
    state.deals.unshift({ name: `New Prospect ${next}`, value: 12000 + next * 3400, progress: 18 });
    renderDeals();
    showToast("New deal added to pipeline");
  });

  $("#clearDoneBtn").addEventListener("click", () => {
    const before = state.tasks.length;
    state.tasks = state.tasks.filter((task) => !task.done);
    renderTasks();
    showToast(`${before - state.tasks.length} completed task removed`);
  });

  $("#menuBtn").addEventListener("click", openSidebar);
  $("#drawerBackdrop").addEventListener("click", closeSidebar);
  $("#modalCloseBtn").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (event) => {
    if (event.target.id === "modal") closeModal();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeSidebar();
    }
  });
}

bindEvents();
renderAll();
