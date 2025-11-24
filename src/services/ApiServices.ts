export default class ApiService {
  private static baseUrl: string = "https://restcountries.com/v3.1/all?";

  static async getAllCountries(endpoint: string): Promise<any> {
    return fetch(ApiService.baseUrl + `${endpoint}`).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  }
  // https://restcountries.com/v3.1/name/{name}
  static async getCountryByName(name: string): Promise<any> {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  }
}
