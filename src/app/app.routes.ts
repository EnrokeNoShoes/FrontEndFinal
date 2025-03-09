import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/acceso/login/login.component';
import { TipoIvaComponent } from './dashboard/referenciales/tipo-iva/tipo-iva.component';
import { PedidosComponent } from './dashboard/compras/pedidocompra/pedidocompra-listado/pedidocompra-listado.component';
import { PedidoCompraFormComponent } from './dashboard/compras/pedidocompra/pedidocompra-nuevo/pedidocompra-nuevo.component';
import { PresupuestocompraListaComponent } from './dashboard/compras/presupuestocompra/presupuestocompra-lista/presupuestocompra-lista.component';
import { PresupuestocompraNuevoComponent } from './dashboard/compras/presupuestocompra/presupuestocompra-nuevo/presupuestocompra-nuevo.component';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    /*{path:"tipoiva",component:TipoIvaComponent, canActivate:[authGuard]}*/
    {path:"pedidocompra",component:PedidosComponent},
    {path:"pedidocompra-nuevo",component:PedidoCompraFormComponent},
    {path: 'presupuestocompralista', component: PresupuestocompraListaComponent },
    {path: 'presupuestocompranuevo', component: PresupuestocompraNuevoComponent }
];
