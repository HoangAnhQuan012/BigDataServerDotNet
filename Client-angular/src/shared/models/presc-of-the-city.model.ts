export class PrescOfTheCity {
    city: string;
    stateName: string;
    countryName: string;
    population: number;
    zipsCount: number;
    prescCount: number;

    constructor(city: string, stateName: string, countryName: string, population: number,
        zipsCount: number, prescCount: number) {
        this.city = city;
        this.stateName = stateName;
        this.countryName = countryName;
        this.population = population;
        this.zipsCount = zipsCount;
        this.prescCount = prescCount;
    }
}
