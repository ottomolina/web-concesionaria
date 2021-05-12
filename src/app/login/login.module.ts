import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CustomInputModule} from '../components/custom-input/custom-input.module';
import {UsuarioService} from '../providers/usuario/usuario.service';
import {NgxLoadingModule} from 'ngx-loading';
import {LoadingModule} from '../components/loading/loading.module';
import {AuthService} from '../providers/auth/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    CustomInputModule,
    ReactiveFormsModule,
    LoadingModule,
  ],
  providers: [
    UsuarioService,
    AuthService
  ]
})
export class LoginModule { }
