import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { CotizacionComponent } from './cotizacion.component';
import {TitleBarModule} from '../../components/title-bar/title-bar.module';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TablaCotizacionComponent } from './tabla-cotizacion/tabla-cotizacion.component';
import { CotizacionDialogComponent } from './cotizacion-dialog/cotizacion-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {CustomInputModule} from '../../components/custom-input/custom-input.module';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { ClTablaComponent } from './cotizacion-dialog/cl-tabla/cl-tabla.component';
import { CarTablaComponent } from './cotizacion-dialog/car-tabla/car-tabla.component';
import { ConfirmaDatosComponent } from './cotizacion-dialog/confirma-datos/confirma-datos.component';
import {TablaDetalleModule} from '../../components/tabla-detalle/tabla-detalle.module';


@NgModule({
  declarations: [CotizacionComponent, TablaCotizacionComponent, CotizacionDialogComponent, ClTablaComponent, CarTablaComponent, ConfirmaDatosComponent],
  imports: [
    CommonModule,
    CotizacionRoutingModule,
    TitleBarModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    CustomInputModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    TablaDetalleModule
  ]
})
export class CotizacionModule { }
