export class PrescModal {
    id: number;
    prescCity: string;
    prescState: string;
    prescSpclt: string;
    drugName: string;
    txCnt: number;
    totalDaySupply: number;
    totalDrugCost: number;
    yearsOfExp: number;
    countryName: string;
    prescFullName: string;

    constructor(id: number, prescCity: string, prescState: string, prescSpclt: string,
        drugName: string, txCnt: number, totalDaySupply: number, totalDrugCost: number,
        yearsOfExp: number, countryName: string, prescFullName: string) {
        this.id = id;
        this.prescCity = prescCity;
        this.prescState = prescState;
        this.prescSpclt = prescSpclt;
        this.drugName = drugName;
        this.txCnt = txCnt;
        this.totalDaySupply = totalDaySupply;
        this.totalDrugCost = totalDrugCost;
        this.yearsOfExp = yearsOfExp;
        this.countryName = countryName;
        this.prescFullName = prescFullName;
    }
}
