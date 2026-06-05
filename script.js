const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const refreshButton = document.getElementById("refreshButton");
const plotButtons = document.querySelectorAll(".plot-zone");
const plotChips = document.querySelectorAll("[data-plot-chip]");
const plotPrevButton = document.getElementById("plotPrevButton");
const plotNextButton = document.getElementById("plotNextButton");
const generateAiParcelButton = document.getElementById("generateAiParcelButton");
const noteSaveButtons = document.querySelectorAll("[data-note-save]");
const noteToggleButtons = document.querySelectorAll("[data-note-toggle]");
const projectNameInput = document.getElementById("projectNameInput");
const projectIntentInput = document.getElementById("projectIntentInput");
const projectLatitudeInput = document.getElementById("projectLatitudeInput");
const projectLongitudeInput = document.getElementById("projectLongitudeInput");
const saveProjectNameButton = document.getElementById("saveProjectNameButton");

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
    scope: "Field section 2 of 4 in the 24 biga Soil to Soul land workspace.",
    area: "6 biga | 3,804.69 m²",
    state: "Survey mapped",
    condition: "This top-right section is part of the actual measured parcel and is ready to carry its own soil readings, crop plan, and live field condition updates.",
    cycle: "Independent 6 biga organic crop cycle with its own sowing, observation, and harvest timeline.",
    website: "This plot can display local biga area, moisture data, crop stage, field notes, and proof records for customers.",
    current: "Current priority for Plot A can be soil preparation, crop selection, and setting the first working records for the section.",
    aiSummary: "Plot A looks best suited for an early planning push: confirm the crop, prepare the soil record, and keep the first irrigation plan simple and documented.",
    timeline: [
      "Month 1: finalize crop choice for Plot A and record soil condition.",
      "Month 2: prepare beds, align irrigation, and start cultivation notes.",
      "Month 3: monitor early growth and attach first field images.",
      "Month 4: continue moisture, health, and crop stage observations.",
      "Month 5: prepare harvest visibility and packing expectations.",
      "Month 6: record harvest outcome and decide the next cycle."
    ]
  },
  B: {
    title: "Plot B",
    position: "Bottom right project zone",
    scope: "Field section 4 of 4 in the 24 biga Soil to Soul land workspace.",
    area: "6 biga | 3,804.69 m²",
    state: "Survey mapped",
    condition: "This bottom-right section is marked as its own farming unit so the website can later show its present condition, crop-specific updates, and harvest readiness clearly.",
    cycle: "Planned as a separate 6 biga cycle for crop scheduling, harvest planning, and packaging visibility.",
    website: "This plot can later show daily field activity, current crop, local area measurement, and section-wise trust records.",
    current: "Current priority for Plot B can be section planning around crop scheduling, harvest sequence, and output planning.",
    aiSummary: "Plot B should be treated as an output-focused section, with attention on sequencing, field readiness, and harvest planning so the cycle stays organized.",
    timeline: [
      "Month 1: define crop objective and section work calendar for Plot B.",
      "Month 2: prepare the area and attach irrigation and compost notes.",
      "Month 3: start growth-stage tracking and condition logging.",
      "Month 4: maintain cultivation updates and field observations.",
      "Month 5: prepare produce readiness notes and early harvest planning.",
      "Month 6: close the cycle with harvest and post-cycle decisions."
    ]
  },
  C: {
    title: "Plot C",
    position: "Bottom left project zone",
    scope: "Field section 3 of 4 in the 24 biga Soil to Soul land workspace.",
    area: "6 biga | 3,804.69 m²",
    state: "Survey mapped",
    condition: "This bottom-left section is now tied to the actual parcel measurement and can later reflect real soil and cultivation status once you provide the section data.",
    cycle: "Dedicated 6 biga cycle space for one crop plan, with separate logs for irrigation, compost, and growth updates.",
    website: "This plot can later show dimensions, local biga area, present condition, and crop progress for direct customer trust.",
    current: "Current priority for Plot C can be understanding cultivation condition and preparing section-specific logs for field progress.",
    aiSummary: "Plot C needs clarity on current condition first. Once the section notes are stable, it becomes easier to plan irrigation, crop timing, and progress tracking.",
    timeline: [
      "Month 1: map current condition and document section readiness.",
      "Month 2: align crop plan and start irrigation and compost logging.",
      "Month 3: monitor growth and attach first on-ground updates.",
      "Month 4: continue land health observations and section review.",
      "Month 5: prepare crop maturity notes and expected harvest planning.",
      "Month 6: record final outcomes and define the next crop cycle."
    ]
  },
  D: {
    title: "Plot D",
    position: "Top left project zone",
    scope: "Field section 1 of 4 in the 24 biga Soil to Soul land workspace.",
    area: "6 biga | 3,804.69 m²",
    state: "Survey mapped",
    condition: "This top-left section is shown inside the actual measured farm parcel and is ready for soil, crop, and activity details to be attached later.",
    cycle: "Cycle planning and section definition for the first 6 biga organic season.",
    website: "Section-wise dimensions, local biga area, crop cycle, soil health notes, field photos, and sensor-linked updates.",
    current: "Current priority for Plot D can be first-season planning, soil notes, and setting the baseline records for future crop updates.",
    aiSummary: "Plot D is a strong starting section for baseline planning. The best next move is to fix soil notes, define the first crop cycle, and begin clean operational logging.",
    timeline: [
      "Month 1: define the first crop cycle and attach baseline soil notes.",
      "Month 2: prepare the section and start irrigation and field activity records.",
      "Month 3: log early growth and visual field observations.",
      "Month 4: track cultivation status and section health updates.",
      "Month 5: prepare harvest notes and expected packing readiness.",
      "Month 6: review harvest, learnings, and the next rotation decision."
    ]
  }
};

