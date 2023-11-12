import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  <div [ngClass]="hasErrorStyle('cep')">
    <label>Cep: <input type="text" formControlName="cep" (blur)="consultaCEP()"></label><br/>
    <app-error-msg [show]="hasError('cep', 'required')">Cep é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('numero')">
    <label>Número: <input type="text" formControlName="numero"></label><br/>
    <app-error-msg [show]="hasError('numero', 'required')">Número é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('complemento')">
    <label>Complemento: <input type="text" formControlName="complemento"></label><br/>
    <app-error-msg [show]="hasError('complemento', 'required')">Complemento é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('rua')">
    <label>Rua: <input type="text" formControlName="rua"></label><br/>
    <app-error-msg [show]="hasError('rua', 'required')">Rua é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('bairro')">
    <label>Bairro: <input type="text" formControlName="bairro"></label><br/>
    <app-error-msg [show]="hasError('bairro', 'required')">Bairro é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('cidade')">
    <label>Cidade: <input type="text" formControlName="cidade"></label><br/>
    <app-error-msg [show]="hasError('cidade', 'required')">Cidade é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('estado')">
    <label>Estado: <input type="text" formControlName="estado"></label><br/>
    <app-error-msg [show]="hasError('estado', 'required')">Estado é obrigatório</app-error-msg>
  </div>
  
  <button type="submit">Enviar</button>
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

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      cep: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      complemento: [null, [Validators.required]],
      rua: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.formulario)
    // this.formulario.reset()
  }

  resetar() {
    this.formulario.reset()
  }
  hasError(where: string, what?: string) {
    let field = this.formulario.controls[where]
    if (field.errors && field.touched)  return !!what ?  field.errors?.[what] :  true
    return false

  }

  hasErrorStyle(field: string) {
    return {
      'has-error': this.hasError(field),
      'has-feedback': this.hasError(field)
    }
  }

  consultaCEP() {
    const cep = this.formulario.get('cep').value.replace(/\D/g,'')
    if (cep != null && cep !== '' && /^[0-9]{8}$/.test(cep)) 
      this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(dados =>  this.populaDadosForm(dados))
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    })
  }










  
}





