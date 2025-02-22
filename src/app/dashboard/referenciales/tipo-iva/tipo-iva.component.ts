import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TipoIvaService } from '../../../services/referenciales/tipo-iva.service';
import { TipoIva } from '../../../interfaces/TipoIva';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-iva',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './tipo-iva.component.html',
  styleUrls: ['./tipo-iva.component.css']
})
export class TipoIvaComponent {
  private tipoivaServicio = inject(TipoIvaService);
  public listaTipoiva: TipoIva[] = [];
  public displayedColumns: string[] = ['numiva', 'desiva', 'coheficiente'];

  constructor() {
    this.cargarTipoIva(); // Cargar los datos de IVA sin codempresa
  }

  private cargarTipoIva() {
    this.tipoivaServicio.getTipoIva().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        
        // Si 'data' es un objeto con 'value'
        if (data && Array.isArray(data.value)) {
          this.listaTipoiva = data.value.map(item => ({
            codIva: item.codIva,
            codUsuario: item.codUsuario,
            coheficiente: item.coheficiente,
            numiva: item.numiva,
            desiva: item.desiva,
          }));
        } 
        // Si 'data' es un array directo
        else if (Array.isArray(data)) {
          this.listaTipoiva = data.map(item => ({
            codIva: item.codIva,
            codUsuario: item.codUsuario,
            coheficiente: item.coheficiente,
            numiva: item.numiva,
            desiva: item.desiva,
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
