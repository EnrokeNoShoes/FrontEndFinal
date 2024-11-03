import { Component, inject, OnInit } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { Empresa } from '../../interfaces/Empresa'; // Interfaz de empresa
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { GlobalStateService } from '../../services/global-state.service';; // Importar el servicio global

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
  private empresaService = inject(EmpresaService);
  private router = inject(Router);
  private globalStateService = inject(GlobalStateService); // Inyectar el servicio global
  public formBuild = inject(FormBuilder);

  public empresas: Empresa[] = []; // Array de empresas
  public filteredEmpresas: Empresa[] = []; // Array para empresas filtradas

  public fromAcceso: FormGroup = this.formBuild.group({
    NomUsu: ['', Validators.required],
    PassUsu: ['', Validators.required],
    codempresa: ['', Validators.required] // Campo para el código de empresa
  });

  ngOnInit() {
    this.empresaService.getEmpresas().subscribe({
      next: (data: Empresa[]) => {
        this.empresas = data;
        this.filteredEmpresas = data; // Inicializa filteredEmpresas con todas las empresas
      },
      error: (err) => console.error('Error al cargar empresas:', err)
    });
  }

  onEmpresaChange(event: MatSelectChange) {
    const selectedCodEmpresa = event.value; // Ahora es el código de la empresa
    
    // Validación más robusta
    if (Number.isInteger(selectedCodEmpresa)) {
      this.fromAcceso.patchValue({ codempresa: selectedCodEmpresa }); // Actualiza solo el código
      this.globalStateService.setCodEmpresa(selectedCodEmpresa); // Actualiza el servicio global
    } else {
      console.error('Código de empresa inválido:', selectedCodEmpresa);
      alert('Por favor, selecciona una empresa válida.');
    }
  }
  
  iniciarSesion() {
    if (this.fromAcceso.invalid) {
      return;
    }

    const objeto: Login = {
      NomUsu: this.fromAcceso.value.NomUsu,
      PassUsu: this.fromAcceso.value.PassUsu,
      codempresa: this.fromAcceso.value.codempresa
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
  filterEmpresas(value: string) {
    this.filteredEmpresas = this.empresas.filter(empresa =>
      empresa.ruc_ci.toLowerCase().includes(value.toLowerCase()) ||
      empresa.razonsocial.toLowerCase().includes(value.toLowerCase())
    );
  }
}
