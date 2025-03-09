import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './dashboard/acceso/login/login.component';
import { PedidosComponent } from './dashboard/compras/pedidocompra/pedidocompra-listado/pedidocompra-listado.component';
import { PresupuestocompraListaComponent } from './dashboard/compras/presupuestocompra/presupuestocompra-lista/presupuestocompra-lista.component';
import { TipoIvaComponent } from './dashboard/referenciales/tipo-iva/tipo-iva.component';
import { PedidoCompraFormComponent } from './dashboard/compras/pedidocompra/pedidocompra-nuevo/pedidocompra-nuevo.component';
import { PresupuestocompraNuevoComponent } from './dashboard/compras/presupuestocompra/presupuestocompra-nuevo/presupuestocompra-nuevo.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige al login por defecto
  { path: 'login', component: LoginComponent },  // Ruta para login
  {
    path: 'dashboard',  // Ruta contenedora de todas las rutas hijas
    children: [
      { path: 'pedidocompra', component: PedidosComponent },  // Ruta de listado de pedidos
      { path: 'nuevo-pedidocompra', component: PedidoCompraFormComponent },  // Ruta para nuevo pedido
      { path: 'tipoiva', component: TipoIvaComponent },  // Ruta para tipo IVA
      { path: 'presupuestocompralista', component: PresupuestocompraListaComponent },  // Ruta de listado de pedidos
      { path: 'presupuestocompranuevo', component: PresupuestocompraNuevoComponent },  // Ruta de listado de pedidos
    ]
  },
  { path: '**', redirectTo: '/login' }  // Ruta para 404, redirige al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
