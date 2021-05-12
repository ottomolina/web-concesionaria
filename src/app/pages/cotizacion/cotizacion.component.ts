import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {AppComponent} from '../../app.component';
import {CotizacionDialogComponent} from './cotizacion-dialog/cotizacion-dialog.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CotizacionComponent extends AppComponent {
  // public lstDataCotizacion: Array<any>;

  public lstCliente = [
    {id: 1, nombres: 'Amparo', apellidos: 'Maldonado', telefono: '47485596', correo: 'adrix.robles@gmail.com', cotizaciones: []},
    {id: 2, nombres: 'Edgar', apellidos: 'Molina', telefono: '56105238', correo: 'edgar.molina@gmail.com', cotizaciones: []},
    {id: 3, nombres: 'David', apellidos: 'Pelaes', telefono: '57320133', correo: 'david.pelaes@gmail.com', cotizaciones: []},
    {id: 4, nombres: 'Amparo', apellidos: 'Maldonado', telefono: '47485596', correo: 'adrix.robles@gmail.com', cotizaciones: []},
    {id: 5, nombres: 'Edgar', apellidos: 'Molina', telefono: '56105238', correo: 'edgar.molina@gmail.com', cotizaciones: []},
    {id: 6, nombres: 'David', apellidos: 'Pelaes', telefono: '57320133', correo: 'david.pelaes@gmail.com', cotizaciones: []},
    {id: 7, nombres: 'Amparo', apellidos: 'Maldonado', telefono: '47485596', correo: 'adrix.robles@gmail.com', cotizaciones: []},
    {id: 8, nombres: 'Edgar', apellidos: 'Molina', telefono: '56105238', correo: 'edgar.molina@gmail.com', cotizaciones: []},
    {id: 9, nombres: 'David', apellidos: 'Pelaes', telefono: '57320133', correo: 'david.pelaes@gmail.com', cotizaciones: []},
    {id: 10, nombres: 'Amparo', apellidos: 'Maldonado', telefono: '47485596', correo: 'adrix.robles@gmail.com', cotizaciones: []},
    {id: 11, nombres: 'Edgar', apellidos: 'Molina', telefono: '56105238', correo: 'edgar.molina@gmail.com', cotizaciones: []},
    {id: 12, nombres: 'David', apellidos: 'Pelaes', telefono: '57320133', correo: 'david.pelaes@gmail.com', cotizaciones: []}
  ];

  public listaVehiculos = [
    {id: 1, tipo: 'Sedán', marca: 'Honda', linea: 'Civic', modelo: '2008',
      color: 'Gris oscuro', cc: '1800', precio: 32000.00 },
    {id: 2, tipo: 'Sedán', marca: 'Honda', linea: 'Civic', modelo: '1996',
      color: 'Verde policromado', cc: '1500', precio: 20000.00 },
    {id: 3, tipo: 'Camioneta', marca: 'Toyota', linea: 'Rav4', modelo: '2003',
      color: 'Gris claro', cc: '2500', precio: 37000.00 },
    {id: 4, tipo: 'Hatchback', marca: 'Honda', linea: 'Fit', modelo: '2012',
      color: 'Azul fuerte', cc: '1500', precio: 38500.00 },
    {id: 5, tipo: 'Pickup', marca: 'Toyota', linea: '22R', modelo: '1987',
      color: 'Negro filete blanco', cc: '3000', precio: 45000.00 },
    {id: 6, tipo: 'Sedán', marca: 'Mitsubishi', linea: 'Lancer', modelo: '2010',
      color: 'Blanco', cc: '2000', precio: 55000.00 }
  ];

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

  public displayedColumns: string[] = ['id', 'cliente', 'telefono', 'correo', 'options'];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog) {
    super(alertService, dialog);
  }

  public expandRow(row: any): void {
    console.log('seleccionado', row);
    if (row.cotizaciones.length === 0) {
      row.cotizaciones.push(
        {
          vehiculo: {
            id: 1, tipo: 'Sedán', marca: 'Honda', linea: 'Civic', modelo: '2008',
            color: 'Gris oscuro', cc: '1800', precio: 32000.00
          },
          concesionario: {
            nombre: 'Impocar',
            direccion: '15 avenida 2-15 zona 15, Blvd Vista Hermosa, Ciudad Guatemala'
          },
          agente: {
            nombres: 'Dani',
            apellidos: 'Martínez'
          },
          creado: '2021-03-20'
        }
      );
      row.cotizaciones.push(
        {
          vehiculo: {
            id: 4, tipo: 'Hatchback', marca: 'Honda', linea: 'Fit', modelo: '2012',
            color: 'Azul fuerte', cc: '1500', precio: 38500.00
          },
          concesionario: {
            nombre: 'Impocar',
            direccion: '15 avenida 2-15 zona 15, Blvd Vista Hermosa, Ciudad Guatemala'
          },
          agente: {
            nombres: 'Dani',
            apellidos: 'Martínez'
          },
          creado: '2021-03-21'
        }
      );
    } else {
      row.cotizaciones = [];
    }
    console.log('roe', row);
  }

  public nuevoRegistro(): void {
    const data = {
      orm: null,
      listas: {
        clientes: this.lstCliente,
        vehiculos: this.listaVehiculos,
        tipos: this.listaTipos,
        marcas: this.listaMarcas,
        lineas: this.listaLineas
      },
      handleGuardar: this.handleGuardar
    };
    this.openDialog(CotizacionDialogComponent, data, null);
  }

  private handleGuardar(obj): void {
    console.log('HandleGuardar', obj);
  }

  public clickEditar(obj): void {
    // const data = {
    //   orm: obj,
    //   listas: [ this.listaTipos, this.listaMarcas, this.listaLineas ],
    //   handleGuardar: this.handleGuardar
    // };
    // this.openDialog(VehiculoDialogComponent, data, null);
  }

  public clickEliminar(obj): void {
    // console.log('Eliminar', obj);
    // this.mostrarDialogo(
    //   '¿Está seguro de eliminar este registro?',
    //   'Eliminar cliente',
    //   () => this.handleEliminar(obj),
    //   undefined
    // );
  }

  public handleEliminar(obj): void {
    console.log('Handle Eliminar', obj);
  }

  public infoCotizacion(cotizacion: any, cliente): void {
    console.log('Cotizacion', cotizacion);
    console.log('Cliente', cliente);
  }

  public printCotizacion(cotizacion: any): void {
    console.log('Cotizacion', cotizacion);
  }

}
