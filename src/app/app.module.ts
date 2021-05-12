import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './providers/http/http.service';
import { NgxMatAlertConfirmModule, NgxMatAlertConfirmService } from 'ngx-mat-alert-confirm';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './providers/auth/auth.service';
import { MatDialogModule} from '@angular/material/dialog';
import {DialogConfirmComponent} from './providers/util/dialog-confirm';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxMatAlertConfirmModule,
    MatDialogModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    HttpService,
    NgxMatAlertConfirmService
  ]
})
export class AppModule { }
