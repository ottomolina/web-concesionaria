import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemSelect} from '../../../models/ItemSelect';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css']
})
export class ClienteDialogComponent implements OnInit {
  handleGuardar = new EventEmitter();
  public title: string;
  public formCliente: FormGroup;
  private fb: FormBuilder;
  public lstGenero = [];

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ClienteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.fb = new FormBuilder();
    this.title = datos.orm ? 'Modificar cliente' : 'Agregar cliente';
    this.formCliente = this.fb.group({
      nombres: [datos.orm ? datos.orm.nombres : '', [Validators.required]],
      apellidos: [datos.orm ? datos.orm.apellidos : '', [Validators.required]],
      telefono: [datos.orm ? datos.orm.telefono : '', [Validators.required]],
      correo: [datos.orm ? datos.orm.correo : '', [Validators.required]],
      direccion: [datos.orm ? datos.orm.direccion : '', [Validators.required]],
      nacimiento: [datos.orm ? datos.orm.nacimiento : '', [Validators.required]],
      genero: [datos.orm ? datos.orm.genero : '', [Validators.required]],
      ocupacion: [datos.orm ? datos.orm.ocupacion : '', [Validators.required]],
      ingresos: [datos.orm ? datos.orm.ingresos : '', [Validators.required]]
    });

    this.lstGenero.push(new ItemSelect('Hombre', 'Hombre'));
    this.lstGenero.push(new ItemSelect('Mujer', 'Mujer'));
  }

  ngOnInit(): void {
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    const obj = this.formCliente.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.handleGuardar.emit(obj);
    this.dialogRef.close();
  }

}
