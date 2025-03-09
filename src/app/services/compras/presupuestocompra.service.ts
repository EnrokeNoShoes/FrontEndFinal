import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { ResponsePedidoCompra } from '../../interfaces/compras/presupuestocompra/ResponsePresupuestoCompra';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoCompraService {
  private http = inject(HttpClient);
  private baseURL: string = appsettings.apiUrl;

  constructor() {}

  obtenerPresupuestoCompra(): Observable<ResponsePedidoCompra> {
    return this.http.get<ResponsePedidoCompra>(`${this.baseURL}presupuestocompra/lista`);
  }

  anularPedido(codpedidocompra: number, codestado: number): Observable<any> {
    const url = `${this.baseURL}presupuestocompra/anular?codpresup=${codpedidocompra}&codestado=${codestado}`;
    return this.http.put(url, {}); // Enviamos un body vacío ya que solo usamos la URL
  }    
}