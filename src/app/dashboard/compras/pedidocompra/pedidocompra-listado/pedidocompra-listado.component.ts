import { Component, inject, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../../services/compras/pedidocompra.service';
import { MPedidoCompra } from '../../../../interfaces/compras/pedidocompra/pedidocompra';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Usar ReactiveFormsModule

@Component({
  selector: 'app-pedidocompra-listado',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './pedidocompra-listado.component.html',
  styleUrls: ['./pedidocompra-listado.component.css'],
})
export class PedidosComponent implements OnInit {
  private pedidoCompraService = inject(PedidoCompraService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  public pedidos: MPedidoCompra[] = [];
  public pedidosFiltrados: MPedidoCompra[] = [];
  public filtro: string = ''; // Campo de filtro para búsqueda

  public formBuild = inject(FormBuilder);

  // Formulario de filtro (opcional, pero útil para validaciones)
  public filtroForm: FormGroup = this.formBuild.group({
    numpedidocompra: ['', Validators.required], // Aquí agregas el campo de filtro
  });

  public displayedColumns: string[] = [
    'numpedidocompra',
    'numcomprobante',
    'numsuc',
    'dessuc',
    'fechapedido',
    'nomusu',
    'desestado',
    'acciones',
  ];

  constructor() {}

  ngOnInit(): void {
    this.cargarPedidos(); // Cargar pedidos al inicio
  }

  // Función para cargar los pedidos desde el servicio
  private cargarPedidos() {
    this.pedidoCompraService.obtenerPedidos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);

        if (Array.isArray(data)) {
          this.pedidos = data.map((item) => ({
            codpedidocompra: item.codpedidocompra,
            codsucursal: item.codsucursal,
            numsuc: item.numsuc,
            dessuc: item.dessuc,
            fechapedido: item.fechapedido,
            codcomprobante: item.codcomprobante,
            numcomprobante: item.numcomprobante,
            descomprobante: item.descomprobante,
            numpedidocompra: item.numpedidocompra,
            codestado: item.codestado,
            numestado: item.numestado,
            desestado: item.desestado,
            codusu: item.codusu,
            nomusu: item.nomusu,
            acciones: item.acciones,
            detalles: [],
          }));
          this.pedidosFiltrados = [...this.pedidos]; // Duplicar para filtrar
        } else {
          console.warn('Formato de datos inesperado:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      },
    });
  }

  // Función para redirigir a la vista de crear nuevo pedido
  nuevoRegistro() {
    console.log('Intentando abrir formulario para nuevo registro');
    this.router.navigate(['pedidocompra-nuevo']).then((success) => {
      console.log('Navegación exitosa');
    });
  }

  // Función para filtrar pedidos según el campo de filtro
  filtrarPedidos() {  
    const filtro = this.filtro.toLowerCase();
    this.pedidosFiltrados = this.pedidos.filter((pedido) => {
      const numComprobantePc = pedido.numpedidocompra?.toString().toLowerCase() || '';
      return numComprobantePc.includes(filtro);
    });
  }
  

  // Modificar un pedido
  modificarPedido(pedido: MPedidoCompra) {
    console.log('Modificar pedido:', pedido);
    // Aquí iría la lógica para modificar el pedido
  }

  // Anular un pedido
  anularPedido(codpedidocompra: number) {
    const codestado = 2; // Estado para "Anulado"
    console.log('Modificar pedido:', codpedidocompra);
    if (confirm('¿Estás seguro de que deseas anular este pedido?')) {
      this.pedidoCompraService.anularPedido(codpedidocompra, codestado).subscribe({
        next: (response) => {
          alert(response.message); // Mostrar mensaje de éxito
          this.cargarPedidos(); // Refrescar la lista después de anular
        },
        error: (err) => {
          if (err.status === 400 || err.status === 500 || err.status === 409) {
            alert(err.error.message); // Mostrar mensaje de error
          } else {
            console.error('Error desconocido:', err);
            alert('Hubo un error al procesar la solicitud. Intenta nuevamente más tarde.');
          }
        },
      });
    }
  }

  // Imprimir un pedido
  imprimirPedido(pedido: MPedidoCompra) {
    console.log('Imprimir pedido:', pedido);
    // Aquí iría la lógica para imprimir el pedido
  }
}
