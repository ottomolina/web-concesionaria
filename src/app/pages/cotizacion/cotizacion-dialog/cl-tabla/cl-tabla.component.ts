import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-cl-tabla',
  templateUrl: './cl-tabla.component.html',
  styleUrls: ['./cl-tabla.component.css']
})
export class ClTablaComponent implements OnInit, AfterViewInit {
  @Input() listaClientes = [];
  @Output() selectCliente = new EventEmitter();

  public columnsCliente = ['id', 'cliente', 'telefono', 'correo', 'options'];
  public clienteSeleccionado: any;
  public dsCliente: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.dsCliente.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dsCliente = new MatTableDataSource<any>(this.listaClientes);
  }

  public clickRow(row: any): void {
    this.clienteSeleccionado = this.clienteSeleccionado === row ? null : row;
    if (this.clienteSeleccionado !== null) {
      this.selectCliente.emit(this.clienteSeleccionado);
    }
  }

}
