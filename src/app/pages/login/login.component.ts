import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { retry } from 'rxjs';
import { Login } from '../../interfaces/Login';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private accesoService = inject(AccesoService)
  private router = inject(Router)
  public formBuild = inject(FormBuilder);

  public fromAcceso:FormGroup = this.formBuild.group({
    NomUsu:['',Validators.required],
    PassUsu:['',Validators.required],
    codempresa:['',Validators.required]
  })

  iniciarSesion(){
    if(this.fromAcceso.invalid) return;
    const objeto:Login = {
      NomUsu:this.fromAcceso.value.NomUsu,
      PassUsu:this.fromAcceso.value.PassUsu,
      codempresa:this.fromAcceso.value.codempresa
    }
    this.accesoService.login(objeto).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          localStorage.setItem("token",data.token)
          this.router.navigate(['tipoiva'])
        }else{
              alert("Credenciales son incorrectas")
        }
      },
      error:(error) =>{
        console.log(error.message);
      }
    })
  }

}
