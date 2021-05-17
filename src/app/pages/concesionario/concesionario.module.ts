import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcesionarioRoutingModule } from './concesionario-routing.module';
import { ConcesionarioComponent } from './concesionario.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MensajeInformativoModule} from '../../components/mensaje-informativo/mensaje-informativo.module';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {CustomInputModule} from '../../components/custom-input/custom-input.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConcesionarioService} from '../../providers/concesionario/concesionario.service';
import {LoadingModule} from '../../components/loading/loading.module';
import {AuthService} from '../../providers/auth/auth.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConcesionarioDialogComponent } from './concesionario-dialog/concesionario-dialog.component';
import {UsuarioService} from '../../providers/usuario/usuario.service';


@NgModule({
  declarations: [ConcesionarioComponent, ConcesionarioDialogComponent],
  imports: [
    CommonModule,
    ConcesionarioRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MensajeInformativoModule,
    MatTableModule,
    MatIconModule,
    CustomInputModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    MatPaginatorModule
  ],
  providers: [
    ConcesionarioService,
    UsuarioService
  ]
})
export class ConcesionarioModule { }
