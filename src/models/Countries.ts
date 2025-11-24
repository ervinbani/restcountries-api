import ApiService from "../services/ApiServices.js";

export class Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };

  constructor(data: any) {
    this.name = data.name;
    this.population = data.population;
    this.region = data.region;
    this.capital = data.capital;
    this.flags = data.flags;
  }

  static async fetchAllCountries(): Promise<Country[]> {
    const data = await ApiService.getAllCountries(
      "fields=name,population,region,capital,flags"
    );
    return data.map((countryData: any) => new Country(countryData));
  }
}
