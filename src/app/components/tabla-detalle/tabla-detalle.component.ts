import {Component, Input, OnInit} from '@angular/core';
import {EDetalle} from '../../models/EDetalle';

@Component({
  selector: 'app-tabla-detalle',
  templateUrl: './tabla-detalle.component.html',
  styleUrls: ['./tabla-detalle.component.css']
})
export class TablaDetalleComponent implements OnInit {
  @Input() listaDetalle: Array<EDetalle>;

  constructor() { }

  ngOnInit(): void {
  }

}
