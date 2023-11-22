import { Component } from '@angular/core';
import {FormService} from '../form/form.service'


@Component({
  selector: 'app-history',
  template: `
    <p>
      history works!
    </p>
    <button mat-fab extended color="primary" (click)="showVar()">show var</button>  

  `,
  styles: [
  ]
})
export class History {
  constructor(
    private formService: FormService
    ){}

  showVar(){
    // this.formService.myvar = 3
    console.log(this.formService.myvar)
  }
}
