import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/acceso/login/login.component';
import { TipoIvaComponent } from './dashboard/referenciales/tipo-iva/tipo-iva.component';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    /*{path:"tipoiva",component:TipoIvaComponent, canActivate:[authGuard]}*/
    {path:"tipoiva",component:TipoIvaComponent}
];
