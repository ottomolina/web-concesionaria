import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {TitleBarModule} from '../../components/title-bar/title-bar.module';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomInputModule} from '../../components/custom-input/custom-input.module';
import {CustomSelectModule} from '../../components/custom-select/custom-select.module';
import {ClienteService} from '../../providers/cliente/cliente.service';


@NgModule({
  declarations: [ClienteComponent, ClienteDialogComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TitleBarModule,
    ReactiveFormsModule,
    CustomInputModule,
    CustomSelectModule
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
