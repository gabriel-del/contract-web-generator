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
    limitePessoas: [null, []],
    allowAnimals: [null, []],
    hasParking: [null, []],
    hasBikerack: [null, []],
    // cep: [null, []],
    // INQUILINO
    nome: [null, [Validators.required, Validators.minLength(3)]],
    nacionalidade: ['brasileiro', []],
    cpf: [null, []],
    identidade: [null, []],
    estadoCivil: ['null', []],
    telefone: [null, []],
    profissao: [null, []],
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

  
  texRead(){
    let value = field => this.formulario.controls[field].value
    let limitePessoas = () => {
      if (value('bloco') === 'A') return 3
      if (value('bloco') === 'B') return value('apartamento') <= 8 ? 5 : 3
      if (value('bloco') === 'C') return 2
      return null
    }
    let endereco = {
      A: 'Rua Cavalo Marinho, nº 180',
      B: 'Rua Cavalo Marinho, nº 182',
      C: 'Rua Merepe III, S\//N'
    }
    let extenso = n => n
    let f = {
      // 1 section
      enderecoc: endereco[value('bloco')],
      enderecoC: endereco[value('bloco')],
      aluguel: value('aluguel'),
      aluguelExtenso: extenso(value('aluguel')),
      vencimentoExtenso: extenso(value('diaVencimento')),
      objetos: value('objetos') ? `Os objetos são: ${value('objetos')}` : '',
      // dataFinal: value('dataFinal'),
      // 2 section
      garagem: value('hasParking') ? 'Cada apartamento tem direito a uma vaga de garagem rotativa.' : '',
      bicicletas: value('hasBikerack') ? 'As bicicletas devem ser guardadas no bicicletário.' : '',
      animais: value('allowAnimals') ? '' : 'É proibido a criação de animais.',
      limitePessoas: limitePessoas(),
      // 3 section
      nome: `Nome: ${value('nome')}`,
      identidade: value('identidade') ? `, identidade ${value('identidade')}` : '',
      nacionalidade: value('nacionalidade') ? `, ${value('nacionalidade')}` : '',
      profissao: value('profissao') ? `,  ${value('profissao')}` : '',
      cpf: value('cpf') ? `, CPF nº ${value('cpf')}` : '',
      estadoCivil: value('estadoCivil') ? `,  ${value('estadoCivil')}` : '',
      // 4 section
      endereco: value('hasEndereco') ? `, residente a rua ${value('rua')}` : '',
      
    }
    console.log(f)
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
