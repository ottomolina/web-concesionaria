import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {VehiculoDialogComponent} from './vehiculo-dialog/vehiculo-dialog.component';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent extends AppComponent {
  public lstData = [];
  public listaTipos = [
    { id: 1, tipo: 'Camioneta' },
    { id: 2, tipo: 'Hatchback' },
    { id: 3, tipo: 'Sedán' },
    { id: 4, tipo: 'Pickup' }
  ];

  public listaMarcas = [
    { id: 1, marca: 'Audi' },
    { id: 2, marca: 'BMW' },
    { id: 3, marca: 'Chevrolet' },
    { id: 4, marca: 'Honda' },
  ];

  public listaLineas = [
    { id: 1, marca: 'Audi', linea: 'Q3' },
    { id: 2, marca: 'Audi', linea: 'Q4' },
    { id: 3, marca: 'Audi', linea: 'Q5' },
    { id: 4, marca: 'Honda', linea: 'CRV' },
    { id: 5, marca: 'Honda', linea: 'Civic' },
    { id: 6, marca: 'BMW', linea: 'Z4' },
    { id: 7, marca: 'Chevrolet', linea: 'Spark GT' }
  ];

  public displayedColumns: string[] = ['id', 'tipo', 'marca', 'linea', 'modelo', 'color', 'cc', 'precio', 'options'];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog) {
    super(alertService, dialog);

    this.lstData.push({id: 1, tipo: 'Sedán', marca: 'Honda', linea: 'Civic', modelo: '2008',
      color: 'Gris oscuro', cc: '1800', precio: 32000.00});
    this.lstData.push({id: 2, tipo: 'Sedán', marca: 'Honda', linea: 'Civic', modelo: '1996',
      color: 'Verde policromado', cc: '1500', precio: 20000.00 });
  }

  public nuevoRegistro(): void {
    const data = {
      orm: null,
      listas: [ this.listaTipos, this.listaMarcas, this.listaLineas ],
      handleGuardar: this.handleGuardar
    };
    this.openDialog(VehiculoDialogComponent, data, null);
  }

  private handleGuardar(obj): void {
    console.log('HandleGuardar', obj);
  }

  public clickEditar(obj): void {
    const data = {
      orm: obj,
      listas: [ this.listaTipos, this.listaMarcas, this.listaLineas ],
      handleGuardar: this.handleGuardar
    };
    this.openDialog(VehiculoDialogComponent, data, null);
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
