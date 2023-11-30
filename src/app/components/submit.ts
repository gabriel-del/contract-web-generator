import { Component, OnInit } from '@angular/core';
import {FormService} from '../form/form.service'
import { of } from 'rxjs';


@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="compile()">{{compileMsg[+compiling]}} </button>  
    <button mat-fab extended color="primary" (click)="compile2()">{{compileMsg[+compiling]}} </button>  
    <mat-spinner *ngIf="compiling"></mat-spinner>
  `,
  styles: [
  ]
})
export class Submit implements OnInit {
  form = this.formService.form
  compileMsg: string[] = ["Gerar Contrato", "Gerando o Contrato, Aguarde ..."]
  compiling = this.formService.compiling
  // compiling: boolean = false
  log!: any
  compile: any = this.formService.compile
  // compile: any = this.formService.compile
  n = this.formService.n

  compile2(){
    console.log(this.n)
  }
  constructor( private formService: FormService ){ }

  ngOnInit(): void {
    // of(this.formService.n).subscribe(a => console.log('mudou'))
    this.formService.n$.subscribe(a => console.log(a))
    this.formService.compiling$.subscribe(a => console.log(a))
  }


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
