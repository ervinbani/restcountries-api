export declare class Country {
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
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages?: {
        [key: string]: string;
    };
    borders?: string[];
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    constructor(data: any);
    static fetchAllCountries(): Promise<Country[]>;
    static fetchCountryByName(name: string): Promise<Country[]>;
    static fetchCountryByFullName(name: string): Promise<Country>;
}
//# sourceMappingURL=Countries.d.ts.map