const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const refreshButton = document.getElementById("refreshButton");

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
