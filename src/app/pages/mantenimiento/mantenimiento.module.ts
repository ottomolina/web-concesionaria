import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TitleBarModule} from '../../components/title-bar/title-bar.module';
import {MatTableModule} from '@angular/material/table';
import { TiposComponent } from './tipos/tipos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MarcasComponent } from './marcas/marcas.component';
import { LineaComponent } from './linea/linea.component';
import {MatIconModule} from '@angular/material/icon';
import { TipoDialogComponent } from './tipos/tipo-dialog/tipo-dialog.component';
import { MarcaDialogComponent } from './marcas/marca-dialog/marca-dialog.component';
import { LineaDialogComponent } from './linea/linea-dialog/linea-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomInputModule} from '../../components/custom-input/custom-input.module';
import {MatDialogModule} from '@angular/material/dialog';
import {CustomSelectModule} from '../../components/custom-select/custom-select.module';
import {TipoService} from '../../providers/mantenimiento/tipo.service';
import {MarcaService} from '../../providers/mantenimiento/marca.service';
import {LineaService} from '../../providers/mantenimiento/linea.service';


@NgModule({
  declarations: [
    MantenimientoComponent,
    TiposComponent,
    MarcasComponent,
    LineaComponent,
    TipoDialogComponent,
    MarcaDialogComponent,
    LineaDialogComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MatTabsModule,
    TitleBarModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    CustomInputModule,
    MatDialogModule,
    CustomSelectModule
  ],
  providers: [
    LineaService,
    MarcaService,
    TipoService,
  ]
})
export class MantenimientoModule { }
