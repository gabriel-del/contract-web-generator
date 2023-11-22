import { Component } from '@angular/core';
import {FormService} from './form.service'
import {PdfTeXEngine} from './../../assets/PdfTeXEngine.js';
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="form.compilar()">{{compileMsg}}</button>  
    <!-- <button type="submit">Enviar</button> -->

  `,
  styles: [
  ]
})
export class FormSubmit {
  formulario = this.formService.formulario
  form = this.formService
  compileMsg: string = "Compilar"
  texContent: string = 'jkjkj123'
  log!: any
  pdfBox: any = ''




  constructor(
    private formService: FormService,
    private http: HttpClient
    ){}


  onSubmit() {
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


    texRead(){
    // let myvar = this.formulario.get('numero').value
    let myvar = "minha var"
    this.http.get('/assets/main.tex', {responseType: 'text'})
    .pipe(
      map(dados => dados.replaceAll("\\","\\\\").replaceAll("}$", "}")),
      map(dados => eval(`dados = \`${dados}\``) ),
      // tap(dados => console.log(dados))
    )
    .subscribe(dados => this.texContent = dados)
  }


     async compilar(){
     console.log("Compilar")
     this.compileMsg = "Compilando"
     const globalEn = await new PdfTeXEngine
     await globalEn.loadEngine()
     globalEn.writeMemFSFile("main.tex", this.texContent);
     globalEn.setEngineMainFile("main.tex");
     let r = await globalEn.compileLaTeX();
     this.log = r.log
     this.compileMsg = "Compilar"

     if (r.status === 0) {
      let a = document.createElement('a');
      // console.log(r.pdf)
      a.href = r.pdf
      a.download = "12345"
      a.click()
      console.log(a)
      console.log(a.href)
      const pdfblob = new Blob([r.pdf], {type : 'application/pdf'});
      const objectURL = URL.createObjectURL(pdfblob);
      this.pdfBox = objectURL
      // console.log(this.pdfBox)
    }
  }
}
