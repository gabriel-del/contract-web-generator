import { Component, OnInit } from '@angular/core';
import {FormService} from '../form/form.service'
import { filter, map, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="compile()">{{compileMsg[+compiling.value]}} </button>  
    <mat-spinner *ngIf="compiling.value"></mat-spinner>
  `,
  styles: [
  ]
})
export class Submit implements OnInit {
  form = this.formService.form
  compileMsg: string[] = ["Gerar Contrato", "Gerando o Contrato, Aguarde ..."]
  compiling: BehaviorSubject<boolean|null> = this.formService.compiling
  compile: any = this.formService.compile

  constructor( private formService: FormService ){ }

  ngOnInit(): void {
    this.formService.compiling$
    .pipe( tap(v => console.log(v)) )
    .subscribe(a => {if(!a) console.log(2)})
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
