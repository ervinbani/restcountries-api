import { Country } from "./models/Countries.js";
class DetailPage {
    countryDetailContainer;
    themeToggle;
    backButton;
    constructor() {
        this.countryDetailContainer = document.getElementById("country-detail");
        this.themeToggle = document.getElementById("theme-toggle");
        this.backButton = document.getElementById("back-button");
        this.init();
    }
    async init() {
        // Load theme from localStorage
        this.loadTheme();
        // Set up event listeners
        this.themeToggle?.addEventListener("click", () => this.toggleTheme());
        this.backButton?.addEventListener("click", () => this.goBack());
        // Get country name from URL
        const urlParams = new URLSearchParams(window.location.search);
        const countryName = urlParams.get("name");
        if (countryName) {
            await this.loadCountryDetail(countryName);
        }
        else {
            window.location.href = "index.html";
        }
    }
    loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        if (savedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            this.updateThemeButton(true);
        }
    }
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        if (newTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            this.updateThemeButton(true);
        }
        else {
            document.documentElement.removeAttribute("data-theme");
            this.updateThemeButton(false);
        }
        localStorage.setItem("theme", newTheme);
    }
    updateThemeButton(isDark) {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector("i");
            const text = this.themeToggle.querySelector("span");
            // Update aria-pressed state
            this.themeToggle.setAttribute("aria-pressed", isDark.toString());
            if (isDark) {
                icon?.classList.remove("far", "fa-moon");
                icon?.classList.add("fas", "fa-sun");
                if (text)
                    text.textContent = "Light Mode";
            }
            else {
                icon?.classList.remove("fas", "fa-sun");
                icon?.classList.add("far", "fa-moon");
                if (text)
                    text.textContent = "Dark Mode";
            }
        }
    }
    goBack() {
        window.location.href = "index.html";
    }
    async loadCountryDetail(countryName) {
        try {
            this.showLoading();
            debugger;
            const country = await Country.fetchCountryByFullName(countryName);
            this.renderCountryDetail(country);
        }
        catch (error) {
            console.error("Error fetching country details:", error);
            this.renderError(error instanceof Error
                ? error.message
                : "Failed to load country details.");
        }
    }
    showLoading() {
        if (!this.countryDetailContainer)
            return;
        this.countryDetailContainer.innerHTML = `
      <div class="loading-message" role="status" aria-live="polite">
        <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
        <p>Loading country details...</p>
      </div>
    `;
    }
    renderCountryDetail(country) {
        if (!this.countryDetailContainer)
            return;
        // Get native name
        const nativeName = country.name.nativeName
            ? Object.values(country.name.nativeName)[0]?.common || country.name.common
            : country.name.common;
        // Get currencies
        const currencies = country.currencies
            ? Object.values(country.currencies)
                .map((curr) => curr.name)
                .join(", ")
            : "N/A";
        // Get languages
        const languages = country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A";
        // Get top level domain
        const topLevelDomain = country.tld ? country.tld.join(", ") : "N/A";
        this.countryDetailContainer.innerHTML = `
      <div class="detail-content">
        <div class="detail-flag">
          <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
        </div>
        
        <div class="detail-info">
          <h2>${country.name.common}</h2>
          
          <div class="info-columns">
            <div class="info-column">
              <p><strong>Native Name:</strong> ${nativeName}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
              <p><strong>Capital:</strong> ${country.capital ? country.capital.join(", ") : "N/A"}</p>
            </div>
            
            <div class="info-column">
              <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
              <p><strong>Currencies:</strong> ${currencies}</p>
              <p><strong>Languages:</strong> ${languages}</p>
            </div>
          </div>
          
          <div id="border-countries-container"></div>
        </div>
      </div>
    `;
        // Load and render border countries
        if (country.borders && country.borders.length > 0) {
            this.loadBorderCountries(country.borders);
        }
    }
    async loadBorderCountries(borderCodes) {
        const container = document.getElementById("border-countries-container");
        if (!container)
            return;
        try {
            // Show loading state
            container.innerHTML = `
        <div class="border-countries">
          <strong>Border Countries:</strong>
          <div class="border-buttons" role="group" aria-label="Border countries">
            <span class="loading-borders">Loading border countries...</span>
          </div>
        </div>
      `;
            // Fetch border countries
            const borderCountries = await Country.fetchCountriesByCodes(borderCodes);
            // Render border countries with full names
            const borderButtons = borderCountries
                .map((country) => `<button class="border-country" data-name="${country.name.common}" aria-label="View details for ${country.name.common}">${country.name.common}</button>`)
                .join("");
            container.innerHTML = `
        <div class="border-countries">
          <strong>Border Countries:</strong>
          <div class="border-buttons" role="group" aria-label="Border countries">
            ${borderButtons}
          </div>
        </div>
      `;
            // Add event listeners to border country buttons
            this.addBorderCountryListeners();
        }
        catch (error) {
            console.error("Error loading border countries:", error);
            container.innerHTML = `
        <div class="border-countries">
          <strong>Border Countries:</strong>
          <div class="border-buttons" role="group" aria-label="Border countries">
            <span class="error-borders">Unable to load border countries</span>
          </div>
        </div>
      `;
        }
    }
    addBorderCountryListeners() {
        const borderButtons = document.querySelectorAll(".border-country");
        borderButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const countryName = e.target.dataset.name;
                if (countryName) {
                    // Navigate to the border country's detail page
                    window.location.href = `detail.html?name=${encodeURIComponent(countryName)}`;
                }
            });
        });
    }
    renderError(message) {
        if (!this.countryDetailContainer)
            return;
        this.countryDetailContainer.innerHTML = `
      <div class="error-message" role="alert">
        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
        <h2>Country Not Found</h2>
        <p>${message ||
            "The country you're looking for doesn't exist or couldn't be loaded."}</p>
        <button class="back-button" onclick="window.location.href='index.html'" aria-label="Go back to countries list">
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          Back to Home
        </button>
      </div>
    `;
    }
}
new DetailPage();
//# sourceMappingURL=detail.js.map