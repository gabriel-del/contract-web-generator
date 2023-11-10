import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
 <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
 <div [ngClass]="aplicaCssErro('nome')">
  <label>Nome: <input type="text" formControlName="nome"  placeholder="Nome" ></label><br/>
  <app-campo-control-erro [mostrarErro]="hasError('nome', 'required')" msgErro="Nome é obrigatório" ></app-campo-control-erro>
  <app-campo-control-erro [mostrarErro]="hasError('nome', 'minlength')" msgErro="Ao menos 3 caracteres" ></app-campo-control-erro>
</div>
<div [ngClass]="aplicaCssErro('email')">
  <label>Email: <input type="email" formControlName="email" placeholder="nome@email.com" ></label><br/>
  <app-campo-control-erro [mostrarErro]="hasError('email', 'required')" msgErro="Email é obrigatório" ></app-campo-control-erro>
  <app-campo-control-erro [mostrarErro]="hasError('email', 'email')" msgErro="Email inválido" ></app-campo-control-erro>
  </div>
  <button type="submit">Submit</button>
  <button (click)="resetar()">Cancelar</button>
  <app-debug [form]="formulario"></app-debug>
</form>
  `,
  styles: [`
  .has-error {
    color: red;
  }`]
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
  hasError(where, what?) {
    let field = this.formulario.controls[where]
    if (field.errors && field.touched)  return !!what ?  field.errors?.[what] :  true
    return false

  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.hasError(campo),
      'has-feedback': this.hasError(campo)
    }
  }














}
