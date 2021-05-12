import {NgModule} from '@angular/core';
import {LoadingComponent} from './loading.component';
import {CommonModule} from '@angular/common';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [ LoadingComponent ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [ LoadingComponent ]
})
export class LoadingModule { }
