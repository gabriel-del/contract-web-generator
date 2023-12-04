import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import {formValidations} from './validations'
import { FormService } from '../form/form.service';


@Component({
  selector: 'app-field',
  template: `
    <mat-form-field>
      <mat-label>{{label}}: </mat-label>
      <ng-container *ngIf="tag === 'input'">
        <input type="text" matInput formControlName="nome" [placeholder]="placeholder">
      </ng-container>
      <mat-error *ngIf="errorMessage != null" [innerHtml]="errorMessage"></mat-error>
    </mat-form-field>
      `,
  styles: `
  mat-form-field{ width: 100%;}
  `,
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class Field implements OnInit{
  constructor(private formService: FormService) {}

  @Input() name!: string
  @Input() label!: string
  @Input() placeholder!: string
  @Input() tag!: string
  control: any
  ngOnInit(): void {
    this.control = this.formService.form.get(this.name)
  }

  get errorMessage() {
    for (const validator in this.control?.errors) {
      if (this.control.touched || this.control.dirty)
        return formValidations.getErrorMsg(validator, this.label, this.control.errors[validator])
    }
    return null
  }

}
