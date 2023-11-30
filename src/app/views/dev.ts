import { Component } from '@angular/core';
import {FormService} from '../form/form.service'


@Component({
  selector: 'app-dev',
  template: `
  <app-form-submit></app-form-submit>
    <app-debug-form></app-debug-form>
    <app-editor [(text)]="tex" mode="latex" ></app-editor>

  `,
  styles: [
  ]
})
export class Dev {
  pdfBox: any = ''
  form = this.formService.form
  tex: string = this.formService.tex
  constructor( private formService: FormService ){}

}
