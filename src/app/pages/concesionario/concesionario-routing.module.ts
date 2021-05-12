import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConcesionarioComponent} from './concesionario.component';

const routes: Routes = [{
  path: '', component: ConcesionarioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcesionarioRoutingModule { }
