import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { ResponsePedidoCompra } from '../../interfaces/compras/ResponsePedidoCompra';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PedidoCompraService {
  private http = inject(HttpClient);
  private baseURL: string = appsettings.apiUrl;

  constructor() {}

  obtenerPedidos(): Observable<ResponsePedidoCompra> {
    return this.http.get<ResponsePedidoCompra>(`${this.baseURL}pedidocompra/lista`);
  }

}
