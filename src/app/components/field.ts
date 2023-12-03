import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  template: `
      <mat-form-field>
       <mat-label>Nome: </mat-label>
       <input type="text" matInput formControlName="nome">
       <ng-content></ng-content>
      <!-- <app-error-msg [control]="form.get('nome')" label="Nome"></app-error-msg> -->
    </mat-form-field>
  `,
  styles: ``
})
export class Field {
  @Input() control!: any
  @Input() label!: string



}
