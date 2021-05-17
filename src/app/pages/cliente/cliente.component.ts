import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {ClienteDialogComponent} from './cliente-dialog/cliente-dialog.component';
import {ClienteService} from '../../providers/cliente/cliente.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent extends AppComponent implements OnInit {
  public lstData = [];
  public dsCliente: MatTableDataSource<any>;

  public displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'telefono', 'correo', 'options'];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              private clienteService: ClienteService) {
    super(alertService, dialog);
    this.showLoading();
    this.cargarListaClientes().then(() => this.dismissLoading()
    ).catch(err => {
      console.log('Error cargarListaClientes', err);
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  ngOnInit(): void {
  }

  private cargarListaClientes = async () => {
    const result: any = await this.clienteService.listarClientes();
    this.lstData = result.lista;
    this.dsCliente = new MatTableDataSource<any>(this.lstData);
  }

  public clickEditar(obj): void {
    const { nacimiento } = obj;
    obj.nacimiento = nacimiento.substring(0, 10);
    this.abrirDialog(obj);
  }

  public abrirDialog(obj?: any): void {
    console.log('obj', obj);
    const data: any = {orm: obj, handleGuardar: this.handleGuardar};
    const ref = this.openDialog(ClienteDialogComponent, data, null);
    ref.componentInstance.handleGuardar.subscribe(result => {
      this.showLoading();
      this.handleGuardar(result).then(resp => {
        this.dismissLoading();
      }).catch(err => {
        this.dismissLoading();
        this.showMessage(err.mensaje);
      });
    });
  }

  private handleGuardar = async (obj) => {
    console.log('HandleGuardar', obj);
    const { id } = obj;
    const promise: any = id
                    ? await this.clienteService.actualizarCliente(obj)
                    : await this.clienteService.crearCliente(obj);
    await this.cargarListaClientes();
    return promise;
  }

  // public clickEliminar(obj): void {
  //   console.log('Eliminar', obj);
  //   this.mostrarDialogo(
  //     '¿Está seguro de eliminar este registro?',
  //     'Eliminar cliente',
  //     () => this.handleEliminar(obj),
  //     undefined
  //   );
  // }
  //
  // public handleEliminar(obj): void {
  //   console.log('Handle Eliminar', obj);
  // }

}
