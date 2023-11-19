import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  template: `
  <div *ngIf="show" ><ng-content/></div>
`
})
export class ErrorMsg implements OnInit {
  @Input() show!: boolean;
  @Input() control!: FormControl 
  constructor() { }
  ngOnInit() {
  }
  get errorMessage(){
    for (const propretyName in this.control.errors){
      if(this.control.errors['hasOwnPropriety'](propretyName) && this.control.touched) {
        //TODO
      }
    }
    return null
  }

}
