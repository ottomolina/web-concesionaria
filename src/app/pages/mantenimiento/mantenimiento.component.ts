import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {TipoDialogComponent} from './tipos/tipo-dialog/tipo-dialog.component';
import {ComponentType} from '@angular/cdk/overlay';
import {MarcaDialogComponent} from './marcas/marca-dialog/marca-dialog.component';
import {LineaDialogComponent} from './linea/linea-dialog/linea-dialog.component';
import {ItemSelect} from '../../models/ItemSelect';
import {TipoService} from '../../providers/mantenimiento/tipo.service';
import {MarcaService} from '../../providers/mantenimiento/marca.service';
import {LineaService} from '../../providers/mantenimiento/linea.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent extends AppComponent {
  public selectedTabIndex = 0;
  public listaTipos: any = [];
  public listaMarcas: any = [];
  public listaLineas: any = [];

  private lstMarcaSelect: any = [];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              private lineaService: LineaService,
              private marcaService: MarcaService,
              private tipoService: TipoService,
  ) {
    super(alertService, dialog);
    this.showLoading();
    this.cargaDatos(3).then(() => {
      this.dismissLoading();
    }).catch(err => {
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  private cargaDatos = async (option: number) => {
    if (option === 0 || option === 3) {
      this.listaTipos = await this.tipoService.listarTipos();
    }
    if (option === 1 || option === 3) {
      this.listaMarcas = await this.marcaService.listarMarcas();
      this.lstMarcaSelect = this.listaMarcas.map(element => new ItemSelect(element.marca, element.id) );
    }
    if (option === 2 || option === 3) {
      this.listaLineas = await this.lineaService.listarLineas();
    }
  }

  public abrirDialog(obj?: any): void {
    const data: any = {orm: obj};
    if (this.selectedTabIndex === 2) {
      // Se adjunta las marcas para seleccion en el formulario
      data.lstMarcas = this.lstMarcaSelect;
    }
    const component = this.getComponent();
    const ref = this.openDialog(component, data, null);
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

  public clickEliminar(obj): void {
    console.log('Eliminar', obj);
    this.mostrarDialogo(
      '¿Está seguro de eliminar este registro?',
      'Eliminar registro',
      () => this.handleEliminar(obj),
      undefined
    );
  }

  public handleEliminar(obj): void {
    console.log('Handle Eliminar', obj);
  }

  public async handleGuardar(obj): Promise<any> {
    let promise: any;
    const { id } = obj;
    if (this.selectedTabIndex === 0 ) { // Se guarda un registro de tipos de vehiculo
      promise = id
          ? await this.tipoService.actualizarTipo(obj)
          : await this.tipoService.crearTipo(obj);
    } else if (this.selectedTabIndex === 1 ) { // Se guarda un registro de marcas de vehiculo
      promise = id
          ? await this.marcaService.actualizarMarca(obj)
          : await this.marcaService.crearMarca(obj);
    } else if (this.selectedTabIndex === 2 ) { // Se guarda un registro de lineas de vehiculo
      promise = id
          ? await this.lineaService.actualizarLinea(obj)
          : await this.lineaService.crearLinea(obj);
    }
    const resp = await this.cargaDatos(this.selectedTabIndex);
    return { resp, promise };
  }

  private getComponent(): ComponentType<any> {
    let component: ComponentType<any>;
    if (this.selectedTabIndex === 0) {
      component = TipoDialogComponent;
    } else if (this.selectedTabIndex === 1) {
      component = MarcaDialogComponent;
    } else if (this.selectedTabIndex === 2) {
      component = LineaDialogComponent;
    } else {
      component = null;
    }
    return component;
  }

}
