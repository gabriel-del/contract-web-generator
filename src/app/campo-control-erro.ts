import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formValidations } from './validations';

@Component({
  selector: 'app-error-msg',
  template: `
  <div *ngIf="errorMessage != null" >{{ errorMessage}}</div>
`
})
export class ErrorMsg implements OnInit {
  // @Input() show!: boolean;
  @Input() label!: string;
  @Input() control!: any
  constructor() { }
  ngOnInit() {
  }
  get errorMessage(){
    console.log("aquii")
    console.log(this.control)
    for (const propertyName in this.control.errors){
      if(this.control.errors['hasOwnProperty'](propertyName) && this.control.touched) {
        return formValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
      }
    }
    return null
  }

}
