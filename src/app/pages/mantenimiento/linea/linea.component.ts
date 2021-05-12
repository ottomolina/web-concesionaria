import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})
export class LineaComponent implements OnInit {
  @Input() lstData = {};
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();

  displayedColumns: string[] = ['id', 'marca', 'linea', 'options'];

  constructor() { }

  ngOnInit(): void {
  }

}
