import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemSelect} from '../../../models/ItemSelect';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-vehiculo-dialog',
  templateUrl: './vehiculo-dialog.component.html',
  styleUrls: ['./vehiculo-dialog.component.css']
})
export class VehiculoDialogComponent implements OnInit {
  public title: string;
  public formVehiculo: FormGroup;
  private fb: FormBuilder;

  public lstTipo: Array<ItemSelect>;
  public lstMarca: Array<ItemSelect>;
  public lstLinea: Array<ItemSelect>;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<VehiculoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.fb = new FormBuilder();
    console.log('datos', datos);

    this.title = datos.orm ? 'Modificar vehículo' : 'Agregar vehículo';
    this.formVehiculo = this.fb.group({
      tipo: [datos.orm ? datos.orm.tipo : '', [Validators.required]],
      marca: [datos.orm ? datos.orm.marca : '', [Validators.required]],
      linea: [datos.orm ? datos.orm.linea : '', [Validators.required]],
      cc: [datos.orm ? datos.orm.cc : '', [Validators.required]],
      color: [datos.orm ? datos.orm.color : '', [Validators.required]],
      modelo: [datos.orm ? datos.orm.modelo : '', [Validators.required]],
      precio: [datos.orm ? datos.orm.precio : '', [Validators.required]]
    });

    this.lstTipo = datos.listas[0].map((element) => (
      new ItemSelect(element.tipo, element)
    ));
    this.lstMarca = datos.listas[1].map((element) => (
      new ItemSelect(element.marca, element)
    ));
  }

  ngOnInit(): void {
  }

  public selectMarca(event): void {
    console.log(event);
    this.lstLinea = this.datos.listas[2]
      .filter(element => element.marca === event.marca)
      .map((element) => new ItemSelect(element.linea, element) );
    console.log(this.lstLinea);
    if (this.lstLinea.length === 0) {
      console.log('No hay linea asociada.');
    }
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    console.log('Formulario', this.formVehiculo.value);
    const obj = this.formVehiculo.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.datos.handleGuardar(obj);
    this.dialogRef.close();
  }

}
