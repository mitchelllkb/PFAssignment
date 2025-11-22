// Simple countries dashboard (single /v3.1/all fetch, minimal fallbacks)

// --- Utilities ---
function q(id) { return document.getElementById(id); }
function safeText(v) { return (v === undefined || v === null) ? "N/A" : String(v); }// This is a checking function to ensure the value is neither null or undefined. If so, it will display N.A instead.

// --- DOM refs (will be re-queried on DOMContentLoaded to avoid nulls) ---
let countrySelect, applyBtn, flagContainer, statsContainer, weatherContainer, mapContainer, nameContainer, landingPage, mainContainer;

// --- Cache ---
// === Fetch all countries with explicit fields (max 10) ===
let allCountries = [];

async function fetchAllCountries() {
  if (allCountries.length) return allCountries;

  // Pick the fields your UI uses: name, cca2/cca3 (optional), latlng, flags, capital,
  // population, area, region, currencies, altSpellings
  const fields = [
    "name",
    "cca2",
    "cca3",
    "latlng",
    "flags",
    "capital",
    "population",
    "area",
    "region",
    "currencies"
  ].join(",");

  const url = `https://restcountries.com/v3.1/all?fields=${encodeURIComponent(fields)}`;

  const res = await fetch(url, { mode: "cors", cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch countries: ${res.status} ${res.statusText} — ${text}`);
  }
  allCountries = await res.json();
  return allCountries;
}
// --- Populate dropdown ---
async function populateCountrySelect() {
  const countries = await fetchAllCountries();
  // map to names and sort
  const names = countries
    .map(c => c.name && c.name.common)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  countrySelect.innerHTML = names.map(n => `<option value="${n}">${n}</option>`).join("");
  if (names.includes("Singapore")) countrySelect.value = "Singapore";
}

// --- Simple find (case-insensitive common/official) ---
function findCountry(countries, query) {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  return countries.find(c =>
    (c.name?.common || "").toLowerCase() === q ||
    (c.name?.official || "").toLowerCase() === q
  ) || countries.find(c => (c.name?.common || "").toLowerCase().startsWith(q));
}

// --- Render helpers ---
function renderName(name) {
  nameContainer.innerHTML = `<h1>${safeText(name)}</h1>`;
  nameContainer.classList.remove("hidden");
}
function renderFlag(url, name) {
  if (url) {
    flagContainer.innerHTML = `<img src="${url}" alt="Flag of ${name}" style="max-width:90%;height:auto;">`;
  } else {
    flagContainer.innerHTML = `<div>Flag unavailable</div>`;
  }
  flagContainer.classList.remove("hidden");
}
function renderStats(country, name) {
  const capital = Array.isArray(country.capital) ? country.capital[0] : (country.capital || "N/A");
  const population = typeof country.population === "number" ? country.population.toLocaleString() : "N/A";
  const area = typeof country.area === "number" ? country.area.toLocaleString() : "N/A";
  const region = country.region || "N/A";
  const currency = country.currencies ? Object.values(country.currencies)[0] : null;
  const currencyText = currency ? `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ""}` : "N/A";

  statsContainer.innerHTML = `
    <h3>${safeText(name)}</h3>
    <p><strong>Capital:</strong> ${safeText(capital)}</p>
    <p><strong>Population:</strong> ${safeText(population)}</p>
    <p><strong>Area:</strong> ${safeText(area)} km²</p>
    <p><strong>Region:</strong> ${safeText(region)}</p>
    <p><strong>Currency:</strong> ${safeText(currencyText)}</p>
  `;
  statsContainer.classList.remove("hidden");
}
function renderMap(lat, lon) {
  // Replace the placeholder key below with your Google Maps Embed API key to get an iframe map
  const key = "AIzaSyBHGnK_mPb1_SPTNQMDVkT0m0xxvHwe63w";
  if (typeof lat === "number" && typeof lon === "number" && key && key !== "YOUR_GOOGLE_EMBED_API_KEY") {
    mapContainer.innerHTML = `<iframe width="100%" height="300" style="border:0"
      src="https://www.google.com/maps/embed/v1/view?key=${encodeURIComponent(key)}&center=${encodeURIComponent(lat + "," + lon)}&zoom=5"
      loading="lazy" allowfullscreen></iframe>`;
  } else if (typeof lat === "number" && typeof lon === "number") {
    mapContainer.innerHTML = `<div>Map coordinates: ${lat}, ${lon}</div>`;
  } else {
    mapContainer.innerHTML = `<div>Map coordinates unavailable</div>`;
  }
  mapContainer.classList.remove("hidden");
}
async function renderWeather(lat, lon) {
  if (typeof lat !== "number" || typeof lon !== "number") {
    weatherContainer.innerHTML = `<div>Weather unavailable</div>`;
    weatherContainer.classList.remove("hidden");
    return;
  }
  // Simple open-meteo call for current weather
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await res.json();
    const t = data?.current_weather?.temperature;
    const wind = data?.current_weather?.windspeed;
    weatherContainer.innerHTML = `<div><strong>Temp:</strong> ${t ?? "N/A"} °C<br><strong>Wind:</strong> ${wind ?? "N/A"} m/s</div>`;
  } catch (e) {
    weatherContainer.innerHTML = `<div>Weather unavailable</div>`;
  }
  weatherContainer.classList.remove("hidden");
}

// --- Main loader ---
async function loadCountryData(selectedName) {
  // hide landing and show main if those elements exist
  if (landingPage) landingPage.classList.add("hidden");
  if (mainContainer) mainContainer.classList.remove("hidden");

  const countries = await fetchAllCountries();
  const country = findCountry(countries, selectedName);
  if (!country) {
    // simple fallback rendering when not found
    nameContainer.innerHTML = `<h1>${safeText(selectedName)}</h1>`;
    flagContainer.innerHTML = `<div>Country not found</div>`;
    statsContainer.innerHTML = "";
    mapContainer.innerHTML = "";
    weatherContainer.innerHTML = "";
    return;
  }

  const name = country.name.common;
  renderName(name);

  const flagUrl = country.flags?.svg || country.flags?.png || null;
  renderFlag(flagUrl, name);

  renderStats(country, name);

  const latlng = Array.isArray(country.latlng) && country.latlng.length === 2
    ? country.latlng.map(Number)
    : null;
  const [lat, lon] = latlng || [undefined, undefined];

  renderMap(lat, lon);
  await renderWeather(lat, lon);
}

// --- Wire events safely after DOM ready ---
document.addEventListener("DOMContentLoaded", async () => {
  // Re-query DOM refs (avoid nulls)
  countrySelect = q("countrySelect");
  applyBtn = q("applybtn");
  flagContainer = q("countryflagcontainer");
  statsContainer = q("countrystatcontainer");
  weatherContainer = q("weatherappcontainer");
  mapContainer = q("mapcontainer");
  nameContainer = q("countrynamecontainer");
  landingPage = q("landingpage");
  mainContainer = q("maincontainer");

  // Defensive checks
  if (!countrySelect || !applyBtn) {
    console.error("countrySelect or applybtn not found. Check your HTML element IDs.");
    return;
  }

  // Make sure the button doesn't submit a form (if inside a form)
  applyBtn.type = "button";

  // Populate select then load default
  await populateCountrySelect();

  // Click handler
  applyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const sel = (countrySelect.value || "").trim();
    if (!sel) return;
    await loadCountryData(sel);
  });

  // optional: load current selection on init
  const defaultCountry = (countrySelect.value || "").trim() || "Singapore";
  if (defaultCountry) loadCountryData(defaultCountry);
});