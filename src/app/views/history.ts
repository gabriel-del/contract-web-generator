import {Component} from '@angular/core'
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-history',
  template: `
     <button mat-fab extended color="primary" (click)="showVar()">show var</button>

  `,
  styles: [
  ]
})
export class History {
  constructor(
    private formService: FormService
  ) {}
  showVar() {
    // console.log(this.formService.formulario.get('numero').value)
  }
}
