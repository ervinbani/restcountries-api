export default class ApiService {
    static baseUrl = "https://restcountries.com/v3.1/all?";
    static async getAllCountries(endpoint) {
        try {
            const response = await fetch(ApiService.baseUrl + `${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error("Network error: Please check your internet connection");
            }
            throw error;
        }
    }
    // https://restcountries.com/v3.1/name/{name}
    static async getCountryByName(name) {
        try {
            const url = `https://restcountries.com/v3.1/name/${name}`;
            const response = await fetch(url);
            if (response.status === 404) {
                throw new Error(`Country "${name}" not found`);
            }
            if (!response.ok) {
                throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error("Network error: Please check your internet connection");
            }
            throw error;
        }
    }
    // https://restcountries.com/v3.1/name/{name}?fullText=true
    static async getCountryByFullName(name) {
        try {
            const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
            const response = await fetch(url);
            if (response.status === 404) {
                throw new Error(`Country "${name}" not found`);
            }
            if (!response.ok) {
                throw new Error(`Failed to fetch country details: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (!data || data.length === 0) {
                throw new Error(`No data found for country "${name}"`);
            }
            return data;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error("Network error: Please check your internet connection");
            }
            throw error;
        }
    }
    // https://restcountries.com/v3.1/alpha?codes={code},{code},{code}
    static async getCountriesByCodes(codes) {
        try {
            const codesParam = codes.join(",");
            const url = `https://restcountries.com/v3.1/alpha?codes=${codesParam}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch countries by codes: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error("Network error: Please check your internet connection");
            }
            throw error;
        }
    }
}
//# sourceMappingURL=ApiServices.js.map