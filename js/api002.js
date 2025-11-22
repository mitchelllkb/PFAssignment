// short utility
function getId(id) { return document.getElementById(id); }

// === DOM references ===
const landingPage = getId("landingpage");
const mainContainer = getId("maincontainer");
const applyBtn = getId("applybtn");
const countrySelect = getId("countrySelect");
const flagContainer = getId("countryflagcontainer");
const statsContainer = getId("countrystatcontainer");
const weatherContainer = getId("weatherappcontainer");
const mapContainer = getId("mapcontainer");
const nameContainer = getId("countrynamecontainer");

// === Background image mapping ===
const bgimage = {
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

function changeBackground(newImageUrl) {
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.backgroundImage = `url('${newImageUrl}')`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.5s ease-in-out";
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

const requestOptions = {
  method: "GET",
  redirect: "follow"
};
    // === Load country data ===
    function loadCountryData(country) 
    {
      if (landingPage) landingPage.classList.add("hidden");
        mainContainer.classList.remove("hidden");

      if (bgimage[country]) {
        changeBackground(bgimage[country]);
    }

    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(res => res.json())
    .then(data => 
    {
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
    // == Insert stats to the statsContainer == 
      statsContainer.innerHTML = 
      `
        <h3>${name}</h3>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Area:</strong> ${area} km²</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Currency:</strong> ${currencyText}</p>
      `;

          // === Weather + Time with fallback (Promise.allSettled) ===
return Promise.allSettled([
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
.then(r => r.ok ? r.json() : Promise.reject(new Error(`Forecast failed: ${r.status}`)))
      ]);
    })
.then(results => {
  const forecastResult = results[0];

  // Utility: safe numeric check
  const isNum = v => typeof v === "number" && !Number.isNaN(v);

  // Prepare UI container skeleton
  weatherContainer.classList.remove("hidden");

  // Default DOM markup with placeholders
  weatherContainer.innerHTML = `
    <div class="weatherinfo">
      <h3>Current Weather</h3>
      <p id="weather-text">Unavailable</p>
    </div>
    <div class="weatherinfo">
      <h3>Local Time</h3>
      <p id="localtime">Unavailable</p>
    </div>
  `;

  const weatherTextEl = weatherContainer.querySelector("#weather-text");
  const clockEl = weatherContainer.querySelector("#localtime");

  // Try extract forecast values (Open-Meteo uses current_weather)
  let temp, code;
  if (forecastResult.status === "fulfilled") {
    const d = forecastResult.value;
    temp = d?.current_weather?.temperature;
    code = d?.current_weather?.weathercode;
  } else {
    // expose error for debugging
    console.warn("Forecast failed:", forecastResult.reason);
  }

  // Better weather descriptions (extend as needed)
  const weatherDescriptions = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
    55: "Dense drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
    80: "Rain showers", 81: "Moderate showers", 82: "Violent showers",
    95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
  };

  // Render weather text
  const desc = isNum(code) ? (weatherDescriptions[code] || `Code ${code}`) : "Unavailable";
  weatherTextEl.textContent = `${isNum(temp) ? `${temp} °C` : "N/A"}, ${desc}`;

  // Determine offsetSeconds: try forecast (rare), then geocode timezone, then Intl fallback
  let offsetSeconds;
  // Open-Meteo forecast typically does not include utc_offset_seconds; check carefully
  if (forecastResult.status === "fulfilled") {
    const d = forecastResult.value;
    if (isNum(d?.utc_offset_seconds)) offsetSeconds = d.utc_offset_seconds;
  }

  
  // Start clock if we have numeric offsetSeconds
  if (isNum(offsetSeconds) && clockEl) {
    startOffsetClock(offsetSeconds, clockEl);
  } else if (clockEl) {
    clockEl.textContent = "Unavailable";
  }
})
.catch(err => {
  console.error("Unexpected error in weather/time flow:", err);
});  

}
// === Travel button click ===
// Ensure DOM is parsed before wiring listeners (use defer or DOMContentLoaded)
document.addEventListener("DOMContentLoaded", () => {
  if (applyBtn && countrySelect) {
    applyBtn.addEventListener("click", () => {
      const country = countrySelect.value;
      loadCountryData(country);
    });
}});

// === Optional: load default country on page load ===

loadCountryData("Singapore");