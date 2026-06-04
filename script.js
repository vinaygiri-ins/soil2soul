const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const refreshButton = document.getElementById("refreshButton");
const plotButtons = document.querySelectorAll(".plot-zone");
const plotChips = document.querySelectorAll("[data-plot-chip]");
const plotPrevButton = document.getElementById("plotPrevButton");
const plotNextButton = document.getElementById("plotNextButton");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const sensorRanges = {
  moisture: [62, 76],
  temperature: [27, 33],
  humidity: [55, 70],
  ph: [6.4, 7.1],
};

function randomInRange([min, max], decimals = 0) {
  const value = min + Math.random() * (max - min);
  return value.toFixed(decimals);
}

function refreshDemoFeed() {
  const moistureValue = document.getElementById("moistureValue");
  const temperatureValue = document.getElementById("temperatureValue");
  const humidityValue = document.getElementById("humidityValue");
  const phValue = document.getElementById("phValue");

  if (!moistureValue || !temperatureValue || !humidityValue || !phValue) {
    return;
  }

  moistureValue.textContent = `${randomInRange(sensorRanges.moisture)}%`;
  temperatureValue.textContent = `${randomInRange(sensorRanges.temperature)}°C`;
  humidityValue.textContent = `${randomInRange(sensorRanges.humidity)}%`;
  phValue.textContent = randomInRange(sensorRanges.ph, 1);
}

if (refreshButton) {
  refreshButton.addEventListener("click", refreshDemoFeed);
}

const plotContent = {
  A: {
    title: "Plot A",
    position: "Top right project zone",
    scope: "Field section 2 of 4 in the Soil to Soul land workspace.",
    area: "3,758.49 m²",
    state: "Observation-ready",
    condition: "This section is reserved as an individual project block and can later show exact dimensions, soil readings, crop plan, and current field condition.",
    cycle: "Independent organic crop cycle with its own sowing, observation, and harvest timeline.",
    website: "This plot can display moisture data, crop stage, field notes, and proof records for customers."
  },
  B: {
    title: "Plot B",
    position: "Bottom right project zone",
    scope: "Field section 4 of 4 in the Soil to Soul land workspace.",
    area: "3,758.49 m²",
    state: "Section mapping complete",
    condition: "This area is marked as a separate farming unit in the MVP so the website can later show its present condition and crop-specific updates clearly.",
    cycle: "Planned as a separate cycle for crop scheduling, harvest planning, and packaging visibility.",
    website: "This plot can later show daily field activity, current crop, and section-wise trust records."
  },
  C: {
    title: "Plot C",
    position: "Bottom left project zone",
    scope: "Field section 3 of 4 in the Soil to Soul land workspace.",
    area: "3,758.49 m²",
    state: "Baseline setup",
    condition: "This section is currently presented as a project box under initial planning and can later reflect real soil and cultivation status once you provide the data.",
    cycle: "Dedicated cycle space for one crop plan, with separate logs for irrigation, compost, and growth updates.",
    website: "This plot can later show dimensions, present condition, and crop progress for direct customer trust."
  },
  D: {
    title: "Plot D",
    position: "Top left project zone",
    scope: "Field section 1 of 4 in the Soil to Soul land workspace.",
    area: "3,758.49 m²",
    state: "Baseline mapping",
    condition: "This section is currently shown as a mapped project block and is ready for soil, crop, and activity details to be attached later.",
    cycle: "Cycle planning and section definition for the first organic season.",
    website: "Section-wise dimensions, crop cycle, soil health notes, field photos, and sensor-linked updates."
  }
};

const plotOrder = ["D", "A", "C", "B"];
let activePlotKey = "D";

function updatePlotPanel(plotKey) {
  const plot = plotContent[plotKey];

  if (!plot) {
    return;
  }

  const plotTitle = document.getElementById("plotTitle");
  const plotPosition = document.getElementById("plotPosition");
  const plotScope = document.getElementById("plotScope");
  const plotArea = document.getElementById("plotArea");
  const plotState = document.getElementById("plotState");
  const plotCondition = document.getElementById("plotCondition");
  const plotCycle = document.getElementById("plotCycle");
  const plotWebsite = document.getElementById("plotWebsite");
  const plotIndex = document.getElementById("plotIndex");

  if (!plotTitle || !plotPosition || !plotScope || !plotArea || !plotState || !plotCondition || !plotCycle || !plotWebsite || !plotIndex) {
    return;
  }

  activePlotKey = plotKey;

  plotTitle.textContent = plot.title;
  plotPosition.textContent = plot.position;
  plotScope.textContent = plot.scope;
  plotArea.textContent = plot.area;
  plotState.textContent = plot.state;
  plotCondition.textContent = plot.condition;
  plotCycle.textContent = plot.cycle;
  plotWebsite.textContent = plot.website;
  plotIndex.textContent = `${plotOrder.indexOf(plotKey) + 1} / ${plotOrder.length}`;

  plotButtons.forEach((button) => {
    const isActive = button.dataset.plot === plotKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  plotChips.forEach((button) => {
    const target = button.dataset.plotChip;
    const isActive = target === plotKey;
    button.classList.toggle("is-active", isActive);
    if (button.classList.contains("plot-chip")) {
      button.setAttribute("aria-selected", String(isActive));
    }
  });
}

if (plotButtons.length > 0) {
  plotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updatePlotPanel(button.dataset.plot);
    });
  });
}

if (plotChips.length > 0) {
  plotChips.forEach((button) => {
    button.addEventListener("click", () => {
      updatePlotPanel(button.dataset.plotChip);
    });
  });
}

if (plotPrevButton) {
  plotPrevButton.addEventListener("click", () => {
    const currentIndex = plotOrder.indexOf(activePlotKey);
    const nextIndex = (currentIndex - 1 + plotOrder.length) % plotOrder.length;
    updatePlotPanel(plotOrder[nextIndex]);
  });
}

if (plotNextButton) {
  plotNextButton.addEventListener("click", () => {
    const currentIndex = plotOrder.indexOf(activePlotKey);
    const nextIndex = (currentIndex + 1) % plotOrder.length;
    updatePlotPanel(plotOrder[nextIndex]);
  });
}
