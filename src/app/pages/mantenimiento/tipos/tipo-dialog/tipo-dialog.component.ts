import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-dialog',
  templateUrl: './tipo-dialog.component.html',
  styleUrls: ['./tipo-dialog.component.css']
})
export class TipoDialogComponent implements OnInit {
  handleGuardar = new EventEmitter();
  public title: string;
  public formTipo: FormGroup;
  private fb: FormBuilder;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<TipoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.fb = new FormBuilder();
    if (!this.datos.orm ) {
      this.title = 'Agregar registro';
      this.formTipo = this.fb.group({
        tipo: ['', [Validators.required]]
      });
    } else {
      this.title = 'Modificar registro';
      this.formTipo = this.fb.group({
        tipo: [datos.orm.tipo, [Validators.required]]
      });
    }
  }

  ngOnInit(): void {
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    const obj = this.formTipo.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.handleGuardar.emit(obj);
    this.dialogRef.close();
  }

}
