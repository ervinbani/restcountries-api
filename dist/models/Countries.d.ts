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
    capital?: string[];
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    constructor(data: any);
    static fetchAllCountries(): Promise<Country[]>;
}
//# sourceMappingURL=Countries.d.ts.map