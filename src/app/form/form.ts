import { Component, OnInit } from '@angular/core';
import {FormService} from './form.service'

@Component({
  selector: 'app-form',
  template: `
<form [formGroup]="formulario" (ngSubmit)="onSubmit()">
<mat-form-field [ngClass]="hasErrorStyle('nome')">
     <mat-label>Nome: </mat-label>
     <input type="text" matInput formControlName="nome">
    <app-error-msg [control]="formulario.get('nome')" label="Nome"></app-error-msg>
</mat-form-field>

  <mat-form-field>
    <mat-label>Telefone</mat-label>
    <span matPrefix>+55 &nbsp;</span>
    <input type="tel" matInput formControlName="telefone" placeholder="81 91111-1111">
  </mat-form-field>

  <!-- <mat-form-field [ngClass]="hasErrorStyle('cep')"> -->
    <mat-label>Cep:</mat-label>
     <input type="text" formControlName="cep">
    <app-error-msg [control]="formulario.get('cep')" label="Cep"></app-error-msg>
  <!-- </mat-form-field> -->
  <div [ngClass]="hasErrorStyle('numero')">
    <label>Número: <input type="text" formControlName="numero"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('complemento')">
    <label>Complemento: <input type="text" formControlName="complemento"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('rua')">
    <label>Rua: <input type="text" formControlName="rua"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('bairro')">
    <label>Bairro: <input type="text" formControlName="bairro"></label><br/>
  </div>
  <!-- <div [ngClass]="hasErrorStyle('cidade')">
    <label>Cidade: <input type="text" formControlName="cidade"></label><br/>
  </div> -->
  <div [ngClass]="hasErrorStyle('cidade')">
    <label>Cidade: 
      <select formControlName="cidade">
        <option *ngFor="let cidade of cidades" [value]="cidade">{{cidade}}</option>
      </select>
    </label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('estado')">
    <label>Estado: 
      <select formControlName="estado">
        <option *ngFor="let estado of estados" [value]="estado.sigla">{{estado.nome}}</option>
      </select>
    </label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('bloco')"> Bloco: 
    <label *ngFor="let item of blocosOp"><input type="radio" [value]="item.valor" formControlName="bloco">{{item.desc}}</label>  
  </div>
  <div [ngClass]="hasErrorStyle('hasEndereco')">
    <label>Tem Endereço?<input type="checkbox" formControlName="hasEndereco"></label><br/>
  </div>

  
  <!-- <div [ngClass]="hasErrorStyle('items')" formArrayName="items"> Items: 
    <div   *ngFor="let item of formulario.get('items')['controls']; let i = index">
      <label>{{ items[i] }}<input type="checkbox" [formControlName]="i"></label><br/>
      <label>Cama<input type="checkbox" formControlName="items"></label><br/>
    </div>
  </div> -->
  <app-form-submit></app-form-submit>
  <!-- <button (click)="resetar()">Cancelar</button> -->
</form>
<button (click)="form.texRead()">update Tex</button>
      <app-debug [form]="formulario"></app-debug>
  `,
  styles: [`
  .has-error {
    color: red;
  }`]
})
export class Form implements OnInit {
  estados!: any
  cidades!: any[]
  blocosOp!: any[]
  formulario = this.formService.formulario
  form = this.formService

  constructor( private formService: FormService ){}

  ngOnInit(): void { }

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

  onSubmit() {
    console.log("submit!")
  }
  
}







