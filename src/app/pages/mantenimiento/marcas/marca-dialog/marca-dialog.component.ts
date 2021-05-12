import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca-dialog.component.html',
  styleUrls: ['./marca-dialog.component.css']
})
export class MarcaDialogComponent implements OnInit {
  public title: string;
  public formMarca: FormGroup;
  private fb: FormBuilder;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<MarcaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.fb = new FormBuilder();
    console.log('datos', datos);
    if (!this.datos.orm ) {
      this.title = 'Agregar registro';
      this.formMarca = this.fb.group({
        marca: ['', [Validators.required]]
      });
    } else {
      this.title = 'Modificar registro';
      this.formMarca = this.fb.group({
        marca: [datos.orm.marca, [Validators.required]]
      });
    }
  }

  ngOnInit(): void {
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    console.log('Formulario', this.formMarca.value);
    const obj = this.formMarca.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.datos.handleGuardar(obj);
    this.dialogRef.close();
  }

}
