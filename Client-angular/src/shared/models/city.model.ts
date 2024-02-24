export class CityModel {
    city?: string;
    state_id?: string;
    state_name?: string;
    country_name?: string;
    population?: number;
    zips?: string;

    constructor(city?: string, state_id?: string, state_name?: string, country_name?: string, population?: number, zips?: string) {
        this.city = city;
        this.state_id = state_id;
        this.state_name = state_name;
        this.country_name = country_name;
        this.population = population;
        this.zips = zips;
    }
}
