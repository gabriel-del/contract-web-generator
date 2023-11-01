import { Form } from './form';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-form></app-form>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'contract-web-generator';
}
