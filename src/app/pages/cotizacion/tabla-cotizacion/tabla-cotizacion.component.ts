import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tabla-cotizacion',
  templateUrl: './tabla-cotizacion.component.html',
  styleUrls: ['./tabla-cotizacion.component.css']
})
export class TablaCotizacionComponent implements OnInit {
  @Input() listaCotizacion = [];

  @Output() info = new EventEmitter();
  @Output() print = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public clickInfo(obj): void {
    this.info.emit(obj);
  }

  public clickPrint(obj): void {
    this.print.emit(obj);
  }

}
