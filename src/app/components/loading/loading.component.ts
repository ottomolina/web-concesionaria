import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<ngx-loading [show]="isLoading"
    [config]="{animationType: 'circleSwish', primaryColour: '#ffffff', backdropBorderRadius: '3px'}"
    [template]="null"></ngx-loading>`
})
export class LoadingComponent implements OnInit {
  @Input() isLoading = false;
  ngOnInit(): void { }
}
