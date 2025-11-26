import ApiService from "../services/ApiServices.js";
export class Country {
    name;
    population;
    region;
    subregion;
    capital;
    tld;
    currencies;
    languages;
    borders;
    flags;
    constructor(data) {
        this.name = data.name;
        this.population = data.population;
        this.region = data.region;
        this.subregion = data.subregion ?? undefined;
        this.capital = data.capital ?? undefined;
        this.tld = data.tld ?? undefined;
        this.currencies = data.currencies ?? undefined;
        this.languages = data.languages ?? undefined;
        this.borders = data.borders ?? undefined;
        this.flags = data.flags;
    }
    static async fetchAllCountries() {
        const data = await ApiService.getAllCountries("fields=name,population,region,capital,flags,currencies");
        console.log(data);
        return data.map((countryData) => new Country(countryData));
    }
    static async fetchCountryByName(name) {
        const data = await ApiService.getCountryByName(name);
        return data.map((countryData) => new Country(countryData));
    }
    static async fetchCountryByFullName(name) {
        const data = await ApiService.getCountryByFullName(name);
        return new Country(data[0]);
    }
}
//# sourceMappingURL=Countries.js.map