import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {TipoDialogComponent} from './tipos/tipo-dialog/tipo-dialog.component';
import {ComponentType} from '@angular/cdk/overlay';
import {MarcaDialogComponent} from './marcas/marca-dialog/marca-dialog.component';
import {LineaDialogComponent} from './linea/linea-dialog/linea-dialog.component';
import {ItemSelect} from '../../models/ItemSelect';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent extends AppComponent {
  public selectedTabIndex = 0;

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
    { id: 1, marca: 'Audi', linea: 'Q5' },
    { id: 2, marca: 'Honda', linea: 'CRV' },
    { id: 3, marca: 'Honda', linea: 'Civic' }
  ];

  private lstMarcaSelect = [];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog) {
    super(alertService, dialog);
    this.listaMarcas.forEach((element: any) => {
      this.lstMarcaSelect.push(new ItemSelect(element.marca, element));
    });
  }

  public nuevoRegistro(): void {
    const data: any = {orm: null, handleGuardar: this.handleGuardar};
    if (this.selectedTabIndex === 2) {
      data.lstMarcas = this.lstMarcaSelect;
    }
    console.log('Datos', data);
    const component = this.getComponent();
    this.openDialog(component, data, null);
  }

  public clickEditar(obj): void {
    console.log('Editar', obj);
    const data: any = { orm: obj, handleGuardar: this.handleGuardar };
    if (this.selectedTabIndex === 2) {
      data.lstMarcas = this.lstMarcaSelect;
    }
    const component = this.getComponent();
    if (component) {
      this.openDialog(component, data, null);
    }
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

  public handleGuardar(obj): void {
    console.log('Handle Guardar', obj);
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
