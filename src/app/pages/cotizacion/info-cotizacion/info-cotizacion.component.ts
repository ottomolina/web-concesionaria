import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-info-cotizacion',
  templateUrl: './info-cotizacion.component.html',
  styleUrls: ['./info-cotizacion.component.css']
})
export class InfoCotizacionComponent implements OnInit {
  @Input() cliente: any;
  @Input() vehiculo: any;

  public title = 'Datos de la cotización';

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<InfoCotizacionComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit(): void {
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

}
