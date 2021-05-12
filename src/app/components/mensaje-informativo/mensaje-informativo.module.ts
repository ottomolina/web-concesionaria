import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeInformativoComponent } from './mensaje-informativo.component';



@NgModule({
  declarations: [MensajeInformativoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MensajeInformativoComponent
  ]
})
export class MensajeInformativoModule { }
