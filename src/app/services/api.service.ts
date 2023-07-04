import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICiudadEstado } from '../interfaces/ciudadEstado';
import { IFormDataDTO } from '../interfaces/formDataDTO';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private _http: HttpClient) { }

  url:string='https://localhost:7049/api'

  sendEmail(data:IFormDataDTO): Observable<IFormDataDTO>{
    return this._http.post<IFormDataDTO>(`${this.url}/Values/SendEmail`, data);
  }

  CityStateList():Observable<ICiudadEstado[]>{
    return this._http.get<ICiudadEstado[]>(`${this.url}/Values/CityStateList`);
  }
}
