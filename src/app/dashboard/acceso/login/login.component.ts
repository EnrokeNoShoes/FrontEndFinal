import { Component, inject, OnInit } from '@angular/core';
import { AccesoService } from '../../../services/acceso/acceso.service';
import { SucursalService } from '../../../services/referenciales/sucursal.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../../interfaces/Login';
import { Sucursal } from '../../../interfaces/Sucursal'; // Interfaz de empresa
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { GlobalStateService } from '../../../services/global-state.service';; // Importar el servicio global

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private accesoService = inject(AccesoService);
  private sucursalService = inject(SucursalService);
  private router = inject(Router);
  private globalStateService = inject(GlobalStateService); // Inyectar el servicio global
  public formBuild = inject(FormBuilder);

  public sucursales: Sucursal[] = []; // Array de empresas
  public filteredSucursales: Sucursal[] = []; // Array para empresas filtradas

  public fromAcceso: FormGroup = this.formBuild.group({
    NomUsu: ['', Validators.required],
    PassUsu: ['', Validators.required],
    codSucursal: ['', Validators.required] // Campo para el código de empresa
  });

  ngOnInit() {
    this.sucursalService.getSucursal().subscribe({
      next: (data: Sucursal[]) => {
        console.log('Sucursales recibidas:', data); // 🔍 Verifica la estructura
        this.sucursales = data;
        this.filteredSucursales = data;
      },
      error: (err) => console.error('Error al cargar las sucursales:', err)
    });
  }
  
  

  onSucursalChange(event: MatSelectChange) {
  console.log('Evento de selección detectado:', event);
  console.log('Valor seleccionado:', event.value);

  if (event.value) {
    this.fromAcceso.patchValue({ codSucursal: event.value });
    this.globalStateService.setCodSucursal(event.value);
    console.log('Formulario actualizado:', this.fromAcceso.value);
  } else {
    console.error('Código de sucursal inválido:', event.value);
    alert('Por favor, selecciona una sucursal válida.');
  }
}

  
  
  iniciarSesion() {
    if (this.fromAcceso.invalid) {
      return;
    }

    const objeto: Login = {
      NomUsu: this.fromAcceso.value.NomUsu,
      PassUsu: this.fromAcceso.value.PassUsu,
      codSucursal: this.fromAcceso.value.codSucursal
    };

    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          localStorage.setItem("token", data.token);
          this.router.navigate(['tipoiva']);
        } else {
          alert("Credenciales son incorrectas");
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  // Función para filtrar empresas según la entrada del usuario (opcional)
  filterSucursal(value: string) {
    this.filteredSucursales = this.sucursales.filter(sucursal =>
      sucursal.numsuc.toLowerCase().includes(value.toLowerCase()) ||
      sucursal.dessucu.toLowerCase().includes(value.toLowerCase())
    );
  }
}
