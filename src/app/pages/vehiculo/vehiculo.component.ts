import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {VehiculoDialogComponent} from './vehiculo-dialog/vehiculo-dialog.component';
import {VehiculoService} from '../../providers/vehiculo/vehiculo.service';
import {TipoService, LineaService, MarcaService} from '../../providers/mantenimiento/';
import {ItemSelect} from '../../models/ItemSelect';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent extends AppComponent {
  public lstData = [];
  public listaTipos: any;
  public listaMarcas: any;
  public listaLineas: any;

  public displayedColumns: string[] = ['id', 'tipo', 'marca', 'linea', 'modelo', 'color', 'cc', 'precio', 'options'];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              private vehiculoService: VehiculoService,
              private lineaService: LineaService,
              private marcaService: MarcaService,
              private tipoService: TipoService) {
    super(alertService, dialog);
    this.showLoading();
    this.cargarListaVehiculos().then(() => {
      this.listarTiposMarcasLineas().then(() => this.dismissLoading() );
    }).catch(err => {
      console.log('Error cargarListaVehiculos', err);
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  private listarTiposMarcasLineas = async () => {
    this.listaTipos = await this.tipoService.listarTipos();
    this.listaMarcas = await this.marcaService.listarMarcas();
    this.listaLineas = await this.lineaService.listarLineas();
  }

  private cargarListaVehiculos = async () => {
    const result: any = await this.vehiculoService.listarVehiculos();
    this.lstData = result.lista;
  }

  public abrirDialog(obj?: any): void {
    console.log('obj', obj);
    const data: any = {
      orm: obj,
      listas: [ this.listaTipos, this.listaMarcas, this.listaLineas ]
    };
    const ref = this.openDialog(VehiculoDialogComponent, data, null);
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
    const promise = id
              ? await this.vehiculoService.actualizarVehiculo(obj)
              : await this.vehiculoService.crearVehiculo(obj);
    await this.cargarListaVehiculos();
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
