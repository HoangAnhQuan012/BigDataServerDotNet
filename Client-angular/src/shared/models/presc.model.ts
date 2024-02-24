export class PrescModel {
    presc_id?: number;
    presc_city?: string;
    presc_state?: string;
    presc_spclt?: string;
    drug_name?: string;
    tx_cnt?: number;
    total_day_supply?: number;
    total_drug_cost?: number;
    years_of_exp?: number;
    Country_name?: string;
    presc_fullname?: string;

    constructor(id?: number, prescCity?: string, prescState?: string, prescSpclt?: string,
        drugName?: string, txCnt?: number, totalDaySupply?: number, totalDrugCost?: number,
        yearsOfExp?: number, countryName?: string, prescFullName?: string) {
        this.presc_id = id;
        this.presc_city = prescCity;
        this.presc_state = prescState;
        this.presc_spclt = prescSpclt;
        this.drug_name = drugName;
        this.tx_cnt = txCnt;
        this.total_day_supply = totalDaySupply;
        this.total_drug_cost = totalDrugCost;
        this.years_of_exp = yearsOfExp;
        this.Country_name = countryName;
        this.presc_fullname = prescFullName;
    }
}
