import { Component } from '@angular/core';
import {FormService} from '../form/form.service'


@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="compile()">{{compileMsg[+compiling]}} </button>  
    <mat-spinner *ngIf="compiling"></mat-spinner>
  `,
  styles: [
  ]
})
export class Submit {
  form = this.formService.form
  compileMsg: string[] = ["Gerar Contrato", "Gerando o Contrato, Aguarde ..."]
  compiling: boolean = this.formService.compiling
  log!: any
  compile = this.formService.compile

  constructor( private formService: FormService ){}


  onSubmit() {
    console.log("entrou submit")
    let valueSubmit = Object.assign({}, this.form.value)
    // valueSubmit = Object.assign(valueSubmit, {
    //   items: valueSubmit.items.map((v,i) => v ? this.items[i] : null).filter(v => v !== null)
    // })

    console.log(valueSubmit)
    if (this.form.valid) {
      console.log(this.form.value)
      // this.formulario.reset()
    } else {
      Object.keys(this.form.controls).forEach(field => this.form.controls[field].markAsDirty())
    }
  }

}
