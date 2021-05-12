import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';

@Component({
  selector: 'app-concesionario',
  templateUrl: './concesionario.component.html',
  styleUrls: ['./concesionario.component.css']
})
export class ConcesionarioComponent extends AppComponent implements OnInit, AfterViewInit {
  public title = 'Asignación de concesionario';

  private listaConcesionario = [
    { id: 1, nombre: 'Impocar', direccion: '15 avenida 2-15 zona 15, Blvd Vista Hermosa, Ciudad Guatemala', creado: '2021-03-26' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' },
    { id: 2, nombre: 'Ventas directas', direccion: '2 avenida 12-15 zona 12, Ciudad Guatemala', creado: '2021-03-29' },
    { id: 3, nombre: 'Expoauto', direccion: '7 avenida 3-85 zona 9, Ciudad Guatemala', creado: '2021-04-12' }
  ];

  public columnsConcesionario = ['id', 'nombre', 'direccion', 'options'];
  public concesionarioSeleccionado: any = null;
  public dsConcesionario: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ConcesionarioComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    super(alertService, dialog);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit()');
  }

  ngOnInit(): void {
    console.log('ngOnInit()');
    this.dsConcesionario = new MatTableDataSource<any>(this.listaConcesionario);
  }

  public clickRow(row: any): void {
    this.concesionarioSeleccionado = this.concesionarioSeleccionado === row ? null : row;
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    this.mostrarDialogo(
      '¿Estás seguro de la selección realizada?',
      'Confirma',
      () => this.dialogRef.close(),
      () => {});
  }

}
