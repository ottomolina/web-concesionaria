import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mensaje-informativo',
  templateUrl: './mensaje-informativo.component.html',
  styleUrls: ['./mensaje-informativo.component.css']
})
export class MensajeInformativoComponent implements OnInit {
  @Input() mensaje: string;

  constructor() { }

  ngOnInit(): void {
  }

}
