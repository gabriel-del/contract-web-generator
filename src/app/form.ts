import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from './dropdown.service';
import { EstadoBr } from './model';
import { formValidations } from './validations';

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
    <app-error-msg [show]="hasError('cep', 'cepInvalido')">Cep inválido</app-error-msg>
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
    <label>Estado: 
      <!-- <input type="text" formControlName="estado"> -->
      <select formControlName="estado">
        <option *ngFor="let estado of estados" [value]="estado.sigla">{{estado.nome}}</option>
      </select>
    </label><br/>
    <app-error-msg [show]="hasError('estado', 'required')">Estado é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('bloco')"> Bloco: 
    <label *ngFor="let item of blocosOp"><input type="radio" [value]="item.valor" formControlName="bloco">{{item.desc}}</label>  
    <app-error-msg [show]="hasError('bloco', 'required')">Bloco é obrigatório</app-error-msg>
  </div>
  <div [ngClass]="hasErrorStyle('hasEndereco')">
    <label>Tem Endereço?<input type="checkbox" formControlName="hasEndereco"></label><br/>
    <!-- <app-error-msg [show]="hasError('cidade', 'required')">Cidade é obrigatório</app-error-msg> -->
  </div>
  <div [ngClass]="hasErrorStyle('items')" formArrayName="items"> Items: 
    <div   *ngFor="let item of formulario.get('items')['controls']; let i = index">
      <label>{{ items[i] }}<input type="checkbox" [formControlName]="i"></label><br/>
      <!-- <label>Cama<input type="checkbox" formControlName="items"></label><br/> -->
      <!-- <app-error-msg [show]="hasError('tems', 'required')">Cidade é obrigatório</app-error-msg> -->
    </div>
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
  estados!: any
  blocosOp!: any[]
  items: any[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService
    ){}

  ngOnInit(): void {
    this.blocosOp = this.dropdownService.getBlocos()
    this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados.estados
    })


    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      cep: [null, [Validators.required, formValidations.cepValidator]],
      numero: [null, [Validators.required]],
      complemento: [null, [Validators.required]],
      rua: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      bloco: [null, [Validators.required]],
      hasEndereco: [true, []],
      items: this.buildItems(),
    })
  }

  buildItems(){
    const values = this.items.map(v => new FormControl(false))
    return this.formBuilder.array(values)
  }

  onSubmit() {
    let valueSubmit = Object.assign({}, this.formulario.value)
    valueSubmit = Object.assign(valueSubmit, {
      items: valueSubmit.items.map((v,i) => v ? this.items[i] : null).filter(v => v !== null)
    })

    console.log(valueSubmit)
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      // this.formulario.reset()
    } else {
      Object.keys(this.formulario.controls).forEach(field => this.formulario.controls[field].markAsDirty())
    }
  }

  resetar() {
    this.formulario.reset()
  }
  hasError(where: string, what?: string) {
    let field = this.formulario.controls[where]
    if (field.errors && (field.touched || field.dirty))  return !!what ?  field.errors?.[what] :  true
    return false

  }

  hasErrorStyle(field: string) {
    return {
      'has-error': this.hasError(field),
      'has-feedback': this.hasError(field)
    }
  }

  consultaCEP() {
    const cep = this.formulario.get('cep')?.value?.replace(/\D/g,'')
    if (cep != null && cep !== '' && /^[0-9]{8}$/.test(cep)) 
      this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: any)  =>  this.formulario.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }))
  }









  
}





