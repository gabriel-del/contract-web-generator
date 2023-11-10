import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
 <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
 <div [ngClass]="hasErrorStyle('nome')">
  <label>Nome: <input type="text" formControlName="nome"  placeholder="Nome" ></label><br/>
  <app-error-msg [show]="hasError('nome', 'required')">Nome é obrigatório</app-error-msg>
  <app-error-msg [show]="hasError('nome', 'minlength')">Ao menos 3 caracteres</app-error-msg>
</div>
<div [ngClass]="hasErrorStyle('email')">
  <label>Email: <input type="email" formControlName="email" placeholder="nome@email.com" ></label><br/>
  <app-error-msg [show]="hasError('email', 'required')">Email é obrigatório</app-error-msg>
  <app-error-msg [show]="hasError('email', 'email')">Email inválido</app-error-msg>
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

  hasErrorStyle(field) {
    return {
      'has-error': this.hasError(field),
      'has-feedback': this.hasError(field)
    }
  }














}
