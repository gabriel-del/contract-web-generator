import { Form } from './form/form';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
          <app-header></app-header>
          <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  
  title = 'contract-web-generator';
}
