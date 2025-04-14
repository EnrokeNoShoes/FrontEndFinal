import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../../settings/appsettings';
import { Observable } from 'rxjs';
import { ProductoBusqueda } from '../../interfaces/referenciales/Producto/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseURL: string = appsettings.apiUrl;
  
  constructor() { }

  getListaProducto(): Observable<ProductoBusqueda[]> {
     return this.http.get<ProductoBusqueda[]>(`${this.baseURL}/producto/buscador`);
  }

}
