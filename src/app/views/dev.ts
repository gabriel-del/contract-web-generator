import { Component } from '@angular/core';
import {FormService} from '../form/form.service'


@Component({
  selector: 'app-dev',
  template: `
  <app-form-submit></app-form-submit>
    <app-debug-form [form]="formulario"></app-debug-form>
    <app-editor [(text)]="texContent" mode="latex" ></app-editor>

  `,
  styles: [
  ]
})
export class Dev {
  pdfBox: any = ''
  formulario = this.formService.formulario
  form = this.formService
  texContent: string = this.form.texContent
  constructor( private formService: FormService ){}

}
