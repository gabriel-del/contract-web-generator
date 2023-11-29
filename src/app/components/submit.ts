import { Component } from '@angular/core';
import {FormService} from '../form/form.service'
import {PdfTeXEngine} from '../../assets/PdfTeXEngine.js';


@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="compile()">{{compileMsg[+compiling]}} </button>  
    <mat-spinner *ngIf="compiling"></mat-spinner>

    <!-- <button type="submit">Enviar</button> -->
    <object *ngIf="pdfBox != ''" [data]= "pdfBox | safe" width="800" height="500"> </object> 
      <pre>{{log}}</pre>

  `,
  styles: [
  ]
})
export class Submit {
  formulario = this.formService.formulario
  form = this.formService
  compileMsg: string[] = ["Gerar Contrato", "Gerando o Contrato, Aguarde ..."]
  compiling: boolean = false
  pdfBox: any = ''
  log!: any

  constructor( private formService: FormService ){}


  onSubmit() {
    console.log("entrou submit")
    let valueSubmit = Object.assign({}, this.formulario.value)
    // valueSubmit = Object.assign(valueSubmit, {
    //   items: valueSubmit.items.map((v,i) => v ? this.items[i] : null).filter(v => v !== null)
    // })

    console.log(valueSubmit)
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      // this.formulario.reset()
    } else {
      Object.keys(this.formulario.controls).forEach(field => this.formulario.controls[field].markAsDirty())
    }
  }
     async compile(){
     console.log("Compilar")
     console.log(this.formService.texContent)
     this.compiling = true
     const globalEn = await new PdfTeXEngine
     await globalEn.loadEngine()
     globalEn.writeMemFSFile("main.tex", this.formService.texContent);
     globalEn.setEngineMainFile("main.tex");
     let r = await globalEn.compileLaTeX();
     this.log = r.log
     this.compiling = false

     if (r.status === 0) {
       const pdfblob = new Blob([r.pdf], {type : 'application/pdf'});
       const objectURL = URL.createObjectURL(pdfblob);
       let a = document.createElement('a');
       a.href = objectURL
      //  a.download = `${this.formService.formulario.controls['bloco'].value}-${this.formService.formulario.controls['apartamento'].value}`
       a.download = 'Titulo-customizado'
       a.click()
      this.pdfBox = objectURL
    }
  }
}
