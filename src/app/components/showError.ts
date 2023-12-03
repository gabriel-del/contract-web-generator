import {Component, Input, OnInit} from '@angular/core'
import {formValidations} from './validations'

@Component({
  selector: 'app-error-msg',
  template: `
  <mat-error *ngIf="errorMessage != null" >{{ errorMessage}}</mat-error>
`
})
export class ShowError implements OnInit {
  // @Input() show!: boolean;
  @Input() label!: string
  @Input() control!: any
  constructor() { }
  ngOnInit() {
  }
  get errorMessage() {
    for (const validator in this.control.errors) {
      // if (this.control.errors.hasOwnProperty(validator) && this.control.touched)
      if (Object.prototype.hasOwnProperty.call(this.control.errors, validator) && this.control.touched)
        return formValidations.getErrorMsg(validator, this.label, this.control.errors[validator])
    }
    return null
  }
}
