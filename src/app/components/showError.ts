import {Component, Input, OnInit} from '@angular/core'
import {formValidations} from './validations'

@Component({
  selector: 'app-error-msg',
  template: `
  <mat-error *ngIf="errorMessage != null" >{{ errorMessage}}</mat-error>
`,
})
export class ShowError implements OnInit {
  // @Input() show!: boolean;
  @Input() label!: string
  @Input() control!: any
  constructor() { }
  ngOnInit() {
  }
  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched)
        return formValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
    }
    return null
  }
}
