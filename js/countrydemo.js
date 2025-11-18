fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags")
  .then(res => res.json())
  .then(data => {
    data.forEach(country => {
      console.log(country.name.common);
      console.log("Capital:", country.capital?.[0]);
      console.log("Population:", country.population);
      console.log("Region:", country.region);
      console.log("Flag:", country.flags.svg);
    });
  });