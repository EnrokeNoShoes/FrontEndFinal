import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/Login';
import { ResponseAcceso } from '../../interfaces/ResponseAcceso';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient)
  private baseURL:string = appsettings.apiUrl;

  constructor() { }

  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseURL}acceso/`, objeto)
  }

  validarToken(token: string): Observable<ResponseAcceso> {
    return this.http.get<ResponseAcceso>(`${this.baseURL}Acceso/ValidarToken?token=${token}`)
  }
}