const plotOrder = ["D", "A", "C", "B"];
let activePlotKey = "D";
let activeProject = null;
const defaultVillageContext = {
  village: "Rangpur, Bulandshahr, Uttar Pradesh",
  latitude: "28.33036",
  longitude: "77.97588"
};
const noteTypeConfig = {
  soil: {
    inputId: "soilNoteInput",
    historyId: "soilNoteHistory",
    statusId: "soilNoteStatus",
    emptyMessage: "No soil notes saved yet for this plot."
  },
  land: {
    inputId: "landNoteInput",
    historyId: "landNoteHistory",
    statusId: "landNoteStatus",
    emptyMessage: "No crop notes saved yet for this plot."
  },
  produce: {
    inputId: "produceNoteInput",
    historyId: "produceNoteHistory",
    statusId: "produceNoteStatus",
    emptyMessage: "No produce notes saved yet for this plot."
  }
};

function getProjectStorageKey(plotKey) {
  return `soil2soul:plot-project:${plotKey}`;
}

function slugifyProjectName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function getProjectKey(projectName) {
  const slug = slugifyProjectName(projectName);
  return slug || "project-pending";
}

function createProjectRecord(projectName, intention = "", latitude = "", longitude = "") {
  return {
    name: projectName.trim(),
    intention: intention.trim(),
    latitude: latitude.trim(),
    longitude: longitude.trim()
  };
}

function getNoteStorageKey(plotKey, noteType, projectName = activeProject?.name || "") {
  return `soil2soul:plot-notes:${plotKey}:${getProjectKey(projectName)}:${noteType}`;
}

function readStoredProject(plotKey) {
  try {
    const raw = window.localStorage.getItem(getProjectStorageKey(plotKey));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object" && typeof parsed.name === "string") {
      return createProjectRecord(parsed.name, parsed.intention || "", parsed.latitude || "", parsed.longitude || "");
    }

    if (typeof parsed === "string") {
      return createProjectRecord(parsed);
    }

    return null;
  } catch {
    const legacyValue = window.localStorage.getItem(getProjectStorageKey(plotKey));
    return legacyValue ? createProjectRecord(legacyValue) : null;
  }
}

function writeStoredProject(plotKey, project) {
  window.localStorage.setItem(getProjectStorageKey(plotKey), JSON.stringify(project));
}

function updateProjectHeadingUi() {
  const activeProjectTitle = document.getElementById("activeProjectTitle");
  const activeProjectSummary = document.getElementById("activeProjectSummary");
  const projectPlotPill = document.getElementById("projectPlotPill");
  const projectKeyPill = document.getElementById("projectKeyPill");
  const activeProjectIntent = document.getElementById("activeProjectIntent");
  const activeProjectLatitude = document.getElementById("activeProjectLatitude");
  const activeProjectLongitude = document.getElementById("activeProjectLongitude");

  if (projectNameInput) {
    projectNameInput.value = activeProject?.name || "";
  }

  if (projectIntentInput) {
    projectIntentInput.value = activeProject?.intention || "";
  }

  if (projectLatitudeInput) {
    projectLatitudeInput.value = activeProject?.latitude || defaultVillageContext.latitude;
  }

  if (projectLongitudeInput) {
    projectLongitudeInput.value = activeProject?.longitude || defaultVillageContext.longitude;
  }

  if (projectPlotPill) {
    projectPlotPill.textContent = plotContent[activePlotKey]?.title || `Plot ${activePlotKey}`;
  }

  if (activeProject?.name) {
    if (activeProjectTitle) {
      activeProjectTitle.textContent = activeProject.name;
    }
    if (activeProjectSummary) {
      activeProjectSummary.textContent = `All soil, crop, and produce notes for ${plotContent[activePlotKey].title} are being grouped under this project heading for later review and AI assessment, along with the objective and coordinates for local conditions.`;
    }
    if (projectKeyPill) {
      projectKeyPill.textContent = `Project key: ${getProjectKey(activeProject.name)}`;
    }
    if (activeProjectIntent) {
      activeProjectIntent.textContent = activeProject.intention || "Not set yet";
    }
    if (activeProjectLatitude) {
      activeProjectLatitude.textContent = activeProject.latitude || defaultVillageContext.latitude;
    }
    if (activeProjectLongitude) {
      activeProjectLongitude.textContent = activeProject.longitude || defaultVillageContext.longitude;
    }
    return;
  }

  if (activeProjectTitle) {
    activeProjectTitle.textContent = "No active project yet";
  }
  if (activeProjectSummary) {
    activeProjectSummary.textContent = `Set one project name for ${plotContent[activePlotKey].title} so the soil, crop, and produce sections stay under the same project heading. The village context is currently set to ${defaultVillageContext.village} for future AI weather and local-condition analysis.`;
  }
  if (projectKeyPill) {
    projectKeyPill.textContent = "Project key pending";
  }
  if (activeProjectIntent) {
    activeProjectIntent.textContent = "Not set yet";
  }
  if (activeProjectLatitude) {
    activeProjectLatitude.textContent = defaultVillageContext.latitude;
  }
  if (activeProjectLongitude) {
    activeProjectLongitude.textContent = defaultVillageContext.longitude;
  }
}

