import { Form } from './form/form';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
          <app-header></app-header>
          <router-outlet></router-outlet>
          <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  
  title = 'contract-web-generator';
}
