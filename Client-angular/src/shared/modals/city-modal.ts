export class CityModal {
    stateId: string;
    stateName: string;
    countryName: string;
    population: number;
    zips: string;

    constructor(stateId: string, stateName: string, countryName: string, population: number, zips: string) {
        this.stateId = stateId;
        this.stateName = stateName;
        this.countryName = countryName;
        this.population = population;
        this.zips = zips;
    }
}
