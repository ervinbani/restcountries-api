export default class ApiService {
    static baseUrl = "https://restcountries.com/v3.1/all?";
    static async getAllCountries(endpoint) {
        return fetch(ApiService.baseUrl + `${endpoint}`).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        });
    }
}
//# sourceMappingURL=ApiServices.js.map