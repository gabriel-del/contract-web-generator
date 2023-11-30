import { Injectable } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms'
import { formValidations } from '../components/validations';
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
  f: any = 123
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  formulario: FormGroup = this.formBuilder.group({
    bloco: ['B', []],
    apartamento: [4, []],
    aluguel: [1500, []],
    dataInicio: ["2023-12-01T03:00:00.000Z", []],
    diaVencimento: [31, []],
    objetos: ['2 camas', []],
    seeDefaults: [true, []],
    allowAnimals: [true, []],
    hasParking: [true, []],
    hasBikerack: [true, []],
    limitePessoas: [5, []],
    // cep: [null, []],
    // INQUILINO
    nome: ['Gabriel', [Validators.required, Validators.minLength(3)]],
    nacionalidade: ['brasileiro', []],
    profissao: ['Autônomo', []],
    estadoCivil: ['solteiro', []],
    cpf: ['00000000000', []],
    identidade: ['0000000', []],
    celular: ['900000000', []],
    // ENDEREÇO
    hasEndereco: [true, []],
    cep: [51030300, [formValidations.cepValidator]],
    estado: ['PE', []],
    cidade: ['Recife', []],
    bairro: ['Porto de Galinhas', []],
    rua: ['Cavalo Marinho', []],
    numero: [182, []],
    complemento: ['apt 01', []],
    // items: this.buildItems(),
  })

  
  texRead(){
    let value = field => this.formulario.controls[field].value
    let endereco = {
      A: 'Rua Cavalo Marinho, nº 180',
      B: 'Rua Cavalo Marinho, nº 182',
      C: 'Rua Merepe III, S\//N'
    }
    let extenso = n => n
    let getDate = (n? :number) => {
      let meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
      let data = new Date(value('dataInicio'))
      return `${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear() + (n ? n: 0)}`
    }
    let getEndereco = () => {
      let bairro = value('bairro') ? `, bairro ${value('bairro')}` : ''
      let rua = value('rua') ? `, rua ${value('rua').replace('Rua ', '').replace('rua ', '')}` : ''
      let numero = value('numero') ? `, número ${value('numero')}` : ''
      let complemento = value('complemento') ? `, ${value('complemento')}` : ''
      let cep = value('cep') ? `, CEP nº ${value('cep')}` : ''
      return `, residente a  ${value('cidade')}-${value('estado')}${bairro}${rua}${numero}${complemento}${cep}`
    }
    let f = {
      // 1 section
      enderecoc: endereco[value('bloco')],
      enderecoC: endereco[value('bloco')],
      apartamento: value('apartamento'),
      aluguel: value('aluguel'),
      aluguelExtenso: extenso(value('aluguel')),
      dataInicio: getDate(),
      dataFinal: getDate(1),
      diaVencimento: extenso(value('diaVencimento')),
      diaVencimentoExtenso: extenso(value('diaVencimento')),
      objetos: value('objetos') ? `Os objetos são: ${value('objetos')}` : '',
      // dataFinal: value('dataFinal'),
      // 2 section
      animais: value('allowAnimals') ? '' : 'É proibido a criação de animais.',
      garagem: value('hasParking') ? 'Cada apartamento tem direito a uma vaga de garagem rotativa.' : '',
      bicicletas: value('hasBikerack') ? 'As bicicletas devem ser guardadas no bicicletário.' : '',
      limitePessoas: value('limitePessoas'),
      // 3 section
      nome: `${value('nome')}`,
      nacionalidade: value('nacionalidade') ? `, ${value('nacionalidade')}` : '',
      profissao: value('profissao') ? `,  ${value('profissao')}` : '',
      estadoCivil: value('estadoCivil') ? `,  ${value('estadoCivil')}` : '',
      cpf: value('cpf') ? `, CPF nº ${value('cpf')}` : '',
      // cpf.replace(/(\d{ 3 })(\d{ 3 })(\d{ 3 })(\d{ 2 })/, "$1.$2.$3-$4");
      identidade: value('identidade') ? `, identidade ${value('identidade')}` : '',
      celular: value('celular') ? `, celular ${value('celular')}` : '',
      // 4 section
      endereco: value('hasEndereco') ? getEndereco() : '',
      
    }
    this.f = f
    // console.log(JSON.stringify(f, null, 2))
    this.http.get('assets/main.tex', {responseType: 'text'})
    .pipe(
      map(dados => dados.replaceAll("\\","\\\\").replaceAll(/}\$( )?(\r\n|\r|\n)?/g, "}")),
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
