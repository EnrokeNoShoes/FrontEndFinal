import { Component, inject, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../../services/compras/pedidocompra.service';
import { MPedidoCompra, MDetallePedidoCompra } from '../../../../interfaces/compras/pedidocompra';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidocompra-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './pedidocompra-nuevo.component.html',
  styleUrls: ['./pedidocompra-nuevo.component.css']
})
export class PedidoCompraFormComponent implements OnInit {
  private pedidoCompraService = inject(PedidoCompraService);
  private snackBar = inject(MatSnackBar);

  public pedido: MPedidoCompra = {
    codpedidocompra: 0,
    fechapedido: '',
    codcomprobante: 0,
    numcomprobante: '',
    codusu: 0,
    nomusu: '',
    codsucursal: 0,
    numsuc: '',
    dessuc: '',
    descomprobante: '',
    numcomprobantepc: '',
    codestado: 0,
    numestado: '',
    desestado: '',
    acciones: '',
    detalles: []
  };
  
  public nuevoDetalle: MDetallePedidoCompra = {
    codpedidocompra: 0,
    codproducto: 0,
    codigobarra: '',
    desproducto: '',
    cantidad: 1,
    costoulitmo: 0
  };
  
  public displayedColumns: string[] = ['codbarra', 'descripcion', 'cantidad', 'acciones'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  agregarLinea() {
    if (this.nuevoDetalle.codigobarra && this.nuevoDetalle.desproducto && this.nuevoDetalle.cantidad > 0) {
      this.pedido.detalles.push({ ...this.nuevoDetalle });
      this.nuevoDetalle = { 
        codpedidocompra: this.pedido.codpedidocompra,  // Asignar el ID del pedido actual
        codproducto: 0,
        codigobarra: '',
        desproducto: '',
        cantidad: 1,
        costoulitmo: 0
      };
    } else {
      this.snackBar.open('Complete todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
  

  eliminarLinea(index: number) {
    this.pedido.detalles.splice(index, 1);
  }

  grabarRegistro() {
    /*this.pedidoCompraService.guardarPedido(this.pedido).subscribe({
      next: () => {
        this.snackBar.open('Pedido guardado exitosamente', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Error al guardar el pedido', 'Cerrar', { duration: 3000 });
        console.error('Error:', err);
      }
    });*/
  }

  cancelar() {
    // 🔹 Limpiar el formulario
    this.pedido = { 
      codpedidocompra: 0,
      fechapedido: '',
      codcomprobante: 0,
      numcomprobante: '',
      codusu: 0,
      nomusu: '',
      codsucursal: 0,
      numsuc: '',
      dessuc: '',
      descomprobante: '',
      numcomprobantepc: '',
      codestado: 0,
      numestado: '',
      desestado: '',
      acciones: '',
      detalles: []
    };
    
    // 🔹 Redirigir al listado de pedidos
    this.router.navigate(['pedidocompra']);
  }
  
}
