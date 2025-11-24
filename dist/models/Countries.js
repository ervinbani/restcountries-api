import ApiService from "../services/ApiServices.js";
export class Country {
    name;
    population;
    region;
    capital;
    flags;
    constructor(data) {
        this.name = data.name;
        this.population = data.population;
        this.region = data.region;
        this.capital = data.capital;
        this.flags = data.flags;
    }
    static async fetchAllCountries() {
        const data = await ApiService.getAllCountries("fields=name,population,region,capital,flags,currencies");
        console.log(data);
        return data.map((countryData) => new Country(countryData));
    }
}
//# sourceMappingURL=Countries.js.map