import { Component } from '@angular/core';

@Component({
  selector: 'app-dev',
  template: `
  <app-form-submit></app-form-submit>
    <!-- <app-debug [form]="formulario"></app-debug> -->
    <app-editor [(text)]="texContent" mode="latex" ></app-editor>
    <object [data]= "pdfBox | safe" width="800" height="500"> </object> 
      <pre>{{log}}</pre>

  `,
  styles: [
  ]
})
export class Dev {
  log!: any
  pdfBox: any = ''
  texContent: string = 'jkjkj123'


}
