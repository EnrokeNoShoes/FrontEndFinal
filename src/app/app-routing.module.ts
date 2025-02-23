import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes
import { LoginComponent } from './dashboard/acceso/login/login.component';
import { PedidosComponent } from './dashboard/compras/pedidocompra/pedidocompra-listado/pedidocompra-listado.component';
import { TipoIvaComponent } from './dashboard/referenciales/tipo-iva/tipo-iva.component';
//import { DashboardComponent } from '../app/dashboard/dashboard/dashboard.component';
import { authGuard } from './custom/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: 'login', component: LoginComponent }, // Ruta para login
  {
    path: 'dashboard',
    //component: DashboardComponent, // Dashboard como contenedor principal
    canActivate: [authGuard], // Protege el acceso con guard (opcional)
    children: [
      { path: 'pedidocompra', component: PedidosComponent }, // Ruta de pedidos
      { path: 'tipoiva', component: TipoIvaComponent }, // Ruta de tipo IVA
    ]
  },
  { path: '**', redirectTo: '/login' } // Redirige a login si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas
  exports: [RouterModule] // Exporta el RouterModule para usarlo en otras partes de la app
})
export class AppRoutingModule {}
