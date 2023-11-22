import { Component } from '@angular/core';
import {FormService} from './form.service'



@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="form.compilar()">{{compileMsg}}</button>  

  `,
  styles: [
  ]
})
export class FormSubmit {
  formulario = this.formService.formulario
  form = this.formService
  compileMsg: string = "Compilar"


  constructor(
    private formService: FormService
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
}
