import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<p>
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Gerador de contratos</span>
      <span class="example-spacer"></span>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar-row>

    <div *ngIf="false">

    <mat-toolbar-row>
      <span>Formulário</span>
      <span class="example-spacer"></span>
    </mat-toolbar-row>
    <mat-toolbar-row>
      <span>Histórico</span>
      <span class="example-spacer"></span>
    </mat-toolbar-row>
    <mat-toolbar-row>
      <span>Desenvolvedor</span>
      <span class="example-spacer"></span>
    </mat-toolbar-row>
  </div>
  </mat-toolbar>
</p>
  `,
  styles: [`
  .example-spacer {
  flex: 1 1 auto;
}`
  ]
})
export class Header {

}
