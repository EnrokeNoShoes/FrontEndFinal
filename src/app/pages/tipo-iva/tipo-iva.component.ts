import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TipoIvaService } from '../../services/tipo-iva.service';
import { TipoIva } from '../../interfaces/TipoIva';
import { GlobalStateService } from '../../services/global-state.service';
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
  private globalStateService = inject(GlobalStateService); // Inyectar el servicio global
  public listaTipoiva: TipoIva[] = [];
  public displayedColumns: string[] = ['numiva', 'desiva', 'coheficiente'];
  public razonsocial: string | null = null;

  constructor() {
    // Suscribirse al codEmpresa para cargar los tipos de IVA cuando cambie
    this.globalStateService.codemp$.subscribe(codemp => {
      
      if (codemp !== null) {
        console.log('Valor de "value":', codemp);
        this.tipoivaServicio.getTipoIva(codemp).subscribe({
          next: (data) => {
            console.log('Datos recibidos:', data);
            
            // Si 'data' es un objeto con 'value'
            if (data && Array.isArray(data.value)) {
              this.listaTipoiva = data.value.map(item => ({
                codIva: item.codIva,
                codUsuario: item.codUsuario,
                codempresa: item.codempresa,
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
                codempresa: item.codempresa,
                coheficiente: item.coheficiente,
                numiva: item.numiva,
                desiva: item.desiva,
              }));
            } else {
              console.warn('Formato de datos inesperado:', data);
            }
          }
          ,
          error: (err) => {
            console.error('Error al obtener datos:', err);
          }
        });        
      } else {
        // Limpiar la lista si no hay un código de empresa válido
        this.listaTipoiva = [];
      }
    });
  }


  
}
