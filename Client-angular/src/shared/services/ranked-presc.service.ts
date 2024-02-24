import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment-fastApi';

@Injectable({
    providedIn: 'root'
})
export class RankedPrescService {
    private fastApiUrl = environment.fastApiUrl;

    constructor(private http: HttpClient) { }

    getRankingDistributionOfPrescribers(): Observable<any[]> {
        const url = `${this.fastApiUrl}/ranked_presc/visualize/rank`;
        return this.http.get<any[]>(url);
    }

    getDistributionOfYearsOfExperience(): Observable<any[]> {
        const url = `${this.fastApiUrl}/ranked_presc/visualize/percentage_yoe`;
        return this.http.get<any[]>(url);
    }

    getPrescribersToTotalPopulation(): Observable<any[]> {
        const url = `${this.fastApiUrl}/presc_of_the_city/visualize/presc_per_populations`;
        return this.http.get<any[]>(url);
    }

}
