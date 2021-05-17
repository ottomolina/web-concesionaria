import {AfterContentInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppComponent} from '../../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';

@Component({
  selector: 'app-concesionario-dialog',
  templateUrl: './concesionario-dialog.component.html',
  styleUrls: ['./concesionario-dialog.component.css']
})
export class ConcesionarioDialogComponent extends AppComponent implements OnInit, AfterContentInit {
  onGuardar = new EventEmitter();
  onSeleccionar = new EventEmitter();
  public title = 'Asignación de concesionario';

  public columnsConcesionario = ['id', 'nombre', 'direccion', 'options'];
  public concesionarioSeleccionado: any = null;
  public dsConcesionario: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public totalRegistros = 0;

  public page = '1';
  public txtBuscarConcesionario = '';

  public formConcesionario: FormGroup;
  private fb: FormBuilder;

  constructor( public alertService: NgxMatAlertConfirmService,
               public dialog: MatDialog,
               public dialogRef: MatDialogRef<ConcesionarioDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public datos: any) {
    super(alertService, dialog);
    this.fb = new FormBuilder();
    this.formConcesionario = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]] ,
    });
  }

  ngOnInit(): void {
    this.dsConcesionario = new MatTableDataSource<any>(this.datos.lista);
  }

  ngAfterContentInit(): void {
    this.dsConcesionario.paginator = this.paginator;
    this.totalRegistros = this.datos.total;
  }

  public clickRow(row: any): void {
    this.concesionarioSeleccionado = this.concesionarioSeleccionado === row ? null : row;
  }

  public clickSeleccionar(): void {
    this.mostrarDialogo(
      'Al realizar esta selección confirmas que trabajarás con\n este concesionario (no se puede revertir esta asignación)',
      'Confirma',
      () => this.onSeleccionar.emit(this.concesionarioSeleccionado),
      () => {});
  }

  public nuevoRegistro(): void {
    this.title = 'Nuevo concesionario';
    this.page = '2';
  }

  public clickGuardar(): void {
    this.onGuardar.emit(this.formConcesionario.value);
  }

}
