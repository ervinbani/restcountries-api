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
    currencies?: {
        [key: string]: ICountryCurrency;
    } | undefined;
    languages?: {
        [key: string]: string;
    } | undefined;
    borders?: string[] | undefined;
    flags: ICountryFlags;
}
export declare class Country implements ICountryData {
    name: ICountryName;
    population: number;
    region: string;
    subregion?: string | undefined;
    capital?: string[] | undefined;
    tld?: string[] | undefined;
    currencies?: {
        [key: string]: ICountryCurrency;
    } | undefined;
    languages?: {
        [key: string]: string;
    } | undefined;
    borders?: string[] | undefined;
    flags: ICountryFlags;
    constructor(data: ICountryData);
    static fetchAllCountries(): Promise<Country[]>;
    static fetchCountryByName(name: string): Promise<Country[]>;
    static fetchCountryByFullName(name: string): Promise<Country>;
}
//# sourceMappingURL=Countries.d.ts.map