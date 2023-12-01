import { Component, OnInit } from '@angular/core';
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-pdf',
  template: `
    <object *ngIf="pdf" [data]= "pdf | safe" width="800" height="500"> </object> 
  `,
  styles: [
  ]
})
export class Pdf implements OnInit{
  constructor( private formService: FormService ){}
r = this.formService.r
pdf :any = null

ngOnInit(): void {
  this.formService.compiling$
  // .pipe( tap(v => console.log(v)) )
  .subscribe(a => {if(!a) this.updatePdf()})
}

updatePdf(){
  if (this.formService.r?.status === 0) {
    this.pdf = this.formService.r.pdf
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
