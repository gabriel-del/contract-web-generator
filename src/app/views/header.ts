import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<p>
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Gerador de contratos</span>
      <span class="example-spacer"></span>
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
    </mat-toolbar-row>


    <mat-toolbar-row><a routerLink="/">Formulário </a></mat-toolbar-row>
    <mat-toolbar-row><a routerLink="/history">Histórico </a></mat-toolbar-row>
    <mat-toolbar-row><a routerLink="/dev">Desenvolvedor </a></mat-toolbar-row>
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
