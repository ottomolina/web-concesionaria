import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CotizacionComponent} from './cotizacion.component';

const routes: Routes = [{
  path: '', component: CotizacionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }
