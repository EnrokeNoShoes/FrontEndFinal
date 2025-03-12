import { Component, inject, OnInit } from '@angular/core';
import { PresupuestoCompraService } from '../../../../services/compras/presupuestocompra.service';
import { MPresupuestoCompra } from '../../../../interfaces/compras/presupuestocompra/presupuestocompra';
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
  selector: 'app-presupuestocompra-lista',
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
  templateUrl: './presupuestocompra-lista.component.html',
  styleUrl: './presupuestocompra-lista.component.css'
})
export class PresupuestocompraListaComponent {
  private presupestoCompraService = inject(PresupuestoCompraService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  public presupuestoc: MPresupuestoCompra[] = [];
  public presupuestocFiltrados: MPresupuestoCompra[] = [];
  public filtro: string = ''; // Campo de filtro para búsqueda
  public formBuild = inject(FormBuilder);

  public filtroForm: FormGroup = this.formBuild.group({
    numpresupuestoc: ['', Validators.required], // Aquí agregas el campo de filtro
    razonsocial: ['', Validators.required],
  });

  public displayedColumns: string[] = [
    'numcomprobante',
    'numpresupuestoc',
    'fechapresupuesto',
    'numproveedor',
    'razonsocial',
    'numsuc',
    'dessucu',
    'nomusu',
    'desmoneda',
    'totalpresupuesto',
    'desestado',
    'acciones',
  ];

  constructor() {}

  ngOnInit(): void {
    this.cargarpresupuestoC();
  }
  private cargarpresupuestoC() {

    this.presupestoCompraService.obtenerPresupuestoCompra().subscribe(
      {
        next: (data) => {
          console.log('Datos recibidos:', data);
  
          if (Array.isArray(data)) {
            this.presupuestoc = data.map((item) => ({
              codpresupuestocompra: item.codpresupuestocompra,
              fechapresupuesto: item.fechapresupuesto,
              numcomprobante: item.numcomprobante,
              descomprobante: item.descomprobante,
              numpresupuestoc: item.numcomprobantepc,
              totalpresupuesto: item.totalpresupuesto,
              numproveedor: item.numproveedor,
              numdoc: item.numdoc,
              razonsocial: item.razonsocial,
              numsuc: item.numsuc,
              dessuc: item.dessuc,           
              numestado: item.numestado,
              desestado: item.desestado,
              nomusu: item.nomusu,
              acciones: item.acciones,
            }));
            this.presupuestocFiltrados = [...this.presupuestoc]; // Duplicar para filtrar
          } else {
            console.warn('Formato de datos inesperado:', data);
          }
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        },
      }
    )
  }

  filtrarPresupuesto() {  
      const filtro = this.filtro.toLowerCase();
      this.presupuestocFiltrados = this.presupuestoc.filter((presupuestoc) => {
        const numPresupuestoC = presupuestoc.numpresupuestoc?.toString().toLowerCase() || '';
        return numPresupuestoC.includes(filtro);
      });
    }
    
    // Anular un pedido
    anularPresupuesto(codpresupuestocompra: number) {
      const codestado = 2; // Estado para "Anulado"
  
      if (confirm('¿Estás seguro de que deseas anular este presupuesto?')) {
        this.presupestoCompraService.anularPedido(codpresupuestocompra, codestado).subscribe({
          next: (response) => {codpresupuestocompra
            alert(response.message); // Mostrar mensaje de éxito
            this.cargarpresupuestoC(); // Refrescar la lista después de anular
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

    nuevoRegistro() {
      console.log('Intentando abrir formulario para nuevo registro');
      this.router.navigate(['presupuestocompranuevo']).then((success) => {
        if (success) {
          console.log('Navegación exitosa');
        } else {
          console.log('Error al navegar');
        }
      });
    }

    imprimirPresupuesto(presupuestoc: MPresupuestoCompra) {
        console.log('Imprimir presupuesto:', presupuestoc);
        // Aquí iría la lógica para imprimir el pedido
    }
}
