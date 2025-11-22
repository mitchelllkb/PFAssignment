// === Country mapping with alpha-3 codes ===
const countryMappings = {
  Singapore: { apiName: "Singapore", code: "SGP" },
  Thailand: { apiName: "Thailand", code: "THA" },
  "South Korea": { apiName: "South Korea", code: "KOR" },
  Japan: { apiName: "Japan", code: "JPN" },
  Italy: { apiName: "Italy", code: "ITA" },
  "United States": { apiName: "United States", code: "USA" },
  China: { apiName: "China", code: "CHN" },
  India: { apiName: "India", code: "IND" },
  Germany: { apiName: "Germany", code: "DEU" },
  France: { apiName: "France", code: "FRA" },
  Brazil: { apiName: "Brazil", code: "BRA" },
  Australia: { apiName: "Australia", code: "AUS" },
  "South Africa": { apiName: "South Africa", code: "ZAF" },
  Vietnam: { apiName: "Vietnam", code: "VNM" }
};

// === Background image mapping ===
const backgrounds = {
  Singapore: "images/singapore.jpg",
  Thailand: "images/thailand.jpg",
  "South Korea": "images/southkorea.jpg",
  Japan: "images/japan.jpg",
  Italy: "images/italy.jpg",
  "United States": "images/unitedstates.jpg",
  China: "images/china.jpg",
  India: "images/india.jpg",
  Germany: "images/germany.jpg",
  France: "images/france.jpg",
  Brazil: "images/brazil.jpg",
  Australia: "images/australia.jpg",
  "South Africa": "images/southafrica.jpg",
  Vietnam: "images/vietnam.jpg"
};

// === DOM references ===   
const mainContainer = document.getElementById("maincontainer");
const applyBtn = document.getElementById("applybtn");
const countrySelect = document.getElementById("countrySelect");
const flagContainer = document.getElementById("countryflagcontainer");
const statsContainer = document.getElementById("countrystatcontainer");
const weatherContainer = document.getElementById("weatherappcontainer");
const mapContainer = document.getElementById("mapcontainer");
const nameContainer = document.getElementById("countrynamecontainer");

// === Global store ===
let allCountries = [];

// === Load all countries once ===
function loadAllCountries() {
  return fetch("https://www.apicountries.com/countries")
    .then(res => {
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      return res.json();
    })
    .then(data => {
      allCountries = Array.isArray(data) ? data : [];
      console.log("Loaded countries:", allCountries.length);
    })
    .catch(err => {
      console.error("Error loading countries:", err);
      allCountries = [];
      showError("Country data service unavailable.");
    });
}
// === Load country data ===
function loadCountryData(countryDisplayName) {
  mainContainer.classList.remove("hidden");

  // Get the API name and code from our mapping
  const countryInfo = countryMappings[countryDisplayName];
  
  if (!countryInfo) {
    console.error("Country not found in mapping:", countryDisplayName);
    showError(`Country "${countryDisplayName}" is not configured properly.`);
    return;
  }

  const { code } = countryInfo;

  // Change background if available
  if (backgrounds[countryDisplayName]) {
    changeBackgroundSmooth(backgrounds[countryDisplayName]);
  }

  // Find country data by alpha3Code
  const countryData = allCountries.find(c => c.alpha3Code === code || c.iso3 === code);
  if (!countryData) {
    showError(`No data found for ${countryDisplayName}`);
    return;
  }

  const [lat, lon] = countryData.latlng || [0, 0];
  const name = countryData.name.common;

  updateCountryUI(countryData, name, lat, lon, countryDisplayName);
}

// === Update UI with country data ===
function updateCountryUI(countryData, name, lat, lon, countryDisplayName) {
  // === Flag ===
  const flagUrl = countryData.flags?.svg || countryData.flags?.png;
  flagContainer.innerHTML = `<img src="${flagUrl}" alt="Flag of ${name}">`;
  flagContainer.classList.remove("hidden");

  // === Stats ===
  const capital = countryData.capital ? countryData.capital[0] : "N/A";
  const population = countryData.population?.toLocaleString?.() || "N/A";
  const area = countryData.area?.toLocaleString?.() || "N/A";
  const region = countryData.region || "N/A";
  
  let currencyText = "N/A";
  if (countryData.currencies) {
    const currencies = Object.values(countryData.currencies)[0];
    if (currencies) {
      currencyText = `${currencies.name}${currencies.symbol ? ` (${currencies.symbol})` : ""}`;
    }
  }

  statsContainer.innerHTML = `
    <h3>${name}</h3>
    <br>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Area:</strong> ${area} km²</p>
    <p><strong>Region:</strong> ${region}</p>
    <p><strong>Currency:</strong> ${currencyText}</p>
  `;
  statsContainer.classList.remove("hidden");

  // === Country Name ===
  nameContainer.innerHTML = `<h1>${name}</h1>`;
  nameContainer.classList.remove("hidden");

  // === Map ===
  const zoomLevels = {
    Singapore: 10,
    Australia: 3,
    Japan: 4,
    China: 3,
    "United States": 3,
    Brazil: 3,
    India: 4
  };
  const zoom = zoomLevels[countryDisplayName] || 5;
  mapContainer.innerHTML = `
    <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
      src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBHGnK_mPb1_SPTNQMDVkT0m0xxvHwe63w&center=${lat},${lon}&zoom=${zoom}">
    </iframe>
  `;
  mapContainer.classList.remove("hidden");

  // === Weather + Time ===
  fetchWeatherData(lat, lon);
}

