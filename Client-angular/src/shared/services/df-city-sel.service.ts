import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';
import { environment } from 'environments/environment-fastApi';
import { CityUpdate } from '@shared/models/CityUpdate.model';

@Injectable({
    providedIn: 'root'
})
export class DfCitySelService {
    private fastApiUrl = environment.fastApiUrl;

    constructor(private http: HttpClient) { }

    getCities(keyword: string, skip: number, limit: number): Observable<CityModel[]> {
        const url = `${this.fastApiUrl}/df_city_sel/?keyword=${keyword}&skip=${skip}&limit=${limit}`;
        return this.http.get<CityModel[]>(url);
    }

    deleteCity(city: string, state_id: string): Observable<any> {
        const url = `${this.fastApiUrl}/df_city_sel/delete/${city}/${state_id}`;
        return this.http.delete(url);
    }

    getInfos(city: string, state_id: string): Observable<CityModel> {
        const url = `${this.fastApiUrl}/df_city_sel/${city}/${state_id}`;
        return this.http.get<CityModel>(url);
    }

    updateCity(city: string, state_id: string, data: CityUpdate): Observable<any> {
        const url = `${this.fastApiUrl}/df_city_sel/update/${city}/${state_id}`;
        return this.http.put<CityModel>(url, data);
    }

    createCity(data: CityModel): Observable<any> {
        const url = `${this.fastApiUrl}/df_city_sel/create`;
        return this.http.post(url, data);
    }

}
