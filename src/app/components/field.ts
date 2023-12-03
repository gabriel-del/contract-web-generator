import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-field',
  template: `
<mat-form-field >
       <mat-label>Nome: </mat-label>
       <input type="text" matInput formControlName="nome">
      <!-- <app-error-msg [control]="control" label="Nome"></app-error-msg> -->
      <mat-error *ngIf="true">Email is <strong>required</strong></mat-error>

    </mat-form-field>
      `,
  styles: ``,
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class Field {
  @Input() control!: any
  @Input() label!: string



}
