import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  template: `
  <div *ngIf="show" ><ng-content/></div>
`
})
export class ErrorMsg implements OnInit {
  @Input() show!: boolean;
  constructor() { }
  ngOnInit() {
  }

}
