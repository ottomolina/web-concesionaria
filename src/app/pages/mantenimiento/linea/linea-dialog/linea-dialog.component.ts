import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemSelect} from '../../../../models/ItemSelect';

@Component({
  selector: 'app-linea-dialog',
  templateUrl: './linea-dialog.component.html',
  styleUrls: ['./linea-dialog.component.css']
})
export class LineaDialogComponent implements OnInit {
  public title: string;
  public formLinea: FormGroup;
  public lista: Array<ItemSelect>;
  private fb: FormBuilder;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<LineaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.fb = new FormBuilder();
    console.log('datos', datos);
    this.lista = datos.lstMarcas;
    if (!this.datos.orm ) {
      this.title = 'Agregar registro';
      this.formLinea = this.fb.group({
        marca: ['', [Validators.required]],
        linea: ['', [Validators.required]]
      });
    } else {
      this.title = 'Modificar registro';
      this.formLinea = this.fb.group({
        marca: [datos.orm.marca, [Validators.required]],
        linea: [datos.orm.linea, [Validators.required]]
      });
    }
  }

  ngOnInit(): void {
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    const obj = this.formLinea.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.datos.handleGuardar(obj);
    this.dialogRef.close();
  }
}
