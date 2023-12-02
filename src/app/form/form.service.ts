import {Injectable} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {map} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject} from 'rxjs'
import * as extenso from 'extenso'
import {formValidations} from '../components/validations'

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  items: string[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']
  tex!: string
  f: any
  r: any
  compiling: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null)
  compiling$ = this.compiling.asObservable()
  form: FormGroup = this.formBuilder.group({
    bloco: [null, []],
    apartamento: [null, []],
    aluguel: [null, []],
    dataInicio: [null, []],
    diaVencimento: [null, []],
    objetos: [null, []],
    seeDefaults: [null, []],
    allowAnimals: [null, []],
    hasParking: [null, []],
    hasBikerack: [null, []],
    limitePessoas: [null],
    // cep: [null, []],
    // INQUILINO
    nome: [null, [Validators.required, Validators.minLength(3)]],
    nacionalidade: [null, []],
    profissao: [null, []],
    estadoCivil: [null, []],
    cpf: [null, []],
    identidade: [null, []],
    celular: [null, []],
    // ENDEREÇO
    hasEndereco: [null, []],
    cep: [null, [formValidations.cepValidator]],
    estado: [null, []],
    cidade: [null, []],
    bairro: [null, []],
    rua: [null, []],
    numero: [null, []],
    complemento: [null, []]
    // items: this.buildItems(),
  })
  texRead() {
    const value = (field: string) => this.form.controls[field].value
    const endereco: {[_: string]: string} = {
      A: 'Rua Cavalo Marinho, nº 180',
      B: 'Rua Cavalo Marinho, nº 182',
      C: 'Rua Merepe III, S\//N',
      null: 'null'
    }
    // const extenso = n => n
    const getDate = (n?: number) => {
      const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const data = new Date(value('dataInicio'))
      return `${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear() + (n || 0)}`
    }
    const getEndereco = (): string => {
      const bairro = value('bairro') ? `, bairro ${value('bairro')}` : ''
      const rua = value('rua') ? `, rua ${value('rua').replace('Rua ', '').replace('rua ', '')}` : ''
      const numero = value('numero') ? `, número ${value('numero')}` : ''
      const complemento = value('complemento') ? `, ${value('complemento')}` : ''
      const cep = value('cep') ? `, CEP nº ${value('cep').toString().replace(/(\d{5})(\d{3})/, '$1-$2')}` : ''
      return `, residente a  ${value('cidade')}-${value('estado')}${bairro}${rua}${numero}${complemento}${cep}`
    }
    const f = {
      // 1 section
      enderecoc: endereco[value('bloco')],
      enderecoC: endereco[value('bloco')].toUpperCase(),
      apartamento: value('apartamento'),
      aluguel: value('aluguel'),
      aluguelExtenso: extenso(value('aluguel') ?? 0),
      dataInicio: getDate(),
      dataFinal: getDate(1),
      diaVencimento: value('diaVencimento'),
      diaVencimentoExtenso: extenso(value('diaVencimento') ?? 0),
      objetos: value('objetos') ? `Os objetos são: ${value('objetos')}` : '',
      // dataFinal: value('dataFinal'),
      // 2 section
      animais: value('allowAnimals') ? '' : 'É proibido a criação de animais.',
      garagem: value('hasParking') ? 'Cada apartamento tem direito a uma vaga de garagem rotativa.' : '',
      bicicletas: value('hasBikerack') ? 'As bicicletas devem ser guardadas no bicicletário.' : '',
      limitePessoas: value('limitePessoas'),
      limitePessoasExtenso: extenso(value('limitePessoas') ?? 0),
      // 3 section
      nome: `${value('nome')}`,
      nacionalidade: value('nacionalidade') ? `, ${value('nacionalidade')}` : '',
      profissao: value('profissao') ? `,  ${value('profissao')}` : '',
      estadoCivil: value('estadoCivil') ? `,  ${value('estadoCivil')}` : '',
      cpf: value('cpf') ? `, CPF nº ${value('cpf').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}` : '',
      // cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      identidade: value('identidade') ? `, identidade ${value('identidade').replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3').toUpperCase()}` : '',
      celular: value('celular') ? `, celular ${value('celular').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}` : '',
      // 4 section
      endereco: value('hasEndereco') ? getEndereco() : ''

    }
    this.f = f

    // console.log(JSON.stringify(f, null, 2))
    this.http.get('assets/main.tex', {responseType: 'text'})
      .pipe(
        map(dados => dados.replaceAll('\\', '\\\\').replaceAll(/}\$( )?(\r\n|\r|\n)?/g, '}')),
        map(dados => eval(`dados = \`${dados}\``))
      // tap(dados => console.log(dados))
      )
      .subscribe(dados => this.tex = dados)
  }
  buildItems() {
    const values = this.items.map(_ => new FormControl(false))
    return this.formBuilder.array(values)
  }
}
