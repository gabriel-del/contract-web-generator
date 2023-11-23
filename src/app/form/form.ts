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

<mat-form-field>
  <mat-label>Input</mat-label>
  <input matInput>
</mat-form-field>
<mat-form-field>
  <mat-label>Select</mat-label>
  <mat-select>
    <mat-option value="one">First option</mat-option>
    <mat-option value="two">Second option</mat-option>
  </mat-select>
</mat-form-field>
<mat-form-field>
  <mat-label>Textarea</mat-label>
  <textarea matInput></textarea>
</mat-form-field>

<p>
Bloco:
<mat-button-toggle-group  aria-label="Font Style">
    <mat-button-toggle value="a">A</mat-button-toggle>
    <mat-button-toggle value="b">B</mat-button-toggle>
    <mat-button-toggle value="c">C</mat-button-toggle>
  </mat-button-toggle-group>
  </p>


  <mat-form-field >
    <mat-label>Aluguel: </mat-label>
    <span matPrefix>R$ &nbsp;</span>
    <input matInput type="number" placeholder="Ex.: 1200">
  </mat-form-field>

<mat-form-field>
  <mat-label>Apartamento</mat-label>
  <mat-select >
    <mat-option *ngFor="let apartamento of apartamentos.b" value="apartamento">{{apartamento}}</mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field>
  <mat-label>Vencimento</mat-label>
  <mat-select >
    <mat-option *ngFor="let dia of vencimento" value="dia">{{dia}}</mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field>
  <mat-label>Estado Civil</mat-label>
  <mat-select >
    <mat-option *ngFor="let option of estadoCivil" value="option">{{option}}</mat-option>
  </mat-select>
</mat-form-field>

<mat-spinner></mat-spinner>

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



  <mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>



  
  <!-- <div [ngClass]="hasErrorStyle('items')" formArrayName="items"> Items: 
    <div   *ngFor="let item of formulario.get('items')['controls']; let i = index">
      <label>{{ items[i] }}<input type="checkbox" [formControlName]="i"></label><br/>
      <label>Cama<input type="checkbox" formControlName="items"></label><br/>
    </div>
  </div> -->
  <app-form-submit></app-form-submit>
  <!-- <button (click)="resetar()">Cancelar</button> -->
</form>
      <app-debug [form]="formulario"></app-debug>
  `,
  styles: [`
  .has-error {
    color: red;
  }
  form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
form {
  min-width: 150px;
  max-width: 50%;
  width: 100%;
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
  estadoCivil = ['Solteiro (a)', 'Casado (a)', 'Divorciado (a)', 'Viúvo (a)']

  constructor( private formService: FormService , private http: HttpClient ){}


  ngOnInit(): void { 
    this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json').subscribe(dados => { this.estados = dados.estados })

    this.formulario.statusChanges.subscribe(_ => this.form.texRead())
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







