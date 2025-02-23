import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../../settings/appsettings';
import { Observable } from 'rxjs';
import { Sucursal } from '../../interfaces/referenciales/Sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private http = inject(HttpClient);
  private baseURL: string = appsettings.apiUrl;

  constructor() {}

  getSucursal(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.baseURL}sucursal`);
  }
}