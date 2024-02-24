import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PrescModel } from '@shared/models/presc.model';

export const FAST_API_URL = new InjectionToken<string>('FAST_API_URL');

@Injectable({
    providedIn: 'root'
})
export class DfPrescSelService {
    private fastApiUrl = environment.fastApiUrl;

    constructor(private http: HttpClient) { }

    getPresc(keyword: string, skip: number, limit: number): Observable<PrescModel[]> {
        const url = `${this.fastApiUrl}/df_presc_sel/?keyword=${keyword}&skip=${skip}&limit=${limit}`;
        return this.http.get<PrescModel[]>(url);
    }

    deletePresc(presc_id: string): Observable<any> {
        const url = `${this.fastApiUrl}/df_presc_sel/delete/${presc_id}`;
        return this.http.delete(url);
    }

    getInfos(presc_id: string): Observable<PrescModel> {
        const url = `${this.fastApiUrl}/df_presc_sel/${presc_id}`;
        return this.http.get<PrescModel>(url);
    }

    updatePresc(presc_id: string, data: PrescModel): Observable<any> {
        const url = `${this.fastApiUrl}/df_presc_sel/update/${presc_id}`;
        return this.http.put<PrescModel>(url, data);
    }

    createPresc(data: PrescModel): Observable<any> {
        const url = `${this.fastApiUrl}/df_presc_sel/create`;
        return this.http.post(url, data);
    }

}
