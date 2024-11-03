import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5071/api/empresa'; // Cambia esta URL al endpoint correcto

  constructor() {}

  // Método para obtener la lista de empresas
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }
}
