import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresupuestoCompraService } from '../../../../services/compras/presupuestocompra.service';
import { MPresupuestoCompra, MPresupuestoCompraDet } from '../../../../interfaces/compras/presupuestocompra/presupuestocompra';

@Component({
  selector: 'app-presupuestocompra-nuevo',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,],
  templateUrl: './presupuestocompra-nuevo.component.html',
  styleUrl: './presupuestocompra-nuevo.component.css'
})
export class PresupuestocompraNuevoComponent {
  private presupuestoCompraService = inject(PresupuestoCompraService);
  private snackBar = inject(MatSnackBar);

  public cabecera : MPresupuestoCompra = {
      codpresupuestocompra: 0,
      fechapresupuesto: '',
      codcomprobante: 0,
      numcomprobante: '',
      numpresupuestoc: '',
      codproveedor: 0,
      numproveedor: '',
      numdoc: '',
      razonsocial: '',
      codestado: 0,
      codmoneda: 0,
      desmoneda: '',
      codsucursal: 0,
      numsuc: '',
      totalexenta: 0,
      totaliva: 0,
      totalgravada: 0,
      totalpresupuesto:0,
      codusu:0,
      nomusu: '',
      detalles: []
    };

  public detalle : MPresupuestoCompraDet = {
      codpresupuestocompra: 0,
      codproducto: 0,
      codigobarra: '',
      desproducto: '',
      preciocompra: 0,
      precioneto: 0,
      cantidad: 0
    };

  public displayedColumns: string[] = ['codbarra', 'descripcion', 'cantidad', 'iva', 'precioneto','preciocompra', 'acciones'];


  constructor(private router: Router) {};
  cancelar() {
  this.router.navigate(['presupuestocompralista']);
  }
}
