// === Background image mapping ===
const backgrounds = {
  Singapore: "images/singapore.jpg",
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
const landingPage = document.getElementById("landingpage");
const mainContainer = document.getElementById("maincontainer");
const applyBtn = document.getElementById("applybtn");
const countrySelect = document.getElementById("countrySelect");
const flagContainer = document.getElementById("countryflagcontainer");
const statsContainer = document.getElementById("countrystatcontainer");
const weatherContainer = document.getElementById("weatherappcontainer");
const mapContainer = document.getElementById("mapcontainer");
const nameContainer = document.getElementById("countrynamecontainer");

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

  // Ensure container has correct baseline background rules
  mainContainer.style.backgroundSize = "cover";
  mainContainer.style.backgroundRepeat = "no-repeat";
  mainContainer.style.backgroundPosition = "center";

  mainContainer.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });

  setTimeout(() => {
    mainContainer.style.backgroundImage = `url('${newImageUrl}')`;
    // Keep baseline rules in case CSS overrides elsewhere
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

// === Load country data ===
function loadCountryData(country) {
  if (landingPage) landingPage.classList.add("hidden");
  mainContainer.classList.remove("hidden");

  if (backgrounds[country]) {
    changeBackgroundSmooth(backgrounds[country]);
  }

  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data[0]) throw new Error("Country not found");
      const countryData = data[0];
      const [lat, lon] = countryData.latlng;
      const name = countryData.name?.common || country;

      // === Flag ===
      const flagUrl = countryData.flags?.svg || countryData.flags?.png;
      flagContainer.innerHTML = `<img src="${flagUrl}" alt="Flag of ${name}">`;
      flagContainer.classList.remove("hidden");

      // === Stats ===
      const capital = countryData.capital ? countryData.capital[0] : "N/A";
      const population = countryData.population?.toLocaleString?.() || "N/A";
      const area = countryData.area?.toLocaleString?.() || "N/A";
      const region = countryData.region || "N/A";
      const currencies = countryData.currencies ? Object.values(countryData.currencies)[0] : null;
      const currencyText = currencies ? `${currencies.name}${currencies.symbol ? ` (${currencies.symbol})` : ""}` : "N/A";

      statsContainer.innerHTML = `
        <h3>${name}</h3>
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
      const zoom = zoomLevels[country] || 5;
      mapContainer.innerHTML = `
        <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBHGnK_mPb1_SPTNQMDVkT0m0xxvHwe63w&center=${lat},${lon}&zoom=${zoom}">
        </iframe>
      `;
      mapContainer.classList.remove("hidden");

      // === Weather + Time with fallback (Promise.allSettled) ===
      return Promise.allSettled([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
          .then(r => r.ok ? r.json() : Promise.reject(new Error(`Forecast failed: ${r.status}`))),
        fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`)
          .then(r => r.ok ? r.json() : Promise.reject(new Error(`Geocoding failed: ${r.status}`)))
      ]);
    })
    .then(results => {
      const forecastResult = results[0];
      const geoResult = results[1];

      if (forecastResult.status === "fulfilled") {
        const data = forecastResult.value;
        const temp = data?.current?.temperature_2m;
        const code = data?.current?.weather_code;

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
          <div class="weatherinfo">
            <h3>Local Time</h3>
            <p id="localtime"></p>
          </div>
        `;
        weatherContainer.classList.remove("hidden");

        const clockEl = document.getElementById("localtime");
        let offsetSeconds = data?.utc_offset_seconds;

        // Fallback: derive offset from reverse geocoding if forecast lacks it
        if (typeof offsetSeconds !== "number" && geoResult.status === "fulfilled") {
          const tz = geoResult.value?.results?.[0]?.timezone;
          if (tz?.offset_seconds) {
            offsetSeconds = tz.offset_seconds;
          }
        }

        if (clockEl) {
          if (typeof offsetSeconds === "number") {
            startOffsetClock(offsetSeconds, clockEl);
          } else {
            clockEl.textContent = "Unavailable";
          }
        }
      } else {
        // Forecast failed entirely → graceful UI
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
      }
    })
    .catch(err => console.error("Error fetching data:", err));
}

// === Travel button click ===
applyBtn.addEventListener("click", () => {
  const country = countrySelect.value;
  loadCountryData(country);
});

// === Optional: load default country on page load ===
// loadCountryData("Singapore");