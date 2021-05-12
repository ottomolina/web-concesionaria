import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'concesionario', loadChildren: () => import('./concesionario/concesionario.module').then(m => m.ConcesionarioModule) },
      { path: 'mantenimiento', loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule) },
      { path: 'clientes', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'vehiculos', loadChildren: () => import('./vehiculo/vehiculo.module').then(m => m.VehiculoModule) },
      { path: 'cotizaciones', loadChildren: () => import('./cotizacion/cotizacion.module').then(m => m.CotizacionModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
