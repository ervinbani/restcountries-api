import { Country } from "./models/Countries.js";

class Main {
  private countriesContainer: HTMLElement | null;
  private paginationContainer: HTMLElement | null;
  private allCountries: Country[] = [];
  private filteredCountries: Country[] = [];
  private themeToggle: HTMLButtonElement | null;
  private searchInput: HTMLInputElement | null;
  private regionFilter: HTMLSelectElement | null;
  private currentPage: number = 1;
  private itemsPerPage: number = 25;

  constructor() {
    this.countriesContainer = document.getElementById(
      "countries-container"
    ) as HTMLElement;
    this.paginationContainer = document.getElementById(
      "pagination"
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

      // Update aria-pressed state
      this.themeToggle.setAttribute("aria-pressed", isDark.toString());

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
      <div class="loading-message" role="status" aria-live="polite">
        <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
        <p>Loading countries...</p>
      </div>
    `;
  }

  private renderError(message: string): void {
    if (!this.countriesContainer) return;
    this.countriesContainer.innerHTML = `
      <div class="error-message" role="alert">
        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
        <h2>Oops! Something went wrong</h2>
        <p>${message}</p>
        <button class="retry-button" onclick="window.location.reload()">
          <i class="fas fa-redo" aria-hidden="true"></i>
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

    this.currentPage = 1; // Reset to first page when filtering
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
      this.renderPagination();
      return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(
      this.filteredCountries.length / this.itemsPerPage
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedCountries = this.filteredCountries.slice(
      startIndex,
      endIndex
    );

    paginatedCountries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.className = "country-card";
      countryCard.style.cursor = "pointer";
      countryCard.setAttribute("role", "button");
      countryCard.setAttribute("tabindex", "0");
      countryCard.setAttribute(
        "aria-label",
        `View details for ${country.name.common}`
      );

      // Add click event to navigate to detail page
      const navigateToDetail = () => {
        window.location.href = `detail.html?name=${encodeURIComponent(
          country.name.common
        )}`;
      };

      countryCard.addEventListener("click", navigateToDetail);
      countryCard.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToDetail();
        }
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

    this.renderPagination();
  }

  private renderPagination(): void {
    if (!this.paginationContainer) return;

    const totalPages = Math.ceil(
      this.filteredCountries.length / this.itemsPerPage
    );

    if (totalPages <= 1) {
      this.paginationContainer.innerHTML = "";
      return;
    }

    let paginationHTML = `
      <button 
        class="pagination-btn" 
        ${this.currentPage === 1 ? "disabled" : ""}
        onclick="window.mainInstance.goToPage(${this.currentPage - 1})"
        aria-label="Go to previous page">
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
        Previous
      </button>
      
      <div class="pagination-numbers" role="group" aria-label="Page numbers">
    `;

    // Show page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      paginationHTML += `
        <button class="pagination-number" onclick="window.mainInstance.goToPage(1)" aria-label="Go to page 1">1</button>
        ${
          startPage > 2
            ? '<span class="pagination-ellipsis" aria-hidden="true">...</span>'
            : ""
        }
      `;
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button 
          class="pagination-number ${i === this.currentPage ? "active" : ""}"
          onclick="window.mainInstance.goToPage(${i})"
          aria-label="${
            i === this.currentPage
              ? `Current page, page ${i}`
              : `Go to page ${i}`
          }"
          ${i === this.currentPage ? 'aria-current="page"' : ""}>
          ${i}
        </button>
      `;
    }

    if (endPage < totalPages) {
      paginationHTML += `
        ${
          endPage < totalPages - 1
            ? '<span class="pagination-ellipsis" aria-hidden="true">...</span>'
            : ""
        }
        <button class="pagination-number" onclick="window.mainInstance.goToPage(${totalPages})" aria-label="Go to page ${totalPages}">${totalPages}</button>
      `;
    }

    paginationHTML += `
      </div>
      
      <button 
        class="pagination-btn" 
        ${this.currentPage === totalPages ? "disabled" : ""}
        onclick="window.mainInstance.goToPage(${this.currentPage + 1})"
        aria-label="Go to next page">
        Next
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
    `;

    this.paginationContainer.innerHTML = paginationHTML;
  }

  public goToPage(page: number): void {
    const totalPages = Math.ceil(
      this.filteredCountries.length / this.itemsPerPage
    );

    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.renderCountries();

    // Scroll to top of countries container
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Create instance and expose globally for pagination
const mainInstance = new Main();
(window as any).mainInstance = mainInstance;
