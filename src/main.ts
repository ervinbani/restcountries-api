import { Country } from "./models/Countries.js";

class Main {
  private countriesContainer: HTMLElement | null;
  private allCountries: Country[] = [];
  private filteredCountries: Country[] = [];
  private themeToggle: HTMLButtonElement | null;
  private searchInput: HTMLInputElement | null;
  private regionFilter: HTMLSelectElement | null;

  constructor() {
    this.countriesContainer = document.getElementById("countries-container");
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
      this.allCountries = await Country.fetchAllCountries();
      this.filteredCountries = [...this.allCountries];
      this.renderCountries();
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
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

    this.filteredCountries.forEach((country) => {
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
