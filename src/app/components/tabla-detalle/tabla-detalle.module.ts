import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDetalleComponent } from './tabla-detalle.component';



@NgModule({
  declarations: [TablaDetalleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TablaDetalleComponent
  ]
})
export class TablaDetalleModule { }
