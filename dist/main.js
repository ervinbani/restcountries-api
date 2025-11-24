import { Country } from "./models/Countries.js";
class Main {
    countriesContainer;
    constructor() {
        this.countriesContainer = document.getElementById("countries-container");
        this.init();
    }
    async init() {
        document.addEventListener("DOMContentLoaded", () => this.renderCountries());
    }
    async renderCountries() {
        try {
            const countries = await Country.fetchAllCountries();
            console.log(countries);
            if (this.countriesContainer) {
                countries.forEach((country) => {
                    const countryCard = document.createElement("div");
                    countryCard.className = "country-card";
                    const flagImg = document.createElement("img");
                    flagImg.src = country.flags.png;
                    flagImg.alt = country.flags.alt || `Flag of ${country.name.common}`;
                    flagImg.className = "country-flag";
                    const countryInfo = document.createElement("div");
                    countryInfo.className = "country-info";
                    const countryName = document.createElement("h2");
                    countryName.textContent = country.name.common;
                    const population = document.createElement("p");
                    population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
                    const region = document.createElement("p");
                    region.innerHTML = `<strong>Region:</strong> ${country.region}`;
                    const capital = document.createElement("p");
                    capital.innerHTML = `<strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}`;
                    countryInfo.appendChild(countryName);
                    countryInfo.appendChild(population);
                    countryInfo.appendChild(region);
                    countryInfo.appendChild(capital);
                    countryCard.appendChild(flagImg);
                    countryCard.appendChild(countryInfo);
                    this.countriesContainer.appendChild(countryCard);
                });
            }
        }
        catch (error) {
            console.error("Error fetching countries:", error);
        }
    }
}
new Main();
//# sourceMappingURL=main.js.map