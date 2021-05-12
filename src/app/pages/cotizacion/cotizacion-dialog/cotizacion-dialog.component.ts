import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-cotizacion-dialog',
  templateUrl: './cotizacion-dialog.component.html',
  styleUrls: ['./cotizacion-dialog.component.css']
})
export class CotizacionDialogComponent implements OnInit {
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
    // console.log('Formulario', this.formCliente.value);
    // const obj = this.formCliente.value;
    // if (this.datos.orm) {
    //   obj.id = this.datos.orm.id;
    // }
    // this.datos.handleGuardar(obj);
    this.dialogRef.close();
  }

}