function setActiveProject(project) {
  activeProject = project && project.name ? project : null;
  updateProjectHeadingUi();
  renderAllNoteHistories(activePlotKey);
}

function readPlotNotes(plotKey, noteType) {
  try {
    const raw = window.localStorage.getItem(getNoteStorageKey(plotKey, noteType));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePlotNotes(plotKey, noteType, notes) {
  window.localStorage.setItem(getNoteStorageKey(plotKey, noteType), JSON.stringify(notes));
}

function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function renderNoteHistory(plotKey, noteType) {
  const config = noteTypeConfig[noteType];

  if (!config) {
    return;
  }

  const historyElement = document.getElementById(config.historyId);
  const statusElement = document.getElementById(config.statusId);

  if (!historyElement || !statusElement) {
    return;
  }

  const notes = readPlotNotes(plotKey, noteType);
  const noteLabel = noteType === "land" ? "crop" : noteType;

  if (notes.length === 0) {
    historyElement.innerHTML = `<div class="note-history-empty">${activeProject?.name ? `${config.emptyMessage} under ${escapeHtml(activeProject.name)}.` : "Set a project heading first, then start saving notes."}</div>`;
    statusElement.textContent = activeProject?.name
      ? `No ${noteLabel} note saved yet for ${plotContent[plotKey].title} under ${activeProject.name}.`
      : `Set a project heading for ${plotContent[plotKey].title} before saving ${noteLabel} notes.`;
    return;
  }

  statusElement.textContent = `Latest ${noteLabel} note saved on ${formatTimestamp(notes[0].timestamp)} for ${plotContent[plotKey].title} under ${activeProject?.name || "this project"}.`;
  historyElement.innerHTML = notes
    .map((note) => `
      <article class="note-history-entry">
        <span class="note-history-meta">${formatTimestamp(note.timestamp)}</span>
        <strong class="note-history-project">${escapeHtml(note.projectName || activeProject?.name || "")}</strong>
        <p>${escapeHtml(note.text)}</p>
      </article>
    `)
    .join("");
}

function renderAllNoteHistories(plotKey) {
  Object.keys(noteTypeConfig).forEach((noteType) => {
    renderNoteHistory(plotKey, noteType);
  });
}

function getProjectNoteBundle(plotKey, project = activeProject) {
  if (!project?.name) {
    return null;
  }

  return {
    projectName: project.name,
    intention: project.intention,
    latitude: project.latitude,
    longitude: project.longitude,
    plot: plotContent[plotKey]?.title || plotKey,
    notes: {
      soil: readPlotNotes(plotKey, "soil"),
      crop: readPlotNotes(plotKey, "land"),
      produce: readPlotNotes(plotKey, "produce")
    }
  };
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function requestAiPlotSummary(plotKey) {
  const plot = plotContent[plotKey];

  if (!plot) {
    throw new Error("Plot data not found.");
  }

  const response = await fetch("/api/plot-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      plot,
      project: getProjectNoteBundle(plotKey)
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Failed to generate plot insight.");
  }

  return data;
}

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
  const plotIndex = document.getElementById("plotIndex");
  const aiPlotTitle = document.getElementById("aiPlotTitle");
  const aiParcelSummary = document.getElementById("aiParcelSummary");

  if (!plotTitle || !plotPosition || !plotScope || !plotArea || !plotState || !plotCondition || !plotIndex) {
    return;
  }

  activePlotKey = plotKey;
  activeProject = readStoredProject(plotKey);

  plotTitle.textContent = plot.title;
  plotPosition.textContent = plot.position;
  plotScope.textContent = plot.scope;
  plotArea.textContent = plot.area;
  plotState.textContent = plot.state;
  plotCondition.textContent = plot.condition;
  plotIndex.textContent = `${plotOrder.indexOf(plotKey) + 1} / ${plotOrder.length}`;

  if (aiPlotTitle && aiParcelSummary) {
    aiPlotTitle.textContent = `AI note for ${plot.title}`;
    aiParcelSummary.textContent = `Click "Generate Plot Insight" to create a short AI-style summary for ${plot.title}. In the real version, this is where a cached OpenAI response would appear.`;
  }

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

  updateProjectHeadingUi();
  renderAllNoteHistories(plotKey);
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

if (generateAiParcelButton) {
  generateAiParcelButton.addEventListener("click", async () => {
    const aiPlotTitle = document.getElementById("aiPlotTitle");
    const aiParcelSummary = document.getElementById("aiParcelSummary");
    const plot = plotContent[activePlotKey];

    if (!aiPlotTitle || !aiParcelSummary || !plot) {
      return;
    }

    generateAiParcelButton.disabled = true;
    generateAiParcelButton.textContent = "Generating...";
    aiPlotTitle.textContent = `AI note for ${plot.title}`;

    try {
      const result = await requestAiPlotSummary(activePlotKey);
      aiParcelSummary.textContent = result.summary;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      aiParcelSummary.textContent = `${plot.aiSummary} This is the local fallback because the live AI request could not complete. Reason: ${message}`;
    } finally {
      generateAiParcelButton.disabled = false;
      generateAiParcelButton.textContent = "Generate Plot Insight";
    }
  });
}

if (noteSaveButtons.length > 0) {
  noteSaveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const noteType = button.dataset.noteSave;
      const config = noteTypeConfig[noteType];
      const noteLabel = noteType === "land" ? "crop" : noteType;

      if (!config) {
        return;
      }

      const input = document.getElementById(config.inputId);

      if (!input) {
        return;
      }

      const text = input.value.trim();
      const statusElement = document.getElementById(config.statusId);

      if (!activeProject?.name) {
        if (statusElement) {
          statusElement.textContent = `Set a project heading before saving ${noteLabel} notes.`;
        }
        if (projectNameInput) {
          projectNameInput.focus();
        }
        return;
      }

      if (!text) {
        if (statusElement) {
          statusElement.textContent = `Write a ${noteLabel} note before saving.`;
        }
        return;
      }

      const existingNotes = readPlotNotes(activePlotKey, noteType);
      const nextNotes = [
        {
          text,
          timestamp: new Date().toISOString(),
          projectName: activeProject.name
        },
        ...existingNotes
      ];

      writePlotNotes(activePlotKey, noteType, nextNotes);
      input.value = "";
      renderNoteHistory(activePlotKey, noteType);
    });
  });
}

