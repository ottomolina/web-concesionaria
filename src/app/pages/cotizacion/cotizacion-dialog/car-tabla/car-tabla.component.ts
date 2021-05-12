import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-car-tabla',
  templateUrl: './car-tabla.component.html',
  styleUrls: ['./car-tabla.component.css']
})
export class CarTablaComponent implements OnInit, AfterViewInit {
  @Input() listaVehiculos = [];
  @Output() selectVehiculo = new EventEmitter();

  public columnsVehiculo = ['id', 'vehiculo', 'precio', 'options'];
  public vehiculoSeleccionado: any;
  public dsVehiculo: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.dsVehiculo.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dsVehiculo = new MatTableDataSource<any>(this.listaVehiculos);
  }

  public clickRow(row: any): void {
    this.vehiculoSeleccionado = this.vehiculoSeleccionado === row ? null : row;
    if (this.vehiculoSeleccionado !== null) {
      this.selectVehiculo.emit(this.vehiculoSeleccionado);
    }
  }

}
