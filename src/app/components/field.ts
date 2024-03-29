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
      <textarea *ngIf="tag === 'textarea'" matInput [placeholder]="placeholder" [formControlName]="name"></textarea>

      <span *ngIf="suffix" matTextSuffix>{{suffix}}</span>
      <mat-error *ngIf="errorMessage != null" [innerHtml]="errorMessage"></mat-error>
    </mat-form-field>

    <mat-form-field *ngIf="tag === 'datepicker'">
      <mat-label>{{label}}: </mat-label>
      <input  matInput [matDatepicker]="picker" [formControlName]="name" >
      <mat-datepicker-toggle matIconSuffix [for]="picker" ></mat-datepicker-toggle>
      <mat-datepicker #picker ></mat-datepicker>
      <mat-error *ngIf="errorMessage != null" [innerHtml]="errorMessage"></mat-error>
    </mat-form-field>

    <ng-container *ngIf="tag === 'button'">
      <p  >
      <span matPrefix>{{label}}</span>
      <mat-button-toggle-group [formControlName]="name" aria-label="Font Style">
        <mat-button-toggle  *ngFor="let element of array" [value]="element">{{element}}</mat-button-toggle>
      </mat-button-toggle-group>
    </p>
    <mat-error *ngIf="errorMessage != null" [innerHtml]="errorMessage"></mat-error>
  </ng-container>

    <mat-slide-toggle *ngIf="tag === 'slide'" color="primary" [formControlName]="name">{{label}}</mat-slide-toggle>
    <mat-error *ngIf="errorMessage != null && tag === 'slide'" [innerHtml]="errorMessage"></mat-error>
      `,
  styles: `
  mat-form-field{ width: 100%;}
  mat-slide-toggle{display: block;margin: 8px;}
  p {
display: flex;
flex: 1 1 100%;

span {
  width: 25%;
  justify-content: center;
  display: flex;
  align-items: center;
}

mat-button-toggle-group {
  width: 75%;
}

mat-button-toggle {
  flex: 1 1 100%;
  box-sizing: border-box;
  align-items: flex-end;
  flex-direction: row;
  display: flex;
}
}

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
  pattern = /^(input|select|textarea)$/
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
