import { Country } from "./models/Countries.js";

class Main {
  private countriesContainer: HTMLElement | null;
  private allCountries: Country[] = [];
  private filteredCountries: Country[] = [];
  private themeToggle: HTMLButtonElement | null;
  private searchInput: HTMLInputElement | null;
  private regionFilter: HTMLSelectElement | null;

  constructor() {
    this.countriesContainer = document.getElementById(
      "countries-container"
    ) as HTMLElement;
    this.themeToggle = document.getElementById(
      "theme-toggle"
    ) as HTMLButtonElement;
    this.searchInput = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    this.regionFilter = document.getElementById(
      "region-filter"
    ) as HTMLSelectElement;

    this.init();
  }

  private async init(): Promise<void> {
    // Load theme from localStorage
    this.loadTheme();

    // Set up event listeners
    this.themeToggle?.addEventListener("click", () => this.toggleTheme());
    this.searchInput?.addEventListener("input", () => this.filterCountries());
    this.regionFilter?.addEventListener("change", () => this.filterCountries());

    // Load and render countries
    await this.loadCountries();
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

  private async loadCountries(): Promise<void> {
    try {
      this.showLoading();
      this.allCountries = await Country.fetchAllCountries();
      this.filteredCountries = [...this.allCountries];
      this.renderCountries();
    } catch (error) {
      console.error("Error fetching countries:", error);
      this.renderError(
        error instanceof Error
          ? error.message
          : "Failed to load countries. Please try again later."
      );
    }
  }

  private showLoading(): void {
    if (!this.countriesContainer) return;
    this.countriesContainer.innerHTML = `
      <div class="loading-message">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading countries...</p>
      </div>
    `;
  }

  private renderError(message: string): void {
    if (!this.countriesContainer) return;
    this.countriesContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Oops! Something went wrong</h2>
        <p>${message}</p>
        <button class="retry-button" onclick="window.location.reload()">
          <i class="fas fa-redo"></i>
          Try Again
        </button>
      </div>
    `;
  }

  private filterCountries(): void {
    const searchTerm = this.searchInput?.value.toLowerCase() || "";
    const selectedRegion = this.regionFilter?.value || "";

    this.filteredCountries = this.allCountries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm);
      const matchesRegion =
        !selectedRegion || country.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });

    this.renderCountries();
  }

  private renderCountries(): void {
    if (!this.countriesContainer) return;

    this.countriesContainer.innerHTML = "";

    if (this.filteredCountries.length === 0) {
      this.countriesContainer.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h2>No countries found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      `;
      return;
    }

    this.filteredCountries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.className = "country-card";
      countryCard.style.cursor = "pointer";

      // Add click event to navigate to detail page
      countryCard.addEventListener("click", () => {
        window.location.href = `detail.html?name=${encodeURIComponent(
          country.name.common
        )}`;
      });

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.png;
      flagImg.alt = country.flags.alt || `Flag of ${country.name.common}`;
      flagImg.className = "country-flag";

      // Add error handling for flag image
      flagImg.onerror = () => {
        flagImg.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='213'%3E%3Crect fill='%23ddd' width='320' height='213'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif'%3ENo flag available%3C/text%3E%3C/svg%3E";
      };

      const countryInfo = document.createElement("div");
      countryInfo.className = "country-info";

      const countryName = document.createElement("h2");
      countryName.textContent = country.name.common;

      const population = document.createElement("p");
      population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;

      const region = document.createElement("p");
      region.innerHTML = `<strong>Region:</strong> ${country.region}`;

      const capital = document.createElement("p");
      capital.innerHTML = `<strong>Capital:</strong> ${
        country.capital ? country.capital[0] : "N/A"
      }`;

      countryInfo.appendChild(countryName);
      countryInfo.appendChild(population);
      countryInfo.appendChild(region);
      countryInfo.appendChild(capital);

      countryCard.appendChild(flagImg);
      countryCard.appendChild(countryInfo);

      this.countriesContainer!.appendChild(countryCard);
    });
  }
}

new Main();
