import { Component } from '@angular/core';
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-pdf',
  template: `
    <object *ngIf="pdf != ''" [data]= "pdf | safe" width="800" height="500"> </object> 

  `,
  styles: [
  ]
})
export class Pdf {
  constructor( private formService: FormService ){}
r = this.formService.r
pdf :any

updatePdf(){
  if (this.r.status === 0) {
    this.pdf = this.r.pdf
    const pdfBlob = new Blob([this.pdf], {type : 'application/pdf'});
    const objectURL = URL.createObjectURL(pdfBlob);
    let a = document.createElement('a');
    a.href = objectURL
   //  a.download = `${this.formService.formulario.controls['bloco'].value}-${this.formService.formulario.controls['apartamento'].value}`
    a.download = 'Titulo-customizado'
    a.click()
   this.pdf = objectURL
 }
}
}
