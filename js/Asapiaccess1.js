// === Background image mapping ===
const backgrounds = {
  Singapore: "images/singapore.jpg",
  Japan: "images/japan.jpg",
  "United States": "images/unitedstates.jpg",
  China: "images/china.jpg",
  India: "images/india.jpg",
  Germany: "images/germany.jpg",
  France: "images/france.jpg",
  Brazil: "images/brazil.jpg",
  Australia: "images/australia.jpg",
  "South Africa": "images/southafrica.jpg"
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
  overlay.style.zIndex = "-1";

  mainContainer.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });

  setTimeout(() => {
    mainContainer.style.backgroundImage = `url('${newImageUrl}')`;
    mainContainer.removeChild(overlay);
  }, 800);
}

// === Live clock with UTC offset ===
function startOffsetClock(offsetSeconds, clockEl) {
  if (!clockEl || typeof offsetSeconds !== "number") return;
  if (window.clockInterval) clearInterval(window.clockInterval);

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
  window.clockInterval = setInterval(render, 1000);
}

// === Load country data ===
function loadCountryData(country) {
  landingPage?.classList.add("hidden");
  mainContainer.classList.remove("hidden");

  if (backgrounds[country]) {
    changeBackgroundSmooth(backgrounds[country]);
  }

  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(res => res.json())
    .then(data => {
      const countryData = data[0];
      const [lat, lon] = countryData.latlng;
      const name = countryData.name?.common || country;

      // === Flag ===
      const flagUrl = countryData.flags.svg || countryData.flags.png;
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
      const zoomLevels = { Singapore: 10, Australia: 3, Japan: 4, China: 3, "United States": 3, Brazil: 3, India: 4 };
      const zoom = zoomLevels[country] || 5;
      mapContainer.innerHTML = `
        <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBHGnK_mPb1_SPTNQMDVkT0m0xxvHwe63w&center=${lat},${lon}&zoom=${zoom}">
        </iframe>
      `;
      mapContainer.classList.remove("hidden");

      // === Weather + Time ===
      return Promise.allSettled([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`).then(r => r.json()),
        fetch(`https://api.open-meteo.com/v1/time-zone?latitude=${lat}&longitude=${lon}`).then(r => r.json())
      ]);
    })
    .then(results => {
      const weatherResult = results[0];
      const timeResult = results[1];

      if (weatherResult.status === "fulfilled") {
        const weatherData = weatherResult.value;
        const temp = weatherData.current.temperature_2m;
        const code = weatherData.current.weathercode;
        const weatherDescriptions = {
          0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
          45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 61: "Slight rain",
          71: "Slight snow fall", 80: "Rain showers", 95: "Thunderstorm"
        };
        const desc = weatherDescriptions[code] || "Unknown";

        weatherContainer.innerHTML = `
          <div class="weatherinfo">
            <h3>Current Weather</h3>
            <p>${temp} °C, ${desc}</p>
          </div>
          <div class="weatherinfo">
            <h3>Local Time</h3>
            <p id="localtime"></p>
          </div>
        `;
        weatherContainer.classList.remove("hidden");
      }

      const clockEl = document.getElementById("localtime");
      if (timeResult.status === "fulfilled" && clockEl) {
        const tzData = timeResult.value;
        let offsetSeconds = tzData.utc_offset_seconds;

        if (typeof offsetSeconds !== "number" && tzData.utc_offset) {
          const match = /^([+-])(\d{2}):(\d{2})$/.exec(tzData.utc_offset);
          if (match) {
            const sign = match[1] === "-" ? -1 : 1;
            const hours = parseInt(match[2], 10);
            const minutes = parseInt(match[3], 10);
            offsetSeconds = sign * (hours * 3600 + minutes * 60);
          }
        }

        if (typeof offsetSeconds === "number") {
          startOffsetClock(offsetSeconds, clockEl);
        } else {
          clockEl.textContent = "Unavailable";
        }
      } else if (clockEl) {
        clockEl.textContent = "Unavailable";
      }
    })
    .catch(err => console.error("Error fetching data:", err));
}

// === Travel button click ===
applyBtn.addEventListener("click", () => {
  const country = countrySelect.value;
  loadCountryData(country);
});

// === Load Singapore by default on page load ===
window.addEventListener("DOMContentLoaded", () => {
  loadCountryData("Singapore");
});