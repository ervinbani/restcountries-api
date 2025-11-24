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
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
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
    this.currencies = data.currencies;
    this.flags = data.flags;
  }

  static async fetchAllCountries(): Promise<Country[]> {
    const data = await ApiService.getAllCountries(
      "fields=name,population,region,capital,flags,currencies"
    );
    console.log(data);
    return data.map((countryData: any) => new Country(countryData));
  }

  static async fetchCountryByName(name: string): Promise<Country[]> {
    const data = await ApiService.getCountryByName(name);
    return data.map((countryData: any) => new Country(countryData));
  }
}
