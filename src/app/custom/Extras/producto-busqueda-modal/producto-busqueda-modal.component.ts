import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../../../services/referenciales/producto.service';
import { ProductoBusqueda } from '../../../interfaces/referenciales/Producto/Producto';
import { MatDialogModule } from '@angular/material/dialog';  // Asegúrate de que el MatDialogModule está aquí
import { MatButtonModule } from '@angular/material/button';  // Para los botones
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';  // Para el uso de ngModel
import { CommonModule } from '@angular/common';  // Importamos el CommonModule
import { MatListModule } from '@angular/material/list';  // Para la lista de productos

@Component({
  selector: 'app-producto-busqueda-modal',
  templateUrl: './producto-busqueda-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,       // Usamos CommonModule en lugar de BrowserModule
    MatDialogModule,    
    MatButtonModule,  
    HttpClientModule,
    FormsModule,MatListModule
  ],
  styleUrls: ['./producto-busqueda-modal.component.css'],
})
export class ProductoBusquedaModalComponent {

  productos: ProductoBusqueda[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductoBusquedaModalComponent>,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getListaProducto().subscribe((response) => {
      this.productos = response;
    });
  }

  seleccionarProducto(producto: ProductoBusqueda): void {
    this.dialogRef.close(producto); // Devuelve el producto seleccionado al formulario principal
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
