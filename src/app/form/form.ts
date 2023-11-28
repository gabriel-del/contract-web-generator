import { Component, OnInit } from '@angular/core';
import {FormService} from './form.service'
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'
import { empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from './model';



@Component({
  selector: 'app-form',
  template: `
<form [formGroup]="formulario">

<div >



<p>
<span matPrefix>Bloco: </span>
<mat-button-toggle-group formControlName="bloco" aria-label="Font Style">
    <mat-button-toggle value="a">A</mat-button-toggle>
    <mat-button-toggle value="b">B</mat-button-toggle>
    <mat-button-toggle value="c">C</mat-button-toggle>
  </mat-button-toggle-group>
  </p>


<mat-form-field >
  <mat-label>Apartamento</mat-label>
  <mat-select formControlName="apartamento">
    <mat-option *ngFor="let apartamento of apartamentos[formulario.get('bloco').value]" [value]="apartamento">{{apartamento}}</mat-option>
  </mat-select>
</mat-form-field>

  <mat-form-field >
    <mat-label>Aluguel: </mat-label>
    <span matPrefix>R$ &nbsp;</span>
    <input matInput type="number" formControlName="aluguel" placeholder="Ex.: 1200">
    <span matTextSuffix>,00</span>
  </mat-form-field>




<mat-form-field>
  <mat-label>Data de Início</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="dataInicio">
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>

<mat-form-field>
  <mat-label>Dia de vencimento</mat-label>
  <mat-select formControlName="diaVencimento">
    <mat-option *ngFor="let dia of vencimento" [value]="dia">{{dia}}</mat-option>
  </mat-select>
</mat-form-field>


  <mat-form-field>
  <mat-label>Objetos</mat-label>
  <textarea matInput formControlName="objetos"></textarea>
</mat-form-field>


<mat-slide-toggle color="primary" formControlName="seeDefaults">Ver opções padrões</mat-slide-toggle>

<ng-container *ngIf="formulario.get('seeDefaults').value" >
  <br/><mat-slide-toggle color="primary" formControlName="allowAnimals">Permitido Animal</mat-slide-toggle>
  <br/><mat-slide-toggle color="primary" formControlName="hasParking">Garagem inclusa</mat-slide-toggle>
</ng-container>

  </div><div>
    <!-- ###### DIVISÃO -->

    <mat-form-field [ngClass]="hasErrorStyle('nome')">
     <mat-label>Nome: </mat-label>
     <input type="text" matInput formControlName="nome">
    <app-error-msg [control]="formulario.get('nome')" label="Nome"></app-error-msg>
</mat-form-field>

    <mat-form-field [ngClass]="hasErrorStyle('nacionalidade')">
     <mat-label>Nacionalidade: </mat-label>
     <input type="text" matInput formControlName="nacionalidade">
    <app-error-msg [control]="formulario.get('nacionalidade')" label="Nacionalidade"></app-error-msg>
</mat-form-field>

    <mat-form-field [ngClass]="hasErrorStyle('cpf')">
     <mat-label>CPF: </mat-label>
     <input type="number" matInput formControlName="cpf">
    <app-error-msg [control]="formulario.get('cpf')" label="CPF"></app-error-msg>
</mat-form-field>

<mat-form-field [ngClass]="hasErrorStyle('identidade')">
 <mat-label>Identidade: </mat-label>
 <input type="number" matInput formControlName="identidade">
<app-error-msg [control]="formulario.get('identidade')" label="Identidade"></app-error-msg>
</mat-form-field>

    <mat-form-field>
  <mat-label>Estado Civil</mat-label>
  <mat-select formControlName="estadoCivil">
    <mat-option *ngFor="let option of estadoCivil" value="option">{{option}}</mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field>
    <mat-label>Telefone</mat-label>
    <span matPrefix>+55 &nbsp;</span>
    <input type="tel" matInput formControlName="telefone" placeholder="81 91111-1111">
  </mat-form-field>

  <mat-slide-toggle color="primary" formControlName="hasEndereco">Tem endereço?</mat-slide-toggle>
  </div>
    <!-- ###### DIVISÃO -->
 <!-- <div [ngClass]="hasErrorStyle('hasEndereco')"> -->

<div *ngIf="formulario.get('hasEndereco').value">
  <mat-form-field>
    <mat-label>Cep: </mat-label>
    <input type="number" matInput formControlName="cep" placeholder="11111111">
    <app-error-msg [control]="formulario.get('cep')" label="Cep"></app-error-msg>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Estado: </mat-label>
    <mat-select formControlName="estado">
      <mat-option *ngFor="let estado of estados" [value]="estado.sigla">{{estado.nome}}</mat-option>
    </mat-select>
    <app-error-msg [control]="formulario.get('estado')" label="Estado"></app-error-msg>  
  </mat-form-field>
  
  <mat-form-field>
    <mat-label>Cidade: </mat-label>
    <mat-select formControlName="cidade">
      <mat-option *ngFor="let cidade of cidades" [value]="cidade">{{cidade}}</mat-option>
    </mat-select>
    <app-error-msg [control]="formulario.get('cidade')" label="Cidade"></app-error-msg>  
  </mat-form-field>
  
    <mat-form-field >
      <mat-label>Bairro: </mat-label>
      <input type="text" matInput formControlName="bairro" placeholder="Ex.: Porto de Galinhas">
      <app-error-msg [control]="formulario.get('bairro')" label="Bairro"></app-error-msg>
    </mat-form-field>
  
    <mat-form-field>
      <mat-label>Rua: </mat-label>
      <input type="text" matInput formControlName="rua" placeholder="Ex.: Cavalo Marinho">
      <app-error-msg [control]="formulario.get('rua')" label="Rua"></app-error-msg>
    </mat-form-field>

  <mat-form-field>
    <mat-label>Número: </mat-label>
    <input type="number" matInput formControlName="numero" placeholder="00">
    <app-error-msg [control]="formulario.get('numero')" label="Número"></app-error-msg>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Complemento: </mat-label>
    <input type="text" matInput formControlName="complemento" placeholder="Ex.: apt 01">
    <app-error-msg [control]="formulario.get('complemento')" label="Complemento"></app-error-msg>
  </mat-form-field>

  

 
  



  
  <!-- <div [ngClass]="hasErrorStyle('items')" formArrayName="items"> Items: 
    <div   *ngFor="let item of formulario.get('items')['controls']; let i = index">
      <label>{{ items[i] }}<input type="checkbox" [formControlName]="i"></label><br/>
      <label>Cama<input type="checkbox" formControlName="items"></label><br/>
    </div>
  </div> -->
  </div>
</form>
  <app-form-submit></app-form-submit>
  <!-- <button (click)="resetar()">Cancelar</button> -->
      <app-debug [form]="formulario"></app-debug>
  `,
  styles: [`
  .has-error {
    color: red;
  }
  form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
  flex: 1 1 0;
  padding: 10px;
  margin: 10px;
  border: 1px solid #999;
  border-radius: 12px;
  
}

}

p {
  display: flex;
  flex: 1 1 100%;

  span {
    width: 25%;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  
  mat-button-toggle-group {
    width: 75%;
  }
  
  mat-button-toggle {
    flex: 1 1 100%;
    box-sizing: border-box;
    align-items: flex-end;
    flex-direction: row;
    display: flex;
  }
}


mat-form-field{
  width: 100%;
}
  `]
})
export class Form implements OnInit {
  cidades!: any[]
  blocosOp!: any[]
  formulario = this.formService.formulario
  form = this.formService
  estados!: any
  apartamentos = {
    'a': Array(12).fill(0).map((_,i)=>i+1),
    'b': Array(9).fill(0).map((_,i)=>i+1),
    'c': Array(6).fill(0).map((_,i)=>i+1),
  }
  vencimento = Array(31).fill(0).map((_,i)=>i+1)
  estadoCivil = ['solteiro', 'solteira', 'casado', 'casada', 'divorciado', 'divorciada', 'viúvo', 'viúva']

  constructor( private formService: FormService , private http: HttpClient ){}


  ngOnInit(): void { 
    this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json').subscribe(dados => { this.estados = dados.estados })
    this.form.texRead()
    // this.formulario.statusChanges.subscribe(_ => this.form.texRead())
    this.formulario.valueChanges.subscribe(_ => this.form.texRead())
    this.formulario.get('cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      tap( value => console.log("status cep: ", value) ),
      switchMap(status => status === 'VALID' ? 
      this.http.get(`//viacep.com.br/ws/${this.formulario.get('cep').value}/json`) :
      empty()
      )
    )
    .subscribe(
      (dados: any) => dados ? this.formulario.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }) : {} )
  
    this.formulario.get('estado').valueChanges
    .pipe(
      map(estado => this.estados.filter(({sigla}) => sigla === estado)),
      map(estado => estado[0].cidades),
    )
    .subscribe(cidades => this.cidades = cidades)
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

  resetar() { this.formulario.reset() }

  
  
}







