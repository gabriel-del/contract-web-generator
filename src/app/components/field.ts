import {Component, Input, OnInit} from '@angular/core'
import {ControlContainer, FormGroupDirective} from '@angular/forms'
import {FormService} from '../form/form.service'
import {formValidations} from './validations'

@Component({
  selector: 'app-field',
  template: `
    <mat-form-field *ngIf="pattern.test(tag)">
      <mat-label>{{label}}: </mat-label>
      <span *ngIf="prefix" matPrefix>{{prefix}}</span>

      <input *ngIf="tag === 'input'" [type]="type" matInput [formControlName]="name" [placeholder]="placeholder">
      <mat-select *ngIf="tag === 'select'" [formControlName]="name">
        <mat-option *ngFor="let element of array" [value]="arrayValue ? element[arrayValue]: element">
          {{arrayName ? element[arrayName] : element}}
        </mat-option>
      </mat-select>


      <span *ngIf="suffix" matTextSuffix>{{suffix}}</span>
      <mat-error *ngIf="errorMessage != null" [innerHtml]="errorMessage"></mat-error>
    </mat-form-field>

    <mat-slide-toggle *ngIf="tag === 'slide'" color="primary" [formControlName]="name">{{label}}</mat-slide-toggle>

      `,
  styles: `
  mat-form-field{ width: 100%;}
  mat-slide-toggle{display: block;margin: 8px;}
  `,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class Field implements OnInit {
  constructor(private formService: FormService) {}
  @Input() name!: string
  @Input() label!: string
  @Input() placeholder!: string
  @Input() tag: string = 'input'
  @Input() prefix!: string
  @Input() suffix!: string
  @Input() array!: any
  @Input() arrayValue!: string
  @Input() arrayName!: string
  @Input() type: string = 'text'
  control: any
  pattern = /^(input|select)$/
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
