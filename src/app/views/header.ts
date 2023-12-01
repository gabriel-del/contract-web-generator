import {Component} from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Gerador de contratos</span>
      <span class="space"></span>
      <button mat-icon-button (click)="showMenu = !showMenu"><mat-icon>menu</mat-icon></button>
    </mat-toolbar-row>
</mat-toolbar>

<nav mat-tab-nav-bar color="primary" backgroundColor="primary" [tabPanel]="tabPanel" *ngIf="showMenu">
  <a mat-tab-link *ngFor="let link of links" [routerLink]="link.link" (click)="activeLink = link"
      [active]="activeLink == link">{{link.label}}
  </a>
</nav>
<mat-tab-nav-panel #tabPanel>
  <router-outlet></router-outlet>
</mat-tab-nav-panel>

  `,
  styles: [`
  .space {
  flex: 1 1 auto;
}`,
  ],
})
export class Header {
  activeLink!: any
  showMenu: boolean = true
  links = [{label: 'Formulário', link: '/'}, {label: 'Histórico', link: '/history'}, {label: 'Dev', link: '/dev'}]
}
