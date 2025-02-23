import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from '../app/dashboard/compras/pedidocompra/pedidocompra-listado/pedidocompra-listado.component';
import { TipoIvaComponent } from '../app/dashboard/referenciales/tipo-iva/tipo-iva.component';
import { DashboardComponent } from '../app/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'pedidocompra', component: PedidosComponent },
      { path: 'tipoiva', component: TipoIvaComponent },
      // Aquí puedes agregar más rutas para otros módulos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
