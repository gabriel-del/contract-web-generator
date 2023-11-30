import { Component } from '@angular/core';
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-log',
  template: `
     <pre>{{log}}</pre>
  `,
  styles: [
  ]
})
export class Log {
  constructor( private formService: FormService ){}
  log: any = this.formService.r.log

}
