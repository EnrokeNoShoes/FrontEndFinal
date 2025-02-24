import { Component, inject, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../../services/compras/pedidocompra.service';
import { MPedidoCompra } from '../../../../interfaces/compras/pedidocompra';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedidocompra-listado',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './pedidocompra-listado.component.html',
  styleUrls: ['./pedidocompra-listado.component.css']
})
export class PedidosComponent implements OnInit {
  private pedidoCompraService = inject(PedidoCompraService);
  public pedidos: MPedidoCompra[] = [];
  public pedidosFiltrados: MPedidoCompra[] = [];
  private snackBar = inject(MatSnackBar);
  public filtro: string = '';
  public displayedColumns: string[] = [
    'numcomprobantepc',
    'numcomprobante',
    'numsuc',
    'dessuc',
    'fechapedido',
    'nomusu',
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
            detalles: []
          }));
          this.pedidosFiltrados = [...this.pedidos];
        } else {
          console.warn('Formato de datos inesperado:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  nuevoRegistro() {
    console.log('Abrir formulario para nuevo registro');
    // Aquí iría la lógica para abrir un modal o navegar a una página de creación de pedidos
  }

  modificarPedido(pedido: MPedidoCompra) {
    console.log('Modificar pedido:', pedido);
    // Aquí iría la lógica para modificar el pedido
  }

  anularPedido(codpedidocompra: number) {
    const codestado = 2; // Estado para "Anulado"
    
    if (confirm('¿Estás seguro de que deseas anular este pedido?')) {
      this.pedidoCompraService.anularPedido(codpedidocompra, codestado).subscribe({
        next: (response) => {
          alert(response.message);  // Mostrar mensaje de éxito
          this.cargarPedidos(); // Refrescar la lista después de anular
        },
        error: (err) => {
          // En el error, solo recuperamos el mensaje
          if (err.status === 400 || err.status === 500 || err.status === 409) {
            alert(err.error.message);  // Mostrar el mensaje de error
          } else {
            // Si el error no tiene un código específico, mostramos un mensaje general
            console.error('Error desconocido:', err);
            alert('Hubo un error al procesar la solicitud. Intenta nuevamente más tarde.');
          }
        }
      });
    }
  }
  
  imprimirPedido(pedido: MPedidoCompra) {
    console.log('Imprimir pedido:', pedido);
    // Aquí iría la lógica para imprimir el pedido
  }

  filtrarPedidos() {
    this.pedidosFiltrados = this.pedidos.filter(pedido =>
      pedido.numcomprobantepc.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
