import { Country } from "./models/Countries.js";

class DetailPage {
  private countryDetailContainer: HTMLElement | null;
  private themeToggle: HTMLButtonElement | null;
  private backButton: HTMLButtonElement | null;

  constructor() {
    this.countryDetailContainer = document.getElementById("country-detail");
    this.themeToggle = document.getElementById(
      "theme-toggle"
    ) as HTMLButtonElement;
    this.backButton = document.getElementById(
      "back-button"
    ) as HTMLButtonElement;

    this.init();
  }

  private async init(): Promise<void> {
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
    } else {
      window.location.href = "index.html";
    }
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      this.updateThemeButton(true);
    }
  }

  private toggleTheme(): void {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      this.updateThemeButton(true);
    } else {
      document.documentElement.removeAttribute("data-theme");
      this.updateThemeButton(false);
    }

    localStorage.setItem("theme", newTheme);
  }

  private updateThemeButton(isDark: boolean): void {
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector("i");
      const text = this.themeToggle.querySelector("span");

      if (isDark) {
        icon?.classList.remove("far", "fa-moon");
        icon?.classList.add("fas", "fa-sun");
        if (text) text.textContent = "Light Mode";
      } else {
        icon?.classList.remove("fas", "fa-sun");
        icon?.classList.add("far", "fa-moon");
        if (text) text.textContent = "Dark Mode";
      }
    }
  }

  private goBack(): void {
    window.location.href = "index.html";
  }

  private async loadCountryDetail(countryName: string): Promise<void> {
    try {
      const country = await Country.fetchCountryByFullName(countryName);
      this.renderCountryDetail(country);
    } catch (error) {
      console.error("Error fetching country details:", error);
      this.renderError();
    }
  }

  private renderCountryDetail(country: Country): void {
    if (!this.countryDetailContainer) return;

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
          <img src="${country.flags.svg}" alt="Flag of ${
      country.name.common
    }" />
        </div>
        
        <div class="detail-info">
          <h2>${country.name.common}</h2>
          
          <div class="info-columns">
            <div class="info-column">
              <p><strong>Native Name:</strong> ${nativeName}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
              <p><strong>Capital:</strong> ${
                country.capital ? country.capital.join(", ") : "N/A"
              }</p>
            </div>
            
            <div class="info-column">
              <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
              <p><strong>Currencies:</strong> ${currencies}</p>
              <p><strong>Languages:</strong> ${languages}</p>
            </div>
          </div>
          
          ${this.renderBorderCountries(country.borders)}
        </div>
      </div>
    `;

    // Add event listeners to border country buttons
    this.addBorderCountryListeners();
  }

  private renderBorderCountries(borders?: string[]): string {
    if (!borders || borders.length === 0) {
      return "";
    }

    const borderButtons = borders
      .map(
        (border) =>
          `<button class="border-country" data-code="${border}">${border}</button>`
      )
      .join("");

    return `
      <div class="border-countries">
        <strong>Border Countries:</strong>
        <div class="border-buttons">
          ${borderButtons}
        </div>
      </div>
    `;
  }

  private addBorderCountryListeners(): void {
    const borderButtons = document.querySelectorAll(".border-country");
    borderButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const code = (e.target as HTMLElement).dataset.code;
        if (code) {
          // In a real implementation, you'd need to convert the code to country name
          // For now, we'll just log it
          console.log("Border country clicked:", code);
        }
      });
    });
  }

  private renderError(): void {
    if (!this.countryDetailContainer) return;

    this.countryDetailContainer.innerHTML = `
      <div class="error-message">
        <h2>Country not found</h2>
        <p>The country you're looking for doesn't exist or couldn't be loaded.</p>
        <button class="back-button" onclick="window.location.href='index.html'">
          <i class="fas fa-arrow-left"></i>
          Back to Home
        </button>
      </div>
    `;
  }
}

new DetailPage();
