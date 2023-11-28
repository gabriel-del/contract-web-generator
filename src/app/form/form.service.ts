import { Injectable } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms'
import { formValidations } from './validations';
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class FormService {
  items: String[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']
  log!: any
  
  texContent!: string
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  formulario: FormGroup = this.formBuilder.group({
    bloco: [null, []],
    apartamento: [null, []],
    aluguel: [null, []],
    dataInicio: [null, []],
    diaVencimento: [null, []],
    objetos: [null, []],
    seeDefaults: [null, []],
    allowAnimals: [null, []],
    hasParking: [null, []],
    // cep: [null, []],
    // INQUILINO
    nome: [null, [Validators.required, Validators.minLength(3)]],
    nacionalidade: ['brasileiro', []],
    cpf: [null, []],
    identidade: [null, []],
    estadoCivil: ['null', []],
    telefone: [null, []],
    // ENDEREÇO
    hasEndereco: [true, []],
    cep: [null, [formValidations.cepValidator]],
    estado: [null, []],
    cidade: [null, []],
    bairro: [null, []],
    rua: [null, []],
    numero: [null, []],
    complemento: [null, []],
    // items: this.buildItems(),
  })

  values(name){return name}
   
  texRead(){
    let f = {
      bloco: `Bloco: ${this.formulario.controls['bloco'].value}, `,
      apartamento: `Apartamento: ${this.formulario.controls['apartamento'].value}, `,
      aluguel: `Aluguel: ${this.formulario.controls['aluguel'].value}, `,
      nome: `Nome: ${this.formulario.controls['nome'].value}`,
    }
    this.http.get('assets/main.tex', {responseType: 'text'})
    .pipe(
      map(dados => dados.replaceAll("\\","\\\\").replaceAll("}$", "}")),
      map(dados => eval(`dados = \`${dados}\``) ),
      // tap(dados => console.log(dados))
    )
    .subscribe(dados => this.texContent = dados)
  }

  buildItems(){
    const values = this.items.map(v => new FormControl(false))
    return this.formBuilder.array(values)
  }






}
