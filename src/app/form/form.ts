import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from './dropdown.service';

import { EstadoBr } from './model';
import { empty } from 'rxjs';
import {PdfTeXEngine} from './../../assets/PdfTeXEngine.js';
import {myTest} from './../../assets/custom.js';
// import {} from 'https://cdn.jsdelivr.net/npm/ace-builds@1.31.2/src-min-noconflict/ace.min.js'
import * as ace from "ace-builds";
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
  
  <button type="submit">Enviar</button>
  <!-- <button (click)="resetar()">Cancelar</button> -->
  <!-- <app-debug [form]="formulario"></app-debug> -->
</form>
<button mat-fab extended color="primary" (click)="compilar()">{{compileMsg}}</button>  

      <!-- <div [innerHTML]="pdfBox"></div> -->
      <!-- <embed #pdf [src]='pdfBox | safe'> -->
      <!-- <embed [src]="pdfBox | safe" style="width: 100%;height: 500px" type="application/pdf">       -->
      <app-editor [(text)]="texContent" mode="latex" ></app-editor>
      <object [data]= "pdfBox | safe" width="800" height="500"> </object> 
      <pre>{{log}}</pre>
  `,
  styles: [`
  .has-error {
    color: red;
  }`]
})
export class Form implements OnInit {
  estados!: any
  log!: any
  pdfBox: any = ''
  compileMsg: string = "Compilar"
  cidades!: any[]
  texContent: string = 'jkjkj123'
  blocosOp!: any[]

  formulario = this.formService.formulario

  constructor(
    private http: HttpClient,
    private dropdownService: DropdownService,
    private formService: FormService,
    ){}

  ngOnInit(): void {
    this.blocosOp = this.dropdownService.getBlocos()
    this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados.estados
    })
 
  }

  
  compilar(){
    console.log("compilou")
  }


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











  
}







