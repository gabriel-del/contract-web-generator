import {Component, Input, OnInit} from '@angular/core'
import {formValidations} from './validations'

@Component({
  selector: 'app-error-msg',
  template: `
  <mat-error *ngIf="errorMessage != null" >{{ errorMessage}}</mat-error>
  <!-- <mat-error *ngIf="form.get('nome').hasError('required')">Email is <strong>required</strong></mat-error> -->
  <!-- <mat-error *ngIf="errorMessage">Email is <strong>required</strong></mat-error> -->

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
      if (this.control.touched || this.control.dirty)
        return formValidations.getErrorMsg(validator, this.label, this.control.errors[validator])
    }
    return null
  }
}
