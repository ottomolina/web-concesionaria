import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
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
  handleGuardar = new EventEmitter();
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
    this.lstTipo = datos.listas[0].map(element => new ItemSelect(element.tipo, element.tipo) );
    this.lstMarca = datos.listas[1].map(element => new ItemSelect(element.marca, element.marca) );
    if (datos.orm) {
      this.selectMarca(datos.orm.marca);
    }

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

  }

  ngOnInit(): void {
  }

  public selectMarca(event): void {
    this.lstLinea = this.datos.listas[2]
      .filter(element => element.marca === event)
      .map((element) => new ItemSelect(element.linea, element.linea) );
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    const obj = this.formVehiculo.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.handleGuardar.emit(obj);
    this.dialogRef.close();
  }

}
