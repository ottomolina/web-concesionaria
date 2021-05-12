import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcesionarioRoutingModule } from './concesionario-routing.module';
import { ConcesionarioComponent } from './concesionario.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MensajeInformativoModule} from '../../components/mensaje-informativo/mensaje-informativo.module';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [ConcesionarioComponent],
  imports: [
    CommonModule,
    ConcesionarioRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MensajeInformativoModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class ConcesionarioModule { }
