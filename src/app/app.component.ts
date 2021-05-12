import { Component, OnInit } from '@angular/core';

import { NgxMatAlertConfirmService } from 'ngx-mat-alert-confirm';
import {NotificationConfig} from './providers/util/NotificationConfig';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {DialogConfirmComponent} from './providers/util/dialog-confirm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoading = false;
  title = 'webConcesionario';

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  showMessage(message: string, action = null): void {
    const confirm = NotificationConfig.toasterMessage;
    confirm.message = message;
    const dialogueRef = this.alertService.confirm(confirm);

    dialogueRef.afterClosed().subscribe(confirmResult => {
      // confirmResult contains the id of the button clicked
      console.log(confirmResult);
      if (action) {
        action();
      }
    });
  }

  public showLoading(): void {
    if (!this.isLoading) {
      this.isLoading = true;
    }
  }

  public dismissLoading(): void {
    if (this.isLoading) {
      this.isLoading = false;
    }
  }

  public getDialogConfig(data?: any, width?: string, height?: string): MatDialogConfig {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = data;
    dialogConf.disableClose = true;
    dialogConf.height = height;
    dialogConf.width = width;
    return dialogConf;
  }

  public openDialog(component: ComponentType<any>, data: any, callback): void {
    const wdw = this.dialog.open(
      component,
      this.getDialogConfig( data )
    );

    wdw.afterClosed().subscribe(obj => {
      if (obj !== undefined && obj !== null) {
        if (callback) {
          callback();
        }
      }
    });
  }

  mostrarDialogo(mensaje: string, titulo: string, callbackYes, callbackNo): void {
    this.dialog.open(DialogConfirmComponent, {
        data: {
          mensaje,
          titulo: titulo ? titulo : `Confirmación`
        }
      })
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          if (callbackYes) { callbackYes(); }
        } else {
          if (callbackNo) { callbackNo(); }
        }
      });
  }

}
