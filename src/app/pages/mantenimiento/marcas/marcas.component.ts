import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  @Input() lstData = {};
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();

  displayedColumns: string[] = ['id', 'marca', 'options'];

  constructor() { }

  ngOnInit(): void {
  }

}
