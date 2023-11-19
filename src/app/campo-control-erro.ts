import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formValidations } from './validations';

@Component({
  selector: 'app-error-msg',
  template: `
  <div *ngIf="show" ><ng-content/></div>
`
})
export class ErrorMsg implements OnInit {
  @Input() show!: boolean;
  @Input() label!: string;
  @Input() control!: FormControl 
  constructor() { }
  ngOnInit() {
  }
  get errorMessage(){
    for (const propertyName in this.control.errors){
      if(this.control.errors['hasOwnPropriety'](propertyName) && this.control.touched) {
        return formValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
      }
    }
    return null
  }

}
