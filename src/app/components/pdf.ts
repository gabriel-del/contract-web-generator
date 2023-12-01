import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-pdf',
  template: `
    <object *ngIf="pdf && showPdf" [data]= "pdf | safe" width="800" height="500"> </object> 
  `,
  styles: [
  ]
})
export class Pdf implements OnInit{
  constructor( private formService: FormService ){}
r = this.formService.r
pdf :any = null
@Input({ transform: booleanAttribute }) showPdf!: boolean
@Input({ transform: booleanAttribute }) savePdf!: boolean

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
    console.log(this.savePdf)
    console.log(this.showPdf)
    if (this.savePdf) {
      let a = document.createElement('a');
      a.href = objectURL
      a.download = `${this.formService.form.controls['bloco'].value}${this.formService.form.controls['apartamento'].value}-${this.formService.form.controls['nome'].value}`
      a.click()
    }
   this.pdf = objectURL
 }
}
}
