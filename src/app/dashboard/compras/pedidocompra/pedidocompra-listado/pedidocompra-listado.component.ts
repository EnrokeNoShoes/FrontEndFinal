import { Component, inject, IterableDiffers, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../../services/compras/pedidocompra.service';
import { MPedidoCompra } from '../../../../interfaces/compras/pedidocompra';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-pedidocompra-listado',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './pedidocompra-listado.component.html',
  styleUrls: ['./pedidocompra-listado.component.css']
})
export class PedidosComponent implements OnInit {
  private pedidoCompraService = inject(PedidoCompraService);
  public pedidos: MPedidoCompra[] = [];
  public displayedColumns: string[] = [
    'numcomprobantepc',
    'numcomprobante',
    'numsuc',
    'dessuc',
    'fechapedido',
    'desestado',
    'acciones'
  ];

  constructor() {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  private cargarPedidos() {
    this.pedidoCompraService.obtenerPedidos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);

        // Asignar datos a pedidos (si es un array directamente)
        if (Array.isArray(data)) {
          this.pedidos = data.map(item => ({
            codpedidocompra: item.codpedidocompra,
            codsucursal: item.codsucursal,
            numsuc: item.numsuc,
            dessuc: item.dessuc,
            fechapedido: item.fechapedido,
            codcomprobante: item.codcomprobante,
            numcomprobante: item.numcomprobante,
            descomprobante: item.descomprobante,
            numcomprobantepc: item.numcomprobantepc,
            codestado: item.codestado,
            numestado: item.numestado,
            desestado: item.desestado,
            codusu: item.codusu,
            nomusu: item.nomusu,
            acciones: item.acciones,
            detalles: [] // Aseguramos que 'detalles' esté vacío
          }));
        } else {
          console.warn('Formato de datos inesperado:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }
}
