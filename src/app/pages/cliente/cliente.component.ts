import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {ClienteDialogComponent} from './cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent extends AppComponent {
  public lstData = [];

  public displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'telefono', 'correo', 'options'];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog) {
    super(alertService, dialog);

    this.lstData.push({id: 1, nombres: 'Amparo', apellidos: 'Maldonado', telefono: '47485596', correo: 'adrix.robles@gmail.com',
      direccion: 'Xela, Quetzaltenango', nacimiento: '1991-03-26', genero: 'Mujer', ocupacion: 'Ingeniera en sistemas',
      ingresos: 13500.00});
    this.lstData.push({id: 2, nombres: 'Edgar', apellidos: 'Molina', telefono: '56105238', correo: 'edgar.molina@gmail.com',
      direccion: 'Palencia, Guatemala', nacimiento: '1966-05-10', genero: 'Hombre', ocupacion: 'Maestro jubilado',
      ingresos: 7500.00});
  }

  public nuevoRegistro(): void {
    const data = { orm: null, handleGuardar: this.handleGuardar };
    this.openDialog(ClienteDialogComponent, data, null);
  }

  private handleGuardar(obj): void {
    console.log('HandleGuardar', obj);
  }

  public clickEditar(obj): void {
    const data = { orm: obj, handleGuardar: this.handleGuardar };
    this.openDialog(ClienteDialogComponent, data, null);
  }

  public clickEliminar(obj): void {
    console.log('Eliminar', obj);
    this.mostrarDialogo(
      '¿Está seguro de eliminar este registro?',
      'Eliminar cliente',
      () => this.handleEliminar(obj),
      undefined
    );
  }

  public handleEliminar(obj): void {
    console.log('Handle Eliminar', obj);
  }

}
