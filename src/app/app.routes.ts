import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TipoIvaComponent } from './pages/tipo-iva/tipo-iva.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"tipoiva",component:TipoIvaComponent}
];
