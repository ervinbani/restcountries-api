import ApiService from "../services/ApiServices.js";

export interface ICountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface ICountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface ICountryCurrency {
  name: string;
  symbol: string;
}

export interface ICountryData {
  name: ICountryName;
  population: number;
  region: string;
  subregion?: string | undefined;
  capital?: string[] | undefined;
  tld?: string[] | undefined;
  currencies?:
    | {
        [key: string]: ICountryCurrency;
      }
    | undefined;
  languages?:
    | {
        [key: string]: string;
      }
    | undefined;
  borders?: string[] | undefined;
  flags: ICountryFlags;
}

export class Country implements ICountryData {
  name: ICountryName;
  population: number;
  region: string;
  subregion?: string | undefined;
  capital?: string[] | undefined;
  tld?: string[] | undefined;
  currencies?:
    | {
        [key: string]: ICountryCurrency;
      }
    | undefined;
  languages?:
    | {
        [key: string]: string;
      }
    | undefined;
  borders?: string[] | undefined;
  flags: ICountryFlags;

  constructor(data: ICountryData) {
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

  static async fetchCountryByFullName(name: string): Promise<Country> {
    const data = await ApiService.getCountryByFullName(name);
    return new Country(data[0]);
  }

  static async fetchCountriesByCodes(codes: string[]): Promise<Country[]> {
    const data = await ApiService.getCountriesByCodes(codes);
    return data.map((countryData: any) => new Country(countryData));
  }
}
