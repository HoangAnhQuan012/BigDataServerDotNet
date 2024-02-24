export class CityUpdate {
    state_name?: string;
    country_name?: string;
    population?: number;
    zips?: string;

    constructor(state_name?: string, country_name?: string, population?: number, zips?: string) {
        this.state_name = state_name;
        this.country_name = country_name;
        this.population = population;
        this.zips = zips;
    }
}
