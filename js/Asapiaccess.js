// === Background image mapping ===
const backgrounds = {
  Singapore: "images/singapore.jpg",
  Australia: "images/australia.jpg",
  Brazil: "images/brazil.jpg",
  China: "images/china.jpg",
  Egypt: "images/egypt.jpg",
  France: "images/france.jpg",
  Germany: "images/germany.jpg",
  Iceland: "images/iceland.jpg",  
  India: "images/india.jpg",
  Indonesia: "images/indonesia.jpg",
  Italy: "images/italy.jpg",
  Japan: "images/japan.jpg",
  "New Zealand": "images/newzealand.jpg",
  "South Africa": "images/southafrica.jpg",
  "South Korea": "images/southkorea.jpg",
  Switzerland: "images/switzerland.jpg",
  Thailand: "images/thailand.jpg",
  Vietnam: "images/vietnam.jpg",
  "United States": "images/unitedstates.jpg"
};

const countryAbtPara = {
  Singapore: "Singapore, officially the Republic of Singapore, is an island country and city-state in Southeast Asia. Its territory comprises one main island, 63 satellite islands and islets, and one outlying islet. The country is about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Strait of Malacca to the west, the Singapore Strait to the south along with the Riau Islands in Indonesia, the South China Sea to the east and the Straits of Johor along with the State of Johor in Malaysia to the north.",

    Australia: "Australia, officially the Commonwealth of Australia, is a country comprising the mainland of the Australian continent, the island of Tasmania and numerous smaller islands. It has a total area of 7,688,287 km2 (2,968,464 sq mi), making it the sixth-largest country in the world and the largest in Oceania. Australia is the world's flattest and driest inhabited continent. It is a megadiverse country, and its size gives it a wide variety of landscapes and climates including deserts in the interior and tropical rainforests along the coast.",
  Brazil: "Brazil,officially the Federative Republic of Brazil, is the largest country in South America. It is also the world's fifth-largest country by area and the seventh-largest by population, with over 213 million people. The country is a federation composed of 26 states and a Federal District, which hosts the capital, Brasília. Its most populous city is São Paulo, followed by Rio de Janeiro. Brazil has the most Portuguese speakers in the world and is the only country in the Americas where Portuguese is an official language.",
  China: "China, officially the People's Republic of China (PRC),is a country in East Asia. With a population exceeding 1.4 billion, it is the second-most populous country after India, representing 17% of the world population. China borders fourteen countries by land across an area of 9.6 million square kilometers (3,700,000 sq mi), making it the third-largest country by area. The country is divided into 33 province-level divisions: 22 provinces,5 autonomous regions, 4 municipalities, and 2 semi-autonomous special administrative regions. Beijing is the capital, while Shanghai is the most populous city by urban area and largest financial center.",
  Egypt: "Egypt, officially the Arab Republic of Egypt, is a country spanning the northeast corner of Africa and southwest corner of Asia via the Sinai Peninsula. It is bordered by the Mediterranean Sea to the north, Palestine (Gaza Strip) and Israel to the northeast, the Red Sea to the east, Sudan to the south, and Libya to the west; the Gulf of Aqaba in the northeast separates Egypt from Jordan and Saudi Arabia. Cairo is the capital, largest city, and leading cultural center, while Alexandria is the second-largest city and an important hub of industry and tourism.With over 107 million inhabitants, Egypt is the third-most populous country in Africa and 15th-most populated in the world.",
  France: "France, officially the French Republic, is a country primarily located in Western Europe. Its overseas regions and territories include French Guiana in South America, Saint Pierre and Miquelon in the North Atlantic, the French West Indies, and many islands in Oceania and the Indian Ocean, giving it the largest discontiguous exclusive economic zone in the world. Metropolitan France shares borders with Belgium and Luxembourg to the north; Germany to the northeast; Switzerland to the east; Italy and Monaco to the southeast; Andorra and Spain to the south; and a maritime border with the United Kingdom to the northwest. Its metropolitan area extends from the Rhine to the Atlantic Ocean and from the Mediterranean Sea to the English Channel and the North Sea. Its 18 integral regions—five of which are overseas—span a combined area of 632,702 km2 (244,288 sq mi) and have an estimated total population of over 68.6 million as of January 2025. France is a semi-presidential republic. Its capital, largest city and main cultural and economic centre is Paris.",
  Germany: "Germany, officially the Federal Republic of Germany, is a country in Western and Central Europe. It lies between the Baltic Sea and the North Sea to the north and the Alps to the south. Its sixteen constituent states have a total population of over 83 million, making it the most populous member state of the European Union. Germany borders Denmark to the north; Poland and the Czech Republic to the east; Austria and Switzerland to the south; and France, Luxembourg, Belgium, and the Netherlands to the west. The nation's capital and most populous city is Berlin and its main financial centre is Frankfurt; the largest urban area is the Ruhr.",
  Iceland: "Iceland is a Nordic island country between the Arctic Ocean and the North Atlantic Ocean, located on the Mid-Atlantic Ridge between Europe and North America. It is culturally and politically linked with Europe and is the region's westernmost and most sparsely populated country. Its capital and largest city is Reykjavík, which is home to about 36% of the country's roughly 390,000 residents (excluding nearby towns/suburbs, which are separate municipalities). The official language of the country is Icelandic. Iceland is on a rift between tectonic plates, and its geologic activity includes geysers and frequent volcanic eruptions. The interior consists of a volcanic plateau with sand and lava fields, mountains and glaciers, and many glacial rivers flow to the sea through the lowlands. Iceland is warmed by the Gulf Stream and has a temperate climate, despite being at a latitude just south of the Arctic Circle. Its latitude and marine influence keep summers chilly, and most of its islands have a polar climate.",
  India: "India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area; the most populous country since 2023; and, since its independence in 1947, the world's most populous democracy. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west;[k] China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is near Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Myanmar, Thailand, and Indonesia.",
  Indonesia: "Indonesia, officially the Republic of Indonesia, is a country in Southeast Asia and Oceania, between the Indian and Pacific oceans. Comprising over 17,000 islands, including Sumatra, Java, Sulawesi, and parts of Borneo and New Guinea, Indonesia is the world's largest archipelagic state and the 14th-largest country by area, at 1,904,569 square kilometres (735,358 square miles). With over 280 million people, Indonesia is the world's fourth-most-populous country and the most populous Muslim-majority country. Java, the world's most populous island, is home to more than half of the country's population.",
  Italy: "Italy, officially the Italian Republic, is a country in Southern and Western Europe. It consists of a peninsula that extends into the Mediterranean Sea, with the Alps on its northern land border, as well as nearly 800 islands, notably Sicily and Sardinia. Italy shares land borders with France to the west; Switzerland and Austria to the north; Slovenia to the east; and the two enclaves of Vatican City and San Marino. It is the tenth-largest country in Europe by area, covering 301,340 km2 (116,350 sq mi), and the third-most populous member state of the European Union, with nearly 59 million inhabitants. Italy's capital and largest city is Rome; other major cities include Milan, Naples, Turin, Palermo, Bologna, Florence, Genoa, and Venice.",
  Japan: "Japan is an island country in East Asia. Located in the Pacific Ocean off the northeast coast of the Asian mainland, it is bordered to the west by the Sea of Japan and extends from the Sea of Okhotsk in the north to the East China Sea in the south. The Japanese archipelago consists of four major islands alongside 14,121 smaller islands. Japan is divided into 47 administrative prefectures and eight traditional regions, and around 75% of its terrain is mountainous and heavily forested, concentrating its agriculture and highly urbanized population along its eastern coastal plains. With a population of over 123 million as of 2025, it is the world's 11th most populous country. Tokyo is the country's capital and largest city.",
  "New Zealand": "New Zealand (Māori: Aotearoa, pronounced [aɔˈtɛaɾɔa]) is an island country in the southwestern Pacific Ocean. It consists of two main landmasses—the North Island (Te Ika-a-Māui) and the South Island (Te Waipounamu)—and over 600 smaller islands. It is the sixth-largest island country by area and lies east of Australia across the Tasman Sea and south of the islands of New Caledonia, Fiji, and Tonga. The country's varied topography and sharp mountain peaks, including the Southern Alps (Kā Tiritiri o te Moana), owe much to tectonic uplift and volcanic eruptions. New Zealand's capital city is Wellington, and its most populous city is Auckland.",
  "South Africa": "South Africa, officially the Republic of South Africa (RSA), is the southernmost country in Africa. Its nine provinces are bounded to the south by 2,798 kilometres (1,739 miles) of coastline that stretches along the South Atlantic and Indian Ocean;to the north by the neighbouring countries of Namibia, Botswana, and Zimbabwe; to the east and northeast by Mozambique and Eswatini; and it encloses Lesotho.Covering an area of 1,221,037 square kilometres (471,445 square miles), the country has a population of over 63 million people (the 6th largest in Africa). Pretoria is the administrative capital, while Cape Town, as the seat of Parliament, is the legislative capital, and Bloemfontein is regarded as the judicial capital. The largest, most populous city is Johannesburg, followed by Cape Town and Durban.",
  "South Korea": "South Korea, officially the Republic of Korea (ROK), is a country in East Asia. It constitutes the southern half of the Korean Peninsula and borders North Korea along the Korean Demilitarized Zone, with the Yellow Sea to the west and the Sea of Japan to the east. Like North Korea, South Korea claims to be the sole legitimate government of the entire peninsula and adjacent islands. It has a population of about 52 million, of which half live in the Seoul metropolitan area, the ninth most populous metropolitan area in the world; other major cities include Busan, Daegu, and Incheon.",
  Switzerland: "Switzerland, officially the Swiss Confederation, is a landlocked country located at the intersection of Central, Western, and Southern Europe. It is bordered by Germany to the north, France to the west, Austria and Liechtenstein to the east, and Italy to the south. Switzerland is geographically divided among the Swiss Alps, the Swiss Plateau, and the Jura mountains; the Alps cover most of the country's territory, whereas the majority of its 9 million people are concentrated on the plateau, which hosts many of the largest cities and economic centres, including Zurich, Geneva, Basel, Bern, Lausanne, Winterthur, and Lucerne.",
  Thailand: "Thailand, officially the Kingdom of Thailand, and formerly known as Siam until 1939, is a country located in mainland Southeast Asia. It shares land borders with Myanmar to the west and northwest, Laos to the east and northeast, Cambodia to the southeast, and Malaysia to the south. Its maritime boundaries include the Gulf of Thailand and the Andaman Sea, as well as maritime borders with Vietnam, Indonesia, and India. Thailand has a population of nearly 66 million people, covers an area of approximately 513,115 km2 (198,115 sq mi). The country's capital and largest city is Bangkok.",
  Vietnam: "Vietnam, officially the Socialist Republic of Vietnam (SRV), is a country at the eastern edge of Mainland Southeast Asia. With an area of about 331,000 square kilometres (128,000 sq mi) and a population of over 100 million, it is the world's 15th-most populous country. One of two communist states in Southeast Asia, Vietnam is bordered by China to the north, Laos and Cambodia to the west, the Gulf of Thailand to the southwest, and the South China Sea to the east; it also shares maritime borders with Thailand, Malaysia, and Indonesia to the south and southwest, the Philippines to the east, and China to the northeast. Its capital is Hanoi, while its largest city is Ho Chi Minh City.",
  "United States": "The United States of America (USA), also known as the United States (U.S.) or America, is a country primarily located in North America. It is a federal republic of 50 states and a federal capital district, Washington, D.C. The 48 contiguous states border Canada to the north and Mexico to the south, with the semi-exclave of Alaska in the northwest and the archipelago of Hawaii in the Pacific Ocean. The United States also asserts sovereignty over five major island territories and various uninhabited islands in Oceania and the Caribbean. It is a megadiverse country, with the world's third-largest land area[c] and third-largest population, exceeding 340 million."
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
const countryAbt = document.getElementById("countryabt");

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
  if (backgrounds[country]) {
    changeBackgroundSmooth(backgrounds[country]);
  }

  // Display country description immediately
  const info = countryAbtPara[country];
  if (countryAbt) {
    countryAbt.textContent = info || "No description available.";
    countryAbt.classList.remove("hidden");
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
        <br>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Area:</strong> ${area} km²</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Currency:</strong> ${currencyText}</p>
      `;
      statsContainer.classList.remove("hidden");

      // === Country Name ===
      nameContainer.querySelector("h1").textContent = name;
      nameContainer.classList.remove("hidden");

      // === Map ===
      const zoomLevels = {
        Singapore: 11,
        Switzerland: 7,
        Iceland: 6,
        Australia: 4,
        Japan: 4,
        China: 3,
        "United States": 3,
        Brazil: 3,
        India: 4
      };
      const zoom = zoomLevels[country] || 5;
      mapContainer.innerHTML = `
        <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBHGnK_mPb1_SPTNQMDVkT0m0xxvHwe63w&center=${lat},${lon}&zoom=${zoom}&maptype=satellite">
        </iframe>
      `;
      mapContainer.classList.remove("hidden");

      // === Weather + Time ===
      return Promise.allSettled([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
          .then(r => r.ok ? r.json() : Promise.reject(new Error(`Forecast failed: ${r.status}`))),
      ]);
    })
    .then(results => {
      const forecastResult = results[0];

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
          <br>
          <div class="weatherinfo">
            <h3>Local Time</h3>
            <p id="localtime"></p>
          </div>
        `;
        weatherContainer.classList.remove("hidden");

        const clockEl = document.getElementById("localtime");
        let offsetSeconds = data?.utc_offset_seconds;

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

// Travel button click
applyBtn.addEventListener("click", () => {
  const country = countrySelect.value.trim();
  loadCountryData(country);
});

// === Optional: load default country on page load ===
// loadCountryData("Singapore");