import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../providers/auth/auth.service';

@Component({
  selector: 'app-cotizacion-dialog',
  templateUrl: './cotizacion-dialog.component.html',
  styleUrls: ['./cotizacion-dialog.component.css']
})
export class CotizacionDialogComponent implements OnInit {
  handleGuardar = new EventEmitter();
  public txtBuscarCliente = '';
  public txtBuscarVehiculo = '';

  public listaClientes: Array<any>;
  public listaVehiculos: Array<any>;

  public cliente: any;
  public vehiculo: any;

  public title: string;

  public tabSelected = 0;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<CotizacionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    console.log('datos', datos);
    const { listas } = datos;
    this.listaClientes = listas.clientes;
    this.listaVehiculos = listas.vehiculos;
    this.title = 'Cotizador';
  }

  ngOnInit(): void {
    const { listas } = this.datos;
    this.listaClientes = listas.clientes;
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public selectCliente(cliente): void {
    this.cliente = cliente;
    this.tabSelected = 1;
  }

  public selectVehiculo(vehiculo): void {
    this.vehiculo = vehiculo;
    this.tabSelected = 2;
  }

  public clickGuardar(): void {
    const { creado, ...dataCliente } = this.cliente;
    const sender = { cliente: dataCliente, vehiculo: this.vehiculo };
    this.handleGuardar.emit(sender);
  }

}
