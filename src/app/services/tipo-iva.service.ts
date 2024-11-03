import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseTipoIva } from '../interfaces/ResponseTipoIva';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TipoIvaService {
  private http = inject(HttpClient);
  private baseURL: string = appsettings.apiUrl;

  constructor() { }

  // Actualizar el método para que acepte codempresa como parámetro
  getTipoIva(codEmpresa: number): Observable<ResponseTipoIva> {
    return this.http.get<ResponseTipoIva>(`${this.baseURL}tipoiva?codempresa=${codEmpresa}`);
  }
}