if (noteToggleButtons.length > 0) {
  noteToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const noteType = button.dataset.noteToggle;
      const config = noteTypeConfig[noteType];

      if (!config) {
        return;
      }

      const historyElement = document.getElementById(config.historyId);

      if (!historyElement) {
        return;
      }

      const willShow = historyElement.classList.contains("hidden");
      historyElement.classList.toggle("hidden", !willShow);
      button.setAttribute("aria-expanded", String(willShow));
      button.textContent = willShow ? "Hide history" : "Show history";

      if (willShow) {
        renderNoteHistory(activePlotKey, noteType);
      }
    });
  });
}

if (saveProjectNameButton) {
  saveProjectNameButton.addEventListener("click", () => {
    const projectName = projectNameInput?.value.trim() || "";
    const projectIntention = projectIntentInput?.value.trim() || "";
    const projectLatitude = projectLatitudeInput?.value.trim() || defaultVillageContext.latitude;
    const projectLongitude = projectLongitudeInput?.value.trim() || defaultVillageContext.longitude;
    const activeProjectSummary = document.getElementById("activeProjectSummary");

    if (!projectName) {
      if (activeProjectSummary) {
        activeProjectSummary.textContent = `Write a project name for ${plotContent[activePlotKey].title} before grouping the notes.`;
      }
      projectNameInput?.focus();
      return;
    }

    const project = createProjectRecord(projectName, projectIntention, projectLatitude, projectLongitude);
    writeStoredProject(activePlotKey, project);
    setActiveProject(project);
  });
}

if (projectNameInput || projectIntentInput || projectLatitudeInput || projectLongitudeInput) {
  [projectNameInput, projectIntentInput, projectLatitudeInput, projectLongitudeInput]
    .filter(Boolean)
    .forEach((input) => input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveProjectNameButton?.click();
    }
    }));
}

updatePlotPanel(activePlotKey);
