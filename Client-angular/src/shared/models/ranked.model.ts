export class RankedModel {
    prescId: string;
    prescFullName: string;
    prescState: string;
    countryName: string;
    yearsOfExp: number;
    txCnt: number;
    totalDaysupply: number;
    totalDrugCost: number;
    denseRank: number;

    constructor(prescId: string, prescFullName: string, prescState: string,
        countryName: string, yearsOfExp: number, txCnt: number, totalDaysupply: number,
        totalDrugCost: number, denseRank: number) {
        this.prescId = prescId;
        this.prescFullName = prescFullName;
        this.prescState = prescState;
        this.countryName = countryName;
        this.yearsOfExp = yearsOfExp;
        this.txCnt = txCnt;
        this.totalDaysupply = totalDaysupply;
        this.totalDrugCost = totalDrugCost;
        this.denseRank = denseRank;
    }
}