// === Weather data function (simplified without geocoding) ===
function fetchWeatherData(lat, lon) {
  return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
    .then(r => {
      if (!r.ok) throw new Error(`Forecast failed: ${r.status}`);
      return r.json();
    })
    .then(data => {
      const temp = data?.current?.temperature_2m;
      const code = data?.current?.weather_code;
      const offsetSeconds = data?.utc_offset_seconds;

      const weatherDescriptions = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 61: "Slight rain",
        71: "Slight snow fall", 80: "Rain showers", 95: "Thunderstorm"
      };
      const desc = (typeof code === "number" ? weatherDescriptions[code] : undefined) || "Unknown";

      weatherContainer.innerHTML = `
        <div class="weatherinfo">
          <h3>Current Weather</h3>
          <p>${typeof temp === "number" ? `${temp} °C` : "N/A"}, ${desc}</p>
        </div>
        <br>
        <div class="weatherinfo">
          <h3>Local Time</h3>
          <p id="localtime"></p>
        </div>
      `;
      weatherContainer.classList.remove("hidden");

      const clockEl = document.getElementById("localtime");
      if (clockEl) {
        if (typeof offsetSeconds === "number") {
          startOffsetClock(offsetSeconds, clockEl);
        } else {
          clockEl.textContent = "Unavailable";
        }
      }
    })
    .catch(err => {
      console.error("Error fetching weather data:", err);
      weatherContainer.innerHTML = `
        <div class="weatherinfo">
          <h3>Current Weather</h3>
          <p>Unavailable</p>
        </div>
        <div class="weatherinfo">
          <h3>Local Time</h3>
          <p>Unavailable</p>
        </div>
      `;
      weatherContainer.classList.remove("hidden");
    });
}

// === Error display ===
function showError(message) {
  statsContainer.innerHTML = `<div class="error">${message}</div>`;
  statsContainer.classList.remove("hidden");
}

// === Smooth background transition ===
function changeBackgroundSmooth(newImageUrl) {
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.backgroundImage = `url('${newImageUrl}')`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.8s ease-in-out";
  overlay.style.zIndex = "0";

  mainContainer.style.backgroundSize = "cover";
  mainContainer.style.backgroundRepeat = "no-repeat";
  mainContainer.style.backgroundPosition = "center";

  mainContainer.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });

  setTimeout(() => {
    mainContainer.style.backgroundImage = `url('${newImageUrl}')`;
    mainContainer.style.backgroundSize = "cover";
    mainContainer.style.backgroundRepeat = "no-repeat";
    mainContainer.style.backgroundPosition = "center";
    if (overlay.parentNode) mainContainer.removeChild(overlay);
  }, 800);
}

// === Live clock with UTC offset ===
function startOffsetClock(offsetSeconds, clockEl) {
  if (!clockEl || typeof offsetSeconds !== "number") return;

  if (clockEl.dataset.intervalId) {
    clearInterval(clockEl.dataset.intervalId);
  }

  const render = () => {
    const now = new Date();
    let h = now.getUTCHours();
    let m = now.getUTCMinutes();
    let s = now.getUTCSeconds();

    const sign = Math.sign(offsetSeconds);
    const abs = Math.abs(offsetSeconds);
    h += Math.floor(abs / 3600) * sign;
    m += Math.floor((abs % 3600) / 60) * sign;

    if (m >= 60) { h += 1; m -= 60; }
    if (m < 0) { h -= 1; m += 60; }
    h = (h % 24 + 24) % 24;

    const pad = n => String(n).padStart(2, "0");
    clockEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  render();
  const id = setInterval(render, 1000);
  clockEl.dataset.intervalId = id;
}

// === Initialize application ===
document.addEventListener("DOMContentLoaded", () => {
  loadAllCountries().then(() => {
    // Default load
    loadCountryData("Singapore");

    applyBtn.addEventListener("click", () => {
      const country = countrySelect.value.trim();
      loadCountryData(country);
    });
  });
});