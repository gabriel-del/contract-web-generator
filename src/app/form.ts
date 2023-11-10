import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
 <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
 <div [ngClass]="aplicaCssErro('nome')">
  <label>Nome: <input type="text" formControlName="nome"  placeholder="Nome" ></label><br/>
  <app-campo-control-erro [mostrarErro]="verificaValidTouched('nome')" msgErro="Nome é obrigatório" ></app-campo-control-erro>
</div>
<div [ngClass]="aplicaCssErro('nome')">
  <label>Email: <input type="email" formControlName="email" placeholder="nome@email.com" ></label><br/>
  <app-campo-control-erro [mostrarErro]="verificaValidTouched('email')" msgErro="Email é obrigatório" ></app-campo-control-erro>
  </div>
  <button type="submit">Submit</button>
  <button (click)="resetar()">Cancelar</button>
  <app-debug [form]="formulario"></app-debug>
</form>
  `,
  styles: []
})
export class Form implements OnInit {
  formulario!: FormGroup

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    console.log(this.formulario)
    // this.formulario.reset()
  }

  resetar() {
    this.formulario.reset()
  }
  verificaValidTouched (campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }
  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }














}
