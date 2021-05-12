import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {
  @Input() lstData = {};
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();

  displayedColumns: string[] = ['id', 'tipo', 'options'];

  constructor() { }

  ngOnInit(): void {
  }

}
